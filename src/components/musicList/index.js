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
        // 通过榜单id
        let billBoardId = this.$route.query.id;
        axios.get('/playlist/detail',{
            params:{
                id:billBoardId
            }
        }).then((result)=>{
            if(result.data.code != 200){
                return;
            }
            let idLists = [];
            let rawLists = result.data.playlist.tracks;

            for(let j in rawLists){
                this.musicLists.push({
                    name:rawLists[j].name,
                    singer:rawLists[j].ar[0].name,
                    album:rawLists[j].al.name,
                    time:rawLists[j].publishTime
                })  
                idLists.push(rawLists[j].id);
            }

            this.$store.commit('changeIdLists',idLists);
            this.loading = false;

        }).catch((err)=>{
            console.log(err);
        })
    }
}