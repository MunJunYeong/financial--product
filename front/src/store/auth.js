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
    async SIGN_IN({ commit, dispatch }, inputData) {
      try {
        const res = await AuthService.SignIn(inputData);
        const data = res.data
        if (!data) return false; // fail to login

        // save token
        utils.SetToken(data.access_token, data.refresh_token);
        // set user
        const user = jwt_decode(data.access_token);
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
    // update user's otp enabled
    async UPDATE_OTP_ENABLED ({commit, dispatch}, data) {
      try{
        const user = await AuthService.UpdateOtpEnabled(data)
        commit("SET_USER", user);
      }catch(err ){
        dispatch(openDialog, err.message, { root: true });
        return err;
      }
    }

  },
};

export default authModule;
