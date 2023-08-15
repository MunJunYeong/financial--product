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
export default {
  name: "MyProductList",
  mounted() {
    const userIdx = this.userData.user_idx; // 사용자 ID 가져오기, 필요에 따라 조정
    this.$store.dispatch("GET_USER_PRODUCTS", userIdx);
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
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
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