<script setup lang="ts">
import { useAttrs} from "vue"
import { FormItem } from "@/type"

const attrs = useAttrs()
const props = defineProps<{
    formState: FormItem
}>()
</script>

<template>
    <el-form-item :label="formState.payload.label">
        <el-input v-bind="attrs" v-model="formState.payload.value"/>
    </el-form-item>
</template>

<style lang="scss" scoped></style>