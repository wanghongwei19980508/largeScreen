<template>
  <div>
    <panel :panelHeaderShow="false" :panelAsideWidth="'20vw'">
      <template #main>
        <el-steps class="stepsBox" :space="160" :active="stepActive" finish-status="success" process-status="finish"
          :align-center="true">
          <el-step title="基本信息填报"></el-step>
          <el-step title="受打压申请"></el-step>
          <el-step title="等待审核" @click="stepActive = 2"></el-step>
        </el-steps>
        <vFrom v-if="stepActive == 0" labelWidth="140px" ref="searchSubmitForm" size="default"
          :searchData="basicInformationData" :searchForm="basicInformationForm" :cancelBtn="false" :successBtn="false">
          <template #button>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </template>
        </vFrom>
        <vFrom v-if="stepActive == 1" labelWidth="140px" ref="searchSubmitForm" size="default" :searchData="beCrushedData"
          :searchForm="beCrushedForm" :cancelBtn="false" :successBtn="false">
          <template #button>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button type="primary" @click="submit">提交</el-button>
          </template>
        </vFrom>
        <div v-if="stepActive == 2">
          <vDescriptions class="searchInput" ref="searchSubmitForm" size="default" :searchData="basicInformationData"
            :searchForm="basicInformationForm" :title="'基本信息'">
          </vDescriptions>
          <vDescriptions class="searchInput" ref="searchSubmitForm" size="default" :searchData="beCrushedData"
            :searchForm="beCrushedForm" :title="'受打压申请'" :column="1">
          </vDescriptions>
          <el-button type="primary" @click="$router.push('/index')">返回主页</el-button>
          <el-button type="primary" @click="submit">重新填写</el-button>
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
      beCrushedData: {}, // 受打压申请数据
      basicInformationForm: basicInformationForm, // 基本信息填报表单
      beCrushedForm: beCrushedForm, // 受打压申请表单
    }
  },
  created() {
  },
  methods: {
    // 保存
    save() {

    },
    // 提交
    submit() {
      if (this.stepActive++ > 1) this.stepActive = 0;
    },
  },
}
</script>
    
<style lang="less" scoped>
.stepsBox {
  justify-content: center;
  margin: 30px 0;
}
</style>
    