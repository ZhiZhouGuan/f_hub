<template>
  <div class="filter-cont" v-if="table.where">
    <mb-search
      v-if="table.where"
      :where="table.where"
      :paramType="paramType"
      :no-reset="search && search.noReset"
      @search="reload"
    />
  </div>
  <div class="app-container">
    <div class="toolbar-container">
      <!-- <div>
        <span class="color-block"></span>列表
      </div>-->
      <div class="toolbar-right">
        <template v-for="(it, i) in tools" :key="i">
          <el-button
            v-if="it.type == 'add'"
            v-hasPermi="it.permission"
            class="filter-item btn-middle border-radius2"
            type="primary"
            style="margin-right:10px"
            icon="ElIconPlus"
            @click="it.click"
          >{{ it.label || '新增' }}</el-button>
          <mb-button
            v-else-if="it.type == 'delete'"
            class="btn-middle border-radius2"
            v-hasPermi="it.permission"
            :plain="true"
            :request-fun="it.requestFun"
            :btn-type="'delete'"
            :request-data="[{ id: ids }]"
            :after-handler="reload"
            :request-data-handler="it.preProRequestData"
          />
          <el-button
            v-else
            :icon="it.icon"
            :key="it.label"
            v-hasPermi="it.permission"
            :type="it.type"
            :size="it.size"
            :class="it.class"
            @click="it.click(ids)"
            class="btn-middle border-radius2"
          >{{ it.label }}</el-button>
        </template>
      </div>
    </div>
    <div class="table-container">
      <mb-table ref="tableRef" v-bind="table" @selection-change="selectionChange" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const tableRef = ref()
const ids = ref([])

const props = defineProps({
  search: {
    type: Object,
    default: () => { }
  },
  tools: {
    type: Array,
    default: () => []
  },
  table: {
    type: Object,
    default: () => { }
  },
  delId: {
    type: String,
    default: 'id'
  },
})

props.tools.forEach(it => {
  if (it.type == 'delete') {
    props.table.selection = true
  }
})

function reload() {
  tableRef.value.reload()
}

function selectionChange(columns) {
  console.log(props.delId)
  ids.value = columns.map(it => it[props.delId]).join(',');
  console.log(ids.value)
}

defineExpose({ reload })

</script>
<style scoped lang="scss">
.filter-cont {
  width: 100%;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 0 0 4px 4px;
}

.app-container {
  background-color: #fff !important;
  padding: 0 !important;
  border-radius: 4px;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;

  .toolbar-container {
    height: 35px;
    line-height: 35px;
    vertical-align: middle;
    // overflow: hidden;
    font-size: 16px;
    padding-bottom: 20px;
  }
}
</style>
