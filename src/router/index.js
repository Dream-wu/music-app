import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ListView from '../views/ListView.vue';
import store  from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/listview',
    name: 'listview',
    component: () => import(/* webpackChunkName: "ListView" */ '../views/ListView.vue')
  },
  {
    path: '/searchview',
    name: 'searchview',
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/me',
    name: 'me',
    beforeEnter(to, from, next) {  // 路由守卫
      const user = store.state.user;
      if (store.state.user.isLogin) {  // 登录状态下
        next();
      }
      next('/login');
    },
    component: () => import(/* webpackChunkName: "Me" */ '../views/Me.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
