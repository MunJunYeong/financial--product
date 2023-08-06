// vendor
import moment from 'moment';

// cus
import axios from "@/lib/axios";

// preset
const url = process.env.VUE_APP_AUTH_PROD_URL;

/**
 * Signs up a new user.
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
const SaveProductAfterCalc = async (data) => {
  const finishDate = moment(data.startDate).add(data.period, 'months').format('YYYY-MM-DD');
  data.name = data.name || 'N/A';
  
  try{
    const res = await axios.post(`${url}/user-prod/${data.userIdx}`, {
      name : data.name,
      start_date : data.startDate,
      finish_date : finishDate,
      period : data.period,
      monthly_payment : data.price,
      rate : data.rate,
      is_simple : data.isSimple,
      total_interest: data.totalInterest,
      type : data.type,
    })
    return res;
  }catch(err) {
    return err;
  }
};

const GetUserProduct = async (userIdx) => {

}

export default {
  SaveProductAfterCalc,
};
