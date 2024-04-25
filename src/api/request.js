import instance from "./instance.js";
export default {
  //async 异步函数返回一个promise对象
  userLogin: async (data) => {
    return instance.post("/sysUser/login", data);
  },

  getHotComment: async (data) => {
    return instance.post("/hotComment/getHotComment", data);
  },

  getCommentByUser: async (data) => {
    return instance.post("/userPost/getCommentByUser", data);
  },
  getDepressionProp: async (data) => {
    return instance.post("/hotComment/getDepressionProp",data);
  },
  getXinQi: async () => {
    return instance.get("/hotComment/getXinQi");
  },
  getDePercentage:async (id)=>{
    return instance.get(`/hotComment/getDePercentage/${id}`)
  },
  getLineData:async ()=>{
    return instance.get("/userPost/getLineData")
  },
  getHotSearch:async (data)=>{
    return instance.post("/hotSearch/getHotSearch",data)
  },
  getHotSearchDetails:async (id,data)=>{
    return instance.post(`/hotSearch/getHotSearchDetails/${id}`,data)
  },
  repealHotSearch:async(id)=>{
    return instance.put(`/hotSearch/repealHotSearch/${id}`)
  },
  getHotSearchByUser:async(data)=>{
    return instance.get(`/hotSearch/getHotSearchByUser?username=${data}`)
  },
  getHotSearchChart:async()=>{
    return instance.get("/hotSearch/getHotSearchChart")
  }
};
