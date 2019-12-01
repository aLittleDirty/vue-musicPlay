import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        // 初始的歌曲id，自己写了一个
        musicId:347230,
        playing:false,
        musicIdLists:[]
    },
    getters:{
        getMusicId(state){
            return state.musicId
        },
        getMusicIdLists(state){
            return state.musicIdLists
        }
    },
    mutations:{
        changeMusic(state,newMusicId){
            state.musicId = newMusicId;
        },
        changePlaying(state,isPlay){
            state.playing = isPlay;
        },
        changeIdLists(state,newIdLists){
            state.musicIdLists = newIdLists;
        }
    }
})

