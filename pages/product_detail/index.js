// pages/product_detail/index.js
import { requestUtil, getBaseUrl } from "../../utils/requestUtil";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({
  /**
   *1  页面的初始数据
   */
  data: {
    productObj: {}, //产品对象
    baseUrl: "", //服务器地址
    activeIndex: 0, //初值为0
  },

  /**
   *2  生命周期函数--监听页面加载
   * options:属性 ，里面存储请求参数，可以通过对象名.属性名获取请求参数值
   */
  onLoad(options) {
    //2.1 获取工具类里的路径，为当前数据源里的路径赋值
    // console.log('options.id',options.id);
    //2.2 获取服务器地址
    const baseUrl = getBaseUrl();
    //2.3 为服务器地址变量赋值
    this.setData({
      baseUrl,
    });
    //2.4 调用获取商品信息的函数
    this.getProductDetail(options.id);
  },

  //3 获取产品信息
  getProductDetail(id) {
    requestUtil({
      url: "/product/detail",
      data: { id }, //携带请求参数
    }).then((result) => {
      this.setData({
        productObj: result.message, //获取商品数据存入数据源
      });
    });
  },
  //单机商品详情与规则参数调用的函数
  handleItemTap(e) {
    const activeIndex = e.currentTarget.dataset.index;
    // console.log('activeIndex',activeIndex);

    this.setData({
      activeIndex,
    });
  },
});
