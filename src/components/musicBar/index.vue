<template>
    <div class="musicBar"> 
        <div v-if="loading">
            <img src="../../assets/images/loading.png"/>
        </div>
        <div  v-else>
            <router-link class="imageContainer" to="/music">
                <img :src="musicDetail.imgUrl"/>
            </router-link>
            <p class="songName">{{musicDetail.name}} - <span>{{musicDetail.singer}}</span></p>
            <span class="timeCounting">00:00 / 03:12</span>
            <div class="controlBtns">
                <button>上一首</button>
                <button class="mode"></button>
                <button>下一首</button>
                <button class="volume"></button>
            </div>
        </div>
       
    </div>
</template>
<script src="./index.js"></script>
<style scoped>
@import './style.css';
</style>
