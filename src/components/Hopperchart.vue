<script setup>
import echarts from "@/echarts";
import { onMounted } from "vue";
import request from "@/api/request";
onMounted(() => {
  var chartDom = document.getElementById("main");
  var myChart = echarts.init(chartDom);
  var option;

  option = {
    title: {
      text: "星期抑郁分析",
    },
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c}%",
    },
    toolbox: {
      feature: {
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {},
      },
    },
    legend: {
      data: [
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
        "星期日",
      ],
    },
    series: [
      {
        name: "占比",
        type: "funnel",
        left: "10%",
        top: 60,
        bottom: 60,
        width: "80%",
        min: 0,
        max: 100,
        minSize: "0%",
        maxSize: "100%",
        sort: "descending",
        gap: 2,
        label: {
          show: true,
          position: "inside",
        },
        labelLine: {
          length: 10,
          lineStyle: {
            width: 1,
            type: "solid",
          },
        },
        itemStyle: {
          borderColor: "#fff",
          borderWidth: 1,
        },
        emphasis: {
          label: {
            fontSize: 20,
          },
        },
        data: [
          { value: 60, name: "周一" },
          { value: 40, name: "周一" },
          { value: 20, name: "周一" },
          { value: 80, name: "周一" },
          { value: 100, name: "周一" },
          { value: 30, name: "周一" },
          { value: 88, name: "周一" },
        ],
      },
    ],
  };

  request.getXinQi().then((res) => {
    console.log(res.data);
    // 计算所有 value 的总和
    let total = res.data.reduce((acc, curr) => acc + curr.value, 0);
    console.log(total);

    // 将每个 value 转换为对应的百分比
    res.data.forEach((item) => {
      item.value = ((item.value / total) * 100).toFixed(2);
    });
    option.series[0].data = res.data;
    console.log(option.series[0].data);
    option && myChart.setOption(option);
  });
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
