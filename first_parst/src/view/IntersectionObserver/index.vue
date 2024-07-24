<script setup lang="ts">
// import {ref,reactive} from "vue"
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <div class="contanier">
        <el-button type="primary" @click="router.back()" style="position: fixed;top: 20px;left: 20px">返回首页</el-button>
        <div v-slide-in class="item" v-for="item in 10" :key="item">{{ item }}</div>
    </div>
</template>

<style lang="scss" scoped>
.contanier{
    width: 100vw;
    height: inherit;
    background-color: #eee;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    position: relative;
}

.item{
    width: 400px;
    height: 200px;
    margin-bottom: 20px;
    border-radius: 15px;
    text-align: center;
    color: #eee;
    font-size: 24px;
    line-height: 200px;
    box-shadow: 1px 1px 10px #00000079;
    background-color: pink;
    &:nth-child(odd){
    background-color: orange;
    }
}

</style>