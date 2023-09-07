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
  // 중복 ID일 경우에만 return false, 나머지 exception는 error
  try {
    return await utils.POST(`${url}/signup`, {
      id: data.id,
      password: data.password,
      name: data.name,
      email: data.email,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * Signs up a new user.
 * @param {Object} data - The user data.
 * @param {string} data.id - The ID of the user.
 * @param {string} data.pw - The password of the user.
 * @returns {({access_token: string, refresh_token: string})}
 */
const SignIn = async (data) => {
  try {
    return await utils.POST(`${url}/signin`, {
      id: data.id,
      password: data.password,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * update user's otp enabled
 * @param {Object} data
 * @param {number} data.user_idx
 * @param {boolean} data.otp_enabled
 */
const UpdateOtpEnabled = async (data) => {
  try {
    return await utils.UPDATE(`${url}/${data.user_idx}/otp`, {
      otp_enabled: data.otp_enabled,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * update user's otp enabled
 * @param {Object} data
 * @param {number} data.user_idx
 * @param {string} data.email
 * @param {string} data.name
 */
const UpdateUserInfo = async (data) => {
  try {
    return await utils.UPDATE(`${url}/${data.user_idx}`, {
      email: data.email,
      name: data.name,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * update user's otp enabled
 * @param {string} refreshToken
 */
const RefreshAccessToken = async (refreshToken) => {
  try {
    return await utils.POST(`${url}/refresh`, {
      refresh_token: refreshToken,
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const Authenticate = async () => {
  try {
    return await utils.GET(`${url}/authenticate`);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export default {
  SignUp,
  SignIn,
  UpdateOtpEnabled,
  UpdateUserInfo,
  Authenticate,
  RefreshAccessToken,
};
