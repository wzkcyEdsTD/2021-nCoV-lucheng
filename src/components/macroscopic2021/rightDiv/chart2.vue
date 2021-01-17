<template>
  <div class="chart2">
    <!-- <img src="@/components/common/image/rightDiv/chart2.png" /> -->
    <span class="chart-title">鹿城区核酸检测点</span>
    <div id="barChart2"></div>
    <select class="street-select">
      <option value="qzbl">仰义街道</option>
      <option value="zzbl">双屿街道</option>
      <option value="gld">大南街道</option>
    </select>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      barChart2: undefined,
    };
  },
  mounted() {
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
        legend: {
          show: false,
        },
        xAxis: [
          {
            type: "category",
            data: [
              "渔渡",
              "后京",
              "前京",
              "河岙",
              "十里",
              "龙川",
              "潜沙桥",
              "陈村",
              "林里",
              "钟山",
              "垟山",
              "馒头驻",
              "仰新",
            ],
            axisLabel: {
              textStyle: {
                fontFamily: "微软雅黑",
                fontSize: 10,
              },
              rotate: -25,
            },
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: "#fff",
              },
            },
            splitLine: { show: false },
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
            data: [3, 2, 4, 1, 2, 1, 7, 2, 2, 1, 1, 2, 2],
            barWidth: 10,
            itemStyle: {
              normal: {
                show: true,
                color: "#00bbff",
                // barBorderRadius: 50,
                borderWidth: 0,
              },
            },
          },
        ],
      });
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

  > img {
    width: 100%;
    height: 100%;
  }

  .street-select {
    position: absolute;
    top: 5%;
    right: 5%;
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