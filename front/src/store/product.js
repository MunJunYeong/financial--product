// cus
import prodService from "@/service/product";

const productModule = {
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
  },
  getters: {
    GET_PRODUCTS(state) {
      // console.log(state.products)
      return state.products;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async SAVE_PRODUCT_AFTER_CALC({ commit }, data) {
      let res;
      try {
        await prodService.SaveProductAfterCalc(data);
      } catch (err) {
        console.log(err);
      }
      return res;
    },
    async GET_USER_PRODUCTS({ commit }, data) {
      let res;
      try {
        res = await prodService.GetUserProducts(data.userIdx);
      } catch (err) {
        console.log(err);
      }
      commit("SET_PRODUCTS", res.data);
    },
  },
};

export default productModule;
