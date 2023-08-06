<template>
  <v-container>
    <v-data-table :headers="headers" :items="products" class="elevation-1">
      <template v-slot:item="{ item }">
        <tr>
          <td>{{ item.product_idx }}</td>
          <td>{{ item.name }}</td>
          <td>{{ formatDate(item.start_date) }}</td>
          <td>{{ formatDate(item.finish_date) }}</td>
          <td>{{ item.period }}</td>
          <td>{{ item.rate }}%</td>
          <td>{{ item.monthly_payment }}</td>
          <td>{{ item.total_interest }}</td>
          <td>{{ item.type }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-container>
</template>
<script>
export default {
  name: "MyListHome",
  mounted() {
    const userIdx = this.userData.user_idx; // 사용자 ID 가져오기, 필요에 따라 조정
    this.$store.dispatch('GET_USER_PRODUCTS', { userIdx });
  },
  computed: {
    userData: function () {
      return this.$store.getters.GET_USER;
    },
    products: function () {
      return this.$store.getters.GET_PRODUCTS;
    },
    headers: function () {
      return [
        { text: "Product ID", value: "product_idx" },
        { text: "Name", value: "name" },
        { text: "Start Date", value: "start_date" },
        { text: "Finish Date", value: "finish_date" },
        { text: "Period (months)", value: "period" },
        { text: "Rate", value: "rate" },
        { text: "Monthly Payment", value: "monthly_payment" },
        { text: "Total Interest", value: "total_interest" },
        { text: "Type", value: "type" },
      ];
    },
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
  
};
</script>