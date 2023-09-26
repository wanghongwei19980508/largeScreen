<template>
  <div style="display: flex;">
    <div :style="currentChangePanel && expansion ? { 'width': 'calc(100% - 500px)' } : ''">
      <template>
        <slot show-overflow-tooltip name="header">
        </slot>
      </template>
      <el-table :data="tableData" :height="height" stripe highlight-current-row @current-change="handleCurrentChange"
        @selection-change="handleSelectionChange">
        <el-table-column v-if="selectionShow" type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="( item, tCindex ) in  tableColumn " :key="tCindex" :fixed="item.fixed" :prop="item.prop"
          :min-width="'100px'" :label="item.label" :width="item.width" :sortable="item.sortable">
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
              <el-button v-for="( item, tSindex ) in  tableScope " :key="tSindex" link :type="item.type" size="mini"
                @click.prevent="item.handle(scope)">
                {{ item.text }}
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <vPagination ref="paginationRef" :total="tableTotal.total" :currentPage="gettableTotal.currentPage"
        :pageSize="gettableTotal.pageSize" :pageSizes="gettableTotal.pageSizes" :small="gettableTotal.small"
        :disabled="gettableTotal.disabled" :background="gettableTotal.background" @tableChange="pageChange">
      </vPagination>
    </div>
    <div v-if="currentChangePanel && expansion" style="width: 500px;">
      <el-card class="title-card">
        <div slot="header" class="clearfix">
          <div class="title">{{ currentChangeSelection.title }}</div>
          <p>
            发布时间：
            <span>{{ currentChangeSelection.time }}</span>
            &nbsp;&nbsp;丨&nbsp;&nbsp;来源：
            <span>{{ currentChangeSelection.source }}</span>
          </p>
        </div>
        <div class="text" v-html="currentChangeSelection.content">
        </div>
      </el-card>
    </div>
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
      multipleSelection: [], // 选择框内容
      currentChangeSelection: {}, // 点击选择内容
      expansion: false, // 面板展开收起
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
    currentChangePanel: { // 是否有面板
      type: Boolean,
      default: () => true
    }
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
    },
    handleCurrentChange(val) {
      if (this.currentChangePanel) {
        this.currentChangeSelection = val
        this.expansion = true
      } else {
        this.$emit('currentChange', val)
      }
    }
  }
};
</script>
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

.title-card {
  height: 100%;
  background: #0A2D6B;
  border: 1px solid rgba(36, 137, 255, 0.3);
  margin: 0 15px;
  color: #E1EAFA;

  .title {
    text-align: center;
    font-size: 24px;
    font-family: Microsoft YaHei-Semibold, Microsoft YaHei;
    font-weight: 600;
    white-space: nowrap; //不换行
    overflow: hidden; //超出部分隐藏
    text-overflow: ellipsis; //文本溢出显示省略号
  }

  p {
    display: flex;
    margin-top: 10px;
    color: #B8BECC;
    font-size: 14px;
    justify-content: center;
    align-items: baseline;

    span {
      max-width: 100px;
      display: block;
      white-space: nowrap; //不换行
      overflow: hidden; //超出部分隐藏
      text-overflow: ellipsis; //文本溢出显示省略号

      &:nth-of-type(2) {
        max-width: 150px;
      }
    }
  }

  .text {
    height: calc(100vh - 380px);
    color: #B8BECC;
    overflow: auto;
    font-family: Microsoft YaHei-Regular, Microsoft YaHei;
    font-size: 14px;
    font-weight: 400;
  }
}
</style>