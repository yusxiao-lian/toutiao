<template>
  <div class="stars">
      <myheader title="我的收藏">
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <!-- 遍历数据生成结构!!!!!!!!!!!!!! -->
      <articleBlock v-for="item in starArticleList" :key="item.id" :postList="item"></articleBlock>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import articleBlock from '@/components/articleBlock.vue'
import { starArticleList } from '@/apis/article.js'
export default {
  data () {
    return {
      starArticleList: []
    }
  },
  components: {
    myheader, articleBlock
  },
  async mounted () {
    let res = await starArticleList()
    // console.log(res)
    // 存储数据
    this.starArticleList = res.data.data
    // console.log(this.starArticleList)
  }
}
</script>

<style>

</style>
