<template>
  <div>
    <el-table :data="tableData" border style="width: auto" :height="height" :row-class-name="tableRowClassName"
      @selection-change="handleSelectionChange">
      <el-table-column v-if="selectionShow" type="selection" width="55">
      </el-table-column>
      <el-table-column v-for="(item, tCindex) in tableColumn" :key="tCindex" :fixed="item.fixed" :prop="item.prop"
        :min-width="'100px'" :label="item.label" :width="item.width">
        <template #default="scope">
          <div @click="item.handle && item.handle(scope)">
            <span v-if="item.filter" :class="item.handle ? 'spanClass' : ''">
              {{ item.filter && item.filter(scope.row) }}
            </span>
            <img v-else-if="item.image" :src="scope.row[item.prop]" style="width:40px; height: 40px">
            <slot v-else-if="item.slot" show-overflow-tooltip :name="item.slot" :row="scope.row">
            </slot>
            <span v-else :class="item.handle ? 'spanClass' : ''">{{ scope.row[item.prop] }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作"
        :width="tableScope.length > 3 ? tableScope.length / 2 * 80 : tableScope.length * 80" v-if="scopeShow">
        <template #default="scope">
          <div class="buttonBox">
            <el-button v-for="(item, tSindex) in tableScope" :key="tSindex" link :type="item.type" size="mini"
              @click.prevent="item.handle(scope)">
              {{ item.text }}
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <vPagination ref="paginationRef" :total="tableTotal.total" :currentPage="gettableTotal.currentPage"
      :pageSize="gettableTotal.pageSize" :pageSizes="gettableTotal.pageSizes" :small="gettableTotal.small"
      :disabled="gettableTotal.disabled" :background="gettableTotal.background" @tableChange="pageChange"></vPagination>
  </div>
</template>
        
<script>
import vPagination from "./vPagination.vue"

export default {
  name: "vTable",
  components: {
    vPagination,
  },
  data() {
    return {
      tableTotals: {}, // 页码
      multipleSelection: [], // 选择内容
      expansion: false // 展开收齐
    };
  },
  props: {
    height: { // 表格高度
      type: String,
      default: () => '350'
    },
    selectionShow: { // 是否展示选择框
      type: Boolean,
      default: () => false
    },
    tableColumn: { // 表头
      type: Array,
      default: () => []
    },
    tableData: { // 表格
      type: Array,
      default: () => []
    },
    tableScope: { // 操作
      type: Array,
      default: () => []
    },
    tableTotal: { // 分页
      type: Object,
      default: () => { }
    },
  },
  mounted() {
    this.tableTotals = {
      limit: this.tableTotal.pageSize,
      offset: (this.tableTotal.currentPage - 1) * this.tableTotal.pageSize,
    }
  },
  computed: {
    scopeShow() {
      return this.tableScope.length > 0 ? true : false
    },
    gettableTotal() {
      return {
        currentPage: this.tableTotal.currentPage ? this.tableTotal.currentPage : 1,
        pageSize: this.tableTotal.pageSize ? this.tableTotal.pageSize : 10,
        pageSizes: this.tableTotal.pageSizes ? this.tableTotal.pageSizes : [10, 20, 50, 100],
        small: this.tableTotal.small ? this.tableTotal.small : false,
        disabled: this.tableTotal.disabled ? this.tableTotal.disabled : false,
        background: this.tableTotal.background ? this.tableTotal.background : true
      }
    },
  },
  methods: {
    tableRowClassName({ row }) {
      if (row.tableState === 'primary') {
        return 'primary-row'
      } else if (row.tableState === 'success') {
        return 'success-row'
      } else if (row.tableState === 'info') {
        return 'info-row'
      } else if (row.tableState === 'warning') {
        return 'warning-row'
      } else if (row.tableState === 'danger') {
        return 'danger-row'
      }
      return ''
    },
    pageChange(obj) {
      this.tableTotals = obj
      this.tableChange()
    },
    cleartableTotal(row) {
      this.$refs['paginationRef'].cleartableTotal(row)
    },
    tableChange() {
      if (this.headerShow) {
        this.$emit('tableChange', Object.assign(this.tableTotals, this.headerData))
      } else {
        this.$emit('tableChange', this.tableTotals)
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.$emit('selectionChange', val)
    }
  }
};
</script>
<style lang="less">
.el-table .primary-row {
  background: #c6e2ff;
}

.el-table .success-row {
  background: #d1edc4;
}

.el-table .info-row {
  background: #dedfe0;
}

.el-table .warning-row {
  background: #f8e3c5;
}

.el-table .danger-row {
  background: #fcd3d3;
}
</style>
<style scoped lang="less">
.buttonBox {
  display: flex;
  flex-direction: row;
  justify-content: space-around;

  button {
    margin: 10px 0;
  }
}

.spanClass {
  cursor: pointer;
  color: #FF7519;
}
</style>