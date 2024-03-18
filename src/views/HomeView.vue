<script setup>
import { House, ZoomIn, Filter, PieChart } from "@element-plus/icons-vue";
</script>

<template>
  <div class="home">
    <header>
      <div class="project-title">
        <img src="../assets/weibo.jpg" />
        <span>微博文本抑郁情感分析系统</span>
      </div>
      <div class="user-avatar">
        <el-popover placement="left" :width="50" trigger="hover">
          <template #reference>
            <el-avatar
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            />
          </template>

          <el-button @click="$router.push('/login')">退出登录</el-button>
        </el-popover>
      </div>
    </header>
    <main>
      <aside>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
        >
          <el-menu-item index="1" @click="$router.push('/index')">
            <template #title>
              <el-icon><House /></el-icon>
              <span>首页</span>
            </template>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><ZoomIn /></el-icon>
              <span>情感分析</span>
            </template>
            <el-menu-item index="2-1" @click="$router.push('/emo_analysis')"
              >评论情感分析</el-menu-item
            >
            <el-menu-item index="2-2" @click="$router.push('/user_analysis')"
              >用户情感分析</el-menu-item
            >
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Filter /></el-icon>
              <span>热搜筛选</span>
            </template>
            <el-menu-item index="3-1">用户推送筛选</el-menu-item>
            <el-menu-item index="3-2">热点事件筛选</el-menu-item>
          </el-sub-menu>

          <el-sub-menu index="4">
            <template #title>
              <el-icon><PieChart /></el-icon>
              <span>可视化展示</span>
            </template>
            <el-menu-item index="3-1">用户推送筛选</el-menu-item>
            <el-menu-item index="3-2">热点事件筛选</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </aside>
      <nav>
        <router-view></router-view>
      </nav>
    </main>
  </div>
</template>

<style scoped lang="less">
.home {
  height: 100vh;
  width: 100vw;
  header {
    display: flex;
    justify-content: space-between;
    height: 70px;
    margin-bottom: 10px;
    background-color: #ffffff;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2); /* 添加阴影 */
    .project-title {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 24px;
      img {
        height: 1.2em;
        margin: 0 10px;
        border-radius: 50%;
      }
      span {
        letter-spacing: 4px; /* 增加2像素的间距 */
      }
    }
    .user-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: 60px;
      margin-right: 40px;
    }
  }
  main {
    display: flex;
    height: calc(100vh - 80px);
    aside {
      height: 100%;
      width: 200px;
      margin-right: 12px;
      box-shadow: 3px 0 3px rgba(0, 0, 0, 0.2); /* 添加阴影 */
    }
    nav {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      width: calc(100vw - 212px);
      box-shadow: -2px -2px 3px rgba(0, 0, 0, 0.2); /* 添加阴影 */
    }
  }
}
</style>
