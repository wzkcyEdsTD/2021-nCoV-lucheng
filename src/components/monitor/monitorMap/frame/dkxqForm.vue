<template>
  <div id="dkxqForm">
    <a @click="close">×</a>
    <div class="block block1">
      <span class="title">做地详情</span>
      <span class="name">{{ title }}</span>
      <div class="carousel">
        <el-carousel height="160px" autoplay>
          <el-carousel-item v-for="item in imgNum" :key="item"></el-carousel-item>
        </el-carousel>
      </div>
    </div>

    <div class="block block2">
      <span class="title">专班人员</span>
      <div>
        <table border="0" cellpadding="0" cellspacing="0">
          <thead>
            <tr>
              <td>类别</td>
              <td>姓名</td>
              <td>职位</td>
              <td>联系方式</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>主要负责人</td>
              <td>{{ zy_xm }}</td>
              <td>{{ zy_zw }}</td>
              <td>{{ zy_lxfs }}</td>
            </tr>
            <tr>
              <td>分管负责人</td>
              <td>{{ fg_xm }}</td>
              <td>{{ fg_zw }}</td>
              <td>{{ fg_lxfs }}</td>
            </tr>
            <tr>
              <td>科室负责人</td>
              <td>{{ ks_xm }}</td>
              <td>{{ ks_zw }}</td>
              <td>{{ ks_lxfs }}</td>
            </tr>
            <tr>
              <td>地块经办人</td>
              <td>{{ dk_xm }}</td>
              <td>{{ dk_zw }}</td>
              <td>{{ dk_lxfs }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="block block3">
      <span class="title">问题清单</span>
      <span class="finishRate">完成率：{{ finishRate }} %</span>
      <div>
        <ul>
          <li v-for="k in qtable.length / 3" :key="k">
            <div
              v-for="(item,index) in qtable.slice((k - 1) * 3, (k - 1) * 3 + 3)"
              :key="index"
              @click="getReason(item)"
              :class="{ complete: item.tf == '是', uncomplete: item.tf != '是' }"
            >
              <span>{{item.text}}</span>
            </div>
          </li>
        </ul>
        <reasonForm ref="reasonForm" />
      </div>
    </div>

    <div class="block block4">
      <span class="title">区块优势</span>
      <span class="detail" @click="showDetail">详情 >></span>
      <div>
        <ul>
          <li v-for="(item,index) in qktable" :key="index">
            <span>{{item.text}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
const server = "http://172.20.89.68:5001/s";
import { loadModules } from "esri-loader";
import { WRT_config, OPTION } from "@/components/common/Tmap";
import reasonForm from "./reasonForm";
import { mapState } from "vuex";

export default {
  name: "dkxqForm",
  data() {
    return {
      server,
      title: "",
      imgNum: 4,
      qktable: [],
      qtable: [],
      finishRate: 100,
      zy_xm: "",
      zy_zw: "",
      zy_lxfs: "",
      fg_xm: "",
      fg_zw: "",
      fg_lxfs: "",
      ks_xm: "",
      ks_zw: "",
      ks_lxfs: "",
      dk_xm: "",
      dk_zw: "",
      dk_lxfs: ""
    };
  },
  components: { reasonForm },
  computed: {
    ...mapState({
      zdjzList: state => state.zdjzList,
      dkxxList: state => state.dkxxList
    })
  },
  created() {
    // 专班数据
    const duty_Data = this.$window.duty_Data;
    this.duty_Data = duty_Data;
  },
  mounted() {},
  methods: {
    close() {
      this.$parent.dkxqShow = false;
    },
    getItem({ GLZD, 做地详情 }) {
      const that = this;

      const name = GLZD;
      const imgName = 做地详情;

      this.title = name;

      const imgList =
        imgName == "/" || imgName == null || imgName == "null"
          ? []
          : imgName.split(";");

      this.imgNum = imgList.length || 1;

      if (imgList.length) {
        imgList.map((item, index) => {
          $(".el-carousel__item")
            .eq(index)
            .css({
              "background-image": `url("${server}/icon/做地/${item}")`
            });
        });
      } else {
        $(".el-carousel__item")
          .eq(0)
          .css({
            "background-image": `url("${server}/icon/做地/临时/暂无图片.jpg")`
          });
      }

      $(".el-carousel__item").css({
        cursor: "pointer"
      });
      $(".el-carousel__item").bind("click", this.locateVR);

      const time = this.zdjzList.map(item => item.SJJD1);

      const list = this.zdjzList.filter(({ GLZD }) => GLZD == name);

      const dkxxObj = this.dkxxList.filter(({ GLZD }) => GLZD == name);

      if (dkxxObj.length) {
        this.qktable = [
          {
            text: dkxxObj[0].QKYS == "/" ? "暂无数据" : dkxxObj[0].QKYS
          }
        ];
      }

      if (list.length) {
        const item = list[0];

        const colorHash = {
          是: "rgba(58,209,75,0.3)",
          否: "rgba(255,51,83,0.3)"
        };

        that.qtable = [
          {
            text: "征地是否到位",
            tf: item.TDZSZJS1,
            jtyy: item.JTYY1,
            zrr: item.ZRR1,
            sjjd: item.SJJD1,
            color: colorHash[item.TDZSZJS1]
          },
          {
            text: "土地使用权是否已收回",
            tf: item.TDSYQ2,
            jtyy: item.JTYY2,
            zrr: item.ZRR2,
            sjjd: item.SJJD2,
            color: colorHash[item.TDSYQ2]
          },
          {
            text: "建筑物是否已拆除",
            tf: item.JZW3,
            jtyy: item.JTYY3,
            zrr: item.ZRR3,
            sjjd: item.SJJD3,
            color: colorHash[item.JZW3]
          },
          {
            text: "土地证是否已注销",
            tf: item.TDZ4,
            jtyy: item.JTYY4,
            zrr: item.ZRR4,
            sjjd: item.SJJD4,
            color: colorHash[item.TDZ4]
          },
          {
            text: "管线是否已迁移",
            tf: item.GX5,
            jtyy: item.JTYY5,
            zrr: item.ZRR5,
            sjjd: item.SJJD5,
            color: colorHash[item.GX5]
          },
          {
            text: "地表附着物是否已清理",
            tf: item.DBFZW6,
            jtyy: item.JTYY6,
            zrr: item.ZRR6,
            sjjd: item.SJJD6,
            color: colorHash[item.DBFZW6]
          },
          {
            text: "土地污染是否已治理",
            tf: item.TDWR7,
            jtyy: item.JTYY7,
            zrr: item.ZRR7,
            sjjd: item.SJJD7,
            color: colorHash[item.TDWR7]
          },
          {
            text: "场地是否已平整",
            tf: item.CD8,
            jtyy: item.JTYY8,
            zrr: item.ZRR8,
            sjjd: item.SJJD8,
            color: colorHash[item.CD8]
          },
          {
            text: "水域占用是否已审批",
            tf: item.SY9,
            jtyy: item.JTYY9,
            zrr: item.ZRR9,
            sjjd: item.SJJD9,
            color: colorHash[item.SY9]
          },
          {
            text: "围墙放样地籍图是否完成",
            tf: item.WQFY10,
            jtyy: item.JTYY10,
            zrr: item.ZRR10,
            sjjd: item.SJJD10,
            color: colorHash[item.WQFY10]
          },
          {
            text: "土地是否收储",
            tf: item.TDSC11,
            jtyy: item.JTYY11,
            zrr: item.ZRR11,
            sjjd: item.SJJD11,
            color: colorHash[item.TDSC11]
          },
          {
            text: "是否挂牌",
            tf: item.GP12,
            jtyy: item.JTYY12,
            zrr: item.ZRR12,
            sjjd: item.SJJD12,
            color: colorHash[item.GP12]
          }
        ];

        let finishNum = 0;

        that.qtable.map(({ tf }) => {
          if (tf == "是") finishNum++;
        });

        const finishRate = ((finishNum / that.qtable.length) * 100).toFixed(2);
        that.finishRate = finishRate;

        const name = list[0].GLZD;

        if (that.duty_Data.hasOwnProperty(name)) {
          that.zy_xm = duty_Data[name].zy_xm;
          that.zy_zw = duty_Data[name].zy_zw;
          that.zy_lxfs = duty_Data[name].zy_lxfs;

          that.fg_xm = duty_Data[name].fg_xm;
          that.fg_zw = duty_Data[name].fg_zw;
          that.fg_lxfs = duty_Data[name].fg_lxfs;

          that.ks_xm = duty_Data[name].ks_xm;
          that.ks_zw = duty_Data[name].ks_zw;
          that.ks_lxfs = duty_Data[name].ks_lxfs;

          that.dk_xm = duty_Data[name].dk_xm;
          that.dk_zw = duty_Data[name].dk_zw;
          that.dk_lxfs = duty_Data[name].dk_lxfs;
        } else {
          that.zy_xm = "暂无数据";
          that.zy_zw = "暂无数据";
          that.zy_lxfs = "暂无数据";

          that.fg_xm = "暂无数据";
          that.fg_zw = "暂无数据";
          that.fg_lxfs = "暂无数据";

          that.ks_xm = "暂无数据";
          that.ks_zw = "暂无数据";
          that.ks_lxfs = "暂无数据";

          that.dk_xm = "暂无数据";
          that.dk_zw = "暂无数据";
          that.dk_lxfs = "暂无数据";
        }
      }
    },
    getReason(item) {
      this.$refs.reasonForm.showReason(item);
    },
    locateVR() {
      if (~this.title.indexOf("滨江")) {
        window.open("https://720yun.com/t/aevkuy1q07l?scene_id=39682863");
      }
      if (~this.title.indexOf("广化")) {
        window.open("https://720yun.com/t/0b0jvzeykn7?scene_id=20053605");
      }
    },

    // 区位优势详情
    showDetail() {
      this.$parent.changName("Block");
      const name = this.title;
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
        query.where = `GLZD = '${name}'`;

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

        console.log("entry-IdentifyTaskFun");
        console.log("res", list);

        that.$parent.jumpBlock(list[0]);
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import url("./dkxqForm.less");
</style>