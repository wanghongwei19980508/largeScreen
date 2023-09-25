<template>
  <div class="demo-pagination-block">
    <el-pagination :current-page.sync="tableTotal.currentPage" :page-size="tableTotal.pageSize" :page-sizes="pageSizes"
      :small="small" :disabled="disabled" layout="total, sizes, prev, pager, next, jumper"
      :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>
<script>
export default {
  name: "vFrom",
  components: {
  },
  data() {
    return {
      tableTotal: {
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
    };
  },
  props: {
    total: {
      type: Number,
      default: () => 100
    },
    currentPage: {
      type: Number,
      default: () => 1
    },
    pageSize: {
      type: Number,
      default: () => 10
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    small: {
      type: Boolean,
      default: () => false
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
  },
  mounted() {
  },
  methods: {
    handleSizeChange(val) {
      this.tableTotal.pageSize = val
      const pageMax = Math.ceil(this.total / val)
      if (this.tableTotal.currentPage > pageMax) return
      this.handleTableChange(this.tableTotal)
    },
    handleCurrentChange(val) {
      this.tableTotal.currentPage = val
      this.handleTableChange(this.tableTotal)
    },
    cleartableTotal(row) {
      this.tableTotal.currentPage = row.page
      this.tableTotal.pageSize = row.size
      this.tableTotal.noChange = true
      this.handleTableChange(this.tableTotal)
    },
    handleTableChange(obj) {
      this.$emit('tableChange', obj)
    }
  }
};
</script>
<style scoped lang="less">
.demo-pagination-block {
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
}

.demo-pagination-block+.demo-pagination-block {
  margin-top: 10px;
}

.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
</style>