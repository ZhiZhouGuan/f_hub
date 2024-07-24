<script setup lang="ts">
import {ref} from "vue"
import useContextMenu from '@/hooks/useContextMenu';
import {menuType} from "@/type/index"
const props = defineProps({
    menu: {
        type: Array<menuType>,
        default: () => ([])
    }
})
const emits = defineEmits(["select"])
const contanierRef = ref(null)
const {x,y,show} = useContextMenu(contanierRef)

const handleBeforeEnter = (el:any) => {
    el.style.height = 0
}
const handleEnter = (el:any) => {
    el.style.height = 'auto'
    const h = el.clientHeight
    el.style.height = 0
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            el.style.height = h + 'px'
            el.style.transition ='height 0.3s'
        })
    })
}
const handleAfterEnter = (el:any) => {
    el.style.transition='none'
}
</script>

<template>
    <div class="contaniers" ref="contanierRef">
        <slot></slot>
        <Teleport to="body">
            <transition @before-enter="handleBeforeEnter" @enter="handleEnter" @after-enter="handleAfterEnter">
                <div class="contextMenu" v-show="show" :style="{left:x+'px',top:y+'px'}">
                    <div v-for="(item,index) in menu" class="item" :key="index" @click="emits('select',item.lable)">{{ item.lable }}</div>
                </div>
            </transition>
        </Teleport>
    </div>
</template>

<style lang="scss" scoped>
$color:#409EFF;
.contextMenu {
    position: fixed;
    padding: 10px 20px;
    box-sizing: border-box;
    border-radius: 8px;
    overflow: hidden;
    background-color: #fff;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0,0,0,.2);
    .item {
        height: 30px;
        line-height: 30px;
        text-align: center;
        &:hover {
            color: lighten($color,0.1);
        }
        &:active {
            color: darken($color,2);
        }
    }
    
}
</style>