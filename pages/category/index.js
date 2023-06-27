// pages/category/index.js
import {getBaseUrl, requestUtil} from '../../utils/requestUtil.js';
Page({

  /**
   * 1 页面的初始数据
   */
  data: {
    baseUrl:getBaseUrl(),// 定义一个请求路径变量，初始化为空
    leftMenuList:[], // 左侧菜单数据
    rightContent:[], // 右侧商品数据
  },

  // 2 接口的全部返回数据，存储到这个空数组中
  Cates:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getCates()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 5 定义一个获取后端数据的方法
   */

  getCates(){
    requestUtil({
      url: '/bigType/findCategories',
      method: "GET"
      }).then(result=>{

        this.Cates = result.message;
        // console.log('result',result)
        console.log('Cates',this.Cates)

        //1 从Cates数组里获取左侧分类数据(大类)及右侧分类数据(小类)
          //1.1 从数组中获取所有的name属性值存入到leftMenuList数组
        let leftMenuList=this.Cates.map(v=>v.name)  
        console.log('leftMenuList',leftMenuList)

          //1.2 从数组的第一个元素值里，获取小类集合存入到rightContent里
        let rightContent=this.Cates[0].smallTypeList;
        console.log('rightContent',rightContent)

        //2 把获取的两个数组值赋值给数据源里的同名数组
        this.setData({
            leftMenuList:this.data.leftMenuList.concat(...leftMenuList),
            rightContent
        })
        console.log('check',this.data.leftMenuList)

      })
   },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    
  },

  

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

   

})