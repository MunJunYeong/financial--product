import axios from "@/lib/axios";

import { ViewErrUnauthorized } from "../defines-error";

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
  SetToken,
  RemoveToken,
};
