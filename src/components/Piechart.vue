<script setup>
import echarts from "@/echarts";
import { onMounted } from "vue";
onMounted(() => {
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom, "dark");
  var option;

  option = {
    title: {
      text: "男女抑郁比例饼状图",
      left: "center",
    },
    tooltip: {
      trigger: "item",
    },
    legend: {
      orient: "vertical",
      left: "left",
    },
    series: [
      {
        name: "抑郁占比",
        type: "pie",
        radius: "50%",
        data: [
          { value: 0.41, name: "男" },
          { value: 0.59, name: "女" },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
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
