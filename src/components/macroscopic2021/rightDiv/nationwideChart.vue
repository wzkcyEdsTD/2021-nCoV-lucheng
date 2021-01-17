<template>
  <div class="nationwide-chart">
    <span class="chart-title">全国疫情中高风险地区地图</span>
    <div class="chart-list">
      <div class="chart-item">
        <img src="@/components/common/image/nationwide/1.png" />
      </div>
      <div class="chart-item">
        <img src="@/components/common/image/nationwide/2.png" />
      </div>
      <div class="chart-item">
        <img src="@/components/common/image/nationwide/3.png" />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.nationwide-chart {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .chart-title {
    display: block;
    text-align: left;
    font-size: 18px;
    padding: 20px;
  }

  .chart-list {
    flex: 1;
    width: 100%;

    .chart-item {
      width: 100%;
      box-sizing: border-box;
      border: solid 8px #2a5a9e;
      border-radius: 5px;

      &:not(:last-child) {
        margin-bottom: 10px;
      }

      > img {
        width: 100%;
      }
    }
  }
}
</style>