<script setup></script>

<template>
  <div class="emo-analysis">
    <el-table :data="tableData" height="96%" style="width: 100%" border="true">
      <el-table-column prop="date" label="用户名" width="180" />
      <el-table-column prop="name" label="评论" />
      <el-table-column prop="name" label="评论时间" />
      <el-table-column prop="name" label="分析结果" />
      <el-table-column prop="name" label="情感得分" />
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
