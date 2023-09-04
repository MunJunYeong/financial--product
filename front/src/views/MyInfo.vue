<template>
  <v-container>
    <div>bbb</div>

    <AlertDialog
      v-bind="$attrs"
      :show="dialog"
      :message="dialogMessage"
      @update:show="handleDialogClose"
    />
  </v-container>
</template>
<script>
// cus
import AlertDialog from "@/components/AlertDialog.vue";

const networkErrMsg =
  "서버와의 연결이 원활하지 않습니다. 잠시 후 다시 시도해주세요.";

export default {
  name: "MyInfo",
  components: {
    AlertDialog,
  },
  created() {
    // 페이지가 생성될 때 API 호출
    this.authenticate();
  },
  computed: {
    // error handler
    authError() {
      return this.$store.getters.AUTH_ERROR;
    },
  },
  watch: {
    // error handler
    authError(errMessage) {
      if (errMessage) {
        this.dialogMessage = errMessage;
        this.dialog = true;
        this.$store.dispatch("RESET_AUTH_ERROR");
      }
    },
  },
  data() {
    return {
      // alert dialog
      dialog: false,
      dialogMessage: "",
    };
  },
  methods: {
    async authenticate(){
      try {
        await this.$store.dispatch("AUTHENTICATE");
      }catch(err){
        this.dialogMessage = networkErrMsg;
          this.dialog = true;
          return;
      }
    },
    handleDialogClose(value) {
      this.dialog = value;
      // 다이얼로그가 닫혔을 때
      if (!value) {
        this.$router.push("/signin");
      }
    },
  },
};
</script>

