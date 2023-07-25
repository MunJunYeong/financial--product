import AuthService from "@/service/auth";

const authModule = {
  state: {},
  mutations: {},
  getters: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    async SignUp({ commit }, data) {
      try {
        const res = await AuthService.SignUp(data);
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    // eslint-disable-next-line no-unused-vars
    async SignIn({ commit }, data) {
      try {
        const res = await AuthService.SignIn(data);
        return res;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export default authModule;
