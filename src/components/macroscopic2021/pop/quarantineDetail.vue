<template>
  <div class="quarantine-detail">
    <div class="head">
      <span>[ {{ title }} ] - 详情列表</span>
      <a
        @click="
          () => {
            this.$parent.quarantineDetailShow = false;
          }
        "
        >×</a
      >
    </div>
    <el-table :data="elList" height="250" border>
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="idcard" label="身份证号" width="190">
      </el-table-column>
      <el-table-column prop="phonenumber" label="联系方式" width="180">
      </el-table-column>
      <el-table-column prop="city" label="设区市"> </el-table-column>
      <el-table-column prop="district" label="县市区"></el-table-column>
      <el-table-column prop="street" label="乡镇街道"> </el-table-column>
      <el-table-column prop="village" label="村社区"> </el-table-column>
      <el-table-column prop="address" label="居家地址"></el-table-column>
      <el-table-column prop="control_start_time" label="开始管控时间">
      </el-table-column>
      <el-table-column prop="COMM" label="通讯方式"> </el-table-column>
    </el-table>
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
      forceData: [],
      fieldList: [],
      title: "",
      qzflag: false,
      relationShow: false,
      selectValue: 0,
      sObj: {},
      sArr: [],
      keyList: [],
      elList: [],
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
    forceData(n, o) {
      this.elList = [];

      if (this.forceData.length) {
        this.forceData.map((item) => {
          this.elList.push(item.attributes);
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
        const queryTask = new QueryTask({
          url: `http://172.20.89.7:6082/arcgis/rest/services/NewDataLuChengYiQinag/rujingshuju/MapServer/0`,
        });
        const query = new Query();
        query.outFields = "*";
        query.where = "1=1";
        query.returnGeometry = true;
        const { features } = await queryTask.execute(query);

        const list = features.sort((a, b) => {
          return (
            this.getNumber(b.attributes.control_start_time) -
            this.getNumber(a.attributes.control_start_time)
          );
        });

        this.forceData = list;
      });
    },

    getNumber(date) {
      if (!date) return 0;
      const [y, m, d] = ~date.indexOf("-") ? date.split("-") : date.split("/");
      return Number(y) * 10000 + Number(m) * 100 + Number(d);
    },
  },
};
</script>

<style lang="less" scoped>
.quarantine-detail {
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

  // element-table
  .el-table {
    flex: 1;
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