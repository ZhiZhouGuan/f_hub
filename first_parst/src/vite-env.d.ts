/// <reference types="vite/client" />
declare module 'mockjs';
declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>
    export default component
};
declare module '@wangeditor/editor-for-vue' {
    const Editor: any;
    const Toolbar: any;
    type IEditorConfig = any;
}