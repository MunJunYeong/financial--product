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

          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
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
import { openDialog } from "../lib/defines";
export default {
  name: "SignUp",
  data() {
    return {
      valid: true,
      id: "aaa",
      password: "aaa",
      name: "aaa",
      email: "aaa@aa.com",
      idRules: [
        (v) => !!v || "ID is required",
        (v) => v.length >= 3 || "ID must be at least 3 characters",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => v.length >= 3 || "Password must be at least 3 characters",
      ],
      nameRules: [(v) => !!v || "Name is required"],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        const res = await this.$store.dispatch("SIGN_UP", {
          id: this.id,
          password: this.password,
          name: this.name,
          email: this.email,
        });
        if (!res) {
          this.$store.dispatch(openDialog, "중복된 ID입니다. 확인해주세요.");
          return;
        }
        this.$store.dispatch(openDialog, "회원가입 성공했습니다.");
      }
    },
  },
};
</script>