import { defineComponent,createApp } from 'vue'
import './showMsg-css.scss'
import Button from '../view/ImperativeComp/Button.vue'

const MsgBox = defineComponent({
    props:{
        msg:{
            type:String,
            required:true
        }
    },
    emits:['onClick'],
    setup(){
    },
    render(ctx:any){
        const {$emit,$props} = ctx
        return(
        <div class="msgbox">
            <div class=" msgbox-content">
                <div class="msgbox-text">{$props.msg}</div>
                <Button onClick={$emit('onClick')}></Button>
            </div>
        </div>
        )
    }
})


export default function showMsg(msg:string,msgHandler:Function):void {
    const div = document.createElement('div')
    div.classList.add('showMsg--fixd')
    document.body.appendChild(div) 
    const app = createApp(MsgBox,{
        msg,
        onClick(){
            msgHandler && msgHandler(
                ()=>{
                    app.unmount()
                    div.classList.remove('showMsg--fixd')
                    div.remove()
                }
            )
        }
    })
    app.mount(div)
}