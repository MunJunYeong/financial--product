<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <Navigation />
      </v-col>
      <v-col cols="10">
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Navigation from "@/components/Navigation.vue";

export default {
  name: "IndexLayout",
  components: {
    Navigation,
  },
};
</script>