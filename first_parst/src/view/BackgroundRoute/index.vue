<script setup lang="ts">
import { ref, reactive, computed } from "vue"
import { RouteType } from '@/type'
import { uuid } from 'vue-uuid';
const data = ref<RouteType[]>([
    {
        id: '12',
        path: '/akljf',
        name: 'akljf',
        meta: { key: 'value' },
        component: '/akljf/indec.vue',
        redirect: '/adsdss',
        children: [
            { id: '123', path: '/akljf1', name: 'akljf1', component: '' },
            { id: '124', path: '/akljf2', name: 'akljf2', component: '' },
            { id: '125', path: '/akljf3', name: 'akljf3', component: '' },
        ],
    },
    {
        id: '13',
        path: '/akljf4',
        name: 'akljf4',
        component: '',
        children: [
            { id: '126', path: '/akljf5', name: 'akljf5', component: '' },
            { id: '127', path: '/akljf6', name: 'akljf6', component: '' },
            { id: '128', path: '/akljf7', name: 'akljf7', component: '' },
        ]
    },
    {
        id: '14',
        path: '/akljf8',
        name: 'akljf8',
        component: '',
        children: [{ id: '129', path: '/akljf9', name: 'akljf9', component: '' }]
    }
])
const props = {
    value: 'id',
    label: 'name',
    children: 'children'
}
const treeRef = ref(null)
const dialogTableVisible = ref(false)
const gridData = reactive<RouteType>({
    id: '',
    path: '',
    name: '',
    meta: {},
    redirect: '',
    component: '',
})

//添加meta
const addVisible = ref(false)
const addItem = reactive({
    value: '',
    key: ''
})
const addHandler = () => {
    if (addItem.value && addItem.key) {
        gridData.meta[addItem.key] = addItem.value
        addVisible.value = false
        addItem.value = ''
        addItem.key = ''
    } else {
        // ElMessage.error('输入框不能为空')
    }
}
const removeHandler = (key: any) => {

    delete gridData.meta[key]
}
const resetSwitchTool = () => {
    Object.keys(gridData).forEach((key) => {
        gridData[key as keyof RouteType] = ''
    })
    gridData.meta={}
}
const changeHandler = (data: RouteType) => {
    Object.keys(gridData).forEach((key) => {
        if (data[key as keyof RouteType]) {
            gridData[key as keyof RouteType] = data[key as keyof RouteType]
        }
    })
    dialogTableVisible.value = true
    console.log(data);
}

const dialogHandler = (bool: boolean) => {
    if (bool) {

    }

    dialogTableVisible.value=false
}
</script>

<template>
    <div class="backgroundRoute">
        <div class="backgroundRoute-content">
            <el-tree-v2 style="width: 100%;" :data="data" :props="props" :height="400" ref="treeRef">
                <template #default="{ node, data }">
                    <div class="custom-tree-node">
                        <span>{{ node.label }}</span>
                        <span>{{ data.path }}</span>
                        <span>
                            <a @click.stop="changeHandler(data)"> 修改 </a>
                            <a> 新增</a>
                            <a> 删除</a>
                        </span>
                    </div>
                </template>
            </el-tree-v2>
            <el-dialog v-model="dialogTableVisible" title="修改" width="800" @close="resetSwitchTool">
                <el-form :model="gridData">
                    <el-form-item label="路径（path）">
                        <el-input v-model="gridData.path" placeholder="请输入路径"></el-input>
                    </el-form-item>
                    <el-form-item label="名称（name）">
                        <el-input v-model="gridData.name" placeholder="请输入名称"></el-input>
                    </el-form-item>
                    <el-form-item label="路由参数（meta）">
                        <i-ep-circlePlus @click="addVisible=true"/>
                    </el-form-item>
                    <div style="display: flex;">
                        <el-form-item v-for="(value, key) in gridData.meta" :key="key" style="margin-right: 20px;">
                            <span>{{ key }}</span>
                            <span>：</span>
                            <el-input v-model="gridData.meta[key]" placeholder="请输入路由参数,格式： {key:'value'}"
                                style="width: 100px"></el-input>
                            <i-ep-remove style="margin-left: 10px; color: red; cursor: pointer;" @click="removeHandler(key)"/>
                        </el-form-item>
                    </div>

                    <el-form-item label="路由重定向（redirect）">
                        <el-input v-model="gridData.redirect" placeholder="请输入路由重定向"></el-input>
                    </el-form-item>
                    <el-form-item label="组件路径（component）">
                        <el-input v-model="gridData.component" placeholder="请输入组件"></el-input>
                    </el-form-item>

                </el-form>
                <template #footer>
                    <div>
                        <el-button type="primary" @click="dialogHandler(true)">确定</el-button>
                        <el-button @click="dialogHandler(false)">取消</el-button>
                    </div>
                </template>
            </el-dialog>
            <el-dialog v-model="addVisible" width="400">
                <div class="addClass">
                    <span>名（key）: </span>
                    <el-input v-model="addItem.key" placeholder="请输入" style="width: 70%;"></el-input>
                </div>
                <div class="addClass">
                    <span>值（value）: </span>
                    <el-input v-model="addItem.value" placeholder="请输入" style="width: 70%;"></el-input>
                </div>
                <template #footer>
                    <div>
                        <el-button type="primary" @click="addHandler">确定</el-button>
                    </div>
                </template>
            </el-dialog>
        </div>

    </div>
</template>

<style lang="scss" scoped>
:deep(.el-tree-node) {
    height: 40px !important;
    position: relative !important;
    top: 0 !important;
    border-bottom: 1px solid #ccc;
}

:deep(.el-tree-node__content) {
    height: 40px !important;
}

.backgroundRoute {
    width: 100%;
    height: 100%;
    display: flex;

    &-content {
        margin: auto;
        width: 600px;
        min-height: 400px;
        background-color: #fff
    }

    .custom-tree-node {
        width: 100%;
        height: 40px;

        display: flex;
        justify-content: space-between;
        align-items: center
    }
}

.addClass {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
}
</style>