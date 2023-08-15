// cus
import axios from "@/lib/axios";

// preset
const url = process.env.VUE_APP_AUTH_PROD_URL + "/prod";

const SaveSavingsProduct = async () => {
  try {
    const res = await axios.post(`${url}/savings`, {});
    const res2 = await axios.post(`${url}/installment`, {});
    return res === res2;
  } catch (err) {
    console.log(err);
    return err;
  }
};

// get savings data
const GetSavingsProduct = async () => {
  try {
    const res = await axios.get(`${url}/savings`);
    return res;
  } catch (err) {
    return err;
  }
};

// get installment data
const GetInstallmentProduct = async () => {
  try {
    const res = await axios.get(`${url}/installment`);
    return res;
  } catch (err) {
    return err;
  }
};

export default {
  SaveSavingsProduct,
  GetSavingsProduct,
  GetInstallmentProduct,
};
