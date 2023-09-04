// vendor
import jwt_decode from "jwt-decode";

// cus
import AuthService from "@/service/auth";
import utils from "../lib/utils"

const authModule = {
  state: {
    user: null,
    authError: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
      utils.RemoveToken();
    },
    SET_AUTH_ERROR(state, error) {
      state.authError = error;
    },
    RESET_AUTH_ERROR(state) {
      utils.RemoveToken();
      state.authError = null;
    },
  },
  getters: {
    GET_USER(state) {
      return state.user;
    },
    AUTH_ERROR(state) {
      return state.authError;
    }
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async SIGN_UP({ commit }, data) {
      try {
        const res = await AuthService.SignUp(data);
        return res.data;
      } catch (err) {
        return err;
      }
    },

    async SIGN_IN({ commit }, data) {
      let res;
      try {
        res = await AuthService.SignIn(data);
      } catch (err) {
        return err;
      }

      // fail to login
      if (res === false) {
        return false;
      }

      // save token
      utils.SetToken(res.access_token, res.refresh_token)

      const user = jwt_decode(res.access_token);
      commit("SET_USER", user);

      return true;
    },

    Logout({ commit }) {
      commit("CLEAR_USER");
    },

    HANDLE_AUTH_ERROR({ commit }, err) {
      commit("SET_AUTH_ERROR", err.message);
    },
    RESET_AUTH_ERROR({commit}) {
      commit("RESET_AUTH_ERROR");
    },

    // eslint-disable-next-line no-unused-vars
    async SAVE_SAVINGS({ commit }, data) {},
  },
};

export default authModule;
