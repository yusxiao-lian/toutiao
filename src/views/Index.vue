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
        <van-tabs v-model="active" sticky swipeable>
          <van-tab :title="category.name" v-for="category in categoryList" :key="category.id">
            <van-list v-model="category.loading" :immediate-check="false" :finished="category.finished"  finished-text="没有更多了" :offset="10" @load="onLoad">
              <!-- 数据列表 -->
              <articleBlock  v-for="item in category.postList" :key="item.id" :postList="item"></articleBlock>
            </van-list>
          </van-tab>
        </van-tabs>
      </div>
      <!-- 新闻列表 -->
      <div class="newslist"></div>
  </div>
</template>

<script>
import { getCategory } from '@/apis/category.js'
import { getNewsList } from '@/apis/article.js'
import articleBlock from '@/components/articleBlock.vue'
export default {
  data () {
    return {
      active: localStorage.getItem('user_token') ? 1 : 0,
      id: '',
      categoryList: []
    }
  },
  components: {
    articleBlock
  },
  // 监听栏目的变化，实现数据的更换
  watch: {
    active () {
      // console.log(this.active)
      this.init()
    }
  },
  async mounted () {
    // 获取登陆的用户ID
    this.id = JSON.parse(localStorage.getItem('user_info')).id
    // 获取文章分类信息
    let result = await getCategory()
    // console.log(result)
    this.categoryList = result.data.data
    // 对数组进行处理,增加元素
    this.categoryList = this.categoryList.map((currentValue) => {
      return {
        ...currentValue, // 展开表达式,深拷贝
        postList: [], // 里面装新闻列表表数据
        pageIndex: 1, // 显示的当前页
        pageSize: 5, // 每页所显示条数
        loading: false,
        finished: false
      }
    })
    console.log(this.categoryList)

    // 获取当前栏目的数据
    // let res = await getNewsList({
    //   category: this.categoryList[this.active].id,
    //   pageIndex: this.categoryList[this.active].pageIndex,
    //   pageSize: this.categoryList[this.active].pageSize
    // })
    // this.categoryList[this.active].postList = res.data.data
    this.init()
  },
  methods: {
    async init () {
      // // 根据当前栏目的id的数据
      let res = await getNewsList({
        category: this.categoryList[this.active].id,
        pageIndex: this.categoryList[this.active].pageIndex,
        pageSize: this.categoryList[this.active].pageSize
      })
      // console.log(res)
      // 把数据添加到数组
      this.categoryList[this.active].postList.push(...res.data.data)
      console.log(this.categoryList[this.active].postList)
      // 当加载完一页数据后需将将loading重置为false
      this.categoryList[this.active].loading = false
      // 如果已经加载最后一页,则把finished改为true表示加载完毕
      if (res.data.data.length < this.categoryList[this.active].pageSize) {
        this.categoryList[this.active].finished = true
      }
    },
    // console.log(this.categoryList[this.active])
    // console.log(this.categoryList[this.active].postList)
    onLoad () {
      this.categoryList[this.active].pageIndex++
      setTimeout(() => {
        this.init()
      }, 2000)
    }
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
