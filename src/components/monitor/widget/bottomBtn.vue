<template>
  <div id="btnDiv">
    <div class="btn-row">
      <button type="button" class="btnClass btnCircle" @click="warning">
        <i class="el-icon-alarm-clock"></i>
      </button>
      <button type="button" class="btnClass" :class="{active:cgdkTag}" @click="cgdk">拆改地块</button>
      <button type="button" class="btnClass" :class="{active:zddkTag}" @click="zddk">做地地块</button>
      <button type="button" class="btnClass" :class="{active:xzqhTag}" @click="xzqh">五色风险评估</button>
      <button type="button" class="btnClass" :class="{active:kgtTag}" @click="kgt">控规图</button>
      <button type="button" class="btnClass" :class="{active:yxtTag}" @click="yxt">影像图</button>
      <button type="button" class="btnClass" :class="{active:sltTag}" @click="slt">矢量图</button>
      <el-dropdown id="dropClass" @command="handleCommand">
        <el-button type="primary">
          资源分布
          <i class="el-icon-arrow-up el-icon--right"></i>
        </el-button>
        <el-dropdown-menu class="menuClass" slot="dropdown">
          <el-dropdown-item command="a" :class="{'drop-active':ylzyTag}">医疗资源</el-dropdown-item>
          <el-dropdown-item command="b" :class="{'drop-active':jyzyTag}">教育资源</el-dropdown-item>
          <el-dropdown-item command="c" :class="{'drop-active':gdjtTag}">轨道交通</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <button type="button" class="btnClass" @click="clean">清除</button>
    </div>
    <!-- <ul>
      <li class="warning" @click="warning">!</li>
      <li :class="{active:cgdkTag}" @click="cgdk">拆改地块</li>
      <li :class="{active:ylzyTag}" @click="mapImageToggle(`ylzy`)">医疗资源</li>
      <li :class="{active:jyzyTag}" @click="mapImageToggle(`jyzy`)">教育资源</li>
      <li :class="{active:zddkTag}" @click="zddk">做地地块</li>
      <li :class="{active:xzqhTag}" @click="xzqh">五色风险评估</li>
      <li :class="{active:kgtTag}" @click="kgt">控规图</li>
      <li :class="{active:gdjtTag}" @click="mapImageToggle(`gdjt`)">轨道交通</li>
      <li class="hover">
        资源分布
        <div>
          <ul class="subList">
            <li :class="{active:ylzyTag}" @click="mapImageToggle(`ylzy`)">医疗资源</li>
            <li :class="{active:jyzyTag}" @click="mapImageToggle(`jyzy`)">教育资源</li>
            <li :class="{active:gdjtTag}" @click="mapImageToggle(`gdjt`)">轨道交通</li>
          </ul>
        </div>
      </li>
      <li :class="{active:yxtTag}" @click="yxt">影像图</li>
      <li :class="{active:sltTag}" @click="slt">矢量图</li>
      <li @click="clean">清除</li>
    </ul>-->
  </div>
</template>

<script>
/* eslint-disable */
import { mapImageLayerList } from "../config/mapImage";
export default {
  name: "bottomBtn",
  data() {
    return {
      mapImageLayerList,
      gdjtTag: false,
      ylzyTag: false,
      jyzyTag: false,
      zddkTag: true,
      xzqhTag: true,
      kgtTag: false,
      yxtTag: false,
      sltTag: true,
      cgdkTag: false
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    handleCommand(command) {
      // this.$message("click on item " + command);
      if (command == "a") {
        this.mapImageToggle(`ylzy`);
      } else if (command == "b") {
        this.mapImageToggle(`jyzy`);
      } else if (command == "c") {
        this.mapImageToggle(`gdjt`);
      }
    },
    warning() {
      this.$parent.warnShow = true;
    },

    // mapImageLayer 图层切换
    mapImageToggle(id) {
      this.$parent.$refs.monitorArcgis.layerToggle(mapImageLayerList[id]);
    },

    cgdk() {
      this.$parent.$refs.monitorArcgis.cgdk();
    },

    zddk() {
      this.$parent.$refs.monitorArcgis.zddk();
    },
    xzqh() {
      this.$parent.$refs.monitorArcgis.changeChanyePlate();
    },
    yxt() {
      this.$parent.$refs.monitorArcgis.yxt();
    },
    slt() {
      this.$parent.$refs.monitorArcgis.slt();
    },
    kgt() {
      this.$parent.$refs.monitorArcgis.kgt();
    },

    // 清除
    clean() {
      this.hideLayerMany([
        "chanyePlate",
        "zddk",
        "dkImage",
        "kg",
        "jyzy",
        "ylzy",
        "gdjt",
        "cgdk",
        "cgImage",
        "cgName",
        "yjdk",
        "csdk"
      ]);

      this.$parent.$refs.monitorArcgis.view.graphics.removeAll();
      this.$parent.$refs.monitorArcgis.view.popup.visible = false;

      this.$parent.$refs.topDate.filterItem();

      this.gdjtTag = false;
      this.ylzyTag = false;
      this.jyzyTag = false;
      this.zddkTag = false;
      this.xzqhTag = false;
      this.kgtTag = false;
      this.cgdkTag = false;
    },
    // 隐藏单个图层
    hideLayerById(id) {
      this.$parent.$refs.monitorArcgis.map &&
        this.$parent.$refs.monitorArcgis.map.findLayerById(id) &&
        (this.$parent.$refs.monitorArcgis.map.findLayerById(
          id
        ).visible = false);
    },
    // 隐藏多个图层
    hideLayerMany(arr) {
      if (Array.isArray(arr)) {
        arr.map(id => {
          this.$parent.$refs.monitorArcgis.map &&
            this.$parent.$refs.monitorArcgis.map.findLayerById(id) &&
            (this.$parent.$refs.monitorArcgis.map.findLayerById(
              id
            ).visible = false);
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
#btnDiv {
  position: absolute;
  bottom: 2%;
  right: 27%;
  z-index: 20;

  .btn-row {
    box-sizing: border-box;

    .btnClass {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background-color: #409eff;
      border: 1px solid #409eff;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      outline: 0;
      margin: 0;
      -webkit-transition: 0.1s;
      transition: 0.1s;
      font-weight: 500;
      padding: 12px;
      font-size: 16px;
      border-radius: 4px;
      color: #fff;
    }

    .btnClass + .btnClass,
    .btnClass:last-child,
    .el-dropdown {
      margin-left: 5px;
    }

    .btnCircle {
      padding: 12px;
      margin-right: 5px;
      background: #ffa901;
      border-radius: 50%;
      animation: spotChange 2s ease;
      -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
      animation-iteration-count: infinite;

      i {
        font-family: element-icons !important;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        font-variant: normal;
        text-transform: none;
        line-height: 1;
        vertical-align: baseline;
        display: inline-block;
        -webkit-font-smoothing: antialiased;
      }

      i::before {
        content: "\E703";
      }
    }

    .active {
      color: #0ff;
      font-weight: bolder;
      background: #243968;
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.4),
        0px 0px 44px 0px rgba(16, 146, 236, 0.3);
    }
  }

  /* > ul {
    .warning {
      color: #000;
      background-color: #ffa901;
      border: 1px solid #fff138;
      border-radius: 50%;
      padding: 0px 16px;
      margin-right: 30px;
      font-size: 26px;
      font-weight: bolder;
      animation: spotChange 2s ease;
      -webkit-animation-iteration-count: infinite;
      -moz-animation-iteration-count: infinite;
      animation-iteration-count: infinite;
    }

    > li {
      height: 43px;
      line-height: 43px;
      list-style: none;
      float: left;
      background-color: #243968;
      border: 1px solid #05fff8;
      padding: 0px 7px;
      margin-left: 5px;
      cursor: pointer;
      overflow: hidden;

      div {
        margin-top: -172px;

        ul li {
          height: 21px;
          line-height: 21px;
          list-style: none;
          background-color: #243968;
          border: 1px solid #05fff8;
          padding: 10px 10px;
          cursor: pointer;
        }
      }
    }

    .active {
      color: #0ff;
      font-weight: bolder;
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.4),
        0px 0px 44px 0px rgba(16, 146, 236, 0.3);
    }

    .hover {
      // padding: 10px 0px;
    }

    .hover:hover {
      overflow: visible;
    }
  } */
}

// 预警闪烁动画
@keyframes spotChange {
  0% {
    border: 1px solid #fff138;
    box-shadow: 0 0 10px 5px rgba(255, 241, 56, 0.8);
  }

  50% {
    border: 1px solid #fff;
    box-shadow: 0 0 10px 5px rgba(255, 241, 56, 0.3);
  }

  100% {
    border: 1px solid #fff138;
    box-shadow: 0 0 10px 5px rgba(255, 241, 56, 0.8);
  }
}
</style>