<script setup lang="ts">
// import {ref,reactive} from "vue"
// import { SkeletonType } from "@/type/index";
const props = defineProps({
    option:{
        type:Object,
        default:()=>{}
    }
})
</script>

<template>
    <div class="skeleton">
        <div class="img">

        </div>
        <div class="text">

        </div>
        <div class="desc"></div>
    </div>
</template>

<style lang="scss" scoped>
.skeleton{
    width: 100%;
    height: 100%;
    background-color: #ffffff;
}
</style>