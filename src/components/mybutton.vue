<template>
  <div class="btn" @click="handlebtn">
      <slot></slot>
  </div>
</template>

<script>
export default {
  props: [],
  methods: {
    handlebtn (event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style>
.btn {
    width: 318/360*100vw;
    height: 48px;
    background: #cc3300;
    border-radius: 24px;
    text-align: center;
    line-height: 48px;
    color: white;
    font-size: 18px;
}
</style>
