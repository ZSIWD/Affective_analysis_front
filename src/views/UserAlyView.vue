<script setup>
import { Search } from "@element-plus/icons-vue";
import { ref, onMounted } from "vue";
import request from "@/api/request";
import { ElMessage } from "element-plus";
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
  console.log(totalFeel.value);
  queryData.value.userName = searchInput.value;
  queryData.value.page = 1;
  queryData.value.size = 10000;
  request.getCommentByUser(queryData.value).then((res) => {
    if(res.data.records.length == 0){
      ElMessage.warning("该用户不存在");
      return;
    }
    tableData.value = res.data.records;
    isUserIn.value = true;
    for(const x of tableData.value){
      if (x.label < 0){
        totalFeel.value += x.label
      }
    }
  });
}

function handleCurrentChange(toPageNum) {
  queryData.value.page = toPageNum;
  request.getCommentByUser(queryData.value).then((res) => {
    tableData.value = res.data.records;
  });
}

function getAll(){
  queryData.value = {
    page :1,
    size:100
  }
  request.getCommentByUser(queryData.value).then((res) => {
    tableData.value = res.data.records;
  });
  isUserIn.value = false;
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
          placeholder="请输入用户名"
          :prefix-icon="Search"
          clearable
          @clear="getAll"
        />
        <el-button type="primary" plain @click="searchByUser">搜索</el-button>
      </div>
      <div class="user-info" v-if="isUserIn">
        <div>
          <span class="title">用户昵称</span>
          <span class="user-content">{{ searchInput }}</span>
        </div>
        <div>
          <span class="title">性别</span>
          <span class="user-content">{{ tableData[0].userSex }}</span>
        </div>
        <div>
          <span class="title">抑郁度</span>
          <span class="user-content">{{ totalFeel }}</span>
        </div>
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
        <el-table-column prop="userName" label="用户名" />
          <el-table-column prop="postMessage" label="评论" />
          <el-table-column prop="postTime" label="评论时间" />
          <el-table-column prop="label" label="分析结果" width="180">
        <template #default="scope">
          <div
            style="
              height: 30px;
              width: 30px;
              background-color: green;
              border-radius: 50%;
            "
            v-if="scope.row.label == 1"
          ></div>
          <div
            style="
              height: 30px;
              width: 30px;
              background-color: blue;
              border-radius: 50%;
            "
            v-if="scope.row.label <= 0 && scope.row.label>= -0.5 "
          ></div>
          <div
            style="
              height: 30px;
              width: 30px;
              background-color: yellow;
              border-radius: 50%;
            "
            v-if="scope.row.label < -0.5 && scope.row.label >= -0.8"
          ></div>

          <div
            style="
              height: 30px;
              width: 30px;
              background-color: #d38919;
              border-radius: 50%;
            "
            v-else-if="scope.row.label < -0.8 && scope.row.label >= -0.95"
          ></div>

          <div
            style="
              height: 30px;
              width: 30px;
              background-color: red;
              border-radius: 50%;
            "
            v-else-if="scope.row.label < -0.95 && scope.row.label >= -1"
          ></div>
        </template>
      </el-table-column>
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
