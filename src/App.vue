<template>
    <div id="app">
        <router-link to="/home">主页</router-link><span>{{currentPage}}</span>
        <router-view></router-view>
        <musicBar></musicBar>
    </div>
</template>
<style>
    @import './app.css';
</style>
<script src="./app.js"></script>