<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item 
        v-for="(value, index) in info" 
        :key="index">
            {{value}}
        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script>
export default {
    data(){
        return {
            info:[]
        }
    },
    methods:{
        getMianBaoXie(){
            var arr = this.$route.matched.map(v => v.meta);
            this.info = arr;
        }
    },
    watch:{
        $route(){
            this.getMianBaoXie()
        }
    },
    mounted(){
        this.getMianBaoXie()
    }
}
</script>

<style scoped>
    .el-breadcrumb{
        padding-bottom: 10px;
        border-bottom: 1px solid #ddd
    }
</style>
