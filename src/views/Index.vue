<template>
  <div class="index">
      <!-- 顶部栏 -->
      <div class="header">
        <div class="logo">
          <span class="iconfont iconnew"></span>
        </div>
        <div class="search">
          <van-icon name="search" />
          <span>搜索商品</span>
        </div>
        <div class="user" @click="$router.push({ path: `/personal/${id}` })">
          <van-icon name="manager-o" />
        </div>
      </div>
      <!-- 导航栏 -->
      <div class="nav">
        <van-tabs v-model="active" sticky>
          <van-tab :title="category.name" v-for="category in categoryList" :key="category.id">内容 1</van-tab>
        </van-tabs>
      </div>
      <!-- 新闻列表 -->
      <div class="newslist"></div>
  </div>
</template>

<script>
import { getCategory } from '@/apis/category.js'
export default {
  data () {
    return {
      active: localStorage.getItem('user_token') ? 1 : 0,
      id: '',
      categoryList: []
    }
  },
  async mounted () {
    // 获取登陆的用户ID
    this.id = JSON.parse(localStorage.getItem('user_info')).id
    // 获取文章分类信息
    let result = await getCategory()
    console.log(result)
    this.categoryList = result.data.data
    // 对数组进行处理,增加元素
    this.categoryList = this.categoryList.map((currentValue) => {
      return {
        ...currentValue, // 展开表达式,深拷贝
        postList: [], // 里面装新闻列表表数据
        pageIndex: 1, // 显示几页
        pageSize: 10 // 每页所显示条数
      }
    })
    console.log(this.categoryList)
  }
}
</script>

<style lang="less" scoped>
.header {
  height: 50px;
  background: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo{
    padding: 0 10px;
    .iconnew{
      font-size: 60px;
      color: #fff;
    }
  }
  .search{
    flex: 1;
    background: rgba(255, 255, 255, .5);
    height: 40px;
     text-align: center;
    line-height: 40px;
    border-radius: 20px;
    color: #fff;
  }
  .user{
    padding: 0 10px;
    font-size: 25px;
    color: #fff;
  }
}
</style>
