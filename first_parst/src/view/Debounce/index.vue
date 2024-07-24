<script setup lang="ts">
import { watch } from 'vue';
import {debounceRef} from '../../utils/debounceRef'

const inputValue = debounceRef('',500)
watch(inputValue,()=>{
    console.log(11111);
    
})
</script>

<template>
    <input v-model="inputValue" placeholder="Please input" class="inp"/>
    <el-text class="text">{{ inputValue }}</el-text>
</template>

<style lang="scss" scoped>
    .inp {
        width: 400px;
        height: 60px;
        margin: 200px 200px;
    }
    .text {
        display: inline-block;
        width: 100px;
        height: 60px;
        background-color: white;
        text-align: center;
        line-height: 60px;
        border-radius: 8px;
    }
</style>