<template>
  <div id="communityDetail">
    <div class="head">
      <span>[ {{ title }} ] - 详情列表</span>
      <a
        @click="
          () => {
            this.$parent.communityDetailShow = false;
          }
        "
        >×</a
      >
    </div>
    <div class="tables">
      <div class="table-item">
        <span class="title">核酸检测管理小组名单</span>
        <el-table :data="elList1" height="180" border>
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="cs_name" label="名称"> </el-table-column>
          <el-table-column prop="address" label="地址"> </el-table-column>
          <el-table-column prop="link_man" label="联系人"> </el-table-column>
          <el-table-column prop="link_man_phone" label="联系电话">
          </el-table-column>
        </el-table>
      </div>
      <div class="table-item">
        <span class="title">核酸检测工作小组名单</span>
        <el-table :data="elList2" height="180" border>
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="cs_name" label="名称"> </el-table-column>
          <el-table-column prop="staff" label="工作人员"> </el-table-column>
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="phone" label="联系方式"> </el-table-column>
        </el-table>
      </div>
      <div class="table-item">
        <span class="title">核酸采样点</span>
        <el-table :data="elList3" height="180" border>
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="cs_name" label="名称"> </el-table-column>
          <el-table-column
            prop="cun_charge_man"
            label="社(村)负责人(联络方式)"
            width="220"
          >
          </el-table-column>
          <el-table-column prop="link_man" label="联系人(联络方式)" width="220">
          </el-table-column>
          <el-table-column
            prop="information_register_people"
            label="信息登记员"
          >
          </el-table-column>
          <el-table-column prop="grid_people" label="网格员"></el-table-column>
          <el-table-column prop="guide_people" label="引导员">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { OPTION } from "@/components/common/Tmap";
import { leftOptions } from "../config/enums";
import { sbFields } from "../config/field";

export default {
  name: "listxq",
  data() {
    return {
      text: undefined,
      data: [],
      forceData1: [],
      forceData2: [],
      forceData3: [],
      fieldList: [],
      title: "",
      qzflag: false,
      relationShow: false,
      selectValue: 0,
      sObj: {},
      sArr: [],
      keyList: [],
      elList1: [],
      elList2: [],
      elList3: [],
      countryHash: {
        山福: 1,
        藤桥: 2,
        仰义: 3,
        丰门: 4,
        双屿: 5,
        广化: 6,
        五马: 7,
        松台: 8,
        大南: 9,
        南郊: 10,
        南汇: 11,
        蒲鞋市: 12,
        滨江: 13,
        七都: 14,
        区直设: 15,
      },
    };
  },
  created() {},
  mounted() {
    // this.getItem(leftOptions[0].children[0], leftOptions[0].label);
  },
  watch: {
    forceData1(n, o) {
      this.elList1 = [];
      if (this.forceData1.length) {
        this.forceData1.map((item) => {
          this.elList1.push(item.attributes);
        });
      }
    },
    forceData2(n, o) {
      this.elList2 = [];
      if (this.forceData2.length) {
        this.forceData2.map((item) => {
          this.elList2.push(item.attributes);
        });
      }
    },
    forceData3(n, o) {
      this.elList3 = [];
      if (this.forceData3.length) {
        this.forceData3.map((item) => {
          this.elList3.push(item.attributes);
        });
      }
    },
  },
  methods: {
    getItem({ name, id, url, sublayers }, label) {
      this.sObj = {};
      this.sArr = [];
      this.title = `${name}`.split(" ")[0];
      loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
        OPTION
      ).then(async ([QueryTask, Query]) => {
        const queryTask1 = new QueryTask({ url: `${url}/3` });
        const query1 = new Query();
        query1.outFields = "*";
        query1.where = "1=1";
        query1.returnGeometry = true;
        const result1 = await queryTask1.execute(query1);

        this.forceData1 = result1.features;

        const queryTask2 = new QueryTask({ url: `${url}/4` });
        const query2 = new Query();
        query2.outFields = "*";
        query2.where = "1=1";
        query2.returnGeometry = true;
        const result2 = await queryTask2.execute(query2);

        this.forceData2 = result2.features;

        const queryTask3 = new QueryTask({ url: `${url}/5` });
        const query3 = new Query();
        query3.outFields = "*";
        query3.where = "1=1";
        query3.returnGeometry = true;
        const result3 = await queryTask3.execute(query3);

        this.forceData3 = result3.features;
      });
    },

    goLocation(item) {
      this.$parent.$refs.macroArcgis.goloaction(item);
      this.$parent.listShow = false;
    },

    showrelation(item) {
      this.relationShow = true;
      this.$refs.relation.list = item.mjList;
      this.$refs.relation.title = item.attributes.Name;
    },

    // 详情点击事件
    clickCell(index) {
      const item = this.forceData[index];
      this.showrelation(item);
    },

    // 表格行点击事件
    clickTr(row, column, event) {
      if (event.target.innerText != "详情") {
        const item = this.forceData[row.index - 1];
        item.id =
          this.title == "确诊病例"
            ? "qzbl"
            : this.title == "集中医学观察点"
            ? "gld"
            : item.id;

        this.$parent.$refs.macroArcgis.goloaction(item);
        this.$parent.listShow = false;
      }
    },
  },
};
</script>

<style lang="less" scoped>
#communityDetail {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10%;
  left: 6%;
  width: 88%;
  height: 78%;
  background: #24386a;
  box-sizing: border-box;
  border: 1px solid #04ecff;
  padding: 1%;
  z-index: 31;

  .head {
    height: 7%;

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

  .search {
    height: 60px;
    select {
      background-color: #0c7cd2;
      border: none;
      color: #fff;
      padding: 7px 7px;
      margin-right: 5px;
    }

    input {
      width: 15%;
      margin-top: 10px;
      margin-right: 5px;
      background-color: #162449;
      border: 1px solid #75c8f4;
      border-radius: 8px;
      padding: 8px 9px;
      color: #fff;
    }

    button {
      background-color: #162449;
      border: 1px solid #75c8f4;
      border-radius: 8px;
      padding: 7px 9px;
      color: #fff;
      margin-right: 4px;
    }
  }

  .tables {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  // element-table
  .el-table {
    width: 96%;
    margin: auto;
    background-color: #24386a;
  }

  .el-button--text {
    font-size: 16px;
  }

  .content {
    height: 90px;

    table {
      border: 1px solid #ccc;
      width: 96%;
      margin: 0% 2%;

      th,
      td {
        border-bottom: 1px solid #ccc;
        padding: 10px 5px;
      }
    }
  }
}
</style>