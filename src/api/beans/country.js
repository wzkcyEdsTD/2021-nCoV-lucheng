import {
    getTableAxios
  } from "@/api/index.js";
import { data } from "jquery";

export const gjsj = async () => {
    const tableAxios = getTableAxios();
    let list;
    await tableAxios.get("/epidemic/open/covidDayReport/last").then(res=>{
        list = res.result
    })
    return list
}