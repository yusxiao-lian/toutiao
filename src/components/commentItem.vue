<template>
  <div class="commentItem">
      <!-- <div v-if="parent.parent" class="commentItem">
        <div class="top">
            <div class="left">
                <span>{{parent.parent.user.nickname}}</span> &nbsp;&nbsp;&nbsp;
                <span>2分钟前</span>
            </div>
            <span>回复</span>
        </div>
        <div class="bottom">{{parent.parent.content}}</div>
    </div> -->
    <!-- 递归组件,用name调用自身,调用自身过后props中的parent就变成了parent.parent，依次循环 -->
    <commentItem @replycomment="replycomment" v-if="parent.parent" :parent="parent.parent"></commentItem>
    <!-- 割一下 -->
      <div class="top">
          <div class="left">
              <span>{{parent.user.nickname}}</span> &nbsp;&nbsp;&nbsp;
              <span>2分钟前</span>
          </div>
          <span @click="replycomment(parent)">回复</span>
      </div>
      <div class="bottom">{{parent.content}}</div>
  </div>
</template>

<script>
export default {
  name: 'commentItem',
  props: ['parent'],
  methods: {
    replycomment (parent) {
      console.log(parent)
      // 将数据传到父组件，再经过父组件传到子组件
      this.$emit('replycomment', parent)
    }
  }
}
</script>

<style lang='less' scoped>
    .commentItem{
        border: 1px solid #ccc;
        padding: 5px;
        margin-top: 10px;
        .top{
            font-size: 12px;
            color: #aaa;
            display: flex;
            justify-content: space-between;
        }
        .bottom{
            font-size: 13px;
            line-height: 40px;
        }
    }
</style>
