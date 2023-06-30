// pages/cart/index.js
import { getBaseUrl, requestUtil } from "../../utils/requestUtil.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: getBaseUrl(),
    cart: [],
    address: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    console.log("show");
    // 第一次进入的时候，没有数据，返回的是空字符串''
    const address = wx.getStorageSync("address");
    // console.log('设置的addres',address,address=={},address==undefined,address==null,typeof address,address=='')
    const cart = wx.getStorageSync("cart") || [];
    this.setData({
      address,
      cart,
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {},
  // 点击 获取收货地址
  handleChooseAddress() {
    wx.chooseAddress({
      success: (result) => {
        // console.log("地址信息", result);
        wx.setStorageSync("address", result);
      },
    });
  },
});
