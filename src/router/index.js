import Vue from 'vue';
import Router from 'vue-router';
import Home from '../pages/Home.vue';
import List from '../pages/List.vue';
import Details from '../pages/Details.vue';

Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/',
            name:'Home',
            component:Home
        },
        {
            path:'/list',
            name:'List',
            component:List
        },
        {
            path:'/details',
            name:'Details',
            component:Details
        }
    ]
})