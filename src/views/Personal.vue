<template>
  <div class="personal">
    <router-link :to="{ path: `/editPersonal/${currentUser.id}` }">
      <div class="profile">
        <!-- $axios.defaults.baseURL读取axios的服务器路径 -->
        <img :src="currentUser.head_img" alt />
        <div class="profile-center">
          <div class="name">
            <span class="iconfont iconxingbienan"></span>{{currentUser.nickname}}
          </div>
          <div class="time">{{currentUser.create_date}}</div>
        </div>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </router-link>
    <mycell title="我的关注" desc="关注的用户" @click="$router.push({path: '/myFollow'})"></mycell>
    <mycell title="我的跟帖" desc="跟帖/回复"></mycell>
    <mycell title="我的收藏" desc="文章/视频" @click="$router.push({path:'/mystars'})"></mycell>
    <mycell title="设置"></mycell>
    <mybutton class="btn" @click="exit">退出</mybutton>
  </div>
</template>

<script>
import mycell from '@/components/mycell.vue'
import mybutton from '@/components/mybutton.vue'
import { getUserById } from '@/apis/user.js'
export default {
  components: {
    mycell, mybutton
  },
  data () {
    return {
      currentUser: {}
    }
  },
  async mounted () {
    // console.log(this.$route.params.id)
    let result = await getUserById(this.$route.params.id)
    // console.log(result)
    if (result.data.message === '获取成功') {
      this.currentUser = result.data.data
      this.currentUser.head_img = 'http://127.0.0.1:3000' + this.currentUser.head_img
    }
  },
  methods: {
    exit () {
      if (confirm('确认退出?')) {
        localStorage.removeItem('user_token')
        this.$toast.success('退出成功')
        this.$router.push({ name: 'Index' })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.personal{
    width: 100vw;
    height: 100vh;
    background-color: #eee;
}
a{
    color: #666;
}
.profile {
  display: flex;
  padding: 20px 10px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 5px #ddd solid;

  img {
    width: 70 / 360 * 100vw;
    height: 70 / 360 * 100vw;
    border-radius: 50%;
  }

  .profile-center {
    flex: 1;
    padding: 0 10px;
  }

  .name {
    span {
      color: #75b9eb;
    }
  }

  .time {
    color: #666;
    font-size: 14px;
    margin-top: 5px;
  }
}
.btn {
  margin: 20px auto;
  width: 90vw;
  background: red;
}
</style>
