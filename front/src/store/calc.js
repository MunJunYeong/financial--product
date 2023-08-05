import CalcService from "@/service/calc";

const calcModule = {
  state: {},
  mutations: {},
  getters: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    async CALC_REG_SAVINGS_DEPOSIT({ commit }, data) {
      let res;
      try {
        res = await CalcService.CalcRegSavingsDeposit(data);
      } catch (err) {
        console.log(err);
      }
      return res.data.tax
    },
  },
};

export default calcModule;
