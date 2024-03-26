<script setup>
import echarts from "@/echarts";
import { onMounted } from "vue";
onMounted(() => {
  var chartDom1 = document.getElementById("main1");
  var myChart1 = echarts.init(chartDom1);
  var option1;

  option1 = {
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

  option1 && myChart1.setOption(option1);





  var chartDom = document.getElementById("main2");
  var myChart = echarts.init(chartDom);
  var option;

  const rawData = {
    male: [120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90],
    female: [220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290],
  };

  const totalMale = rawData.male.reduce((acc, cur) => acc + cur, 0);
  const totalFemale = rawData.female.reduce((acc, cur) => acc + cur, 0);

  const data = {
    male: rawData.male.map((value) => ((value / totalMale) * 100).toFixed(2)),
    female: rawData.female.map((value) => ((value / totalFemale) * 100).toFixed(2)),
  };

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
      data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value}%", // 在竖轴标签中加上百分比符号
      },
    },
    series: [
      {
        name: "男",
        type: "line",
        stack: "Total",
        data: data.male,
      },
      {
        name: "女",
        type: "line",
        stack: "Total",
        data: data.female,
      },
    ],
  };

  option && myChart.setOption(option);
});
</script>

<template>
  <div id="mq">

    <div id="main1"></div>
  <div id="main2"></div>
  </div>
</template>

<style scoped>
#mq{
    display: flex;
    height: 100%;
    width:100%;
    align-content: center;
}
#main1 {
    margin-top: 10%;
  width: 40%;
  height: 60%;
}
#main2 {
    margin-top: 10%;
  width: 60%;
  height: 60%;
}
</style>
