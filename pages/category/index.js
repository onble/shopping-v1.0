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
    currentIndex:0, //当前选中左侧菜单中的索引 
    scrollTop:0, // 设置竖向滚动条位置
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
    // this.getCates()


    const app=getApp();
    var index=app.globalData.index;
    // console.log("index="+index)
    if(index!=-1){
    this.getCates2(index);
    app.globalData.index=-1; // 重置index
	  }else{
      this.getCates()
    }
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
        // console.log('Cates',this.Cates)

        //1 从Cates数组里获取左侧分类数据(大类)及右侧分类数据(小类)
          //1.1 从数组中获取所有的name属性值存入到leftMenuList数组
        let leftMenuList=this.Cates.map(v=>v.name)  
        // console.log('leftMenuList',leftMenuList)

          //1.2 从数组的第一个元素值里，获取小类集合存入到rightContent里
        let rightContent=this.Cates[0].smallTypeList;
        // console.log('rightContent',rightContent)

        //2 把获取的两个数组值赋值给数据源里的同名数组
        this.setData({
            leftMenuList:this.data.leftMenuList.concat(...leftMenuList),
            rightContent
        })
        // console.log('check',this.data.leftMenuList)

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

  // 2 创建一个单机事件调用的函数
  // e对象中封装了单机操作的一系列数据
  handerMenuItemChange(e){
    // console.log('handerMenuItemChange-e.currentTarget.dataset.index',e.currentTarget.dataset.index)
    // 获取单机按钮上的索引
    const index = e.currentTarget.dataset.index;
    // 获取指定索引值下的右侧列表数据，并重新赋值给数据源里的数组
    let rightContent = this.Cates[index].smallTypeList
    // 修改索引值及右侧列表数组值
    this.setData({
      currentIndex:index,
      rightContent,
      scrollTop:0, // 每次单击都重置为0置顶
    })
  },

  /**
  * 获取商品分类数据 从首页跳转过来的
  */
  async getCates2(index){
    // console.log('getCates2执行了')
    const baseUrl=getBaseUrl();
    const result = await requestUtil({
        url: '/bigType/findCategories',
        method: "GET"
    });
    this.Cates=result.message;
    let leftMenuList=this.Cates.map(v=>v.name)
    let rightContent=this.Cates[index].smallTypeList;
    this.setData({
        leftMenuList,
        rightContent,
        currentIndex:index,
        scrollTop:0,
        baseUrl
    })
  },
   

})