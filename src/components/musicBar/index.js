import axios from 'axios'
export default{
    name:'musicBar',
    data(){
        return{
            loading:true,
            musicDetail:{},
            musicBar:'hello,I am musicBar'
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
            let musicUrl = result.data.data[0].url;
            console.log(musicUrl);
            this.loading = false;
        }).catch((err)=>{
          console.log(err);
        })

        this.loading = false;
    },
}