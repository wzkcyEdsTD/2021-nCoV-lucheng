<template>
  <div class="Com_content Macroscopic">
    <div class="toptab_time">
      <p>截至日期：{{$window.nCov_luchengData.macroscopic.updateTime}}</p>
    </div>
    <div class="Com_map">
      <commonArcgis id="macroArcgis" ref="macroArcgis" :leftOptions="leftOptions" />
    </div>
    <div class="Com_container">
      <div :class="`leftside animated ${icon_show_left?`slideOutLeft`:`slideInLeft`}`">
        <leftMultiSelect :leftOptions="leftOptions" ref="leftOptions" />
        <span @click="toggle(), legend()" class="hidden_button"></span>
      </div>
      <div :class="`rightside animated ${icon_show_right?`slideOutRight`:`slideInRight`}`">
        <div id="rightFrame">
          <bqtj ref="bqtj" />
          <bqtj2 ref="bqtj2" />
          <sbDate ref="table" />
        </div>
        <span @click="toggle2" class="hidden_right_button"></span>
      </div>
    </div>
    <topDate />
    <xzDate />
    <bottomBtn />

    <sbxq ref="sbxq" v-show="xqShow" />
    
    <xqjck ref="xqjck" v-show="xqjckShow" />
    <mjChart ref="mjChart" :style="{left:moveLeft + 'px'}" />
    <streetFrame ref="cpFrame" :style="{left:moveLeft + 'px'}" />
    <listxq ref="listxq" v-show="listShow" />
    <queryForm ref="queryForm" :style="{left:moveLeft + 'px'}" />
    <qzTable ref="qzTable" :style="{left:(Number(moveLeft) + Number(520)) + 'px'}" /> 
    <gldxq ref="gldxq" :style="{left:moveLeft + 'px'}" />

    <ssryForm ref="ssryForm" :style="{left:moveLeft + 'px'}" />
    <lsryForm ref="lsryForm" :style="{right:moveRight + 'px'}" />
    
    <fgxqForm ref="fgxqForm" :style="{left:moveLeft + 'px'}" />
    <fgtjForm ref="fgtjForm" :style="{right:moveRight + 'px'}" />

    <njqyForm ref="njqyForm" :style="{left:moveLeft + 'px'}" />
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
import commonArcgis from "./Arcgis";
import leftMultiSelect from "./widget/leftMultiSelect";

import topDate from "./widget/topDate";
import xzDate from "./widget/xzDate";
import bottomBtn from "./widget/bottomBtn";

//  chartTable
import bqtj from "./rightDiv/bqtj";
import bqtj2 from "./rightDiv/bqtj2";
import sbDate from "./rightDiv/sbDate";
import sbxq from "./pop/sbxq";

import mjChart from "./frame/mjChart";
import streetFrame from "./frame/streetFrame";
import listxq from "./pop/listxq";
import queryForm from "./pop/queryForm";
import qzTable from "./frame/qzTable";
import gldxq from "./pop/gldxq";
import xqjck from "./pop/xqjck";
import ssryForm from "./pop/ssryForm";
import lsryForm from "./pop/lsryForm";
import fgxqForm from "./pop/fgxqForm";
import fgtjForm from "./pop/fgtjForm";

import njqyForm from "./pop/njqyForm";

import { leftOptions } from "./config/enums";

import { mapState, mapActions } from "vuex";

export default {
  name: "macroscopic",
  data() {
    return {
      icon_show_left: false,
      icon_show_right: false,
      leftOptions,
      xqShow: false,
      listShow: false,
      xqjckShow: false,
      moveLeft: "360",
      moveRight: "500"
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

    // 病例统计
    bqtj,
    // 趋势分析
    bqtj2,
    // 上报动态数据
    sbDate,
    // 上报详情
    sbxq,

    // 密接列表、图表
    mjChart,
    // 街道疫情
    streetFrame,
    // 列表详情框
    listxq,
    // 空间查询结果
    queryForm,
    // 圈主信息
    qzTable,
    // 隔离点详情
    gldxq,
    // 小区进出口人员详情
    xqjck,
    // 实时人员
    ssryForm,
    // 历史人员
    lsryForm,
    // 返工信息
    fgxqForm,
    // 返工统计
    fgtjForm,

    // 南郊企业员工
    njqyForm
  },
  created() {},
  mounted() {
    !this.crjlList.length && this.fetchcrjlList();
    !this.ryxxList.length && this.fetchryxxList();
  },
  computed: {
    ...mapState({
      crjlList: state => state.crjlList,
      ryxxList: state => state.ryxxList
    })
  },
  methods: {
    ...mapActions(["fetchcrjlList", "fetchryxxList"]),
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
@import url("./Macroscopic.less");
</style>