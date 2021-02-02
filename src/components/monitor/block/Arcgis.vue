<template>
  <div class="Map">
    <div :id="id" class="arcgisMap"></div>
  </div>
</template>

<script>
/* eslint-disable */
import { loadModules } from "esri-loader";
import {
  OPTION,
  spatialReference,
  IMAGELAYER,
  TDTIMAGE2017
} from "@/components/common/Tmap";
import { tipHash, Hash } from "./config/hash.js";

export default {
  name: "BlockArcgis",
  data() {
    return {};
  },
  components: {},
  props: {
    id: String,
    leftOptions: Array,
    dkitem: Object
  },

  created() {},
  async mounted() {
    const that = this;
    // init map
    await this.createMap();

    await this.addChanyePlate();

    // 添加图例标题
    $(".esri-mytitle").remove();
    $(".esri-legend").prepend(
      '<div class="esri-legend__message esri-mytitle">图例</div>'
    );

    await this.addZDDKFeatures();

    this.$props.leftOptions &&
      this.$props.leftOptions.map(_item => {
        _item.children.map(item => {
          item.id && that.doFun(item);
        });
      });
    // this.jQueryBind();
  },
  watch: {
    leftOptions: {
      handler(newVal, val) {
        const that = this;
        if (!that.map) return;
        newVal.map(_item => {
          _item.children.map(item => {
            item.id && that.doFun(item);
          });
        });
      },
      deep: true
    },
    dkitem: {
      handler(newV, oldV) {
        if (newV != null) {
          this.goloaction(newV);
        }
      },
      immediate: true
    }
  },
  methods: {
    /**
     * 数、组勾选触发图层寻找
     * @param {Object} item 单个元素
     */
    doFun(item) {
      const _id_ = item.id;
      if (item.check) {
        this.map && this.map.findLayerById(_id_)
          ? (this.map.findLayerById(_id_).visible = true)
          : this.addFeatures(item, _id_);
      } else {
        this.map && this.map.findLayerById(item.id)
          ? (this.map.findLayerById(item.id).visible = false)
          : null;
      }
    },
    /**
     * 初始化地图对象,带上底图
     * @param {Function} fn 回调函数
     */
    createMap(fn) {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(
          [
            "esri/Map",
            "esri/views/MapView",
            "esri/widgets/Legend",
            "esri/layers/VectorTileLayer",
            "esri/layers/TileLayer"
          ],
          OPTION
        ).then(([Map, MapView, Legend, VectorTileLayer]) => {
          // map加载底图
          that.map = new Map({
            spatialReference
          });
          //设置地图容器
          that.view = new MapView({
            container: that.$props.id,
            spatialReference,
            map: that.map,
            zoom: 13,
            center: [120.67819448808013, 28.039695289562555]
          });
          const layer = new VectorTileLayer({
            url: IMAGELAYER
          });
          that.map.add(layer);
          that.legend = new Legend({
            label: "图例",
            view: that.view
          });

          that.view.ui.add(that.legend, "bottom-left");
          that.view.on("click", function(evt) {});
          resolve(true);
        });
      });
    },
    // 绑定事件
    jQueryBind() {
      const context = this;
      // 地块详情
      $("body").on("click", ".dk_btn", function() {
        const name = $(this).attr("data-val");
        const imgName = $(this).attr("data-val2");
        context.$parent.rightHidden();
        // 延时等待组件初始化
        setTimeout(() => {
          context.$parent.$refs.dkxqForm &&
            context.$parent.$refs.dkxqForm.getItem(name, imgName);
          context.$parent.dkxqShow = true;
        }, 20);
      });
      // 做地出让方案
      $("body").on("click", ".crfa_btn", function() {
        const name = $(this).attr("data-val");
        // 延时等待组件初始化
        setTimeout(() => {
          context.$parent.$refs.crfaForm &&
            context.$parent.$refs.crfaForm.getItem(name);
          context.$parent.crfaShow = true;
        }, 20);
      });
    },
    // 五色图
    addChanyePlate() {
      const that = this;
      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/MapImageLayer"], OPTION).then(
          ([MapImageLayer]) => {
            const chanyePlate = new MapImageLayer({
              url:
                "http://172.20.89.7:6082/arcgis/rest/services/lucheng/xzjd_ws/MapServer",
              id: "chanyePlate",
              opacity: 1
            });
            //  优先级置顶
            that.map.add(chanyePlate, 2);
            that.legend.layerInfos.push({
              title: "五色风险评估",
              layer: chanyePlate
            });

            // 地块标注图层
            const dkImage = new MapImageLayer({
              url:
                "http://172.20.89.7:6082/arcgis/rest/services/lucheng/ZDDK/MapServer",
              sublayers: [{ id: 0 }],
              id: "dkImage",
              opacity: 1
            });

            that.map.add(dkImage, 3);
            that.legend.layerInfos.push({
              title: "做地地块",
              layer: dkImage
            });
            resolve(true);
          }
        );
      });
    },
    // 五色图变化
    changeChanyePlate() {
      this.map.findLayerById("chanyePlate") &&
        (this.$parent.$refs.bottomBtn.xzqhTag = this.map.findLayerById(
          "chanyePlate"
        ).visible = !this.map.findLayerById("chanyePlate").visible);

      this.$parent.$refs.bottomBtn.xzqhTag;
    },
    // 做地地块
    zddk() {
      this.map.findLayerById("zddk") &&
        (this.$parent.$refs.bottomBtn.zddkTag = this.map.findLayerById(
          "zddk"
        ).visible = !this.map.findLayerById("zddk").visible);

      this.map.findLayerById("dkImage") &&
        (this.map.findLayerById("dkImage").visible = !this.map.findLayerById(
          "dkImage"
        ).visible);
    },
    // 影像图
    yxt() {
      const that = this;
      if (this.map.findLayerById("img")) {
        this.map.findLayerById("img").visible = !this.map.findLayerById("img")
          .visible;
      } else {
        return new Promise((resolve, reject) => {
          loadModules(["esri/layers/TileLayer"], OPTION).then(([TileLayer]) => {
            const imgLayer = new TileLayer({
              // url: TDTIMAGE2017,
              url:
                "https://services.wzmap.gov.cn/server/rest/services/TDT/YX_2019/MapServer",
              id: "img"
            });
            //  优先级置顶
            that.map.add(imgLayer, 1);
            that.legend.layerInfos.push({
              layer: imgLayer
            });
            resolve(true);
          });
        });
      }
    },
    // 矢量图
    slt() {
      if (this.map.findLayerById("img")) {
        this.map.findLayerById("img").visible = false;
      }
    },
    // 控规图
    kgt(option) {
      const that = this;
      if (this.map.findLayerById("kg")) {
        this.$parent.$refs.bottomBtn.kgtTag = this.map.findLayerById(
          "kg"
        ).visible =
          option == null ? !this.map.findLayerById("kg").visible : true;
      } else {
        return new Promise((resolve, reject) => {
          loadModules(["esri/layers/MapImageLayer"], OPTION).then(
            ([MapImageLayer]) => {
              const mapImg = new MapImageLayer({
                url:
                  "http://172.20.89.7:6082/arcgis/rest/services/lucheng/LC_KONGGUI/MapServer",
                sublayers: [{ id: 0 }],
                id: "kg"
              });
              //  优先级置顶
              that.map.add(mapImg, 2);
              that.$parent.$refs.bottomBtn.kgtTag = true;
              resolve(true);
            }
          );
        });
      }
    },
    // 添加做地地块
    addZDDKFeatures() {
      const that = this;
      const item = {
        id: "zddk",
        url:
          "http://172.20.89.7:6082/arcgis/rest/services/lucheng/ZDDK/MapServer",
        sublayers: "0"
      };

      const { url, id } = item;

      return new Promise((resolve, reject) => {
        loadModules(["esri/layers/FeatureLayer"], OPTION).then(
          ([FeatureLayer]) => {
            const option = {
              url: url + "/" + item.sublayers,
              id,
              outFields: "*",
              opacity: 0
            };
            if (tipHash[id] && Hash[tipHash[id]]) {
              const _hash_ = Hash[tipHash[id]];
              option.popupTemplate = {
                content: `
                  <div class="dkTitle">地块基本信息</div>
                  <table class="esri-widget__table" summary="属性和值列表"><tbody>
                    ${_hash_
                      .map(k => {
                        return `<tr>
                            <th class="esri-feature__field-header">${k.label}</th>
                            <td class="esri-feature__field-data">{${k.fieldName}}</td>
                          </tr>`;
                      })
                      .join("")}
                  </tbody></table>
                  <div class="bottomBtn2 dk_btn" data-val="{GLZD}" data-val2="{做地详情}">查看详情</div>
                  <div class="bottomBtn3 crfa_btn" data-val="{GLZD}">做地方案</div>`
              };
            }

            const feature = new FeatureLayer(option);
            that.map.add(feature, 4);

            // that.legend.layerInfos.push({
            //   title: "",
            //   layer: feature
            // });

            resolve(true);
          }
        );
      });
    },
    // 定位
    goloaction({ id, attributes, geometry, fieldAliases }) {
      const that = this;

      let x = geometry.centroid.x,
        y = geometry.centroid.y;

      that.view.goTo({
        center: [x, y + 0.0015],
        zoom: 17
      });
      if (tipHash[id] && Hash[tipHash[id]]) {
        const _hash_ = Hash[tipHash[id]];
        that.view.popup = {
          title: "",
          content: `
            <div class="dkTitle">地块基本信息</div>
            <table class="esri-widget__table" summary="属性和值列表"><tbody>
              ${_hash_
                .map(k => {
                  return `<tr>
                    <th class="esri-feature__field-header">${k.label}</th>
                    <td class="esri-feature__field-data">${attributes[
                      k.fieldName
                    ] || ""}</td>
                  </tr>`;
                })
                .join("")}
            </tbody></table>
            <div class="bottomBtn2 dk_btn" data-val="${
              attributes.GLZD
            }" data-val2="${attributes.做地详情}">查看详情</div>
            <div class="bottomBtn3 crfa_btn" data-val="${
              attributes.GLZD
            }">做地方案</div>`,
          location: [x, y]
        };
      }
      that.view.popup.alignment = "top-center";
      that.view.popup.visible = true;
    },
    // 街道区划高亮
    addBlank(label) {
      if (!label) return;
      this.view.graphics.removeAll();
      const that = this;
      loadModules(
        ["esri/tasks/QueryTask", "esri/tasks/support/Query", "esri/Graphic"],
        OPTION
      ).then(([QueryTask, Query, Graphic]) => {
        const queryTask = new QueryTask({
          url:
            "http://172.20.89.7:6082/arcgis/rest/services/lucheng/xzjd_ws/MapServer/0"
        });
        const query = new Query();
        query.outFields = ["*"];
        query.where = `${label ? `名称 = '${label}'` : `名称 = ''`}`;
        query.returnGeometry = true;
        queryTask.execute(query).then(response => {
          if (response.features.length) {
            const geometry = response.features[0].geometry;
            const fillSymbol = {
              type: "simple-fill",
              color: [21, 249, 253, 0],
              outline: {
                color: [21, 249, 253],
                width: 4
              }
            };
            const polygonGraphic = new Graphic({
              geometry,
              symbol: fillSymbol
            });
            that.view.graphics.add(polygonGraphic);
            that.kgt("show");
            let _x = geometry.centroid.x;
            let _y = geometry.centroid.y;
            that.view.goTo({
              center: ~["双屿街道"].indexOf(label)
                ? [_x + 0.012, _y + 0.005]
                : ~["五马街道"].indexOf(label)
                ? [_x + 0.009, _y - 0.005]
                : ~["南郊街道"].indexOf(label)
                ? [_x + 0.002, _y + 0.003]
                : ~["滨江街道"].indexOf(label)
                ? [_x + 0.004, _y]
                : ~["七都街道"].indexOf(label)
                ? [_x - 0.003, _y + 0.003]
                : ~["蒲鞋市街道"].indexOf(label)
                ? [_x + 0.013, _y + 0.003]
                : ~["仰义街道"].indexOf(label)
                ? [_x - 0.012, _y - 0.004]
                : ~["藤桥镇"].indexOf(label)
                ? [_x + 0.053, _y + 0.013]
                : ~["南汇街道"].indexOf(label)
                ? [_x - 0.009, _y - 0.003]
                : [_x, _y],
              zoom: ~[
                "双屿街道",
                "仰义街道",
                "大南街道",
                "五马街道",
                "南郊街道",
                "滨江街道",
                "七都街道"
              ].indexOf(label)
                ? 16
                : ~["广化街道", "松台街道", "蒲鞋市街道"].indexOf(label)
                ? 17
                : ~["藤桥镇", "南汇街道"].indexOf(label)
                ? 18
                : 15
            });
          }
        });
      });
    }
  }
};
</script>
 <style scoped lang="less">
.Map {
  width: 100%;
  height: 100%;
  .arcgisMap {
    width: 100%;
    height: 100%;
  }
}
</style>