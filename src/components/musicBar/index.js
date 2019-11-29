import axios from 'axios'
export default{
    name:'musicBar',
    data(){
        return{
            loading:true,
            musicDetail:{},
            musicUrl:'',
            playing:this.$store.state.playing,
            currentTime:'00:00',
            duration:'00:00'
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
            this.playing = !this.playing;
            this.$store.commit('changePlaying',this.playing);
        },
        prev(){
            console.log('I want to change to last song');
        },
        next(){
            console.log('I want to change to next song');
        }
    },
    watch: {
        playing(newValue){
            let isPlay = newValue;
            isPlay?this.$refs.audio.play():this.$refs.audio.pause();
        }
    },
    created() {

        // 获取歌曲的头像，歌名，歌手信息
        axios.get('./song/detail',{
            params:{
                ids:this.$store.state.musicId
            }
        }).then((result)=>{
            let rawMusic = result.data.songs[0];
            this.musicDetail = {
                name:rawMusic.name,
                singer:rawMusic.ar[0].name,
                imgUrl:rawMusic.al.picUrl
            };
        }).then((err)=>{
            console.log(err);
        })

        // 获取歌曲播放信息
        axios.get('/song/url',{
            params:{
                id:this.$store.state.musicId
            }
        }).then((result)=>{
            if(result.data.code !== 200){
                return;
            }
            this.musicUrl = result.data.data[0].url;
            console.log(this.musicUrl);
            this.loading = false;
        }).catch((err)=>{
          console.log(err);
        })

        this.loading = false;
    },
}