<template>
  <div>
    <panel :panelAsideShow="false">
      <template #aside>
        <div class="aside">
          <dv-border-box-10>

          </dv-border-box-10>
        </div>
      </template>
      <template #main>
        <div class="echartsBox">
          <div class="echarts">
            <BlockTitle :type="'spread'" @titleClick="aaa" />
            <barChart ref="barEchartCompRef" :barEchartData="barEchartData1" />
          </div>
          <div class="echarts">
            <BlockTitle :type="'spread'" />
            <barChart ref="barEchartCompRef" :barEchartData="barEchartData1" />
          </div>
          <div class="echarts">
            <BlockTitle :type="'spread'" />
            <barChart ref="barEchartCompRef" :barEchartData="barEchartData" />
          </div>
          <div class="echarts">
            <BlockTitle :type="'spread'" />
            <barChart ref="barEchartCompRef" :barEchartData="barEchartData" />
          </div>
          <div class="echarts">
            <BlockTitle :type="'spread'" />
            <barChart ref="barEchartCompRef" :barEchartData="barEchartData" />
          </div>
        </div>
      </template>
    </panel>
    <el-dialog :visible.sync="dialogVisible" width="80%" top="5vh" :show-close="false">
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
import panel from '../components/panel.vue'
import barChart from '../components/barChart.vue'
import BlockTitle from '../components/BlockTitle.vue'
export default {
  components: { panel, barChart, BlockTitle },
  data() {
    return {
      dialogVisible: false,
      dialogForm: {
        name: null,
        time: null,
      },
      dialogData: {},
      barEchartData: {},
      barEchartData1: {
        xAxis: ['1', '2', '3', '4', '5', '6', '7', '1', '2', '3', '4', '5', '6', '7'],
        series: [{ name: '数据一', data: [10, 52, 200, 334, 390, 330, 220,], color: '#fffac1' }, { name: '数据2', data: [10, 52, 200, 334, 390, 330, 220,], type: 'line', areaStyle: true }],
      },
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
    aaa() {
      this.dialogData = this.barEchartData1
      this.dialogVisible = true
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
    height: calc(40vh + 70px);
    margin: 0 1.5% 10px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
}

:deeo .el-dialog__body {
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