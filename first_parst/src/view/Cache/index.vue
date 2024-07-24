<script setup lang="ts">
import { ref } from "vue"
import { CacheTableData } from '../../type/index'
import { useComputed } from '../../utils/useComputed'
const tableData = ref<Array<CacheTableData>>([
    {
        id: 1,
        perise: 299,
        quantity: 0,
    },
    {
        id: 2,
        perise: 299,
        quantity: 0,
    },
    {
        id: 3,
        perise: 299,
        quantity: 0,
    },
    {
        id: 4,
        perise: 299,
        quantity: 0,
    },
])
const calculate=(v:CacheTableData,type:boolean=true) =>{
    if (type) {
        v.quantity+=1
    }else if(v.quantity >0){
        v.quantity -=1
    }
}
const sum = (args:number[])=>{
    console.log('函数更新次数');
    return args[0]*args[1]
}
const computedState = useComputed(sum)
</script>

<template>
    <table class="cache-table">
        <tr>
            <th>价格</th>
            <th>数量</th>
            <th>和</th>
        </tr>
        <tr v-for=" item in tableData" :key="item.id">
            <td>{{ item.perise }}</td>
            <td><button @click="calculate(item,false)">-</button>{{ item.quantity }}<button @click="calculate(item)">+</button></td>
            <td>{{ computedState(item.perise,item.quantity) }}</td>
        </tr>
    </table>
</template>

<style lang="scss" scoped>
.cache-table {
    width: 50%;
    margin: 200px auto 0;
    background-color: white;
    border-radius: 8px;
    text-align: center;
    line-height: 60px;
    th {
        height: 60px;
    }
    tr {
        height: 60px;
        
        td {
            border-bottom: 1px solid #eee;
            button {
                width: 30px;
                height: 30px;
                margin: 0 10px;
            }
        }
    }
}
</style>