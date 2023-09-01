<template>
  <div class="demo-pagination-block">
    <el-descriptions class="margin-top" :title="title" :column="column" :size="size">
      <template v-for="(item, index) in formList">
        <el-descriptions-item :key="'vDescriptions' + index" v-if="item.type !== 'slot'" :label="item.label"
          label-class-name="my-label">
          <span v-if="item.filter">
            {{ item.filter && item.filter(searchData[item.prop]) }}
          </span>
          <span v-else>{{ searchData[item.prop] }}</span>
        </el-descriptions-item>
      </template>
    </el-descriptions>
  </div>
</template>
<script>
export default {
  name: "vDescriptions",
  components: {
  },
  data() {
    return {
      formData: {}
    };
  },
  props: {
    title: {
      type: String,
      default: ""
    },
    size: {
      type: String,
      default: ""
    },
    searchForm: {
      type: Array,
      default: () => []
    },
    searchData: {
      type: Object,
      default: () => { }
    },
    column: {
      type: Number,
      default: 2
    }
  },
  mounted() {
  },
  computed: {
    formList() {
      let list = this.searchForm
      return list.flat()
    }
  },
  watch: {
  }
};
</script>
<style lang="less" scoped>
::v-deep .el-descriptions__body {
  background: #00000000;
  color: #fff;
}

::v-deep .el-descriptions__header {
  color: #fff;
  justify-content: flex-start;

  .el-descriptions__title {
    width: 90px;
    text-align: left;
  }

  &::after {
    content: '';
    display: block;
    width: 90%;
    height: 1px;
    background-color: #fff;
    /* 设置分割线的颜色 */
    margin-top: 10px;
    /* 可根据需求设置分割线与文本之间的间距 */
  }
}</style>