<template>
  <div id="bt"><el-button type="primary" @click="updateData" >{{btText}}</el-button></div>
  <div id="main1">
  </div>
  <div id="main2"></div>
</template>

<script setup>
import echarts from "@/echarts";
import { onMounted,ref } from "vue";
import request from "@/api/request";
import { ElMessage } from "element-plus";
import { useCounterStore } from '@/stores/counter';
const myChart1 = ref(null);
const myChart2 = ref(null);
const btText = ref("更新");
const pieData = ref([
  { value: 1048, name: '轻度抑郁' },
  { value: 735, name: '中度抑郁' },
  { value: 580, name: '重度抑郁' },
]);

const barData = ref([120, 200, 150]);

const option1 = ref({
  tooltip: {
    trigger: 'item',
    formatter: '{b}: {d}%'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: []
    }
  ]
});

const option2 = ref({
  xAxis: {
    type: 'category',
    data: ['轻度抑郁', '中度抑郁', '重度抑郁']
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}%'
    }
  },
  series: [
    {
      data: [],
      type: 'bar'
    }
  ]
});

onMounted(() => {
  const chartDom1 = document.getElementById('main1');
  const chartDom2 = document.getElementById('main2');
   myChart1.value = echarts.init(chartDom1);
   myChart2.value = echarts.init(chartDom2);

  request.getDePercentage(0).then((res) => {
    pieData.value[0].value = res.data.levelCount1;
    pieData.value[1].value = res.data.levelCount2;
    pieData.value[2].value = res.data.levelCount3;

    barData.value = [res.data.levelCount1, res.data.levelCount2, res.data.levelCount3];

    // 更新图表配置
    option1.value.series[0].data = pieData.value.map(item => ({
      ...item,
      value: item.value / pieData.value.reduce((acc, cur) => acc + cur.value, 0) * 100,
      itemStyle: {
        color: item.name === '重度抑郁' ? '#a90000' : item.name === '中度抑郁' ? '#d38919' : 'yellow'
      }
    }));

    option2.value.series[0].data = barData.value.map((value, index) => ({
      value: value / barData.value.reduce((acc, cur) => acc + cur, 0) * 100,
      itemStyle: {
        color: index === 0 ? 'yellow' : index === 1 ? '#d38919' : '#a90000'
      }
    }));

    // 应用更新后的配置
    myChart1.value.setOption(option1.value, true);
    myChart2.value.setOption(option2.value, true);

    console.log(res);
  });
});
const id = ref(0)
function updateData() {
  
  if(localStorage.getItem("isUpdate") === "true"){
    
    ElMessage.warning("数据已更新，请与30分钟后尝试")
    return;
  }
  localStorage.setItem("isUpdate","true")
  
  // localStorage.setItem("isFirst","true");
  btText.value = "已更新"
  id.value = id.value + 1;

  if (id.value === 3) {
    id.value = 0;
  }
  request.getDePercentage(id.value).then((res) => {
    pieData.value[0].value = res.data.levelCount1;
    pieData.value[1].value = res.data.levelCount2;
    pieData.value[2].value = res.data.levelCount3;

    barData.value = [res.data.levelCount1, res.data.levelCount2, res.data.levelCount3];

    // 更新图表配置
 // 更新图表配置
 option1.value.series[0].data = pieData.value.map(item => ({
      ...item,
      value: item.value / pieData.value.reduce((acc, cur) => acc + cur.value, 0) * 100,
      itemStyle: {
        color: item.name === '重度抑郁' ? '#a90000' : item.name === '中度抑郁' ? '#d38919' : 'yellow'
      }
    }));

    option2.value.series[0].data = barData.value.map((value, index) => ({
      value: value / barData.value.reduce((acc, cur) => acc + cur, 0) * 100,
      itemStyle: {
        color: index === 0 ? 'yellow' : index === 1 ? '#d38919' : '#a90000'
      }
    }));

    // 应用更新后的配置
    myChart1.value.setOption(option1.value, true);
    myChart2.value.setOption(option2.value, true);

    console.log(res);
  });
}

</script>

<style scoped>
#main1 {
  width: 48%;
  height: 80%;
}
#main2{
  width:48%;
  height:80%;
}
#bt{
  width: 4%;
  height: 98%;
  padding-left: 15px;
  /* padding-top: 15px;  */
}
</style>
