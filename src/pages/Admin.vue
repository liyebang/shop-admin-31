<template>
  <el-container>
    <el-aside width="auto">
        <Menu :isCollapse='isCollapse'></Menu>
    </el-aside>
    <el-container>
      <el-header>
          <Header @handleHidden='handleHidden'></Header>
      </el-header>
      <el-main>
          <MianBaoXie></MianBaoXie>
          Main
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from '../components/Header.vue';
import MianBaoXie from '../components/Miaobaoxie.vue';
import Menu from '../components/Menu.vue';

export default {
    components:{
        Header,
        MianBaoXie,
        Menu
    },
    methods:{
        handleHidden:function () {
            this.isCollapse = !this.isCollapse;
        }
    },
    data:function () {
        return {
            isCollapse: false
        }
    }
};
</script>

<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  background-color: white;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;

}

body > div > .el-container {
  /* margin-bottom: 40px; */
  /* background-color: yellow; */
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
