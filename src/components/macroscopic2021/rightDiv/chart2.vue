<template>
  <div class="chart2">
    <span class="chart-title">社区核酸采样点分布</span>
    <div id="barChart2"></div>
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
      currentData: {},
      dataHash: {},
      selectOptions: [],
      barChart2: undefined,
    };
  },

  mounted() {
    this.dataHash = window.ncov_chart_2021.communitySamplingPoint;
    this.selectOptions = Object.keys(this.dataHash);

    const data = this.dataHash[this.selectOptions[0]];
    let x = [],
      y = [];
    for (let k in data) {
      x.push(k);
      y.push(data[k]);
    }
    this.currentData = { x, y };

    this.initChart();
  },

  methods: {
    initChart() {
      !this.barChart2 &&
        (this.barChart2 = echarts.init(document.getElementById("barChart2")));
      this.barChart2.setOption({
        grid: {
          left: "2%",
          right: "3%",
          bottom: "0%",
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
                fontSize: 10,
              },
              rotate: -25,
            },
            axisTick: { show: false },
            axisLine: { lineStyle: { color: "#fff" } },
            splitLine: { show: false },
            data: this.currentData.x,
          },
        ],
        yAxis: [
          {
            splitNumber: 5,
            axisLabel: {
              textStyle: {
                fontFamily: "微软雅黑",
                fontSize: 10,
              },
            },
            axisLine: { lineStyle: { color: "#fff" } },
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
            barWidth: 10,
            itemStyle: {
              normal: {
                color: "#00bbff",
                borderWidth: 0,
                label: {
                  show: true,
                  position: "top",
                  textStyle: {
                    color: "#fff",
                    fontSize: 12,
                  },
                },
              },
            },
            data: this.currentData.y,
          },
        ],
      });
    },

    changeSelect(evt) {
      const data = this.dataHash[evt.target.value];
      let x = [],
        y = [];
      for (let k in data) {
        x.push(k);
        y.push(data[k]);
      }
      this.currentData = { x, y };

      this.initChart();
    },
  },
};
</script>

<style lang="less" scoped>
.chart2 {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 29%;
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

  .chart-title {
    display: block;
    text-align: left;
    font-size: 18px;
    padding: 10px;
  }

  #barChart2 {
    flex: 1;
  }
}
</style>