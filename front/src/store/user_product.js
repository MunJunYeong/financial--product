// cus
import { openDialog } from "@/lib/defines";
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
      // console.log(state.products)
      return state.products;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async SAVE_PRODUCT_AFTER_CALC({ dispatch }, data) {
      try {
        await prodService.SaveProductAfterCalc(data);
        return true;
      } catch (err) {
        dispatch(openDialog, err.message, { root: true });
        return false;
      }
    },

    // Get user's all product
    async GET_USER_PRODUCTS({ commit, dispatch }, userIdx) {
      try {
        const res = await prodService.GetUserProducts(userIdx);
        commit("SET_USER_PRODUCT", res.data);
        return true;
      } catch (err) {
        dispatch(openDialog, err.message, { root: true });
        return false;
      }
    },

    // Get user's product
    // eslint-disable-next-line no-unused-vars
    async GET_USER_PRODUCT({ dispatch }, data) {
      try {
        const res = await prodService.GetUserProduct(
          data.userIdx,
          data.productIdx
        );
        return res.data;
      } catch (err) {
        dispatch(openDialog, err.message, { root: true });
        return false;
      }
    },
  },
};

export default userProductModule;
