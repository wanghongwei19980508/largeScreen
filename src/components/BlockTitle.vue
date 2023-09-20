<template>
  <div class="title" :style="showTitleBG ? '' : 'background:#00000000'">
    <p>{{ title }}</p>
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
    },
    showTitleBG: {
      type: Boolean,
      default: true,
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
  width: calc(100% - 30px);
  min-width: 380px;
  height: 40px;
  background: linear-gradient(90deg, #2187FF 0%, rgba(33, 135, 255, 0) 100%);
  text-align: left;
  padding: 0 0 0 30px;
  position: relative;

  p {
    line-height: 40px;
    font-size: 20px;
    font-family: 'YouSheBiaoTiHei-Regular', 'YouSheBiaoTiHei';
    font-weight: bold;
    letter-spacing: 2px;
    background: linear-gradient(180deg, #FFFFFF 0%, #B1CCFF 83%, #9CBFFF 100%);
    float: left;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &::before {
    content: "";
    position: absolute;
    display: block;
    top: 10px;
    left: 12px;
    width: 8px;
    height: 20px;
    background-image: url(../assets/Polygon-15.png);
    background-size: 100% 100%;
  }
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
    