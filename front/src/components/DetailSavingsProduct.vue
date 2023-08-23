<template>
  <v-container>
    <v-row>
      <v-col
        v-for="(item, index) in product"
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
            <v-btn text @click="goToDetailProduct(item.fin_prdt_cd)"
              >자세히</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// cus
import { formatAmount } from "../lib/formatter";

export default {
  name: "DetailSavingsProduct",
  props: ["fin_prdt_cd"],
  async created() {
    this.product = await this.$store.dispatch(
      "SET_DETAIL_SAVINGS",
      this.fin_prdt_cd
    );
  },
  data() {
    return {
      product: null,
    };
  },
  methods: {
    formatAmount,
  },
};
</script>
