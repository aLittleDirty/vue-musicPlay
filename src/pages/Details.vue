<template>
    <div>
        aaa
        {{newsInfo}}
        bbb
    </div>
</template>
<script>
import axios from 'axios'
export default {
    name:'Details',
    data(){
        return{
            newsInfo:''
        }
    },
    methods: {
    getNewsInfo() {
        axios.get('/newsDetail', {
            // 因为使用的是 mockjs 获取的随机数，所以无法通过 id 获取指定新闻的详情信息
            params: {
                id: this.$route.params.id
            }
        }).then((result) => {
            let data = result.data.data;
            console.log("sss: " + data);
            this.newsInfo = data;

        })
    }
},
mounted() {
    this.getNewsInfo();
}
}
</script>