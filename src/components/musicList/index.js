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
            console.log(newId);
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
        },
        format(value){
            let stringValue = value.toString();
            while(stringValue.length < 2){
                stringValue = '0' + stringValue;
            }
            return stringValue;
        }
    },
    created(){
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
                    id:rawLists[j].id,
                    img:rawLists[j].al.picUrl,
                    url:'',
                    time:'loading...'
                })  
                idLists.push(rawLists[j].id);
            }
            // 获取全部歌曲的url
            let ids = idLists.join(',');
            axios.get('/song/url',{
                params:{
                    id:ids
                }
            }).then((result)=>{
                let rawUrls = result.data.data;

                for(let j in rawUrls){
                    // 将每一首歌的url放进歌曲对象中
                    let url = rawUrls[j].url;
                    this.musicLists[j].url = url;

                    // 将每一首歌的总时长放进歌曲对象中
                    if(typeof url !== 'string'){
                        this.musicLists[j].time = "00:00";
                        continue;
                    }
                    let audio = new Audio(url);
                    audio.load();
                    audio.oncanplay = ()=>{
                        let rawTime = parseInt(audio.duration);
                        let second = this.format(rawTime%60);
                        let minute = this.format(parseInt(rawTime/60));
                        this.musicLists[j].time = `${minute}:${second}`;
                    }
                }
            }).catch((err)=>{
                console.log(err);
            })
            this.$store.commit('changeIdLists',idLists);
            this.$store.commit('changeMusicLists',this.musicLists);
            this.loading = false;

        }).catch((err)=>{
            console.log(err);
        })
    }
}