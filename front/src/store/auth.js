// vendor
import jwt_decode from "jwt-decode";

// cus
import AuthService from "@/service/auth";

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
      localStorage.removeItem("access_token")
      localStorage.removeItem("refresh_token")
    }
  },
  getters: {
    GET_USER(state) {
      return state.user;
    },
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async SignUp({ commit }, data) {
      try {
        const res = await AuthService.SignUp(data);
        return res.data;
      } catch (err) {
        return err;
      }
    },

    async SignIn({ commit }, data) {
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
      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);

      const user = jwt_decode(res.access_token);
      commit("SET_USER", user);

      return true;
    },
    Logout({commit}) {
      commit("CLEAR_USER")
    }
  },
};

export default authModule;
