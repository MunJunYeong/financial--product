import Vue from 'vue'
import VueRouter from 'vue-router'

import Index from "@/views/layout/Index.vue"

import MainHome from '@/views/MainHome.vue'
import SavingsProductHome from '@/views/SavingsProductHome.vue'
import CalcHome from '@/views/CalcHome.vue'
import MyListHome from '@/views/MyListHome.vue'
import MyInfo from '@/views/MyInfo.vue'

import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home', // 초기 진입 페이지 설정
  },
  {
    path: '/',
    component: Index,
    children : [
      {
        path: 'home',
        component: MainHome,
      },
      {
        path: 'product',
        component: SavingsProductHome,
      },
      {
        path: 'calc',
        component: CalcHome,
      },
      {
        path: 'list',
        component: MyListHome,
      },
      {
        path: 'info',
        component: MyInfo,
      },
      {
        path: 'signin',
        component: SignIn,
      },
      {
        path: 'signup',
        component: SignUp,
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
