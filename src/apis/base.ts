import axios from "axios";
import qs from 'qs'

const getToken = () =>
  localStorage.getItem("access_token")
    ? localStorage.getItem("access_token")
    : "tuan";


const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const request = axios.create({
    baseURL: "http://service4all.vinorsoft.com:18003/api/v1",
    headers: {
        "content-type": "application/json",
    },
    paramsSerializer: (params) => qs.stringify(params),
})

request.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem('access_token')}`
request.interceptors.request.use(async (config) => config);


// waf
const WAFAxiosClient = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    headers: {
      "content-type": "application/json",
    },
    paramsSerializer: (params) => qs.stringify(params),
  });
  
  WAFAxiosClient.interceptors.request.use(function (config) {
    return config;
  });

export {request, WAFAxiosClient}