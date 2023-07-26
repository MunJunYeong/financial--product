<template>
  <v-dialog :value="show" @input="$emit('update:show', $event)" max-width="500px">
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
    close() {
      this.$emit('update:show', false);
    },
  },
};
</script>