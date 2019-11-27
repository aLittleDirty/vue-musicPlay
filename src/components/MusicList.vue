<template>
<div class="musicList">
   <table>
       <tr>
           <th>音乐标题</th><th>歌手</th><th>专辑</th><th>时长</th>
       </tr>
       <tr v-for="(music, listIndex) in textList" :key="listIndex">
           <td v-for="(item, index) in music" :key="index"></td>
       </tr>
   </table>
</div>
</template>

<script>
export default{
    data(){
        // textList的数据来源是相应榜单内的歌单详情
        textList:[{name:'a',singer:'b',collection:'c',timing:'d'},{name:'a',singer:'b',collection:'c',timing:'d'},{name:'a',singer:'b',collection:'c',timing:'d'},{name:'a',singer:'b',collection:'c',timing:'d'}]
    }
  
}
</script>
<style scoped>
 .musicList{
     margin:48px;
 }

 table{
     border-collapse: collapse;
     border-spacing: 0;
 }

 table tr{
     height:48px;
     /* 设置上下边框，左右无边框 */
     border:1px solid rgba(0,0,0,1);
     border-width:1px 0;
 }

</style>