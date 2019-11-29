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
            <audio 
            ref="audio" 
            :src="musicUrl" 
            preload="auto"
            @canplay="getDuration"
            @timeupdate="upDateTime">您的浏览器不支持audio播放</audio>
            <span class="timeCounting">{{currentTime}} / {{duration}}</span>
            <div class="controlBtns">
                <button @click="prev">上一首</button>
                <button class="mode" @click="togglePlaying"></button>
                <button @click="next">下一首</button>
                <button class="volume"></button>
            </div>
        </div>
       
    </div>
</template>
<script src="./index.js"></script>
<style scoped>
@import './style.css';
</style>
