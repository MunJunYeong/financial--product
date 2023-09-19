import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth";
import product from "./product";
import userProduct from "./user_product";
import common from "./common";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    product,
    userProduct,
    common,
  },
});
