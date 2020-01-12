<template>
<div class="catemanage">
    <myheader title="栏目管理">
      <span slot="left" class="iconfont iconjiantou2" @click="$router.back()"></span>
  </myheader>
  <div class="del">
      <p>点击删除频道</p>
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
      <span>5</span>
      <span>6</span>
      <span>7</span>
      <span>8</span>
  </div>
  <div class="add">
      <p>点击添加频道</p>
  </div>
</div>
</template>

<script>
import myheader from '@/components/myheader.vue'
export default {
  components: { myheader }
}
</script>

<style lang="less" scoped>
.del,.add{
    padding: 0 5px;
    p{
        font-size: 20px;
        margin: 10px 10px;
    }
}
</style>
