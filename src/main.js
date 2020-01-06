import Vue from 'vue'
import App from './App.vue'

// 引入路由router
import router from '@/router/index.js'

// 初始化样式
import '@/styles/reset.css'

// 引入vant
import { Toast, Uploader } from 'vant'

Vue.use(Uploader)
  .use(Toast)

Vue.config.productionTip = false

new Vue({
  router: router,
  render: h => h(App)
}).$mount('#app')
