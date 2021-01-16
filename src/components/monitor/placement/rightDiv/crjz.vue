<template>
  <div id="crjzDiv">
    <div>
      <span class="title">做地累积按月统计图（2020年）</span>
      <select id="select" @change="bqSelect($event)">
        <option value="crdk">按宗数统计</option>
        <option value="crje">按货值统计</option>
        <option value="crmj">按面积统计</option>
      </select>
    </div>
    <div id="crjzChart2"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
export default {
  data() {
    return {
      index: "crdk"
    };
  },
  computed: {
    ...mapState({
      dkxxList: state => state.dkxxList
    })
  },
  methods: {
    fixdkxxList() {
      const timeHash = {
        "2020-01-01": { name: "1月", value: 0 },
        "2020-02-01": { name: "2月", value: 0 },
        "2020-03-01": { name: "3月", value: 0 },
        "2020-04-01": { name: "4月", value: 0 },
        "2020-05-01": { name: "5月", value: 0 },
        "2020-06-01": { name: "6月", value: 0 },
        "2020-07-01": { name: "7月", value: 0 },
        "2020-08-01": { name: "8月", value: 0 },
        "2020-09-01": { name: "9月", value: 0 },
        "2020-10-01": { name: "10月", value: 0 },
        "2020-11-01": { name: "11月", value: 0 },
        "2020-12-01": { name: "12月", value: 0 }
      };

      const crdkObj = JSON.parse(JSON.stringify(timeHash));
      const crjeObj = JSON.parse(JSON.stringify(timeHash));
      const crmjObj = JSON.parse(JSON.stringify(timeHash));

      const crdkData = [];
      const crjeData = [];
      const crmjData = [];

      this.dkxxList.map(({ CRQK, CJJ, QSJ, TDMJ, CRCJSJ }) => {
        if (CRQK != "做地中" && CRCJSJ != "/") {
          crdkObj[CRCJSJ.split(" ")[0]].value++;
          CJJ != "/" &&
            (crjeObj[CRCJSJ.split(" ")[0]].value =
              Number(crjeObj[CRCJSJ.split(" ")[0]].value) + Number(CJJ));
          TDMJ != "/" &&
            (crmjObj[CRCJSJ.split(" ")[0]].value =
              Number(crmjObj[CRCJSJ.split(" ")[0]].value) + Number(TDMJ));
        }
      });

      for (let k in crdkObj) {
        crdkData.push(crdkObj[k]);
      }

      Object.values(crjeObj).map(item => {
        item.value = (Number(item.value) / 10000).toFixed(2);
      });

      for (let k in crjeObj) {
        crjeData.push(crjeObj[k]);
      }

      Object.values(crmjObj).map(item => {
        item.value = Number(item.value).toFixed(2);
      });

      for (let k in crmjObj) {
        crmjData.push(crmjObj[k]);
      }

      this.dataList = crdkData;

      this.dataHash = {
        crdk: crdkData,
        crje: crjeData,
        crmj: crmjData
      };

      this.doChart();
    },
    doChart() {
      const chart = this.$echarts.init(document.getElementById("crjzChart2"));
      chart.setOption({
        tooltip: {
          trigger: "axis"
        },
        grid: {
          left: "3%",
          right: "3%",
          top: "20%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#fff",
            fontSize: 17,
            formatter: function(val) {
              return val.replace("月", "\n月");
            }
          },
          axisTick: false,
          axisLine: {
            lineStyle: {
              color: "#9fdbfd",
              width: 2
            }
          },
          data: this.dataList.map(item => item.name)
        },
        yAxis: {
          type: "value",
          name:
            this.index == "crdk" ? "宗" : this.index == "crje" ? "亿元" : "亩",
          minInterval: 1,
          max: this.index == "crdk" ? 5 : null,
          axisLine: {
            onZero: false,
            lineStyle: {
              width: 2,
              color: "#9fdbfd"
            }
          },
          axisTick: false,
          axisLabel: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: 17
            }
          },
          nameTextStyle: {
            color: "#fff",
            fontSize: 17
          },
          splitLine: {
            show: true,
            lineStyle: {
              type: "solid",
              color: "#17035a"
            }
          }
        },
        series: [
          {
            name:
              this.index == "crdk"
                ? "做地地块"
                : this.index == "crje"
                ? "地块货值"
                : "地块面积",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "rgba(254,77,105)",
                lineStyle: {
                  width: 2,
                  type: "solid",
                  color: "rgb(254,77,105)"
                },
                label: { show: true, color: "#fff", fontSize: 13 }
              }
            },
            symbolSize: 5,
            data: this.dataList.slice(0, 2)
          }
        ]
      });
    },
    bqSelect: function(event) {
      this.dataList = this.dataHash[event.target.value];
      this.index = event.target.value;
      this.$echarts.init(document.getElementById("crjzChart2")).clear();
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
#crjzDiv {
  width: 100%;
  height: 30%;
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
      right: 24px;
      padding: 4px 9px;
      background-color: #1b45a7;
      border: 1px solid #61ebff;
      color: #fff;
    }
  }

  #crjzChart2 {
    width: 100%;
    height: 85%;
  }
}
</style>