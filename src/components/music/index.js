import axios from 'axios'
export default{
    name:'music',
    data(){
        return{
            loading:true,
            lyric:'',
            musicDetail:{},
        }
    },
    created() {
        let currentMusicId = this.$store.state.musicId;

        // 获取歌词
        axios.get('./lyric',{
            params:{
                id:currentMusicId
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
                ids:currentMusicId
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
}