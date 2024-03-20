<script setup>
import { ref, onMounted } from "vue";
import request from "@/api/request";
const tableData = ref([]);
onMounted(() => {
  const pageInfo = {
    page: 20,
    size: 100,
  };
  request.getHotComment(pageInfo).then((res) => {
    tableData.value = res.data;
  });
  console.log("打开了这个页面");
});
</script>

<template>
  <div class="emo-analysis">
    <el-table :data="tableData" height="96%" style="width: 100%" border="true">
      <el-table-column prop="userName" label="用户名" width="180" />
      <el-table-column prop="comment" label="评论" width="500" />
      <el-table-column prop="commentTime" label="评论时间" />
      <el-table-column prop="name" label="分析结果">
        <template>
          <el-tag v-if="label == 1" type="success"></el-tag>
          <el-tag v-else="label <= -0.8" type="danger"></el-tag>
          <el-tag v-else="label <= -0.8" type="danger"></el-tag>
          <el-tag v-else="label <= -0.8" type="danger"></el-tag>
          <el-tag v-else="label <= -0.8" type="danger"></el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="label" label="情感得分" width="100" />
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :total="100"
      :hide-on-single-page="value"
    />
  </div>
</template>

<style scoped lang="less">
.emo-analysis {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  // margin: 10px;
  height: 100%;
  width: 100%;
  .el-pagination {
    margin-right: 40px;
    margin-bottom: 30px;
  }
}
</style>
