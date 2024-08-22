export class MbCheckBoxGroup {
    modelValue: String; //值
    button?: Boolean = false; //
    type?: String; //数据字典的类型
    options?: Array<{ label: String, value: any }> = []; //选项
    paramData?: Array<Object> = []; //请求参数
    loadDataFun?: Function; //加载选项的api接口
    labelField?: String = 'label'; //标签字段
    valueField?: String = 'value'; //值字段	
    size?: 'large' | 'default' | 'small';
    min?: Number; //可被勾选的 checkbox 的最小数量
    max?: Number; //可被勾选的 checkbox 的最大数量	
    textColor?: String = '#fff';//按钮激活时的字体颜色	
    fill?: String = '#409EFF'; //当按钮激活时，边框和背景颜色
    join?: Boolean = true; //是否join数据用”,“隔开
}

export class MbDate {
    modelValue: String; //值
    component_type?: 'year' | 'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange' = 'date'; //组件类型
    placeholder?: String = '请选择时间';//占位符	
    format?: String = 'YYYY-MM-DD'; //显示在输入框中的格式	
    valueFormat?: String = 'YYYY-MM-DD HH:mm:ss'; //结果格式化
    startPlaceholder?: String = '开始时间'; //开始时间占位符
    endPlaceholder?: String = '结束时间';//结束时间占位符
    disabled?: Boolean = false; //是否禁用
    props?: Object = {}; //el-date-picker支持的其他属性
}

export class MbInput {
    modelValue?: String = '';
    itemLabel?: String; //字段标题
    placeholder?: String; //占位符
    type?: 'text' | 'textarea' | 'password' | 'button' | 'checkbox' | 'file' | 'number' | 'radio' | 'url' | 'image' | String = 'text';
    props?: Object = {}; //el-input支持的其他属性和方法
}

export class MbInputRange {
    modelValue?: String = '';
    itemLabel?: String; //字段标题
    placeholder?: String; //占位符
}

export class MbRadioGroup {
    modelValue: String | Number | Boolean; //值
    type?: String; //数据字典支持的其他值
    button: Boolean = false; //是否以按钮的方式展示
    options: Array<{ label: String, value: String | Number | Boolean }> = [];//选项值
    paramData: Array<Object> = []; //异步请求参数
    loadDataFun?: Function; //加载选项的api接口
    labelField?: String = 'label'; //标签字段
    valueField?: String = 'value'; //值字段	
    size?: 'large' | 'default' | 'small'; //按钮大小
    disabled?: Boolean = false; //是否禁用
    textColor?: String = '#fff';//按钮激活时的字体颜色	
    fill?: String = '#409EFF'; //当按钮激活时，边框和背景颜色
}

export class MbSelect {
    modelValue: String = ''; //值
    type?: String; //字段类型
    options?: Array<{ label: String, value: String | Number | Boolean }> = [];//选项值
    params?: Array<Object> = []; //异步请求参数
    loadDataFun?: Function; //加载选项的api接口
    labelField?: String = 'label'; //标签字段
    valueField?: String = 'value'; //值字段	
    props?: Object = {}; //el-select支持的其他属性
    width?: String = '100%';//宽度
    allOption?: Boolean = false; //是否增加全选选项
    placeholder?: String = ''; //占位符
    itemLabel?: String = ''; //placeholder后缀
    multiple?: Boolean = false; //是否多选	
    join?: Boolean = true;//是否join数据用”,“隔开
    showValue?: Boolean = false;//是否显示“value”值
}

export class MbSwitch {
    modelValue?: String | Number | Boolean = false; //值
    activeValue?: Boolean | String | Number = true; //激活值
    inactiveValue?: Boolean | String | Number = false; //未激活值
    props?: Object = {}; //el-switch支持的其他值
}

export class MbUploadFile {
    modelValue?: String; //值
    multiple?: Boolean = false;//是否多选
    default?: false;
    limit?: Number = 20; //上传数量限制	
    maxFileSize?: Number = 200;//文件大小限制（单位：MB）
    accept?: 'image' | 'wps' | 'compress' | 'video' | String;
    externalId?: String;  //扩展ID
    externalType?: String; //扩展业务类型
    formats?: String; //文件类型限制
    label?: String = '点击上传' //上传按钮文本	
    showTip?: Boolean = true; //是否显示上传提示	
    action?: String; //文件上传地址，通常情况下不需传
    showFileList?: Boolean = true; //是否显示已上传文件列表
    onSuccess?: Function; //上传成功的回调方法		
    showRemoveTip?: Boolean = true; //是否显示删除文件的提示	
    join?: Boolean = true; //是否用','分割多个文件
    disabled?: Boolean = false; //是否禁用
}

export class MbUploadImage {
    modelValue?: String; //文件路径
    name?: String = "files"; //文件上传字段名称
    externalId?: String;  //扩展ID
    externalType?: String; //扩展业务类型
    multiple?: Boolean = false;//是否多选
    limit?: Number = 2; //上传数量限制	
    corpperAble?: Boolean = false; //是否允许拆剪
    cropperConfig?: Object = {}; //图片拆剪配置，corpperAble为true时有效
    width?: Number = 100; //图片显示宽度
    height?: Number = 100; //图片显示高度

    tip?: String = ''; //上传提示
    tipColor?: String; //提示颜色
    join?: Boolean = true; //是否使用，拼接
    disabled?: Boolean = false; //是否禁用
    onSuccess?: Function; //上传成功提示
    uploadUrl?: String; //图片上传路径
    directDel?: Boolean = false; //点击删除按钮是否直接删除图片
    delFileFun?: Function; //删除图片API
    sortFun?: Function; //图片排序方法
}