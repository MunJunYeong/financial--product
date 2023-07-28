import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import jwt_decode from "jwt-decode";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
  created() {
    const userToken = localStorage.getItem("access_token");
    if (userToken) {
      try {
        const decoded = jwt_decode(userToken);
        this.$store.commit("SET_USER", decoded);
      } catch (error) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
      }
    }
  },
}).$mount("#app");
