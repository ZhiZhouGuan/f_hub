<template>
  <el-date-picker
    v-model="selectValue"
    :type="type"
    :format="format"
    :value-format="valueFormat"
    :placeholder="placeholder"
    range-separator="至"
    :start-placeholder="startPlaceholder"
    :end-placeholder="endPlaceholder"
    :disabled="disabled"
    v-bind="props.props"
  />
</template>

<script setup>
  import { watch, ref } from 'vue'
  const emit = defineEmits(['update:modelValue'])
  const selectValue = ref('')
  const props = defineProps({
    modelValue: String,
    type: {
      type:String,
      default:'date'
    },
    placeholder: {
      type: String,
      default: '请选择时间'
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD'
    },
    valueFormat: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    },
    startPlaceholder: {
      type: String,
      default: '开始时间'
    },
    endPlaceholder: {
      type: String,
      default: '结束时间'
    },
    disabled: {
      type: Boolean,
      default: false
    },
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
