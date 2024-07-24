// import { computed } from 'vue'
export  function useComputed (fn: Function) {
    const cache = new Map()
    function compare(args1:number[], args2:number[]) {
        return (
            args1.length === args2.length && args1.every((item,index) => Object.is(item, args2[index]))
        )
    }
    function getValue(args:number[]){
        const keys = [...cache.keys()]
        const key = keys.find(key =>compare(key,args))
        if(key){
            return cache.get(key)
        }
    }
    return function (...args: number[]) {
        const cacheValue = getValue(args)
        if(cacheValue){
            return cacheValue.value
        }
        const result = computed(()=>fn(args))
        cache.set(args, result)
        return result.value
    }
}   