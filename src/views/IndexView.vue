<script setup></script>

<template>
  <div class="index">
    <div class="index-content">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
      <span>欢迎回来！</span>
    </div>
    <el-divider />
    <div class="index-image">
      <span>让心灵沐浴阳光，远离抑郁的阴霾</span>
      <!-- <img src="../assets/relax.jpg" /> -->
    </div>
  </div>
</template>

<style scoped lang="less">
.index {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .index-content {
    display: flex;
    align-items: center;
    width: auto;
    height: 15%;
    padding-left: 20px;
    .el-avatar {
      margin-right: 15px;
    }
  }

  .el-divider {
    margin: 0;
  }
  .index-image {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 85%;
    background-image: url(../assets/relax.jpg);
    background-size: cover;
    span {
      font-size: 70px;
      font-weight: 600;
      letter-spacing: 4px;
      margin-bottom: 30px;
      color: #ffffff;
    }
    img {
      width: 50%;
      border-radius: 20px;
    }
  }
}
</style>
