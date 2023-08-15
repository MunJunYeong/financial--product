// cus
import axios from "@/lib/axios";

// preset
const url = process.env.VUE_APP_AUTH_PROD_URL + "prod";

const SaveSavingsProduct = async () => {
  try {
    const res = await axios.get(`${url}/savings`, {});
    return res;
  } catch (err) {
    return err;
  }
};

export default {
  SaveSavingsProduct,
};
