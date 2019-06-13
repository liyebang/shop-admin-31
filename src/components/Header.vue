<template>
    <div>
        <!-- el-row是布局组件,type=flex声明是flex布局，并且带有降级方案（如果浏览器不支持flex，会自动调用其他布局方式） -->
        <el-row type="flex" justify="space-between">
            <div class="arrow">
                <i class="el-icon-back" v-if="isShow" @click='handleHidden'></i>
                <i class="el-icon-right" v-if='!isShow' @click='handleHidden'></i>
            </div>
            <div>
                <span>{{user.uname}} {{user.realname}} </span>
                <span class="logout" @click='handleLogout'>退出</span>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    data:function () {
        return {
            isShow: true,
            user:{}
        }
    },
    methods:{
        handleHidden:function () {
            this.isShow = !this.isShow;
            this.$emit('handleHidden')
        },
        handleLogout:function () {
            this.$axios({
                url: 'http://127.0.0.1:8899/admin/account/logout',
                method: 'GET',
                withCredentials: true
            }).then(res => {
                console.log(res);
                const {status,message} = res.data;
                if(status == 0){
                    this.$message.success(message);
                    localStorage.removeItem('user');
                    this.$router.push('/login');
                }else {
                    this.$message.error(message);
                }
            })
        }
    },
    mounted(){
        this.user = this.$store.state.user;
    }
}
</script>

<style scoped>
    .arrow, .logout{
        cursor: pointer;
    }
</style>
