<template>
  <div>
    <div style="margin-bottom: 5px;" v-if="expand || checked">
      <el-button
        v-if="expand"
        type="primary"
        icon="ElIconSort"
        plain
        @click="doExpand($event)"
      >展开/折叠</el-button>
      <!-- <el-button
        v-if="checked"
        type="primary"
        icon="ElIconCheck"
        plain
        @click="() => { treeAllChecked = !treeAllChecked; checkedAll(treeData, treeAllChecked) }"
      >全选/全不选</el-button>-->
    </div>
    <div style="margin-bottom: 5px;" v-if="search">
      <el-input
        v-model="searchValue"
        placeholder="输入关键字进行过滤"
        @input="tree.filter(searchValue)"
        :style="{ width: searchWidth }"
      />
    </div>
    <el-tree
      v-if="refreshTree"
      ref="tree"
      :check-strictly="checkStrictly"
      :data="treeData"
      v-bind="props.props"
      node-key="id"
      :show-checkbox="showCheckbox"
      :default-expand-all="defaultExpandAll"
      @check-change="checkChange"
      @node-click="nodeClick"
      :props="defaultProps"
      :filter-node-method="searchTree"
      :style="style"
      @check="getCurrentNode"
    />
  </div>
</template>

<script setup>

import { watch, ref, reactive, nextTick, getCurrentInstance, onBeforeMount } from 'vue'

const { proxy } = getCurrentInstance()

const emit = defineEmits(['update:modelValue', 'check-change', 'node-click',])

const props = defineProps({
  url: {
    type: String,
    default: ''
  },
  params: {
    type: Object,
    default: () => { }
  },
  modelValue: {
    type: String,
    default: ''
  },
  style: {
    type: Object,
    default: () => { }
  },
  props: {
    type: Object,
    default: () => { }
  },
  expand: {
    type: Boolean,
    default: true
  },
  checked: {
    type: Boolean,
    default: true
  },
  search: {
    type: Boolean,
    default: false
  },
  searchWidth: {
    type: String,
    default: '230px'
  },
  loadDataFun: {
    type: Function,
    default: () => { }
  },
  defaultProps: {
    type: Object,
    default: {
      children: 'children',
      label: 'name'
    }
  },
  showCheckbox: {
    type: Boolean,
    default: false
  },
  disabledField: {//用来判断不能勾选的节点
    type: Object,
    default: null
  },
  allDisabled: false,
  checkStrictly: {
    type: Boolean,
    default: false
  },
  initCheckAll: {
    type: Boolean,
    default: false
  }
})
console.log(props.initCheckAll);
watch(() => props.initCheckAll, (newVal, oldVal) => {
  if (!newVal) {
    checkedAll(treeData.value, false)
  } else {
    checkedAll(treeData.value, true)

  }
})

const tree = ref()
const treeData = ref([])
const defaultExpandAll = ref(true)
const refreshTree = ref(false)
const treeAllChecked = ref(false)
const searchValue = ref('')
const isAll = ref(false)
onBeforeMount(async () => {
  await loadTreeData()
})

watch(() => props.modelValue, (value) => {
  nextTick(() => selectIds(value))
})

watch(props, (oldVal, newVal) => {
  if (newVal.initCheckAll == true && isAll.value == false) {
    setTimeout(() => {
      checkedAll(treeData.value, true)
    }, 1000)
  }
})
function selectIds(ids) {
  if (!ids.length > 0) return
  ids = ids.split(',')
  for (var i = 0; i < ids.length; i++) {
    tree.value && tree.value.setChecked(ids[i], true, false)
  }
}

function searchTree(value, data) {
  if (!value) return true
  return data.name.includes(value)
}

function doExpand(value) {
  let treeList = treeData.value;
  for (let i = 0; i < treeList.length; i++) {
    tree.value.store.nodesMap[treeList[i].id].expanded = !tree.value.store.nodesMap[treeList[i].id].expanded;
  }

  // refreshTree.value = false
  // defaultExpandAll.value = !defaultExpandAll.value
  // nextTick(() =>
  //   refreshTree.value = true
  // )
}

async function loadTreeData() {
  if (treeData.value.length == 0) {
    let param = [props.params];
    await props.loadDataFun(...param).then((res) => {
      treeData.value = res.data.list ? res.data.list : res.data;
      if (props.disabledField != null) {
        filterAbledData(treeData.value, props.disabledField)
      }
    })
    refreshTree.value = true
    nextTick(() => selectIds(props.modelValue))
  }
}

function getTree() {
  return tree.value
}

function checkChange(node) {
  var selectMenus = []
  var checkedNodes = tree.value.getCheckedNodes(false, true)
  for (var i = 0; i < checkedNodes.length; i++) {
    selectMenus.push(checkedNodes[i].id)
  }
  emit('update:modelValue', selectMenus.join(','))
  emit('check-change', selectMenus.join(','))
}
// 
const getCurrentNode = () => {

}



// 
function nodeClick(param1, param2, param3) {
  emit('node-click', param1, param2, param3)
}

function checkedAll(children, checked) {
  isAll.value = true;
  if (tree.value) {
    for (var i in children) {
      var id = children[i].id
      if (children[i].children && children[i].children.length > 0) {
        checkedAll(children[i].children, checked)
      }
      tree.value.setChecked(id, checked, true)
    }
  }
}
function filterAbledData(array, obj) {
  for (let i = 0; i < array.length; i++) {
    let temp = array[i]
    if (props.allDisabled == false) {
      if (temp[obj.field] == obj.value) {
        temp['disabled'] = true;
        if (temp.children && temp.children.length > 0) {
          filterAbledData(temp.children, obj)
        }
      }
    } else {
      temp['disabled'] = true;
      if (temp.children && temp.children.length > 0) {
        filterAbledData(temp.children, obj)
      }
    }

  }
}
defineExpose({ getTree })

</script>

