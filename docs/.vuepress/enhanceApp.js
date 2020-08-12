import DailyIndex from './components/daily/index.vue'
import YahooRules from './components/blog/performance-yahoo-rules.vue'
import TransformDemo from './components/blog/css-transform-demo.vue'
// 使用异步函数也是可以的
export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  options, // 附加到根实例的一些选项
  router, // 当前应用的路由实例
  siteData, // 站点元数据
  isServer // 当前应用配置是处于 服务端渲染 或 客户端
}) => {
  Vue.component('DailyIndex',DailyIndex)
  Vue.component('YahooRules',YahooRules)
  Vue.component('TransformDemo',TransformDemo)
  // ...做一些其他的应用级别的优化
}