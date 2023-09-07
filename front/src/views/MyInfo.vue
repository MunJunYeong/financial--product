<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <div class="user-info-box pa-5 elevation-2">
          <h3 class="mb-5">User Info</h3>

          <div class="info-item mb-5">
            <strong>ID:</strong> {{ userData.id }}
          </div>

          <div class="info-item mb-5">
            <strong>Email:</strong>
            <v-text-field
              v-model="userData.email"
              outlined
              prepend-inner-icon="mdi-email-edit"
              label="Edit Email"
              hide-details="auto"
              solo
            ></v-text-field>
          </div>

          <div class="info-item mb-5">
            <strong>Name:</strong>
            <v-text-field
              v-model="userData.name"
              outlined
              prepend-inner-icon="mdi-account-edit"
              label="Edit Name"
              hide-details="auto"
              solo
            ></v-text-field>
          </div>

          <v-btn
            @click="updateOtpEnabled"
            :color="userData.otp_enabled ? 'red' : 'green'"
            class="mb-5"
          >
            {{ userData.otp_enabled ? "Disable OTP" : "Enable OTP" }}
          </v-btn>

          <v-btn @click="updateUserInfo" color="blue darken-1" block>
            Update
          </v-btn>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import { openDialog } from "../lib/defines";

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
    // 해당 page 접근 시 token 확인
    async authenticate() {
      await this.$store.dispatch("AUTHENTICATE");
    },

    // OTP enabled
    async updateOtpEnabled() {
      const { user_idx, otp_enabled } = this.userData;
      await this.$store.dispatch("UPDATE_OTP_ENABLED", {
        user_idx: user_idx,
        otp_enabled: !otp_enabled,
      });
    },

    //
    async updateUserInfo() {
      const { user_idx, email, name } = this.userData;
      const res = await this.$store.dispatch("UPDATE_USER_INFO", {
        user_idx: user_idx,
        email: email,
        name: name,
      });
      if (res) {
        this.$store.dispatch(openDialog, "회원 정보 Update 성공");
      }
    },
  },
};
</script>
