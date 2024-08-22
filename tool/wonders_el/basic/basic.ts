export class MbButton {
    plain:Boolean ; //是否为朴素按钮
    buttonClick:Function; //点击事件函数
    btnType: "delete" | ''  = '';
    requestData: Array<any> = [];
    beforeConfirm: String = ''; //操作前的提示信息
    successTips:String = ''; //操作成功的tips信息，目前无效
    failTips:String = ''; //操作失败的tips信息，目前无效
    confirmType: 'success' | 'warning' | 'info' | 'error' = 'warning'; //提示框类型
    requestFun: Function = ()=>{}; //点击确认按钮后的异步操作，在本页面进行
    isOpen: Boolean = false; //点击页面后，是否打开新的页面
    requestUrl: String; //请求的地址
    afterHandler:Function = ()=>{}; //confirm请求完成后的操作
    props: Object = {}; //el-button支持的其他属性和方法 https://element-plus.org/zh-CN/component/button.html#button
}


//配合vite.config.js的配置
export class MbIcon{
    prefix:String = "mb-icon"; //前缀
    icon: String ; //图标名称 
}