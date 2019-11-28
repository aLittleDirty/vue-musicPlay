<template>
    <div id="app">
        <router-link class="nav"  to="/home">主页</router-link><span>{{currentPage}}</span>
        <router-view class="main"></router-view>
        <musicBar></musicBar>
    </div>
</template>
<style>
    @import './app.css';
</style>
<script src="./app.js"></script>