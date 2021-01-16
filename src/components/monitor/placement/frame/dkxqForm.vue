<template>
  <div id="dkxqForm">
    <a @click="close">×</a>
    <div class="block block1">
      <span class="title">做地详情</span>
      <div class="carousel">
        <el-carousel height="200px" autoplay>
          <el-carousel-item v-for="item in imgNum" :key="item"></el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="block block2">
      <span class="title">区块优势</span>
      <span class="detail">详情 >></span>
      <div>
        <ul>
          <li v-for="(item,index) in qktable" :key="index">
            <p>{{item.title}}</p>
            <span>{{item.text}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="block block3">
      <span class="title">问题清单</span>
      <span class="finishRate">完成率：{{ finishRate }} %</span>
      <div>
        <ul>
          <li v-for="k in qtable.length / 3" :key="k">
            <div
              v-for="(item,index) in qtable.slice((k - 1) * 3, (k - 1) * 3 + 3)"
              :key="index"
              @click="getReason(item)"
              :class="{ complete: item.tf == '是', uncomplete: item.tf != '是' }"
            >
              <span>{{item.text}}</span>
            </div>
          </li>
        </ul>
        <reasonForm ref="reasonForm" />
      </div>
    </div>
    <div class="bottom">
      <span>负责人：李先生</span>
      <span style="margin-left: 20px;">联系方式：0577-88030503</span>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const server = "http://172.20.89.68:5001/s";
import reasonForm from "./reasonForm";
import { mapState } from "vuex";

export default {
  name: "dkxqForm",
  data() {
    return {
      server,
      imgNum: 4,
      title: "",
      qtable: [],
      finishRate: 100
    };
  },
  components: { reasonForm },
  computed: {
    ...mapState({
      zdjzList: state => state.zdjzList,
      dkxxList: state => state.dkxxList
    })
  },
  created() {
    this.qktable = [
      {
        title: "项目区位优势",
        text:
          "本次规划项目位于温州市鹿城区，地理位置优越交通便利，翠微大道贯通南北；翠微山、黄龙山、景山三山环抱景观丰富；项目地块边界方整，周边商业、教育、医疗设备配套设施完善。"
      },
      {
        title: "项目区位优势",
        text:
          "本次规划项目位于温州市鹿城区，地理位置优越交通便利，翠微大道贯通南北；翠微山、黄龙山、景山三山环抱景观丰富；项目地块边界方整，周边商业、教育、医疗设备配套设施完善。"
      },
      {
        title: "项目区位优势",
        text:
          "本次规划项目位于温州市鹿城区，地理位置优越交通便利，翠微大道贯通南北；翠微山、黄龙山、景山三山环抱景观丰富；项目地块边界方整，周边商业、教育、医疗设备配套设施完善。"
      }
    ];

    this.qtable = [
      { text: "审批到位", tf: "是", color: "rgba(58,209,75,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(255,51,83,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(58,209,75,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(255,51,83,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(255,51,83,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(58,209,75,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(255,51,83,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(255,51,83,0.3)" },
      { text: "审批到位", tf: "是", color: "rgba(58,209,75,0.3)" }
    ];
  },
  mounted() {},
  methods: {
    close() {
      this.$parent.dkxqShow = false;
    },
    getItem(name, imgName) {
      const that = this;

      this.title = name;

      this.$refs.reasonForm.showReason(null);

      const imgList = imgName == "/" ? [] : imgName.split(";");

      this.imgNum = imgList.length || 1;

      if (imgList.length) {
        imgList.map((item, index) => {
          $(".el-carousel__item")
            .eq(index)
            .css({
              "background-image": `url("${server}/icon/做地/${item}")`
            });
        });
      } else {
        $(".el-carousel__item")
          .eq(0)
          .css({
            "background-image": `url("${server}/icon/做地/临时/暂无图片.jpg")`
          });
      }

      $(".el-carousel__item").css({
        cursor: "pointer"
      });
      $(".el-carousel__item").bind("click", this.locateVR);

      const list = this.zdjzList.filter(({ GLZD }) => name == GLZD);

      const dkxxObj = this.dkxxList.filter(({ GLZD }) => name == GLZD);

      if (dkxxObj.length) {
        this.qktable = [
          {
            title: "地块区位优势",
            text: dkxxObj[0].QKYS == "/" ? "暂无数据" : dkxxObj[0].QKYS
          }
        ];
      }

      if (list.length) {
        const item = list[0];

        const colorHash = {
          是: "rgba(58,209,75,0.3)",
          否: "rgba(255,51,83,0.3)"
        };

        that.qtable = [
          {
            text: "征地是否到位",
            tf: item.TDZSZJS1,
            jtyy: item.JTYY1,
            zrr: item.ZRR1,
            sjjd: "/",
            color: colorHash[item.TDZSZJS1]
          },
          {
            text: "土地使用权是否已收回",
            tf: item.TDSYQ2,
            jtyy: item.JTYY2,
            zrr: item.ZRR2,
            sjjd: "/",
            color: colorHash[item.TDSYQ2]
          },
          {
            text: "建筑物是否已拆除",
            tf: item.JZW3,
            jtyy: item.JTYY3,
            zrr: item.ZRR3,
            sjjd: "/",
            color: colorHash[item.JZW3]
          },
          {
            text: "土地证是否已注销",
            tf: item.TDZ4,
            jtyy: item.JTYY4,
            zrr: item.ZRR4,
            sjjd: "/",
            color: colorHash[item.TDZ4]
          },
          {
            text: "管线是否已迁移",
            tf: item.GX5,
            jtyy: item.JTYY5,
            zrr: item.ZRR5,
            sjjd: "/",
            color: colorHash[item.GX5]
          },
          {
            text: "地表附着物是否已清理",
            tf: item.DBFZW6,
            jtyy: item.JTYY6,
            zrr: item.ZRR6,
            sjjd: "/",
            color: colorHash[item.DBFZW6]
          },
          {
            text: "土地污染是否已治理",
            tf: item.TDWR7,
            jtyy: item.JTYY7,
            zrr: item.ZRR7,
            sjjd: "/",
            color: colorHash[item.TDWR7]
          },
          {
            text: "场地是否已平整",
            tf: item.CD8,
            jtyy: item.JTYY8,
            zrr: item.ZRR8,
            sjjd: "/",
            color: colorHash[item.CD8]
          },
          {
            text: "水域占用是否已审批",
            tf: item.SY9,
            jtyy: item.JTYY9,
            zrr: item.ZRR9,
            sjjd: "/",
            color: colorHash[item.SY9]
          },
          {
            text: "围墙放样地籍图是否完成",
            tf: item.WQFY10,
            jtyy: item.JTYY10,
            zrr: item.ZRR10,
            sjjd: "/",
            color: colorHash[item.WQFY10]
          },
          {
            text: "土地是否收储",
            tf: item.TDSC11,
            jtyy: item.JTYY11,
            zrr: item.ZRR11,
            sjjd: "/",
            color: colorHash[item.TDSC11]
          },
          {
            text: "是否挂牌",
            tf: item.GP12,
            jtyy: item.JTYY12,
            zrr: item.ZRR12,
            sjjd: "/",
            color: colorHash[item.GP12]
          }
        ];

        let finishNum = 0;

        that.qtable.map(({ tf }) => {
          if (tf == "是") finishNum++;
        });

        const finishRate = ((finishNum / that.qtable.length) * 100).toFixed(2);
        that.finishRate = finishRate;
      }
    },
    getReason(item) {
      // if (item.tf != "是") {
      this.$refs.reasonForm.showReason(item);
      // }
    },
    locateVR() {
      if (~this.title.indexOf("滨江")) {
        window.open("https://720yun.com/t/aevkuy1q07l?scene_id=39682863");
      }
    }
  }
};
</script>

<style lang="less" scoped>
#dkxqForm {
  position: absolute;
  width: 490px;
  height: 88%;
  background: rgba(4, 30, 117, 0.5);
  border-left: 1px solid #04ecff;
  border-right: 1px solid #04ecff;
  border-radius: 6px;
  z-index: 30;
  top: 10%;
  margin: auto;
  box-sizing: border-box;
  transition: all 1s;
  display: flex;
  flex-flow: column;
  justify-content: space-between;

  a {
    position: absolute;
    top: 0px;
    right: 10px;
    font-size: 30px;
    cursor: pointer;
  }
  .block {
    text-align: left;
    width: 100%;
    height: 31%;
    background: rgba(4, 30, 117, 0.5);
    border-bottom: 1px solid #4594ff;
    border-top: 1px solid #4594ff;
    .title {
      font-size: 20px;
      color: rgba(97, 235, 255, 1);
      position: relative;
      top: 5px;
      left: 20px;
      font-weight: bolder;
      border-left: 5px solid;
      padding-left: 5px;
    }
    > div {
      width: 100%;
      height: 90%;
      box-sizing: border-box;
    }
  }

  .block1 {
    .carousel {
      height: 100%;
      padding: 15px 20px;

      .el-carousel__item:nth-child(2n) {
        background-image: url("../../../common/image/dk/暂无图片.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }

      .el-carousel__item:nth-child(2n + 1) {
        background-image: url("../../../common/image/dk/暂无图片.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }
    }
  }

  .block2 {
    .detail {
      position: relative;
      float: right;
      top: 5px;
      right: 20px;
      font-size: 20px;
      font-weight: bolder;
      cursor: pointer;
    }
    > div {
      padding: 17px 15px;
      ul {
        width: 100%;
        height: 100%;
        overflow-y: auto;
        background: rgba(31, 54, 92, 0.5);
        li {
          display: inline-block;
          width: 100%;
          box-sizing: border-box;
          padding: 8px 15px 0px;
          p {
            font-size: 18px;
            color: rgba(211, 154, 69, 1);
            line-height: 22px;
          }
          span {
            font-size: 17px;
          }
        }

        li:last-child {
          padding-bottom: 8px;
        }
      }
    }
  }

  .block3 {
    .finishRate {
      position: relative;
      float: right;
      top: 5px;
      right: 20px;
      font-size: 20px;
      font-weight: bolder;
    }

    > div {
      padding: 10px 0px;
      text-align: center;
      position: relative;
      ul {
        width: 100%;
        height: 100%;
        list-style: none;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        li {
          width: 100%;
          height: 23%;
          display: flex;
          justify-content: space-between;
          box-sizing: border-box;
          padding: 0px 5px;
          div {
            width: 32%;
            height: 100%;
            display: table;
            cursor: pointer;
            box-sizing: border-box;
            padding: 0px 23px;

            span {
              display: table-cell;
              vertical-align: middle;
              font-size: 15px;
              font-weight: bolder;
              color: #fff;
            }
          }

          .complete {
            background-image: url("../../../common/image/已完成.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }

          .uncomplete {
            background-image: url("../../../common/image/未完成.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }

  .bottom {
    width: 100%;
    height: 28px;
    line-height: 28px;
    background: rgba(4, 30, 117, 0.5);
    border-bottom: 1px solid #4594ff;
    border-top: 1px solid #4594ff;
  }

  .block2 ul::-webkit-scrollbar {
    display: block;
    width: 10px;
    background-color: #1a3561;
    border-radius: 10px;
  }
  .block2 ul::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #45cdff;
    border-radius: 10px;
  }
}
</style>