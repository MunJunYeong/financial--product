<template>
  <v-dialog v-model="dialog" max-width="350px">
    <v-card>
      <v-card-title class="headline">한도 금액 입력</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="limitAmount"
          label="한도 금액"
          type="number"
          :rules="[(v) => !!v || '금액을 입력해주세요.']"
          required
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">닫기</v-btn>
        <v-btn color="green darken-1" text @click="submit">제출</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      limitAmount: null,
      resolvePromise: null,
    };
  },
  methods: {
    close() {
      this.dialog = false;
    },
    submit() {
      if (this.resolvePromise) {
        this.resolvePromise(this.limitAmount);
        this.resolvePromise = null;
      }
      this.close();
    },
    waitForLimit() {
      this.dialog = true;
      return new Promise((resolve) => {
        this.resolvePromise = resolve;
      });
    },
  },
};
</script>