import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        // 刚开始渲染时的音乐的起始值没想好怎么写...
        // 可以考虑用localStorage
        musicId:33894312
    },
    mutations:{
        changeMusicId(state,newMusicId){
            state.musicId = newMusicId;
        }
    }
})

