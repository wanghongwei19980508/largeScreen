<template>
  <div>
    <div class="topBox">
      <BlockTitle :title="'国际制造业迁移'" />
      <div class="echarts">
        <mapEcharts></mapEcharts>
      </div>
    </div>
    <div class="asideBox">
      <div class="asideContent">
        <BlockTitle :type="'more'" :title="'国际制造业数据库'" @titleClick="expandView('/index/chartList')" />
        <barChart ref="barEchartCompRef" :barEchartData="barEchartData" />
      </div>
      <div class="asideContent">
        <BlockTitle :type="'more'" :title="'国际工业链政策'" @titleClick="expandView('/index/chartList')" />
        <el-table :height="'calc(100% - 40px)'" :data="policyData">
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
        <BlockTitle :type="'more'" :title="'产品报告'" @titleClick="expandView('/index/chartList')" />
        <div class="previewBox">
          <previewCard v-for="(row, index) in reportData" :key="index" :previewData="row" :previewImg="row.img"
            @download="download"></previewCard>
        </div>
      </div>
    </div>

    <div class="rightBox">
      <div class="asideContent">
        <BlockTitle :type="'more'" :title="'企业外迁动态'" @titleClick="expandView('/index/chartList')" />
        <el-table :height="'calc(100% - 40px)'" :data="policyData">
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
      <div class="asideContent">
        <BlockTitle :type="'more'" :title="'国际冲击'" @titleClick="expandView('/index/chartList')" />
        <el-table :height="'calc(100% - 40px)'" :data="policyData">
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
            产业救济专门为受打压企业提供申诉办理、产业扶
            持、产融合作等服务。
          </div>
          <el-button type="primary" size="mini" @click="expandView('/index/industrialRelief')">立即申请</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
  
<script>
import barChart from '../components/barChart.vue'
import BlockTitle from '../components/BlockTitle.vue'
import previewCard from '../components/previewCard.vue'
import mapEcharts from './computent/echarts/flightDiagram.vue'

export default {
  components: { BlockTitle, barChart, previewCard, mapEcharts },
  data() {
    return {
      barEchartData: {},
      policyData: [],
      reportData: [],
    }
  },
  mounted() {
    console.log(this.$route);
    this.barEchartData = {
      xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      series: [{ name: '数据一', data: [10, 52, 200, 334, 390, 330, 220,] }, { name: '数据2', data: [10, 52, 200, 334, 390, 330, 220,], type: 'line' }],
    }
    this.policyData = [
      { title: '捷爱士光电科技袜子星礼卡你擦', source: '半导体半导体半导体', date: '2022-02-02' },
      { title: '捷爱士光电科技袜子星礼卡你擦', source: '半导体半导体半导体', date: '2022-02-02' },
      { title: '捷爱士光电科技袜子星礼卡你擦', source: '半导体半导体半导体', date: '2022-02-02' },
    ]
    this.reportData = [
      { img: 'https://hbimg.b0.upaiyun.com/539f0dde3ed1ef6f451381a85ac6ff807b2526911005e-n1NrWn_fw658', url: 'xxx' },
      { img: 'https://hbimg.b0.upaiyun.com/539f0dde3ed1ef6f451381a85ac6ff807b2526911005e-n1NrWn_fw658', url: 'xxx' },
      { img: 'https://hbimg.b0.upaiyun.com/539f0dde3ed1ef6f451381a85ac6ff807b2526911005e-n1NrWn_fw658', url: 'xxx' },
      { img: 'https://hbimg.b0.upaiyun.com/539f0dde3ed1ef6f451381a85ac6ff807b2526911005e-n1NrWn_fw658', url: 'xxx' },
    ]
  },
  methods: {
    expandView(row) {
      this.$router.push(row)
    },
    download(row) {

    }
  }
}
</script>
  
<style lang="less" scoped>
.topBox {
  height: 640px;
  width: 100%;

  // width: calc(60vw - 20px);
  // height: calc(100% - 10px);
  // padding: 10px 0;

  .echarts {
    overflow: auto;
    width: 100%;
    height: calc(100% - 40px);
  }
}

.asideBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100% - 20px);
  padding: 10px 0;

  .asideContent {
    height: calc(33.3% - 20px);
    width: 100%;
    margin: 8px 0;
    border: #123370 2px solid;
    box-sizing: border-box;

    .echartsBox {
      height: calc(100% - 40px);
    }
  }

  .tableText {
    white-space: nowrap; //不换行
    overflow: hidden; //超出部分隐藏
    text-overflow: ellipsis; //文本溢出显示省略号
  }

  .previewBox {
    height: calc(100% - 60px);
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    padding: 10px 0;
    align-content: flex-start;
    justify-content: space-around;

    .previewCard {
      width: calc(50% - 15px);
      height: 90px;
      margin: 5px 0;
    }
  }
}





.rightBox {
  width: 20vw;
  height: 100%;
  margin: 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .asideContent {
    height: calc(33.3% - 20px);
    width: 100%;
    margin: 8px 0;
    border: #123370 2px solid;
    box-sizing: border-box;

    .industrial {
      height: calc(100% - 60px);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      padding: 10px;

      .industrialText {
        font-size: 13px;
        line-height: 1.5;
        color: white;
        text-align: left;

        div {
          width: 50px;
          height: 50px;
          background-color: #123370;
          background-size: 100% 100%;
          float: left;
          margin: 0 10px 0 0;
        }
      }
    }
  }

  .tableText {
    white-space: nowrap; //不换行
    overflow: hidden; //超出部分隐藏
    text-overflow: ellipsis; //文本溢出显示省略号
  }
}

::v-deep .el-table {
  font-size: 12px;
}
</style>