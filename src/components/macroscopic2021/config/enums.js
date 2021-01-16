const {
    macroscopic
} = window.nCov_luchengData;
const {
    lc,
    lc_yt
} = macroscopic;
export const leftOptions = [{
    label: "全国疫情分布",
    check: false,
    show: false,
    children: [{
        name: `省`,
        // id: "qzbl",
        // url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        // sublayers: "0",
        // icon: "确诊病例",
        check: false
    }, {
        name: `市`,
        // id: "qzbl",
        // url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        // sublayers: "0",
        // icon: "确诊病例",
        check: false
    }]
}, {
    label: "鹿城区疫情分布",
    check: false,
    show: true,
    children: [{
        name: `隔离点 (115处)`,
        id: "isolatedPoint",
        ytname: -1,
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer",
        sublayers: "11",
        icon: "康复隔离点",
        check: false
    }, {
        name: `核酸检测点 (237处)`,
        id: "detection",
        ytname: -1,
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/paiban/MapServer",
        sublayers: "11",
        icon: "康复隔离点",
        check: false
    }]
}, {
    label: "网格管理",
    check: false,
    show: false,
    children: [{
        name: "街道",
        id: "chanyePlate",
        sublayers: "0",
        isImg: true,
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/xzjd_ws/MapServer",
        check: true
    }, {
        name: "社区网格",
        id: "wg",
        sublayers: "12",
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        isImg: true,
        check: false
    }, {
        name: "小区、大厦",
        id: "xq",
        sublayers: "14",
        // isImg: true,
        url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        check: false
    }]
}]