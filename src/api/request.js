import instance from "./instance.js";
export default {
  //async 异步函数返回一个promise对象
  userLogin: async (data) => {
    return instance.post("/sysUser/login", data);
  },
};