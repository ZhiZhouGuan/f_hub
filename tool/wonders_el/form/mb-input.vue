<template>
  <el-input
    v-model="selectValue"
    :type="type"
    :show-word-limit="!props.maxlength?true:false"
    :placeholder="placeholder || (itemLabel && '请输入' + itemLabel)"
    v-bind="props.props"
  />
</template>

<script setup>
import { ref, watch } from 'vue'
const emit = defineEmits(['update:modelValue'])
const selectValue = ref('')
const props = defineProps({
  modelValue: String,
  itemLabel: String,
  placeholder: String,
  type: String,
  props: Object
})
selectValue.value = props.modelValue
watch(() => props.modelValue, (value) => {
  selectValue.value = value
})
watch(selectValue, (value) => {
  emit('update:modelValue', value)
})
</script>
