<template>
  <v-container>
    <v-btn small class="mr-2" @click="testButton()">Test용 새고고침</v-btn>
    <div>aaa</div>
  </v-container>
</template>
<script>
export default {
  name: "ProductHome",
  methods: {
    async testButton() {
      const res = await this.$store.dispatch("TEST_REFRESH_PRODUCT", {});
      return res
    },
  },
};
</script>

