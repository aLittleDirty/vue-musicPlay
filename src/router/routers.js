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
            component:MusicList,
            meta:{title:'榜单详情'}
        },
        {
            path:'/music',
            name:'Music',
            component:Music,
            meta:{title:'歌曲详情'}
        },
        {
            path:'/',
            redirect:'/home'
        }
    ]
})