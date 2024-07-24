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
        <el-checkbox-group v-bind="attrs" v-model="formState.payload.value">
            <el-checkbox v-for="item in formState.payload.options" :key="item.value" :label="item.label" :value="item.value"></el-checkbox>
        </el-checkbox-group>
    </el-form-item>
</template>

<style lang="scss" scoped></style>