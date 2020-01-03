<template>
  <div id="app">
    <div class="container">
      <div class="headernav"></div>
      <div class="close"><span class="iconfont iconicon-test"></span></div>
      <div class="logo"><span class="iconfont iconnew"></span></div>
      <div class="inputs">
        <myinput placeholder='请输入用户名/手机号' :value="user.username" @input="handlemyinput" bgc="gray"></myinput>
        <myinput placeholder="请输入密码" v-model="user.password" bgc="gray"></myinput>
      </div>
      <p class="tips">
        没有账号？
        <a href="#/register" class="">去注册</a>
      </p>
     <mybutton @click="login">登陆</mybutton>
    </div>
  </div>
</template>

<script>
import mybutton from '@/components/mybutton.vue'
import myinput from '@/components/myinput.vue'
export default {
  data () {
    return {
      user: {
        username: 'a',
        password: ''
      }
    }
  },
  components: {
    mybutton, myinput
  },
  methods: {
    login () {
      console.log(this.user)
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
