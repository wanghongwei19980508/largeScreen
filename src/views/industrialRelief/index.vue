<template>
  <div>
    <panel :panelHeaderShow="true">
      <template #aside>
        <div class="buttonBox">
          <el-button type="primary" :disabled="stepActive < 0" @click="stepActive = 0">基本信息填报</el-button>
          <el-button type="primary" :disabled="stepActive < 1" @click="stepActive = 1">受打压申请</el-button>
          <el-button type="primary" :disabled="stepActive < 2" @click="stepActive = 2">产业生态扶持</el-button>
        </div>
      </template>
      <template #main>
        <el-steps class="stepsBox" :space="160" :active="stepActive" finish-status="success" process-status="finish"
          :align-center="true">
          <el-step title="基本信息填报"></el-step>
          <el-step title="受打压申请"></el-step>
          <el-step title="等待审核" @click="stepActive = 2"></el-step>
        </el-steps>
        <vFrom v-if="stepActive == 0" labelWidth="140px" ref="basicInformationRef" size="default"
          :searchData="basicInformationData" :searchForm="basicInformationForm" :cancelBtn="false" :successBtn="false"
          @fromSubmit="onSubmit">
          <template #button>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </template>
        </vFrom>
        <div v-if="stepActive == 1">
          <template v-for="(item, index) in beCrushedData">
            <vFrom :key="'vF' + index" labelWidth="140px" :ref="'beCrushedRef' + index" size="default" :searchData="item"
              :searchForm="beCrushedForm" :cancelBtn="false" :successBtn="false" @fromSubmit="onSubmit">
              <template #button v-if="index == (beCrushedData.length - 1)">
                <el-button type="primary" @click="addBeCrushedData">新增打压申请</el-button>
                <el-button type="primary" @click="save">保存</el-button>
                <el-button type="primary" @click="submit">提交</el-button>
              </template>
              <template #button v-else>
                <el-button type="primary" @click="delectBeCrushedData(index)">删除</el-button>
                <el-divider class="divider"></el-divider>
              </template>
            </vFrom>
          </template>
        </div>
        <div v-if="stepActive == 2">
          <vDescriptions class="searchInput" ref="searchSubmitForm" size="default" :searchData="basicInformationData"
            :searchForm="basicInformationForm" :title="'基本信息'">
          </vDescriptions>
          <vDescriptions v-for="(item, index) in beCrushedData" :key="'vD' + index" class="searchInput"
            ref="searchSubmitForm" size="default" :searchData="item" :searchForm="beCrushedForm" :title="'受打压申请'"
            :column="1">
          </vDescriptions>
          <el-button type="primary" @click="$router.push('/index')">返回主页</el-button>
          <el-button type="primary" @click="toggleStepBar">重新填写</el-button>
        </div>
      </template>
    </panel>
  </div>
</template>
    
<script>
import vFrom from '../../components/vFrom.vue'
import panel from '../../components/panel.vue'
import vDescriptions from '../../components/vDescriptions.vue'
import { basicInformationForm, beCrushedForm } from "./config.js"

export default {
  components: { vFrom, panel, vDescriptions },
  data() {
    return {
      stepActive: 0,
      basicInformationData: {}, // 基本信息填报数据
      beCrushedData: [{}], // 受打压申请数据
      basicInformationForm: [], // 基本信息填报表单
      beCrushedForm: [], // 受打压申请表单
      throttleStep: null, // 节流
    }
  },
  async created() {
    this.basicInformationForm = await basicInformationForm().then(res => { return res })
    this.beCrushedForm = await beCrushedForm().then(res => { return res })
    this.throttleStep = this.throttle(this.toggleStepBar, 200)
  },
  methods: {
    // 保存
    save() {

    },
    // 提交
    submit() {
      let ref = { 0: 'basicInformationRef', 1: 'beCrushedRef' }
      if (this.stepActive == 0) {
        this.$refs['basicInformationRef'].onSubmit('searchFormRef')
      } else {
        this.beCrushedData.forEach((item, index) => {
          this.$refs['beCrushedRef' + index][0].onSubmit('searchFormRef')
        })
      }
    },
    // 验证结束
    onSubmit(item) {
      console.log(this.beCrushedData);
      this.throttleStep()
    },
    // 切换步骤栏
    toggleStepBar() {
      // let ref = { 0: 'basicInformationRef', 1: 'beCrushedRef' }
      // this.$refs[ref[this.stepActive]].onCancel('searchFormRef')
      if (this.stepActive++ > 1) this.stepActive = 0;
    },
    // 新增打压申请
    addBeCrushedData() {
      this.beCrushedData.length < 3 && this.beCrushedData.push({})
    },
    // 删除打压申请
    delectBeCrushedData(index) {
      this.beCrushedData.splice(index, 1)
    },
    // 节流
    throttle(fn, delay) {
      let timer = null;
      return function () {
        if (!timer) {
          timer = setTimeout(() => {
            fn.apply(this, arguments);
            timer = null;
          }, delay);
        }
      };
    },
  },
}
</script>
    
<style lang="less" scoped>
.stepsBox {
  justify-content: center;
  margin: 30px 0;
}

::v-deep .el-input-number .el-input__inner {
  text-align: left;
}

.buttonBox {
  display: flex;
  flex-direction: column;
  width: calc(100% - 30px);

  ::v-deep .el-button+.el-button {
    margin-left: 0px;
    margin-top: 10px;
  }
}

.divider {
  width: 70vw
}
</style>
    