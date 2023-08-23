<template>
  <div class="previewCard">
    <!-- :style="{ 'width': `calc(${previewWidth} - 30px)` }" -->
    <img :src="previewImg">
    <div class="masking">
      <el-button type="primary" size="mini" @click="preview(previewData)">预览</el-button>
      <el-button type="primary" size="mini" @click="download(previewData)">下载</el-button>
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
    previewImg: {
      type: String,
      default: '',
    },
    previewWidth: {
      type: String,
      default: '50%',
    },
    previewData: {
      type: Object,
      default: {},
    }
  },
  created() {
  },
  methods: {
    preview(row) {
      this.$emit('preview', row)
    },
    download(row) {
      this.$emit('download', row)
    }
  },
}
</script>
    
<style lang="less" scoped>
.previewCard {
  overflow: hidden;
  position: relative;

  &:hover {
    .masking {
      z-index: 6;
    }
  }

  img {
    width: 100%;
  }

  .masking {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: #00000070;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: -1;
  }
}
</style>
    