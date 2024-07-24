<script setup lang="ts">
import { ref, onUnmounted, onMounted } from "vue"
interface Nav {
    id: number;
    name: string;
    path: string;
}
let timer: any
const distance = ref<string>('100vw')
const contentHandler = (lock: boolean) => {
    if (lock) {
        distance.value = '0';
        timer = setInterval(() => {
            rightDis.value <= 2 ? rightDis.value = 30 : rightDis.value -= 2
        }, 100)
    } else {
        distance.value = '100vw';
        clearInterval(timer)
    }

}
let clear: Function
const keyHandler = () => {
    const fn = (e: any): void => {
        // console.log(e.key);
        e.key === 'Escape' && contentHandler(false)
    }
    document.addEventListener('keydown', fn)
    return () => {
        document.removeEventListener('keydown', fn)
    }
}

const rightDis = ref<number>(30)



const nav = ref<Nav[]>([
    { id: 1, name: 'home', path: '/home' },
    { id: 2, name: 'v-loading', path: '/loading' },
    { id: 3, name: '不定高虚拟列表', path: '/vritual' },
    { id: 4, name: '命令式组件', path: '/imperativeComp' },
    { id: 5, name: '缓存方法', path: '/cache' },
    { id: 6, name: 'inp框防抖', path: '/debounce' },
    { id: 7, name: '元素平滑上升', path: '/intersectionObserver' },
    { id: 8, name: '右键菜单组件封装', path: '/contextMenu' },
    { id: 9, name: '骨架屏', path: '/skeleton' },
    { id: 10, name: '动态表单', path: '/dynamicForm' },
    { id: 11, name: '富文本编辑器', path: '/richText' },
    { id: 12, name: '后台动态路由', path: '/backgroundRoute' },
])

onMounted(() => {
    clear = keyHandler()
})

onUnmounted(() => {
    clearInterval(timer)
    clear()
})
</script>

<template>
    <div class="home-container">
        <div class="home-container-siber">
            <router-link class="home-container-siber-item" v-for="v in nav" :to='v.path' :key="v.id"
                @click="contentHandler(true)">
                {{ v.name }}
            </router-link>
        </div>
        <div class="home-container-content" :style="{ left: distance }">
            <div class="home-container-content-back" :style="{ right: `${rightDis}px` }" @click="contentHandler(false)">
                ESC </div>
            <router-view v-slot="{ Component }">
                <Suspense>
                    <template #default>
                        <component :is="Component" />
                    </template>
                    <template #fallback>
                        <div>Loading...</div>
                    </template>
                </Suspense>
            </router-view>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.home-container {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    // background-image: linear-gradient(to top, #a3bded 0%, #6991c7 100%);
    background-image: linear-gradient(135deg, #fdfcfb 0%, #e2d1c3 100%);

    &-siber {
        box-sizing: border-box;
        width: 95%;
        height: 95%;


        &-item {
            display: inline-block;
            padding: 10px 20px;
            color: white;
            // background-image:linear-gradient(to right, #ffecd2 0%, #fcb69f 100%);
            background-image: linear-gradient(120deg, #89f7fe 0%, #66a6ff 100%);
            margin: 10px 20px;
            border-radius: 10px;
        }
    }

    &-content {
        width: 100vw;
        height: 100vh;
        position: absolute;
        top: 0;
        transition: all .5s linear;
        background-color: #c5c2c2;
        // background-color: #FFFFFF;

        &-back {
            position: absolute;
            transition: all .5s linear;
            top: 50%;
            transform: translateY(-50%);
            color: #fff;
        }

        &-back::after {
            content: '>>';
            color: #fff;
            font-size: 20px;
            font-weight: 700;
        }
    }
}
</style>