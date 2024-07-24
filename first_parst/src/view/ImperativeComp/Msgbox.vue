<script setup lang="ts" generic="T extends string">
import Button from './Button.vue';
defineProps<{
    msg:T
}>()
const emit = defineEmits(['click'])
</script>

<template>
    <div class="msgbox">
        <div class=" msgbox-content">
            <div class="msgbox-text">{{ msg }}</div>
            <Button @click="emit('click')"></Button>
        </div>
        
    </div>
</template>

<style lang="scss" scoped>
.msgbox {
    position: fixed;
    width: 100%;
    height: 100%;
    background-color: #00000049;
    display: flex;
    align-items: center;
    justify-content: center;
    &-content {
        width: 200px;
        background-color: #fff;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    &-text {
        width: 80%;
        text-align: center;
        margin: 10px 0;
    }
}
</style>