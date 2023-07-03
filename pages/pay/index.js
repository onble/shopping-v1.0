// 导入request请求工具类
import { getBaseUrl, requestUtil } from "../../utils/requestUtil.js";

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
    console.log("show");
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
});
