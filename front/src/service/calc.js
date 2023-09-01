// cus
import { SavingsType } from "@/lib/type";
import api from "./common"

// preset
const url = process.env.VUE_APP_AUTH_CALC_URL;

/**
 * Signs up a new user.
 * @param {Object} data
 * @param {string} data.period
 * @param {string} data.price
 * @param {string} data.rate
 * @param {string} data.isSimple
 * @param {string} data.type
 */
const CalcRegSavingsDeposit = async (data) => {
  const formatTypeUrl =
    data.type === SavingsType.SAVINGS ? url + "/savings" : url + "/deposit";

  delete data["type"];

  let params = new URLSearchParams();
  for (let key in data) {
    params.append(key, data[key]);
  }
  const fullUrl = formatTypeUrl + "?" + params.toString();

  try {
    const res = await api.GET(fullUrl);
    return res;
  } catch (err) {
    return err;
  }
};

export default {
  CalcRegSavingsDeposit,
};
