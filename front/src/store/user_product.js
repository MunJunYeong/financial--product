/* eslint-disable no-unused-vars */
// cus
import prodService from "@/service/user_product";

const userProductModule = {
  state: {
    products: [],
  },
  mutations: {
    SET_USER_PRODUCT(state, products) {
      state.products = products;
    },
  },
  getters: {
    GET_USER_PRODUCT(state) {
      return state.products;
    },
  },
  actions: {
    async SAVE_PRODUCT_AFTER_CALC({ dispatch }, data) {
      await prodService.SaveProductAfterCalc(data);
      return true;
    },

    // Get user's all product
    async GET_USER_PRODUCTS({ commit, dispatch }, userIdx) {
      const res = await prodService.GetUserProducts(userIdx);
      commit("SET_USER_PRODUCT", res.data);
      return true;
    },

    // Get user's product
    async GET_USER_PRODUCT({ dispatch }, data) {
      const res = await prodService.GetUserProduct(
        data.userIdx,
        data.productIdx
      );
      return res.data;
    },

    async UPDATE_MY_PRODUCT({ dispatch }, product) {
      const res = await prodService.UpdateUserProduct(
        product.name,
        product.userIdx,
        product.productIdx
      );
      return res.data;
    },
  },
};

export default userProductModule;
