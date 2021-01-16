<template>
  <div class="placement_container">
    <div class="Com_map">
      <commonArcgis id="placementArcgis" ref="placementArcgis" :leftOptions="leftOptions" />
    </div>
    <div class="Com_container">
      <div :class="`leftside animated ${icon_show_left?`slideOutLeft`:`slideInLeft`}`">
        <leftMultiSelect :leftOptions="leftOptions" ref="leftOptions" />
        <span @click="toggle(), legend()" class="hidden_button"></span>
      </div>
      <div :class="`rightside animated ${icon_show_right?`slideOutRight`:`slideInRight`}`">
        <div id="rightFrame">
          <crtj ref="crtj" />
          <crjz ref="crjz" />
          <tdyt ref="tdyt" />
        </div>
        <span @click="toggle2" class="hidden_right_button"></span>
      </div>
    </div>
    <topDate ref="topDate" />
    <xzDate />
    <bottomBtn ref="bottomBtn" />
    <dkxqForm ref="dkxqForm" v-show="dkxqShow" :style="{right:moveRight + 'px'}" />
    <dkList v-show="listShow" />
  </div>
</template>

<script>
/**
 * 为避免传值紊乱,建议用ref直接传值或调用触发更新
 * [例] this.$parent.ref.macroArcgis.goLocation(item) 可以直接在<RightDiv>跨模块调用(从列表模块到父模块,再到地图模块)
 * 使用场景:
 * 1.点击勾选左侧,右侧列表Object[]的替换
 * 2.点击列表<RightDiv>,地图<commonArcgis>定位并显示内容
 */
/* eslint-disable */
import commonArcgis from "./Arcgis";
import leftMultiSelect from "./widget/leftMultiSelect";

import topDate from "./widget/topDate";
import xzDate from "./widget/xzDate";
import bottomBtn from "./widget/bottomBtn";

// chartTable
import crtj from "./rightDiv/crtj";
import crjz from "./rightDiv/crjz";
import tdyt from "./rightDiv/tdyt";

// 地块详情
import dkxqForm from "./frame/dkxqForm";
// 地块列表
import dkList from "./frame/dkList";

import { leftOptions } from "./config/enums";

import { mapState, mapActions } from "vuex";

export default {
  name: "Placement",
  data() {
    return {
      icon_show_left: false,
      icon_show_right: false,
      leftOptions,
      moveLeft: "360",
      moveRight: "500",
      dkxqShow: false,
      listShow: false
    };
  },
  components: {
    commonArcgis,
    leftMultiSelect,

    // 顶部数据
    topDate,
    // 详情须知
    xzDate,
    // 底部按钮
    bottomBtn,

    // 出让统计
    crtj,
    // 出让价值
    crjz,
    // 土地用途
    tdyt,
    // 地块详情
    dkxqForm,
    // 地块列表
    dkList
  },
  created() {},
  mounted() {
    !this.zdjzList.length && this.fetchzdjzList();
    !this.dkxxList.length && this.fetchdkxxList();
    console.log("placement");
  },
  computed: {
    ...mapState({
      zdjzList: state => state.zdjzList,
      dkxxList: state => state.dkxxList
    })
  },
  methods: {
    ...mapActions(["fetchzdjzList", "fetchdkxxList"]),
    toggle() {
      this.icon_show_left = !this.icon_show_left;
      this.moveLeft = !this.icon_show_left ? "360" : "20";
    },
    toggle2() {
      this.icon_show_right = !this.icon_show_right;
      this.moveRight = !this.icon_show_right ? "500" : "20";
    },
    leftHidden() {
      this.icon_show_left = true;
      this.moveLeft = "20";
    },
    rightHidden() {
      this.icon_show_right = true;
      this.moveRight = "20";
    },
    legend() {
      if (!this.icon_show_left) {
        $("body .esri-ui-bottom-left").css({ left: "360px" });
      } else {
        $("body .esri-ui-bottom-left").css({ left: "20px" });
      }
    }
  }
};
</script>
<style scoped lang="less">
@import url("./Placement.less");
</style>