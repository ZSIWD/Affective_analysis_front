<script setup>
import { ref, onMounted, computed } from "vue";
import request from "@/api/request";
const tableData = ref([]);
const pageInfo = ref({
  page: 1,
  size: 100,
});
onMounted(() => {
  request.getHotComment(pageInfo.value).then((res) => {
    tableData.value = res.data;
  });
});

function handleCurrentChange(toPageNum) {
  pageInfo.value.page = toPageNum;
  request.getHotComment(pageInfo.value).then((res) => {
    tableData.value = res.data;
  });
}
</script>

<template>
  <div class="emo-analysis">
    <div class = "label-level">
      <span>
        <div
            style="
              height: 30px;
              width: 30px;
              background-color: green;
              border-radius: 50%;
            "
          ></div>
          积极
      </span>
      <span>
        <div
            style="
              height: 30px;
              width: 30px;
              background-color: blue;
              border-radius: 50%;
            "
          ></div>
正常
      </span>
      <span>

        <div
            style="
              height: 30px;
              width: 30px;
              background-color: yellow;
              border-radius: 50%;
            "
          ></div>
          轻度
      </span>
      <span>

        <div
            style="
              height: 30px;
              width: 30px;
              background-color: #d38919;
              border-radius: 50%;
            "
          ></div>
          中度
      </span>
      <span>

        <div
            style="
              height: 30px;
              width: 30px;
              background-color: red;
              border-radius: 50%;
            "
          ></div>
          重度
      </span>
    </div>
    <el-table
      :data="tableData"
      height="98%"
      style="width: 100%"
      :border="true"
      stripe
    >
      <el-table-column prop="userName" label="用户名" width="180" />
      <el-table-column prop="comment" label="评论" width="500" />
      <el-table-column prop="commentTime" label="评论时间" />
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
            v-if="scope.row.label >= -0.5 && scope.row.label <= 0"
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
      <el-table-column prop="label" label="情感得分" width="100" />
    </el-table>
    <el-pagination
      background
      default-page-size="100"
      layout="prev, pager, next"
      page-count="100"
      :total="1000"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<style scoped lang="less">
.emo-analysis {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  height: 100%;
  width: 100%;
  .el-pagination {
    margin-right: 40px;
    margin-bottom: 30px;
  }
  .label-level{
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    height: 95px;
    width: 100%;
    background-color: #f0eded;
    margin-bottom: 5px;
  }
}
</style>
