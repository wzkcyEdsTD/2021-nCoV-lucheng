<template>
  <div class="chart3">
    <span class="chart-title">街道核酸采样点分布</span>
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
    return { chartData: [] };
  },

  computed: {
    maxNum() {
      return this.chartData.sort((a, b) => b.num - a.num)[0].num;
    },
  },

  mounted() {
    this.chartData = [];
    const { streetSamplingPoint } = window.ncov_chart_2021;
    for (let k in streetSamplingPoint) {
      this.chartData.push({
        name: k,
        num: streetSamplingPoint[k],
      });
    }
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

  .chart-title {
    display: block;
    text-align: left;
    font-size: 18px;
    padding: 10px;
  }

  #barChart3 {
    flex: 1;
    overflow-y: auto;
    table {
      width: 100%;
      height: 100%;
      padding-bottom: 10px;

      tr {
        height: 4vh;
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

  // 滚动条
  *::-webkit-scrollbar {
    width: 0.8vh;
    height: 5px;
  }
  *::-webkit-scrollbar-thumb {
    border-radius: 20px;
    -webkit-box-shadow: inset 0vh 0.3vh 0.6vh 0vh #012623;
    background: #073691;
  }
  *::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 20px;
    // background: rgba(28, 54, 104, 0.9);
    background: rgba(1, 41, 38, 0.3);
  }
}
</style>