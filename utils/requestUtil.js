/**
* 后端请求工具类
*/

  // 2.0 封装baseUrl
// 定义请求根路径baseUrl
const baseUrl="http://localhost:8080";
/**
* 返回请求根路径baseUrl
*/
export const getBaseUrl=()=>{
return baseUrl;
}

//1.0 封装ajax请求，参数为请求地址和请求方式
export const requestUtil=(params)=>{
    return new Promise((resolve,reject)=>{
    wx.request({
        ...params,
        url:baseUrl + params.url, //拼接请求地址
        success:(result)=>{
        resolve(result.data)
        },
        fail:(err)=>{
        reject(err)
        }
    })
    });
  }
  
