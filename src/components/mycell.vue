<template>
  <div class="cell" :class="{'gray': bgc === 'gray'}">
      <div class="lef">{{title}}</div>
      <div class="right">{{type==='password'?'********':desc}}<span class="iconfont iconjiantou1"></span></div>
  </div>
</template>

<script>
export default {
  props: ['title', 'desc', 'bgc', 'type']
}
</script>

<style lang="less" scoped>
.cell {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px;
    border-bottom: 1px solid #a0a0a0;
    .right {
        font-size: 14px;
        color: #a0a0a0;
    }
}
.gray {
  background: #f2f2f2;
}
</style>
