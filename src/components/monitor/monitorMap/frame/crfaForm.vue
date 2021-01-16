<template>
  <div id="crfaForm">
    <div class="head">
      <span>[ {{ title }} ] 做地方案</span>
      <a @click="()=>{ this.$parent.crfaShow = false }">×</a>
    </div>

    <div class="content">
      <div class="wrapper">
        <div id="fish-bone" class="fish-bone"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { fishBone } from "../../external/fishbone/fishBone2";
export default {
  name: "crfaForm",
  data() {
    return {
      title: null
    };
  },
  created() {
    // 做地方案
    const plan_Data = this.$window.plan_Data;
    this.plan_Data = plan_Data;
  },
  mounted() {
    fishBone(window, jQuery);
  },

  methods: {
    getItem(name) {
      const that = this;
      this.title = name;

      if (that.plan_Data.hasOwnProperty(name)) {
        const list = that.plan_Data[name];
        const option = {
          data: []
        };
        list.map(({ zrks, gznr, date }) => {
          option.data.push({
            label: `<span class="ks_label">责任科室：${zrks}</span>
              <br />
              <span class="nr_label">工作内容：${gznr}</span>`,
            date: `${date.replace("年", "年<br />")}`
          });
        });

        window.fishBone.init(".fish-bone", option);
      } else {
        document.getElementById("fish-bone").innerHTML = "";
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import url("../../external/fishbone/fishBone2.css");
#crfaForm {
  position: absolute;
  top: 21%;
  left: 11%;
  width: 74%;
  height: 58%;
  padding: 1% 2%;
  z-index: 31;
  background: #24386a;
  border: 1px solid #04ecff;
  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.4),
    0px 0px 44px 0px rgba(16, 146, 236, 0.3);

  .head {
    height: 10%;

    span {
      font-size: 30px;
    }

    a {
      position: absolute;
      top: 5px;
      right: 10px;
      font-size: 40px;
      cursor: pointer;
    }
  }

  .content {
    height: 88%;
    display: flex;
    justify-content: space-between;

    .wrapper {
      width: 100%;
      border: 1px solid #eee;
      position: relative;
      margin: 0 auto;
      overflow: auto;
      display: flex;
      align-items: center;
    }
  }
}
</style>