<template>
    <div class="music"> 
        <div class="loadingImg" v-if='loading'>
            <img  src="../../assets/images/loading.png"/>
        </div>
        <div v-else>
            <img class="coverImage" :src="musicDetail.img"/>
            <section ref="scrollLists" class="lyric-wrapper">  
                    <div class="lyric-content">
                        <h1>{{musicDetail.name}}</h1>
                        <span>专辑： {{musicDetail.album}}</span>
                        <span>歌手： {{musicDetail.singer}}</span>
                        <p v-for="(item,index) in lyric.lines" :key="index" :class="{'lyricLine':true,'highlight':index === currentLineNum}">{{item.txt}}</p>
                    </div>
            </section>
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style scoped>
@import './style.css';
</style>
