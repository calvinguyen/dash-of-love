import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      children: [
        {
            path: '',
            name: 'dashboard',
            component: () => import('../components/Admin/AdminDashboard.vue'),
        },
        {
            path: 'orders',
            name: 'orders',
            component: () => import('../components/Admin/AdminOrders.vue'),
        },
        {
            path: 'customers',
            name: 'customers',
            component: () => import('../components/Admin/AdminCustomers.vue'),
        },
        {
            path: 'customer-form',
            name: 'customer-form',
            component: () => import('../components/Admin/CustomerForm.vue'),
        },
        {
            path: '/update-customer/:id',
            name: 'update-customer',
            props: true,
            component: () => import('../components/Admin/UpdateCustomer.vue'),
        },
        {
            path: '/update-order/:id',
            name: 'update-order',
            props: true,
            component: () => import('../components/Admin/UpdateOrder.vue'),
        },
        {
            path: 'menu',
            name: 'menu',
            component: () => import('../components/Admin/AdminMenu.vue'),
        },
      ],
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue')
    },
  ]
})

export default router
