<template>
  <v-dialog :value="show" @input="updateShow" max-width="500px">
    <v-card>
      <v-card-title class="headline">알림</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="close">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["show", "message"],
  methods: {
    updateShow(value) {
      this.$emit('update:show', value);
      if (!value) {
        this.$emit('closed'); // 닫힌 경우 'closed' 이벤트를 발생시킴
      }
    },
    close() {
      this.updateShow(false);
    },
  },
};
</script>