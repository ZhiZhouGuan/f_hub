<template>
  <el-button
    v-bind="props_"
    :plain="plain"
    @click="buttonClick"
  >
    {{ props_.label }}
  </el-button>
</template>

<script>
import { getToken } from '@/utils/auth'
import {ElMessageBox } from 'element-plus'

export default {
  name: 'MbButton',
  props: {
    props: {
      type: Object,
      default: () => {}
    },
    plain: {
      type: Boolean,
      default: false
    },
    btnType: {
      type: String,
      default: ''
    },
    requestData: {
      type: Array,
      default: []
    },
    requestDataHandler:Function,
    beforeConfirm: {
      type: String,
      default: ''
    },
    successTips: {
      type: String,
      default: ''
    },
    failTips: {
      type: String,
      default: ''
    },
    confirmType: {
      type: String,
      default: 'warning'
    },
    afterHandler: {
      type: Function,
      default: () => {}
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    requestFun:{
      type:Function,
      default: ()=>{}
    },
    requestUrl:{
      type:String,
      default: ""
    }
  },
  data() {
    return {
      props_: this.props || {},
      requestMethod_: this.requestMethod,
      beforeConfirm_: this.beforeConfirm,
      successTips_: this.successTips,
      failTips_: this.failTips
    }
  },
  created() {
    if (this.btnType) {
      if (this.btnType === 'delete') {
        this.requestMethod_ = 'delete'
        this.props_.type = 'danger'
        this.props_.label = '删除'
        this.props_.icon = 'ElIconDelete'
        this.beforeConfirm_ = '此操作将永久删除该数据, 是否继续?'
        this.successTips_ = '删除成功！'
        this.failTips_ = '删除失败！'
      }
    }
  },
  methods: {
    async buttonClick() {

      if(this.requestData[0].id.length===0){
        ElMessageBox.alert("请选择数据后再删除",'提示',{
          confirmButtonText: '确定',
          type: 'info'
        });
        return
      }
      if (this.beforeConfirm_) {
        this.$confirm(this.beforeConfirm_, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: this.confirmType
        }).then((res) => {
          console.log("confirm.",res)
          this.buttonClickRequest().then(() => {
            this.afterHandler()
          })
        }).catch(() => {
        })
      }
    },
    buttonClickRequest() {
      console.log("开始删除")
      let paramData = this.requestData;
      if(this.requestDataHandler){
        paramData = this.requestDataHandler(paramData)
      }
      if (this.isOpen) {
        return new Promise(() => {
          window.open(this.$common.getUrl(process.env.VUE_APP_BASE_API + this.requestUrl, ...paramData) + '&token=' + getToken())
        })
      }
      return this.requestFun(...paramData)
    }
  }
}
</script>
