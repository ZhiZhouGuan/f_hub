const distance:number= 120; 
const elMap = new WeakMap<HTMLElement, any>()


const ob = new IntersectionObserver((entries:any) => {
    entries.forEach((entry:any) => {
        if (entry.isIntersecting) {
            // 开始动画
            elMap.get(entry.target)?.play()
            ob.unobserve(entry.target)
        }
    })
    
})

// 判断元素是否在可视区域内
const isBelowViewport = (el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    return rect.top > window.innerHeight
}

export default {
    name: 'slide-in',
    mounted(el: HTMLElement & { instance: any }) {
        if (!isBelowViewport(el)) {
            return
        }
        const animation = el.animate([
            {
                transform: `translateY(${distance}px)`,
                opacity: 0
            },
            {
                transform: 'translateY(0)',
                opacity: 1
            }
        ],
        {
            duration: 500,
            easing: 'ease-in-out',
            fill: 'forwards'
        })
        animation.pause()
        elMap.set(el, animation)
        ob.observe(el)
    },
    unmounted(el: HTMLElement & { instance: any }) {
        ob.unobserve(el)
    },
}