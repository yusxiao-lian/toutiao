import Vue from 'vue'
import App from './App.vue'

// 引入路由router
import router from '@/router/index.js'

// 初始化样式
import '@/styles/reset.css'

// 引入vant
import { Toast, Uploader, Dialog, Field, Picker, Icon, Tab, Tabs } from 'vant'

// 全局注册

Vue.use(Uploader)
  .use(Toast)
  .use(Dialog)
  .use(Field)
  .use(Picker)
  .use(Icon)
  .use(Tab)
  .use(Tabs)
Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
