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
    // eslint-disable-next-line no-unused-vars
    async TEST_REFRESH_PRODUCT({ commit }) {
      const res = await prodService.SaveSavingsProduct();
      return res;
    },

    // set product data
    async SET_BEST_PRODUCT_DATA({ commit, dispatch }) {
      try {
        const savings = await prodService.GetBestSavingsProducts();
        const installment = await prodService.GetBestInstallmentProducts();

        commit("BEST_SAVINGS_DATA", savings.data);
        commit("BEST_INSTALLMENT_DATA", installment.data);
      } catch (err) {
        dispatch("OPEN_DIALOG", err.message, { root: true });
        throw err;
      }
      return true;
    },

    // eslint-disable-next-line no-unused-vars
    async SET_DETAIL_SAVINGS({ dispatch }, prodCode) {
      try {
        const res = await prodService.GetDetailSavings(prodCode);
        return res.data;
      } catch (err) {
        dispatch("OPEN_DIALOG", err.message, { root: true });
        throw err;
      }
    },

    // eslint-disable-next-line no-unused-vars
    async SET_DETAIL_INSTALLMENTS({ dispatch }, prodCode) {
      try {
        const res = await prodService.GetDetailInstallments(prodCode);
        return res.data;
      } catch (err) {
        dispatch("OPEN_DIALOG", err.message, { root: true });
        throw err;
      }
    },
  },
};

export default productModule;
