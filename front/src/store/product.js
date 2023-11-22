/* eslint-disable no-unused-vars */
// cus
import prodService from "@/service/product";

const productModule = {
  state: {
    best_savings: [],
    installment: [],
  },
  mutations: {
    BEST_SAVINGS_DATA(state, data) {
      state.best_savings = data;
    },
    BEST_INSTALLMENT_DATA(state, data) {
      state.installment = data;
    },
  },
  getters: {
    BEST_SAVINGS_DATA(state) {
      return state.best_savings;
    },
    BEST_INSTALLMENT_DATA(state) {
      return state.installment;
    },
  },
  actions: {
    // TODO: refresh 하는 기능은 scheduling으로 돌려야 함.
    async TEST_REFRESH_PRODUCT({ commit }) {
      const res = await prodService.SaveSavingsProduct();
      return res;
    },

    // set product data
    async SET_BEST_PRODUCT_DATA({ commit, dispatch }) {
      const savings = await prodService.GetBestSavingsProducts();
      const installment = await prodService.GetBestInstallmentProducts();

      commit("BEST_SAVINGS_DATA", savings.data);
      commit("BEST_INSTALLMENT_DATA", installment.data);
      return true;
    },

    async SET_DETAIL_SAVINGS({ dispatch }, prodCode) {
      const res = await prodService.GetDetailSavings(prodCode);
      return res.data;
    },

    async SET_DETAIL_INSTALLMENTS({ dispatch }, prodCode) {
      const res = await prodService.GetDetailInstallments(prodCode);
      return res.data;
    },
  },
};

export default productModule;
