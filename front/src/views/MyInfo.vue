<template>
  <v-container>
    <div>id : {{ userData.id }}</div>
    <div>email : {{ userData.email }}</div>
    <div>name : {{ userData.name }}</div>

    <v-btn v-on:click="updateOtpEnabled">{{
      userData.otp_enabled ? "Disable" : "Enable"
    }}</v-btn>
    <v-btn> </v-btn>
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
  computed: {
    userData: function () {
      return this.$store.getters.GET_USER;
    },
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
    async updateOtpEnabled() {
      const { user_idx, otp_enabled } = this.userData;
      try {
        await this.$store.dispatch("UPDATE_OTP_ENABLED", {
          user_idx: user_idx,
          otp_enabled: !otp_enabled,
        });
      } catch (err) {
        return;
      }
    },
  },
};
</script>

  