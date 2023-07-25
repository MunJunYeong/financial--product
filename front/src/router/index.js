import Vue from 'vue'
import VueRouter from 'vue-router'

import Navi from "@/views/layout/Navigation.vue"

import MainHome from '@/views/MainHome.vue'
import ProductHome from '@/views/ProductHome.vue'
import CalcHome from '@/views/CalcHome.vue'
import MyListHome from '@/views/MyListHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home', // 초기 진입 페이지 설정
  },
  {
    path: '/',
    component: Navi,
    children : [
      {
        path: 'home',
        component: MainHome,
      },
      {
        path: 'product',
        component: ProductHome,
      },
      {
        path: 'calc',
        component: CalcHome,
      },
      {
        path: 'list',
        component: MyListHome,
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
