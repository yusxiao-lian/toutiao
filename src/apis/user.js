// 先引入基准路径
import axios from '@/utils/myaxios.js'

// 暴露
// 登陆
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data: data
  })
}

// 根据id获取用户信息
export const getUserById = (id) => {
  return axios({
    url: `/user/${id}`
    // 去拦截器配置请求头
    // headers: { 'Authorization': localStorage.getItem('user_token') }
  })
}

// 更新个人信息
export const updateUserInfo = (id, data) => {
  return axios({
    method: 'post',
    url: `/user_update/${id}`,
    data: data
  })
}

// 用户注册
export const register = (data) => {
  return axios({
    method: 'post',
    url: '/register',
    data: data
  })
}

// 关注用户
export const followUser = (id) => {
  return axios({
    url: `/user_follows/${id}`
  })
}

// 取消关注
export const unfollowUser = (id) => {
  return axios({
    url: `/user_unfollow/${id}`
  })
}

// 用户关注列表
export const getUserFollows = () => {
  return axios({
    url: '/user_follows'
  })
}
