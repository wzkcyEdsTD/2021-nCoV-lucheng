<template>
  <div id="tdytDiv">
    <div>
      <span class="title">2020年安置房源分类统计图</span>
      <select id="select" @change="bqSelect($event)">
        <option value="zazfy">总安置房源</option>
        <option value="zazmj">总安置面积</option>
        <option value="yazfy">已安置房源</option>
        <option value="yazmj">已安置面积</option>
        <option value="syfy">剩余房源</option>
        <option value="symj">剩余面积</option>
      </select>
    </div>
    <div id="tdytChart2"></div>
  </div>
</template>

<script>
/* eslint-disable */
// import { mapState } from "vuex";
import { tmpData1 } from "../config/chartData";
export default {
  data() {
    return {
      index: "zazfy"
    };
  },
  computed: {
    // ...mapState({
    //   dkxxList: state => state.dkxxList
    // })
  },
  methods: {
    fixdkxxList() {
      const ytHash = {
        住宅: {
          value: 0,
          name: "住宅",
          itemStyle: { color: "rgb(255, 255, 0)" },
          textStyle: { color: "rgb(255, 255, 0)" }
        },
        商业用房: {
          value: 0,
          name: "商业用房",
          itemStyle: { color: "rgb(255, 0, 0)" },
          textStyle: { color: "rgb(255, 0, 0)" }
        },
        办公用房: {
          value: 0,
          name: "办公用房",
          itemStyle: { color: "rgb(255, 191, 0)" },
          textStyle: { color: "rgb(255, 191, 0)" }
        },
        其他: {
          value: 0,
          name: "其他",
          itemStyle: { color: "rgb(255, 159, 127)" },
          textStyle: { color: "rgb(255, 159, 127)" }
        }
      };

      const zazfyObj = JSON.parse(JSON.stringify(ytHash));
      const zazmjObj = JSON.parse(JSON.stringify(ytHash));
      const yazfyObj = JSON.parse(JSON.stringify(ytHash));
      const yazmjObj = JSON.parse(JSON.stringify(ytHash));
      const syfyObj = JSON.parse(JSON.stringify(ytHash));
      const symjObj = JSON.parse(JSON.stringify(ytHash));

      const zazfyData = [];
      const zazmjData = [];
      const yazfyData = [];
      const yazmjData = [];
      const syfyData = [];
      const symjData = [];

      tmpData1.map(({ FYYT, ZAZFY, ZAZMJ, YAZFY, YAZMJ, SYFY, SYMJ }) => {
        if (FYYT != null) {
          ZAZFY != null &&
            zazfyObj[FYYT] &&
            (zazfyObj[FYYT].value =
              Number(zazfyObj[FYYT].value) + Number(ZAZFY));
          ZAZMJ != null &&
            zazmjObj[FYYT] &&
            (zazmjObj[FYYT].value =
              Number(zazmjObj[FYYT].value) + Number(ZAZMJ));
          YAZFY != null &&
            yazfyObj[FYYT] &&
            (yazfyObj[FYYT].value =
              Number(yazfyObj[FYYT].value) + Number(YAZFY));
          YAZMJ != null &&
            yazmjObj[FYYT] &&
            (yazmjObj[FYYT].value =
              Number(yazmjObj[FYYT].value) + Number(YAZMJ));
          SYFY != null &&
            syfyObj[FYYT] &&
            (syfyObj[FYYT].value = Number(syfyObj[FYYT].value) + Number(SYFY));
          SYMJ != null &&
            symjObj[FYYT] &&
            (symjObj[FYYT].value = Number(symjObj[FYYT].value) + Number(SYMJ));
        }
      });

      for (let k in zazfyObj) {
        zazfyData.push(zazfyObj[k]);
      }
      for (let k in zazmjObj) {
        zazmjData.push(zazmjObj[k]);
      }
      for (let k in yazfyObj) {
        yazfyData.push(yazfyObj[k]);
      }
      for (let k in yazmjObj) {
        yazmjData.push(yazmjObj[k]);
      }
      for (let k in syfyObj) {
        syfyData.push(syfyObj[k]);
      }
      for (let k in symjObj) {
        symjData.push(symjObj[k]);
      }

      this.dataList = zazfyData;

      this.dataHash = {
        zazfy: zazfyData,
        zazmj: zazmjData,
        yazfy: yazfyData,
        yazmj: yazmjData,
        syfy: syfyData,
        symj: symjData
      };

      this.doChart();
    },
    doChart() {
      const that = this;
      const chart = this.$echarts.init(document.getElementById("tdytChart2"));
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
                  return that.index == "zazfy"
                    ? `${params.data.name}${params.data.value}套\n(占比${params.percent}%)`
                    : that.index == "zazmj"
                    ? `${params.data.name}${params.data.value}㎡\n(占比${params.percent}%)`
                    : that.index == "yazfy"
                    ? `${params.data.name}${params.data.value}套\n(占比${params.percent}%)`
                    : that.index == "yazmj"
                    ? `${params.data.name}${params.data.value}㎡\n(占比${params.percent}%)`
                    : that.index == "syfy"
                    ? `${params.data.name}${params.data.value}套\n(占比${params.percent}%)`
                    : `${params.data.name}${params.data.value}㎡\n(占比${params.percent}%)`;
                },
                textStyle: {
                  fontSize: 15
                }
              }
            },
            labelLine: {
              normal: {
                length: 8,
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
      this.$echarts.init(document.getElementById("tdytChart2")).clear();
      this.doChart();
    }
  },
  created() {},
  mounted() {
    this.fixdkxxList();
  },
  watch: {
    // tmpData1(n) {
    //   this.fixdkxxList();
    // }
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

  #tdytChart2 {
    width: 100%;
    height: 85%;
  }
}
</style>