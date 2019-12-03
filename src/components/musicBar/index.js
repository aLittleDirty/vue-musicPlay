import axios from 'axios'
import { mapGetters } from 'vuex';
export default{
    name:'musicBar',
    data(){
        return{
            loading:true,
            musicDetail:{},
            currentId:this.$store.state.musicId,
            currentLists:this.$store.state.idLists,
            playing:this.$store.state.playing,
            currentMusicLists:this.$store.state.musicLists
        }
    },
    computed: {
        ...mapGetters({
            getId:'getMusicId',
            getIdLists:'getIdLists',
            getPlay:'getPlaying',
            getMusicLists:'getMusicLists'
        })
    },
    watch: {
        // 更新新歌曲时，重新渲染
        getId(newId){
            this.currentId = newId;
            this.getSongMessage(newId);
        },
        getIdLists(newIdLists){
            this.currentLists = newIdLists;
        },
        getPlay(newValue){
            this.playing = newValue;
            this.playing?this.$refs.audio.play():this.$refs.audio.pause();
        },
        getMusicLists(newLists){
            this.currentMusicLists = newLists;
        }
    },
    methods: {
        getDuration(){
            this.musicDetail.duration = this.format(this.$refs.audio.duration);
        },
        upDateTime(){
            this.musicDetail.currentTime = this.format(this.$refs.audio.currentTime);
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
        format(rawNumber){
            let  rawSeconds = parseInt(rawNumber);
            let second = this.addZero((rawSeconds%60));
            let minute = this.addZero(parseInt(rawSeconds/60));
            return `${minute}:${second}`;
        },
        addZero(value){
            let stringValue = value.toString();
            if(stringValue.length < 2){
                stringValue = '0' + stringValue;
            }
            return stringValue;
        },
        getSongMessage(musicId){
            let musicLists = this.currentMusicLists;
            if(musicLists.length !== 0){
                for(let j in musicLists){
                    if(musicLists[j].id === musicId){
                        let music = musicLists[j];
                        // 歌曲url为空时的处理方法还没想好，会导致vue组件加载生成audio时控制台报错，但不影响界面展示
                        if(!music.url){
                            alert('该歌曲无法播放');
                        }
                        this.musicDetail = {
                            name:music.name,
                            singer:music.singer,
                            img:music.img,
                            url:music.url,
                            duration:music.time,
                            currentTime:'00:00'
                        }
                    }
                }
            }else{
                axios.get('/song/detail',{
                    params:{
                        ids:musicId
                    }
                }).then((result)=>{
                    let rawMusic = result.data.songs[0];
                    this.musicDetail = {
                        name:rawMusic.name,
                        singer:rawMusic.ar[0].name,
                        img:rawMusic.al.picUrl,
                        url:'',
                        duration:'',
                        currentTime:'00:00'
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
                    this.musicDetail.url = result.data.data[0].url;
                }).catch((err)=>{
                  console.log(err);
                })
            }

            this.loading = false;
        }
    },
    created() {
        // 初始化的歌曲需要通过axios.get取值
        this.getSongMessage(this.currentId);
    }       
}