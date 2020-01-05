// 先引入基准路径
import axios from '@/utils/myaxios.js'

// 暴露
export const login = (data) => {
  return axios({
    method: 'post',
    url: '/login',
    data: data
  })
}
