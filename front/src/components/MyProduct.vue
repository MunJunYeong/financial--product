<template>
  <v-container>
    <v-card class="mx-auto" max-width="800">
      <v-card-title class="headline">적금 상품 세부내용</v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item class="px-0">
            <v-list-item-content>Name: {{ product.name }}</v-list-item-content>
          </v-list-item>
          <v-list-item class="px-0">
            <v-list-item-content
              >Type:
              {{
                product.type === "savings" ? "정기 적금" : "정기 예금"
              }}</v-list-item-content
            >
          </v-list-item>
          <v-list-item class="px-0">
            <v-list-item-content>Rate: {{ product.rate }}%</v-list-item-content>
          </v-list-item>
          <v-list-item class="px-0">
            <v-list-item-content
              >Monthly Payment:
              {{ formatAmount(product.monthly_payment) }}</v-list-item-content
            >
          </v-list-item>
          <v-list-item class="px-0">
            <v-list-item-content
              >Total Interest:
              {{ formatAmount(product.total_interest) }}</v-list-item-content
            >
          </v-list-item>
          <v-list-item class="px-0">
            <v-list-item-content
              >Period: {{ product.period }}개월</v-list-item-content
            >
          </v-list-item>
          <v-list-item class="px-0">
            <v-list-item-content
              >Start Date:
              {{ formatDate(product.start_date) }}</v-list-item-content
            >
          </v-list-item>
          <v-list-item class="px-0">
            <v-list-item-content
              >Finish Date:
              {{ formatDate(product.finish_date) }}</v-list-item-content
            >
          </v-list-item>
          <v-list-item class="px-0">
            <v-list-item-content
              >복리 여부:
              {{
                product.is_simple === false ? "비적용" : "적용"
              }}</v-list-item-content
            >
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { formatDate, formatAmount } from "../lib/formatter";

export default {
  name: "MyProduct",
  props: {
    product_idx: String,
  },
  computed: {
    userData: function () {
      return this.$store.getters.GET_USER;
    },
  },
  async created() {
    this.product = await this.$store.dispatch("GET_USER_PRODUCT", {
      userIdx: this.userData.user_idx,
      productIdx: this.product_idx,
    });
  },
  data() {
    return {
      product: null, // product를 지역 상태로 추가
    };
  },
  methods: {
    formatDate,
    formatAmount,
  },
};
</script>