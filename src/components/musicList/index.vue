<template>
    <div class="musicList"> 
        <div v-if='loading'>
            <img class="loadingImg" src="../../assets/images/loading.png"/>
        </div>
        <div v-else>
            <table>
                <tr>
                    <th>音乐标题</th><th>歌手</th><th>专辑</th><th>时长</th>
                </tr>
                <tr v-for="(music, index) in musicLists" :key="index">
                    <td>{{music.name}}</td>
                    <td>{{music.singer}}</td>
                    <td>{{music.album}}</td>
                    <td>{{music.time}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>
<script src="./index.js"></script>
<style scoped>
@import './style.css';
</style>
