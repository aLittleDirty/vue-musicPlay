import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
        // 初始的歌曲id，自己写了一个
        musicId:347230,
        playing:false,
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
        getPlaying(state){
            return state.playing
        }
    },
    mutations:{
        changeId(state,newMusicId){
            state.musicId = newMusicId;
        },
        changePlaying(state,isPlay){
            state.playing = isPlay;
        },
        changeIdLists(state,newIdLists){
            state.idLists = newIdLists;
        }
    }
})

