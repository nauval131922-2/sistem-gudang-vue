import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ItemView from '../views/ItemView.vue'
import ItemCreateView from '../views/ItemCreateView.vue'
import ItemEditView from '../views/ItemEditView.vue'
import LoanView from '../views/LoanView.vue'
import LoanCreateView from '../views/LoanCreateView.vue'
import LoanEditView from '../views/LoanEditView.vue'
import LoginView from '../views/LoginView.vue'
import OrderView from '../views/OrderView.vue'
import ProductView from '../views/ProductView.vue'
import ProductUpdateView from '../views/ProductUpdateView.vue'
import ProductCreateView from '../views/ProductCreateView.vue'
import OrderListView from '../views/OrderListView.vue'
import OrderDetailView from '../views/OrderDetailView.vue'
import OrderReportView from '../views/OrderReportView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/item',
      name: 'item',
      component: ItemView,
    },
    {
      path: '/item/create',
      name: 'itemCreate',
      component: ItemCreateView
    },
    {
      path: '/item/delete/:itemId',
      name: 'itemDelete',
    },
    {
      path: '/item/edit/:itemId',
      name: 'itemEdit',
      component: ItemEditView,
    },
    {
      path: '/loan',
      name: 'loan',
      component: LoanView,
    },
    {
      path: '/loan/create',
      name: 'loanCreate',
      component: LoanCreateView
    },
    {
      path: '/loan/edit/:loanId',
      name: 'loanEdit',
      component: LoanEditView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/order',
      name: 'order',
      component: OrderView,
    },
    {
      path: '/product',
      name: 'product',
      component: ProductView,
    },
    {
      path: '/product/:productId',
      name: 'productId',
      component: ProductUpdateView,
    },
    {
      path: '/product/create',
      name: 'productCreate',
      component: ProductCreateView
    },
    {
      path: '/order-list',
      name: 'orderList',
      component: OrderListView
    },
    {
      path: '/order/:orderId',
      name: 'orderDetail',
      component: OrderDetailView,
    },
    {
      path: '/order-report',
      name: 'orderReport',
      component: OrderReportView
    },
  ],
})

export default router
