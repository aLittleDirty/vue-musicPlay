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
        getSongMessage(songId){
        // 获取歌词
        axios.get('./lyric',{
            params:{
                id:songId
            }
        }).then((result)=>{
            if(result.data.code !==200){
                return;
            }
            this.lyric = result.data.lrc.lyric.replace(/\[(.+?)\]/g,'');
        }).catch((err)=>{
            console.log(err);
        }),

        // 获取歌曲详情
        axios.get('./song/detail',{
            params:{
                ids:songId
            }
        }).then((result)=>{
            let rawMusic = result.data.songs[0];
            this.musicDetail = { 
            name:rawMusic.name,
            album:rawMusic.al.name,
            singer:rawMusic.ar[0].name,
            img:rawMusic.al.picUrl
            };
        }).then((err)=>{
            console.log(err);
        })
        this.loading = false;
        }
    },
    created() {
        let currentId = this.$store.state.musicId;
        this.getSongMessage(currentId);
    }
}