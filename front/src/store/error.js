import utils from "@/lib/utils";

const errorModule = {
  state: {
    err: null,
  },
  mutations: {
    SET_ERROR(state, errMsg) {
      if (!errMsg) {
        utils.RemoveToken();
      }
      state.err = errMsg;
    },
  },
  getters: {
    ERROR(state) {
      return state.err;
    },
  },
  actions: {
    RESET_ERROR({ commit }) {
      commit("SET_ERROR", null);
    },
  },
};

export default errorModule;
