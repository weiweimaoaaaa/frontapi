import Vue from 'vue'
import Router from 'vue-router'
// 导入刚才编写的组件
import AppIndex from '@/components/home/AppIndex'
import Login from '@/components/Login'
import Signin from '../components/home/Signin'
import Home from '../components/Home'
import store from '../store'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    // 下面都是固定的写法
    {
      path: '/',
      redirect: '/login',

    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/signin',
      name:'Signin',
      component:Signin,

    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      // home页面并不需要被访问
      redirect: '/aa',
      children: [
        {
          path: '/aa',
          name: 'aa',
          component: () =>
            import('../views/aa.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/knowledge',
          name: 'knowledge',
          component: () =>
            import('../views/knowledge.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/authManage',
          name: 'authManage',
          component: () =>
            import('../views/authManage.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/roleManage',
          name: 'roleManage',
          component: () =>
            import('../views/roleManage.vue'),
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/menuManage',
          name: 'menuManage',
          component: () =>
            import('../views/menuManage.vue')
        },
        {
          path: '/groupManage',
          name: 'groupManage',
          component: () =>
            import('../views/groupManage.vue')
        },
        {
          path: '/classifyManage4',
          name: 'classifyManage4',
          component: () =>
            import('../views/classifyManage4.vue')
        },
        {
          path: '/emailManage',
          name: 'emailManage',
          component: () =>
            import('../views/emailManage.vue')
        },
        {
          path: '/passManage',
          name: 'passManage',
          component: () =>
            import('../views/passManage.vue')
        },
        {
          path: '/integralManage',
          name: 'integralManage',
          component: () =>
            import('../views/integralManage.vue')
        },
        {
          path: '/integralManage',
          name: 'integralManage',
          component: () =>
            import('../views/integralManage.vue')
        },
        ]
    }
  ]
})
