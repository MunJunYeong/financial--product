<template>
  <v-container>
    <v-btn small class="mr-2" @click="testButton()">Test용 새고고침</v-btn>

    <!-- Product type selector -->
    <v-radio-group v-model="selectedProductType" row>
      <v-radio label="적금" value="savings"></v-radio>
      <v-radio label="예금" value="installment"></v-radio>
    </v-radio-group>

    <!-- Search filter -->
    <v-text-field v-model="searchFilter" label="검색"></v-text-field>

    <!-- For savingsData -->
    <v-list v-if="selectedProductType === 'savings'">
      <v-list-item-group
        v-for="(item, index) in savingsData"
        :key="'savings-' + index"
      >
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle
              >상품 명: {{ item.fin_prdt_nm }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >기간: {{ item.save_trm }}개월</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >최고 이율: {{ item.intr_rate2 }}%</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >월 최대 납입 금액:
              {{ formatAmount(item.max_limit) }}원</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >이자 방식: {{ item.intr_rate_type_nm }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >은행 이름: {{ item.kor_co_nm }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >예금 유형: {{ item.rsrv_type_nm }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <!-- For installmentData -->
    <v-list v-if="selectedProductType === 'installment'">
      <v-list-item-group
        v-for="(item, index) in installmentData"
        :key="'installment-' + index"
      >
        <v-list-item>
          <v-list-item-content>
            <!-- Assuming installmentData has similar fields. Adjust if different. -->
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle
              >상품 명: {{ item.fin_prdt_nm }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >기간: {{ item.save_trm }}개월</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >최고 이율: {{ item.intr_rate2 }}%</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >이자 방식: {{ item.intr_rate_type_nm }}</v-list-item-subtitle
            >
            <v-list-item-subtitle
              >은행 이름: {{ item.kor_co_nm }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>

<script>
// cus
import { formatAmount } from "../lib/formatter";

export default {
  name: "ProductHome",
  created() {
    this.SetProductData();
  },
  computed: {
    savingsData() {
      return this.$store.getters.SAVINGS_DATA;
    },
    installmentData() {
      console.log(this.$store.getters.INSTALLMENT_DATA);
      return this.$store.getters.INSTALLMENT_DATA;
    },
  },
  data() {
    return {
      selectedProductType: "savings", // default to savings
      searchFilter: "",
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
    async SetProductData() {
      try {
        await this.$store.dispatch("SET_PRODUCT_DATA");
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
  },
};
</script>

