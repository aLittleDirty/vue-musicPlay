<template>
    <div class="home"> 
        <div v-if='loading'>
            <img class="loadingImg" src="../../assets/images/loading.png"/>
        </div>

        <div v-else>
            <li class="billboard" v-for="(billboard, index) in billboardList" :key="index">
                <router-link :to="{path:'/musicList',query:{id:billboard.id}}">
                    <img :src='billboard.coverImgUrl'/>
                    <p>{{billboard.name}}</p> 
                </router-link>
            </li>
        </div> 
        
    </div>
</template>
<script src="./index.js"></script>
<style scoped>
@import './style.css';
</style>
