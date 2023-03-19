import axios from "axios";
const BASE_URL = "http://localhost:4000/api/";

const makeRequest = (method, url, data) => {
  // const user = localStorage.getItem("user");
  // const userCredentials = JSON.parse(user);
  // const token = userCredentials?.token;
  // const headers = {
  //   Authorization: `Bearer ${token}`,
  // };

  return axios({
    method,
    url: `${BASE_URL}${url}`,
    data,
    headers,
  });
};

export const getRequest = async ({ queryKey }) => {
  const [_, url] = queryKey;
  const response = await makeRequest("GET", url);
  return response.data;
};

export const postRequest = (params) => {
  const { url, body } = params;
  const data = body;
  return makeRequest("POST", url, data);
};

export const patchRequest = (params) => {
  const { previous_shorten_link, body } = params;
  const url = previous_shorten_link;
  const data = body;
  return makeRequest("PATCH", url, data);
};

export const deleteRequest = (url) => {
  return makeRequest("DELETE", url);
};
