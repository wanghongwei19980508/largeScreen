
<template>
  <div>
    <panel :panelAsideShow="true">
      <template #aside>
        <el-form ref="fromRef" :model="asideForm" :label-position="'top'" label-width="80px">
          <el-form-item label="地区" prop="district">
            <el-select v-model="asideForm.district" placeholder="请选择">
              <el-option v-for="dict in dict.type.districtList" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="时间" prop="time">
            <el-date-picker v-model="asideForm.time" type="daterange" range-separator="至" start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button type="primary" size="small" @click="resetForm('fromRef')">重置</el-button>
          <el-button type="primary" size="small" @click="getList">查询</el-button>
        </div>
      </template>
      <template #main>
        <vTable :tableColumn="tableColumn" :tableData="tableData" :tableTotal="tableTotal"
          :height="'calc(100vh -  295px)'" @tableChange="tableChange"></vTable>
      </template>
    </panel>
  </div>
</template>
    
<script>
import panel from '../../components/panel.vue'
import vTable from '../../components/vTable.vue'
import BlockTitle from '../../components/BlockTitle.vue'
export default {
  components: { panel, vTable, BlockTitle },
  dicts: ['districtList'],
  data() {
    return {
      asideForm: { // 查询条件
        district: null,
        time: null
      },
      dict: {
        type: {
          districtList: [{ value: 1, label: 1 }]
        }
      },
      tableTotal: { // 分页
        total: 11,
        currentPage: 1,
        pageSize: 10
      },
      tableColumn: [
        {
          prop: 'title',
          label: '政策标题',
          minWidth: '200'
        },
        {
          prop: 'time',
          label: '发布时间',
          width: '170',
          sortable: true
        },
      ],
      tableData: [
        { title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题', time: '2022-01-03', source: '最多应该是展示十二个字吧', content: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题' },
        { title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题', time: '2023-01-03', source: 'xxxxx', content: 'asdasd' },
      ]
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    // 获取列表
    getList() {
      let parms = { ...this.asideForm, ...this.tableTotal }
      this.tableTotal.total = 11
      console.log(parms);
    },
    // 分页回调
    tableChange(obj) {
      this.tableTotal = obj
      this.getList()
    },
    // 重置表单
    resetForm(formEl) {
      this.$refs[formEl].resetFields()
      this.getList()
    }
  },
  watch: {

  }
}
</script>
    
<style lang="less" scoped>
::v-deep .el-form {
  background: #ffffff00;

  .el-range-editor.el-input__inner,
  .el-input {
    width: 240px;
  }

  .el-form-item {
    margin-bottom: 6px;

    .el-form-item__label {
      padding: 0 0 0;
    }
  }
}

.footer {
  position: absolute;
  bottom: 40px;
  display: flex;
  width: calc(100% - 80px);
  justify-content: space-evenly;
}

::v-deep .el-button--small{
  padding: 12px 37px;
  font-size: 14px;
  border-radius: 3px;
}
</style>