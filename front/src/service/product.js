// cus
import utils from "../lib/utils/http";

// preset
const url = process.env.VUE_APP_AUTH_PROD_URL + "/prod";

const SaveSavingsProduct = async () => {
  try {
    const res = await utils.POST(`${url}/savings`, {});
    const res2 = await utils.POST(`${url}/installment`, {});
    return res === res2;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get savings data
const GetBestSavingsProducts = async () => {
  try {
    const res = await utils.GET(`${url}/savings/best`);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get installment data
const GetBestInstallmentProducts = async () => {
  try {
    const res = await utils.GET(`${url}/installment/best`);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get detail savings by product code
const GetDetailSavings = async (prodCode) => {
  try {
    const res = await utils.GET(`${url}/savings/${prodCode}`);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// get detail installments by product code
const GetDetailInstallments = async (prodCode) => {
  try {
    const res = await utils.GET(`${url}/installment/${prodCode}`);
    return res;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  SaveSavingsProduct,
  GetBestSavingsProducts,
  GetBestInstallmentProducts,
  GetDetailSavings,
  GetDetailInstallments,
};
