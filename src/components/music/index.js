import axios from 'axios'
import { mapGetters } from 'vuex';
export default{
    name:'music',
    data(){
        return{
            loading:true,
            lyric:'',
            musicDetail:{},
        }
    },
    computed: {
        ...mapGetters({
            getId:'getMusicId'
        })
    },
    watch: {
        getId(newId){
            this.getSongMessage(newId);
        }
    },
    methods: {
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
            this.lyric = result.data.lrc.lyric.replace(/\[(.+?)\]/g,'');
        }).catch((err)=>{
            console.log(err);
        }),  
        this.loading = false;
        }
    },
    created() {
        let currentId = this.$store.state.musicId;
        this.getSongMessage(currentId);
    }
}