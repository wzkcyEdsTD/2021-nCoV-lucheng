<template>
  <div id="dklist">
    <div class="head">
      <span>地块列表</span>
      <a @click="()=>{ this.$parent.listShow = false }">×</a>
    </div>
    <!-- <div class="content"> -->
    <el-table :data="elList" height="90%" border @row-click="clickTr">
      <el-table-column prop="index" label="序号" sortable width="80"></el-table-column>
      <el-table-column prop="DKMC" label="地块名称" sortable></el-table-column>
      <el-table-column prop="SSJD" label="所属街道" sortable width="110"></el-table-column>
      <el-table-column prop="TDYT" label="土地用途" sortable width="160"></el-table-column>
      <el-table-column prop="TDMJ" label="土地面积（亩）" sortable width="160"></el-table-column>
      <el-table-column prop="JZMJ" label="建筑面积（平方米）" sortable width="190"></el-table-column>
      <el-table-column prop="RJL" label="容积率" sortable width="110"></el-table-column>
      <el-table-column prop="CRQK" label="出让情况" sortable width="110"></el-table-column>
      <el-table-column prop="ZDWCSX" label="做地完成时限" sortable width="160"></el-table-column>
    </el-table>
    <!-- </div> -->
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { WRT_config, OPTION } from "@/components/common/Tmap";
export default {
  name: "dklist",
  data() {
    return {
      elList: []
    };
  },
  created() {
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
      query.where = `1 = 1`;
      const { fields, features } = await queryTask.execute(query);
      const fieldAliases = {};
      fields.map(item => {
        fieldAliases[item.name] = item.alias;
      });
      const list = features.map(item => {
        item.fieldAliases = fieldAliases;
        return item;
      });

      const that = this;

      list
        .sort((a, b) => {
          return a.attributes.所属街道 > b.attributes.所属街道 ? 1 : -1;
        })
        .map(({ attributes, geometry, fieldAliases }, index) => {
          let zdwcsx = null;

          if (attributes.做地完成时限 != null) {
            zdwcsx = attributes.做地完成时限.split(" ")[0];
          }

          const [zdwcsx_y, zdwcsx_m] =
            zdwcsx == null ? [null, null] : zdwcsx.split("-");

          that.elList.push({
            id: "zddk",
            index: index + 1,
            DKMC: attributes.地块名称,
            SSJD: attributes.所属街道,
            TDYT: attributes.土地用途,
            TDMJ: attributes.土地面积_亩,
            JZMJ: attributes.建筑面积_平方米,
            RJL: attributes.容积率,
            CRQK: attributes.DKZT,
            ZDWCSX:
              zdwcsx == null
                ? "/"
                : `${Number(zdwcsx_y)}年${Number(zdwcsx_m)}月`,
            attributes,
            geometry,
            fieldAliases
          });
        });
    });
  },
  methods: {
    // 表格行点击事件
    clickTr(row, column, event) {
      this.$parent.$refs.monitorArcgis.goloaction(row);

      const name = row.GLZD;
      const imgName = row.attributes.做地详情;

      this.$parent.rightHidden();
      this.$parent.$refs.dkxqForm.getItem(name, imgName);
      this.$parent.listShow = false;
      this.$parent.dkxqShow = true;
    }
  }
};
</script>

<style lang="less" scoped>
#dklist {
  position: absolute;
  top: 10%;
  left: 4%;
  width: 88%;
  height: 78%;
  padding: 1% 2%;
  background: #24386a;
  border: 1px solid #04ecff;
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

  .content {
    height: 90%;
  }

  // element-table
  .el-table {
    width: 100%;
    margin: auto;
    background-color: #24386a;
  }

  .el-button--text {
    font-size: 16px;
  }
}
</style>