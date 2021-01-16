<template>
  <div class="leftMultiSelect">
    <div class="topic">
      <header>
        <span>地块清单</span>
        <input type="text" v-model="word" placeholder="请输入..." @keyup.enter="filterItem()" />
        <button @click="filterItem">搜索</button>
      </header>
      <div class="switch" v-if="dkType == 0">
        <span :class="{active: tabIndex == 0}" @click="()=>{ tabIndex = 0 }">街道专题</span>
        <i>/</i>
        <span :class="{active: tabIndex == 1}" @click="()=>{ tabIndex = 1 }">权属专题</span>
        <i>/</i>
        <span :class="{active: tabIndex == 2}" @click="()=>{ tabIndex = 2 }">时限专题</span>
      </div>
      <div class="switch" v-else-if="dkType == 1">
        <span class="active">街道专题</span>
      </div>
      <div class="selectFrame no_select">
        <div v-for="(item,index) in this.tree" :key="index">
          <div @click="toggleTree(item.label,index)">
            {{ item.label }} ({{ item.children.length }}宗)
            <div>
              <i :class="`iconfont ${item.show?`iconRectangleCopy7`:`iconRectangleCopy4`}`"></i>
              <span v-if="tabIndex == 0 && dkType == 0" @click="switchChar(item.label)">分布图</span>
            </div>
          </div>
          <ul v-show="item.show">
            <li
              v-for="(oitem,oindex) in item.children"
              :key="oindex"
              @click="ShowResult(oitem,item)"
            >
              <p
                :style="{ width: dkType == 0 ? 60 + '%' : 100 + '%' }"
              >{{ ++oindex }}. {{ oitem.name }}</p>
              <div v-if="dkType == 0">
                <span
                  :style="{ color: typeHash[oitem.yt].color }"
                >{{ typeHash[oitem.yt].shortname }}</span>
                <span :style="{ color: dkColorHash[oitem.type] }">{{ oitem.type }}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import { WRT_config, OPTION } from "@/components/common/Tmap";
import { typeHash, dkColorHash, fieldsHash } from "../config/hash";
export default {
  name: "leftMultiSelect",
  data() {
    return {
      typeHash,
      dkColorHash,
      fieldsHash,
      dkType: 0,
      tabIndex: 0,
      word: "",

      tree: [],
      jdOptions: [],
      qsOptions: [],
      sxOptions: [],

      cgOptions: []
    };
  },
  created() {
    loadModules(
      ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
      OPTION
    ).then(async ([QueryTask, Query]) => {
      const queryTask = new QueryTask({
        url: `http://172.20.83.215:6080/arcgis/rest/services/WZZD/WZZDDK/MapServer/0`
      });
      const query = new Query();
      query.outFields = ["*"];
      query.returnGeometry = true;
      query.where = `ssqy = '鹿城区' and ssjd <> '蒲州街道'`;
      const { fields, features } = await queryTask.execute(query);
      const fieldAliases = {};
      fields.map(item => {
        fieldAliases[item.name] = item.alias;
      });
      const list = features.map(item => {
        item.fieldAliases = fieldAliases;
        return item;
      });

      const jdObj = {};
      const qsObj = {};
      const sxObj = {};

      const jdArr = [];
      const qsArr = [];
      const sxArr = [];

      list.map(({ attributes, geometry, fieldAliases }) => {
        const {
          // GLZD,
          // DKZT,
          // 所属街道,
          // 土地用途,
          // 责任单位,
          // 做地完成时限
          GLZD,
          dkmc,
          crqk,
          ssjd,
          tdyt,
          zrdw,
          zdwcsx
        } = attributes;
        if (!ssjd) return false;
        if (!jdObj[ssjd]) {
          jdObj[ssjd] = {
            label: ssjd,
            children: [],
            tabIndex: 0,
            check: false,
            show: false
          };
        }
        jdObj[ssjd].children.push({
          id: "zddk",
          name: dkmc,
          type: crqk,
          yt: tdyt && tdyt.replace("用地", ""),
          attributes,
          geometry,
          fieldAliases
        });

        if (!zrdw) return false;
        const fixzrdw = zrdw.split("/")[0];
        if (!qsObj[fixzrdw]) {
          qsObj[fixzrdw] = {
            label: fixzrdw,
            children: [],
            tabIndex: 0,
            check: false,
            show: false
          };
        }

        qsObj[fixzrdw].children.push({
          id: "zddk",
          name: dkmc,
          type: crqk,
          yt: tdyt && tdyt.replace("用地", ""),
          attributes,
          geometry,
          fieldAliases
        });

        if (!zdwcsx) return false;
        let wcsx = null;
        if (zdwcsx != null) {
          wcsx = zdwcsx.split(" ")[0];
          wcsx = wcsx
            .replace("年", "-")
            .replace("月", "-")
            .replace("日", "");
        }

        const [wcsx_y, wcsx_m] = wcsx == null ? [null, null] : wcsx.split("-");

        const fixzdwcsx = !isNaN(Number(wcsx_m))
          ? `${Number(wcsx_y)}年${Number(wcsx_m)}月`
          : `/`;

        if (!sxObj[fixzdwcsx]) {
          sxObj[fixzdwcsx] = {
            label: fixzdwcsx,
            children: [],
            tabIndex: 0,
            show: false
          };
        }

        sxObj[fixzdwcsx].children.push({
          id: "zddk",
          name: dkmc,
          type: crqk,
          yt: tdyt && tdyt.replace("用地", ""),
          attributes,
          geometry,
          fieldAliases
        });
      });

      for (let k in jdObj) {
        jdArr.push(jdObj[k]);
      }

      jdArr.map(item => {
        if (item.children.length) {
          item.children.sort((a, b) => {
            return a.name > b.name ? 1 : -1;
          });

          // item.label = `${item.label} (${item.children.length}宗)`;
        }
      });

      for (let k in qsObj) {
        qsArr.push(qsObj[k]);
      }

      qsArr
        .sort((a, b) => {
          return ~b.label.indexOf("集团") ? 1 : -1;
        })
        .map(item => {
          if (item.children.length) {
            item.children.sort((a, b) => {
              return a.name > b.name ? 1 : -1;
            });

            // item.label = `${item.label} (${item.children.length}宗)`;
          }
        });

      for (let k in sxObj) {
        sxArr.push(sxObj[k]);
      }

      sxArr
        .sort((a, b) => {
          if (b.label == "/") return -1;
          if (a.label == "/") return 1;

          const date_y_a = a.label.slice(0, a.label.indexOf("年"));
          const date_m_a = a.label.slice(
            a.label.indexOf("年") + 1,
            a.label.indexOf("月")
          );

          const date_a = Number(
            date_y_a.concat(Number(date_m_a) < 10 ? `0${date_m_a}` : date_m_a)
          );

          const date_y_b = b.label.slice(0, b.label.indexOf("年"));
          const date_m_b = b.label.slice(
            b.label.indexOf("年") + 1,
            b.label.indexOf("月")
          );

          const date_b = Number(
            date_y_b.concat(Number(date_m_b) < 10 ? `0${date_m_b}` : date_m_b)
          );

          return date_a - date_b;
        })
        .map(item => {
          if (item.children.length) {
            item.children.sort((a, b) => {
              return a.name > b.name ? 1 : -1;
            });
          }
        });

      this.tree = jdArr;

      this.jdOptions = jdArr;

      this.qsOptions = qsArr;

      this.sxOptions = sxArr;
    });
  },
  methods: {
    // 切换页
    changeTab(index) {
      this.tree =
        index == 0
          ? this.jdOptions
          : index == 1
          ? this.qsOptions
          : this.sxOptions;
    },
    // 搜索
    filterItem() {
      const tag = this.word;
      const tagOptions =
        this.dkType == 0
          ? this.tabIndex == 0
            ? this.jdOptions
            : this.tabIndex == 1
            ? this.qsOptions
            : this.sxOptions
          : this.cgOptions;

      const fieldsList = this.fieldsHash[this.dkType];

      this.tree = this.singleFilter(tagOptions, fieldsList, tag);
    },

    //下拉菜单
    toggleTree(label, index) {
      for (let v in this.tree) {
        if (this.tree[v].label == label) {
          this.tree[v].show = !this.tree[v].show;
        }
      }
    },

    // 单级列表筛选
    singleFilter(opt, fields, tag) {
      const sObj = {};
      const sArr = [];

      opt.map(item => {
        const childList = [];

        item.children &&
          item.children.map(o => {
            if (!Array.isArray(fields)) {
              if (
                o.attributes[fields] &&
                ~o.attributes[fields].split("/")[0].indexOf(tag)
              ) {
                childList.push(o);
              }
            } else {
              for (let i in fields) {
                const k = fields[i];
                if (o.attributes[k] && ~o.attributes[k].indexOf(tag)) {
                  childList.push(o);
                  break;
                }
              }
            }
          });

        if (childList.length) {
          sObj[item.label] = {
            label: item.label,
            children: childList,
            tabIndex: 0,
            show: false
          };
        }
      });

      for (let k in sObj) {
        sArr.push(sObj[k]);
      }

      return sArr;
    },

    stop(e) {
      e.stopPropagation();
    },

    // 定位详情
    ShowResult(oitem, item) {
      // this.$parent.$refs.monitorArcgis.goloaction(oitem);

      // if (this.dkType == 0) {
      //   const name = oitem.name;
      //   const imgName = oitem.attributes.做地详情;

      //   this.$parent.rightHidden();
      //   this.$parent.$refs.dkxqForm.getItem(name, imgName);
      //   this.$parent.dkxqShow = true;
      // }
      this.$parent.$refs.monitorArcgis.goloaction(oitem);

      if (this.dkType == 0) {
        const glzd = oitem.attributes.glzd;
        const imgName = oitem.attributes.zdxq;
        const name = oitem.attributes.dkmc;

        this.$parent.rightHidden();
        this.$parent.$refs.dkxqForm.getItem(glzd, imgName, name);
        this.$parent.dkxqShow = true;
      }
    },
    // 街道做地分布图
    switchChar(label) {
      const name = label.split(" ")[0];
      this.$parent.$refs.monitorArcgis.addBlank(name);
      this.$parent.$refs.topDate.filterItem(name);
    },

    // 地块清单切换
    dkListChange(type) {
      this.dkType = type;
      this.$parent.$refs.bottomBtn.clean();
      this.word = "";

      this.$parent.rightHidden();
      this.$parent.toggle2();
      this.$parent.dkxqShow = false;

      // 视角重新定位
      this.$parent.$refs.monitorArcgis.view.goTo({
        center: [120.67819448808013, 28.039695289562555],
        zoom: 13
      });

      this.text = "";
      if (type == 0) {
        this.tree = this.jdOptions;
        this.$parent.$refs.bottomBtn.zddk();
        this.$parent.$refs.bottomBtn.xzqh();
      } else if (type == 1) {
        this.tree = [];
        this.$parent.$refs.bottomBtn.cgdk();

        if (this.cgOptions.length) {
          this.tree = this.cgOptions;
        } else {
          loadModules(
            ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
            OPTION
          ).then(async ([QueryTask, Query]) => {
            const queryTask = new QueryTask({
              url: `http://172.20.89.7:6082/arcgis/rest/services/lucheng/CZDK/MapServer/0`
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

            const cgObj = {};

            const cgArr = [];

            list.map(({ attributes, geometry, fieldAliases }) => {
              const { Expr1, jd } = attributes;

              if (!jd) return false;
              if (!cgObj[jd]) {
                cgObj[jd] = {
                  label: jd,
                  children: [],
                  check: false,
                  show: false
                };
              }
              cgObj[jd].children.push({
                id: "cgdk",
                name: Expr1,
                attributes,
                geometry,
                fieldAliases
              });
            });

            for (let k in cgObj) {
              cgArr.push(cgObj[k]);
            }

            cgArr.map(item => {
              if (item.children.length) {
                item.children.sort((a, b) => {
                  return a.name > b.name ? 1 : -1;
                });
              }
            });

            this.tree = this.cgOptions = cgArr;
          });
        }
      }
    }
  },
  watch: {
    tabIndex() {
      this.tree =
        this.tabIndex == 0
          ? this.jdOptions
          : this.tabIndex == 1
          ? this.qsOptions
          : this.sxOptions;

      this.filterItem();
    }
  }
};
</script>
<style scoped lang="less">
@import url("../../common/_iconfont/iconfont.css");
@import url("./leftMultiSelect.less");
</style>