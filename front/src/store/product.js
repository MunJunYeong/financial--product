// cus
import prodService from "@/service/product";

const productModule = {
  state: {
    best_savings: [],
    installment: [],
  },
  mutations: {
    SET_BEST_SAVINGS_DATA(state, data) {
      state.best_savings = data;
    },
    SET_INSTALLMENT_DATA(state, data) {
      state.installment = data;
    },
  },
  getters: {
    SAVINGS_DATA(state) {
      return state.best_savings;
    },
    INSTALLMENT_DATA(state) {
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
    async SET_BEST_PRODUCT_DATA({ commit }) {
      try {
        const savings = await prodService.GetBestSavingsProduct();
        const installment = await prodService.GetBestInstallmentProduct();
        
        commit("SET_BEST_SAVINGS_DATA", savings.data);
        commit("SET_INSTALLMENT_DATA", installment.data);
      } catch (err) {
        return err;
      }
      return true;
    },
  },
};

export default productModule;
