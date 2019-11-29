<template>
    <div class="music"> 
        <div v-if='loading'>
            <img class="loadingImg" src="../../assets/images/loading.png"/>
        </div>
        <div v-else>
            <img class="coverImage" :src="musicDetail.img"/>
            <section class="lyric">
                <h1>{{musicDetail.name}}</h1>
                <span>专辑： {{musicDetail.album}}</span>
                <span>歌手： {{musicDetail.singer}}</span>
                <p>{{lyric}}</p>
            </section>
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style scoped>
@import './style.css';
</style>
