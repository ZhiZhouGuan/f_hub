<template>
  <el-form
    ref="dataForm"
    :rules="rules"
    :model="formData"
    v-bind="form.props"
    label-width="90px"
    label-position="left"
  >
    <el-row
      v-for="(row, i) in form.rows"
      :key="i"
      :gutter="row.gutter"
      v-show="(row.hidden === false) || !row.hidden"
    >
      <div v-if="row.title" class="title">{{ row.title }}</div>
      <el-col
        :class="col.class"
        v-for="(col, j) in row.cols"
        :key="j"
        :span="col.span"
        v-bind="col.colProps"
      >
        <el-form-item
          v-if="!col.hidden"
          :label="col.label"
          :label-width="col.labelWidth"
          :prop="col.name"
          v-bind="col.formItemProps"
        >
          <component
            v-if="col.component!='button'"
            :is="!col.component ? 'mb-input' : col.component.startsWith('el-') || $global.dynamicComponentNames.indexOf(col.component) != -1 ? col.component : 'mb-' + col.component"
            v-model="formData[col.name]"
            v-bind="col.props"
            :disabled="col.disabled"
          />
          <el-button
            v-else-if="col.component=='button'"
            :disabled="col.disabled"
            @click="col.handler() && col.handler(formData)"
          >{{ col.text }}</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script setup>
import { ref, reactive, getCurrentInstance, watch } from 'vue'
const { proxy } = getCurrentInstance()
const visible = ref(false)

const props = defineProps({
  form: {
    type: Object,
    default: () => { }
  },
  detail: {
    type: Object,
    default: () => { }
  },
  primaryField: {
    type: String,
    default: 'id'
  }
})


const rules = reactive(getRules())
const formData = ref(initFormData())
const dataForm = ref()
const emit = defineEmits(['reload'])

try {
  props.form.props = props.form.props || {}
  proxy.$common.setDefaultValue(props.form.props, 'labelPosition', 'right')
  proxy.$common.setDefaultValue(props.form.props, 'labelWidth', '120px')
} catch (e) {
  console.log(e)
}
try {
  if (props.detail && props.detail.formData) {
    if (props.detail.handlerFormData) {
      props.detail.handlerFormData(props.detail.formData)
    }
    formData.value = props.detail.formData
  }
  if (props.detail && props.detail.requestFun && props.detail.formData[props.primaryField]) {
    props.detail.requestFun(props.detail.formData[props.primaryField]).then(res => {
      if (res.code === 0 && res.data != null) {
        formData.value = res.data;
        props.detail.getFormData(res.data)
        props.detail.handlerFormData(res.data)
        console.log(formData.value)
      }
    })
  }
} catch (e) {
  console.log(e)
}


function getRules() {
  var _rules = {}
  props.form.rows.forEach(row => {
    row.cols.forEach(col => {
      if (col.rules) {
        _rules[col.name] = col.rules
      }
    })
  })
  return _rules
}

function initFormData() {
  var data = {}
  props.form.rows.forEach(row => {
    row.cols.forEach(col => {
      data[col.name] = col.defaultValue || null
    })
  })
  return data
}

function getFormData() {
  return formData.value
}


function save(d) {
  console.log(...[formData.value])
  dataForm.value.validate((valid) => {
    if (valid) {
      if (d) d.loading()
      props.form.requestFun(...[formData.value]).then(res => {
        if (d) d.hideLoading()
        if (res.code == 0) {
          proxy.$notify({
            title: '成功',
            message: (!formData.value[props.primaryField] ? '创建' : '修改') + '成功',
            type: 'success',
            duration: 2000
          })
          if (d) {
            d.hide()
            reset()
          }

          if (props.detail && props.detail.formData) {
            props.detail.formData = {}
          }
        } else {
          proxy.$message({
            title: res.msg,
            type: 'error',
            duration: 2000
          })
        }
        emit('reload', res.code)
      }).catch(() => { })
    }
  })
}

function getDetail(id) {
  formData.value[props.primaryField] = id
  props.detail.requestFun(id).then(res => {
    const { data } = res.data.data ? res.data : res;
    for (var t in formData.value) {
      if ((data[t] || data[t] === 0) && (!props.detail.excludeAssign || props.detail.excludeAssign.indexOf(t) === -1)) {
        formData.value[t] = data[t]
      }
    }
  })
}
function reset(val) {
  if (val) {
    for (const key in val) {
      formData.value[key] = val[key];
    }
  } else {
    for (const key in formData.value) {
      formData.value[key] = '';
    }
  }
}

const getRows = (rows) => {
  return rows.filter(r => {
    return !r.hidden
  })
}

defineExpose({ save, getDetail, getFormData, initFormData, reset })
</script>
<style lang="scss" scoped>
:deep(.el-form-item__label) {
  box-shadow: 1px 0 0 0 #dcdfe6 inset, 0 1px 0 0 #dcdfe6 inset,
    -1px 0 0 0 #dcdfe6 inset, 0 -1px 0 0 #dcdfe6 inset;
  color: #252525 !important;
  background-color: #fafafa !important;
  border-radius: 4px 0 0 4px;
}
:deep(.el-form-item__label) {
  display: flex;
  justify-content: center !important;
}
:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px var(#dcdfe6, #dcdfe6);
  border-radius: 0 4px 4px 0;
}
:deep(.el-col) {
  margin-bottom: 20px;
}
.hiddenId {
  display: none;
}

.title {
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  line-height: 22px;
  border: 1px solid #797979;
  padding: 5px 20px;
  margin-bottom: 20px;
}
</style>
