// cus
import utils from "../lib/utils";

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
const SignUp = async (data) => {
  return await utils.POST(`${url}/signup`, {
    id: data.id,
    password: data.password,
    name: data.name,
    email: data.email,
  });
};

/**
 * Signs up a new user.
 * @param {Object} data - The user data.
 * @param {string} data.id - The ID of the user.
 * @param {string} data.pw - The password of the user.
 * @returns {(boolean|{access_token: string, refresh_token: string})}
 */
const SignIn = async (data) => {
  return await utils.POST(`${url}/signin`, {
    id: data.id,
    password: data.password,
  });
};

const Authenticate = async () => {
  await utils.GET(`${url}/authenticate`);
};

export default {
  SignUp,
  SignIn,
  Authenticate,
};
