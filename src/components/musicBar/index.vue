<template>
    <div class="musicBar"> 
        <div v-if="loading">
            <img src="../../assets/images/loading.png"/>
        </div>
        <div　v-else>
            <div class="songDetail">
                <audio ref="audio" preload="auto" @timeupdate="upDateTime" @canplay="getDuration" crossorigin="anonymous" :src="musicDetail.url">您的浏览器不支持audio播放</audio>
                <router-link class="imageContainer" to="/music">
                <img :src="musicDetail.img"/>
                </router-link>
                <p>
                <span>{{musicDetail.name}}</span>
                <span> - {{musicDetail.singer}}</span>
                <span class="timeCounting">{{musicDetail.currentTime}} / {{musicDetail.duration}}</span>
                </p>
            </div>
            <div class="controlBtns">
                <button @click="prev" ref="last">上一首</button>
                <button class="mode" @click="togglePlaying"></button>
                <button @click="next" ref="next">下一首</button>
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
