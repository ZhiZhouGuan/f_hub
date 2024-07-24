<script setup lang="ts">
import { computed } from 'vue';
import { FormItem } from "@/type";
import InputItem from './InputItem.vue';
import SelectItem from './SelectItem.vue';
import RadioItem from './RadioItem.vue';
import CheckboxItem from './CheckboxItem.vue';
defineOptions({
    name: "FormItemDetails"
})

const props = defineProps<{
    formState: FormItem | null
}>()

function getNext(): FormItem | null {
    let cur: FormItem | null = props.formState;
    if (!cur) {
        return null; 
    }
    const aci = [];
    aci.unshift(cur)
    while ((cur = cur.parent)) {
        aci.unshift(cur)
    }
    return props.formState!.next(props.formState!, aci)
}
const componentC=computed(()=>{
    if (props?.formState?.type === 'input') return InputItem
    if (props?.formState?.type === 'select') return SelectItem
    if (props?.formState?.type === 'radio') return RadioItem
    if (props?.formState?.type === 'checkbox') return CheckboxItem
})
</script>

<template>
    <template v-if="formState">
        <component :is="componentC" :formState="formState"></component>
        <FormItemDetails :formState="getNext()"></FormItemDetails>
    </template>
</template>

<style lang="scss" scoped></style>