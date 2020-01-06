<template>
  <div class="editPersonal">
      <myheader title="编辑个人信息" bgc="gray">
          <span slot="left"  class="iconfont iconjiantou2"></span>
          <!-- <span slot="right"  class="iconfont iconjiantou2"></span> -->
      </myheader>
      <div class="userimg">
          <img :src="currentUser.head_img" alt="">
          <van-uploader :after-read="afterRead" />
      </div>
      <mycell bgc="gray" title="昵称" :desc="currentUser.nickname"></mycell>
      <mycell bgc="gray" title="密码" :desc="currentUser.password" type="password"></mycell>
      <mycell bgc="gray" title="性别" :desc="currentUser.gender===0?'女':'男'"></mycell>
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
      currentUser: ''
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
        console.log(res)
      } else {
        this.$toast.fail('文件上传失败')
      }
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
