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

    <AlertDialog
      v-bind="$attrs"
      :show="dialog"
      :message="dialogMessage"
      @update:show="dialog = $event"
    />
  </v-container>
</template>

<script>
import AlertDialog from "@/components/AlertDialog.vue";
const errMessage =
  "서버와의 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.";

export default {
  name: "SignIn",
  components: {
    AlertDialog,
  },
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
      dialog: false,
      dialogMessage: "",
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
          this.dialogMessage = errMessage;
          this.dialog = true;
          return;
        }

        if (!res) {
          this.dialogMessage =
            "ID나 PW가 올바르지 않습니다. 다시 시도해주세요.";
          this.dialog = true;
          return;
        }
        this.$router.push("/home");
      }
    },
  },
};
</script>
