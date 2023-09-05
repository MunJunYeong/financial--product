const errorModule = {
  state: {
    err: null,
  },
  mutations: {
    SET_ERROR(state, errMsg) {
      state.err = errMsg;
    },
  },
  getters: {
    ERROR(state) {
      return state.err;
    },
  },
  actions: {},
};

export default errorModule;
