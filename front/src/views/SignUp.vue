<template>
  <v-container>
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
  </v-container>
</template>

<script>
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
        // Form is valid, proceed with signup...
        let res;
        try {
          res = await this.$store.dispatch("SignUp", {
            id: this.id,
            password: this.password,
            name: this.name,
            email: this.email,
          });
        } catch (err) {
          console.log(err);
        }
        console.log(res);
      }
    },
  },
};
</script>