
// cus
import utils from "../lib/utils"

// preset
const url = process.env.VUE_APP_AUTH_SERVER_URL;

/**
 * Signs up a new user.
 * @param {Object} data - The user data.
 * @param {string} data.id - The ID of the user.
 * @param {string} data.password - The password of the user.
 * @param {string} data.name - The name of the user.
 * @param {string} data.email - The email of the user.
 * @returns {boolean} - Description of the return value.
 */
const SignUp = (data) => {
  try {
    const res = utils.POST(`${url}/signup`, {
      id: data.id,
      password: data.password,
      name: data.name,
      email: data.email,
    });
    return res;
  } catch (err) {
    return err;
  }
};

/**
 * Signs up a new user.
 * @param {Object} data - The user data.
 * @param {string} data.id - The ID of the user.
 * @param {string} data.pw - The password of the user.
 * @returns {(boolean|{access_token: string, refresh_token: string})}
 */
const SignIn = async (data) => {
  try {
    const res = await utils.POST(`${url}/signin`, {
      id: data.id,
      password: data.password,
    });
    return res.data;
  } catch (err) {
    return err;
  }
};

export default {
  SignUp,
  SignIn,
};
