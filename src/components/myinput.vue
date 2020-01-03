<template>
  <input type="text" class="myinput" :class="{ 'gray': bgc === 'gray', 'skyblue': bgc === 'skyblue' }"  @input="handlemyinput">
</template>

<script>
export default {
  props: ['value', 'bgc'],
  methods: {
    handlemyinput (event) {
      let value = event.target.value
      this.$emit('input', value)
    }
  }
}
</script>

<style lang="less" scoped>
.myinput {
    width: 318/360*100vw;
    height: 59px;
    border: none;
    border-bottom: 1px solid #757575;
    outline: none;
    font-size: 20px;
    color: #949494;
}
.gray {
    background: #f2f2f2;
}
.skyblue {
    background: skyblue;
}
</style>
