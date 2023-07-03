// pages/cart/index.js
import { getBaseUrl, requestUtil } from "../../utils/requestUtil.js";
Page({
  /**
   * 页面的初始数据
   */
  data: {
    baseUrl: getBaseUrl(),
    cart: [], //  定义购物车数组
    address: {}, // 收货地址
    allChecked: false, // 定义一个全选属性，默认值false表示不全选
    totalPrice: 0, // 总价格
    totalNum: 0, // 总数量
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
    //1 从缓冲中获取收货信息，存入数据源address变量中
    const address = wx.getStorageSync("address");
    //2 从缓存中取出购物车数组,如果没有赋初值为空数组
    const cart = wx.getStorageSync("cart") || [];

    this.setData({
      address,
    });

    //3 调用封装的计算总价与数量的函数
    this.setCart(cart);
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
  // 商品选中事件处理
  handleItemChange(e) {
    //获取标签里携带的id号
    const id = e.currentTarget.dataset.id;
    // console.log('id',e)
    // 获取购物车数组
    let cart = this.data.cart;
    //根据id号在购物车中，查找你点的那个商品，如果有返回所在的索引，没有返回-1
    let index = cart.findIndex((v) => v.id === id);
    // console.log('index',index)
    //根据索引，修改当前点中商品的checked的值取反。
    cart[index].checked = !cart[index].checked;

    // 重新更新修改后的商品数组值，重新计算总价格与总数量
    //setCart()方法:是把上面写好的计算总价格与总数量的方法封装到了这个方法里
    this.setCart(cart);
  },
  // 把计算总价与总数量，修改全选按钮状态的业务封装到一个函数中，因为该功能需要经常重复使用
  setCart(cart) {
    //3 定义三个局部变量
    let allChecked = true; //记录全选按钮选中状态的变量
    let totalPrice = 0; //总价格
    let totalNum = 0; //总数量

    //4 遍历购物车数组，判断每一个商品对象里的checked属性的值
    cart.forEach((v) => {
      if (v.checked) {
        //如果v.checked 的返回值为true,代表复选框被选中
        totalPrice += v.num * v.price; //计算总价格 ；价格=数量*单价， 把价格循环加到总价变量上
        totalNum += v.num; //计算总数量
      } else {
        //如果有一个复选框未被选中，就修改全选按钮的状态值为flase,不被选中
        allChecked = false;
      }
    });

    //5 根据商品对象的长度，判断如果购物车里没有商品，为allChecked变量赋值为false, 没有商品全按钮就不被勾选
    //  如果有商品就不改变allChecked的值，保留上面判断的结果
    allChecked = cart.length != 0 ? allChecked : false;
    this.setData({
      cart, //把从缓存中获取出来的购物车数据，赋值给数据源cart数组，用于页面渲染
      allChecked, //6 根据上面判断的结果，修改数据源的allChecked的值，并根据结果控制页面上的按钮是否被勾选
      totalNum, //7 为总数量赋值
      totalPrice, //8  为总价格赋值
    });
    //6 把修改完的cart值设置到缓存中,下次再进到购物车页面，还可以保留购物车数据的状态
    wx.setStorageSync("cart", cart);
  },
});
