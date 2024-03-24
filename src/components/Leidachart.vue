<script setup>
import echarts from "@/echarts";
import { onMounted } from "vue";
onMounted(() => {
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom, "dark");
  var option;

  option = {
    title: {
      text: "Basic Radar Chart",
    },
    legend: {
      data: ["Allocated Budget", "Actual Spending"],
    },
    radar: {
      // shape: 'circle',
      indicator: [
        { name: "Sales", max: 6500 },
        { name: "Administration", max: 16000 },
        { name: "Information Technology", max: 30000 },
        { name: "Customer Support", max: 38000 },
        { name: "Development", max: 52000 },
        { name: "Marketing", max: 25000 },
      ],
    },
    series: [
      {
        name: "Budget vs spending",
        type: "radar",
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000, 18000],
            name: "Allocated Budget",
          },
          {
            value: [5000, 14000, 28000, 26000, 42000, 21000],
            name: "Actual Spending",
          },
        ],
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
