<template>
  <div class="nationwide-chart">
    <span class="chart-title">{{`新冠肺炎每日疫情（截至${deadlineTime}时）`}}</span>
    <!-- <span class="chart-title">{{`新冠肺炎每日疫情（截至2021-01-16 24时）`}}</span> -->
    <div class="result-wrapper">
      <ul class="result-list" id="table">
        <li class="result-item header">
          <span class="index">项目</span>
          <span class="content">全国</span>
          <span class="content">浙江</span>
          <span class="content">温州</span>
          <span class="last">鹿城</span>
        </li>
        <li
          class="result-data "
          v-for="(item, index) in qgsjList.covidDayReportDetailList"
          :key="index"
          :id="index"
        >
            <span class="indexList ">{{item.projectName}}</span>
            <span class="contentList" @click="wholeCountryClick(item.wholeCountryRemark,index)" >{{
              item.wholeCountry
            }}</span>
            <span class="contentList" @click="zhejiangClick(item.zhejiangRemark,index)">{{
              item.zhejiang
            }}</span>
            <span class="contentList" @click="wenzhouClick(item.wenzhouRemark,index)">{{
              item.wenzhou
            }}</span>
            <span class="contentList" @click="luchengClick(item.luchengRemark,index)">{{
              item.lucheng
            }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState} from "vuex";
export default {
   data() {
    return {
      index:-1,
    };
  },
  computed: {
    ...mapState({
      qgsjList: state => state.qgsjList,
    }),
    deadlineTime(){
      const time = `${this.qgsjList.deadlineTime}`;
      const date = time.split(" ")[0]
      let houre = time.split(" ")[1]
      console.log(houre)
      if(Number(houre) > 22){
        houre = 24
      }
      return `${date} ${houre}`
    },
  },
  methods:{
    wholeCountryClick(wholeCountryRemark,index){
      // debugger
      const that = this;
      if(that.index != -1){
        if($(".new-li").length > 0){
          if(index == that.index){
            $(".new-li").remove();
            that.index = -1;
            return
          }
        }
      }
      this.index = index;
      $(".new-li").remove();
      if(wholeCountryRemark){
        $(`#${index}`).after(`<li class="new-li ">${wholeCountryRemark}</li>`);
      }
    },
    zhejiangClick(zhejiangRemark,index){
      const that = this;
      if(that.index != -1){
        if($(".new-li").length > 0){
          if(index == that.index){
            $(".new-li").remove();
            that.index = -1;
            return
          }
        }
      }
      this.index = index;
      $(".new-li").remove();
      if(zhejiangRemark){
        $(`#${index}`).after(`<li class="new-li ">${zhejiangRemark}</li>`);
      }
    },
    wenzhouClick(wenzhouRemark,index){
      const that = this;
      if(that.index != -1){
        if($(".new-li").length > 0){
          if(index == that.index){
            $(".new-li").remove();
            that.index = -1;
            return
          }
        }
      }
      this.index = index;
      $(".new-li").remove();
      if(wenzhouRemark){
        $(`#${index}`).after(`<li class="new-li ">${wenzhouRemark}</li>`);
      }
    },
    luchengClick(luchengRemark,index){
      const that = this;
      if(that.index != -1){
        if($(".new-li").length > 0){
          if(index == that.index){
            $(".new-li").remove();
            that.index = -1;
            return
          }
        }
      }
      this.index = index;
      $(".new-li").remove();
      if(luchengRemark){
        $(`#${index}`).after(`<li class="new-li ">${luchengRemark}</li>`);
      }
    },
  },
};
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
    font-size: 2vh;
    padding: 20px;
    font-family: "PingFang SC";
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

  .result-wrapper {
    margin-top: 1vh;
    width  : 100%;
    height : 80vh;
    font-family: PingFang;
    color: #fff;
    .result-list {
      height    : 100%;
      overflow-y: auto;
      padding-left: 0.5vh;
      padding-right: 0.1vh;
      .result-item {
        display        : flex;
        justify-content: space-between;
        align-items    : center;
        padding        : 0.5vh 0 0.5vh 0vh;
        line-height: 4.5vh;
        font-size: 1.2vh;
        height: 3.5vh;
        font-family: "PingFang SC";
        color: #FAFAFA;
        .index {
          flex: 6;
        }
        .last {
          flex: 3;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
          // border-right: 1px solid #F5F5F5;
        }
        .content {
          flex: 3;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
          // height: 100%;
          border-right: 1px solid #F5F5F5;
        }
        &.header {
          font-size: 1.6vh;
          height: 3.5vh;
          font-family: "PingFang SC";
          color: #FAFAFA;
          background:#092E4F;
        }
      }
      .result-data {
        display        : flex;
        justify-content: space-between;
        align-items    : center;
        padding        : 0.1vh 0 0.1vh 0vh;
        line-height: 3.8vh;
        font-size: 1.3vh;
        height: 3.5vh;
        font-family: "PingFang SC";
        color: #FAFAFA;

        .indexList{
          flex: 6;
          background-color: rgba(9, 46, 79, 0.8);
        }
        .contentList {
          flex: 3;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
          cursor:pointer
        }

      }
      // li:nth-child(odd) {
      //   // background:#3671BB;
      // }
      li:nth-child(even) {
        background: rgba(9, 46, 79, 0.3);
      }
    }
  }

  .new-li{
    background-color: rgba(9, 46, 79, 0.8);
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
    background: rgba(1, 41, 38, .3);
  }

}
/deep/ .new-li{
  background-color: rgba(9, 46, 79, 0.8);
  font-size: 1.4vh;
  font-family: "PingFang SC";
  color: #FAFAFA;
  line-height: 3.8vh;
  height: 3.5vh;
  .new-img{
    width: 1vh;
    height: 1vh;
  }
}
</style>
