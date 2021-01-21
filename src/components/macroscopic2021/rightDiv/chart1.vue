<template>
  <div class="chart1">
    <!-- <img src="@/components/common/image/rightDiv/chart1.png" /> -->
    <span class="chart-title">鹿城区隔离点人员住宿情况</span>
    <div id="pieChart"></div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      pieChart: undefined,
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      !this.pieChart &&
        (this.pieChart = echarts.init(document.getElementById("pieChart")));

      this.pieChart.setOption({
        color: ["#ffd800", "#00ff00", "#00a4ea", "#ff7400"],
        title: [
          {
            text: "隔离点：44",
            top: "40%",
            textAlign: "center",
            left: "39%",
            textStyle: {
              color: "#fff",
              fontSize: 14,
            },
          },
          {
            text: "可容纳人数：4478",
            top: "50%",
            textAlign: "center",
            left: "39%",
            textStyle: {
              color: "#fff",
              fontSize: 14,
            },
          },
        ],
        tooltip: {
          show: false,
        },
        legend: {
          show: true,
          orient: "vertical",
          right: "5%",
          top: "center",
          textStyle: {
            color: "#fff",
          },
          itemGap: 20,
        },
        series: [
          {
            name: "",
            type: "pie",
            center: ["40%", "50%"],
            radius: ["63%", "79%"],
            startAngle: 40,
            minAngle: 30,
            itemStyle: {
              normal: {
                borderColor: "#2c599e",
                borderWidth: 2,
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            },

            data: [
              {
                name: "启用隔离点 2",
                value: 2,
              },
              {
                name: "备用隔离点 42",
                value: 42,
              },
              {
                name: "爆满隔离点 0",
                value: 0,
              },
            ],
          },
        ],
      });
    },
  },
};
</script>

<style lang="less" scoped>
.chart1 {
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

  .chart-title {
    display: block;
    text-align: left;
    font-size: 18px;
    padding: 10px;
  }

  #pieChart {
    flex: 1;
  }
}
</style>