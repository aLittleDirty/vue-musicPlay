<template>
    <div id="app">
        <!-- {{message}} -->
        <router-view></router-view>
        <router-link to="/">首页</router-link>
        <!-- <router-link to="'/details/'+item.id">list</router-link> -->
        <router-link to="/list">列表页</router-link>
        <router-link to="/details">细节</router-link>

    </div>
</template>
<script>
export default {
    name:'App',
    data(){
        return{
            message:'Hello!'
        }
    }
}
</script>