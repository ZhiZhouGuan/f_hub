<template>
  <el-table-column
    v-bind="props.col.props"
    :key="props.col.field"
    :label="props.col.label"
    :prop="props.col.field"
    :align="props.col.align || 'center'"
    :width="props.col.width"
    :fixed="props.col.fixed"
    :sortable="props.col.sortable"
    :show-overflow-tooltip="!props.col.btns"
  >
    <template v-if="!props.col.cols" #default="scope">
      <span v-if="props.col.templet" v-html="props.col.templet(scope.row)" />
      <span
        v-else-if="props.col.dictType"
      >{{ proxy.dictItemLabel(props.col.dictType,scope.row[props.col.field]).value}}</span>
      <slot
        v-else-if="props.col.type == 'dynamic'"
        :name="props.col.field"
        :row="scope.row"
        :index="scope.$index"
      />
      <div v-else-if="props.col.type == 'switch'">
        <el-switch
          v-if="props.col.if === undefined ? true : props.col.if(scope.row)"
          v-hasPermi="props.col.permission"
          v-model="scope.row[props.col.field]"
          :active-value="props.col.activeValue || 1"
          :inactive-value="props.col.inactiveValue || 0"
          @change="props.col.change(scope.row)"
        />
      </div>
      <div v-else-if="props.col.type == 'btns'">
        <template v-for="btn in props.col.btns">
          <el-button
            v-if="btn.if === undefined ? true : btn.if(scope.row)"
            :icon="btn.icon"
            :key="btn.label"
            v-hasPermi="btn.permission"
            :type="btn.type"
            :link="btn.link"
            :size="btn.size || 'small'"
            :class="btn.class"
            @click.stop="btn?.click(scope.row, scope.$index)"
          >{{ btn.label }}</el-button>
        </template>
      </div>
      <div v-else-if="props.col.type == 'download'">
        <a
          v-for="(url, i) in scope.row[props.col.field].split(',')"
          :key="i"
          @click="$common.downloadMore(url)"
          href="javascript:;"
        >
          {{ url.substring(url.lastIndexOf('/') + 1) }}
          {{ i != scope.row[props.col.field].split(',').length - 1 ? '，' : '' }}
        </a>
      </div>
      <a
        v-else-if="props.col.type == 'downloadAll'"
        @click="$common.downloadMore(scope.row[props.col.field])"
        href="javascript:;"
      >下载</a>
      <el-image
        v-else-if="props.col.type === 'image'"
        :src="scope.row[props.col.field] && (scope.row[props.col.field].startsWith('http') || scope.row[props.col.field].startsWith('https')) ? scope.row[props.col.field] : $global.baseApi + scope.row[props.col.field]"
        :preview-src-list="[scope.row[props.col.field] && scope.row[props.col.field].startsWith('http') ? scope.row[props.col.field] : $global.baseApi + scope.row[props.col.field]]"
      />
      <span v-else-if="props.col.type === 'html'" v-html="scope.row[props.col.field]"></span>
      <span v-else-if="props.col.click">
        <a style="color: blue" @click="props.col.click(scope.row)">{{ scope.row[props.col.field] }}</a>
      </span>
      <span v-else-if="props.col.field">
        <template v-if="props.col.field == 'latLong'">
          ({{ Number(scope.row['longitude']).toFixed(2) }},{{
          Number(scope.row['latitude']).toFixed(2) }})
        </template>
        <template v-else>{{ scope.row[props.col.field] }}</template>
      </span>
    </template>
    <mb-table-column v-for="(col2, j) in props.col.cols" :key="j" :col="col2">
      <template v-for="(value, key) in $slots" #[key]="{ row, index }">
        <slot :row="row" :index="index" :name="key" />
      </template>
    </mb-table-column>
  </el-table-column>
</template>

<script setup>
const { proxy } = getCurrentInstance()

const props = defineProps({
  col: Object
})




</script>
