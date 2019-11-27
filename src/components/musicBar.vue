<template>
    <div class="musicBar">
<!-- 歌曲进度条 -->
        <!-- <musicBar></musicBar> -->
        <nav class="musicBar">
            <div class="currentPlay">
                <!-- 这里的id指的是当前播放歌曲的id -->
                <router-link to="/music/id">
                <!-- <img/> -->
                </router-link>
                <p>{{currentMusicName}}</p>
                <span>{{timing}}</span>
            </div>
            <div class='controlButtons'></div>
        </nav>
    </div>
</template>

