<template>
  <div class="comment">
      <myheader title="精彩评论">
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <div class="lists">
      <div class="item" v-for="item in commontsList" :key="item.id">
        <div class="head">
          <img :src="item.user.head_img" alt />
          <div>
            <p>{{item.user.nickname}}</p>
            <span>{{item.create_date}}</span>
          </div>
          <!-- 点击回复则发送数据到子组件 -->
          <span @click="replycomment(item)">回复</span>
        </div>
        <!-- 递归评论 -->
        <commentItem @replycomment="replycomment" v-if="item.parent" :parent="item.parent"></commentItem>
        <div class="text">{{item.content}}</div>
      </div>
    </div>
    <commentFooter :obj="replaydata" @refresh='refresh' :post="aeticle" @resetobj="resetobj"></commentFooter>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import { articleComment, getArticleById } from '@/apis/article.js'
import commentItem from '@/components/commentItem.vue'
import commentFooter from '@/components/commentFooter.vue'
export default {
  data () {
    return {
      commontsList: [],
      aeticle: {},
      replaydata: null
    }
  },
  components: {
    myheader, commentItem, commentFooter
  },
  async mounted () {
    this.init()
  },
  methods: {
    // 失焦重置obj
    resetobj () {
      this.replaydata = null
    },
    // 重新加载数据
    refresh () {
      this.init()
      // 回到顶部
      window.scrollTo(0, 0)
      this.replaydata = null
    },
    // 封装加载数据方法
    async init () {
      let res = await articleComment(this.$route.params.id, {
        pageIndex: 1,
        pageSize: 20
      })
      this.commontsList = res.data.data.length > 0 ? res.data.data : this.commontsList
      // 处理图片路径
      this.commontsList = this.commontsList.map(value => {
        value.user.head_img = 'http://127.0.0.1:3000' + value.user.head_img
        return value
      })
      console.log(this.commontsList)
      // 根据ID获得文章，再获取文章评论等数据
      let res2 = await getArticleById(this.$route.params.id)
      this.aeticle = res2.data.data
    },
    replycomment (item) {
      // 点击发送时改变数据，从而使子组件可以监听数据变化从而知道点击了父组件的回复
      this.replaydata = item
    }
  }
}
</script>

<style lang="less" scoped>
.lists {
  border-top: 5px solid #ddd;
  padding: 0 15px;
  .item {
    padding: 10px 0;
    border-bottom: 1px solid #ccc;
    .head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > img {
        width: 50/360 * 100vw;
        height: 50/360 * 100vw;
        display: block;
        border-radius: 50%;
      }
      > div {
        flex: 1;
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        > span {
          font-size: 12px;
          color: #999;
          line-height: 25px;
        }
      }
      > span {
        color: #999;
        font-size: 13px;
      }
    }
    .text {
      font-size: 14px;
      color: #333;
      padding: 20px 0 10px 0;
    }
  }
}
</style>
