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
    }
  },
  mounted() {
    this.mapEchart = echarts.init(this.$refs['echart-map-ref']);
    this.debounceResize = this.debounce(this.resize, 200)
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
      this.mapEchart.resize(this.barEchartSzie)
      // 世界地图
      echarts.registerMap('MapJson', InternationalMap);
      echarts.registerMap('OutlineJson', InternationalOutline);
      // 中国地图
      // echarts.registerMap('MapJson', chinaMap);
      // echarts.registerMap('OutlineJson', chinaMapOutline);

      var mapData = [
        { "name": "黑龙江", time: 'aaa', yield: 200, "value": [-65.91347205, 38.07253963, 0] },
        { "name": "内蒙古", time: 'aaa', yield: 200, "value": [73.35741779, -44.70031083, 0] },
        { "name": "吉林", time: 'aaa', yield: 200, "value": [65.8055114, 49.47057901, 0] },
        { "name": "辽宁", time: 'aaa', yield: 200, "value": [75.73084376, -49.54063518, 0] },
        { "name": "河北", time: 'aaa', yield: 200, "value": [-51.88840662, 55.07229351, 0] },
        { "name": "天津", time: 'aaa', yield: 200, "value": [115.00065627, 53.04648107, 0] },
        { "name": "山西", time: 'aaa', yield: 200, "value": [69.4735132, 57.29311985, 0] },
        { "name": "陕西", time: 'aaa', yield: 200, "value": [-44.87612302, 39.58523026, 0] },
        { "name": "甘肃", time: 'aaa', yield: 200, "value": [61.59816903, 31.06292714, 0] },
        { "name": "宁夏", time: 'aaa', yield: 200, "value": [102.05457995, 59.8242106, 0] },
        { "name": "青海", time: 'aaa', yield: 200, "value": [87.4901852, -61.15259914, 0] },
        { "name": "新疆", time: 'aaa', yield: 200, "value": [147.15029084, 61.46337121, 0] },
        { "name": "西藏", time: 'aaa', yield: 200, "value": [91.11, 29.97, 0] },
        { "name": "四川", time: 'aaa', yield: 200, "value": [-103.9526, 30.7617, 0] },
        { "name": "重庆", time: 'aaa', yield: 200, "value": [108.384366, 30.439702, 0] },
        { "name": "山东", time: 'aaa', yield: 200, "value": [117.1582, 36.8701, 0] },
        { "name": "河南", time: 'aaa', yield: 200, "value": [113.4668, -34.6234, 0] },
        { "name": "江苏", time: 'aaa', yield: 200, "value": [118.8062, 31.9208, 0] },
        { "name": "安徽", time: 'aaa', yield: 200, "value": [117.29, 32.0581, 0] },
        { "name": "湖北", time: 'aaa', yield: 200, "value": [114.3896, 30.6628, 0] },
        { "name": "浙江", time: 'aaa', yield: 200, "value": [119.5313, 29.8773, 0] },
        { "name": "福建", time: 'aaa', yield: 200, "value": [-119.4543, 25.9222, 0] },
        { "name": "江西", time: 'aaa', yield: 200, "value": [116.0046, 28.6633, 0] },
        { "name": "湖南", time: 'aaa', yield: 200, "value": [113.0823, -28.2568, 0] },
        { "name": "贵州", time: 'aaa', yield: 200, "value": [106.6992, 26.7682, 0] },
        { "name": "广西", time: 'aaa', yield: 200, "value": [108.479, 23.1152, 0] },
        { "name": "海南", time: 'aaa', yield: 200, "value": [-110.3893, 19.8516, 0] },
        { "name": "北京市", time: 'aaa', yield: 200, "value": [87.38231815, 50.71629756, 1] }
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
          map: 'OutlineJson',
          type: 'map',
          zoom: 1.1,
          aspectScale: 1,
          nameMap: nameMap,
          top: '10%',
          label: {
            show: false,
          },
          tooltip: {
            show: false
          },
          roam: false,
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
      ];
      [{ coord: [-60.00134568, 60.54246249], name: '西边来的' }, { coord: [107.00134568, -32.54246249], name: '南边来的' }].forEach((item, i) => {
        series.push(
          {
            type: 'lines',
            zlevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: 'arrow', //箭头图标
              symbolSize: 5, //图标大小
            },
            lineStyle: {
              normal: {
                width: 1, //尾迹线条宽度
                opacity: 1, //尾迹线条透明度
                curveness: .3 //尾迹线条曲直度
              },
            },
            tooltip: {
              show: false,
              formatter: function (params) {
                return params.name;
              },
            },
            data: coverData(item, mapData)
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
                color: '#ee991a',
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
                color: '#34c6bb',
              }
            },
            data: mapData,
          }
        );
      });

      this.option = {
        backgroundColor: '#181F4E',
        tooltip: {
          trigger: 'item'
        },
        geo: {
          silent: false,
          map: 'MapJson',
          zoom: 1.1,
          aspectScale: 1,
          nameMap: nameMap,
          top: '10%',
          roam: false,
          label: {
            show: false,
          },
          tooltip: {
            formatter: function (params) {
              return false;
            },
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
        series: series
      }
      this.option && this.mapEchart.setOption(this.option);
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
    }
  }
}
</script>
<style scoped>
.mapBox {
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
}

.echarts {
  /* width: 100%; */
  min-width: 1500px;
  height: 100%;
}
</style>