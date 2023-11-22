<template>
  <v-container>
    <v-data-table :headers="headers" :items="products" class="elevation-1">
      <template v-slot:item="{ item }">
        <tr @click="goToProduct(item)">
          <td>{{ item.product_idx }}</td>
          <td>{{ item.name }}</td>
          <td>{{ formatDate(item.start_date) }}</td>
          <td>{{ formatDate(item.finish_date) }}</td>
          <td>
            {{ calculateCurrentAmount(item.start_date, item.monthly_payment) }}
          </td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { errMsgInternal, openDialog } from "../lib/defines";
import { formatDate } from "../lib/formatter";

export default {
  name: "MyProductList",
  watch: {
    userData: {
      immediate: true, // 컴포넌트 초기화 시에도 감시 함수 실행
      handler(newValue) {
        if (newValue && newValue.user_idx) {
          this.getMyProducts(newValue.user_idx);
        }
      },
    },
  },
  computed: {
    userData: function () {
      return this.$store.getters.GET_USER;
    },
    products: function () {
      return this.$store.getters.GET_USER_PRODUCT;
    },
    headers: function () {
      return [
        { text: "Product ID", value: "product_idx" },
        { text: "Name", value: "name" },
        { text: "Start Date", value: "start_date" },
        { text: "Finish Date", value: "finish_date" },
        { text: "Current Amount", value: "current_amount" },
      ];
    },
  },
  data() {
    return {};
  },
  methods: {
    formatDate,
    async getMyProducts(userIdx) {
      try {
        await this.$store.dispatch("GET_USER_PRODUCTS", userIdx);
      } catch (err) {
        this.$store.dispatch(openDialog, errMsgInternal);
      }
    },
    calculateCurrentAmount(startDate, monthlyPayment) {
      const start = new Date(startDate);
      const now = new Date();
      const monthsElapsed =
        (now.getFullYear() - start.getFullYear()) * 12 +
        now.getMonth() -
        start.getMonth();
      const amount = monthsElapsed * monthlyPayment;

      return amount.toLocaleString();
    },
    goToProduct(product) {
      this.$router.push({
        name: "my_product",
        params: { product_idx: product.product_idx },
      });
    },
  },
};
</script>