<template>
  <v-container>
    <v-btn small class="mr-2" @click="testButton()">Test용 새고고침</v-btn>

    <!-- Product type selector -->
    <v-radio-group v-model="selectedProductType" row>
      <v-radio label="적금" value="savings"></v-radio>
      <v-radio label="예금" value="installment"></v-radio>
    </v-radio-group>

    <!-- For savingsData -->
    <v-row v-if="selectedProductType === 'savings'">
      <v-col
        v-for="(item, index) in savingsData"
        :key="'savings-' + index"
        cols="12"
        md="4"
      >
        <v-card>
          <v-card-title>{{ item.fin_prdt_nm }}</v-card-title>
          <v-card-text>
            기간: {{ item.save_trm }}개월<br />
            최고 이율: {{ item.intr_rate2 }}%<br />
            월 최대 납입 금액: {{ formatAmount(item.max_limit) }}원<br />
            이자 방식: {{ item.intr_rate_type_nm }}<br />
            은행 이름: {{ item.kor_co_nm }}<br />
            예금 유형: {{ item.rsrv_type_nm }}
          </v-card-text>
          <v-card-actions>
            <v-btn text @click="goToDetailSavings(item.fin_prdt_cd)"
              >자세히</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- For installmentData -->
    <v-row v-if="selectedProductType === 'installment'">
      <v-col
        v-for="(item, index) in installmentData"
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
            <v-btn text @click="goToDetailInstallment(item.fin_prdt_cd)"
              >자세히</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <AlertDialog
      v-bind="$attrs"
      :show="dialog"
      :message="dialogMessage"
      @update:show="handleDialogClose"
    />
  </v-container>
</template>

<script>
// cus
import { formatAmount } from "../lib/formatter";
import AlertDialog from "@/components/AlertDialog.vue";

export default {
  name: "ProductHome",
  components: {
    AlertDialog,
  },
  created() {
    this.SetBestProductData();
  },
  computed: {
    savingsData() {
      return this.$store.getters.BEST_SAVINGS_DATA;
    },
    installmentData() {
      return this.$store.getters.BEST_INSTALLMENT_DATA;
    },
    // error handler
    authError() {
      return this.$store.getters.AUTH_ERROR;
    },
  },
  watch: {
    // error handler
    authError(errMessage) {
      if (errMessage) {
        this.dialogMessage = errMessage;
        this.dialog = true;
        this.$store.dispatch("RESET_AUTH_ERROR");
      }
    },
  },
  data() {
    return {
      // alert dialog
      dialog: false,
      dialogMessage: "",
      selectedProductType: "savings", // default to savings
    };
  },
  methods: {
    formatAmount,
    // test button - TODO: scheduling 기능 추가되면 삭제할 것
    async testButton() {
      const res = await this.$store.dispatch("TEST_REFRESH_PRODUCT");
      return res;
    },

    // set product data
    async SetBestProductData() {
      try {
        await this.$store.dispatch("SET_BEST_PRODUCT_DATA");
      } catch (err) {
        console.log(err);
      }
    },
    filteredSavingsData() {
      return this.savingsData.filter((item) =>
        item.title.includes(this.searchFilter)
      );
    },
    filteredInstallmentData() {
      return this.installmentData.filter((item) =>
        item.title.includes(this.searchFilter)
      );
    },
    goToDetailSavings(fin_prdt_cd) {
      this.$router.push({
        name: "detail_savings_product",
        params: { fin_prdt_cd: fin_prdt_cd },
      });
    },
    goToDetailInstallment(fin_prdt_cd) {
      this.$router.push({
        name: "detail_installment_product",
        params: { fin_prdt_cd: fin_prdt_cd },
      });
    },
    handleDialogClose(value) {
      this.dialog = value;
      // 다이얼로그가 닫혔을 때
      if (!value) {
        this.$router.push("/signin");
      }
    },
  },
};
</script>