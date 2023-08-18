<template>
  <div class="title">
    {{ title }}
    <div style="float: right;" @click="titleChoose()">
      <el-button v-if="type == 'spread'" class="titleIcon" icon="el-icon-full-screen"> 展开 </el-button>
      <el-button v-else-if="type == 'more'" class="titleIcon" icon="el-icon-d-arrow-right"> 更多 </el-button>
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
    title: {
      type: String,
      default: '标题',
    },
    type: {
      type: String,
      default: '',
    }
  },
  created() {
  },
  methods: {
    titleChoose() {
      this.$emit('titleClick')
    }
  },
}
</script>
    
<style lang="less" scoped>
.title {
  width: calc(100% - 20px);
  height: 40px;
  line-height: 40px;
  background: linear-gradient(90deg, #57bee8d6, #5c40da82);
  color: #fff;
  text-align: left;
  padding: 0 0 0 20px;
}

.titleIcon {
  background: #fff9f900;
  color: #fff;
  border: 0;

  &:hover,
  &:focus {
    border-color: #c6e2ff00;
    background-color: #ecf5ff00;
  }
}
</style>
    