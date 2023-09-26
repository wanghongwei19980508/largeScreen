<template>
  <div>
    <panel :panelAsideShow="false">
      <template #main>
        <div class="echartsBox">
          <div class="echarts">
            <BlockTitle :type="'spread'" @titleClick="dialogView('1')" />
            <barChart ref="barEchartCompRef" :barEchartData="barEchartData1" />
          </div>
          <div class="echarts">
            <BlockTitle :type="'spread'" @titleClick="dialogView('2')" />
            <barChart ref="barEchartCompRef" :barEchartData="barEchartData1" />
          </div>
          <div class="echarts">
            <BlockTitle :type="'spread'" @titleClick="dialogView('3')" />
            <barChart ref="barEchartCompRef" :barEchartData="barEchartData" />
          </div>
          <div class="echarts">
            <BlockTitle :type="'spread'" @titleClick="dialogView('4')" />
            <barChart ref="barEchartCompRef" :barEchartData="barEchartData" />
          </div>
          <div class="echarts">
            <BlockTitle :type="'spread'" @titleClick="dialogView('5')" />
            <barChart ref="barEchartCompRef" :barEchartData="barEchartData" />
          </div>
        </div>
      </template>
    </panel>
    <el-dialog :visible.sync="dialogVisible" width="1000px" top="5vh" :show-close="false">
      <span slot="title">
        <BlockTitle />
        <el-form ref="form" :model="dialogForm" label-width="80px" size="mini" style="margin-top: 22px;">
          <el-row>
            <el-col :span="8">
              <el-form-item label="活动名称">
                <el-input v-model="dialogForm.name"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="活动时间">
                <el-date-picker v-model="dialogForm.time" type="daterange" range-separator="至" start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </span>
      <div class="dialogEcharts" v-if="dialogVisible">
        <barChart ref="barEchartCompRef" :barEchartData="dialogData" />
      </div>
    </el-dialog>
  </div>
</template>
  
<script>
import * as echarts from 'echarts';
import panel from '../../components/panel.vue'
import barChart from '../../components/barChart.vue'
import BlockTitle from '../../components/BlockTitle.vue'
export default {
  components: { panel, barChart, BlockTitle },
  data() {
    return {
      dialogVisible: false, // 统计图弹窗
      dialogForm: { // 统计图选择表框
        name: null,
        time: null,
      },
      dialogData: {}, // 统计图数据
      requestInterface: { // 统计图接口映射
        '1': '接口1',
        '2': '接口2',
        '3': '接口3'
      },
      echartsRequest: null, // 当前弹窗接口地址
      barEchartData: {}, // 
      barEchartData1: {
        xAxis: ['1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7'],
        series: [{ name: '数据一', data: [10, 52, 200, 334, 390, 330, 220,], color: '#fffac1' }, { name: '数据2', data: [10, 52, 200, 334, 390, 330, 220,], type: 'line', areaStyle: true }],
      }, // 
    }
  },
  mounted() {
    this.barEchartData = {
      xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [{ name: '数据一', data: [10, 52, 200, 334, 390, 330, 220,] }, { name: '数据2', data: [10, 52, 200, 334, 390, 330, 220,], type: 'line' }],
    }
    setTimeout(() => {
      this.barEchartData.series.push({ name: '数据3', data: [20, 152, 300, 434, 590, 630, 320,], type: 'line', areaStyle: true, labelShow: true })
    }, 1000)
  },
  methods: {
    dialogView(item) {
      this.echartsRequest = this.requestInterface[item]
      this.dialogForm = {
        name: null,
        time: null,
      }
      this.dialogVisible = true
    },
    // 获取弹窗统计图数据
    dialogEchartsData() {
      this.dialogData = {
        xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        series: [{ name: '数据一', data: [10, 52, 200, 334, 390, 330, 220,], color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{ offset: 0, color: '#1DE4F700' }, { offset: 1, color: '#1DE4F7ff' }]) }, { name: '数据2', data: [10, 52, 200, 334, 390, 330, 220,], type: 'line' }],
        splitLineType: 'dashed',
        name: '11',
      }
    }
  },
  watch: {
    dialogForm: {
      handler(newValue, oldValue) {
        if (this.dialogVisible) {
          this.dialogEchartsData()
        }
      },
      deep: true
    }
  }
}
</script>
  
<style lang="less" scoped>
.aside {
  background-color: #050D1A;
  margin: 20px;
  height: calc(100% - 40px);
}

.echartsBox {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 10px 0 0 0;

  .echarts {
    width: 30%;
    min-width: 400px;
    height: 440px;
    padding: 0 10px;
    margin: 0 1% 10px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}

::v-deep .el-dialog__body {
  padding: 10px 10px 30px;
}

.dialogEcharts {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>