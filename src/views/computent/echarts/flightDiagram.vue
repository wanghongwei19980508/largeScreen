<template>
  <div class="mapBox">
    <div ref="echart-map-ref" class="echarts"></div>
  </div>
</template>

<script>

import * as echarts from 'echarts';
import { MapChart } from 'echarts/charts'
import loadBMap from '../../../utils/baiduapi'
import { InternationalMap } from '../../../utils/InternationalMap'
import { InternationalOutline } from '../../../utils/InternationalOutline'
import { nameMap } from '../../../utils/countryNameComparisonTable'
import { chinaMap, chinaMapOutline } from '../../../utils/chinaMap'
import 'echarts/extension/bmap/bmap';

export default {
  components: {},
  data() {
    return {
      mapEchart: null, // 地图
      option: [],
      barEchartSzie: { width: 'auto', height: 'auto' },
      debounceResize: null, // 重绘方法
      debounceRoam: null, // 缩放方法
      barEchartData: {},
    }
  },
  mounted() {
    this.mapEchart = echarts.init(this.$refs['echart-map-ref']);
    this.debounceResize = this.debounce(this.resize, 200)
    this.debounceRoam = this.debounce(this.roam, 200)

    loadBMap("密钥").then(() => {
      echarts.use(MapChart)
      this.map()
      window.addEventListener("resize", this.debounceResize)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.debounceResize)
  },
  methods: {
    map() {
      const colors = ['#ff0000', '#00ff00', '#0000ff', '#cccccc'];
      this.mapEchart.resize(this.barEchartSzie)
      // 世界地图
      echarts.registerMap('MapJson', InternationalMap);
      echarts.registerMap('OutlineJson', InternationalOutline);
      // 中国地图
      // echarts.registerMap('MapJson', chinaMap);
      // echarts.registerMap('OutlineJson', chinaMapOutline);
      var mapData = [
        { "name": "黑龙江", time: 'aaa', yield: 200, "value": [-65.91347205, 38.07253963, 0] },
        { "name": "内蒙古", time: 'aaa', yield: 200, "value": [8.35741779, -44.70031083, 0] },
        { "name": "吉林", time: 'aaa', yield: 200, "value": [65.8055114, 49.47057901, 0] },
        { "name": "辽宁", time: 'aaa', yield: 200, "value": [75.73084376, -49.54063518, 0] },
        { "name": "河北", time: 'aaa', yield: 200, "value": [-51.88840662, 55.07229351, 0] },
        { "name": "天津", time: 'aaa', yield: 200, "value": [115.00065627, 53.04648107, 0] },
        { "name": "山西", time: 'aaa', yield: 200, "value": [69.4735132, 51.29311985, 0] },
        { "name": "陕西", time: 'aaa', yield: 200, "value": [-44.87612302, 39.58523026, 0] },
        { "name": "甘肃", time: 'aaa', yield: 200, "value": [61.59816903, 31.06292714, 0] },
        { "name": "宁夏", time: 'aaa', yield: 200, "value": [102.05457995, 59.8242106, 0] },
        { "name": "青海", time: 'aaa', yield: 200, "value": [87.4901852, -61.15259914, 0] },
        { "name": "新疆", time: 'aaa', yield: 200, "value": [147.15029084, 31.46337121, 0] },
        { "name": "西藏", time: 'aaa', yield: 200, "value": [0.11, 29.97, 0] },
        { "name": "四川", time: 'aaa', yield: 200, "value": [-103.9526, 1.7617, 0] },
        { "name": "河南", time: 'aaa', yield: 200, "value": [113.4668, -34.6234, 0] },
        { "name": "江苏", time: 'aaa', yield: 200, "value": [98.8062, -31.9208, 0] },
        { "name": "安徽", time: 'aaa', yield: 200, "value": [-60.00134568, 60.54246249, 0] },
        { "name": "湖北", time: 'aaa', yield: 200, "value": [-161.3896, 81.6628, 0] },
        { "name": "浙江", time: 'aaa', yield: 200, "value": [29.5313, 29.8773, 0] },
        { "name": "福建", time: 'aaa', yield: 200, "value": [-119.4543, 25.9222, 0] },
        { "name": "湖南", time: 'aaa', yield: 200, "value": [73.0823, -18.2568, 0] },
        { "name": "贵州", time: 'aaa', yield: 200, "value": [-20.6992, 26.7682, 0] },
        { "name": "广西", time: 'aaa', yield: 200, "value": [30.479, 23.1152, 0] },
        { "name": "海南", time: 'aaa', yield: 200, "value": [-110.3893, 19.8516, 0] },
        { "name": "北京市", time: 'aaa', yield: 200, "value": [27.38231815, 50.71629756, 1] }
      ]
      const coverData = (startcoord, mapData) => {
        let res = mapData.map((item) => {
          return {
            coords: [startcoord.coord, [item.value[0], item.value[1]]], value: item.value[3], name: startcoord.name
          }
          // [
          //   startcoord,
          //   { coord: [item.value[0], item.value[1]], value: item.value[3] }
          // ]
        })
        return res
      }

      var series = [
        {
          silent: false,
          map: 'OutlineJson',
          type: 'map',
          zoom: 1.1,
          aspectScale: 1,
          nameMap: nameMap,
          top: '10%',
          left: '100',
          z: 1,
          label: {
            show: false,
          },
          tooltip: {
            show: false
          },
          itemStyle: {
            areaColor: 'rgba(0,255,255,.02)',
            borderColor: '#00ffff80',
            borderWidth: 1.5,
            shadowColor: '#00ffff80',
            shadowOffsetX: 0,
            shadowOffsetY: 4,
            shadowBlur: 10,
          },
          emphasis: {
            focus: 'self',
            label: {
              textStyle: {
                color: '#fff',
              },
            },
            itemStyle: {
              areaColor: 'rgba(0,255,255,0.3)',
              borderColor: 'rgba(0,255,255,0.7)',
              borderWidth: 1,
            }
          },
          select: {
            itemStyle: {
              areaColor: 'rgba(0,255,255,0.7)',
              borderColor: '#F19642',
              borderWidth: 1,
            }
          },
        },
        {
          type: 'bar',
          z: 99,
          data: mapData.map(item => { return item.yield }),
          label: {
            show: true,
            position: 'right',
            textStyle: {
              fontSize: 14,
              color: '#fff'
            }
          },
          itemStyle: {
            normal: {
              barBorderRadius: [0, 10, 10, 0],
              color: function (params) {
                if (params.dataIndex < 3) {
                  return colors[params.dataIndex];
                } else {
                  return '#00ffff80';
                }
              },
            }
          },
        },
        {
          type: 'lines',
          zlevel: 2,
          effect: {
            show: true,
            period: 6, //箭头指向速度，值越小速度越快
            trailLength: 0.2, //特效尾迹长度[0,1]值越大，尾迹越长重
            symbol: 'arrow', //箭头图标
            symbolSize: 6, //图标大小
          },
          lineStyle: {
            width: 1, //尾迹线条宽度
            opacity: 0.2, //尾迹线条透明度
            curveness: .3, //尾迹线条曲直度
            color: 'rgba(0,255,255,0.5)',
          },
          tooltip: {
            show: false,
            // formatter: function (params) {
            //   return params.name;
            // },
          },
          data: coverData({ coord: [105.86913635,34.91315196], name: '西边来的' }, mapData)
        },
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: { //涟漪特效
            period: 4, //动画时间，值越小速度越快
            brushType: 'stroke', //波纹绘制方式 stroke, fill
            scale: 4 //波纹圆环最大限制，值越大波纹越大
          },
          tooltip: {
            formatter: function (params) {
              return `<div>
                  <p><span>时间：</span>${params.data.time}</p>
                  <p><span>产量：</span>${params.data.yield}</p>
                </div>`;
            },
          },
          label: {
            normal: {
              show: true, // 显示文本 false 移动展示
              position: 'top', //显示位置
              offset: [5, 0], //偏移设置
              formatter: function (params) {//圆环显示文字
                return params.name;
              },
              fontSize: 13,
              color: '#fff',
            },
            emphasis: {
              show: true,
            }
          },
          symbol: 'circle',
          symbolSize: function (val) {
            return 5 + val[2] * 5; //圆环大小
          },
          itemStyle: {
            normal: {
              show: false,
              color: '#F19642',
            }
          },
          data: mapData,
        }
      ];

      this.option = {
        backgroundColor: '#181F4E',
        tooltip: {
          trigger: 'item'
        },
        grid: {
          top: '20',
          right: '50',
          width: '200',
          height: '300',
        },
        geo: {
          silent: false,
          map: 'MapJson',
          zoom: 1.1,
          aspectScale: 1,
          nameMap: nameMap,
          top: '10%',
          left: '100',
          roam: true,
          z: 9,
          scaleLimit: {
            min: 1, // 设置最小比例尺级别为1
            max: 10 // 设置最大比例尺级别为10
          },
          label: {
            show: false,
          },
          tooltip: {
            show:false
          },
          itemStyle: {
            areaColor: 'transparent',
            borderColor: 'rgba(0,255,255,.1)',
            borderWidth: 1,
          },
          emphasis: {
            focus: 'self',
            label: {
              textStyle: {
                color: '#fff',
              },
            },
            itemStyle: {
              areaColor: 'rgba(0,255,255,0.3)',
              borderColor: 'rgba(0,255,255,0.7)',
              borderWidth: 1,
            }
          },
          regions: [
            {
              name: '中国',
              itemStyle: {
                normal: {
                  areaColor: '#231C15',
                  borderColor: '#F19642',
                  borderWidth: 2,
                  shadowColor: '#F19642',
                  shadowOffsetX: 0,
                  shadowOffsetY: 4,
                  shadowBlur: 10,
                }
              }
            },
            {
              name: '美国',
              itemStyle: {
                normal: {
                  areaColor: '#1950A8',
                  borderColor: '#F19642',
                  borderWidth: 1.5,
                  shadowColor: '#F19642',
                  shadowOffsetX: 0,
                  shadowOffsetY: 4,
                  shadowBlur: 10,
                }
              }
            },
            {
              name: '印度',
              itemStyle: {
                normal: {
                  areaColor: '#1950A8',
                  borderColor: '#F19642',
                  borderWidth: 1.5,
                  shadowColor: '#F19642',
                  shadowOffsetX: 0,
                  shadowOffsetY: 4,
                  shadowBlur: 10,
                }
              }
            },
          ]
        },
        xAxis: [
          {
            type: 'value',
            name: '',
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false,
              margin: 1,
              textStyle: {
                color: '#aaa'
              }
            },
          }
        ],
        yAxis: [
          {
            name: '',
            type: 'category',
            data: mapData.map(item => { return item.name }),
            inverse: true,
            axisLine: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#ddd'
              }
            },
          },
        ],
        dataZoom: [
          {
            show: mapData.length > 10 ? true : false,
            startValue: 0,
            endValue: 9,
            orient: 'vertical',
            zoomLock: true
          },
        ],
        series: series
      }
      this.option && this.mapEchart.setOption(this.option);
      if (this.option) {
        this.mapEchart.on('georoam', (params) => {
          var option = JSON.parse(JSON.stringify(this.mapEchart.getOption()));
          if (option.series && params.zoom != null) {
            option.series = null
            this.mapEchart.clear()
            this.mapEchart.setOption(option)
            this.debounceRoam()
          } else {
            this.roam()
          }
        })
      }
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
      this.mapEchart.resize(this.barEchartSzie)
      this.mapEchart.clear()
      this.option && this.mapEchart.setOption(this.option);
    },
    roam() {
      var option = this.option;
      var options = JSON.parse(JSON.stringify(this.mapEchart.getOption()));
      option.series[0].zoom = option.geo.zoom = options.geo[0].zoom
      option.series[0].center = option.geo.center = options.geo[0].center;
      this.mapEchart.setOption(option); //设置option
    }
  }
}
</script>
<style scoped>
.mapBox {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

.echarts {
  /* width: 100%; */
  min-width: 1700px;
  height: 100%;
}

.barChart {
  position: absolute;
  right: 0;
  top: 0;
  width: 300px;
  height: 300px;
}
</style>