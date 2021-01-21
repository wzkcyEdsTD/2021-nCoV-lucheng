<template>
  <div id="topDateDiv">
    <ul>
      <li>
        <!-- 全国 -->
        <div>
          <div class="title">
            <img src="~@/components/common/image/标题.png" class="titleImg">
            <div class="titleText">全国</div>
          </div>
        </div>
        <div class="line">
          <div class="text">现有确诊 </div>
          <div class="number">{{xyqzList.wholeCountry}}</div>
        </div>
        <div class="line">
          <div class="text">新增确诊 </div>
          <div class="number">+{{addList.wholeCountry}}</div>
        </div>
        <div class="line">
          <div class="text">累计确诊 </div>
          <div class="number">{{ljqzList.wholeCountry}}</div>
        </div>
      </li>
      <li>
        <!-- 浙江 -->
        <div>
          <div class="title">
            <img src="~@/components/common/image/标题.png" class="titleImg">
            <div class="titleText">浙江</div>
          </div>
        </div>
        <div class="line">
          <div class="text">现有确诊 </div>
          <div class="number">{{xyqzList.zhejiang}}</div>
        </div>
        <div class="line">
          <div class="text">新增确诊 </div>
          <div class="number">+{{addList.zhejiang}}</div>
        </div>
        <div class="line">
          <div class="text">累计确诊 </div>
          <div class="number">{{ljqzList.zhejiang}}</div>
        </div>
      </li>
      <li>
        <!-- 温州 -->
        <div>
          <div class="title">
            <img src="~@/components/common/image/标题.png" class="titleImg">
            <div class="titleText">温州</div>
          </div>
        </div>
        <div class="line">
          <div class="text">现有确诊 </div>
          <div class="number">{{xyqzList.wenzhou}}</div>
        </div>
        <div class="line">
          <div class="text">新增确诊 </div>
          <div class="number">+{{addList.wenzhou}}</div>
        </div>
        <div class="line">
          <div class="text">累计确诊 </div>
          <div class="number">{{ljqzList.wenzhou}}</div>
        </div>
      </li>
      <li>
        <!-- 鹿城 -->
        <div>
          <div class="title">
            <img src="~@/components/common/image/标题.png" class="titleImg">
            <div class="titleText">鹿城</div>
          </div>
        </div>
        <div class="line">
          <div class="text">现有确诊 </div>
          <div class="number">{{xyqzList.lucheng}}</div>
        </div>
        <div class="line">
          <div class="text">新增确诊 </div>
          <div class="number">+{{addList.lucheng}}</div>
        </div>
        <div class="line">
          <div class="text">累计确诊 </div>
          <div class="number">{{ljqzList.lucheng}}</div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
import { mapState} from "vuex";
export default {
 data() {
    return {

    };
  },
  computed: {
    ...mapState({
      qgsjList: state => state.qgsjList,
    }),
    xyqzList() {
      let result = {};
      let alldata = [];
      alldata =  this.qgsjList.covidDayReportDetailList;
      alldata.forEach(item => {
        if(item.projectName && item.projectName.indexOf("现有确诊") != -1) {
          if(item.projectName.indexOf("境外") == -1){
            result = item
          }
        }
      });
      return result
    },
    ljqzList() {
      let result = {};
      let alldata = [];
      alldata =  this.qgsjList.covidDayReportDetailList;
      alldata.forEach(item => {
        if(item.projectName && item.projectName.indexOf("累计确诊") != -1) {
          if(item.projectName.indexOf("境外") == -1){
            result = item
          }
        }
      });
      return result
    },
    addList() {
      let result = {};
      let alldata = [];
      alldata =  this.qgsjList.covidDayReportDetailList;
      alldata.forEach(item => {
        if(item.projectName && item.projectName.indexOf("新增确诊") != -1) {
          if(item.projectName.indexOf("境外") == -1){
            if(item.projectName.indexOf("本土") == -1){
              result = item
            }

          }
        }
      });
      return result
    },
  },
};
</script>

<style lang="less" scoped>
#topDateDiv {
  position: absolute;
  top: 20vh;
  width: 100%;
  z-index: 20;

  ul li {
    width: 15vh;
    margin: auto;
    // border-radius: 8px;
    display: inline-block;
    // background-color: #1C54C4;
    background-image: url("../../common/image/背景框.png");
    // border: 1px solid #07e2e8;
    margin-left: 10px;
    padding: 5px 9px;
    color: #07e2e8;

    .title{
      position: relative;
      .titleText{
        font-family: "YouSheBiaoTiHei";
        font-size: 2.2vh;
        color: #FFFFFF;
        position:absolute;
        top: 0.1vh;
        left: 5.5vh;
      }

      .titleImg{
        position: relative;
        left: 1%;
        top: 0.4vh;
      }
    }

    .line{
      display: flex;
      align-items: center;
      justify-content:center; 
      .text{
        font-family: "PingFang SC";
        font-size: 1.6vh;
        color: #FFFFFF;
        padding-left: 5%;
      }
      .number{
        margin-left: auto;
        // width: 6vh;
        // padding-left: 6%;
        font-family: "DIN";
        font-size: 2.2vh;
        color: #36FFFF;
        padding-right: 3%;
      }
    }

  }

}
</style>