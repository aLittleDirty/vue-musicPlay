import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/home/index.vue';
import MusicList from '../components/musicList/index.vue'
import Music from '../components/music/index.vue'

Vue.use(Router);

export default new Router({
    routes:[
        {
            path:'/home',
            name:'Home',
            component:Home
        },
        {
            path:'/musicList',
            name:'MusicList',
            component:MusicList
        },
        {
            path:'/music',
            name:'Music',
            component:Music
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
})