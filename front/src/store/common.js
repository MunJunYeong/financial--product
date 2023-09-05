const commonMoudle = {
  state: {
    err: null,
    dialog: {
      show: false,
      message: "",
    },
  },
  mutations: {
    SET_DIALOG_STATE(state, { show, message }) {
      state.dialog.show = show;
      state.dialog.message = message;
    },
  },
  getters: {
    DIALOG(state) {
      return state.dialog;
    },
  },
  actions: {
    OPEN_DIALOG({ commit }, message) {
      commit("SET_DIALOG_STATE", { show: true, message });
    },
    CLOSE_DIALOG({ commit }) {
      commit("SET_DIALOG_STATE", { show: false, message: "" });
    },
  },
};

export default commonMoudle;
