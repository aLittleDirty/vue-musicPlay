import musicBar from './components/musicBar/index.vue'

export default {
    name:'app',
    components:{
      musicBar
    },
    data(){
      return{
          currentPage:''
        }
    },
    // 页面跳转后，公共导航栏信息发生改变
    mounted(){
      let _this = this;
      this.$router.afterEach((to, from) => {
        _this.currentPage = to.meta.title || '';
      })
    }

}