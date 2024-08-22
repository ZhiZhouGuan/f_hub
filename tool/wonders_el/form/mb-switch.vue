<template>
  <el-switch
    v-model="selectValue"
    :active-value="props.activeValue?props.activeValue:1"
    :inactive-value="props.inactiveValue?props.inactiveValue:0"
    v-bind="props.props"
    @change="props.change"
    :before-change="props.beforeChange"
  />
</template>

<script setup>
import {ref, watch} from 'vue'
  const emit = defineEmits(['update:modelValue'])
  const selectValue = ref(false)
  const props = defineProps({
    modelValue: {
      default: false
    },
    activeValue: Boolean | String | Number,
    inactiveValue: Boolean | String | Number,
    props: {
      type : Object,
      default : {}
    },
    change:Function,
    beforeChange:Function
  })
  if(props.modelValue instanceof Boolean | String | Number){
    selectValue.value = props.modelValue
  }
  watch(() => props.modelValue, (value) => {
    selectValue.value = value
  })
  watch(selectValue, (value) => {
    if(selectValue.value !== props.modelValue){
      emit('update:modelValue', value)
    }
  })
</script>
