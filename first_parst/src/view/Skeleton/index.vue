<script setup lang="ts">
import {ref} from "vue"
import Skeleton from "@/components/Skeleton.vue"

const value1 = ref<boolean>(false)
</script>

<template>
    <div class="container">
        <div>
            Switch Loading
            <el-switch v-model="value1" style="--el-switch-on-color: #13ce66"/>
        </div>
        <div class="box">
            <Skeleton></Skeleton>
            <img src="@/assets/img/01.jpg" class="img-fluid">
            <div class="text">山上山下，厚德载物</div>
            <div class="description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quidem.</p>
            </div>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
    .box {
        width: 300px;
        height: 400px;
        border-radius: 8px;
        overflow: hidden;
        background-color: #fff;
        .img-fluid {
            width: 100%;
            height: 60%;
            object-fit: cover;
            box-shadow: 0 2px 10px rgba(0,0,0,.2);
        }
        .text {
            padding: 20px 20px;
            font-size: 18px;
            font-weight: bold
        }
        .description {
            padding: 0 20px;
        }

    }
}

</style>