import{ref} from 'vue'

//自定义右键菜单
export default function useContextMenu(element:any){
    
    
    const x=ref(0)
    const y=ref(0)
    const show=ref(false)

    const handleContextMenu=(e:MouseEvent)=>{
        console.log('打开右键菜单');
        
        e.preventDefault()
        e.stopPropagation()
        x.value=e.clientX
        y.value=e.clientY
        show.value=true
    }
    const closeContextMenu=()=>{
        console.log('关闭右键菜单');
        show.value=false
    }
    onMounted(()=>{
        element.value.addEventListener('contextmenu',handleContextMenu)
        window.addEventListener('click',closeContextMenu,true)
        window.addEventListener('contextmenu',closeContextMenu,true)
    })
    
    onBeforeUnmount(()=>{
        element.value.removeEventListener('contextmenu',handleContextMenu)//移除事件
        window.removeEventListener('click',closeContextMenu,true)
        window.removeEventListener('contextmenu',closeContextMenu,true)
    })

    return{
        x,
        y,
        show
    }
}