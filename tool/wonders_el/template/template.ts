import type { FormRules } from 'element-plus'
import type {MbSearch, MbTable} from '../data/data'

export class MbFormCol{
    component?:String = 'input';// formitem下的组件
    span?: Number = 24;  //el-col的span属性	
    hidden?:Boolean = false; //是否显示
    name: String; //key值	
    label:String; //标签文本	
    rules?:Array<FormRules>; //验证规则
    defaultValue?:any; //字段默认值	
    props?:Object = {}; //组件绑定的其他属性
}

export class MbFormDetial{
    formData?:Object = {} //表数据
    handlerFormData?:Function = (formData) => {
        return formData
    };  //对formdata进行处理，更新formdata的数据
    reqeustFun?:Function; //请求详情的API
}

export class MbFormRow{
    gutter?:Number = 0; //el-row的gutter属性 列间距
    cols?:Array<MbFormCol> = []; //列配置
    title?:String; //列标题
}



export class MbFormInfo{
    props?:Object = {}; //el-form支持的其他属性
    rows?:Array<MbFormRow> = []; //行信息
    requestFun?:Function; //保存接口函数
}

export class MbFrom{
    form: MbFormInfo; //表单配置
    detail: MbFormDetial; //表单详情
    primaryField?:String; //主键字段
}

export class MbToolButton{
    type?: 'add' | 'delete' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'; //类型，如果不配置就是el-button
    permission?:String; //权限值
    if?:Function = ()=>{return true}; //if判断是否显示return true显示 return false不显示
    icon?:String;  //可以使用图标集合的所有图标，要加前缀：ElIcon
    calss?:String; //按钮样式
    size?: 'large' | 'default' | 'small'; //按钮大小
}

export class MbList{
    search?:MbSearch; //查询条件
    tools?:Array<MbToolButton> = [];
    table:MbTable;
}
