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
const GetBestSavingsProducts = async () => {
  try {
    const res = await axios.get(`${url}/savings/best`);
    return res;
  } catch (err) {
    return err;
  }
};

// get installment data
const GetBestInstallmentProducts = async () => {
  try {
    const res = await axios.get(`${url}/installment/best`);
    return res;
  } catch (err) {
    return err;
  }
};

// get detail savings by product code
const GetDetailSavings = async (prodCode) => {
  try {
    const res = await axios.get(`${url}/savings/${prodCode}`);
    return res;
  } catch (err) {
    return err;
  }
};

// get detail installments by product code
const GetDetailInstallments = async (prodCode) => {
  try {
    const res = await axios.get(`${url}/installment/${prodCode}`);
    return res;
  } catch (err) {
    return err;
  }
};

export default {
  SaveSavingsProduct,
  GetBestSavingsProducts,
  GetBestInstallmentProducts,
  GetDetailSavings,
  GetDetailInstallments,
};
