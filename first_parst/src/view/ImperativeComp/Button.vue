<script setup lang="ts">
const emit = defineEmits(['click'])

</script>

<template>
    <div class="button" @click="emit('click')">
        按钮
    </div>
</template>

<style lang="scss" scoped>
    .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #409EFF;
        color: white;
        border-radius: 5px;
        cursor: pointer;
        margin: 10px 0;
        user-select: none;
    }
</style>