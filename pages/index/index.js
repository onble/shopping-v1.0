// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 发送异步请求，获取后端数据
    wx.request({
      url: 'http://localhost:8080/product/findSwiper',
      method:"GET",
      success:(result)=>{
        console.log(result)
        this.setData({
          swiperList:result.data.message
        })
      }
    })
  }
})
