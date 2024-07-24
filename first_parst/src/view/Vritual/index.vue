<script setup lang="ts">
import VritualItem from './VritualItem.vue';
import Mock from 'mockjs'

const dataSource = ref<Array<{
    id: number,
    content:string
}>>([])

const loading = ref<boolean>(false)

const addData = () => {
  loading.value = true;
  setTimeout(() => {
    const newData = [];
    for (let i = 0; i < 20; i++) {
      const len: number = dataSource.value.length + newData.length;
      newData.push({
        id: len,
        content: Mock.mock("@csentence(40, 100)"), // 内容
      });
    }
    dataSource.value = [...dataSource.value, ...newData];
    loading.value = false;
  }, 2000);
};

onMounted(() => {
  addData();
});

</script>

<template>
    <div class='vritual'>
        <VritualItem :loading="loading" :data-source = 'dataSource' basic-height ='60' >
          <template #vItem = {item}>
            <div class="list-item">{{ item.id }}-{{ item.content }}</div>
          </template>
        </VritualItem>
    </div>
</template>

<style lang="scss" scoped>
.vritual {
    width: 100%;
    height: 100%;
    .list-item {
        width: 100%;
        box-sizing: border-box;
        padding: 3px 8px;
        border-bottom: 1px solid #000;
      }
}
</style>