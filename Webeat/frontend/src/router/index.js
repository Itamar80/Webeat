import Vue from 'vue'
import VueRouter from 'vue-router';
import stations from '../views/genre-stations.vue';
import about from '../views/about.vue';
import dashboard from '../views/dashboard.vue';
import home from '../views/stations-app.vue';
import stationDetails from '../views/station-details.vue';
import login from '../views/login-signup.vue';
import editStation from '../views/station-edit.vue';

Vue.use(VueRouter)

const routes = [{
        path: '/',
        name: 'home',
        component: home
    },
    {
        path: '/stations/:genre?',
        name: 'stations',
        component: stations
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
        path: '/edit/:id?',
        name: 'editStation',
        component: editStation
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