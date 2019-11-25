<template>
    <div>
        <ul>
            <li v-for="(item,index) in newsList" :key=index>
                <router-link :to="'/details/'+item.id">route</router-link>
                <p>{{item.title}}</p>
                <p>{{item.date}}</p>
                <p>{{item.imageURL}}</p>
                <p>{{item.viewCount}}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from 'axios';
// import router from 'vue-router';
export default {
    name : "List",
    data(){
        return{
            newsList:[]
        }
    },
    methods:{
        getNewsListData(){
            axios.get('/newslist').then(result => {
                let data = result.data.data;
                this.newsList = data;
                // this.$router.push({name: 'Details', params: {id: this.newsList[5].id}})
            })
        }
    },
    mounted() {
        this.getNewsListData();
    }
}
</script>