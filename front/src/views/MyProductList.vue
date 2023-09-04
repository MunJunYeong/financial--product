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

    <AlertDialog
      v-bind="$attrs"
      :show="dialog"
      :message="dialogMessage"
      @update:show="handleDialogClose"
    />
  </v-container>
</template>
<script>
import { formatDate } from "../lib/formatter";
import AlertDialog from "@/components/AlertDialog.vue";

export default {
  name: "MyProductList",
  components: {
    AlertDialog,
  },
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
    };
  },
  methods: {
    formatDate,
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