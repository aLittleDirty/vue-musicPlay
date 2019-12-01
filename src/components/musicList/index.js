import axios from 'axios'
export default{
    name:'musicList',
    data(){
        return{
            musicLists:[],
            loading:true,
        }
    },
    methods: {
        changeMusic(newMusicId){
            this.$store.commit('changeMusic',newMusicId);
            // console.log(newMusicId);
            // 给musicBar传递参数，让歌曲开始自动播放
        }
    },
    created() {
        axios.get('/top/list?idx=6').then((result)=>{
            if(result.data.code != 200) {
                return;
            }
            // 获取榜单中100首歌的id，并传入vuex中保存
            let rawMusicIdLists = result.data.playlist.trackIds
            let musicIdLists = [];
            for(let j in rawMusicIdLists){
                musicIdLists.push(rawMusicIdLists[j].id);
            }
            this.$store.commit('changeMusicLists',musicIdLists);
            // 获取100首歌的具体信息，并渲染
            let rawLists = result.data.playlist.tracks;
            for(let i = 0;i < rawLists.length;i++){
                this.musicLists.push({
                    name:rawLists[i].name,
                    singer:rawLists[i].ar[0].name,
                    album:rawLists[i].al.name,
                    // 拿到了发表时间，拿错数据了
                    time:rawLists[i].publishTime,
                    id:rawLists[i].id
                })
            }
            this.loading = false;
         
            // 榜单的id
            // let billBoardId = this.$route.query.id;
            // console.log(billBoardId);
        }).catch((err)=>{
            console.log(err);
        })
    }
}