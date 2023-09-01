import axios from "@/lib/axios";

const POST = async (url, payload) => {
  return await axios.post(url, payload);
};

const GET = async (url) => {
  return await axios.get(url);
};

export default {
  POST,
  GET,
};
