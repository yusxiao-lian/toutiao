<template>
  <div class="register">
      <div class="container">
          <div class="close"><span class="iconfont iconicon-test"></span></div>
          <div class="logo"><span class="iconfont iconnew"></span></div>
          <div class="inputs">
              <myinput placeholder="请输入用户名/手机号" :rules="/^(\d{5,6})$|^1\d{10}$/" v-model="user.username"></myinput>
              <myinput placeholder="请输入密码" :rules="/\S{3,18}/" v-model="user.password"></myinput>
              <myinput placeholder="请输入昵称" :rules="/^\w+$/" v-model="user.nickname"></myinput>
          </div>
          <p class="tips"> 已有账号？
              <a href="#/login" >去登陆</a>
          </p>
          <mybutton @click="register" class="register">注册</mybutton>
      </div>
  </div>
</template>

<script>
import myinput from '@/components/myinput.vue'
import mybutton from '@/components/mybutton.vue'
import { register } from '@/apis/user.js'
export default {
  components: { myinput, mybutton },
  data () {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      }
    }
  },
  methods: {
    async register () {
      let result = await register(this.user)
      //   console.log(result)
      if (result.data.message === '注册成功') {
        this.$toast.success('注册成功')
        this.$router.push({ name: 'Login' })
      } else {
        this.$toast.fail('注册失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
    padding: 20px;
    .close {
        span {
            font-size: 27/360*100vw;
        }
    }
    .logo {
        display: flex;
        justify-content: center;
        span {
            font-size: 126/360*100vw;
            color: #d81e06;
        }
    }
    .inputs {
        input {
            margin-bottom: 20px;
        }
    }
    .tips {
        text-align: right;
        a {
            color: #3385ff;
        }
    }
    .register {
        margin-top: 20px;
        background: #469e0c;
        font-weight: bold;
    }
}
</style>
