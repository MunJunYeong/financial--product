<template>
  <v-container>
    <v-row>
      <v-col cols="5">
        <v-form ref="form" v-model="valid" @submit.prevent="submitForm">
          <v-text-field
            v-model="id"
            :rules="idRules"
            label="ID"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="passwordRules"
            label="Password"
            type="password"
            required
          ></v-text-field>

          <v-btn color="primary" :disabled="!valid" @click="submitForm"
            >Submit</v-btn
          >
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { openDialog } from '../lib/defines';
export default {
  name: "SignIn",
  data() {
    return {
      valid: true,
      id: "aaa",
      password: "aaa",
      idRules: [
        (v) => !!v || "ID is required",
        (v) => v.length >= 3 || "ID must be at least 3 characters",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 3 || "Password must be at least 3 characters",
      ],
      isSuccess: false, // TODO: 어떻게 처리할지 생각
    };
  },
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        let res;
        try {
          res = await this.$store.dispatch("SIGN_IN", {
            id: this.id,
            password: this.password,
          });
        } catch (err) {
          return;
        }

        if (!res) {
          this.$store.dispatch(openDialog, "ID나 PW가 올바르지 않습니다. 다시 시도해주세요.")
          return;
        }
        this.isSuccess = true;
      }
    },
  },
};
</script>
