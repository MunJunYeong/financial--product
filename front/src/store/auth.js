/* eslint-disable no-unused-vars */
// vendor
import jwt_decode from "jwt-decode";

// cus
import AuthService from "@/service/auth";
import utils from "../lib/utils";
import { openDialog } from "@/lib/defines";

const authModule = {
  state: {
    user: null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    CLEAR_USER(state) {
      state.user = null;
      utils.RemoveToken();
    },
  },
  getters: {
    GET_USER(state) {
      return state.user;
    },
  },
  actions: {
    // sign up
    async SIGN_UP({ commit, dispatch }, data) {
      try {
        const res = await AuthService.SignUp(data);
        return res.data;
      } catch (err) {
        dispatch(openDialog, err.message, { root: true });
        throw err;
      }
    },

    // sign in (login)
    async SIGN_IN({ commit, dispatch }, data) {
      try {
        const { resData } = await AuthService.SignIn(data);
        if (!resData) return false; // fail to login

        // save token
        utils.SetToken(resData.access_token, resData.refresh_token);
        // set user
        const user = jwt_decode(resData.access_token);
        commit("SET_USER", user);
        return true;
      } catch (err) {
        dispatch(openDialog, err.message, { root: true });
        throw err;
      }
    },

    // logout
    Logout({ commit }) {
      commit("CLEAR_USER");
    },

    // authenticate
    async AUTHENTICATE({ dispatch }) {
      try {
        await AuthService.Authenticate();
      } catch (err) {
        dispatch(openDialog, err.message, { root: true });
        return err;
      }
    },

    // save savings
    async SAVE_SAVINGS({ commit }, data) {},
  },
};

export default authModule;
