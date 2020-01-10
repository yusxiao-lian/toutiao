<template>
  <div class="commentFooter">
    <div class="addcomment"  v-show='!isFocus'  @click="handlerFocus">
      <input type="text" placeholder="写跟帖" />
      <span class="comment" @click="$router.push({path:`/comment/${post.id}`})">
        <i class="iconfont iconpinglun-"></i>
        <em>{{post.comment_length}}</em>
      </span>
      <i class="iconfont iconshoucang" @click="starArticle" :class="{active: post.has_star}"></i>
      <i class="iconfont iconfenxiang"></i>
    </div>
    <div class="inputcomment" v-show='isFocus'>
        <textarea  ref='commtext' rows="5" @blur='handleblur'></textarea>
        <div>
          <!-- mousedown会在失焦之前触发 -->
            <span @mousedown="sendcomment">发送</span>
        </div>
    </div>
  </div>
</template>

<script>
import { starArticle, replyComment } from '@/apis/article.js'
export default {
  data () {
    return {
      isFocus: false
    }
  },
  props: ['post', 'obj'],
  // 监听
  watch: {
    obj () {
      // console.log('变了！')
      // 如果是从无值变为有值才是点击了回复，有值才让它弹框
      if (this.obj) {
        this.isFocus = true
      }
      setTimeout(() => {
        this.$refs.commtext.focus()
      }, 100)
    }
  },
  methods: {
    // 失焦
    handleblur () {
      this.isFocus = false
      this.$emit('resetobj')
    },
    //   获取焦点时触发
    handlerFocus () {
      this.isFocus = !this.isFocus
      setTimeout(() => {
        this.$refs.commtext.focus()
      }, 100)
    },
    async starArticle () {
      let result = await starArticle(this.post.id)
      this.$toast.success(result.data.message)
      this.post.has_star = !this.post.has_star
    },
    // 发布评论
    async sendcomment () {
      let data = {
        content: this.$refs.commtext.value
      }
      // 如果obj发生了变化，则说明此条评论是回复别人的
      if (this.obj) {
        data.parent_id = this.obj.id
      }
      let res = await replyComment(this.post.id, data)
      console.log(res)
      if (res.data.message === '评论发布成功') {
        // 发布成功之后让父组件刷新数据
        this.$refs.commtext.value = ''
        this.$toast.success(res.data.message)
        this.$emit('refresh')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.active{
  color: red;
}
.commentFooter{
    width: 100vw;
    position: fixed;
    left: 0;
    bottom: 0;
}
.inputcomment{
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    background-color: #fff;
    align-items: flex-end;
    textarea{
        flex: 3;
        background-color: #eee;
        border:none;
        border-radius: 10px;
        padding: 10px;
    }
    div{
        padding: 20px;
    }
    span {
        display: block;
        flex: 1;
        height: 24px;
        line-height: 24px;
        padding: 0 10px;
        background-color: #f00;
        color:#fff;
        text-align: center;
        border-radius: 6px;
        font-size: 13px;
    }
}
.addcomment {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  margin-top: 20px;
  background: #fff;
  display: flex;
  text-align: center;
  position: absolute;
  bottom: 0;
  left: 0;
  > input {
    flex: 4;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: none;
    background-color: #eee;
    padding-left: 20px;
    font-size: 14px;
  }
  i {
    font-size: 20px;
  }
  > span {
    flex: 1;
    position: relative;
    > em {
      position: absolute;
      right: 0;
      top: -5px;
      font-size: 10px;
      background-color: #f00;
      color: #fff;
      border-radius: 5px;
      padding: 3px 5px;
    }
  }
  > i {
    flex: 1;
  }
}
</style>
