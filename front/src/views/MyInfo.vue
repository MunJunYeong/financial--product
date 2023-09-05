<template>
  <v-container>
    <div>bbb</div>

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
// cus
import AlertDialog from "@/components/AlertDialog.vue";

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
    isError() {
      return this.$store.getters.ERROR;
    },
  },
  watch: {
    // error handler
    isError(errMessage) {
      if (errMessage) {
        this.dialogMessage = errMessage;
        this.dialog = true;
        this.$store.dispatch("RESET_ERROR", null);
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
    async authenticate() {
      try {
        await this.$store.dispatch("AUTHENTICATE");
      } catch (err) {
        return;
      }
    },
    handleDialogClosed() {
      this.$router.push("/home");
    },
  },
};
</script>

