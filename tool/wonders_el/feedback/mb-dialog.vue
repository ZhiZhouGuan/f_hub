<template>
  <el-dialog
    v-model="dialogVisible"
    :class="customClass"
    :fullscreen="fullscreen"
    :width="width"
    :title="title"
    :close-on-click-modal="false"
    :destroy-on-close="destroyOnClose"
    :append-to-body="true"
    :show-close="showClose"
    draggable
    @open="$emit('open')"
    @opened="opened"
    @close="$emit('close')"
  >
    <slot name="content" />
    <slot name="footer" />
    <template v-if="showFooter" #footer>
      <div slot="footer" class="dialog-footer">
        <slot name="btns">
          <el-button @click="hide">
            关闭
          </el-button>
          <el-button type="primary" class="filter-item" :loading="confirmLoading" @click="confirmClick">
            确认
          </el-button>
        </slot>
      </div>
    </template>
  </el-dialog>
</template>

<script>
export default {
  emits: ['confirm-click', 'open', 'opened', 'close'],
  inject:['reload'],
  props: {
    title: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '50%'
    },
    fullscreen: {
      type: Boolean,
      default: false
    },
    destroyOnClose: {
      type: Boolean,
      default: true
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    },
    
  },
  data() {
    return {
      dialogVisible: false,
      confirmLoading: false,
      customClass: 'mbDialog' + this.$common.uuid(),
      isOpen: false
    }
  },
  watch: {
    dialogVisible(value) {
      if(value){
        this.addStyle()
      }else{
        this.removeStyle()
      }
    }
  },
  created() {
    this.addStyle()
  },
  methods: {
    opened(){
      this.$emit('opened')
      this.isOpen = true
    },
    confirmClick() {
      this.$emit('confirm-click', this)
    },
    loading(){
      this.confirmLoading = true
    },
    hideLoading(){
      this.confirmLoading = false
    },
    show(callback) {
      this.dialogVisible = true
      console.log("打卡dialog" + this.customClass)
      if(callback){
        var callbackInterval = setInterval(() => {
          if(this.isOpen){
            this.isOpen = false
            clearInterval(callbackInterval)
            callback()
          }
        },1)
      }
    },
    hide() {
      // window.parent.location.reload();
      this.dialogVisible = false
    },
    addStyle(){
      var componentStyle = document.createElement("style");
      var cc = this.customClass
      if (this.fullscreen) {
        componentStyle.innerHTML = `
        .${cc}{
          margin-top: 0vh;
          margin-bottom: 0vh;
        }
        .${cc} .el-dialog__body{
          max-height: 100vh;
        }
      `
      } else {
        componentStyle.innerHTML = `
        .${cc}{
          margin-top: 10vh;
          margin-bottom: 10vh;
        }
        .${cc} .el-dialog__body{
          max-height: 60vh;
          overflow: auto;
        }
      `
      }
      componentStyle.id = cc
      document.head.appendChild(componentStyle);
    },
    removeStyle(){
      document.getElementById(this.customClass) && document.getElementById(this.customClass).remove()
    },
    
  }
}

</script>
<style>
/* .el-dialog{
  background: #F0F2F5;
} */
.el-dialog__header {
  background: #FAFAFA;
}
.el-dialog__title {
  color: #4362E9
}
.sureButton{
  background: #2794f8;
  color: white;
}
</style>