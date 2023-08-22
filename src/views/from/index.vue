<template>
  <div>
    <el-drawer :title="title" :visible.sync="drawer" :direction="direction" :before-close="handleClose" :size="width">
      <vFrom labelWidth="100px" ref="searchSubmitForm" size="default" :searchData="searchData" :searchForm="searchForm"
        @fromSubmit="onSubmit" :cancelBtn="false">
        <template slot="classDate">
          <el-date-picker type="dates" v-model="searchData['classDate']" placeholder="选择一个或多个日期">
          </el-date-picker>
        </template>
        <template slot="classTime">
          <el-time-picker is-range v-model="searchData['classTime']" range-separator="至" start-placeholder="开始时间"
            end-placeholder="结束时间" placeholder="选择时间范围" format='HH:mm'>
          </el-time-picker>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              常用设置<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="(item, index) in commonSettingList" :key="index"
                :command="{ item: item, row: null }">{{ item.value }}
              </el-dropdown-item>
              <el-dropdown-item :command="{ item: 'addDropDown' }">设置</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
        <template slot="weekTime">
          <div style="padding: 0 30px;">
            <el-table style="width: 100%" :data="tableData" :border="true">
              <el-table-column label="星期" :width="140">
                <template slot-scope="scope">
                  <el-select v-model="scope.row['date']">
                    <el-option v-for="(op, index) in weekList" :label="op.label" :value="op.value" :key="index"
                      :disabled="op.disabled">{{ op.label }}</el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="上课时间" :width="260">
                <template slot-scope="scope">
                  <el-time-picker is-range v-model="scope.row['time']" range-separator="至" start-placeholder="开始时间"
                    end-placeholder="结束时间" placeholder="选择时间范围" size="samll" format='HH:mm'>
                  </el-time-picker>
                </template>
              </el-table-column>
              <el-table-column align="right" :width="160">
                <template slot-scope="scope">
                  <el-dropdown @command="handleCommand">
                    <span class="el-dropdown-link">
                      常用设置<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item v-for="(item, index) in commonSettingList" :key="index"
                        :command="{ item: item, row: scope.row }">{{ item.value }}
                      </el-dropdown-item>
                      <el-dropdown-item :command="{ item: 'addDropDown' }">设置</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="addButton">
              <el-button type="text" @click="addTable()">添加</el-button>
            </div>
          </div>
        </template>
      </vFrom>
    </el-drawer>
    <el-dialog :visible.sync="commonSettingsVisible" title="配置上课时间段">
      <el-button size="mini" type="danger" @click="addCommonSettings" v-show="addCommonSettingsShow">新增时间段</el-button>
      <el-table :data="commonSettingList">
        <el-table-column :min-width="300" label="时间">
          <template slot-scope="scope">
            <span v-if="!scope.row.disabled">{{ scope.row.value }}</span>
            <el-time-picker v-else is-range v-model="scope.row['time']" range-separator="至" start-placeholder="开始时间"
              end-placeholder="结束时间" placeholder="选择时间范围" size="samll" format='HH:mm'>
            </el-time-picker>
          </template>
        </el-table-column>
        <el-table-column align="right" :width="160" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="editCommonSettings(scope.$index, scope.row)">{{
              scope.row.disabled ? '保存' : '编辑' }}</el-button>
            <el-button size="mini" type="danger"
              @click="deleteCommonSettings(scope.$index, commonSettingList)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
     
<script>
import vFrom from '../../components/vFrom.vue'
import { courseArrangementDrawerForm, weekList } from "./config.js"

export default {
  name: 'courseArrangementDrawer',
  components: {
    vFrom,
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    direction: {
      type: String,
      default: 'rtl'
    },
    drawer: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '40%'
    },
  },
  data() {
    return {
      searchForm: courseArrangementDrawerForm, // 表格配置
      weekList: weekList, // 星期列表
      commonSettingList: [ // 常用时间列表
        { value: '11:40-13:40', time: ['2022-01-31 11:40', '2022-01-31 13:40'], disabled: false }
      ],
      commonSettingsVisible: false, // 常用时间配置展示
      searchData: {}, // 表格数据
      tableData: [
        { date: 1, time: [new Date('2022-01-31 18:40'), new Date('2022-01-31 20:40')] }
      ]
    }
  },
  mounted() {
    let Data = {}
    this.searchForm.forEach(item => {
      item.forEach(i => {
        if (i.prop) {
          if (i.type === 'tags') {
            Data[i.prop] = []
          } else {
            Data[i.prop] = undefined
          }
        }
      })
    })
    this.searchData = Data
  },
  methods: {
    // 提交
    onSubmit() {
      this.searchData.weekTime = this.tableData
      console.log(this.searchData);
      this.$emit('fromSubmit', { label: 'courseArrangementDrawer', searchData: this.searchData })
    },
    // 关闭抽屉
    handleClose() {
      this.$emit('fromCancel', { label: 'courseArrangementDrawer' })
    },
    // 删除周配置
    handleDelete(index, row) {
      if (this.tableData.length < 2) {
        this.$error('最少保留一个配置')
      } else {
        this.tableData.splice(index, 1);
      }
    },
    // 添加周配置
    addTable() {
      this.tableData.push({ date: 2, time: [new Date(), new Date()] })
    },
    // 常用设置
    handleCommand(obj) {
      let { item, row } = obj
      if (item === 'addDropDown') {
        this.commonSettingsVisible = true
      } else {
        if (row) {
          row.time = item.time.map((i) => {
            return new Date(i)
          })
        } else {
          this.searchData['classTime'] = item.time.map((i) => {
            return new Date(i)
          })
        }
      }
    },
    // 编辑常用设置
    editCommonSettings(index, row) {
      if (row.disabled) {
        this.$set(this.commonSettingList[index], 'value', new Date(this.commonSettingList[index].time[0]).Format('HH:mm') + '-' + new Date(this.commonSettingList[index].time[1]).Format('HH:mm'))
        '接口保存'
      }
      this.$set(this.commonSettingList[index], 'disabled', !this.commonSettingList[index].disabled)
    },
    // 删除常用设置
    deleteCommonSettings(index, item) {
      item.splice(index, 1);
    },
    // 新增常用设置
    addCommonSettings() {
      this.commonSettingList.push(
        { time: [new Date(), new Date()], disabled: true }
      )
    },
  },
  computed: {
    addCommonSettingsShow() {
      let blon = true
      this.commonSettingList.map((item) => {
        if (item.disabled) blon = false
      })
      return blon
    }
  },
  watch: {
    searchData: {
      deep: true,
      handler: function (newvalue, oldV) {
        if ((newvalue['arrangementOfCourses'] === 1 && (newvalue['repetitiveMode'] === 1 || newvalue['repetitiveMode'] === 2)) || newvalue['arrangementOfCourses'] === 2) {
          this.searchData.classTimeShow = 1
        } else if (newvalue['arrangementOfCourses'] === 1 && (newvalue['repetitiveMode'] === 3 || newvalue['repetitiveMode'] === 4)) {
          this.searchData.classTimeShow = 2
        } else {
          this.searchData.classTimeShow = 0
        }
      }
    }
  }
}
</script>
<style lang="less" scoped>
.addButton {
  display: flex;
  justify-content: center;
  border: 1px solid #efd8d8;
}
</style>
<style lang="less">
.el-date-editor .el-range__icon {
  width: 0 !important;
}

.el-date-editor .el-range-input {
  width: 45%;
}

.el-date-editor .el-range-separator {
  width: 10%;
}

.el-date-editor.el-input__inner {
  width: 230px !important;
}
</style>
   
     