<script setup lang="ts">
import ContextMenu from './component/ContextMenu.vue';
const text1 = ref<string | number>('')
const text2 = ref<string | number>('')
const text3 = ref<string | number>('')
</script>

<template>
    <div class="container">
        <ContextMenu :menu="[
            { lable: '菜单1' },
            { lable: '菜单2' },
            { lable: '菜单3' },
            { lable: '菜单4' },
            { lable: '菜单5' },
        ]" @select="(v) => text1 = v">
            <div class="div1">{{ text1 }}</div>
        </ContextMenu>
        <ContextMenu :menu="[
            { lable: 'xiaomi' },
            { lable: 'huawei' },
            { lable: 'iphone' },
            { lable: 'oppo' },
            { lable: 'vivo' },
        ]" @select="(v) => text2 = v">
            <div class="div2">{{ text2 }}
                <ContextMenu :menu="[
                    { lable: '苹果' },
                    { lable: '华为' },
                    { lable: '小米' },
                    { lable: '三星' },
                ]" @select="(v) => text3 = v">
                    <div class="div3">{{ text3 }}</div>
                </ContextMenu>
            </div>
        </ContextMenu>
    </div>
</template>

<style lang="scss" scoped>
.container {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: start;
}

.div1,
.div2 {
    width: 49vw;
    height: 50vh;
    background-color: red;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 40px;
}

.div2 {
    background-color: blue;
}

.div3 {
    width: 25vw;
    height: 25vh;
    background-color: green;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    z-index: 999;
}
</style>