import Loading from "../packges/Loading"; // v-loading指令
import SlideIn from "../packges/SlideIn";// v-slide-in指令
import type {App} from 'vue'
// 全部自定义指令
const directions: any[] = [
  Loading,
  SlideIn
];


/**
 * 组件注册
 * @param {App} app Vue
 * @returns {Void}
 */
const install = (app: App) => {
  // 自定义指令注册
  directions.forEach(direction => app.directive(direction.name, direction));
};
// 全部导出
export default {
  install
};