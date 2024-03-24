<script setup>
import echarts from "@/echarts";
import { onMounted } from "vue";
onMounted(() => {
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom, "dark");
  var option;

  option = {
    title: {
      text: "男女月份抑郁分析图",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["男", "女"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "男",
        type: "line",
        stack: "Total",
        data: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90],
      },
      {
        name: "女",
        type: "line",
        stack: "Total",
        data: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290],
      },
    ],
  };

  option && myChart.setOption(option);
});
</script>

<template>
  <div id="main"></div>
</template>

<style scoped>
#main {
  width: 100%;
  height: 100%;
}
</style>
