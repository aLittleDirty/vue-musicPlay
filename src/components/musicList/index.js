import axios from 'axios'
export default{
    name:'musicList',
    data(){
        return{
            musicLists:[],
            loading:true
        }
    },
    created() {
        axios.get('/top/list?idx=6').then((result)=>{
            if(result.data.code != 200) {
                return;
            }
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
            console.log(this.musicLists);
            this.loading = false;
            // 100首歌曲的id
            // console.log(result.data.playlist.trackIds);
            // 这个先放着吧
            let billBoardId = this.$route.query.id;
            console.log(billBoardId);
        }).catch((err)=>{
            console.log(err);
        })
    }
}