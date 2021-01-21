<template>
  <div class="chart2">
    <!-- <img src="@/components/common/image/rightDiv/chart2.png" /> -->
    <span class="chart-title">社区核酸采样点分布</span>
    <div id="barChart2"></div>
    <select id="selectChart2" class="street-select">
      <option value="qzbl">仰义街道</option>
      <option value="zzbl">七都街道</option>
      <option value="gld">南郊街道</option>
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
      const that = this;

      const data = {
          "仰义街道":{
            x:["渔渡","后京","前京","河岙","十里","龙川","潜沙桥","陈村","林里","钟山","垟山","馒头驻","仰新"],
            y:[3,2,4,1,2,1,7,2,2,1,1,2,2],
          },
          "七都街道":{
              x:["上沙村","樟里村","板桥村","老涂村","吟州村","前沙村","江都社区"],
              y:[1,1,1,1,1,1,1],
          },
          "南郊街道":{
              x:["吴桥","西屿","滨河","东龙","丽庆","十里亭","三板桥"],
              y:[10,11,6,9,8,13,6],
          },
      }
      let list = {
              "渔渡":3,
              "后京":2,
              "前京":4,
              "河岙":1,
              "十里":2,
              "龙川":1,
              "潜沙桥":7,
              "陈村":2,
              "林里":2,
              "钟山":1,
              "垟山":1,
              "馒头驻":2,
              "仰新":2,
      }
      let xList = ["渔渡","后京","前京","河岙","十里","龙川","潜沙桥","陈村","林里","钟山","垟山","馒头驻","仰新"]
      let yList = [3,2,4,1,2,1,7,2,2,1,1,2,2]
      $("#selectChart2").change(function(){
        const str = $("#selectChart2 option:selected").text();
        list = data[str];
        xList = list.x;
        yList = list.y;

        
        that.barChart2.setOption({
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

            data: xList,
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
            data: yList,
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
    
      })





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

            data: xList,
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
            data: yList,
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