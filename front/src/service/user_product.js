// vendor
import moment from "moment";

// cus
import api from "./common"

// preset
const url = process.env.VUE_APP_AUTH_PROD_URL;

/**
 * Save user's product
 * @param {Object} data
 * @param {string} data.name // 없을 수도 있음.
 * @param {string} data.startDate
 * @param {number} data.period
 * @param {number} data.price
 * @param {number} data.rate
 * @param {number} data.totalInterest
 * @param {boolean} data.isSimple
 * @param {string} data.type
 * @param {number} data.userIdx
 */
// TODO: change function name
const SaveProductAfterCalc = async (data) => {
  const finishDate = moment(data.startDate)
    .add(data.period, "months")
    .format("YYYY-MM-DD");
  data.name = data.name || "N/A";

  try {
    const res = await api.POST(`${url}/user-prod/${data.userIdx}`, {
      name: data.name,
      start_date: data.startDate,
      finish_date: finishDate,
      period: data.period,
      monthly_payment: data.price,
      rate: data.rate,
      is_simple: data.isSimple,
      total_interest: data.totalInterest,
      type: data.type,
    });
    return res;
  } catch (err) {
    return err;
  }
};

/**
 * Get user's prdoucts
 * @param {number} userIdx
 */
const GetUserProducts = async (userIdx) => {
  try {
    const res = await api.GET(`${url}/user-prod/${userIdx}`, {});
    return res;
  } catch (err) {
    return err;
  }
};

/**
 * Get user's prdoucts
 * @param {number} userIdx
 * @param {number} productIdx
 */
const GetUserProduct = async (userIdx, productIdx) => {
  try {
    const res = await api.GET(
      `${url}/user-prod/${Number(userIdx)}/prod/${Number(productIdx)}`
    );
    return res;
  } catch (err) {
    return err;
  }
};

export default {
  SaveProductAfterCalc,
  GetUserProducts,
  GetUserProduct,
};
