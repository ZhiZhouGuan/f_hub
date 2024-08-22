export class MbPagination{
    total: Number; //总数
    page?:Number = 1; //页码
    limit?:Number = 1;  //每页限制条数
    pageSizes?:Array<Number> = [10, 20, 30, 50];
    layout?:String = 'total, sizes, prev, pager, next, jumper'; //
    background?:Boolean = true; //背景
    autoScroll?:Boolean = true; //自动滚动
    hidden?:Boolean = false; //隐藏
}

export class WhereObj{
  label:String; //字段名称
    component: String; //组件名称，类如 input | treeselect| select
    value?:any; //属性值
    type?:'year' | 'years' |'month' | 'date' | 'dates' | 'datetime' | 'week' | 'datetimerange' | 'daterange' | 'monthrange' = 'date'; //显示类型，日期组件有效
    format?:String ; //'显示在输入框中的格式' component为date 时有效
    valueFormat?:String; //日期值的格式
    props?:Object = {}; //组件所支持的其他属性或方法，可参考 https://element-plus.gitee.io/zh-CN/component/overview.html

}

export class Where{
    [prop:String]:WhereObj;
}

export class MbSearch{
    where?:Where = {}; //
    noReset?: String = '';
}

export class MbColButton{
  permission?:String; //权限值 根据权限判断是否显示
  if?:Function; //If判断是否显示return true显示 return false不显示
  icon?:String; //可以使用图标集合的所有图标，要加前缀：ElIcon
  type?:'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' = 'text' ;//按钮类型
  size?: 'large' | 'default' | 'small'  = 'small';  //按钮大小
  class?: String ;//按钮样式
  click?:Function; //点击触发方法,
}

export class MbColumn{
  props?:Object = {}; //列属性，支持el-table-colum支持的所有属性
  field:String;  //对应字段编码
  label:String;  //对应字段名称
  align?:'left' | 'center' | 'right'  = 'center';  //对齐方式
  width?:Number;  //列宽度
  fixed?:'left' | 'right' | Boolean = false; //列是否固定
  sortable?:Boolean | 'custom' | 'server' = false; //对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件
  templet?: String | Function;
  dictType?: String; //字段类型
  type?: 'dynamic' | 'switch' | 'btns' | 'image' | 'html' ; // dynamic为动态组件插槽
  activeValue?: String|Boolean|Number; //激活的的值，type=switch时有效
  inactiveValue?: String|Boolean|Number; //非激活时的值 type=swithc时有效
  if?:Function; //type=swithc时有效,返回true时，表示激活
  btns?:Array<MbColButton>; //type=btns时有效。
}

export class MbTable{
  props?: Object = { }; //el-table支持的其他的属性何方法
  limit?: Number = 10; //每页显示条数
  page?: Boolean = true; //是否进行分页
  done?: Function = () => { }; //加载完成后的处理
  where?: Where = {}; //查询条件
  showNo?: Boolean = true; //是否显示序号
  selection?: Boolean = false; //是否支持选择，默认不支持
  data?: Array<any> = []; //要显示的数据
  cols?: Array<MbColumn> = []; //列配置信息
  emptyText?: String = '暂无数据' ;//无数据时显示的文本
  title?:String = ''; //表格标题
  queryWrapper?:Function = ()=>{} //查询条件生成函数
  listFun?:Function;  //查询方法，为promise
  exportFun?:Function; //导出方法
}

export class MbTree{
  url?: String;
  params?: Array<Object> = []; //查询参数
  modelValue?: String = ''; //值
  style?: Object = {}; //el-tree的style属性
  props?: Object = {}; //el-tree支持的其他属性和方法
  expand?:  Boolean = true; //默认是否展开
  checked?: Boolean = true; //是否允许勾选
  search?:Boolean = false; //是否开启检索功能
  searchWidth?:String = '230px'; //搜索框宽度	
  loadDataFun?:Function;  //从后台加载数据的API方法
}


export class MbTreeSelect{
  modelValue?:  String; //值
  loadDataFun: Function; //加载树的请求接口
  params: Array<Object> = []; //接口请求的参数
  itemLabel: String;  //显示文本的字段
  placeholder?: String; //占位显示内容
  props?: Object = {} ; //treeselect支持的其他属性
}



