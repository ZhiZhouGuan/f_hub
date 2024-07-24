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
        <el-select v-bind="attrs" v-model="formState.payload.value">
            <el-option v-for="item in formState.payload.options" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
    </el-form-item>
</template>

<style lang="scss" scoped></style>