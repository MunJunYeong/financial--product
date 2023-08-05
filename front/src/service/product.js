// cus
import axios from "@/lib/axios";
import { SavingsType } from "@/lib/type";

// preset
const url = process.env.VUE_APP_AUTH_PROD_URL;

/**
 * Signs up a new user.
 * @param {Object} data
 * @param {string} data.period
 * @param {string} data.price
 * @param {string} data.rate
 * @param {string} data.isSimple
 * @param {string} data.startDate
 * @param {string} data.type
 */
const SaveProductAfterCalc = async (data) => {
  const formatTypeUrl =
    data.type === SavingsType.SAVINGS ? url + "/savings" : url + "/deposit";

  delete data["type"];

  console.log(data)
  
};

export default {
  SaveProductAfterCalc,
};
