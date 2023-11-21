<template>
  <v-app id="app">
    <link
      href="//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css"
      rel="stylesheet"
      type="text/css"
    />
    <v-main>
      <router-view />
      <AlertDialog
        v-if="dialog"
        :show="dialog.show"
        :message="dialog.message"
        @update:show="updateShow"
      />
    </v-main>
  </v-app>
</template>

<script>
import AlertDialog from "@/components/dialog/AlertDialog.vue";

export default {
  components: {
    AlertDialog,
  },
  computed: {
    dialog() {
      return this.$store.getters.DIALOG;
    },
  },
  methods: {
    updateShow(value) {
      if (!value) {
        this.$store.dispatch("CLOSE_DIALOG");
      }
    },
  },
};
</script>

<style>
* {
  font-family: "Spoqa Han Sans Neo", "sans-serif";
}
a {
  text-decoration: none;
}
/* 반응형 최대크기 */
#app {
  margin: 0 auto;
  min-height: 100%;
  /* width:1200px; */
  /* border-left:1px #D8D8D8 solid;  border-right:1px #D8D8D8 solid;   */
  padding-top: 20px;
}
/* 여백제거 + 드래그방지 */
body {
  padding: 0;
  margin: 0;
  -ms-user-select: none;
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
</style>