import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import vuetify from "./plugins/vuetify";
import jwt_decode from "jwt-decode";

import utils from "./lib/utils/http";

Vue.config.productionTip = false;

new Vue({
  store,
  router,
  vuetify,
  render: (h) => h(App),
  async created() {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");
    // refresh
    if (accessToken) {
      try {
        // new token 발급 후 재 설정
        const newAccessToken = await this.$store.dispatch(
          "REFRESH_ACCESS_TOKEN",
          refreshToken
        );
        if (!newAccessToken) {
          utils.RemoveToken();
          return;
        }
        localStorage.setItem("access_token", newAccessToken);
        const decodedUserData = jwt_decode(newAccessToken);
        await this.$store.commit("SET_USER", decodedUserData);
      } catch (err) {
        console.log("created error : ", err.message);
        utils.RemoveToken();
      }
    }
  },
}).$mount("#app");
