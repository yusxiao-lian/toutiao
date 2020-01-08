<template>
  <div class="editPersonal">
      <myheader title="编辑个人信息" bgc="gray">
          <span @click="$router.back()" slot="left"  class="iconfont iconjiantou2"></span>
          <!-- <span slot="right"  class="iconfont iconjiantou2"></span> -->
      </myheader>
      <div class="userimg">
          <img :src="currentUser.head_img" alt="">
          <van-uploader :after-read="afterRead" />
      </div>
      <mycell bgc="gray" title="昵称" :desc="currentUser.nickname" @click="shownickname=!shownickname"></mycell>
      <van-dialog v-model="shownickname" title="修改昵称" show-cancel-button @confirm="updateNickname">
        <!-- Filed输入框 -->
        <van-field ref="nickname"  placeholder="请输入昵称" required label="昵称" :value="currentUser.nickname" />
      </van-dialog>
      <!-- 密码 -->
      <mycell bgc="gray" title="密码" :desc="currentUser.password" type="password" @click="showpassword=!showpassword"></mycell>
      <van-dialog v-model="showpassword" :before-close="beforeClose" title="修改密码" show-cancel-button >
        <!-- Filed输入框 -->
        <van-field ref="oldpassword"  placeholder="请输入原密码" required label="原密码" />
        <van-field ref="newpassword"  placeholder="请输入新密码" required label="新密码" />
      </van-dialog>
      <!-- 性别 -->
      <mycell @click="showgender=!showgender" bgc="gray" title="性别" :desc="currentUser.gender===0?'女':'男'"></mycell>
      <van-dialog v-model="showgender" title="修改性别" show-cancel-button @confirm="updateGender" >
        <!-- Picker 选择器 -->
        <van-picker :default-index="currentUser.gender"  :columns="columns"  @cancel="showPicker = false" @change="genderChange" />
      </van-dialog>
  </div>
</template>

<script>
import myheader from '@/components/myheader.vue'
import mycell from '@/components/mycell.vue'
import { getUserById, updateUserInfo } from '@/apis/user.js'
import { uploadFile } from '@/apis/upload.js'
export default {
  data () {
    return {
      currentUser: {},
      shownickname: false,
      showpassword: false,
      showgender: false,
      columns: ['女', '男'],
      gender: ''
    }
  },
  components: {
    myheader, mycell
  },
  async mounted () {
    let id = this.$route.params.id
    let result = await getUserById(id)
    // console.log(result)
    if (result.data.message === '获取成功') {
      this.currentUser = result.data.data
      this.currentUser.head_img = 'http://127.0.0.1:3000' + result.data.data.head_img || 'http://127.0.0.1:3000/uploads/image/default.jpeg'
    }
  },
  methods: {
    // 上传文件
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器,file中的file为要上传的文件数据
      let img = file.file
      let fd = new FormData()
      fd.append('file', img)
      //   console.log(img)
      // 这一步只是上传文件成功，并没有修改数据库的路径
      let result = await uploadFile(fd)
      console.log(result)
      if (result.data.message === '文件上传成功') {
        // 先实现图片预览
        this.currentUser.head_img = 'http://127.0.0.1:3000' + result.data.data.url
        // 这一步才是更新数据库信息
        let res = await updateUserInfo(this.currentUser.id, { head_img: result.data.data.url })
        if (res.data.message === '修改成功') {
          this.$toast.success('修改成功')
        }
      } else {
        this.$toast.fail('文件上传失败')
      }
    },
    // 修改昵称
    async updateNickname () {
      // 获取修改信息
      let newnickname = this.$refs.nickname.$refs.input.value
      // 更新数据
      let result = await updateUserInfo(this.currentUser.id, { nickname: newnickname })
      // console.log(result)
      if (result.data.message === '修改成功') {
        this.currentUser.nickname = newnickname
        this.$toast.success('修改成功')
      }
    },
    // 修改密码
    // 弹出框关闭前做的操作
    async beforeClose (action, done) {
      if (action === 'confirm') {
        let oldpassword = this.$refs.oldpassword.$refs.input.value
        let newpassword = this.$refs.newpassword.$refs.input.value
        if (oldpassword !== this.currentUser.password) {
          this.$toast.fail('原密码不一致')
          done(false)
        } else if (!/^\S{3,16}$/.test(newpassword)) {
          this.$toast.fail('密码为3到16位')
          done(false)
        } else {
          let result = await updateUserInfo(this.currentUser.id, { password: newpassword })
          if (result.data.message === '修改成功') {
            this.$toast.success('修改成功')
            done()
          }
        }
      } else {
        done()
      }
    },
    // 修改性别
    async updateGender () {
      let result = await updateUserInfo(this.currentUser.id, { gender: this.gender })
      console.log(result)
      if (result.data.message === '修改成功') {
        this.currentUser.gender = this.gender
        this.$toast.success('修改成功')
      } else {
        this.$toast.fail('修改失败')
      }
    },
    // 选择性别时
    genderChange (picker, value, index) {
      // console.log(picker, value, index)
      this.gender = index // 存储所选项
    }
  }
}
</script>

<style lang="less" scoped>
.userimg {
    position: relative;
    height: 130px;
    background: #f2f2f2;
    >img {
        position: absolute;
        width: 90/360*100vw;
        height: 90/360*100vw;
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%)
    }
    /deep/.van-uploader__upload {
         width: 100/360*100vw;
        height: 100/360*100vw;
    }
    /deep/.van-uploader {
       position: absolute;
       top: 50%;
       left: 50%;
       transform: translate(-50%,-50%);
       opacity: 0;
    }
}

</style>
