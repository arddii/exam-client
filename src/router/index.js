import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index.js';
import middlewarePipeline from '@/router/middlewarePipeline.js';
import auth from '@/middleware/auth.js';

import Discovery from '../views/Discovery.vue';
import Login from '../views/auth/Login.vue';
import Register from '../views/auth/Register.vue';
import Profile from '../views/profile/Profile.vue';
import Settings from '../views/profile/Settings.vue';
import Orders from '../views/profile/Orders.vue';
import NotFound from '../views/errors/404.vue';
import Product from '../views/products/Product.vue';

import Dashboard from '../views/admin/Dashboard.vue';
import DashboardCategories from '../views/admin/categories/Categories.vue';

const routes = [
    {
        path: '/discovery',
        name: 'Discovery',
        component: Discovery,
    },
    {
        path: '/',
        name: 'Home',
        redirect: {
            name: 'Discovery'
        }
    },
    {
        path: '/auth/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/auth/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/profile/settings',
        name: 'Settings',
        component: Settings,
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/profile/orders',
        name: 'Orders',
        component: Orders,
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/product/:product_id',
        name: 'Product',
        component: Product
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/dashboard/categories',
        name: 'Dashboard-Categories',
        component: DashboardCategories,
        meta: {
            middleware: [auth]
        }
    },
    {
        path: '/:catchAll(.*)*',
        name: 'NotFound',
        component: NotFound,
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

router.beforeEach((to, from, next) => {
    const middleware = to.meta.middleware;
    const context = { to, from, next, store };

    if (!middleware) return next();

    middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1),
    });
});

export default router;