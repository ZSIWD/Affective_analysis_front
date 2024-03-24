<script setup>
import echarts from "@/echarts";
import { onMounted } from "vue";
import request from "@/api/request";
onMounted(() => {
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom, "dark");
  var option;

  option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow", // 'shadow' as default; can also be 'line' or 'shadow'
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: ["广东", "江苏", "山东", "浙江", "北京", "四川", "河南"],
    },
    series: [
      {
        name: "重度抑郁",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [137, 80, 86, 72, 67, 49, 56],
      },
      {
        name: "中度抑郁",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [187, 107, 100, 103, 91, 106, 68],
      },
      {
        name: "轻度抑郁",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [330, 193, 190, 168, 151, 133, 104],
      },
    ],
  };

  request.getDepressionProp().then((res) => {
    option.series = res.data;
  });
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
