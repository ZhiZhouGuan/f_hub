<template>
  <div>
    <el-form :inline="false" @keyup.enter="search">
      <el-row :gutter="[12]">
        <template v-for="(it, i) in where" :key="i">
          <el-col :span="it.span?it.span:6" :style="{'display':it.show==false?'none':block}">
            <el-form-item v-if="it && it.label" :label="it.label" :key="i">
              <component
                :is="!it.component ? 'mb-input' : it.component.startsWith('el-') || $global.dynamicComponentNames.indexOf(it.component) != -1 ? it.component : 'mb-' + it.component"
                v-model="it.value"
                :item-label="it.label"
                v-bind="it.props"
                :component_type="it.type"
              />
            </el-form-item>
          </el-col>
        </template>
        <el-col style="flex: 1;text-align: right;">
          <slot name="btns" />
          <el-button
            class="btn-large border-radius2"
            type="primary"
            icon="ElIconSearch"
            @click="search"
          >查询</el-button>
          <el-button class="btn-large border-radius2" icon="ElIconDelete" @click="reset">重置</el-button>
        </el-col>
      </el-row>
      <el-row></el-row>
    </el-form>
  </div>
</template>

<script setup>

import { nextTick } from 'vue'

const props = defineProps({
  where: {
    type: Object,
    default: () => { }
  },
  paramType: {
    type: String,
    default: null
  },
  noReset: {
    type: String,
    default: ''
  }
})
const list = ref([])
for (var key in props.where) {
  if (props.where[key] instanceof Object && props.where[key].value == undefined) {
    props.where[key].value = null;
  }
}

const emit = defineEmits(['search'])

function input(input) {
  if (input) {
    emit('search')
  }
}

function search() {
  for (var key in props.where) {
    if (props.where[key] instanceof Object) {
      if (props.where[key].type && props.where[key].type.startsWith('date') && props.where[key].value instanceof Array && props.where[key].value.join(',')) {
        props.where[key].value = props.where[key].value.join(',')
      }
    }
  }
  nextTick(() => {
    emit('search')
    for (var key in props.where) {
      if (props.where[key] instanceof Object) {
        if (props.where[key].type && props.where[key].type.startsWith('date') && props.where[key].value) {
          props.where[key].value = props.where[key].value.split(',')
        }
      }
    }
  })
}

function reset() {
  for (var key in props.where) {
    if (props.noReset.indexOf(key) == -1) {
      if (props.where[key] instanceof Object) {
        if (props.where[key].value instanceof Array) {
          props.where[key].value = props.where[key].props.defaultValue || []
        } else {
          props.where[key].value = null
        }
      } else {
        if (props.where[key] instanceof Array) {
          props.where[key] = []
        } else {
          props.where[key] = null
        }
      }
    }
  }
  // if (props.where.status.value) {
  // props.where.status.value = null
  // console.log(props.where.status.value);
  // }
  nextTick(() => emit('search'))
}

</script>

<style scoped>
</style>
