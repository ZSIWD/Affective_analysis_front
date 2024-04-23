<template>
    <div id="hot-search">
        
    <el-table :data="tableData" border style="width: 100%" height="98%">
        <el-table-column type="index" width="53" label="排名"/>
        <el-table-column prop="hotNewsTitle" label="热搜标题" width="350" />
        <el-table-column prop="npercentage" label="负面占比" width="180" />
        <el-table-column prop="ppercentage" label="正面占比" />
        <el-table-column  label="详情" width="180" >
        <template #default="scope">
        <el-button type="primary" size="small" @click="handleDetail(scope.row)"
          >查看</el-button
        >
      </template>
    </el-table-column>
    <el-table-column prop="address" label="操作" >
        <template #default="scope">
        <el-button type="warning" size="small" @click="handleRepeal(scope.row)"
          >撤销</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
      background
      default-page-size="100"
      layout="prev, pager, next"
      page-count="100"
      :total="1000"
      @current-change="handleCurrentChange"
    />

    <el-dialog v-model="dialogTableVisible" title="热搜详情" width="1000" >
    <el-table :data="gridData" height="80%" stripe>
      <el-table-column property="userName" label="用户名" width="120" />
      <el-table-column property="hotSearchComment" label="评论" width="700" />
      <el-table-column property="hotSearchTime" label="评论时间" width="100"/>
      <el-table-column property="hotNewsLabel" label="得分" />
    </el-table>
    <template #footer>
      <div class="dialog-footer">
        <el-pagination
      background
      default-page-size="100"
      layout="prev, pager, next"
      page-count="20"
      :total="1000"
      @current-change="handleCurrentChanged"
    />
      </div>
    </template>
  </el-dialog>
    </div>
    
</template>

<script setup>
import { ref ,onMounted} from 'vue'
import request from '@/api/request';
import { ElMessage } from "element-plus";
const data = {
  page:1,
  size:50
}
const tableData = ref([])
onMounted(()=>{
  request.getHotSearch(data).then((res)=>{
    console.log(res.data);
    res.data.forEach((item) => {
      item.npercentage = item.npercentage + "%";
      item.ppercentage = item.ppercentage + "%";
    });
    tableData.value = res.data;
  })
})

/**
 * 查看详情操作
 */

 const handleDetail = (row)=>{
  hotNewsLine.value = row.hotNewsLine;
  dialogTableVisible.value = true;
  console.log(row.hotNewsLine);
  const data = {
    page:1,
    size:25
}
  request.getHotSearchDetails(row.hotNewsLine,data).then((res)=>{
    gridData.value = res.data;
  })
}
/**控制弹出框 */ 
const dialogTableVisible = ref(false)
const gridData = ref([])
const hotNewsLine = ref('')

function handleCurrentChanged(toPage){
  let data = {
    page:toPage,
    size:25
  }
  request.getHotSearchDetails(hotNewsLine.value,data).then((res)=>{
    gridData.value = res.data;
  })
}


/**
 * 撤销操作
 */
const handleRepeal = (row)=>{
  console.log(row.hotNewsLine);
  request.repealHotSearch(row.hotNewsLine).then((res)=>{
    console.log(res);
    if (res.code==200){
      ElMessage({
        message: "撤销成功",
        type: "success",
        duration: 1000,
      });
      request.getHotSearch(data).then((res)=>{
        console.log(res.data);
        res.data.forEach((item) => {
          item.npercentage = item.npercentage + "%";
          item.ppercentage = item.ppercentage + "%";
        });
        tableData.value = res.data;
      })
    }
  })
}
</script>


<style lang = "less" scoped>
#hot-search{
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
    // margin-top: 40px;
    height: 100%;
    width: 100%;
}
.el-table{
  margin-top: 20px;
}
.el-pagination{
    margin-bottom: 20px;
}
.dialog-footer{
  margin-left: 60%;
}
</style>