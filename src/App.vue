<template>
  <div>
    index
     <el-button type="primary" plain>主要按钮</el-button>
     <router-view></router-view>
  </div>
</template>

<script>
// import axios from 'axios';

export default {
  mounted(){
    // //请求测试接口
    // axios({
    //   url:'https://api.github.com/users',
    //   method:'GET',
    //   //get请求参数
    //   params:{
    //     abc:213
    //   }
    // }).then(res => {
    //   console.log(res);
    // })


    //优化的最终效果
    this.$axios({
      url:'https://api.github.com/users',
      method:'GET',
      //get请求参数
      params:{
        abc:213
      }
    }).then(res => {
      console.log(res);
    })
  }
}
</script>

<style>


</style>
