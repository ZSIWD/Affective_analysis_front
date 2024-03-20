<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import request from "@/api/request";
const tableData = ref([]);
const isUserIn = ref(false);
const queryData = ref({
  page: 1,
  size: 100,
});
onMounted(() => {
  request.getCommentByUser(queryData.value).then((res) => {
    tableData.value = res.data.records;
  });
});
const searchInput = ref("");
const totalFeel = ref(0);
function searchByUser() {
  queryData.value.userName = searchInput.value;
  request.getCommentByUser(queryData.value).then((res) => {
    tableData.value = res.data.records;
    isUserIn.value = true;
    totalFeel.value = res.data.records.reduce((total, records) => {
      total + records.label, 0;
    });
  });
}

function handleCurrentChange(toPageNum) {
  queryData.value.page = toPageNum;
  request.getCommentByUser(queryData.value).then((res) => {
    tableData.value = res.data.records;
  });
}
</script>

<template>
  <div class="user-analysis">
    <div class="search-condition">
      <div class="search-left">
        <span>请输入用户昵称：</span>
        <el-input
          v-model="searchInput"
          style="width: 240px"
          placeholder="Type something"
          :prefix-icon="Search"
        />
        <el-button type="primary" plain @click="searchByUser">搜索</el-button>
      </div>
      <div class="user-info" v-if="isUserIn">
        <span>头像</span>
        <div>
          <span class="title">用户昵称</span>
          <span class="user-content">{{ searchInput }}</span>
        </div>
        <div>
          <span class="title">性别</span>
          <span class="user-content">{{ tableData[0].userSex }}</span>
        </div>
        <!-- <div>
          <span class="title">情感度</span>
          <span class="user-content">{{ totalFeel }}</span>
        </div> -->
      </div>
    </div>
    <div class="search-result">
      <div class="analysis-table">
        <el-table
          :data="tableData"
          height="100%"
          style="width: 100%"
          :border="true"
        >
          <el-table-column prop="postMessage" label="评论" />
          <el-table-column prop="postTime" label="评论时间" />
          <el-table-column prop="label" label="分析结果" />
          <el-table-column prop="label" label="情感得分" />
        </el-table>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped lang="less">
.user-analysis {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .search-condition {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 20px;
    height: 10%;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1); /* 添加阴影 */
    background-color: #eeecec;
    margin-bottom: 10px;
    .el-input {
      margin-right: 20px;
    }
    .user-info {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      height: 100%;
      margin-right: 20px;
      width: 50%;
      div {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;

        .title {
          font-size: 16px;
          font-weight: 350;
        }
        .user-content {
          font-size: 12px;
          color: #0808f0;
        }
      }
    }
  }
  .search-result {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    height: 90%;
    width: 100%;

    .analysis-table {
      margin-left: 20px;
      height: 85%;
      width: 100%;
      background-color: #d712bd;
    }

    .el-pagination {
      margin-right: 40px;
      margin-top: 25px;
    }
  }
}
</style>
