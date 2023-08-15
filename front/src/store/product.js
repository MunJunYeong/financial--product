// cus
import prodService from "@/service/product";

const productModule = {
  state: {
    products: [],
  },
  mutations: {
  },
  getters: {
  },
  actions: {
    // eslint-disable-next-line no-unused-vars
    async TEST_REFRESH_PRODUCT({commit}) {
      const res = await prodService.SaveSavingsProduct()
      return res;
    }
  },
};

export default productModule;
