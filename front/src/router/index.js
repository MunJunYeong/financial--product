import Vue from 'vue'
import VueRouter from 'vue-router'

import MainHome from '../views/MainHome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'MainHome',
    component: MainHome
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
