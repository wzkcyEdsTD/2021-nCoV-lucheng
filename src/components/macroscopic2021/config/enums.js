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
    /* children: [{
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
    }] */
}, {
    label: "鹿城区疫情分布",
    check: false,
    show: true,
    children: [{
        name: `隔离点 (44处)`,
        id: "isolatedPoint",
        url: "http://172.20.89.7:6082/arcgis/rest/services/NewDataLuChengYiQinag/GeiLiDianLuCheng/MapServer",
        sublayers: "0",
        icon: "隔离点（红）",
        icon2: "隔离点（黄）",
        icon3: "隔离点（绿）",
        isLegend: true,
        check: false
    }, {
        name: `核酸采样点 (916处)`,
        id: "detection",
        url: "http://172.20.89.7:6082/arcgis/rest/services/NewDataLuChengYiQinag/GeiLiDianLuCheng/MapServer",
        sublayers: "1",
        icon: "核酸检测点",
        isLegend: true,
        check: false
    }]
}, {
    label: "网格管理",
    check: false,
    show: true,
    children: [{
            name: "街道",
            id: "street",
            isImg: true,
            isLegend: false,
            url: "http://172.20.89.7:6082/arcgis/rest/services/NewDataLuChengYiQinag/cs_grid/MapServer",
            sublayers: "0",
            check: true
        }, {
            name: "社区",
            id: "community",
            isLegend: false,
            url: "http://172.20.89.7:6082/arcgis/rest/services/NewDataLuChengYiQinag/cs_grid/MapServer",
            sublayers: "1",
            check: false
        },
        // {
        //     name: "网格",
        //     id: "grid",
        //     isLegend: false,
        //     url: "http://172.20.89.7:6082/arcgis/rest/services/NewDataLuChengYiQinag/cs_grid/MapServer",
        //     sublayers: "2",
        //     check: false
        // }, {
        //     name: "小区、大厦",
        //     id: "building",
        //     isImg: true,
        //     isLegend: false,
        //     url: "http://172.20.89.7:6082/arcgis/rest/services/lucheng/fangkong/MapServer",
        //     sublayers: "14",
        //     check: false
        // }
    ]
}]