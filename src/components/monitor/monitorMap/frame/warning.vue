<template>
  <transition name="fade">
    <div id="warning" @click="close">
      <span class="title">项目预警</span>
      <span class="time">{{ time }}</span>
      <div id="table" @click="stop">
        <el-table
          :data="tableData"
          height="100%"
          border
          @row-click="clickTr"
          :cell-class-name="tableRowClassName"
        >
          >
          <el-table-column prop="index" label="序号" sortable width="120"></el-table-column>
          <el-table-column prop="DKMC" label="地块名称" sortable></el-table-column>
          <el-table-column prop="GZNR" label="工作内容" sortable></el-table-column>
          <el-table-column prop="SJJD" label="时间节点" sortable></el-table-column>
          <el-table-column prop="ZRKS" label="责任科室" sortable></el-table-column>
          <el-table-column prop="ZT" label="状态" sortable width="230"></el-table-column>
        </el-table>
      </div>
      <span id="tip">点击空白处关闭</span>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { WRT_config, OPTION } from "@/components/common/Tmap";
export default {
  name: "warning",
  data() {
    return {
      time: "",
      tableData: []
    };
  },
  created() {
    const that = this;

    // 做地方案
    const plan_Data = this.$window.plan_Data;
    this.plan_Data = plan_Data;
  },
  mounted() {
    setInterval(() => {
      this.getTime();
    }, 1000);

    const that = this;

    // 30天时间戳
    const deadlineStamp = new Date(
      new Date().getTime() + 30 * 24 * 60 * 60 * 1000
    ).valueOf();

    // 当前时间戳
    const nowStamp = new Date().valueOf();

    // 正则匹配
    const reg = new RegExp("[年]{1}.*[月]{1}.*[日]{1}");

    const list = Object.keys(that.plan_Data).map(k => {
      that.plan_Data[k].map(v => {
        if (reg.test(v.date)) {
          const newDate = v.date
            .replace("年", "-")
            .replace("月", "-")
            .replace("日", "");

          const newDateStamp = new Date(newDate).valueOf();

          if (newDateStamp < deadlineStamp) {
            that.tableData.push({
              DKMC: k,
              GZNR: v.gznr,
              SJJD: v.date,
              ZRKS: v.zrks,
              ZT: newDateStamp <= nowStamp ? "已过时间节点" : "即将到达时间节点"
            });
          }
        }
      });
    });

    this.tableData
      .sort((a, b) => {
        const date_a = new Date(
          a.SJJD.replace("年", "-")
            .replace("月", "-")
            .replace("日", "")
        ).valueOf();

        const date_b = new Date(
          b.SJJD.replace("年", "-")
            .replace("月", "-")
            .replace("日", "")
        ).valueOf();

        return date_a - date_b;
      })
      .map((item, index) => {
        item.index = index + 1;
      });
  },
  methods: {
    close() {
      this.$parent.warnShow = false;
    },
    stop(e) {
      e.stopPropagation();
    },
    // 表格行点击事件
    clickTr(row, column, event) {
      const that = this;

      loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
        OPTION
      ).then(async ([QueryTask, Query]) => {
        const queryTask = new QueryTask({
          url: `http://172.20.89.7:6082/arcgis/rest/services/lucheng/ZDDK/MapServer/0`
        });
        const query = new Query();
        query.outFields = ["*"];
        query.returnGeometry = true;
        query.where = `GLZD = '${row.DKMC}'`;

        const { fields, features } = await queryTask.execute(query);

        const fieldAliases = {};
        fields.map(item => {
          fieldAliases[item.name] = item.alias;
        });
        const list = features.map(item => {
          item.id = "zddk";
          item.fieldAliases = fieldAliases;
          return item;
        });

        that.$parent.rightHidden();
        that.$parent.$refs.monitorArcgis.goloaction(list[0]);

        that.$parent.$refs.dkxqForm.getItem(list[0].attributes);
        that.$parent.dkxqShow = true;
        that.$parent.warnShow = false;
      });
    },
    tableRowClassName({ row, column, rowIndex, columnIndex }) {
      // console.log("row", row);
      if (columnIndex == 5) {
        if (row.ZT === "即将到达时间节点") {
          return "warning-row";
        } else if (row.ZT === "已过时间节点") {
          return "timeout-row";
        }
        return "";
      }
    },
    //获取当前时间
    getTime() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      //以下代码依次是获取当前时间的年月日时分秒
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var minute = date.getMinutes();
      var hour = date.getHours();
      var second = date.getSeconds();
      //固定时间格式
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      var currentdate =
        year +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hour +
        seperator2 +
        minute +
        seperator2 +
        second;
      this.time = currentdate;
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

  .title {
    position: absolute;
    left: 12%;
    bottom: 82%;
    font-size: 34px;
    font-weight: bolder;
    letter-spacing: 4px;
    font-style: italic;
  }

  .time {
    position: absolute;
    right: 11%;
    bottom: 81%;
    font-size: 28px;
  }

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