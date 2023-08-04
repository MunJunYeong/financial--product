<template>
  <v-dialog v-model="dialog" max-width="350px">
    <v-card>
      <v-card-title class="headline">시작 날짜 선택</v-card-title>
      <v-card-text>
        <v-date-picker v-model="startDate" no-title scrollable></v-date-picker>
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
      startDate: null,
      resolvePromise: null,
    };
  },
  methods: {
    close() {
      this.dialog = false;
    },
    submit() {
      if (this.resolvePromise) {
        this.resolvePromise(this.startDate);
        this.resolvePromise = null;
      }
      this.close();
    },
    waitForDate() {
      this.dialog = true;
      return new Promise((resolve) => {
        this.resolvePromise = resolve;
      });
    },
  },
};
</script>