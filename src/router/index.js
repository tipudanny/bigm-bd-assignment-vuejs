import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/registration',
        name: 'Registration',
        component: function () {
            return import(/* webpackChunkName: "Registration" */ '../views/Registration')
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/Login')
        }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: function () {
            return import(/* webpackChunkName: "Admin" */ '../views/Admin')
        },
        meta: {
            requiresAuth: true
        },
    },
    // Not Found Page
    {
        path: "*",
        name: "NotFound",
        component: function () {
            return import(/* webpackChunkName: "about" */ '../views/PageNotFound')
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    scrollBehavior(to, from, savedPosition) {
        return {x: 0, y: 0}
    },
    routes
})
export default router
