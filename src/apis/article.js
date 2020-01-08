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
