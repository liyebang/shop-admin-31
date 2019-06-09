<template>
  <div class="form-wrapper">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setTimeout } from "timers";
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
            url: "http://127.0.0.1:8899/admin/account/login",
            method: "POST",
            data: {
              uname: this.ruleForm.username,
              upwd: this.ruleForm.password
            },
            withCredentials: true
          }).then(res => {
            // console.log(res);
            const {status,message} = res.data
            if (status == 1) {
              this.$message.error(message);
            } else {
              this.$message({
                message: "登录成功",
                type: "success"
              });
              setTimeout(() => {
                this.$router.push("/");
              }, 2000);
            }
          });
        }
      });
    }
  }
};
</script>
<style scoped>
.form-wrapper {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  text-align: center;
}
.demo-ruleForm {
  width: 500px;
  position: absolute;
  left: 50%;
  margin-left: -250px;
  top: 50%;
  margin-top: -93px;
}
</style>
