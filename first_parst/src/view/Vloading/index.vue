<script setup lang="ts">
import {ref,onMounted} from 'vue'
import {DateSource} from '../../type/index'
const datasource = ref<DateSource[]>([])
const loading = ref<Boolean>(false)
const addData=():void=> {
  loading.value = true
  for (let i = 0; i < 20; i++) {
      const len = datasource.value.length
      datasource.value.push({id:len,data:len+1})
  }
  setTimeout(() => {
    loading.value = false
  }, 2000);
}
onMounted(() => {
  addData()
})
</script>

<template>
  <div class= 'v-loading'>
      <div class="container" v-loading = 'loading'>
        <ul class="container-list">
          <li class="container-list-item" v-for="item in datasource" :key="item.id">{{ item.data }}</li>
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

    &-list-item {
        width: 100%;
        height: 60px;
        line-height: 60px;
        text-align: center;
        box-sizing: border-box;
        border-bottom: 1px solid #000;
      }
  }
}
</style>
