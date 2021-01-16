<template>
  <div id="crtjDiv">
    <div>
      <span class="title">安置房源按街道统计图</span>
      <select id="select" @change="bqSelect($event)">
        <option value="xqzs">小区总数</option>
        <option value="zzts">住宅套数</option>
        <option value="kzzzts">空置住宅套数</option>
        <option value="syjs">商业间数</option>
        <option value="kzsyjs">空置商业间数</option>
        <option value="kzbgjs">空置办公间数</option>
      </select>
    </div>
    <div id="crtjChart2"></div>
  </div>
</template>

<script>
/* eslint-disable */
// import { mapState } from "vuex";
import { tmpData2 } from "../config/chartData";
export default {
  data() {
    return {
      index: "xqzs"
    };
  },
  computed: {
    // ...mapState({
    //   dkxxList: state => state.dkxxList
    // })
  },
  methods: {
    fixdkxxList() {
      const countryHash = {
        滨江街道: { value: 0, name: "滨江街道" },
        山福镇: { value: 0, name: "山福镇" },
        藤桥镇: { value: 0, name: "藤桥镇" },
        仰义街道: { value: 0, name: "仰义街道" },
        南郊街道: { value: 0, name: "南郊街道" },
        丰门街道: { value: 0, name: "丰门街道" },
        南汇街道: { value: 0, name: "南汇街道" },
        双屿街道: { value: 0, name: "双屿街道" },
        五马街道: { value: 0, name: "五马街道" },
        松台街道: { value: 0, name: "松台街道" },
        七都街道: { value: 0, name: "七都街道" },
        蒲鞋市街道: { value: 0, name: "蒲鞋市街道" },
        广化街道: { value: 0, name: "广化街道" },
        大南街道: { value: 0, name: "大南街道" }
      };

      const xqzsObj = JSON.parse(JSON.stringify(countryHash));
      const zztsObj = JSON.parse(JSON.stringify(countryHash));
      const kzzztsObj = JSON.parse(JSON.stringify(countryHash));
      const syjssObj = JSON.parse(JSON.stringify(countryHash));
      const kzsyjsObj = JSON.parse(JSON.stringify(countryHash));
      const kzbgjsObj = JSON.parse(JSON.stringify(countryHash));

      const xqzsData = [];
      const zztsData = [];
      const kzzztsData = [];
      const syjsData = [];
      const kzsyjsData = [];
      const kzbgjsData = [];

      tmpData2.map(({ SSJD, XQZS, ZZTS, KZZZTS, SYJS, KZSYJS, KZBGJS }) => {
        XQZS != null &&
          (xqzsObj[SSJD].value = Number(xqzsObj[SSJD].value) + Number(XQZS));
        ZZTS != null &&
          (zztsObj[SSJD].value = Number(zztsObj[SSJD].value) + Number(ZZTS));
        KZZZTS != null &&
          (kzzztsObj[SSJD].value =
            Number(kzzztsObj[SSJD].value) + Number(KZZZTS));
        SYJS != null &&
          (syjssObj[SSJD].value = Number(syjssObj[SSJD].value) + Number(SYJS));
        KZSYJS != null &&
          (kzsyjsObj[SSJD].value =
            Number(kzsyjsObj[SSJD].value) + Number(KZSYJS));
        KZBGJS != null &&
          (kzbgjsObj[SSJD].value =
            Number(kzbgjsObj[SSJD].value) + Number(KZBGJS));
      });

      for (let k in xqzsObj) {
        xqzsData.push(xqzsObj[k]);
      }

      for (let k in zztsObj) {
        zztsData.push(zztsObj[k]);
      }

      for (let k in kzzztsObj) {
        kzzztsData.push(kzzztsObj[k]);
      }

      for (let k in syjssObj) {
        syjsData.push(syjssObj[k]);
      }

      for (let k in kzsyjsObj) {
        kzsyjsData.push(kzsyjsObj[k]);
      }

      for (let k in kzbgjsObj) {
        kzbgjsData.push(kzbgjsObj[k]);
      }

      // Object.values(crjeObj).map(item => {
      //   item.value = (Number(item.value) / 10000).toFixed(2);
      // });

      // for (let k in crjeObj) {
      //   crjeData.push(crjeObj[k]);
      // }

      // Object.values(crmjObj).map(item => {
      //   item.value = Number(item.value).toFixed(2);
      // });

      // for (let k in crmjObj) {
      //   crmjData.push(crmjObj[k]);
      // }

      this.dataAge = xqzsData;

      this.dataHash = {
        xqzs: xqzsData,
        zzts: zztsData,
        kzzzts: kzzztsData,
        syjs: syjsData,
        kzsyjs: kzsyjsData,
        kzbgjs: kzbgjsData
      };

      this.doChart();
    },
    doChart() {
      const that = this;
      const chart = this.$echarts.init(document.getElementById("crtjChart2"));
      chart.setOption({
        grid: {
          left: "3%",
          right: "3%",
          top: "16%",
          bottom: "3%",
          containLabel: true
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          boundaryGap: true,
          show: true,
          axisTick: {
            show: false
          },
          axisLabel: {
            fontSize: 17,
            color: "#FFF",
            formatter: function(val) {
              return val.split("").join("\n");
            }
          },
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          data: this.dataAge
            .sort((a, b) => b.value - a.value)
            .map(item => item.name.replace("镇", "").replace("街道", ""))
        },
        yAxis: {
          type: "value",
          name: ~["xqzs"].indexOf(that.index)
            ? "个"
            : ~["zzts", "kzzzts"].indexOf(that.index)
            ? "套"
            : "间",
          minInterval: 1,
          axisLine: {
            lineStyle: {
              color: "#FFF"
            }
          },
          axisTick: {
            show: false
          },
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
            show: false
          }
        },
        series: [
          {
            name:
              that.index == "xqzs"
                ? "小区总数"
                : that.index == "zzts"
                ? "住宅套数"
                : that.index == "kzzzts"
                ? "空置住宅套数"
                : that.index == "syjs"
                ? "商业间数"
                : that.index == "kzsyjs"
                ? "空置商业间数"
                : "空置办公间数",
            type: "bar",
            barWidth: "20px",
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#fff",
                fontSize: 12
              }
            },
            itemStyle: {
              color: "#f41e1e"
            },
            data: this.dataAge
          }
        ]
      });
    },
    bqSelect: function(event) {
      this.dataAge = this.dataHash[event.target.value];
      this.index = event.target.value;
      this.$echarts.init(document.getElementById("crtjChart2")).clear();
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
#crtjDiv {
  width: 100%;
  height: 34%;
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

  #crtjChart2 {
    width: 100%;
    height: 85%;
  }
}
</style>