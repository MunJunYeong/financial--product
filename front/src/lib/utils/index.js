import axios from "@/lib/axios";

import { ViewErrUnauthorized } from "../defines";
import store from "@/store";

const POST = async (url, payload) => {
  const token = localStorage.getItem("access_token");
  try {
    return await axios.post(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if (err.response && err.response.status === 401) {
      store.commit("CLEAR_USER");
      throw ViewErrUnauthorized;
    }
    throw err;
  }
};

const GET = async (url) => {
  const token = localStorage.getItem("access_token");
  try {
    return await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if (err.response && err.response.status === 401) {
      store.commit("CLEAR_USER");
      throw ViewErrUnauthorized;
    }
    throw err;
  }
};

const UPDATE = async (url, payload) => {
  const token = localStorage.getItem("access_token");
  try {
    return await axios.put(url, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    if (err.response && err.response.status === 401) {
      store.commit("CLEAR_USER");
      throw ViewErrUnauthorized;
    }
    throw err;
  }
};

const SetToken = (accessToken, refreshToken) => {
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);
};

const RemoveToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// internal

export default {
  POST,
  GET,
  UPDATE,
  SetToken,
  RemoveToken,
};
