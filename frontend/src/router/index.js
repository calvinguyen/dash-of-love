import { createRouter, createWebHistory } from 'vue-router'
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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
      path: "/sign-in",
      component: () => import('../views/SignIn.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/AdminView.vue'),
      meta: {
        requiresAuth: true,
      },
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
  ]
})

const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        );
    });
}

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (await getCurrentUser()) {
            next();
        } else {
            alert("You don't have access!");
            next("/sign-in");
        }
    } else {
        next();
    }
})

export default router
