import axios from "axios";
const instance = axios.create({
  timeout: 10000,
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    // 在请求发送之前可以做一些通用的处理
    // 请求头中加入认证信息
    if (config.url !== "/sysUser/login" && config.url !== "/sysUser/register") {
      console.log("加入请求头了");
      config.headers.token = localStorage.getItem("token");
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    // 在响应接收之后可以对响应数据进行通用处理
    return response.data;
  },
  (error) => {
    // 处理响应错误
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

export default instance;
