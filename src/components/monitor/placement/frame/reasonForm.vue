<template>
  <div id="reasonForm" v-if="options!=null">
    <div class="title">
      <a @click="()=>{ options=null }">×</a>
    </div>

    <div class="content">
      <table border="0" cellpadding="0" cellspacing="0">
        <tr>
          <td style="width: 30%;">责任人</td>
          <td>{{ zrr }}</td>
        </tr>
        <tr>
          <td>具体原因</td>
          <td>{{ jtyy }}</td>
        </tr>
        <tr>
          <td>时间节点</td>
          <td>{{ sjjd }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "reasonForm",
  data() {
    return {
      jtyy: null,
      zrr: null,
      sjjd: null,
      options: null
    };
  },
  created() {},
  methods: {
    showReason(options) {
      this.options = options;

      if (this.options != null) {
        this.jtyy = this.options.jtyy != "/" ? this.options.jtyy : "暂无数据";
        this.zrr = this.options.zrr != "/" ? this.options.zrr : "暂无数据";
        this.sjjd = this.options.sjjd != "/" ? this.options.sjjd : "暂无数据";
      }
    }
  }
};
</script>

<style lang="less" scoped>
#reasonForm {
  width: 88%;
  height: 92%;
  position: absolute;
  left: 6%;
  bottom: 6%;
  z-index: 40;
  background: linear-gradient(
    180deg,
    rgba(0, 63, 189, 0.8) 0%,
    rgba(5, 53, 129, 0.8) 100%
  );

  box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.4),
    0px 0px 44px 0px rgba(16, 146, 236, 0.3);

  .title {
    text-align: right;
    padding-right: 10px;
    a {
      font-size: 30px;
      cursor: pointer;
    }
  }

  .content {
    height: 80%;
    padding: 0px 10px;
    margin: 0px 5px;
    overflow: auto;

    table {
      border: 1px solid #ccc;
      width: 100%;

      td {
        border: 1px solid #ccc;
        padding: 10px 5px;
        text-align: justify;
      }
    }
  }

  .content::-webkit-scrollbar {
    display: block;
    width: 10px;
    background-color: #1a3561;
    border-radius: 10px;
  }
  .content::-webkit-scrollbar-thumb {
    width: 10px;
    background-color: #45cdff;
    border-radius: 10px;
  }
}
</style>