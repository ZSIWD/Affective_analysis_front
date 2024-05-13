<script setup>
import { ref } from "vue";
import { Lock, User } from "@element-plus/icons-vue";
import request from "@/api/request";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const sysUsername = ref("");
const password = ref("");
const confirmPasswod = ref("");
const router = useRouter();
//登录
const register = () => {
  console.log(sysUsername.value, password.value);
  if(password.value !== confirmPasswod.value){
    ElMessage.error("两次密码不一致");
    return;
  }
  //判断用户是否存在
  
  //密码相同
  const data = {
    sysUsername:sysUsername.value,
    password:password.value
  }
  //注册
  request.register(data).then((res)=>{
    if(res.code===200){
      ElMessage.success("注册成功")
      router.push("/login");
    }
    else{
      ElMessage.warning("账号已经存在");
    }
  })

  
};


</script>

<template>
  <div class="login-container">
    <div class="login-left">
      <div class="project-title">
        <img src="../assets/weibo.jpg" />
        <span>微博文本抑郁情感分析系统</span>
      </div>
      <div class="login-image">
        <span>寻找内心的光芒，摆脱抑郁情绪</span>
        <img src="../assets/qinggan.jpg" />
      </div>
    </div>
    <div class="login-right">
      <div class="login-right-form">
        <div class="login-text">
          <h1>注册</h1>
          <p>使用您的内部账号登录分析系统</p>
        </div>
        <div class="login-form">
          <el-input
            v-model="sysUsername"
            style="width: 240px"
            placeholder="请输入账号"
            :prefix-icon="User"
          />
          <el-input
            v-model="password"
            style="width: 240px"
            type="password"
            placeholder="请输入密码"
            :prefix-icon="Lock"
          />
          <el-input
            v-model="confirmPasswod"
            style="width: 240px"
            type="password"
            placeholder="请确认密码"
            :prefix-icon="Lock"
          />
          
          <el-button type="primary" @click="register">注册</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  .login-left {
    width: 45%;
    height: 100%;
    background-color: #3c71b1;
    .project-title {
      display: flex;
      align-items: center;
      width: 100%;
      height: 10%;
      font-size: 26px;
      color: white;
      img {
        height: 1.3em;
        margin: 0 10px;
        border-radius: 50%;
      }
      span {
        letter-spacing: 4px; /* 增加2像素的间距 */
      }
    }
    .login-image {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 90%;
      font-size: 26px;
      color: white;
      img {
        height: 35%;
        margin-top: 30px;
        border-radius: 40px;
      }
    }
  }
  .login-right {
    width: 55%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgb(255, 255, 255);
    .login-right-form {
      width: 30%;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fefefe;
      .login-text {
        display: flex;
        width: 100%;
        flex-direction: column;
        h1 {
          margin: 0 !important;
          font-size: 30px;
        }
        p {
          font-size: 16px;
        }
      }
      .login-form {
        display: flex;
        width: 100%;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .el-input {
          width: 100% !important;
          margin: 10px 0;
        }
        .remenber {
          width: 100%;
          display: flex;
          justify-content:space-between;
          a{
            font-size: 14px;
            margin-top: 8px;
          }
        }
        .el-button {
          width: 100%;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
