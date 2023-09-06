<template>
  <div>
    <el-dialog :visible="pdfDialogVisible" :fullscreen="pdfFullscreen" :close-on-click-modal="false" @close="closeDialog">
      <div slot="title">
        <h2>{{ title }}</h2>
        <el-button style="position: absolute;right: 50px;top: 18px;" size="mini" icon="el-icon-full-screen"
          @click="pdfFullscreen = !pdfFullscreen"></el-button>
      </div>
      <div v-loading="loading">
        <!-- @click="handleMousedown" -->
        <pdf :src="pdfobj.pathUrl" key="pdf" :page="pdfobj.page"></pdf>
      </div>
      <div slot="footer" class="block">
        <el-pagination @current-change="handleCurrentChange" :current-page="pdfobj.page" :page-size='1'
          layout="total, prev, pager, next, jumper" :total="pdfobj.numPages">
        </el-pagination>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  components: {
    pdf
  },
  props: {
    title: { // title内容
      type: String,
      default: '',
    },
    pdfDialogVisible: { // pdf dialog
      type: Boolean,
      default: false,
    },
    pdfUrl: { // pdf 字段
      type: String,
      default: '',
    },
  },
  data() {
    return {
      loading: false, // 
      pdfFullscreen: false, // pdf 全屏
      pdfobj: {
        pathUrl: '', // pdf路径
        numPages: undefined, // pdf页数
        page: 1,
      }
    };
  },
  mounted() {
  },
  methods: {
    // 打开PPT
    goOppenPPT() {
      this.loading = true
      this.pdfobj.pathUrl = pdf.createLoadingTask(this.pdfUrl)
      this.pdfobj.pathUrl.promise.then(pdf => {
        this.pdfobj.numPages = pdf.numPages;
        this.loading = false
      });
      // window.open('http://view.xdocin.com/view?src=' + encodeURIComponent(url) + '&printable=false&watermark=书客编程')
    },
    // PPT换页
    handleCurrentChange(item) {
      this.pdfobj.page = item
    },
    // 鼠标点击事件
    handleMousedown(e) {
      this.pdfobj.page = this.pdfobj.page + 1 > this.pdfobj.numPages ? this.pdfobj.numPages : this.pdfobj.page + 1
    },
    closeDialog() {
      this.$emit('closeDialog')
    }
  },
  destroyed() {
    document.onkeydown = null // 取消键盘监听事件
  },
  watch: {
    // 监听PDF事件
    pdfDialogVisible(newvalue, oldvalue) {
      if (newvalue) {
        this.goOppenPPT()
        document.onkeydown = (e) => {
          //事件对象兼容
          let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
          //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
          if ((e1 && e1.keyCode == 37) || (e1 && e1.keyCode == 38)) {
            this.pdfobj.page = this.pdfobj.page - 1 < 1 ? 1 : this.pdfobj.page - 1
          } else if ((e1 && e1.keyCode == 39) || (e1 && e1.keyCode == 40)) {
            this.pdfobj.page = this.pdfobj.page + 1 > this.pdfobj.numPages ? this.pdfobj.numPages : this.pdfobj.page + 1
          }
        }
      } else {
        document.onkeydown = null
      }
    }
  }
};
</script>
  
<style lang="less" scoped>
.rotate {
  transform: rotate(90deg);
}

// ::v-deep .el-dialog__body {
//   height: 65vh;
// }
</style>