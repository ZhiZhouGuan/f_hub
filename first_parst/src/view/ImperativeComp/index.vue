<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue';
import showMsg from '../../utils/showMsg'

const showHandler =()=>{
    showMsg('点击下面按钮关闭',close=>{
        close();
        
    })
}
</script>

<template>
    <div>
        <Button @click='showHandler'></Button>
    </div>
</template>

<style lang="scss" scoped>

</style>