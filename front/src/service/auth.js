import axios from "@/lib/axios";

// preset
const url = process.env.VUE_APP_AUTH_SERVER_URL;

/**
 * Signs up a new user.
 * @param {Object} data - The user data.
 * @param {string} data.id - The ID of the user.
 * @param {string} data.password - The password of the user.
 * @param {string} data.name - The name of the user.
 * @param {string} data.email - The email of the user.
 */
const SignUp = (data) => {
  try {
    const res = axios.post(`${url}/signup`, {
      id: data.id,
      password: data.password,
      name: data.name,
      email: data.email,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

/**
 * Signs up a new user.
 * @param {Object} data - The user data.
 * @param {string} data.id - The ID of the user.
 * @param {string} data.password - The password of the user.
 */
const SignIn = (data) => {
  try {
    const res = axios.post(`${url}/signin`, {
      id: data.id,
      password: data.password,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default {
  SignUp,
  SignIn,
};
