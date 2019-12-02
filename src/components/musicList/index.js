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
        changeMusic(newId){
            this.$store.commit('changeId',newId);
            // 开始播放歌曲
            let isPlay = true;
            this.$store.commit('changePlaying',isPlay);
        },
        highlight(e){
            let allTr = e.currentTarget.parentNode.children;
            let currentTr = e.currentTarget;
            for(let i =1;i < allTr.length;i++){
                allTr[i].className = '';
            }
            currentTr.className = 'highlight';
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
                    time:rawLists[j].publishTime,
                    id:rawLists[j].id
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