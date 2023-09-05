<template>
  <v-container>
    <div>bbb</div>
  </v-container>
</template>
<script>
// cus

export default {
  name: "MyInfo",
  created() {
    // 페이지가 생성될 때 API 호출
    this.authenticate();
  },
  data() {
    return {};
  },
  methods: {
    async authenticate() {
      try {
        await this.$store.dispatch("AUTHENTICATE");
      } catch (err) {
        return;
      }
    },
  },
};
</script>

