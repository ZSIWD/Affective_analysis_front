<template>
  <div style="height: 100%; width: 100%;">
    <div style="height: 10%; width: 100%; display: flex; align-items: center; padding-left: 7px; background-color: rgb(233, 235, 236);">
      <span>您要查看前多少名城市？</span>
      <el-select v-model="selectedValue" placeholder="Select" style="width: 240px" @change="updateChart">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div id="main"></div>
  </div>
</template>

<script setup>
import echarts from "@/echarts";
import { onMounted, ref } from "vue";
import request from "@/api/request";

const selectedValue = ref('10'); // default selected value
const options = [
  { value: '5', label: '5' },
  { value: '8', label: '8' },
  { value: '10', label: '10' },
  { value: '14', label: '14' },
  { value: '20', label: '20' }
];

onMounted(() => {
  fetchData(selectedValue.value);
});

function fetchData(value) {
  const data = {
    page: 1,
    size: value // Pass the selected value to the API
  };

  request.getDepressionProp(data).then((res) => {
    const chartDom = document.getElementById("main");
    const myChart = echarts.init(chartDom);
    const option = {
      title: {
        text: '城市抑郁排行'
      },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" }
      },
      legend: {},
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: {
        type: "value",
        axisLabel: { formatter: "{value}%" }
      },
      yAxis: {
        type: "category",
        data: res.data.city.reverse()
      },
      color: ["red", "#d38919", "yellow"],
      series: [
        {
          name: "重度抑郁",
          type: "bar",
          stack: "total",
          label: { show: true, formatter: "{c}%" },
          emphasis: { focus: "series" },
          data: res.data.hardData.reverse()
        },
        {
          name: "中度抑郁",
          type: "bar",
          stack: "total",
          label: { show: true, formatter: "{c}%" },
          emphasis: { focus: "series" },
          data: res.data.midData.reverse()
        },
        {
          name: "轻度抑郁",
          type: "bar",
          stack: "total",
          label: { show: true, formatter: "{c}%" },
          emphasis: { focus: "series" },
          data: res.data.lightData.reverse()
        }
      ]
    };

    myChart.setOption(option);
  });
}

function updateChart() {
  fetchData(selectedValue.value);
}
</script>

<style scoped>
#main {
  width: 100%;
  height: 85%;
}
</style>
