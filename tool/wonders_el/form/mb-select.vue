<template>
  <el-select v-model="selectValue" v-bind="props.props" :multiple="multiple" :style="{ width }" @change="handleChange"
    :placeholder="placeholder || (itemLabel && '请输入' + itemLabel)" filterable clearable>
    <el-option v-for="item in selectList" :key="item.value" :label="item.label" :value="props.splicing==true?item.label+'@'+item.value:queryValue=='label'?item.label:item.value">
      <span style="float: left">{{ item.label }}</span>
      <span v-if="showValue" style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">{{ item.value
        }}</span>
    </el-option>
  </el-select>
</template>

<script setup>

import { ref, watch, onMounted, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
  modelValue: {
    required: true
  },
  type: {
    type: String,
    default: ''
  },
  options: {
    type: Array,
    default: () => []
  },
  url: {
    type: String,
    default: ''
  },
  params: {
    type: Array,
    default: []
  },
  labelField: {
    type: String,
    default: 'label'
  },
  valueField: {
    type: String,
    default: 'value'
  },
  props: {
    type: Object,
    default: () => { }
  },
  width: {
    type: String,
    default: '100%'
  },
  allOption: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: String,
    default: ''
  },
  itemLabel: String,
  multiple: {
    type: Boolean,
    default: false
  },
  join: {
    type: Boolean,
    default: true
  },
  splicing:{//是否拼接：value=label_value,目的是保存要传label的值
    type: Boolean,
    default: false
  },
  queryValue:{//动态控制筛选的值，有可能是lable来进行筛选
    type: String,
    default:'value'
  },
  showValue: {
    type: Boolean,
    default: false
  },
  loadDataFun: Function,
  handleChange:{
    type:Function,
    default:()=>{}
  }
})

const selectList = ref([])
const selectValue = ref(props.multiple ? [] : '')
function handleChange(value){
  localStorage.setItem('selectValue',value)
  props.handleChange(value)
}
watch(() => [props.type, props.url, props.options], () => {
  loadData()
}, { deep: true })

watch(() => props.modelValue, (value) => {
  setValue(value)
})

watch(selectValue, (value) => {
  if (props.multiple && props.join) {
    emit('update:modelValue', value.join(','))
    emit('change', value.join(','))
  } else {
    emit('update:modelValue', value)
    emit('change', value)
  }
})

onMounted(() => {
  loadData()
})

function setValue(value) {
  if (props.multiple && props.join) {
    selectValue.value = value ? value.split(',') : []
  } else {
    selectValue.value = value ? value.toString() : ''
  }
}

function loadData() {
  try {
    if (props.type) {
      listConcatDict(proxy.useDict(props.type))
    } else if (props.loadDataFun) {
      props.loadDataFun(...props.params).then(res => {
        if(res.code==0&&res.data!=null){
          listConcat(handlerData(res.data.records || res.data.list || res.data))
        }else{
          listConcat(handlerData([]))
        }
      })
    } else if (props.options && props.options.length > 0) {
      listConcat(handlerData(props.options))
    }
  } catch (e) {
    console.log(e)
  }

}

function listConcatDict(dictData){
  if(dictData[props.type].value.length > 0){
    listConcat(dictData[props.type].value)
  }
  watch(dictData[props.type],(val)=>{
    listConcat(val)
  })
}

function listConcat(dictData) {
  if (props.allOption) {
    selectList.value = [{
      value: '',
      label: '全部'
    }]
    selectList.value = selectList.value.concat(dictData)
  } else {
    selectList.value = dictData
  }
  setValue(props.modelValue)
}

function handlerData(data) {
  var newData = []
  data.forEach(it => {
    newData.push({
      label: it[props.labelField],
      value: it[props.valueField].toString()
    })
  })
  return newData
}
defineExpose({ loadData })
</script>
