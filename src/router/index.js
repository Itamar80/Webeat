import Vue from 'vue'
import VueRouter from 'vue-router';
import home from '../views/homepage.vue';
import about from '../views/about.vue';
import dashboard from '../views/dashboard.vue';
import stations from '../views/stations-app.vue';
import stationDetails from '../views/station-details.vue';
import login from '../views/login-signup.vue';

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
        path: '/login',
        name: 'Login',
        component: login
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
    {
        path: '/stations/details/:id',
        name: 'stations-details',
        component: stationDetails
    },
]

const router = new VueRouter({
    routes
})

export default router