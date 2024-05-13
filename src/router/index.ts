import { createRouter, createWebHistory } from 'vue-router'
import { RouteNames } from '@/enums/RouteNames'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: { name: RouteNames.PRODUCTS }
        },
        {
            path: '/products',
            name: RouteNames.PRODUCTS,
            component: () => import('@/views/ProductListView.vue'),
        },
        {
            path: '/products/:id',
            name: RouteNames.PRODUCT,
            component: () => import('@/views/ProductView.vue')
        },
        {
            path: '/cart',
            name: RouteNames.CART,
            component: () => import('../views/CartView.vue')
        }

    ]
})

export default router
