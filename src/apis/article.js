// 引入基准路径
import axios from '@/utils/myaxios.js'

// 获取新闻列表
export const getNewsList = (params) => {
  return axios({
    url: '/post',
    params
  })
}

// 根据新闻ID获取新闻详情
export const getArticleById = (id) => {
  return axios({
    url: `/post/${id}`
  })
}

// 点赞和取消点赞
export const likeArticle = (id) => {
  return axios({
    url: `/post_like/${id}`
  })
}

// 收藏文章
export const starArticle = (id) => {
  return axios({
    url: `/post_star/${id}`
  })
}

// 收藏文章列表
export const starArticleList = () => {
  return axios({
    url: '/user_star'
  })
}
