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
            <v-btn text>자세히</v-btn>
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
            <v-btn text>자세히</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// cus
import { formatAmount } from "../lib/formatter";

// TODO: product의 이름으로 map형태를 만든 후 최고 금리시 몇 개월인지 main이 되는 상품만 보여주기
// 자세히와 같은 버튼 클릭 시 해당 상품에 대한 개월마다 금리 이런 걸 보여주는 API가 필요할듯함.

export default {
  name: "ProductHome",
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
  },
  data() {
    return {
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
  },
};
</script>