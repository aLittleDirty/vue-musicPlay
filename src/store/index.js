import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        // 初始的歌曲id，自己写了一个
        musicId:347230,
        idLists:[],
        musicLists:[]
    },
    getters:{
        getMusicId(state){
            return state.musicId
        },
        getIdLists(state){
            return state.idLists
        },
        getMusicLists(state){
            return state.musicLists
        }
    },
    mutations:{
        changeId(state,newMusicId){
            state.musicId = newMusicId;
        },
        changeIdLists(state,newIdLists){
            state.idLists = newIdLists;
        },
        changeMusicLists(state,newMusicLists){
            state.musicLists = newMusicLists;
        }
    }
})

