<template>
  <div id="btnDiv">
    <ul>
      <li :class="{active:azfyTag}">安置房源</li>
      <li :class="{active:zddkTag}" @click="zddk">做地地块</li>
      <li :class="{active:xzqhTag}" @click="xzqh">五色风险评估</li>
      <li :class="{active:kgtTag}" @click="kgt">控规图</li>
      <li @click="yxt">影像图</li>
      <li @click="slt">矢量图</li>
      <li @click="clean">清除</li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "bottomBtn",
  data() {
    return {
      azfyTag: true,
      zddkTag: true,
      xzqhTag: true,
      kgtTag: false
    };
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    zddk() {
      this.$parent.$refs.placementArcgis.zddk();
    },
    xzqh() {
      this.$parent.$refs.placementArcgis.changeChanyePlate();
    },
    yxt() {
      this.$parent.$refs.placementArcgis.yxt();
    },
    slt() {
      this.$parent.$refs.placementArcgis.slt();
    },
    kgt() {
      this.$parent.$refs.placementArcgis.kgt();
    },
    clean() {
      this.$parent.$refs.placementArcgis.map.findLayerById("chanyePlate") &&
        (this.$parent.$refs.placementArcgis.map.findLayerById(
          "chanyePlate"
        ).visible = false);
      this.$parent.$refs.placementArcgis.map.findLayerById("zddk") &&
        (this.$parent.$refs.placementArcgis.map.findLayerById(
          "zddk"
        ).visible = false);
      this.$parent.$refs.placementArcgis.map.findLayerById("dkImage") &&
        (this.$parent.$refs.placementArcgis.map.findLayerById(
          "dkImage"
        ).visible = false);
      this.$parent.$refs.placementArcgis.map.findLayerById("kg") &&
        (this.$parent.$refs.placementArcgis.map.findLayerById(
          "kg"
        ).visible = false);
      this.$parent.$refs.placementArcgis.view.graphics.removeAll();
      this.$parent.$refs.placementArcgis.view.popup.visible = false;

      this.$parent.$refs.topDate.filterItem();

      this.azfyTag = false;
      this.zddkTag = false;
      this.xzqhTag = false;
      this.kgtTag = false;
    }
  }
};
</script>

<style lang="less" scoped>
#btnDiv {
  position: absolute;
  bottom: 2%;
  right: 35%;
  z-index: 20;

  > ul {
    .warning {
      color: #000;
      background-color: #ffa901;
      border: 1px solid #fff138;
      padding: 0px 16px;
      margin-right: 30px;
      font-size: 18px;
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
      padding: 0px 10px;
      margin-left: 5px;
      cursor: pointer;
    }

    .active {
      color: #0ff;
      font-weight: bolder;
      box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.4),
        0px 0px 44px 0px rgba(16, 146, 236, 0.3);
    }

    .hover {
      padding: 10px 0px;
    }

    .hover:hover {
      overflow: visible;
    }
  }
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