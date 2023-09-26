<template>
  <div>
    <div class="topBox">
      <BlockTitle :title="'国际制造业迁移'" />
      <div class="echarts">
        <mapEcharts></mapEcharts>
      </div>
    </div>
    <div class="internationalContent">
      <BlockTitle :type="'more'" :title="'国际制造业监测'" @titleClick="expandView('/index/manufacturingMonitoring')" />
      <div class="echart-International">
        <div class="echarts">
          <BlockTitle :type="'spread'" @titleClick="dialogView('1')" :showTitleBG="false" :title="'GDP'" />
          <barChart ref="barEchartCompRef" :barEchartData="barEchartData" />
        </div>
        <div class="echarts">
          <BlockTitle :type="'spread'" @titleClick="dialogView('2')" :showTitleBG="false" :title="'进口'" />
          <barChart ref="barEchartCompRef" :barEchartData="barEchartData" />
        </div>
        <div class="echarts">
          <BlockTitle :type="'spread'" @titleClick="dialogView('3')" :showTitleBG="false" :title="'出口'" />
          <barChart ref="barEchartCompRef" :barEchartData="barEchartData" />
        </div>
      </div>
    </div>
    <div class="twoBox">
      <div class="asideContent">
        <BlockTitle :type="'more'" :title="'国际供应链政策'" @titleClick="expandView('/index/supplyChainPolicy')" />
        <el-table class="hide-header" :height="'calc(100% - 40px)'" :data="policyData" stripe>
          <el-table-column prop="title" label="标题" min-width="45%" header-align="left">
            <template v-slot="scope">
              <div class="tableText">{{ scope.row.title }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="source" label="来源" min-width="25%" header-align="left">
            <template v-slot="scope">
              <div class="tableText">{{ scope.row.source }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="日期" min-width="30%" header-align="left">
            <template v-slot="scope">
              <div class="tableText">{{ scope.row.date }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="asideContent">
        <BlockTitle :type="'more'" :title="'国际企业外迁动态'" @titleClick="expandView('/index/emigrationDynamics')" />
        <el-table class="hide-header" :height="'calc(100% - 40px)'" :data="policyData" stripe>
          <el-table-column prop="title" label="标题" min-width="70%" header-align="left">
            <template v-slot="scope">
              <div class="tableText">{{ scope.row.title }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="日期" min-width="30%" header-align="left">
            <template v-slot="scope">
              <div class="tableText">{{ scope.row.date }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="twoBox">
      <div class="asideContent">
        <BlockTitle :type="'more'" :title="'国际冲击'" @titleClick="expandView('/index/chartList')" />
        <el-table :height="'calc(100% - 40px)'" :data="policyData" stripe>
          <el-table-column prop="title" label="企业名称" min-width="20%" header-align="left">
            <template v-slot="scope">
              <div class="tableText">{{ scope.row.title }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="所属领域" min-width="20%" header-align="left">
            <template v-slot="scope">
              <div class="tableText">{{ scope.row.title }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="纳入清单" min-width="30%" header-align="left">
            <template v-slot="scope">
              <div class="tableText">{{ scope.row.title }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="纳入时间" min-width="30%" header-align="left">
            <template v-slot="scope">
              <div class="tableText">{{ scope.row.date }}</div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="asideContent">
        <BlockTitle :title="'产业救济'" @titleClick="expandView('/index/industrialRelief')" />
        <div class="industrial">
          <div class="industrialText">
            <div></div>
            产业救济专门为受打压企业提供申诉办理、产业扶持、产融合作等服务。
          </div>
          <div class="industrialButton">
            <el-button type="primary" size="mini" @click="expandView('/index/industrialRelief')">立即申请</el-button>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="800px" top="5vh" :show-close="false">
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
import barChart from '../components/barChart.vue'
import BlockTitle from '../components/BlockTitle.vue'
import previewCard from '../components/previewCard.vue'
import mapEcharts from './computent/echarts/flightDiagram.vue'

export default {
  components: { BlockTitle, barChart, previewCard, mapEcharts },
  data() {
    return {
      barEchartData: {}, // 统计图1
      policyData: [],  // label1
      dialogVisible: false, // 统计图弹窗
      dialogForm: { // 统计图选择表框
        name: null,
        time: null,
      },
      echartsRequest: null, // 当前弹窗接口地址
      requestInterface: { // 统计图接口映射
        '1': '接口1',
        '2': '接口2',
        '3': '接口3'
      },
      dialogData: {}, // 统计图数据
    }
  },
  mounted() {
    this.barEchartData = {
      xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [{ name: '数据一', data: [10, 52, 200, 334, 390, 330, 220,], color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [{ offset: 0, color: '#1DE4F700' }, { offset: 1, color: '#1DE4F7ff' }]) }, { name: '数据2', data: [10, 52, 200, 334, 390, 330, 220,], type: 'line' }],
      splitLineType: 'dashed',
      name: '11',
    }
    this.policyData = [
      { title: '捷爱士光电科技袜子星礼卡你擦', source: '半导体半导体半导体', date: '2022-02-02' },
      { title: '捷爱士光电科技袜子星礼卡你擦', source: '半导体半导体半导体', date: '2022-02-02' },
      { title: '捷爱士光电科技袜子星礼卡你擦', source: '半导体半导体半导体', date: '2022-02-02' },
      { title: '捷爱士光电科技袜子星礼卡你擦', source: '半导体半导体半导体', date: '2022-02-02' },
      { title: '捷爱士光电科技袜子星礼卡你擦', source: '半导体半导体半导体', date: '2022-02-02' },
      { title: '捷爱士光电科技袜子星礼卡你擦', source: '半导体半导体半导体', date: '2022-02-02' },
      { title: '捷爱士光电科技袜子星礼卡你擦', source: '半导体半导体半导体', date: '2022-02-02' },
      { title: '捷爱士光电科技袜子星礼卡你擦', source: '半导体半导体半导体', date: '2022-02-02' },
    ]
  },
  methods: {
    // 跳转页面
    expandView(row) {
      this.$router.push(row)
    },
    // 统计图弹窗
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
        series: [{ name: '数据一', data: [10, 52, 200, 334, 390, 330, 220,] }, { name: '数据2', data: [10, 52, 200, 334, 390, 330, 220,], type: 'line' }],
        splitLineType: 'dashed',
        name: '11'
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
.topBox {
  height: 640px;
  width: calc(100% - 20px);
  margin: 8px 10px;

  .echarts {
    overflow: auto;
    width: 100%;
    height: calc(100% - 40px);
  }
}

.internationalContent {
  width: calc(100% - 20px);
  margin: 8px 10px;
  // border: #123370 2px solid;
  box-sizing: border-box;

  .echart-International {
    height: 400px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow-x: auto;

    .echarts {
      height: calc(100% - 0px);
      width: calc(33.3% - 20px);
      min-width: 400px;
      padding-right: 20px;

      &:nth-of-type(3) {
        padding-right: 0;
      }

      .bar-echart-Box {
        height: calc(100% - 40px)
      }
    }
  }
}

.twoBox {
  height: 400px;

  display: flex;

  .asideContent {
    width: calc(50% - 20px);
    margin: 8px 10px;
    // border: #123370 2px solid;
    box-sizing: border-box;

    .industrial {
      height: calc(100% - 60px);
      position: relative;
      padding: 10px 30px;

      .industrialText {
        font-size: 16px;
        line-height: 60px;
        color: white;
        text-align: left;
        color: #E1EAFA;

        div {
          width: 58px;
          height: 58px;
          background-image: url('../assets/Frame.png');
          background-size: 100% 100%;
          float: left;
          margin: 1px 10px 1px 0;
        }
      }

      .industrialButton {
        position: absolute;
        bottom: 30px;
        left: 50%;
      }
    }

    .tableText {
      white-space: nowrap; //不换行
      overflow: hidden; //超出部分隐藏
      text-overflow: ellipsis; //文本溢出显示省略号
    }

    // .previewBox {
    //   height: calc(100% - 60px);
    //   width: 100%;
    //   display: flex;
    //   flex-wrap: wrap;
    //   overflow: auto;
    //   padding: 10px 0;
    //   align-content: flex-start;
    //   justify-content: space-around;

    //   .previewCard {
    //     width: calc(50% - 15px);
    //     height: 90px;
    //     margin: 5px 0;
    //   }
    // }
  }
}

::v-deep .el-table {
  font-size: 14px;
}

.hide-header {
  ::v-deep .el-table__header-wrapper {
    display: none;
  }
}

.dialogEcharts {
  width: 100%;
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
</style>