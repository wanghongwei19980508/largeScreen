<template>
  <div v-if="loadingShow">
    <div class="Box">
      <dv-loading>Loading...</dv-loading>
    </div>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
    }
  },
  props: {
    loadingShow: {
      type: Boolean,
      default: false,
    }
  },
  created() {
  },
  methods: {
  },
}
</script>
  
<style lang="less" scoped>
.Box {
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: #000000d6;
}
</style>
  