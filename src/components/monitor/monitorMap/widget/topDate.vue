<template>
  <div id="topDateDiv">
    <ul>
      <li style="cursor: pointer;" @click="showList">
        <p>
          做地地块
          <span>{{ country }}</span>
        </p>
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td>计划目标</td>
            <td>
              <span style="color: #ff3229;">{{ crdk_jh }}</span>
            </td>
            <td>宗</td>
          </tr>
          <tr>
            <td>累计完成</td>
            <td>
              <span style="color: #6dff3d;">{{ crdk_lj }}</span>
            </td>
            <td>宗</td>
          </tr>
        </table>
      </li>
      <li>
        <p>
          地块面积
          <span>{{ country }}</span>
        </p>
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td>计划目标</td>
            <td>
              <span style="color: #ff3229;">{{ crmj_jh }}</span>
            </td>
            <td>亩</td>
          </tr>
          <tr>
            <td>累计完成</td>
            <td>
              <span style="color: #6dff3d;">{{ crmj_lj }}</span>
            </td>
            <td>亩</td>
          </tr>
        </table>
      </li>
      <li>
        <p>
          出让金额
          <span>{{ country }}</span>
        </p>
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td>累计出让</td>
            <td>
              <span style="color: #ff3229;">{{ wcdk_lj }}</span>
            </td>
            <td>宗</td>
          </tr>
          <tr>
            <td>累计金额</td>
            <td>
              <span style="color: #6dff3d;">{{ crje_lj }}</span>
            </td>
            <td>亿</td>
          </tr>
        </table>
      </li>
    </ul>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from "vuex";
export default {
  data() {
    return {
      country: `(全区)`,
      crdk_lj: 0,
      crje_lj: 0,
      crmj_lj: 0,
      wcdk_lj: 0,
      crdk_jh: 0,
      crje_jh: 0,
      crmj_jh: 0,
      tmpData: null
    };
  },
  computed: {
    ...mapState({
      dkxxList: state => state.dkxxList
    })
  },
  methods: {
    fixdkxxList() {
      let crdk_lj = 0;
      let crje_lj = 0;
      let crmj_lj = 0;
      let wcdk_lj = 0;
      let crdk_jh = 0;
      let crje_jh = 0;
      let crmj_jh = 0;

      this.dkxxList.map(({ CRQK, CJJ, QSJ, TDMJ, SSJD }) => {
        if (CRQK != "做地中") {
          crdk_lj++;
          CJJ != "/" && (crje_lj = Number(crje_lj) + Number(CJJ));
          TDMJ != "/" && (crmj_lj = Number(crmj_lj) + Number(TDMJ));
        }

        CRQK == "已出让" && wcdk_lj++;

        crdk_jh++;
        QSJ != "/" && (crje_jh = Number(crje_jh) + Number(QSJ));
        TDMJ != "/" && (crmj_jh = Number(crmj_jh) + Number(TDMJ));
      });

      this.crdk_lj = crdk_lj;
      this.crje_lj = (crje_lj / 10000).toFixed(2);
      this.crmj_lj = crmj_lj.toFixed(2);
      this.crdk_jh = crdk_jh;
      this.wcdk_lj = wcdk_lj;
      this.crje_jh = (crje_jh / 10000).toFixed(2);
      this.crmj_jh = crmj_jh.toFixed(2);

      this.tmpData = {
        crdk_lj: crdk_lj,
        crje_lj: (crje_lj / 10000).toFixed(2),
        crmj_lj: crmj_lj.toFixed(2),
        wcdk_lj: wcdk_lj,
        crdk_jh: crdk_jh,
        crje_jh: (crje_jh / 10000).toFixed(2),
        crmj_jh: crmj_jh.toFixed(2)
      };
    },
    filterItem(country) {
      !this.dkxxList.length && this.fetchdkxxList();

      if (country == null) {
        this.crdk_lj = this.tmpData["crdk_lj"];
        this.crje_lj = this.tmpData["crje_lj"];
        this.crmj_lj = this.tmpData["crmj_lj"];
        this.wcdk_lj = this.tmpData["wcdk_lj"];
        this.crdk_jh = this.tmpData["crdk_jh"];
        this.crje_jh = this.tmpData["crje_jh"];
        this.crmj_jh = this.tmpData["crmj_jh"];

        this.country = `(全区)`;
      } else {
        let crdk_lj = 0;
        let crje_lj = 0;
        let crmj_lj = 0;
        let wcdk_lj = 0;
        let crdk_jh = 0;
        let crje_jh = 0;
        let crmj_jh = 0;

        this.dkxxList.map(({ CRQK, CJJ, QSJ, TDMJ, SSJD }) => {
          if (SSJD == country) {
            if (CRQK != "做地中") {
              crdk_lj++;
              CJJ != "/" && (crje_lj = Number(crje_lj) + Number(CJJ));
              TDMJ != "/" && (crmj_lj = Number(crmj_lj) + Number(TDMJ));
            }

            CRQK == "已出让" && wcdk_lj++;

            crdk_jh++;
            QSJ != "/" && (crje_jh = Number(crje_jh) + Number(QSJ));
            TDMJ != "/" && (crmj_jh = Number(crmj_jh) + Number(TDMJ));
          }
        });

        this.crdk_lj = crdk_lj;
        this.crje_lj = (crje_lj / 10000).toFixed(2);
        this.crmj_lj = crmj_lj.toFixed(2);
        this.wcdk_lj = wcdk_lj;
        this.crdk_jh = crdk_jh;
        this.crje_jh = (crje_jh / 10000).toFixed(2);
        this.crmj_jh = crmj_jh.toFixed(2);

        this.country = `(${country})`;
      }
    },
    // 地块列表
    showList() {
      this.$parent.listShow = true;
    }
  },
  mounted() {
    this.fixdkxxList();
  },
  watch: {
    dkxxList(n) {
      this.fixdkxxList();
    }
  }
};
</script>

<style lang="less" scoped>
#topDateDiv {
  position: absolute;
  top: 90px;
  width: 100%;
  z-index: 20;

  ul li {
    min-width: 230px;
    margin: 0px 15px;
    display: inline-block;
    background-color: #1b45a7;
    border: 1px solid #07e2e8;
    color: #07e2e8;

    table {
      height: 68px;
      margin: 5px auto;

      tr {
        td:first-child {
          text-align: right;
          font-weight: bolder;
          letter-spacing: 2px;
        }
        td:last-child {
          text-align: left;
          font-weight: bolder;
          letter-spacing: 2px;
        }

        span {
          font-size: 29px;
          font-weight: bolder;
          margin: 0px 5px;
        }
      }
    }

    p {
      font-size: 19px;
      font-weight: bolder;
      letter-spacing: 2px;
      padding: 5px;
      border-top: 1px solid #07e2e8;
      border-bottom: 1px solid #07e2e8;

      span {
        color: #fff;
      }
    }
  }
}
</style>