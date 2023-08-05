import prodService from "@/service/product";

const productModule = {
  state: {},
  mutations: {},
  getters: {},
  actions: {
    // eslint-disable-next-line no-unused-vars
    async SAVE_PRODUCT_AFTER_CALC({ commit }, data) {
      let res;
      try {
        await prodService.SaveProductAfterCalc(data);
      }catch(err) {
        console.log(err)
      }
      return res;
    },
  },
};

export default productModule;
