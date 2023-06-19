// index.js
// 导入request请求工具类
import {requestUtil} from '../../utils/requestUtil.js';
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
  onLoad(options) {
    requestUtil({url: '/product/findSwiper',method:"GET"}).then(result=>{
        this.setData({
             swiperList:result.message
        })
    })
}
})
