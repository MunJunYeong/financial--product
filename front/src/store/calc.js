/* eslint-disable no-unused-vars */

// cus
import CalcService from "@/service/calc";

const calcModule = {
  state: {},
  mutations: {},
  getters: {},
  actions: {
    // 정기 적금 및 예금 계산 (data의 type으로 예*적금 분리)
    async CALC_REG_SAVINGS_DEPOSIT({ dispatch }, data) {
      try {
        const res = await CalcService.CalcRegSavingsDeposit(data);
        return res.data.tax;
      } catch (err) {
        dispatch("OPEN_DIALOG", err.message, { root: true });
        throw err;
      }
    },
  },
};

export default calcModule;
