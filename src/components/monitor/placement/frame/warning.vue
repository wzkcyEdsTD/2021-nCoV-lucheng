<template>
  <transition name="fade">
    <div id="warning" @click="close">
      <div id="table" @click="stop">
        <el-table :data="tableData" height="100%" border :cell-class-name="tableRowClassName">
          >
          <el-table-column prop="index" label="序号" sortable width="180"></el-table-column>
          <el-table-column prop="DKMC" label="地块名称" sortable width="180"></el-table-column>
          <el-table-column prop="GZNR" label="工作内容" sortable></el-table-column>
          <el-table-column prop="SJJD" label="时间节点" sortable></el-table-column>
          <el-table-column prop="GZJD" label="工作进度" sortable></el-table-column>
          <el-table-column prop="ZT" label="状态" sortable></el-table-column>
          <el-table-column prop="ZRR" label="责任人" sortable></el-table-column>
          <el-table-column prop="LXFS" label="联系方式" sortable></el-table-column>
        </el-table>
      </div>
      <span id="tip">点击空白处关闭</span>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
export default {
  name: "warning",
  data() {
    return {
      tableData: []
    };
  },
  created() {
    const that = this;

    /* for (let i = 0; i < 10; i++) {
      that.tableData.push({
        // date: "2016-05-02",
        // name: "王小虎",
        // address: "上海市普陀区金沙江路 1518 弄"
        index: i + 1,
        DKMC: "大南街道E-24a",
        GZNR: "土地征收",
        SJJD: "2020年2月14日",
        GZJD: "80%",
        ZT: "已过时间节点",
        ZRR: "李先生",
        LXFS: "0577-88030503"
      });
    } */

    this.tableData = [
      {
        index: 1,
        DKMC: "大南街道E-24a",
        GZNR: "土地征收",
        SJJD: "2020年2月14日",
        GZJD: "80%",
        ZT: "即将到达时间节点",
        ZRR: "李先生",
        LXFS: "0577-88030503"
      },
      {
        index: 2,
        DKMC: "大南街道E-24a",
        GZNR: "土地征收",
        SJJD: "2020年2月14日",
        GZJD: "80%",
        ZT: "已过时间节点",
        ZRR: "李先生",
        LXFS: "0577-88030503"
      },
      {
        index: 3,
        DKMC: "大南街道E-24a",
        GZNR: "土地征收",
        SJJD: "2020年2月14日",
        GZJD: "80%",
        ZT: "即将到达时间节点",
        ZRR: "李先生",
        LXFS: "0577-88030503"
      },
      {
        index: 4,
        DKMC: "大南街道E-24a",
        GZNR: "土地征收",
        SJJD: "2020年2月14日",
        GZJD: "80%",
        ZT: "已过时间节点",
        ZRR: "李先生",
        LXFS: "0577-88030503"
      },
      {
        index: 5,
        DKMC: "大南街道E-24a",
        GZNR: "土地征收",
        SJJD: "2020年2月14日",
        GZJD: "80%",
        ZT: "即将到达时间节点",
        ZRR: "李先生",
        LXFS: "0577-88030503"
      },
      {
        index: 6,
        DKMC: "大南街道E-24a",
        GZNR: "土地征收",
        SJJD: "2020年2月14日",
        GZJD: "80%",
        ZT: "已过时间节点",
        ZRR: "李先生",
        LXFS: "0577-88030503"
      },
      {
        index: 7,
        DKMC: "大南街道E-24a",
        GZNR: "土地征收",
        SJJD: "2020年2月14日",
        GZJD: "80%",
        ZT: "即将到达时间节点",
        ZRR: "李先生",
        LXFS: "0577-88030503"
      },
      {
        index: 8,
        DKMC: "大南街道E-24a",
        GZNR: "土地征收",
        SJJD: "2020年2月14日",
        GZJD: "80%",
        ZT: "已过时间节点",
        ZRR: "李先生",
        LXFS: "0577-88030503"
      },
      {
        index: 9,
        DKMC: "大南街道E-24a",
        GZNR: "土地征收",
        SJJD: "2020年2月14日",
        GZJD: "80%",
        ZT: "已过时间节点",
        ZRR: "李先生",
        LXFS: "0577-88030503"
      },
      {
        index: 10,
        DKMC: "大南街道E-24a",
        GZNR: "土地征收",
        SJJD: "2020年2月14日",
        GZJD: "80%",
        ZT: "已过时间节点",
        ZRR: "李先生",
        LXFS: "0577-88030503"
      }
    ];
  },
  methods: {
    close() {
      this.$parent.warnShow = false;
    },
    stop(e) {
      e.stopPropagation();
    },
    tableRowClassName({ row, column, rowIndex, columnIndex }) {
      if (columnIndex == 5) {
        if (row.ZT === "即将到达时间节点") {
          return "warning-row";
        } else if (row.ZT === "已过时间节点") {
          return "timeout-row";
        }
        return "";
      }
    }
  }
};
</script>

<style lang="less" scoped>
#warning {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  margin: auto;
  z-index: 50;

  #table {
    width: 80%;
    height: 60%;
    position: absolute;
    top: 20%;
    left: 10%;

    // element-table
    .el-table {
      background-color: #24386a;
    }
  }
  #tip {
    position: absolute;
    width: 80%;
    bottom: 15%;
    left: 10%;
    font-size: 23px;
    text-align: right;
    padding-right: 40px;
    box-sizing: border-box;
    letter-spacing: 3px;
  }
}
</style>