<template>
  <v-container>
    <v-btn small class="mr-2" @click="testButton()">Test용 새고고침</v-btn>
    <v-list>
      <v-list-item-group v-for="(item, index) in savingsData" :key="index">
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
            <v-list-item-subtitle
              >월 최대 납입 금액: {{ formatAmount(item.max_limit) }}원</v-list-item-subtitle
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
            <v-list-item-subtitle
              >예금 유형: {{ item.rsrv_type_nm }}</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-container>
</template>
<script>

// cus
import {formatAmount} from "../lib/formatter"

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
      return this.$store.getters.INSTALLMENT_DATA;
    },
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
  },
};
</script>

