<script setup lang="ts" generic="T extends {id:number}">
import { VritualData, EachVritualItem } from '../../type/index'
const { dataSource, loading } = defineProps<VritualData<T>>()
defineSlots<{ vItem(props: { item: T }): any }>()
const contRef = ref<HTMLDivElement>()
const listRef = ref<HTMLElement>()

const options = ref<EachVritualItem[]>([])
const state = reactive({
  viewHeight: 0,
  listHeight: 0,
  startIndex: 0,
  maxCount: 0,
  preLen: 0,
});

const endIndex = computed(() => Math.min(dataSource.length, state.startIndex + state.maxCount))

const renderList = computed(()=>dataSource.slice(state.startIndex, endIndex.value))
</script>

<template>
  <div class='v-loading'>
    <div class="container" v-loading='loading' ref="contRef">
      <ul class="container-list" ref="listRef">
        <li class="container-list-item" v-for="item in renderList" :key="item.id">
          <slot name="vItem" :item="item"></slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.v-loading {
  width: inherit;
  height: inherit;

  .container {
    width: 400px;
    height: 600px;
    overflow: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #eee;
    border-radius: 8px;


  }
}
</style>
