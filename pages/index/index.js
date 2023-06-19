// index.js
// 导入request请求工具类
import {getBaseUrl,requestUtil} from '../../utils/requestUtil.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图数组
    swiperList:[],
    baseUrl:'',// 定义一个请求路径变量，初始化为空
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    requestUtil({url: '/product/findSwiper' // 地址在工具里已经把项目地址拼接好了
                ,method:"GET"}).then(result=>{
        // 2 页面加载的时候，获取baseUrl项目路径并赋值
        const baseUrl = getBaseUrl();
        this.setData({
             swiperList:result.message,
             baseUrl,
             // baseUrl名字一样客户以省略，就是利用ES6拆包时候覆盖变量
        })
    })
}
})
