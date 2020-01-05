import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import login from '@/views/Login.vue'
import personal from '@/views/Personal.vue'
// 使用路由
Vue.use(VueRouter)

// 配置路由
let router = new VueRouter({
  routes: [
    {
      name: 'Login',
      path: '/login',
      component: login
    },
    {
      name: 'Personal',
      path: '/personal',
      component: personal
    }
  ]
})

export default router
