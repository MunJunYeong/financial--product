<template>
  <div>
    <h1>Product Details</h1>
    <div v-if="product">
      <p>Name: {{ product.name }}</p>
      <p>Type: {{ product.type }}</p>
      <p>Rate: {{ product.rate }}%</p>
      <p>Monthly Payment: {{ product.monthly_payment }}</p>
      <p>Total Interest: {{ product.total_interest }}</p>
      <p>Period: {{ product.period }} months</p>
      <p>Start Date: {{ product.start_date }}</p>
      <p>Finish Date: {{ product.finish_date }}</p>
      <p>Is Simple: {{ product.is_simple }}</p>
      <p>Created At: {{ product.createdAt }}</p>
      <p>Updated At: {{ product.updatedAt }}</p>
    </div>
  </div>
</template>

<script>
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
    const product = await this.$store.dispatch("GET_USER_PRODUCT", {
      userIdx: this.userData.user_idx,
      productIdx: this.product_idx,
    });
    
  },
};
</script>