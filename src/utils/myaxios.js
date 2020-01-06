import axios from 'axios'
// 设置基准路径
axios.defaults.baseURL = 'http://localhost:3000'

// 添加请求拦截器axios.interceptors.request为请求拦截器，在发送请求之前做的处理操作
axios.interceptors.request.use(function (confing) {
//   console.log(confing)
  // 在发生请求之前做的操作
  let token = localStorage.getItem('user_token')
  // 如果存有token，则把token设置到请求头中
  if (token) {
    // console.log(confing)
    confing.headers.Authorization = token
  }
  return confing
}, function (error) {
  return Promise.reject(error)
})

// 添加响应拦截器,axios.interceptors.response,对响应的数据做相应的处理
axios.interceptors.response.use(function (response) {
  // 如果是需要登陆的页面而用户未登陆的话则跳转到登陆页面先登陆
//   console.log(response)
  if (response.data.message === '用户信息验证失败' || response.data.message === '用户信息验证失败！') {
    Window.location.href = '#/login'
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

// 暴露
export default axios
