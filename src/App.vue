<template>
  <div id="app">
    <header :class="`app_header `" v-if="showHeader">
      <div class="app_icon">{{ titleHash[current] }}</div>
      <div class="app_toptab_position app_toptab_normal">
        <ul class="app_toptab">
          <li
            v-for="(item, index) in toptab"
            :key="index"
            :class="{ top_active: index == current }"
            @click="$goRoute(item.route, menuFlag), selected(index)"
          >
            {{ item.label }}
          </li>
        </ul>

        <div class="tip">
          <div>
            温州设计集团 <img src="@/components/common/image/group_logo.png" />
          </div>
          <p>{{ time }}</p>
        </div>

        <el-popover placement="bottom-end" width="70" trigger="hover">
          <ul class="user_list">
            <li>{{ au_username }}</li>
            <li>
              <a @click="updatePassport">修改密码</a>
            </li>
            <li>
              <a @click="Exit">安全退出</a>
            </li>
          </ul>
          <div class="userBtn" slot="reference">
            <el-avatar size="small" src="libs/img/userAvatar.png"></el-avatar>
          </div>
        </el-popover>
      </div>
    </header>

    <div class="app_container">
      <router-view ref="router" />
      <transition name="frame"></transition>
    </div>

    <Passport v-if="showPassport" />
  </div>
</template>

<script>
/* eslint-disable */
import router from "@/router";
import { OPTION, GET_ARCGIS_TOKEN, WRT_config } from "@/components/common/Tmap";
import { fixMenuList } from "@/components/common/user/menuHash";
import Passport from "@/components/common/user/Passport";

export default {
  name: "app",
  data() {
    return {
      toptab: [
        { label: "2020疫情布控", route: "macroscopic", path: "/macroscopic" },
        { label: "做地出让", route: "monitor", path: "/monitor" },
        {
          label: "2021疫情布控",
          route: "macroscopic2021",
          path: "/",
        },
      ],
      titleHash: {
        0: "鹿城区新冠肺炎防控指挥地图",
        1: "鹿城区做地出让指挥地图",
        2: "鹿城区新冠肺炎防控指挥地图",
      },
      current: 0,
      time: " ",
      showHeader: true, // 显示头部
      au_username: window.user.au_username,
      showPassport: false,
      menuFlag: true,
    };
  },
  components: { Passport },
  async created() {},
  mounted() {
    this.setLoation();
    setInterval(() => {
      this.getTime();
    }, 1000);
  },

  watch: {
    $route(n, o) {
      this.toptab.map((item, index) => {
        if (item.path == n.path) {
          this.current = index;
        }
      });
    },
  },

  methods: {
    setLoation() {
      const path = this.$router.history.current.fullPath;
      this.toptab.map((item, index) => {
        if (item.path == path) {
          this.current = index;
        }
      });
    },
    selected(index) {
      this.current = index;
    },
    //获取当前时间
    getTime() {
      var date = new Date();
      var seperator1 = "-";
      var seperator2 = ":";
      //以下代码依次是获取当前时间的年月日时分秒
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var strDate = date.getDate();
      var minute = date.getMinutes();
      var hour = date.getHours();
      var second = date.getSeconds();
      //固定时间格式
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hour >= 0 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      var currentdate =
        year +
        seperator1 +
        month +
        seperator1 +
        strDate +
        " " +
        hour +
        seperator2 +
        minute +
        seperator2 +
        second;
      this.time = currentdate;
    },
    updatePassport() {
      this.showPassport = true;
    },

    Exit() {
      this.$util.removeStorage("access_token");
      window.location.href = `http://172.20.89.88:5001/2019-nCoV-login/index.html#/`;
    },
  },
};
</script>

<style lang="less">
@import url("~@/components/common/fonts/font.css");
@import url("~@/components/common/css/common.less");
@import url("~@/components/common/css/animate.css");
@import url("~@/components/common/css/frame.less");
@import url("~@/components/common/css/arcgis.css");
</style>
