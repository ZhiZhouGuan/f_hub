<script setup lang="ts">
import { isReactive, reactive } from "vue"
import { FormItem } from "@/type"
import FromItemDetails from "./FormItemDetail/index.vue"

function createFormItem(
    formItemType: FormItem['type'],
    payload: FormItem['payload'],
    next?: FormItem['next'],
    parent?: FormItem['parent']
): FormItem {
    if (!next) {
        next = () => null;
    }
    if (!parent) {
        parent = null;
    }
    const nextFunc: FormItem['next'] = (cur, acients) => {
        let nextItem = next(cur, acients);
        if (!nextItem) {
            return null
        }
        nextItem.parent = cur;
        if (!isReactive(nextItem)) {
            nextItem = reactive(nextItem);
        }
        return nextItem;
    };

    const formItem: FormItem = reactive({
        type: formItemType,
        payload,
        next: nextFunc,
        parent,
    });

    return formItem;
}
const item1 = createFormItem('input', { label: 'test1', value: '' },(cur)=>(cur.payload.value==1?item2:item3));
const item2 = createFormItem('select', { label: 'test2', value: 1, options: [{ label: 'test2-1', value: 1 }, { label: 'test2-2', value: 2 },{ label: 'test2-3', value: 3 }] },(cur)=>{
    if(cur.payload.value===1)return item3;
    if(cur.payload.value===2)return item4;
    if(cur.payload.value===3)return item5;
    return null;
});
const item3 = createFormItem('radio', { label: 'test3', value: 1,options: [{ label: 'test3-1', value: 1 }, { label: 'test3-2', value: 2 }]},(cur)=>(cur.payload.value===1?item4:item5));
const item4 = createFormItem('input', { label: 'test4', value: '' });
const item5 = createFormItem('checkbox', { label: 'test5', value: [],options: [{ label: 'test5-1', value: 1 }, { label: 'test5-2', value: 2 },{ label: 'test5-3', value: 3 }]},(cur)=>item6);
const item6 = createFormItem('input', { label: 'test6', value: '' })
// function getNext():FormItem|null{
//     let current:FormItem | null = 
// }
watch(item1.payload, () => {
    console.log(item1);
})
</script>

<template>
    <!-- 动态表单 -->
    <div class="dynamicForm">
        <div @click="() => console.log(item1)">4</div>
        <el-form style="width: 600px;">
            <FromItemDetails :formState="item1"></FromItemDetails>
        </el-form>
    </div>
</template>

<style lang="scss" scoped>
.dynamicForm {
    width: 100%;
    height: 100%;
}
:deep(.el-select){
    width: 100px;
}
</style>