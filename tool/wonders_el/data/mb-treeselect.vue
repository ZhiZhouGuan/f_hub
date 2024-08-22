<template>
  <el-tree-select v-model="selectValue" :data="options" :key="modelValue" :render-after-expand="false"
    :placeholder="placeholder || (itemLabel && '请选择' + itemLabel)" v-bind="props.props" />
</template>

<script setup>
import { ref, getCurrentInstance, watch } from "vue"
const emit = defineEmits(['update:modelValue'])
const selectValue = ref(null)
const { proxy } = getCurrentInstance()
const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  loadDataFun: Function,
  params: {
    type: Array,
    default: []
  },
  itemLabel: String,
  placeholder: String,
  props: Object
})

selectValue.value = props.modelValue
watch(() => props.modelValue, (value) => {
  selectValue.value = value
})
watch(selectValue, (value) => {
  emit('update:modelValue', value)
})

const options = ref([])

if (props.loadDataFun) {
  props.loadDataFun(...props.params).then(res => {
    console.log(props.props)
    options.value = res.data
    proxy.$treeTable.deleteEmptyChildren(options.value)
  })
}


</script>
