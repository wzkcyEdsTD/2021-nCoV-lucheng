const {
    macroscopic
} = window.nCov_luchengData;
const {
    lc,
    lc_yt
} = macroscopic;


import {
    loadModules
} from "esri-loader";
import {
    OPTION
} from "@/components/common/Tmap";

// 隔离点数量
const getIsolatedPointNum = () => {
    return new Promise((resolve, reject) => {
        loadModules(
            ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
            OPTION
        ).then(async ([QueryTask, Query]) => {
            const queryTask = new QueryTask({
                url: "http://172.20.89.7:6082/arcgis/rest/services/NewDataLuChengYiQinag/GeiLiDianLuCheng/MapServer/0"
            });
            const query = new Query();
            query.outFields = ["*"];
            query.returnGeometry = true;
            query.where = `1 = 1`;
            const {
                features
            } = await queryTask.execute(query);
            resolve(features.length || 0);
        });
    });
}

// 核酸采样点数量
const getDetectionNum = () => {
    return new Promise((resolve, reject) => {
        loadModules(
            ["esri/tasks/QueryTask", "esri/tasks/support/Query"],
            OPTION
        ).then(async ([QueryTask, Query]) => {
            const queryTask = new QueryTask({
                url: "http://172.20.89.7:6082/arcgis/rest/services/NewDataLuChengYiQinag/GeiLiDianLuCheng/MapServer/1"
            });
            const query = new Query();
            query.outFields = ["*"];
            query.returnGeometry = true;
            query.where = `1 = 1`;
            const {
                features
            } = await queryTask.execute(query);
            resolve(features.length || 0);
        });
    });
}

export const getLeftOptions = async () => {
    const isolatedPointNum = await getIsolatedPointNum();
    const detectionNum = await getDetectionNum();

    return [{
        label: "全国疫情分布",
        check: false,
        show: false,
    }, {
        label: "鹿城区疫情分布",
        check: false,
        show: true,
        children: [{
            name: `隔离点 (${isolatedPointNum}处)`,
            id: "isolatedPoint",
            url: "http://172.20.89.7:6082/arcgis/rest/services/NewDataLuChengYiQinag/GeiLiDianLuCheng/MapServer",
            sublayers: "0",
            icon: "隔离点（红）",
            icon2: "隔离点（黄）",
            icon3: "隔离点（绿）",
            isLegend: true,
            check: false
        }, {
            name: `核酸采样点 (${detectionNum}处)`,
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
        }]
    }]

}