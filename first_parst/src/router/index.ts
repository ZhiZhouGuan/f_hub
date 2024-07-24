/**
 * createRouter 这个为创建路由的方法
 * createWebHashHistory 这个就是vue2中路由的模式，
 *                      这里的是hash模式，这个还可以是createWebHistory等
 * RouteRecordRaw 这个为要添加的路由记录，也可以说是routes的ts类型
 */
import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router';
// 路由记录，这个跟vue2中用法一致
const routes:Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '',
    component: () => import("../view/index.vue"),
    redirect:'/home',
    children:[
      {
        path: '/home',
        name: 'home',
        component: () => import("../view/Home/index.vue")
      },
      {
        path: '/loading',
        name: 'loading',
        component: () => import("../view/Vloading/index.vue")
      },
      {
        path: '/vritual',
        name: 'vritual',
        component: () => import("../view/Vritual/index.vue")
      },
      {
        path: '/imperativeComp',
        name: 'imperativeComp',
        component: () => import("../view/ImperativeComp/index.vue")
      },
      {
        path: '/cache',
        name: 'cache',
        component: () => import("../view/Cache/index.vue")
      },
      {
        path: '/debounce',
        name: 'debounce',
        component: () => import("../view/Debounce/index.vue")
      },
      {
        path: '/contextMenu',
        name: 'contextMenu',
        component: () => import("../view/ContextMenu/index.vue")
      },
      {
        path: '/skeleton',
        name: 'skeleton',
        component: () => import("../view/Skeleton/index.vue")
      },
      {
        path: '/dynamicForm',
        name: 'dynamicForm',
        component: () => import("../view/DynamicForm/index.vue")
      },
      {
        path: '/richText',
        name: 'richText',
        component: () => import("../view/RichText/index.vue")
      },
      {
        path:'/backgroundRoute',
        name: 'backgroundRoute',
        component: () => import("../view/BackgroundRoute/index.vue")
      }
    ]
  },
  {
    path: '/intersectionObserver',
    name: 'intersectionObserver',
    component: () => import("../view/IntersectionObserver/index.vue"),
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});
export default router;