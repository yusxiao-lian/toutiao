<template>
  <div class="focus">
      <myheader title='我的关注'>
          <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
      </myheader>
      <div class="list" v-for="(item, index) in userList" :key="item.id">
          <div class="box" >
              <img :src="item.head_img" alt="">
              <div class="center">
                  <p>{{item.nickname}}</p>
                  <span>{{item.create_date}}</span>
              </div>
              <span @click="unfollow(item.id, index)">取消关注</span>
          </div>
      </div>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import { getUserFollows, unfollowUser } from '@/apis/user.js'
export default {
  data () {
    return {
      userList: []
    }
  },
  components: {
    myheader
  },
  async mounted () {
    let result = await getUserFollows()
    console.log(result)
    this.userList = result.data.data.map(value => {
      value.head_img = 'http://127.0.0.1:3000' + value.head_img
      return value
    })
    console.log(this.userList)
  },
  methods: {
    async unfollow (id, index) {
      let result = await unfollowUser(id)
      //   console.log(result)
      if (result.data.message === '取消关注成功') {
        this.userList.splice(index, 1)
      }
      this.$toast.success(result.data.message)
    }
  }
}
</script>

<style lang='less' scoped>
.list{
    .box{
        display: flex;
        padding: 25px 10px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ccc;
        > img{
            display: block;
            width: 50/360*100vw;
            height: 50/360*100vw;
            border-radius: 50%;
            padding: 0 10px;
        }
        > .center{
            flex: 1;
            > p {
                line-height: 30px;
                font-size: 14px;
            }
            > span {
                font-size: 12px;
                color:#999;
            }
        }
        > span {
            height: 30px;
            background-color: #eee;
            font-size: 13px;
            border-radius: 30px;
            line-height: 30px;
            padding: 0px 15px;
        }
    }
}
</style>
