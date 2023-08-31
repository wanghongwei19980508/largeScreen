<template>
  <div>
    <panel :panelHeaderShow="false" :panelAsideWidth="'20vw'">
      <template #main>
        <el-steps class="stepsBox" :space="100" :active="1" finish-status="success" process-status="finish" align-center="true">
          <el-step title="基本信息填报"></el-step>
          <el-step title="受打压申请"></el-step>
          <el-step title="等待审核"></el-step>
        </el-steps>
        <vFrom labelWidth="140px" ref="searchSubmitForm" size="default" :searchData="searchData" :searchForm="searchForm"
          @fromSubmit="onSubmit" :cancelBtn="false">
        </vFrom>
      </template>
    </panel>
  </div>
</template>
    
<script>
import vFrom from '../../components/vFrom.vue'
import panel from '../../components/panel.vue'
import { searchForm } from "./config.js"

export default {
  components: { vFrom, panel },
  data() {
    return {
      searchData: {},
      searchForm: searchForm
    }
  },
  created() {
  },
  methods: {
    onSubmit() {

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
    