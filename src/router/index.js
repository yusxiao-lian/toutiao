import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入组件
import login from '@/views/Login.vue'
import personal from '@/views/Personal.vue'
import editPersonal from '@/views/editPersonal.vue'
import index from '@/views/Index.vue'
import register from '@/views/Register.vue'
import articleDetail from '@/views/ArticleDetail.vue'
import myFollow from '@/views/MyFollow.vue'
import mystars from '@/views/MyStars.vue'
import comment from '@/views/Comment.vue'
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
      path: '/personal/:id',
      component: personal
    },
    {
      name: 'EditPersonal',
      path: '/editPersonal/:id',
      component: editPersonal
    },
    {
      name: 'Index',
      path: '/index',
      component: index
    },
    {
      name: 'Register',
      path: '/register',
      component: register
    },
    {
      name: 'ArticleDetail',
      path: '/articleDetail/:id',
      component: articleDetail
    },
    {
      name: 'MyFollow',
      path: '/myFollow',
      component: myFollow
    },
    {
      name: 'Mystars',
      path: '/mystars',
      component: mystars
    },
    {
      name: 'Comment',
      path: '/comment/:id',
      component: comment
    }
  ]
})

// 添加导航守卫，每次路由跳转的请求都会经过导航守卫
// beforeEach前置守卫，跳转之前会调用
router.beforeEach((to, from, next) => {
  // to:跳去哪  next进行下一步的操作，必须要有next才能执行
  if (to.path.indexOf('/personal') === 0) {
    let token = localStorage.getItem('user_token')
    if (token) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})

export default router
