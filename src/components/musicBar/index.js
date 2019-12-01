import axios from 'axios'
import { mapGetters } from 'vuex';
export default{
    name:'musicBar',
    data(){
        return{
            loading:true,
            musicDetail:{},
            musicUrl:'',
            currentId:this.$store.state.musicId,
            currentLists:this.$store.state.musicIdLists,
            playing:this.$store.state.playing,
            currentTime:'00:00',
            duration:'00:00'
        }
    },
    computed: {
        ...mapGetters({
            getId:'getMusicId',
            getLists:'getMusicIdLists',
            getPlay:'getPlaying'
        })
    },
    watch: {
        // 更新新歌曲时，重新渲染
        getId(newId){
            this.currentId = newId;
            this.getSongMessage(newId);
        },
        getLists(newLists){
            this.currentLists = newLists;
        },
        getPlay(newValue){
            this.playing = newValue;
            this.playing?this.$refs.audio.play():this.$refs.audio.pause();
        }
    },
    methods: {
        getDuration(){
            this.duration = this.$refs.audio.duration;
        },
        upDateTime(){
            this.currentTime = this.$refs.audio.currentTime;
        },
        togglePlaying(){
            this.$store.commit('changePlaying',!this.playing);
        },
        prev(){
            let idIndex = this.currentLists.findIndex((value)=>{return value == this.currentId});
            let prevIndex = (idIndex === 0)?0:idIndex-1;
            let prevId = this.currentLists[prevIndex];
            this.$store.commit('changeId',prevId);
        },
        next(){
            let idIndex = this.currentLists.findIndex((value)=>{return value == this.currentId});
            let nextIndex = (idIndex === this.currentLists.length)?0:idIndex+1;
            let nextId = this.currentLists[nextIndex];
            this.$store.commit('changeId',nextId);
        },
        getSongMessage(musicId){
            axios.get('/song/detail',{
                params:{
                    ids:musicId
                }
            }).then((result)=>{
                let rawMusic = result.data.songs[0];
                this.musicDetail = {
                    name:rawMusic.name,
                    singer:rawMusic.ar[0].name,
                    imgUrl:rawMusic.al.picUrl
                };
            }).catch((err)=>{
                console.log(err);
            })
    
            // 获取歌曲播放信息
            axios.get('/song/url',{
                params:{
                    id:musicId
                }
            }).then((result)=>{
                if(result.data.code !== 200){
                    return;
                }
                this.musicUrl = result.data.data[0].url;
                this.loading = false;
            }).catch((err)=>{
              console.log(err);
            })
    
            this.loading = false;
        }
    },
    created() {
        // 获取歌曲的头像，歌名，歌手信息，歌曲mp3格式
        this.getSongMessage(this.currentId);
    }       
}