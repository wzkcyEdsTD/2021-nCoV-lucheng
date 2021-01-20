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
          <div class="number">2031</div>
        </div>
        <div class="line">
          <div class="text">新增确诊 </div>
          <div class="number">+118</div>
        </div>
        <div class="line">
          <div class="text">累计确诊 </div>
          <div class="number">98801</div>
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
          <div class="number">12</div>
        </div>
        <div class="line">
          <div class="text">新增确诊 </div>
          <div class="number">+2</div>
        </div>
        <div class="line">
          <div class="text">累计确诊 </div>
          <div class="number">1311</div>
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
          <div class="number">0</div>
        </div>
        <div class="line">
          <div class="text">新增确诊 </div>
          <div class="number">+0</div>
        </div>
        <div class="line">
          <div class="text">累计确诊 </div>
          <div class="number">513</div>
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
          <div class="number">0</div>
        </div>
        <div class="line">
          <div class="text">新增确诊 </div>
          <div class="number">+0</div>
        </div>
        <div class="line">
          <div class="text">累计确诊 </div>
          <div class="number">3</div>
        </div>
      </li>
    </ul>

  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#topDateDiv {
  position: absolute;
  top: 13vh;
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
        font-family: "pingFang SC";
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