<template>
  <div id="topDateDiv">
    <ul>
      <li style="cursor: pointer;" @click="showList">
        <p>
          安置小区
          <span>{{ country }}</span>
        </p>
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="color: #ff3229;">79</span>
            </td>
            <td>个</td>
          </tr>
        </table>
      </li>
      <li>
        <p>
          已安置房源
          <span>{{ country }}</span>
        </p>
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="color: #ff3229;">130</span>
            </td>
            <td>套</td>
          </tr>
        </table>
      </li>
      <li>
        <p>
          空置房源
          <span>{{ country }}</span>
        </p>
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td>
              <span style="color: #ff3229;">4140</span>
            </td>
            <td>套</td>
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
      // height: 68px;
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