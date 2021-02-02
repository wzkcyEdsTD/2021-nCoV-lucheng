<template>
  <div class="chart4">
    <span class="chart-title">鹿城区重点人员管控</span>
    <div class="chartTitle">
      现有管控人员总数为：{{ dataObj.total }}人(境内{{
        dataObj.domestic
      }}人，境外{{ dataObj.overseas }}人)
    </div>
    <div class="chartTitle">{{ dataObj.date }}</div>
    <div id="barChart4"></div>

    <select class="street-select" @change="changeSelect($event)">
      <option v-for="(item, index) in selectOptions" :key="index" :value="item">
        {{ item }}
      </option>
    </select>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      barChart4: undefined,
      dataObj: {},
      currentData: {},
      dataHash: {},
      selectOptions: [],
    };
  },
  mounted() {
    this.dataObj = window.ncov_chart_2021.peopleControl;
    this.dataHash = this.dataObj.list;
    this.selectOptions = Object.keys(this.dataHash);
    this.currentData = this.dataHash[this.selectOptions[0]];

    this.initChart();
  },
  methods: {
    initChart() {
      !this.barChart4 &&
        (this.barChart4 = echarts.init(document.getElementById("barChart4")));

      this.barChart4.setOption({
        grid: {
          left: "2%",
          right: "3%",
          bottom: "14%",
          top: "10%",
          containLabel: true,
        },
        legend: { show: false },
        xAxis: [
          {
            type: "category",
            axisLabel: {
              textStyle: {
                fontFamily: "微软雅黑",
                fontSize: 12,
              },
              interval: 0,
            },
            axisTick: { show: false },
            axisLine: { lineStyle: { color: "#fff" } },
            splitLine: { show: false },
            data: [
              "现有管控人数",
              "新增管控",
              "居家隔离",
              "集中隔离",
              "日常健康观察",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                fontFamily: "微软雅黑",
                fontSize: 10,
              },
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
              },
            },
            axisTick: { show: false },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "#fff",
                opacity: 0.5,
              },
            },
          },
        ],
        series: [
          {
            name: "可用度",
            type: "bar",
            barWidth: 30,
            itemStyle: {
              normal: {
                show: true,
                color: (params) => {
                  var colorList = ["#F35353", "#36FFFF", "#FBF201", "#33FE3B"];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: true,
                  position: "top",
                  textStyle: { color: "#fff", fontSize: 12 },
                },
              },
            },
            data: this.currentData,
          },
        ],
      });
    },

    changeSelect(evt) {
      this.currentData = this.dataHash[evt.target.value];
      this.initChart();
    },
  },
};
</script>

<style lang="less" scoped>
.chart4 {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 31%;
  background-color: #2c599e;
  margin-bottom: 15px;

  .street-select {
    position: absolute;
    top: 5%;
    right: 5%;
    background-color: #2c599e;
    color: #fff;
    border-color: #fff;
    border-radius: 5px;
    height: 2.6vh;
    width: 8.5vh;
    font-size: 14px;
  }

  .chartTitle {
    display: block;
    font-size: 14px;
    position: relative;
    text-align: left;
    padding-left: 1vh;
    top: -0.5vh;
  }

  .chart-title {
    display: block;
    text-align: left;
    font-size: 18px;
    padding: 10px;
  }

  #barChart4 {
    flex: 1;
    height: 0;
  }
}
</style>