<template>
  <div id="tdytDiv">
    <div>
      <span class="title">2020年计划出让土地用地性质统计图</span>
      <select id="select" @change="bqSelect($event)">
        <option value="tdyt">按宗数统计</option>
        <option value="tdmj">按面积统计</option>
      </select>
    </div>
    <div id="tdytChart"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
export default {
  data() {
    return {
      index: "tdyt"
    };
  },
  computed: {
    ...mapState({
      dkxxList: state => state.dkxxList
    })
  },
  methods: {
    fixdkxxList() {
      const ytHash = {
        住宅用地: {
          value: 0,
          name: "住宅",
          itemStyle: { color: "rgb(255, 255, 0)" },
          textStyle: { color: "rgb(255, 255, 0)" }
        },
        商服用地: {
          value: 0,
          name: "商服",
          itemStyle: { color: "rgb(255, 0, 0)" },
          textStyle: { color: "rgb(255, 0, 0)" }
        },
        商住用地: {
          value: 0,
          name: "商住",
          itemStyle: { color: "rgb(255, 127, 0)" },
          textStyle: { color: "rgb(255, 127, 0)" }
        },
        医疗卫生用地: {
          value: 0,
          name: "医疗",
          itemStyle: { color: "rgb(255, 191, 0)" },
          textStyle: { color: "rgb(255, 191, 0)" }
        },
        教育用地: {
          value: 0,
          name: "教育",
          itemStyle: { color: "rgb(255, 159, 127)" },
          textStyle: { color: "rgb(255, 159, 127)" }
        }
      };

      const tdytObj = JSON.parse(JSON.stringify(ytHash));
      const tdmjObj = JSON.parse(JSON.stringify(ytHash));

      const tdytData = [];
      const tdmjData = [];

      this.dkxxList.map(({ TDYT, TDMJ }) => {
        TDYT != null && tdytObj[TDYT] && tdytObj[TDYT].value++;
        TDMJ != null &&
          tdmjObj[TDYT] &&
          (tdmjObj[TDYT].value = Number(tdmjObj[TDYT].value) + Number(TDMJ));
      });

      for (let k in tdytObj) {
        tdytData.push(tdytObj[k]);
      }

      Object.values(tdmjObj).map(item => {
        item.value = Number(item.value).toFixed(2);
      });

      for (let k in tdmjObj) {
        tdmjData.push(tdmjObj[k]);
      }

      this.dataList = tdytData;

      this.dataHash = {
        tdyt: tdytData,
        tdmj: tdmjData
      };

      this.doChart();
    },
    doChart() {
      const that = this;
      const chart = this.$echarts.init(document.getElementById("tdytChart"));
      chart.setOption({
        grid: {
          top: "14%"
        },
        legend: {
          orient: "vertical",
          right: "2%",
          align: "left",
          top: "middle",
          itemHeight: 15,
          textStyle: {
            fontSize: 15,
            padding: [0, 0, 0, 5]
          },
          data: this.dataList
        },
        series: [
          {
            type: "pie",
            minAngle: 2,
            radius: ["30%", "60%"],
            center: ["40%", "57%"],
            clockwise: false,
            label: {
              normal: {
                show: true,
                position: "outter",
                formatter: function(params) {
                  if (that.index == "tdyt") {
                    return `${params.data.name}${params.data.value}宗\n(占比${params.percent}%)`;
                  } else {
                    return `${params.data.name}${params.data.value}亩\n(占比${params.percent}%)`;
                  }
                },
                textStyle: {
                  fontSize: 18
                }
              }
            },
            labelLine: {
              normal: {
                length: 5,
                length2: 5
              }
            },
            data: this.dataList
          }
        ]
      });
    },
    bqSelect: function(event) {
      this.dataList = this.dataHash[event.target.value];
      this.index = event.target.value;
      this.$echarts.init(document.getElementById("tdytChart")).clear();
      this.doChart();
    }
  },
  created() {},
  mounted() {
    this.fixdkxxList();
  },
  watch: {
    dkxxList(n) {
      this.fixdkxxList();
    }
  }
};
</script>

<style lang="less" scoped>
#tdytDiv {
  width: 100%;
  height: 32%;
  background-color: rgba(5, 26, 79, 0.5);
  border: 1px solid #035acd;

  > div {
    text-align: left;
    height: 15%;
    .title {
      font-size: 20px;
      color: rgba(97, 235, 255, 1);
      position: relative;
      top: 12px;
      left: 20px;
      font-weight: 500;
      border-left: 5px solid;
      padding-left: 5px;
    }

    select {
      position: relative;
      float: right;
      top: 12px;
      right: 12px;
      padding: 4px 2px;
      background-color: #1b45a7;
      border: 1px solid #61ebff;
      color: #fff;
    }
  }

  #tdytChart {
    width: 100%;
    height: 85%;
  }
}
</style>