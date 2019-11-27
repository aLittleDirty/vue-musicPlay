<template>
    <div class="Home">
        {{message}}
        <li v-for="(item, index) in textItems" :key="index">
            <!-- musicList -->
            <!-- 传入的id是关于相关榜单榜单的id -->
            <!-- 如果这个index不能正确生效，改成es6反引号写入 -->
            <router-link to="/musicList">
                <!-- <img src=""/> -->
                <span>toMusicList</span>
            </router-link>
        </li>
    </div>
</template>
<script>
export default {
    data(){
        return{
            message:'Home',
            // 数组中的每一项需要包含：图片，榜单名字，榜单id
            textItems:[1,2,3,4,5,6]
        }
    }
}
</script>
<style scoped>
    .Home{
        margin:48px;
    }
</style>