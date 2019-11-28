import axios from 'axios'
export default{
    name:'home',
    data(){
        return{
            billboardList:[],
            loading: true
        }
    },
    created() {
            axios.get('/toplist').then((result)=>{
                if(result.data.code != 200) {
                    return;
                }
                let resultList = result.data.list;
                for (let i = 0;i < resultList.length;i++){
                    this.billboardList.push({
                        name:resultList[i].name,
                        coverImgUrl:resultList[i].coverImgUrl,
                        id:resultList[i].id
                    })
                }
                this.loading = false;
            }).catch((err)=>{
                console.log(err);
            })
    }
}