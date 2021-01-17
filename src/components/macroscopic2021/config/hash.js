export const tipHash = {
    isolatedPoint: "isolatedPointHash",
    detection: "detectionHash"



}


// 隔离点
const isolatedPointHash = [{
    fieldName: "Name",
    label: "隔离点名称"
}, {
    fieldName: "Address",
    label: "地址"
}, {
    fieldName: "Linkman",
    label: "联系人"
}, {
    fieldName: "LinkphoneNumber",
    label: "联系电话"
}, {
    fieldName: "dutyman",
    label: "负责人"
}, {
    fieldName: "State",
    label: "启用情况"
}, {
    fieldName: "Contain",
    label: "可容纳人数"
}, {
    fieldName: "userate",
    label: "已入住人数"
}]

// 核酸采样点
const detectionHash = [{
    fieldName: "Name",
    label: "采样点名称"
}, {
    fieldName: "LinkMan",
    label: "核酸检测点联系人"
}, {
    fieldName: "phoneNumber",
    label: "核酸检测点联系方式"
}, {
    fieldName: "cslinman",
    label: "社（村）负责人"
}, {
    fieldName: "gzzlinman",
    label: "工作组联系人"
}, {
    fieldName: "xxdhr",
    label: "信息登记员"
}, {
    fieldName: "wanggeyuan",
    label: "网格员"
}, {
    fieldName: "yindaoyuan",
    label: "引导员"
}, {
    fieldName: "yiwurenyuan",
    label: "医务人员"
}]


export const Hash = {
    isolatedPointHash,
    detectionHash
}