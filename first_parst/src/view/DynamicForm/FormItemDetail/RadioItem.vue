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
        <el-radio-group v-bind="attrs" v-model="formState.payload.value">
            <el-radio v-for="(item, index) in formState.payload.options" :key="index" :value="item.value">{{item.label}}</el-radio>
        </el-radio-group>
    </el-form-item>
</template>

<style lang="scss" scoped></style>