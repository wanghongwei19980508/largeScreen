<template>
  <div class='bar-echart-Box' ref="bar-echart-ref"></div>
</template>
<script>
const echarts = require("echarts");

export default {
  props: {
    showTitle: { // 是否展示title
      type: Boolean,
      default: true,
    },
    title: { // title内容
      type: String,
      default: '',
    },
    barEchartData: { // 图表数据
      type: Object,
      default: {},
    },
    legend: { // 是否展示图例
      type: Boolean,
      default: true,
    },
    interchange: { // 是否xy轴互换
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      barEchart: null,
      option: [],
      barEchartSzie: { width: 'auto', height: 'auto' },
      debounceResize: null, // 重绘方法
    };
  },
  mounted() {
    this.barEchart = echarts.init(this.$refs['bar-echart-ref']);
    this.debounceResize = this.debounce(this.resize, 200)
    window.addEventListener("resize", this.debounceResize)
    this.initializeData()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.debounceResize)
  },
  methods: {
    // 数据渲染
    initializeData() {
      this.barEchart.resize(this.barEchartSzie)
      this.barEchart.clear()
      let option = {
        title: {
          show: this.showTitle,
          text: this.title,
          left: "center",
          top: "10",
          textStyle: {
            fontSize: 15,
            color: '#fff'
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '30px',
          right: '0%',
          bottom: this.barEchartData.xAxis && this.barEchartData.xAxis.length > 10 ?
            '70px' : '20px'
        },
        xAxis: [
          {
            name: this.interchange ? this.barEchartData.name : '',
            nameTextStyle: {
              color: '#868D9C',
              fontSize: 12,
            },
            type: this.interchange ? 'value' : 'category',
            data: this.interchange ? [] : this.barEchartData.xAxis,
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              textStyle: {
                color: '#B8BECC'
              }
            },
            splitLine: {
              lineStyle: {
                type: this.barEchartData.splitLineType ? this.barEchartData.splitLineType : 'solid',
                color: '#E6F7FF20'
              }
            }
          }
        ],
        yAxis: [
          {
            name: this.interchange ? '' : this.barEchartData.name,
            nameTextStyle: {
              color: '#868D9C',
              fontSize: 12,
            },
            type: this.interchange ? 'category' : 'value',
            data: this.interchange ? this.barEchartData.xAxis : [],
            axisLabel: {
              textStyle: {
                color: '#B8BECC'
              }
            },
            splitLine: {
              lineStyle: {
                type: this.barEchartData.splitLineType ? this.barEchartData.splitLineType : 'solid',
                color: '#E6F7FF20'
              }
            }
          },
        ],
      }
      option.series = this.barEchartData.series && this.barEchartData.series.map((item) => {
        return {
          name: item.name ? item.name : '', // label名称
          type: item.type ? item.type : 'bar', // 类型
          barWidth: item.barWidth ? item.barWidth : (100 / this.barEchartData.series.length * 0.8) + '%', // bar 宽度
          data: item.data, // 数据
          color: item.color ? item.color : '', // 颜色
          areaStyle: item.areaStyle ? item.areaStyle : null, // 是否堆叠
          stack: item.areaStyle ? 'Total' : '', // 堆叠属性
          label: {
            show: item.labelShow, // 是否显示数据
            position: 'top'
          },
        }
      })
      if (this.barEchartData.xAxis && this.barEchartData.xAxis.length > 10) {
        option.dataZoom = [
          {
            show: true,
            startValue: 0,
            endValue: 9,
            orient: this.interchange ? 'vertical' : 'horizontal',
          },
        ]
      }
      // 是否显示legend
      if (this.barEchartData.series && this.barEchartData.series.length > 1 && this.legend) {
        let legendData = []
        this.barEchartData.series.forEach((item) => {
          legendData.push(item.name)
        })
        option.legend = {
          data: legendData,
          textStyle: {
            color: '#fff'
          }
        }
      }
      this.option = option
      this.barEchart.setOption(option);
    },
    // 防抖
    debounce(fn, delay) {
      let timer;
      return function () {
        let context = this;
        let args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
          fn.apply(context, args);
        }, delay);
      }
    },
    // 页面重绘
    resize() {
      this.barEchart.resize(this.barEchartSzie)
      this.barEchart.clear()
      this.option && this.barEchart.setOption(this.option);
    }
  },
  watch: {
    barEchartData: {
      handler(newName, oldName) {
        this.initializeData()
      }, deep: true
    }
  }
}
</script>
<style scoped>
.bar-echart-Box {
  width: 100%;
  height: 100%;
}
</style>