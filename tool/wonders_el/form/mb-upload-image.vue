<template>
  <div>
    <vuedraggable
      v-model="urls"
      class="vue-draggable"
      tag="div"
      draggable=".draggable-item"
      @end="onDragEnd"
      item-key="id"
    >
      <template #item="{ element }">
        <div class="draggable-item" :style="{ width: width + 'px', height: height + 'px' }">
          <el-image :src="element" :preview-src-list="[element]" :disabled="disabled" />
          <div class="tools" v-if="disabled==false">
            <div class="shadow" @click="handleRemove(element)">
              <el-icon>
                <ElIconDelete />
              </el-icon>
            </div>
            <div class="shadow" @click="handlePictureCardPreview(element)">
              <el-icon>
                <ElIconView />
              </el-icon>
            </div>
            <div v-if="corpperAble" class="shadow" @click="beforeCropper(element)">
              <el-icon>
                <ElIconScissor />
              </el-icon>
            </div>
          </div>
        </div>
      </template>
      <template #footer>
        <el-upload
          v-if="(!multiple && urls.length == 0) || (multiple && urls.length < limit)"
          ref="uploadRef"
          class="uploadBox"
          :style="{ width: width + 'px', height: height + 'px' }"
          :action="action"
          :headers="headers"
          :accept="accept"
          :show-file-list="false"
          :multiple="multiple"
          :limit="limit"
          :name="name"
          :on-success="handleAvatarSuccess"
          :on-preview="handlePictureCardPreview"
          :on-exceed="onExceed"
          v-model:file-list="fileList"
          :disabled="disabled"
        >
          <el-icon class="uploadIcon">
            <ElIconPlus />
            <span v-show="isUploading" class="uploading">正在上传...</span>
            <span
              v-if="!isUploading && limit && limit !== 99 && multiple"
              class="limitTxt"
            >最多{{ limit }}张</span>
          </el-icon>
        </el-upload>
      </template>
    </vuedraggable>
    <div v-if="tip" class="el-upload__tip" :style="{ color: tipColor }">{{ tip }}</div>
    <mb-dialog ref="cropperDialog" @confirm-click="cropper">
      <template #content>
        <div class="cropper-content">
          <div class="cropper" style="text-align:center">
            <vueCropper
              ref="cropper"
              v-bind="cropperOption"
              :outputSize="cropperOption.outputSize === undefined ? 0.8 : cropperOption.outputSize"
              :outputType="cropperOption.outputType === undefined ? 'jpeg' : cropperOption.outputType"
              :canMove="cropperOption.canMove === undefined ? true : cropperOption.canMove"
              :canMoveBox="cropperOption.canMoveBox === undefined ? true : cropperOption.canMoveBox"
              :autoCrop="cropperOption.autoCrop === undefined ? true : cropperOption.autoCrop"
              :centerBox="cropperOption.centerBox === undefined ? true : cropperOption.centerBox"
            />
          </div>
        </div>
      </template>
    </mb-dialog>
  </div>
  <el-dialog v-model="dialogVisible">
    <el-image w-full :src="dialogImageUrl" alt="Preview Image"></el-image>
  </el-dialog>
</template>

<script setup>
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'
import vuedraggable from 'vuedraggable'
import { getToken } from '@/utils/auth'
import common from '@/utils/common'
import { watch } from 'vue'

const { proxy } = getCurrentInstance()
const emits = defineEmits(['update:modelValue', 'change'])
const dialogImageUrl = ref('');
const dialogVisible = ref(false);
const isUploading = ref(false);
const cropperOption = ref({});
const urls = ref([]);     //用来存图片url的
const fileList = ref([]);  //用来存图片所有信息的
const emitUpdate = ref(true);


const props = defineProps({
  modelValue: {
    required: false
  },
  accept: {
    type: String,
    default: '.jpg,.jpeg,.png,.gif'
  },
  name: {
    type: String,
    default: "files"
  },
  externalId: {
    type: String,
    default: ''
  },
  externalType: {
    type: String,
    default: ''
  },
  multiple: {
    type: Boolean,
    default: false
  },
  limit: {
    type: Number,
    default: 2
  },
  cropperConfig: {
    type: Object,
    default: {}
  },
  width: {
    type: Number,
    default: 100
  },
  height: {
    type: Number,
    default: 100
  },
  tip: {
    type: String,
    default: ''
  },
  tipColor: {
    type: String,
    default: ''
  },
  join: {
    type: Boolean,
    default: true
  },
  disabled: {
    type: Boolean,
    default: false
  },
  onSuccess: {
    type: Function,
    default: () => { }
  },
  uploadUrl: {
    type: String,
  },
  directDel: {
    type: Boolean,
    default: true
  },
  delFileFun: {
    type: Function,
    required: false
  },
  sortFun: Function,
  cropperFun: Function,
  corpperAble: {
    type: Boolean,
    default: false
  }
}
)
const action = ref('')
const headers = ref({
  "Sa-Token": getToken()
})

watch(() => props.modelValue, (value) => {
  if (emitUpdate.value) {
    emitUpdate.value = false
    if (fileList.value.length == 0) {
      renderFile()
    }
  } else {
    renderFile()
  }

})


watch(() => props.externalId, (val, old) => {
  console.log("发生了externalId变化", val)

  getFilesByExternalId(val);
  action.value = common.getUploadUrl(val, props.externalType)
})

onMounted(() => {
  cropperOption.value = props.cropperConfig || {};
  cropperOption.value.img = '';
  if (props.uploadUrl) {
    action.value = props.uploadUrl + `?extraID=${props.externalId || ''}&externalType=${props.externalType || ''}`
  } else {
    console.log(props.externalId)
    action.value = common.getUploadUrl(props.externalId, props.externalType)
  }
  if (props.externalId && props.externalId !== '') {
    getFilesByExternalId(props.externalId);
  } else {
    renderFile()
  }
})

const getFilesByExternalId = (externalId) => {
  console.log("externalId-------", externalId)
  common.getFilesByExternalId(externalId).then(res => {
    if (res.code === 0) {
      if (res.data && res.data.length > 0) {
        urls.value = res.data.slice().reverse().map(item => {
          return item.fileUrl
        })
        emits('update:modelValue', urls.value)
        fileList.value = res.data.map(item => {
          return { response: { data: item } }
        })
      }
    }
  })
}

const setFileList = () => {
  if (urls.value.length > 0 && fileList.value.length === 0) {
    fileList.value = urls.value.map(item => {
      const picData = {};
      picData[props.name] = item
      return {
        response: {
          data: picData
        }
      }
    })
    console.log(urls.value)
  }
}

const renderFile = () => {
  console.log(props.modelValue)
  if (props.multiple && props.join && props.modelValue) {
    urls.value = props.modelValue.split(',')

  } else {
    if (props.modelValue instanceof Array) {
      urls.value = props.modelValue
    } else {
      if (props.modelValue) {
        urls.value.push(props.modelValue)
      }
    }
  }
  console.log(urls.value)
  emits('update:modelValue', urls.value.length > 0 ? urls.value.join(',') : '')
  setFileList()
}

const handleRemove = (url) => {
  console.log("删除操作", url)
  const index = urls.value.indexOf(url);
  const file = fileList.value[index]
  const delFile = file.response.data[0] || file.response.data
  const process = () => {
    urls.value.splice(index, 1)
    fileList.value.splice(index, 1)
    if (props.multiple) {
      if (props.join) {
        emits('update:modelValue', urls.value.join(','))
        emitUpdate.value = true
        emits('change', urls.value.join(','))
      } else {
        emits('update:modelValue', urls.value)
        emitUpdate.value = true
        emits('change', urls.value)
      }
    } else {
      emits('update:modelValue', '')
      emitUpdate.value = true
      emits('change', '')
    }
  }
  const then = (res) => {
    if (res.code === 0) {
      process()
    } else {
      proxy.$message({
        type: 'error',
        message: `文件删除失败`
      })
    }
  }
  if (props.directDel) {
    if (props.delFileFun) {
      props.delFileFun(delFile.id).then(then)
    } else {
      common.deleteFileById(delFile.id).then(then)
    }
  } else {
    process()
  }
}

const handlePictureCardPreview = (file) => {
  console.log(file)
  dialogImageUrl.value = file
  dialogVisible.value = true
}

const handleDownload = (file) => {
  console.log(file)
}

const handleAvatarSuccess = (res, file, fileLst) => {
  if (res.code === 0) {
    const data = file.response.data[0] || file.response.data
    urls.value.push(data.fileUrl)
    if (props.join) {
      emits('update:modelValue', urls.value.join(','))
      emitUpdate.value = true
      emits('change', urls.value.join(','))
    } else {
      emits('update:modelValue', urls.value)
      emitUpdate.value = true
      emits('change', urls.value)
    }
    onDragEnd()
  }
  if (props.onSuccess) {
    props.onSuccess(res, file, fileList)
  }
  //  else {
  //   this.$message({ type: 'error', message: res.msg })
  // }
  isUploading.value = false
}



const onDragEnd = () => {
  var newUrls = []
  urls.value.forEach(url => {
    newUrls.push(encodeURI(url))
  })
  if (props.sortFun) {
    sortFun({ urls: newUrls.join(',') }).then(res => {
    })
  }
}

const onExceed = () => {
  proxy.$message({
    type: 'warning',
    message: `图片超限，最多可上传${limit}张图片`
  })
}
const beforeCropper = (url) => {
  console.log(url.value)
  cropperOption.value.img = url
  cropperOption.value.relativeImg = url
  proxy.$refs.cropperDialog.show()
}

const cropper = () => {
  proxy.$refs.cropper.getCropBlob((data) => {
    var dataFile = new File([data], cropperOption.value.relativeImg.substring(cropperOption.value.relativeImg.lastIndexOf('/') + 1), { type: data.type, lastModified: Date.now() })
    var formData = new FormData()
    formData.append('file', dataFile)
    formData.append('url', encodeURI(cropperOption.value.relativeImg))
    props.cropperFun(formData).then(res => {
      urls.value.forEach((it, i) => {
        if (cropperOption.value.img.indexOf(it) !== -1) {
          urls.value[i] = res.data.url
          proxy.$refs.cropperDialog.hide()
        }
      })
    })
  })
}

</script>

<style scoped>
.vue-draggable >>> .el-upload {
  width: 100%;
  height: 100%;
  display: block;
}
</style>

<style lang="scss" scoped>
// 上传按钮
.uploadIcon {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px dashed #c0ccda;
  background-color: #fbfdff;
  border-radius: 6px;
  font-size: 20px;
  color: #999;

  .limitTxt,
  .uploading {
    position: absolute;
    bottom: 10%;
    left: 0;
    width: 100%;
    font-size: 14px;
    text-align: center;
  }
}

// 拖拽
.vue-draggable {
  display: flex;
  flex-wrap: wrap;

  .draggable-item {
    margin-right: 5px;
    margin-bottom: 5px;
    border: 1px solid #ddd;
    border-radius: 6px;
    position: relative;
    overflow: hidden;

    .el-image {
      width: 100%;
      height: 100%;
    }

    .tools {
      position: absolute;
      top: 0px;
      width: 100%;
      height: 20px;
    }

    .shadow {
      display: inline-block;
      background-color: rgba(0, 0, 0, 0.5);
      opacity: 0;
      transition: opacity 0.3s;
      color: #fff;
      font-size: 20px;
      line-height: 20px;
      padding: 2px;
      cursor: pointer;
    }

    &:hover {
      .shadow {
        opacity: 1;
      }
    }
  }

  &.hideShadow {
    .shadow {
      display: none;
    }
  }

  &.single {
    overflow: hidden;
    position: relative;

    .draggable-item {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 1;
    }
  }

  &.maxHidden {
    .uploadBox {
      display: none;
    }
  }
}

// el-image
.el-image-viewer__wrapper {
  .el-image-viewer__mask {
    opacity: 0.8;
  }

  .el-icon-circle-close {
    color: #fff;
  }
}

.cropper-content {
  .cropper {
    width: auto;
    height: 300px;
  }
}
</style>
