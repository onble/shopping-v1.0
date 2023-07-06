// 导入request请求工具类
import {
  getBaseUrl,
  requestUtil,
  getWxLogin,
  getUserProfile,
} from "../../utils/requestUtil.js";

import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: "",
    cart: [],
    address: {},
    totalPrice: 0,
    totalNum: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const baseUrl = getBaseUrl();
    this.setData({
      baseUrl,
    });
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // console.log("show");
    const address = wx.getStorageSync("address");
    let cart = wx.getStorageSync("cart") || [];
    // 选中的商品显示
    cart = cart.filter((v) => v.checked);

    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach((v) => {
      totalPrice += v.num * v.price;
      totalNum += v.num;
    });

    this.setData({
      cart,
      address,
      totalNum,
      totalPrice,
    });
  },
  // 单击支付函数
  handleOrderPay() {
    let app = getApp();

    //1 从缓存中获取token值
    let token = wx.getStorageSync("token");

    //2 判断如果没有token，说明还为登录，执行登录代码
    if (!token) {
      //0判断如果未登录，先调到授权登录页面，获取用户信息
      if (app.globalData.code == "") {
        wx.navigateTo({
          //跳转到支付页面
          url: "/pages/user/index",
        });
        return; //结束函数
      }

      //2.2 把获取的登录信息（登陆码、用户名、头像地址），封装到一个变量中
      let loginParam = {
        code: app.globalData.code,
        nickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
      };

      //打印测试是否存储数组成功
      // console.log(loginParam);

      //2.3 把用户名与头像地址，存储到缓存中，我的详情页要使用
      wx.setStorageSync("userInfo", app.globalData.userInfo);

      //2.4 向后端发送请求访问登录功能，并传递参数。把登陆码、用户名、头像地址传到后端去
      this.wxlogin(loginParam);
    } else {
      // console.log("有token" + token);
      // console.log("支付继续走2,创建订单");
    }
  },

  //请求访问后端的登录方法，把上面方法获取的三个登录信息作为参数传递到后端，并响应回一个token值
  //token值用于判断用户的登录状态，他实现的就是session功能。
  wxlogin(loginParam) {
    //请求后端获取用户token
    requestUtil({
      url: "/user/wxlogin",
      data: loginParam,
      method: "post",
    }).then((result) => {
      // console.log(result.token); //测试前端是否返回token，在Network抓包区查看最后一个请求里
      let token = result.token;
      if (result.code == 0) {
        //如果请求响应成功返回状态为0，name就把token值存到缓存中
        wx.setStorageSync("token", token);
        // console.log("支付继续走,创建订单");
      }
    });
  },
});
