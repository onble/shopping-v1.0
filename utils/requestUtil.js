/**
 * 后端请求工具类
 */

// 2.0 封装baseUrl
// 定义请求根路径baseUrl
const baseUrl = "http://localhost:8080";
/**
 * 返回请求根路径baseUrl
 */
export const getBaseUrl = () => {
  return baseUrl;
};

//1.0 封装ajax请求，参数为请求地址和请求方式
export const requestUtil = (params) => {
  return new Promise((resolve, reject) => {
    wx.request({
      ...params,
      url: baseUrl + params.url, //拼接请求地址
      success: (result) => {
        resolve(result.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
/**
 * wx login封装
 */
export const getWxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      timeout: 5000,
      success: (res) => {
        console.log('check--res--getWxLogin',res)

        // TODO:参考https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html
        // 这里需要传送参数
        wx.request({
          url: baseUrl+'/user/wxlogin',
          data:{
            ...res
          }
        })
        wx.showToast({
          title: "授权成功",
          mask: true,
        });
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};

/**
 * wx getUserProfile封装
 */
export const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: "获取用户信息",
      success: (res) => {
        console.log('check--res--getUserProfile',res)
        wx.showToast({
          title: "授权成功",
          mask: true,
        });
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
};
