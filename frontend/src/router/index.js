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
            path: '/customer-details/:id',
            name: 'customer-details',
            props: true,
            component: () => import('../components/Admin/CustomerDetails.vue'),
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
        {
            path: 'type-form',
            name: 'type-form',
            component: () => import('../components/Admin/TypeForm.vue'),
        },
        {
            path: 'flavor-form',
            name: 'flavor-form',
            component: () => import('../components/Admin/FlavorForm.vue'),
        },
        {
            path: '/type-details/:id',
            name: 'type-details',
            props: true,
            component: () => import('../components/Admin/TypeDetails.vue'),
        },
        {
            path: '/flavor-details/:id',
            name: 'flavor-details',
            props: true,
            component: () => import('../components/Admin/FlavorDetails.vue'),
        },
        {
            path: 'reports',
            name: 'reports',
            component: () => import('../components/Admin/AdminReports.vue'),
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
