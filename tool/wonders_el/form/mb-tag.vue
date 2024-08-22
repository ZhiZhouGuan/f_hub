<template>
    <el-tag
      v-for="tag in dynamicTags"
      :key="tag"
      closable
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
</template>
<script setup>
import {ref, watch} from 'vue'
  const emit = defineEmits(['update:modelValue'])
  const selectValue = ref('')
  const props = defineProps({
    closable:{
        type:Boolean,
        default:false
    },
    hit:{
        type:Boolean,
        default:false
    },
    color:{
      type:String,
      default:'' 
    },
    size:{
        default:'large' | 'default' | 'small'
    },
    type:{
        default:'primary' | 'success' | 'info' | 'warning' | 'danger'
    },
    round:{
        type:Boolean,
        default:false
    },
     loadDataFun: Function,
     

  })
  selectValue.value = props.modelValue
  watch(() => props.modelValue, (value) => {
    selectValue.value = value
  })
  watch(selectValue, (value) => {
    emit('update:modelValue', value)
  })
</script>