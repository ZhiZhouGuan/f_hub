# mb-listAPI

| 序号 | 名称 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- | --- |
| 1 | table | 表格配置数据，用于控制表格的查询条件、分页、加载等功能 | Array | null |
| 2 | tools | 表头上的按钮，具体参见下方buttonDetails的属性 | Array | null |

table属性
| 序号 | 名称 | 说明 | 类型 | 默认值 | 参数 |
| --- | --- | --- | --- | --- | --- |
| 1 | where | 查询条件,具体参见whereDetials的说明 | Object | null ||
|2|limit|每页显示条数|Number|10||
|3|page|是否分页|Boolean|true||
|4|done|列表加载完成后调用的函数|Function|()=>{}||
|5|showNo|是否显示序号|Boolean|true||
|6|selection|是否显示复选框|Boolean|false||
|7|data|显示的数据，如果listFun不为空时有效|Array|null||
|8|cols|列属性，具体见下方columnDetials属性|Array|[]||
|9|emptyText|没有数据时，显示的提示信息|String|'暂无数据'||
|10|title|进行excel数据导出是，显示的表头数据|String|''||
|11|queryWrapper|组装查询条件的参数，输出查询接口方法所需要的参数数据|Function|()=>{}|where|
|12|listFun|查询数据的API函数|Function|()=>{}||
|13|exportFun|导出excel函数|Function|null||
|14|props|其他配置属性，至此el-table的其他属性，具体参见element-plus的[table组件](https://element-plus.gitee.io/zh-CN/component/table.html)|Object|{}|


where属性

where属性的key作为对应的字段的编码
| 序号 | 名称 | 说明 | 类型 | 默认值 | 参数 |
| --- | --- | --- | --- | --- | --- |
|1|label|条件标题|String|''||
|2|value|属性值|String|''||
|3|type|组件类型，input / select / date / datetime / daterange / datetimerange / inputrange / 其他全局注册的组件名称|String|mb-input||
|4|props|el的相关组件的其他属性|Object|{}||
|5|condition|查询条件|String|eq||

table-cols属性

| 序号 | 名称 | 说明 | 类型 | 可选值|默认值 | 示例 |
| --- | --- | --- | --- | --- |--- | --- |
|1|cols|可以嵌套无限个cols实现多表头|Object|--|--||
|2|props|	el-table-column原生属性配置：表格列属性	|Object|--|||
|3|field|	字段名|	String	|—	|—|	—||
|4|label|	列标题|	String	|—	|—	|—||
|5|align|	对齐方式|	String|	left / center / right	|center||	
|6|width|	宽度	|String	—|	—	|—||
|7|fixed|	列是否固定在左侧或者右侧。 true 表示固定在左侧	|String / Boolean|	true / 'left' / 'right'|	—|	—|
|8|sortable|	对应列是否可以排序， 如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sort-change 事件	|Boolean / String|	true / false / 'custom'	|false|	—|
|9|if|	if判断是否显示此列	|Function|	—	|—	|—|
|10|click|	单击回调方法|	Function| — | —| | 
|11|templet|	模板方法,用于变更显示的内容，此方法优先级大于dictType|	Function |	—	|—| 





方法