// 引入基准路径
import axios from '@/utils/myaxios.js'

export const getCategory = () => {
  return axios({
    url: '/category'
  })
}
