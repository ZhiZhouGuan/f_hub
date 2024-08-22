<template>
  <el-radio-group
    v-model="selectValue"
    :size="size"
    :disabled="disabled"
    :text-color="textColor"
    :fill="fill"
    @change="change"
  >
    <el-radio-button
      v-if="button"
      v-for="it in options"
      v-bind="it"
      :label="it[valueField]"
    >{{ it[labelField] }}</el-radio-button>
    <el-radio
      v-if="!button"
      v-for="it in options"
      v-bind="it"
      :label="it[valueField]"
    >{{ it[labelField] }}</el-radio>
  </el-radio-group>
</template>

<script setup>
import { watch, ref, getCurrentInstance } from "vue";
// import request from '@/scripts/request'
const emit = defineEmits(['update:modelValue', 'change'])
const { proxy } = getCurrentInstance()

const selectValue = ref('')
const props = defineProps({
  modelValue: String | Number | Boolean,
  type: String,
  button: {
    type: Boolean,
    default: false
  },
  options: Array,
  url: String,
  paramData: Array,
  method: {
    type: String,
    default: 'get'
  },
  labelField: {
    type: String,
    default: 'label'
  },
  valueField: {
    type: String,
    default: 'value'
  },
  size: String,
  disabled: {
    type: Boolean,
    default: false
  },
  textColor: {
    type: String,
    default: '#fff'
  },
  fill: {
    type: String,
    default: '#409EFF'
  },
  loadDataFun: {
    type: Function
  }
})

selectValue.value = props.modelValue

const options = ref([])

if (props.type) {
  listDict(proxy.useDict(props.type))
} else if (props.loadDataFun) {
  var then = (res) => {
    options.value = res.data.list || res.data
  }
  props.loadDataFun(...props.paramData).then(res => {
    then(res)
  })
} else if (props.options) {
  options.value = props.options
}

function listDict(dictData) {
  if (dictData[props.type].value.length > 0) {
    options.value = dictData[props.type].value
  }
  watch(dictData[props.type], (val) => {
    options.value = val
  })
}

function change(value) {
  emit('change', value)
}
watch(() => props.modelValue, (value) => {
  selectValue.value = value
})
watch(selectValue, (value) => {
  emit('update:modelValue', value)
})
</script>
