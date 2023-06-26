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
    // 商品大类数组全部，第一行，第二行
    bigTypeList:[],
    bigTypeList_row1:[],
    // 热卖推荐
    hotProductList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getSwiperList();
    this.getBigType();
    this.getHotProductList();
},
  getSwiperList(){
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
  },
  getBigType(){
    requestUtil({url: '/bigType/findAll' // 地址在工具里已经把项目地址拼接好了
                ,method:"GET"}).then(result=>{
        // 1 获取所有商品大类
        const bigTypeList = result.message;

        // 获取索引小于5的五条数据存入第一行
        const bigTypeList_row1 = bigTypeList.filter((item,index)=>{
          return index<10;
        })
        console.log('bigTypeList_row1',bigTypeList_row1)

        // 将返回到前端的数据，赋值给上面的三个商品大类数组
        this.setData({
             bigTypeList,
             bigTypeList_row1,
        })
    })
  },
  getHotProductList(){
    requestUtil({url: '/bigType/findHot' // 地址在工具里已经把项目地址拼接好了
                ,method:"GET"}).then(result=>{
        // 1 获取所有商品大类
        const hotProductList = result.message;
        console.log('hotProductList',hotProductList)
        // 将返回到前端的数据，赋值给上面的三个商品大类数组
        this.setData({
             hotProductList,
        })
    })
  }
})
