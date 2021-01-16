<template>
  <div class="block_container">
    <div class="Com_map">
      <commonArcgis id="blockArcgis" ref="blockArcgis" :dkitem="dkitem" />
    </div>
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
export default {
  name: "Block",
  data() {
    return {
      icon_show_left: true,
      moveLeft: "360",
      getParam: null,
      dkitem: null
    };
  },
  components: {
    commonArcgis
  },
  props: {
    items: Object
  },
  watch: {
    items: {
      handler(newV, oldV) {
        // console.log("itemChange2", newV, oldV);
        this.getParam = newV;
        this.dkitem = newV;
        // this.doFun(this.getParam);
      },
      // deep: true,
      // immediate: true
    }
  },
  created() {
    // console.log("c-list", this.$route);
  },
  mounted() {
    // 图例位置偏移
    setTimeout(() => {
      this.legend();
      // this.getParam && (this.getParam = null);
      // console.log("item2", this.getParam);
    }, 10);
  },
  destroyed() {
    // console.log("destroyed");
    // console.log("item3", this.getParam);
    // this.getParam && (this.getParam = null);
    // console.log("item3", this.getParam);
  },
  methods: {
    legend() {
      if (!this.icon_show_left) {
        $("body .esri-ui-bottom-left").css({ left: "360px" });
      } else {
        $("body .esri-ui-bottom-left").css({ left: "20px" });
      }
    },
    doFun(param) {
      console.log("param", param);
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./Block.less");
</style>