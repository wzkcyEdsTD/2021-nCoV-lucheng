<template>
  <div class="leftMultiSelect">
    <div class="topic">
      <div class="selectFrame no_select">
        <div v-for="(item, index) in this.tree" :key="index">
          <span @click="toggleTree(item.label, index)">
            {{ item.label }}
            <input
              v-if="!item.disabled"
              type="checkbox"
              v-model="item.check"
              @change="changeBox(item.check, index)"
              @click="stop($event)"
            />
            <i
              v-if="item.children"
              :class="`iconfont ${
                item.show ? `iconRectangleCopy7` : `iconRectangleCopy4`
              }`"
            ></i>
          </span>
          <ul v-show="item.show">
            <li v-for="(oitem, oindex) in item.children" :key="oindex">
              <input
                type="checkbox"
                v-if="!item.disabled"
                v-model="oitem.check"
                @change="changeTree(item, index, oitem)"
              />
              <p>
                {{
                  oitem.unit
                    ? `${oitem.name} (${totalMap[oitem.id]}${oitem.unit})`
                    : oitem.name
                }}
              </p>
              <ToggleSwitch
                v-if="oitem.id == 'jjgl' || oitem.id == 'hbhw'"
                @change="change(oitem.id)"
              />
              <span
                id="xq"
                v-if="oitem.id == 'isolatedPoint'"
                @click="ShowListxq(oitem, item)"
                >详情</span
              >
              <span
                id="xq"
                v-if="oitem.id == 'detection'"
                @click="ShowSamplingDetail(oitem, item)"
                >详情</span
              >
              <span
                id="xq"
                v-if="oitem.id == 'quarantine'"
                @click="ShowQuarantineDetail(oitem, item)"
                >详情</span
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="mapOption"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import ToggleSwitch from "./Switch";
import { WRT_config, OPTION } from "@/components/common/Tmap";
import util from "./util";
const { server } = WRT_config;
export default {
  name: "leftMultiSelect",
  data() {
    return {
      icon_show: true,
      tree: [],
      items: {},
      server,
      URL: null,
      check1: false,
      check2: false,
      totalMap: {
        isolatedPoint: 0,
        detection: 0,
        quarantine: 0,
      },
    };
  },
  components: { ToggleSwitch },
  props: { leftOptions: Array, leftformdata: Object, imgUrl: String },
  created() {
    this.tree = this.leftOptions;
    this.items = this.leftformdata;
  },
  async mounted() {
    this.tree.length && (this.$parent.nationwideShow = this.tree[0].check);

    const isolatedPointNum = await this.getIsolatedPointNum();
    const detectionNum = await this.getDetectionNum();
    const quarantineNum = await this.getQuarantine();

    this.totalMap = {
      isolatedPoint: isolatedPointNum,
      detection: detectionNum,
      quarantine: quarantineNum,
    };
  },
  methods: {
    // 隔离点数量
    getIsolatedPointNum() {
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
          OPTION
        ).then(async ([QueryTask, Query]) => {
          const queryTask = new QueryTask({
            url:
              "http://172.20.89.7:6082/arcgis/rest/services/NewDataLuChengYiQinag/GeiLiDianLuCheng/MapServer/0",
          });
          const query = new Query();
          query.outFields = ["*"];
          query.returnGeometry = true;
          query.where = `1 = 1`;
          const { features } = await queryTask.execute(query);
          resolve(features.length || 0);
        });
      });
    },

    // 核酸采样点数量
    getDetectionNum() {
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
          OPTION
        ).then(async ([QueryTask, Query]) => {
          const queryTask = new QueryTask({
            url:
              "http://172.20.89.7:6082/arcgis/rest/services/NewDataLuChengYiQinag/GeiLiDianLuCheng/MapServer/1",
          });
          const query = new Query();
          query.outFields = ["*"];
          query.returnGeometry = true;
          query.where = `1 = 1`;
          const { features } = await queryTask.execute(query);
          resolve(features.length || 0);
        });
      });
    },

    // 入境隔离人员数量
    getQuarantine() {
      return new Promise((resolve, reject) => {
        loadModules(
          ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
          OPTION
        ).then(async ([QueryTask, Query]) => {
          const queryTask = new QueryTask({
            url:
              "http://172.20.89.7:6082/arcgis/rest/services/NewDataLuChengYiQinag/rujingshuju/MapServer/0",
          });
          const query = new Query();
          query.outFields = ["*"];
          query.returnGeometry = true;
          query.where = `1 = 1`;
          const { features } = await queryTask.execute(query);
          resolve(features.length || 0);
        });
      });
    },

    filterItem(index) {
      // this.$parent.$refs.bqtj.filterItem(0);
    },
    hidden() {
      this.icon_show = !this.icon_show;
    },
    //下拉菜单
    toggleTree(label, index) {
      for (let v in this.tree) {
        if (this.tree[v].label == label) {
          this.tree[v].show = !this.tree[v].show;
        }
      }
    },
    //触发父元素
    changeTree(item, index, oitem) {
      this.intercept(item, index, oitem);
    },
    stop(e) {
      e.stopPropagation();
    },
    changeBox(item, index) {
      const c = this.tree[index].check;
      for (let i in this.tree[index].children) {
        this.tree[index].children[i].check = c;
      }

      // 全国与鹿城互斥
      if (index != 0 && c) {
        this.tree[0].check = false;
      } else if (index == 0 && c) {
        this.tree.map((k, i) => {
          if (i != 0) {
            k.check = false;
            k.children.map((_k) => {
              _k.check = false;
            });
          }
        });
      }
      this.$parent.nationwideShow = this.tree[0].check;
    },

    ShowListxq(oitem, item) {
      this.$parent.listShow = true;
      this.$parent.$refs.listxq.getItem(oitem, item.label);
    },
    ShowSamplingDetail(oitem, item) {
      this.$parent.samplingDetailShow = true;
      this.$parent.$refs.samplingDetail.getItem(oitem, item.label);
    },
    ShowQuarantineDetail(oitem, item) {
      this.$parent.quarantineDetailShow = true;
      this.$parent.$refs.quarantineDetail.getItem(oitem, item.label);
    },
    ShowCommunityDetail(oitem, item) {
      this.$parent.communityDetailShow = true;
      this.$parent.$refs.communityDetail.getItem(oitem, item.label);
    },
    ShowListssry(oitem, item) {
      this.$parent.leftHidden();
      this.$parent.rightHidden();
      this.$parent.legend();
      this.$parent.$refs.ssryForm.getItem();
      this.$parent.$refs.lsryForm.getItem();
    },
    ShowListfgxq(oitem, item) {
      this.$parent.leftHidden();
      this.$parent.rightHidden();
      this.$parent.legend();
      this.$parent.$refs.fgxqForm.getItem();
      this.$parent.$refs.fgtjForm.getItem();
    },
    intercept(item, index, oitem) {
      const _tree = this.$util.clone(this.tree);
      for (let i = 1; i < _tree.length; i++) {
        let shall = true;
        _tree[i].children.length
          ? _tree[i].children.map((_item) => {
              if (!_item.check) {
                shall = false;
              }
            })
          : (shall = false);
        _tree[i].check = shall;
      }

      // 全国与鹿城互斥
      if (index != 0 && oitem.check) {
        _tree[0].check = false;
      }

      this.tree = _tree;
      this.$parent.leftOptions = this.tree;
      this.$parent.nationwideShow = this.tree[0].check;
    },
    clean() {
      const _tree = this.$util.clone(this.tree);
      for (let i = 0; i < _tree.length; i++) {
        _tree[i].children.length
          ? _tree[i].children.map((item) => {
              item.check = false;
            })
          : null;
        _tree[i].check = false;
      }
      this.tree = _tree;
      this.$parent.leftOptions = this.tree;
      // 清除热力图
      this.$parent.$refs.macroArcgis.removeHeat();
      // 清除空间查询
      this.$parent.$refs.macroArcgis.cleanQuery();
      // 关闭密接面板
      this.$parent.$refs.mjChart.list = [];

      // 关闭隔离点面板
      this.$parent.$refs.gldxq.list = [];

      // 关闭小区面板
      this.$parent.$refs.ssryForm.list = [];
      this.$parent.$refs.lsryForm.sArr = [];

      // 清除小区点
      this.$parent.$refs.macroArcgis.map &&
        this.$parent.$refs.macroArcgis.map.findLayerById("xqd") &&
        this.$parent.$refs.macroArcgis.map.remove(
          this.$parent.$refs.macroArcgis.map.findLayerById("xqd")
        );

      // 关闭工地返工面板
      this.$parent.$refs.fgxqForm.list = [];
      this.$parent.$refs.fgtjForm.list = [];

      // 关闭员工面板
      this.$parent.$refs.njqyForm.list = [];
    },
    change(id) {
      const that = this;

      let checked;

      if (id == "jjgl") {
        checked = this.check1 = !this.check1;
      } else if (id == "hbhw") {
        checked = this.check2 = !this.check2;
      }

      this.$parent.$refs.macroArcgis.changeHeat(id, checked);
    },
  },
  watch: {
    tree: {
      handler: function () {},
      deep: true,
    },
    imgUrl: {
      handler(newVal, val) {
        this.URL = newVal;
      },
      immediate: true,
    },
    leftOptions(newV, oldV) {
      this.tree = newV;
    },
  },
};
</script>
<style scoped lang="less">
// @import url("../css/style.less");
@import url("../../common/_iconfont/iconfont.css");
.leftMultiSelect {
  height: 100%;
  border-right: 1px solid;
  background: linear-gradient(
    180deg,
    rgba(0, 63, 189, 0.6) 0%,
    rgba(5, 53, 129, 0.6) 100%
  );
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.4),
    0px 0px 44px 0px rgba(16, 146, 236, 0.3);

  border-image: linear-gradient(
      360deg,
      rgba(7, 73, 190, 0) 0%,
      rgba(0, 172, 255, 0.4) 32%,
      rgba(0, 255, 255, 0.8) 51%,
      rgba(0, 172, 255, 0.4) 73%,
      rgba(7, 73, 190, 0) 100%
    )
    1 10;

  .topic {
    height: 100%;
    overflow: hidden;
    border-top: 1px solid;
    border-image: linear-gradient(
        270deg,
        rgba(7, 73, 190, 0.6) 0%,
        rgba(89, 199, 252, 1) 51%,
        rgba(7, 73, 190, 0.6) 100%
      )
      1 10;

    header {
      height: 40px;
      line-height: 50px;
      text-align: center;
      font-size: 20px;
      color: #4cd7ec;
      text-shadow: 0px 0px 4px rgba(76, 215, 236, 0.3);
      // padding-left: 20px;
      cursor: pointer;
      .active {
        font-weight: 700;
        color: #fff;
      }
      i {
        font-style: normal;
        margin: 0 10px;
      }
    }
    .selectFrame::-webkit-scrollbar {
      display: none;
    }
    .selectFrame {
      height: calc(100% - 40px);
      overflow-y: auto;
      box-sizing: border-box;
      padding: 10px;
      text-align: left;

      > div {
        > span {
          display: block;
          height: 52px;
          line-height: 54px;
          height: 52px;
          background: rgba(102, 164, 255, 0.45);
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding-left: 12px;
          font-size: 18px;
          margin-bottom: 10px;
          i {
            cursor: pointer;
            color: #fff;
            float: right;
            padding-right: 15px;
            font-size: 40px;
          }
        }
        > ul:first-child {
          color: rgba(42, 255, 250, 1);
        }
      }

      ul {
        width: 100%;
        box-sizing: border-box;
        .sub {
          height: 30px;
          line-height: 10px;
          margin-left: 40px;
          width: 70%;
          float: right;
          padding-left: 10px;
          position: relative;
          p {
            font-size: 16px;
            line-height: 22px;
          }
        }
        .sub:before {
          content: "|_";
          position: absolute;
          left: -20px;
          top: 4px;
        }
        li {
          height: 44px;
          line-height: 28px;
          list-style: none;
          background: rgba(120, 171, 246, 0.2);
          box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 4px;
          padding-left: 22px;
          margin-bottom: 10px;
          // display: inline-block;
          width: 90%;
          // justify-content: space-between;

          display: flex;
          align-items: center;

          p {
            flex: 1;
            font-size: 18px;
            cursor: pointer;
            line-height: 18px;
            display: inline-block;
            // width: 158px;
            position: relative;
            // top: 5px;
            img {
              width: 24px;
              height: 24px;
              margin-right: 10px;
              position: relative;
              top: 6px;
            }
            span {
              background: unset;
              margin-bottom: unset;
              display: unset;
              box-shadow: none;
            }
          }
          #xq {
            background: unset;
            margin-bottom: unset;
            display: unset;
            box-shadow: none;
            background-color: #162449 !important;
            border: 1px solid #75c8f4 !important;
            border-radius: 8px;
            padding: 7px 9px !important;
            color: #fff;
            cursor: pointer;
            width: 36px !important;
            height: 20px !important;
            font-size: 14px !important;
            line-height: 23px !important;
            margin-left: auto;
            // margin-top: 4px;
            text-align: center;
            // float: right;
          }
          #ssry,
          #fgxq {
            background: unset;
            margin-bottom: unset;
            display: unset;
            box-shadow: none;
            background-color: #162449 !important;
            border: 1px solid #75c8f4 !important;
            border-radius: 8px;
            padding: 7px 9px !important;
            color: #fff;
            cursor: pointer;
            width: 56px !important;
            height: 20px !important;
            font-size: 14px !important;
            line-height: 23px !important;
            margin-left: auto;
            // margin-top: 4px;
            text-align: center;
            // float: right;
          }
          .switch {
            top: -10px;
          }
          input[type="checkbox"] {
            top: 0px;
            left: -8px;
          }
        }
      }
    }
    .map_content {
      height: 3%;
      display: flex;
    }
    .map_content div {
      width: 33%;
      padding: 2%;
    }
    .map_content span {
      color: #fff;
      font-size: 13px;
      margin-left: 5px;
    }
  }
  .blueBorder {
    height: unset !important;
  }
  /*  input   */
  input[type="checkbox"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    /*编辑我们自己的样式*/
    position: relative;
    width: 18px;
    height: 18px;
    // transform : translate(-9px, -8px);
    background: rgba(21, 249, 253, 0.66);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border: 0px;
    outline: none;
    cursor: pointer;
    top: 2px;
    margin-right: 2px;
  }

  input[type="checkbox"]:after {
    content: "√";
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    color: #fff;
    text-align: center;
    line-height: 24px;
    /*增加动画*/
    -webkit-transition: all ease-in-out 300ms;
    -moz-transition: all ease-in-out 300ms;
    transition: all ease-in-out 300ms;
    /*利用border-radius和opacity达到填充的假象，首先隐藏此元素*/
    -webkit-border-radius: 20px;
    -moz-border-radius: 20px;
    border-radius: 20px;
    opacity: 0;
  }

  input[type="checkbox"]:checked:after {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    opacity: 1;
  }
}
</style>