const app = getApp();
const defaultAvatarUrl =
  "https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0";

Page({
  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: defaultAvatarUrl,
    theme: wx.getSystemInfoSync().theme,
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail;

    this.setData({
      avatarUrl,
    });

    app.globalData.userInfo.avatarUrl = avatarUrl;
  },
  formSubmit(e) {
    wx.login({
      timeout: 5000,
      success: (res) => {
        app.globalData.code = res.code;
      },
    });
    app.globalData.userInfo.nickName = e.detail.value.nickname;

    // console.log(app.globalData.userInfo);
    // console.log(app.globalData.code);

    wx.navigateTo({
      url: "/pages/pay/index",
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.onThemeChange((result) => {
      this.setData({
        theme: result.theme,
      });
    });
  },
});
