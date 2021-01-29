<template>
  <div class="chart2">
    <!-- <img src="@/components/common/image/rightDiv/chart2.png" /> -->
    <span class="chart-title">社区核酸采样点分布</span>
    <div id="barChart2"></div>
    <select class="street-select" @change="changeSelect($event)">
      <option value="仰义街道">仰义街道</option>
      <option value="七都街道">七都街道</option>
      <option value="南郊街道">南郊街道</option>
      <option value="广化街道">广化街道</option>
      <option value="蒲鞋市街道">蒲鞋市街道</option>
      <option value="大南街道">大南街道</option>
      <option value="南汇街道">南汇街道</option>
      <option value="双屿街道">双屿街道</option>
      <option value="松台街道">松台街道</option>
      <option value="丰门街道">丰门街道</option>
      <option value="五马街道">五马街道</option>
      <option value="滨江街道">滨江街道</option>
      <option value="藤桥镇">藤桥镇</option>
      <option value="山福镇">山福镇</option>
    </select>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return { currentData: {}, dataHash: {}, barChart2: undefined };
  },

  created() {
    this.dataHash = {
      仰义街道: {
        x: [
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
        y: [3, 2, 4, 1, 2, 1, 7, 2, 2, 1, 1, 2, 2],
      },
      七都街道: {
        x: [
          "上沙村",
          "樟里村",
          "板桥村",
          "老涂村",
          "吟州村",
          "前沙村",
          "江都社区",
        ],
        y: [1, 1, 1, 1, 1, 1, 1],
      },
      南郊街道: {
        x: ["吴桥", "西屿", "滨河", "东龙", "丽庆", "十里亭", "三板桥"],
        y: [10, 11, 6, 9, 8, 13, 6],
      },
      广化街道: {
        x: ["月湖", "教场", "双榕", "翠微", "特陶", "集善", "双桥", "集新"],
        y: [6, 8, 6, 6, 5, 6, 6, 7],
      },
      蒲鞋市街道: {
        x: [
          "芳园",
          "绿园",
          "青园",
          "锦园",
          "蒋家桥",
          "横河",
          "蒲鞋市",
          "金丝桥",
        ],
        y: [14, 12, 8, 7, 12, 18, 13, 12],
      },
      大南街道: {
        x: ["虞师里", "双莲桥", "花柳塘", "白鹿洲", "马鞍池", "山前街", "荷花"],
        y: [6, 6, 13, 7, 12, 12, 3],
      },
      南汇街道: {
        x: [
          "万源",
          "大自然",
          "桥儿头",
          "春秋",
          "金鳞",
          "开源",
          "南塘",
          "绣山",
          "清风",
          "吕浦",
          "龙源",
        ],
        y: [10, 8, 7, 6, 4, 8, 6, 4, 12, 9, 12],
      },
      双屿街道: {
        x: ["营楼桥", "垟田", "牛岭", "康龙", "瓯浦垟", "双岙", "黄龙"],
        y: [10, 5, 15, 16, 6, 10, 12],
      },
      松台街道: {
        x: [
          "半腰桥",
          "茶花",
          "昌明",
          "昌盛",
          "桂柑",
          "郭公山",
          "蛟翔巷",
          "锦花",
          "来福门",
          "菱藕",
          "庆年坊",
          "水心",
        ],
        y: [5, 10, 10, 7, 8, 11, 8, 10, 9, 7, 9, 12],
      },
      丰门街道: {
        x: [
          "前陈村",
          "屿头村",
          "岩门村",
          "新屿",
          "嵇师村",
          "正岙村",
          "上伊村",
          "潘岙村",
        ],
        y: [6, 5, 5, 2, 16, 5, 7, 8],
      },
      五马街道: {
        x: [
          "安澜",
          "墨池",
          "谢池",
          "朔门",
          "十八家",
          "八仙楼",
          "黎明西路",
          "城西街",
          "矮凳桥",
          "百里坊",
          "府前",
          "乘凉",
          "鼓楼",
          "路湾",
        ],
        y: [5, 6, 5, 4, 6, 6, 5, 4, 6, 3, 5, 7, 5, 3],
      },
      滨江街道: {
        x: [
          "灰桥",
          "洪殿",
          "陡门",
          "浦东",
          "杨府山",
          "宏源",
          "丰汇",
          "新田园",
          "蒲源",
        ],
        y: [13, 13, 13, 9, 11, 18, 12, 11, 11],
      },
      藤桥镇: { x: ["藤桥镇"], y: [84] },
      山福镇: { x: ["山福镇"], y: [18] },
    };
    this.currentData = this.dataHash["仰义街道"];
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
      this.currentData = this.dataHash[evt.target.value];
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