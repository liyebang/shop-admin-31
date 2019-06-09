<template>
    <div>
        <!-- el-row是布局组件,type=flex声明是flex布局，并且带有降级方案（如果浏览器不支持flex，会自动调用其他布局方式） -->
        <el-row type="flex" justify="space-between">
            <div class="arrow">
                <i class="el-icon-back" v-if="isShow" @click='handleHidden'></i>
                <i class="el-icon-right" v-if='!isShow' @click='handleHidden'></i>
            </div>
            <div>admin 超级管理员 退出</div>
        </el-row>
    </div>
</template>

<script>
export default {
    data:function () {
        return {
            isShow: true
        }
    },
    methods:{
        handleHidden:function () {
            this.isShow = !this.isShow;
            this.$emit('handleHidden')
        }
    }
}
</script>

<style scoped>
    .arrow{
        cursor: pointer;
    }
</style>
