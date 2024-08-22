<template>
  <el-checkbox-group
    v-model="selectValue"
    :size="size"
    :disabled="disabled"
    :min="min"
    :max="max"
    :text-color="textColor"
    :fill="fill"
    @change="change"
  >
    <el-checkbox-button v-if="button" v-for="it in checkboxOptions" :key="it.id" v-bind="it" :label="it[valueField]">
      {{ it[labelField] }}
    </el-checkbox-button>
    <el-checkbox v-if="!button" v-for="it in checkboxOptions" v-bind="it" :label="it[valueField]"  :key="it.id">
      {{ it[labelField] }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup>
  import {watch, ref, getCurrentInstance, onMounted} from "vue";
  // import request from '@/scripts/request'
  const emit = defineEmits(['update:modelValue', 'change'])
  const { proxy } = getCurrentInstance()

  const props = defineProps({
    modelValue: {
      required: true
    },
    type: String,
    button: {
      type: Boolean,
      default: false
    },
    options: Array,
    url: String,
    paramData: Object,
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
    min: Number,
    max: Number,
    textColor: {
      type: String,
      default: '#fff'
    },
    fill: {
      type: String,
      default: '#409EFF'
    },
    join: {
      type: Boolean,
      default: true
    },
    loadDataFun:{
      type:Function
    }
  })

  const selectValue = ref([])
  const checkboxOptions = ref([])

  watch(() => [props.type, props.url, props.options], () => {
    loadData()
  }, { deep: true })

  watch(() => props.modelValue, (value) => {
    setValue(value)
  })

  watch(selectValue, (value) => {
    if(props.join){
      emit('update:modelValue', value.join(','))
      emit('change', value.join(','))
    }else{
      emit('update:modelValue', value)
      emit('change', value)
    }
  })

  onMounted(() => {
    loadData()
  })

  function setValue(value){
    if(value){
      if(props.join){
        selectValue.value = value.split(',')
      }else{
        selectValue.value = value
      }
    }
  }

  function loadData(){
    console.log("字典类型", props.type)
    if(props.type){
      setDictData(proxy.useDict(props.type))
      setValue(props.modelValue)
    }else if(props.loadDataFun){
      props.loadDataFun(...props.paramData).then(res => {
          checkboxOptions.value = res.data.list || res.data
          setValue(props.modelValue)
        })      
    }else if(props.options){
      checkboxOptions.value = props.options
      setValue(props.modelValue)
    }
  }

  function setDictData(dictData){
    if (dictData[props.type].value.length > 0) {
      checkboxOptions.value = dictData[props.type].value
      setValue(props.modelValue)
  }
  watch(dictData[props.type], (val) => {
    checkboxOptions.value = val
    setValue(props.modelValue)
  })
  }

  function change(value){
    emit('change', value)
  }

</script>
