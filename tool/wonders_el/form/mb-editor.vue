<template>
  <div class="tinymce-box">
    <SunEditor
      :domId="id"
      ref="id"
      v-bind="props.props"
      v-model="content"
      v-if="isShow"
      :templates="templates"
      v-on="events"
      :disabled="disabled"
    />
  </div>
</template>
<script setup>
import { watch, ref, onMounted } from "vue";
import common from "@/utils/common"
const id = ref("sunEditor_" + common.uuid())
defineOptions({
  inheritAttrs: false
})

const emit = defineEmits(["update:modelValue"])
const content = ref()
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  isShow: {
    type: Boolean,
    default: true
  },
  templates: {
    type: Array,
    default: []
  },
  props: {
    type: Object,
    default: {}
  },
  disabled: {
    default: false
  },
  events: {
    type: Object,
    default: {}
  },
})
onMounted(() => {
  setTimeout(()=>{
     content.value = props.modelValue;
  },800)
})
watch(content, (val) => {
  emit("update:modelValue", val)
})
</script>
<style scoped lang="scss">
.tinymce-box {
  width: 100%;
  min-height: 400px;
}
</style>
