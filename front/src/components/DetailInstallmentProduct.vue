<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, index) in product"
        :key="'installment-' + index"
        cols="12"
        md="4"
      >
        <v-card>
          <v-card-title>{{ item.fin_prdt_nm }}</v-card-title>
          <v-card-text>
            기간: {{ item.save_trm }}개월<br />
            최고 이율: {{ item.intr_rate2 }}%<br />
            이자 방식: {{ item.intr_rate_type_nm }}<br />
            은행 이름: {{ item.kor_co_nm }}
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="saveProduct(index)">저장하기</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <SubmitDateDialog ref="startDateDialog" />
    <SubmitMaxLimitDialog ref="limitDialog" />
  </v-container>
</template>

<script>
import SubmitDateDialog from "@/components/dialog/SubmitDateDialog.vue";
import SubmitMaxLimitDialog from "@/components/dialog/SubmitMaxLimitDialog.vue";

// cus
import { calculateDeposits } from "../lib/calc/savings";
import { openDialog } from "../lib/defines";
import { formatAmount } from "../lib/formatter";
import { SavingsType } from "../lib/type";

export default {
  name: "DetailInstallmentProduct",
  components: {
    SubmitDateDialog,
    SubmitMaxLimitDialog,
  },
  props: ["fin_prdt_cd"],
  async created() {
    this.product = await this.$store.dispatch(
      "SET_DETAIL_INSTALLMENTS",
      this.fin_prdt_cd
    );
  },
  computed: {
    userData: function () {
      return this.$store.getters.GET_USER;
    },
  },
  data() {
    return {
      product: null,
    };
  },
  methods: {
    formatAmount,

    // save product
    async saveProduct(index) {
      if (!this.userData) {
        this.$store.dispatch(openDialog, "로그인 후 이용해주세요.");
        return;
      }

      const startDate = await this.$refs.startDateDialog.waitForDate();

      let { save_trm, max_limit, intr_rate2, fin_prdt_nm, intr_rate_type_nm } =
        this.product[index];

      if (!max_limit) {
        max_limit = Number(await this.$refs.limitDialog.waitForLimit());
      }
      
      // 단리 복리 여부 확인
      const isSimple = intr_rate_type_nm === "단리" ? true : false;
      // 총 이자 계산
      const { totalInterest } = calculateDeposits({
        period: save_trm,
        price: max_limit,
        rate: intr_rate2,
        isSimple: isSimple,
      });

      this.$nextTick(async () => {
        const res = await this.$store.dispatch("SAVE_PRODUCT_AFTER_CALC", {
          period: Number(save_trm),
          price: max_limit,
          rate: intr_rate2,
          isSimple: isSimple,
          name: fin_prdt_nm,
          startDate: startDate,
          type: SavingsType.DEPOSIT,
          totalInterest: totalInterest,
          userIdx: Number(this.userData.user_idx),
        });
        if (res) {
          this.$store.dispatch(openDialog, "저장 성공");
        }
      });
    },
  },
};
</script>
