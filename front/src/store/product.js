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

    // Get user's all product
    async GET_USER_PRODUCTS({ commit }, userIdx) {
      let res;
      try {
        res = await prodService.GetUserProducts(userIdx);
      } catch (err) {
        console.log(err);
      }
      commit("SET_PRODUCTS", res.data);
    },

    // Get user's product
    async GET_USER_PRODUCT({commit}, data) {
      let res;
      try{
        res = await prodService.GetUserProduct(data.userIdx, data.productIdx);
      }catch(err){
        console.log(err);
        return null;
      }
      return res.data;
    }
  },
};

export default productModule;
