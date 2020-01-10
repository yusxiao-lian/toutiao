<template>
  <div class="header" :class="{'gray': bgc === 'gray'}">
    <div>
      <slot name="left"></slot>
    </div>
    <div class="center">{{title}}</div>
    <div>
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['title', 'bgc']
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  > div:nth-child(1),div:nth-child(3) {
    padding: 0 10px;
  }
  > div:nth-child(2) {
    font-weight: bold;
    text-align: center;
  }
  .center{
    padding: 5px;
  }
}
.gray {
  background: #f2f2f2;
}
</style>
