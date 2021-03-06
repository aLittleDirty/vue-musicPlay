import axios from 'axios'
import { mapGetters } from 'vuex';
import Lyric from 'lyric-parser'
import Bscroll from 'better-scroll'
export default{
    name:'music',
    data(){
        return{
            loading:true,
            lyric:{},
            musicDetail:{},
            currentLineNum:0,
            scroll:null,
        }
    },
    computed: {
        ...mapGetters({
            getId:'getMusicId',
            getPlaying:'getPlaying'
        })
    },
    watch: {
        getId(newId){
            this.getSongMessage(newId);
        },
        getPlaying(newPlaying){
            this.lyric.togglePlay();
        }
    },
    methods: {
        handleLyric(obj){
            // 高亮处理歌词
            this.currentLineNum = obj.lineNum;
            let lyricLines = this.$refs.scrollLists.getElementsByClassName('lyricLine');
            if(this.currentLineNum > 5){
            let currentLine = lyricLines[this.currentLineNum-5];
                this.scroll.scrollToElement(currentLine,1000);
            }
        },
        getSongMessage(newId){
        let musicLists = this.$store.state.musicLists;
        let songId = null;
        let song = null;
        for(let j in musicLists){
            if(musicLists[j].id === newId){
                songId = newId;
                song = musicLists[j];
            }
        }
        // 获取歌曲详情
        if(songId){
           this.musicDetail = {
               name:song.name,
               album:song.album,
               singer:song.singer,
               img:song.img
           }
        }else{
            axios.get('/song/detail',{
                params:{
                    ids:newId
                }
            }).then((result)=>{
                let rawMusic = result.data.songs[0];
                this.musicDetail = { 
                name:rawMusic.name,
                album:rawMusic.al.name,
                singer:rawMusic.ar[0].name,
                img:rawMusic.al.picUrl
                };
            }).catch((err)=>{
                console.log(err);
            })
        }

        //获取歌词 
        axios.get('/lyric',{
            params:{
                id:newId
            }
        }).then((result)=>{
            if(result.data.code !==200){
                return;
            }
            let lyric = result.data.lrc.lyric;
            this.lyric = new Lyric(lyric,this.handleLyric);

        }).catch((err)=>{
            console.log(err);
        }),  
        this.loading = false;
        }
    },
    created() {
        let currentId = this.$store.state.musicId;
        this.getSongMessage(currentId);
    },
    mounted() {
        this.$nextTick(()=>{
            this.scroll = new Bscroll(this.$refs.scrollLists,{
                scrollY:true
            });
        })
    },
}