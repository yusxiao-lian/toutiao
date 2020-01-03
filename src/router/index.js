import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import login from '@/views/Login.vue'

// 使用路由
Vue.use(VueRouter)

// 配置路由
let router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: login
    }
  ]
})

export default router
