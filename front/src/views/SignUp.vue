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
    <AlertDialog
      v-bind="$attrs"
      :show="dialog"
      :message="dialogMessage"
      @update:show="dialog = $event"
      @closed="handleDialogClosed"
    />
  </v-container>
</template>

<script>
import AlertDialog from "@/components/AlertDialog.vue";
const errMessage =
  "서버와의 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.";

export default {
  name: "SignUp",
  components: {
    AlertDialog,
  },
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
      dialog: false,
      dialogMessage: "",
      isSuccess: false,
    };
  },
  methods: {
    async submitForm() {
      if (this.$refs.form.validate()) {
        let res;
        try {
          res = await this.$store.dispatch("SIGN_UP", {
            id: this.id,
            password: this.password,
            name: this.name,
            email: this.email,
          });
        } catch (err) {
          this.dialogMessage = errMessage;
          this.dialog = true;
          return;
        }

        if (!res) {
          this.dialogMessage = "중복된 ID입니다. 확인해주세요.";
          this.dialog = true;
          return;
        }
        this.dialogMessage = "회원가입 성공했습니다.";
        this.dialog = true;
        this.isSuccess = true;
      }
    },
    handleDialogClosed() {
      if (this.isSuccess) {
        this.$router.push("/signin");
      }
      this.isSuccess = false; // 플래그를 초기화
    },
  },
};
</script>