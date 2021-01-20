<template>
  <div class="chart3">
    <!-- <img src="@/components/common/image/rightDiv/chart3.png" /> -->
    <span class="chart-title">街道核酸检测点分布</span>
    <div id="barChart3">
      <table>
        <tr v-for="(item, index) in chartData" :key="index">
          <td class="axis-label">{{ item.name }}</td>
          <td class="series-bar">
            <div>
              <span :style="{ width: (item.num / maxNum) * 100 + '%' }"></span>
            </div>
          </td>
          <td class="axis-num">{{ item.num }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  data() {
    return {
      barChart3: undefined,
      chartData: [
        {
          name: "仰义街道",
          num: 30,
        },
        {
          name: "大南街道",
          num: 59,
        },
        {
          name: "双屿街道",
          num: 67,
        },
        {
          name: "南郊街道",
          num: 62,
        },
        {
          name: "蒲鞋市街道",
          num: 172,
        },
      ],
    };
  },

  computed: {
    maxNum() {
      return this.chartData.sort((a, b) => b.num - a.num)[0].num;
    },
  },

  mounted() {
    // this.initChart();
  },
  methods: {
    initChart() {
      !this.barChart3 &&
        (this.barChart3 = echarts.init(document.getElementById("barChart3")));

      this.barChart3.setOption({
        color: ["#ffd800", "#00ff00", "#00a4ea", "#ff7400"],
        title: [
          {
            text: "隔离点：44",
            top: "40%",
            textAlign: "center",
            left: "40%",
            textStyle: {
              color: "#fff",
              fontSize: 16,
            },
          },
          {
            text: "核酸检测点：399",
            top: "50%",
            textAlign: "center",
            left: "40%",
            textStyle: {
              color: "#fff",
              fontSize: 16,
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
            radius: ["65%", "75%"],
            startAngle: 40,
            minAngle: 30,
            itemStyle: {
              normal: {
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
                name: "启用隔离点",
                value: 1,
              },
              {
                name: "备用隔离点",
                value: 43,
              },
              {
                name: "核酸检测点",
                value: 399,
              },
              {
                name: "爆满隔离点",
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
.chart3 {
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

  #barChart3 {
    flex: 1;

    table {
      width: 100%;
      height: 100%;
      padding-bottom: 10px;

      tr {
        &:nth-child(odd) .series-bar > div {
          background-color: #0e67c2;

          > span {
            background-color: #0074f8;
          }
        }

        &:nth-child(even) .series-bar > div {
          background-color: #018fc4;

          > span {
            background-color: #00e0fa;
          }
        }

        td {
          display: table-cell;
          vertical-align: middle;
          font-family: PingFang SC;

          &.axis-label {
            width: 30%;
          }

          &.series-bar {
            > div {
              width: 100%;
              height: 8px;
              border-radius: 5px;

              > span {
                display: block;
                height: 8px;
                border-radius: 5px;
              }
            }
          }

          &.axis-num {
            width: 15%;
          }
        }
      }
    }
  }
}
</style>