import Vue from 'vue'
import VueRouter from 'vue-router'

// view layour
import Index from "@/views/layout/Index.vue"

// view
import MainHome from '@/views/MainHome.vue'
import ProductHome from '@/views/ProductHome.vue'
import CalcHome from '@/views/CalcHome.vue'
import MyProductList from '@/views/MyProductList.vue'
import MyInfo from '@/views/MyInfo.vue'
import SignIn from '@/views/SignIn.vue'
import SignUp from '@/views/SignUp.vue'

// component
import MyProduct from '@/components/MyProduct.vue'
import DetailSavingsProduct from '@/components/DetailSavingsProduct.vue'
import DetailInstallmentProduct from '@/components/DetailInstallmentProduct.vue'

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
        component: ProductHome,
      },
      {
        path: 'product/savings/:fin_prdt_cd',
        name: 'detail_savings_product',
        component: DetailSavingsProduct,
        props : true
      },
      {
        path: 'product/installment/:fin_prdt_cd',
        name: 'detail_installment_product',
        component: DetailInstallmentProduct,
        props : true
      },
      {
        path: 'calc',
        component: CalcHome,
      },
      {
        path: 'list',
        component: MyProductList,
      },
      {
        path: '/list/:product_idx',
        name: 'my_product',
        component: MyProduct,
        props: true,
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
