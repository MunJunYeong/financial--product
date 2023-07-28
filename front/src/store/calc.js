import CalcService from "@/service/calc";

const calcModule = {
  state: {},
  mutations: {},
  getters: {},
  actions: {
    /**
     * Signs up a new user.
     * @param {Object} data - The user data.
     * @param {string} data.type - The ID of the user.
     */
    // eslint-disable-next-line no-unused-vars
    async CalcRegSavingsDeposit({ commit }, data) {
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
