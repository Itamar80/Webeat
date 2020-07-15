import Vue from 'vue'
import VueRouter from 'vue-router';
import home from '../views/homepage.vue';
import about from '../views/about.vue';
import dashboard from '../views/dashboard.vue';
import stations from '../views/stations.vue';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/about',
        name: 'About',
        component: about
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard
    },
    {
        path: '/stations',
        name: 'stations',
        component: stations
    },
]

const router = new VueRouter({
    routes
})

export default router