// cus
import axios from "@/lib/axios";
import { SavingsType } from "@/lib/type";

// preset
const url = process.env.VUE_APP_AUTH_CALC_URL + "/calc";

/**
 * Signs up a new user.
 * @param {Object} data
 * @param {string} data.period
 * @param {string} data.price
 * @param {string} data.rate
 * @param {string} data.isSimple
 * @param {string} data.type
 */
const CalcRegSavingsDeposit = (data) => {
  const formatUrl =
    data.type === SavingsType.SAVINGS ? url + "/savings" : url + "/deposit";
  try {
    const res = axios.post(formatUrl, {
      period: data.period,
      price: data.price,
      rate: data.rate,
      isSimple: data.email,
    });
    return res;
  } catch (err) {
    return err;
  }
};

export default {
  CalcRegSavingsDeposit,
};
