<template>
  <div>
    <el-container class="panelBox" :style="{ height: `${panelBoxHeight}` }">
      <el-header v-show="panelHeaderShow">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
            <span v-if="item.redirect === 'noRedirect' || index == breadcrumbList.length - 1" class="no-redirect">{{
              item.meta.title }}</span>
            <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>

      <el-container>
        <el-aside v-show="panelAsideShow" width="300px">
          <slot name="aside" :row="''"></slot>
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
    panelBoxHeight: {
      type: String,
      default: 'calc(100vh - 120px)',
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
        matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
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
.panelBox {
  width: 100%;
  background: linear-gradient(to bottom, #0D1F38, #0D1D35, #0D1E36);
}

.el-header {
  .el-breadcrumb {
    background: linear-gradient(45deg, #1b4ea770, #454e5a82);
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    font-size: 18px;
    text-shadow: 4px -3px 2px #8692A5;

    .no-redirect {
      color: white;
    }
  }
}

.el-container {
  height: calc(100% - 60px);
}

.el-aside {
  color: #333;
}
</style>
    