<template>
  <div id="app">
    <div class="container">
      <div class="headernav"></div>
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <myinput placeholder='请输入用户名/手机号' :value="user.username" @input="handlemyinput" bgc="gray"
         :rules="/^(\d{5,6})$|^(1\d{10})$/"
         tips="请输入正确的数据格式哦"></myinput>
        <myinput placeholder="请输入密码"
         v-model="user.password" bgc="gray"
         :rules="/^\S{3,18}$/"
         tips="请输入3-18位的密码"></myinput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
     <mybutton @click="login">登陆</mybutton>
     <!-- <van-button type="primary">vant按钮</van-button> -->
    </div>
  </div>
</template>

<script>
// import { Button } from 'vant'
import mybutton from '@/components/mybutton.vue'
import myinput from '@/components/myinput.vue'
import { login } from '@/apis/user.js'
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  components: {
    mybutton, myinput
    // 'van-button': Button
  },
  methods: {
    // 旧的方法
    async login () {
      //   console.log(this.user)
      //   this.$toast('提示内容')
      // 旧的方法
      //   login(this.user).then((res) => {
      //     console.log(res)
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      // 新的方法用async合await，可实现同步
      // 先验证用户输入的数据符不符合规则
      if (/^(\d{5,6})$|^(1\d{10})$/.test(this.user.username) && /^\S{3,18}$/.test(this.user.password)) {
        // 符合格式规范再进行验证
        let result = await login(this.user) // 用await能获取操作后得到的结果
        // console.log(result)
        if (result.data.message === '用户不存在') {
          this.$toast.fail(result.data.message)
        } else {
          // console.log(result)
          // 存token
          localStorage.setItem('user_token', result.data.data.token)
          // 存用户信息
          localStorage.setItem('user_info', JSON.stringify(result.data.data.user))
          this.$router.push({ path: `/personal/${result.data.data.user.id}` })
        }
      } else {
        this.$toast.fail({
          message: '请输入正确的数据格式哦'
        })
      }
    },
    handlemyinput (data) {
      this.user.username = data
    }
  }
}
</script>

<style lang='less' scoped>
.headernav {
    height: 25px;
    background: #757575;
}
.container {
  padding: 20px;
  background: #f2f2f2;
}

.close {
  span {
    font-size: 27 / 360 * 100vw;
  }
}

.logo {
  display: flex;
  justify-content: center;

  span {
    display: block;
    font-size: 126 / 360 * 100vw;
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
  margin-bottom: 20px;

  a {
    color: #3385ff;
  }
}
</style>
