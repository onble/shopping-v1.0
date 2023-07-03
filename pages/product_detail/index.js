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

  // 创建一个全局的购物车商品对象
  productInfo: {},

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
      //为购物车商品对象存储当前获取的商品
      this.productInfo = result.message;
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
  // 3 单击事件 商品加入购物车
  handleCarAdd() {
    // 调用添加购物车方法
    this.setCartadd();

    //友情提示
    wx.showToast({
      title: "加入成功",
      icon: "success",
      mask: true, //开启遮罩效果
    });
  },
  //添加购物车方法
  setCartadd() {
    //3.1 从浏览器缓存中获取一个商品信息赋值给cart变量。如果缓存中没有数据，就创建一个空数组赋值给cart变量
    //这样当第一次调用购物车功能时候，就可以创建一个cart变量，用来存存储添加的商品对象
    //wx.getStorageSync(): 从浏览器缓存中获取指定key里的值
    let cart = wx.getStorageSync("cart") || [];
    // console.log("cart=" + cart);

    //3.2 判断当前添加到购物车里的商品，是否在购物车已经存在
    //    如果存在返回商品id,如果不存在没有找到返回-1
    let index = cart.findIndex((value, index) => {
      return value.id == this.productInfo.id;
    });

    // 根据结果返回提示信息
    if (index == -1) {
      //不存在
      this.productInfo.num = 1; //给购物车里商品对象添加一个数量属性，初始值为1
      this.productInfo.checked = true; //给购物车里的商品对象添加一个是否选中属性，并赋值为true表示选中
      cart.push(this.productInfo);
    } else {
      //存在
      cart[index].num++; //给对应索引位置的商品对象的数量属性+1
    }

    // 把购物车对象添加到缓存中
    wx.setStorageSync("cart", cart);
  },
  // 点击 立即购买
  handleBuy() {
    //调用上方的添加购物车方法，从缓存中取出购物车对象，把当前商品添加到购物车，在重新更新缓存购物车
    this.setCartadd();
    //跳转到购物车页面
    wx.switchTab({
      url: "/pages/cart/index",
    });
  },
});
