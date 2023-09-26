<template>
  <div class="panelFatherBox">
    <el-container class="panelBox" :style="{ minHeight: `${panelBoxHeight}` }">
      <el-header v-show="panelHeaderShow">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
            <span v-if="item.redirect === 'noRedirect' || index == breadcrumbList.length - 1" class="titleContent">{{
              item.meta.title }}</span>
            <a v-else class="titleContent" @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>

      <el-container>
        <el-aside v-show="panelAsideShow" :width="panelAsideWidth">
          <div class="borderBox">
            <slot name="aside" :row="''"></slot>
          </div>
        </el-aside>
        <el-main>
          <slot name="main" :row="''"></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
    
<script>
export default {
  data() {
    return {
      breadcrumbList: []
    }
  },
  props: {
    panelHeaderShow: {
      type: Boolean,
      default: true,
    },
    panelAsideShow: {
      type: Boolean,
      default: true,
    },
    panelAsideWidth: {
      type: String,
      default: '320px',
    },
    panelBoxHeight: {
      type: String,
      default: 'calc(100vh - 122px)',
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
      const first = matched[0]

      if (!this.isDashboard(first)) {
        // matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
      }

      this.breadcrumbList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim() === 'Index'
    },
    handleLink(item) {
      const { redirect, path } = item
      if (redirect) {
        this.$router.push(redirect)
        return
      }
      this.$router.push(path)
    }
  },
}
</script>
    
<style lang="less" scoped>
.panelFatherBox {
  margin: 10px 20px;

  .panelBox {
    padding: 15px 0;
    background-image: url('../assets/内容背景.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .el-header {
    height: 70px !important;

    .el-breadcrumb {
      position: relative;
      padding: 0 0 0 60px;
      height: 60px;
      line-height: 60px;
      width: 500px;
      z-index: 1;
      background-image: url('../assets/title.png');
      background-repeat: repeat;
      background-size: 100% 100%;

      &::before {
        content: "";
        position: absolute;
        top: 22px;
        left: 15px;
        width: 30px;
        height: 15px;
        background-image: url('../assets/titleIcon.png');
        background-repeat: repeat;
        background-size: 100% 100%;
        z-index: -1;
      }

      .titleContent {
        // font-weight: bold;
        font-size: 20px;
        font-family: 'YouSheBiaoTiHei-Regular', 'YouSheBiaoTiHei';
        background: linear-gradient(180deg, #FFFFFF 0%, #B1CCFF 83%, #9CBFFF 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }
  }

  .el-main {
    padding: 10px;
  }

  .el-aside {
    color: #333;

    .borderBox {
      position: relative;
      height: calc(100% - 20px);
      padding: 20px 0px 0 50px;
      z-index: 1;
      overflow: hidden;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 20px;
        width: calc(100% - 20px);
        height: 100%;
        background-image: url('../assets/border.png');
        background-repeat: repeat;
        background-size: 100% 100%;
        z-index: -1;
      }
    }
  }
}

::v-deep .el-breadcrumb__inner a {
  color: #ffffff;
}
</style>
    