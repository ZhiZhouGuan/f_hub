<script setup lang="ts">
import { ref, shallowRef, onBeforeMount, watch } from "vue"
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { IToolbarConfig, IEditorConfig, IDomEditor } from "@wangeditor/editor";
import { EditorImage } from '@/type'
const editorRef = shallowRef()
const toolbarConfig: Partial<IToolbarConfig> = {}
const editorConfig: Partial<IEditorConfig> = {
    placeholder: '请输入内容...',
    MENU_CONF: {
        uploadImage: {
            timeout: 5 * 1000,
            // 必填 请求地址
            server: "/img/upload",
            // file 文件的字段名
            fieldName: "file",

            // 其他传递的参数， 加在 formData 中
            meta: {
            },

            // 请求头：存放 token
            headers: {
                // 'Sa-Token':'34d38496-d5d6-48a2-945b-ef67a47de1d7'
            },

            // 单个文件的最大体积限制，默认为 2M
            maxFileSize: 10 * 1024 * 1024, // 1M

            // 选择文件时的类型限制，默认为 ['image/*'] 。如不想限制，则设置为 []
            allowedFileTypes: [],

            // 上传前的回调
            onBeforeUpload(file: File) {
                console.log("上传前的回调", file);
                // return file;
            },
            // 上传成功
            onSuccess(file: File, res: any) {
                console.log(` 上传成功`, res);
            },
            // 单个文件上传失败
            onFailed(file: File, res: any) {
                console.log(` 上传失败`, res);
            },

            // 上传错误，或者触发 timeout 超时
            onError(file: File, err: any, res: any) {
                console.log(`传出错`, err);
                console.log(`上传出错`, res);
            },
        }
    }
}
const mode = 'default'
const valueHtml = ref('<p>hello</p>')
const handleCreated = (editor: any) => {
    editorRef.value = editor
    console.log(editor, 'editor');

}
watch(() => valueHtml.value, (val) => {
    console.log('val', val);
})


onBeforeMount(() => {
    const editor = editorRef.value
    if (editor == null) return
    editor.destroy()
})
</script>

<template>
    <div class="richText">
        <div class="richText-container">
            <Toolbar style="border-bottom: 1px solid #000" :editor="editorRef" :defaultConfig="toolbarConfig"
                :mode="mode" />
            <Editor style=" overflow-y: hidden;" v-model="valueHtml" :defaultConfig="editorConfig" :mode="mode"
                @onCreated="handleCreated" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.richText {
    width: 100%;
    height: 100%;
    display: flex;

    &-container {
        width: 80%;
        margin: auto;
        height: 90%;
        border-radius: 16px;
        overflow: hidden;
    }
}
</style>