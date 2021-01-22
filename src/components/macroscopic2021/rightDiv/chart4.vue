<template>
  <div class="chart4">
    <!-- <img src="@/components/common/image/rightDiv/chart2.png" /> -->
    <span class="chart-title">鹿城区重点人员管控</span>
    <div class="chartTitle" style="">现有管控人员总数为：580人(境内257人，境外323人)</div>
    <div class="chartTitle">2021年1月16日</div>
    <div style="height:18vh;" id="barChart4"></div>

    <select id="selectChart4" class="street-select">
      <!-- <option value="xjks">新疆喀什</option>
      <option value="sh">上海</option>
      <option value="tj">天津</option>
      <option value="ah">安徽</option>
      <option value="mzl">满洲里</option>
      <option value="cd">成都</option>
      <option value="mdj">牡丹江</option> -->
      <option value="sjz">石家庄</option>
      <option value="xt">邢台</option>
      <option value="sh">绥化</option>
      <option value="qqhe">齐齐哈尔</option>
      <option value="lf">廊坊</option>
      <option value="dl" >大连</option>
      <option value="sy" >沈阳</option>
      <option value="bj" >北京</option>
      <option value="jw">境外</option>
    </select>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      barChart4: undefined,
    };
  },
  mounted() {
    const that = this;
    that.$nextTick(()=>{
      that.initChart();
    })

  },
  methods: {
    initChart() {
      const that = this;
      !this.barChart4 &&
        (this.barChart4 = echarts.init(document.getElementById("barChart4")));
      
      const data = {
          "北京":{
            y:[1,0,1,0,0]
          },
          "沈阳":{
            y:[26,0,10,12,4],
          },
          "大连":{
            y:[3,0,3,0,0]
          },
          "石家庄":{
            y:[173,26,87,49,45]
          },
          "邢台":{
            y:[10,0,10,0,0]
          },
          "绥化":{
            y:[9,0,2,3,4]
          },
          "齐齐哈尔":{
            y:[0,0,0,0,0]
          },
          "廊坊":{
            y:[35,2,8,16,13]
          },
          "境外":{
            y:[323,20,13,27,2]
          },
      }


      let xList = ["总人数","新增人数","居家隔离","集中隔离","日常健康观察"]
      let yList = [173,26,87,49,45]
      $("#selectChart4").change(function(){
        const str = $("#selectChart4 option:selected").text();
        const list = data[str];
        yList = list.y;
        that.barChart4.setOption({
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
                fontSize: 12,
              },
              rotate: 0,
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
            barWidth: 30,
            itemStyle: {
              normal: {
                show: true,
                color: function(params) {
                	//注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    var colorList = ['#F35353','#36FFFF', '#FBF201', '#33FE3B'];
                    return colorList[params.dataIndex]
                },
                borderWidth: 0,
                label: {
                    show: true,		//开启显示
                    position: 'top',	//在上方显示
                    textStyle: {	    //数值样式
                        color: '#fff',
                        fontSize: 12
                    }
                }
              },
            },
          },
        ],
      });

      })



        that.barChart4.setOption({
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
                fontSize: 12,
              },
              rotate: 0,
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
            barWidth: 30,
            itemStyle: {
              normal: {
                show: true,
                color: function(params) {
                	//注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                    var colorList = ['#F35353','#36FFFF', '#FBF201', '#33FE3B'];
                    return colorList[params.dataIndex]
                },
                borderWidth: 0,
                label: {
                    show: true,		//开启显示
                    position: 'top',	//在上方显示
                    textStyle: {	    //数值样式
                        color: '#fff',
                        fontSize: 12
                    }
                }
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
.chart4 {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 31%;
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
    background-color: #2c599e;
    color: #fff;
    border-color: #fff;
    border-radius: 5px;
    height: 2.6vh;
    width: 8.5vh;
    font-size: 14px;
  }

  .chartTitle{
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

  #barChart2 {
    flex: 1;
  }
}
</style>