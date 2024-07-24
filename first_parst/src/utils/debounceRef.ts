import {customRef} from 'vue'

export  function debounceRef<T>(value:T,dely:number){
    let timer:number
    return customRef((track,trigger)=>{
        return {
            get() {
                track()
                return value
            },
            set(newV){
                clearTimeout(timer)
                timer = setTimeout(()=>{
                    trigger()
                    value =newV
                },dely)
                
            }
        }
    })
}