
import { FormItem } from 'element-ui';

import { FormItem } from 'element-ui';

import { Drawer } from 'element-ui';

<template>
  <div>
    <panel :panelAsideShow="true">
      <template #aside>
        <el-form ref="fromRef" :model="asideForm" :rule="{}" :label-position="'top'" label-width="80px">
          <el-form-item label="清单类型" prop="district">
            <el-select v-model="asideForm.district" placeholder="请选择">
              <el-option v-for="dict in dict.type.districtList" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属门类" prop="district">
            <el-select v-model="asideForm.district" placeholder="请选择">
              <el-option v-for="dict in dict.type.districtList" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属大类" prop="district">
            <el-select v-model="asideForm.district" placeholder="请选择">
              <el-option v-for="dict in dict.type.districtList" :key="dict.value" :label="dict.label"
                :value="dict.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属领域" prop="district">
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
        <vTable :tableColumn="tableColumn" :tableData="tableData" :tableTotal="tableTotal" :currentChangePanel="false"
          :height="'calc(100vh -  345px)'" ref="shockRef" @tableChange="tableChange" @currentChange="currentChange">
          <template #header>
            <el-input :style="{ 'width': '200px', 'float': 'right', 'margin-bottom': '10px' }" v-model="asideForm.name"
              placeholder="企业名称"></el-input>
          </template>
        </vTable>
      </template>
    </panel>
    <el-drawer :visible.sync="drawer" :direction="'rtl'" :with-header="false" size="1200px" :before-close="handleClose">
      <div class="enterprisesBox" v-if="drawer">
        <div class="title">
          {{ drawerDate.name }}
        </div>
        <div class="tag-group">
          <div v-for="item in drawerDate.tags" :key="item.label"
            :style="{ 'background-color': item.color + '30', 'color': item.color, 'border-color': item.color, }"
            effect="plain">
            {{ item.label }}
          </div>
        </div>
        <div class="attribute-group">
          <div class="attribute" v-for="item in drawerDate.attribute" :key="item.label"
            :style="{ 'background-color': item.color + '30', 'color': item.color }" effect="plain">
            <div :style="{ 'background-color': item.numberColor }">{{ item.number }}</div> {{ item.label }}
          </div>
        </div>
        <div class="information-group">
          <el-descriptions :column="6" direction="vertical">
            <el-descriptions-item label="成立日期">kooriookami</el-descriptions-item>
            <el-descriptions-item label="注册资本">18100000000</el-descriptions-item>
            <el-descriptions-item label="法定代表人">苏州市</el-descriptions-item>
            <el-descriptions-item label="联系电话">1 </el-descriptions-item>
            <el-descriptions-item label="联系地址" :span="2">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="basic-group">
          <div class="basic-title">基本概况<i class="el-icon-arrow-down" style="margin: 10px;"></i></div>
          <el-descriptions :column="2" :border="true">
            <el-descriptions-item label="法定代表人">kooriookami</el-descriptions-item>
            <el-descriptions-item label="工商注册码">18100000000</el-descriptions-item>
            <el-descriptions-item label="注册资本">苏州市</el-descriptions-item>
            <el-descriptions-item label="组织机构代码">学校 </el-descriptions-item>
            <el-descriptions-item label="产业">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="统一社会信用代码">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="营业期限">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="注册状态">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="成立时间">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="核准日期">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="企业类型">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="网址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="注册地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="电话">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="联系地址">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="参保人数">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="微信公众号" :span="2">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="经营范围" :span="2">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
            <el-descriptions-item label="企业简介" :span="2">江苏省苏州市吴中区吴中大道 1188 号</el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="shareholder-group">
          <div class="shareholder-title">股东信息<i class="el-icon-arrow-down" style="margin: 10px;"></i></div>
          <el-table :data="drawerDate.shareholderData" style="width: 100%">
            <el-table-column prop="date" label="股东（发起人）" min-width="300">
            </el-table-column>
            <el-table-column prop="name" label="持股比例(%)" width="200">
            </el-table-column>
            <el-table-column width="200" prop="address" label="认缴出资额(万元)">
            </el-table-column>
            <el-table-column width="200" prop="address" label="认缴出资日期">
            </el-table-column>
            <el-table-column width="200" prop="address" label="查看该股东实际控制人">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-drawer>
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
          label: '企业中文名称',
          minWidth: '300'
        },
        {
          prop: 'title',
          label: '企业英文名称',
          width: '250'
        },
        {
          prop: 'time',
          label: '所属门类',
          width: '90'
        },
        {
          prop: 'time',
          label: '所属大类',
          width: '90'
        },
        {
          prop: 'time',
          label: '所属领域',
          width: '90'
        },
        {
          prop: 'time',
          label: '企业注册地',
          width: '200'
        },
        {
          prop: 'time',
          label: '纳入清单',
          width: '200'
        },
        {
          prop: 'time',
          label: '纳入时间',
          width: '170',
          sortable: true
        },
        {
          prop: 'time',
          label: '关键企业',
          width: '80'
        },
      ],
      tableData: [
        {
          name: '北京众合天下管理咨询有限公司', time: '2022-01-03', source: '最多应该是展示十二个字吧', content: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题',
          tags: [
            { color: '#FFBE12', label: '龙头企业' },
            { color: '#3DA2FF', label: '高新技术企业' },
            { color: '#00E985', label: '科技型企业' },
          ],
          attribute: [
            { color: '#247FF2', label: '拥有商标', numberColor: '#247FF2', number: 1 },
            { color: '#FFBF49', label: '省级奖励', numberColor: '#FFBF49', number: 3 },
            { color: '#29D7A0', label: '软件著作', numberColor: '#29D7A0', number: 12 },
            { color: '#247FF2', label: '拥有专利', numberColor: '#247FF2', number: 1 },
            { color: '#FE855C', label: '拥有作品著作', numberColor: '#FE855C', number: 12 },
            { color: '#29D7A0', label: '拥有网站备案', numberColor: '#29D7A0', number: 12 },
          ]
        },
        { title: '我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题我是标题', time: '2023-01-03', source: 'xxxxx', content: 'asdasd' },
      ],
      drawer: false, // 抽屉展示关闭
      drawerDate: { // 抽屉数据

      }
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
    },
    // 点击表格事件
    currentChange(row) {
      this.drawer = true
      this.drawerDate = row
    },
    // 关闭抽屉
    handleClose() {
      this.$refs['shockRef'].setCurrentRow()
      this.drawer = false
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

::v-deep .el-drawer {
  background: #162A50;
  overflow: inherit;

  &::before {
    content: 'x';
    position: absolute;
    width: 28px;
    height: 132px;
    background-color: #162A50FF;
    left: -28px;
    top: calc(50% - 66px);
    clip-path: polygon(0 30%, 0 70%, 50% 80%, 80% 90%, 100% 100%, 100% 0, 80% 10%, 50% 20%, 0 30%);
  }
}

.enterprisesBox {
  padding: 20px;

  .title {
    font-size: 20px;
    font-family: Microsoft YaHei-Semibold, Microsoft YaHei;
    font-weight: 600;
    color: #E1EAFA;
    line-height: 28px;
  }

  .tag-group {
    display: flex;
    margin: 5px 0px;

    div {
      padding: 5px 10px;
      height: 18px;
      font-size: 12px;
      font-family: HarmonyOS Sans SC-Regular, HarmonyOS Sans SC;
      font-weight: 400;
      line-height: 18px;
      margin: 0 5px;
      border: 1px solid;

      &:nth-of-type(1) {
        margin-left: 0;
      }
    }
  }

  .attribute-group {
    display: flex;
    margin: 5px 0px;

    .attribute {
      display: flex;
      height: 18px;
      font-size: 12px;
      font-family: HarmonyOS Sans SC-Regular, HarmonyOS Sans SC;
      font-weight: 400;
      line-height: 18px;
      border: 1px solid;
      margin: 0 5px;
      padding: 5px 10px 5px 0px;
      align-items: center;

      &:nth-of-type(1) {
        margin-left: 0;
      }

      div {
        width: 28px;
        height: 28px;
        line-height: 28px;
        color: #fff;
        text-align: center;
        margin-right: 5px;
      }
    }
  }


  .information-group {
    ::v-deep .el-descriptions__body {
      background: #ffffff00;
      margin-top: 20px;
      margin-bottom: 30px;
      position: relative;

      &::after {
        content: '';
        width: 1180px;
        background-color: #00000080;
        position: absolute;
        height: 20px;
        left: -20px;
        margin-bottom: 20px;
      }
    }

    ::v-deep .el-descriptions-item__label:not(.is-bordered-label) {
      position: relative;
      font-size: 12px;
      font-family: HarmonyOS Sans SC-Regular, HarmonyOS Sans SC;
      font-weight: 400;
      color: #868D9C;
      padding-bottom: 0;

      &::before {
        content: '';
        border-right: 1px solid #321402;
        height: 20px;
        position: absolute;
        right: 15px;
        top: 8px;
      }

      &:last-of-type::before {
        border-right: none;
      }
    }

    ::v-deep .el-descriptions-item__content {
      font-size: 14px;
      font-family: HarmonyOS Sans SC-Regular, HarmonyOS Sans SC;
      font-weight: 400;
      color: #E1EAFA;
    }
  }

  .basic-group {
    .basic-title {
      height: 50px;
      line-height: 40px;
      font-size: 16px;
      font-family: HarmonyOS Sans SC-Medium, HarmonyOS Sans SC;
      font-weight: 500;
      color: #E1EAFA;
    }

    ::v-deep .el-descriptions__body {
      background-color: #ffffff00;
    }

    ::v-deep .el-descriptions-item__label.is-bordered-label {
      background: #163B71;
      border: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #E1EAFA;
    }

    ::v-deep .el-descriptions-item__content {
      background: #0D3166;
      border: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 14px;
      font-family: Microsoft YaHei-Regular, Microsoft YaHei;
      font-weight: 400;
      color: #B8BECC;
    }
  }

  .shareholder-group {
    margin-top: 20px;

    .shareholder-title {
      height: 50px;
      line-height: 40px;
      font-size: 16px;
      font-family: HarmonyOS Sans SC-Medium, HarmonyOS Sans SC;
      font-weight: 500;
      color: #E1EAFA;
    }
  }
}
</style>