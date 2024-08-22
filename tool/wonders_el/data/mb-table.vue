<template>
  <el-table
    :key="tableKey"
    :row-key="row=>row.id"
    v-loading="listLoading"
    :data="list"
    fit
    highlight-current-row
    style="flex: 1;margin-bottom: 20px;"
    ref="tableRef"
    @sort-change="sortChange"
    @selection-change="selectionChange"
    @current-change="currentChange"
    @clearSelection="clearSelection"
    @row-click="rowClick"
    :header-cell-style="{ background: '#FAFAFA', color: '#1D1F24' }"
  >
    <el-table-column v-if="selection" align="center" type="selection" width="50" />
    <el-table-column v-if="showNo" label="序号" prop="num" align="center" width="65">
      <template #default="scope">
        <span>{{ scope.$index + 1 }}</span>
      </template>
    </el-table-column>
    <mb-table-column v-for="(col, i) in cols" :key="i" :col="col">
      <template v-for="(value , key) in $slots" #[key]="{ row, index }">
        <slot :row="row" :index="index" :name="key" />
      </template>
    </mb-table-column>
    <template empty>
      {{list.length}}
      <el-empty :description="emptyText" />
    </template>
  </el-table>
  <mb-pagination
    v-show="total > 0 && page"
    :total="total || 0"
    :page="listCurrent"
    :limit="listSize"
    @pagination="handlerPagination"
  />
</template>

<script setup>
import { ref, reactive, watch, onMounted, getCurrentInstance, nextTick } from 'vue'
import { QueryWrapper } from '@/api/tool/QueryWrapper.js'
import Sortable from 'sortablejs'
const { proxy } = getCurrentInstance()
const props = defineProps({
  props: {
    type: Object,
    default: () => { }
  },
  limit: {
    type: Number,
    default: 10
  },
  page: {
    type: Boolean,
    default: true
  },
  done: {
    type: Function,
    default: () => { }
  },
  where: {
    type: Object,
    default: () => {
      return {}
    }
  },
  maxHeight: {
    type: Number,
    default: 360
  },
  showNo: {
    type: Boolean,
    default: true
  },
  selection: {
    type: Boolean,
    default: false
  },
  data: {
    type: Array,
    default: null
  },
  cols: {
    type: Array,
    default: () => []
  },
  emptyText: {
    type: String,
    default: '暂无数据'
  },
  title: {
    type: String,
    default: ''
  },
  queryWrapper: {
    type: Function,
    default: () => { }
  },
  rowClick: {
    type: Function,
    default: () => { }
  },
  listFun: {
    type: Function
  },
  exportFun: {
    type: Function
  },
  sortFun: {
    type: Function
  },
  isSort: {
    type: Boolean,
    default: false
  },
  isQueryWarpper: {
    type: Boolean,
    default: true
  }
})

const tableData = ref([])
const tableRef = ref(null)

const rowFun=(row)=>{
  return row.id
}

watch(() => props.data, (val) => {
  tableData.value = val
}
)
const emit = defineEmits(['selection-change', 'current-change', 'clearSelection'])

const listCurrent = ref(1)
const listSize = ref(10)
const total = ref(0)
const list = ref([])
const listLoading = ref(false)
const tableKey = ref(0)
let newWhere = reactive({})

function renderWhere() {
  newWhere = JSON.parse(JSON.stringify(props.where));
  console.log(newWhere)
}
function rowClick(row) {
  props.rowClick(row)
}
function getList(size) {
  renderWhere()
  listLoading.value = true;
  var then = (res) => {
    const { data } = res
    if (data != null) {
      total.value = data.total
      list.value = data.records || data;
      listLoading.value = false;
      console.log(list.value)
    } else {
      total.value = 0;
      list.value = [];
      listLoading.value = false;
    }
    props.done()

  }
  let query = [];
  let sortList = [];

  if (props.isQueryWarpper == true) {
    for (let key in newWhere) {
      if (key !== 'size' && key !== 'current') {
        if (newWhere[key].value != null && newWhere[key].value != '') {
          console.log(newWhere[key].value)
          query.push({
            field: key,
            value: newWhere[key].value instanceof Array ? newWhere[key].value : [newWhere[key].value],
            condition: newWhere[key].condition,
            children: []
          })


        } else {

        }
        console.log(newWhere[key])
        if (newWhere[key].sort) {
          console.log(newWhere[key].sort)
          sortList.push({
            field: key.toUpperCase(), sortType: newWhere[key].sort
          })
        }
      }
    }
    var param = {
      page: {
        no: listCurrent.value,
        size: size
      },
      query,
      sort: sortList
    }
  } else {
    let obj = {}
    for (let key in newWhere) {
      obj[key] = newWhere[key].value
    }
    console.log(obj)
    var param = Object.assign({
      page: {
        no: listCurrent.value,
        size: size
      }
    }, obj)
  }

  const params = props.queryWrapper(newWhere, param.page.no, param.page.size) || [param]
  // const params = props.queryWrapper(newWhere, param) || [param]

  props.listFun(...params).then(res => {
    then(res);
  })
}

function sortChange(column) {
  let order = column.order
  if (order) {
    order = order === 'descending' ? 'desc' : ''
    order = column.prop + ' ' + order
  } else {
    order = null
  }
  newWhere.orderBy = order
  reload()
}
//多选
function selectionChange(columns) {
  emit('selection-change', columns)
}
//单选
function currentChange(columns) {
  emit('current-change', columns)
}

//取消选中
function clearSelection() {
  tableRef.value.clearSelectionFun()
}

function reload() {
  if (props.listFun) {
    newWhere.current = 1
    listCurrent.value = 1
    getList(props.limit)
  }
  if (props.data) {
    handlerData()
  }
}

function renderExportData(sourceData) {
  var data = []
  var fields = props.cols.filter(it => it.type != 'btns')
  if (sourceData !== null) {
    sourceData.forEach(it => {
      var row = {}
      fields.forEach(f => {
        if (f.exportTemplet) {
          row[f.label] = f.exportTemplet(it)
        } else if (f.templet) {
          row[f.label] = f.templet(it)
        } else {
          row[f.label] = it[f.field]
        }
      })
      data.push(row)
    })
    return data
  } else {
    proxy.$notify({
      title: '失败',
      message: '导出失败，该列表数据为空',
      type: 'error',
      duration: 2000
    })
  }

}

function exportExcel() {
  if (this.exportFun) {
    var where = proxy.$common.renderWhere(props.where)
    where.size = 99999999
    var then = (res) => {
      const { data } = res;
      proxy.$common.exportExcel({
        data: renderExportData(data.list || data),
        fileName: props.title
      })
    }
    props.listFun(...props.queryWrapper(where)).then(res => {
      then(res);
    })
  } else if (props.data) {
    proxy.$common.exportExcel({
      data: props.data,
      fileName: props.title
    })
  }
}

function handlerData() {
  listLoading.value = true
  total.value = props.data.length
  var currPageData = []
  if (props.page) {
    newWhere.size = newWhere.size || 10
    props.data.forEach((it, i) => {
      if (i >= ((listCurrent.value - 1) * newWhere.size) && i < (listCurrent.value * newWhere.size) && currPageData.length < newWhere.size) {
        currPageData.push(it)
      }
    })
    console.log(currPageData)
  } else {
    console.log("使用自带数据1", props.data)
    currPageData = props.data
  }
  list.value = currPageData
  listLoading.value = false
  props.done()

}

function handlerPagination(page) {
  newWhere.current = page.page;
  newWhere.size = typeof (page.limit) == 'number' ? page.limit : page.limit._value;
  listCurrent.value = page.page;
  listSize.value = typeof (page.limit) == 'number' ? page.limit : page.limit._value;
  if (props.listFun) {
    getList(newWhere.size)
  }
  if (props.data) {
    handlerData()
  }
}

function keyup() {
  document.onkeyup = (e) => {
    if (e.target.nodeName != 'INPUT') {
      if (e && e.keyCode == 37) {
        if (listCurrent.value != 1) {
          listCurrent.value -= 1
          handlerPagination()
        }
      } else if (e && e.keyCode == 39) {
        if (listCurrent.value != parseInt((total.value + props.limit - 1) / props.limit)) {
          listCurrent.value += 1
          handlerPagination()
        }
      }
    }
  }
}

watch(() => props.data, () => {
  listCurrent.value = 1
  handlerData()
}, { deep: true })

watch(() => props.where, () => {
  renderWhere()
}, { deep: true })

renderWhere()

onMounted(() => {
  keyup()
  if (props.data) {
    handlerData()
  }
  if (props.listFun) {
    newWhere.size = props.limit;
    getList(newWhere.size)
  }
  nextTick(() => {
    if (props.isSort) {
      initSortableList()
    }
  })
})
function initSortableList() {
  let el = tableRef.value.$el.querySelector('.el-table__body-wrapper tbody')
  //设置配置
  Sortable.create(el, {
    group: {
      name: 'id',
      pull: true,
      put: true,
    },
    animation: 150, // ms, number 单位：ms，定义排序动画的时间
    onAdd: function (evt) {
      // 拖拽时候添加有新的节点的时候发生该事件
      // console.log('onAdd.foo:', [evt.item, evt.from])
    },
    onUpdate: function (evt) {
      // 拖拽更新节点位置发生该事件
      // console.log('onUpdate.foo:', [evt.item, evt.from])
    },
    onMove: function (evt) {
      // 拖拽节点位置发生该事件
      // console.log('onMove.foo:', [evt.item, evt.from])
    },
    onRemove: function (evt) {
      // 删除拖拽节点的时候促发该事件
      // console.log('onRemove.foo:', [evt.item, evt.from])
    },
    onStart: function (evt) {
      // 开始拖拽出发该函数
      // console.log('onStart.foo:', [evt.item, evt.from])
    },
    onSort: function (evt) {
      // 发生排序发生该事件
      // console.log('onSort.foo:', [evt.item, evt.from])
    },
    onEnd({ newIndex, oldIndex }) {
      console.log(newIndex, oldIndex);
      let toRow = list.value[newIndex]
      let selectRow = list.value.splice(oldIndex, 1)[0]
      list.value.splice(newIndex, 0, selectRow)
      sortList(toRow.id, selectRow.id, newIndex > oldIndex ? false : true)
    },
  })
}
//排序
function sortList(endId, startId, isUp) {
  let params = {
    endId: endId,
    startId: startId,
    isUp: isUp,
  }
  props.sortFun(params)
    .then(res => {
      if (res.code == 0) {
        reload()
      }
    })
    .catch(err => {
      proxy.$modal.msgError(err.msg)
    })
}
defineExpose({ reload, exportExcel })

</script>

<style scoped>
.el-table :deep(.el-image .el-image__inner) {
  max-height: 100px;
  width: auto;
  height: auto;
}

.el-table :deep(.el-table__cell) {
  z-index: auto;
}
</style>

<style>
.el-table-column--selection .cell {
  padding: 0px 15px !important;
}

.el-table th {
  background: #f5f7fa;
}
</style>
