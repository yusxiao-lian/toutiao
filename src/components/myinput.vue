<template>
  <input type="text" class="myinput"
    :class="{ 'gray': bgc === 'gray', 'skyblue': bgc === 'skyblue', 'success': status, 'err': !status}"
    @input="handlemyinput" @blur="handleBlur">
</template>

<script>
export default {
  data () {
    return {
      status: true
    }
  },
  props: ['value', 'bgc', 'rules', 'tips'],
  methods: {
    // 当input发生改变时的操作
    handlemyinput (event) {
      let value = event.target.value
      if (this.rules && this.rules.test(value)) {
        this.status = true
      } else {
        this.status = false
      }
      this.$emit('input', value)
    },
    // blur为input框失焦事件
    handleBlur () {
      let value = event.target.value
      // 当输入数据不符合规则就进行提示
      if (this.rules && !this.rules.test(value)) {
        this.$toast.fail({
          message: this.tips || '输入内容不正确',
          duration: 3000
        })
      }
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
    font-size: 18px;
    color: #949494;
}
.gray {
    background: #f2f2f2;
}
.skyblue {
    background: skyblue;
}
.success {
    border-bottom-color: green;
}
.err {
    border-bottom-color: red;
}
</style>
