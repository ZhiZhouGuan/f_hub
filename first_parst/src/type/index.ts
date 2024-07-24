import { SlateElement } from '@wangeditor/editor'


export interface DateSource {
    id:number,
    data: number
}
export interface VritualData<T>{
    loading:boolean,
    basicHeight:string,
    dataSource: T[]
}
export interface EachVritualItem {
    index:number,
    top:number,
    bottom:number,
    herght:number,
    diffHeight:number
}
export interface CacheTableData {
    id:number,
    perise:number,
    quantity:number
}
export interface menuType {
    lable:string,
}

export interface SkeletonType {
    height:string|number,
}

//动态表单项
export type FormItemType = 'input'|'select'|'textarea'|'switch'|'radio'|'checkbox'

export interface FormItem {
    type:FormItemType,
    payload:any,//表单的数据
    next:(cur:FormItem,acients:FormItem[])=>FormItem | null,
    parent:FormItem | null,
}

//富文本图片
export type EditorImage = SlateElement & { url: string; alt: string;src: string;href: string}

//路由类
export interface RouteType {
    id:string,
    path: string;
    name: string;
    component: any;
    meta?: any;
    redirect?:string;
    children?: RouteType[] 
}