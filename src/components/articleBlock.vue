<template>
  <!-- 左右结构的单图文章 -->
  <div class="single" v-if="postList.cover.length<=2 && postList.type===1">
      <div class="left">
          <p class="content">{{postList.title}}</p>
          <p class="info">
              <span>{{postList.user.nickname}}</span>
              <span>{{postList.comment_length}}跟帖</span>
          </p>
      </div>
      <img :src="postList.cover[0].url" alt="">
  </div>
  <!-- 带视频的文章 -->
  <div class="singlevideo" v-else-if="postList.type===2">
      <div class="content">{{postList.title}}</div>
      <div class="player">
          <img :src="postList.cover[0].url" alt="">
          <div class="playicon">
              <van-icon name="play" />
          </div>
      </div>
      <p class="info">
          <span>{{postList.user.nickname}}</span>
          <span>{{postList.comment_length}}跟帖</span>
      </p>
  </div>
  <!-- 左右多图文章 -->
  <div class="singlethree" v-else-if="postList.type===1 && postList.cover.length>=3">
      <div class="content">{{postList.title}}</div>
      <div class="imgs">
          <img :src="item.url" alt="" v-for="item in postList.cover" :key="item.id">
      </div>
      <div class="info">
          <span>{{postList.user.nickname}}</span>
          <span>{{postList.comment_length}}跟帖</span>
      </div>
  </div>
</template>

<script>
export default {
  props: ['postList']
}
</script>

<style lang="less" scoped>
body {
  overflow-x: hidden;
  overflow-y: hidden;
}
.content{
    padding: 0 5px;
    margin-top: 10px;
    font-size: 14px;
    line-height: 24px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
}
 .info{
    font-size: 12px;
    padding-left: 5px;
    color: #999;
    margin-bottom: 15px;
    >span:nth-of-type(1){
        margin-right: 15px;
    }
}
.single{
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    padding: 15px 0;
    flex-wrap: wrap;
    border-bottom: 1px solid #ccc;
    .left{
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-around;
    }
    img{
        width: 120/360 * 100vw;
        height: 70/360 * 100vw;
        padding-right: 5px;
        object-fit: cover;
    }
}
.singlevideo{
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #ccc;
    .player{
        position: relative;
        width: 100%;
        img{
            width: 100%;
            margin: 10px 0px;
        }
        .playicon{
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 60/360*100vw;
            height: 60/360*100vw;
            background: rgba(255, 255, 255, .2);
            border-radius: 50%;
            font-size: 40/360*100vw;
            text-align: center;
            line-height: 65/360*100vw;
            color: #fff;
            box-shadow: 0 0 15px #fff;
        }
    }
}
.singlethree{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-bottom: 1px solid #ccc;
    .imgs{
        display: flex;
        justify-content: space-around;
        img{
            width: 32%;
        }
    }
    .info{
        margin-top: 10px;
    }
}
</style>
