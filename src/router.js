/**
 * vue-cli router config
 * add by eds 2019/7/6
 */
import Vue from "vue";
import Router from "vue-router";
// pages modules
import Macroscopic from "@/components/macroscopic/Macroscopic.vue";
Vue.use(Router);

export default new Router({
  mode: "hash",
  routes: [{
      path: "/",
      name: "macroscopic",
      component: Macroscopic
    }, {
      path: "/monitor",
      name: "monitor",
      // component: Monitor
      component: () => import( /* webpackChunkName: "monitor" */ './components/monitor/Monitor.vue')
    },
    {
      path: "/macroscopic2021",
      name: "macroscopic2021",
      component: () => import( /* webpackChunkName: "monitor" */ './components/macroscopic2021/Macroscopic.vue')
    }
  ]
});