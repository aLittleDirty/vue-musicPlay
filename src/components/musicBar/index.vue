<template>
    <div class="musicBar"> 
        <div v-if="loading">
            <img src="../../assets/images/loading.png"/>
        </div>
        <div　v-else>
            <div class="songDetail">
                <audio ref="audio" :src="musicUrl" preload="auto" @canplay="getDuration" @timeupdate="upDateTime">您的浏览器不支持audio播放</audio>
                <router-link class="imageContainer" to="/music">
                <img :src="musicDetail.imgUrl"/>
                </router-link>
                <p>
                <span>{{musicDetail.name}}</span>
                <span> - {{musicDetail.singer}}</span>
                <span class="timeCounting">{{currentTime}} / {{duration}}</span>
                </p>
            </div>
            <div class="controlBtns">
                <button @click="prev">上一首</button>
                <button class="mode" @click="togglePlaying"></button>
                <button @click="next">下一首</button>
            </div>
            <div class="volume">
                <button></button>
                <input type="range" max="10" min="0" value="5"/>
            </div>
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style scoped>
@import './style.css';
</style>
