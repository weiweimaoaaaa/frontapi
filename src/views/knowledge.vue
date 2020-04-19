<template>
  <div id="form">
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">疫情热门链接</el-menu-item>
    </el-menu>
    <el-header v-for="(item,index) in newsknowledge" :key="index" class="newform">
    <el-link :href="item.url" icon="el-icon-s-home" type="success">{{item.title}}</el-link>
    </el-header>
  </div>
</template>

<script>
  export default {
    name: 'knowledge.vue',
    data(){
      return{
        newsknowledge:[],
        timer:'',
        activeIndex2:'1',
      }
    },
    mounted () {
      this.timer=setInterval(()=>{
        this.$axios({
          method:'post',
          url:'/getKnowledgeInfo',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',//设置请求头请求格式为JSON
          },
        }).then(res=>{
          console.log(res);
          this.newsknowledge=res.data.result;
        })
      },1000)
    },
    destroyed () {
      window.clearInterval(this.timer);
    }
  }
</script>

<style scoped>
  #form {
    font-family: Helvetica, sans-serif;
    text-align: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: absolute;
  }
</style>
