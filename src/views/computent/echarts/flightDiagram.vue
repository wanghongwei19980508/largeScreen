<template>
  <div class="mapBox" v-loading="Loading" element-loading-text="地图绘制中，请耐心等待..."
    element-loading-background="rgba(0, 0, 0, 0.4)">
    <el-form class="selectBox" label-width="80px">
      <el-form-item label="选择企业">
        <el-select v-model="firmId" placeholder="请选择" @change="changeFirmId">
          <el-option v-for="item in selectOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div class="echarts-title-icon">·</div>
    <div ref="echart-map-ref" class="echarts"></div>
  </div>
</template>

<script>

import * as echarts from 'echarts';
import { MapChart } from 'echarts/charts'
import { InternationalMap } from '../../../utils/InternationalMap'
import { InternationalOutline } from '../../../utils/InternationalOutline'
import { nameMap } from '../../../utils/countryNameComparisonTable'
import { chinaMap, chinaMapOutline } from '../../../utils/chinaMap'
import 'echarts/extension/bmap/bmap';

export default {
  components: {},
  data() {
    return {
      mapEchart: null, // 地图demo
      option: [],  // 地图绘制文件
      barEchartSzie: { width: 'auto', height: 'auto' }, // 地图大小
      debounceResize: null, // 重绘方法
      debounceRoam: null, // 缩放方法
      selectOptions: [],
      firmId: null, // 选择的企业
      Loading: false, // loading动画
    }
  },
  mounted() {
    this.mapEchart = echarts.init(this.$refs['echart-map-ref']);
    this.debounceResize = this.debounce(this.resize, 200)
    this.debounceRoam = this.debounce(this.roam, 200)
    echarts.use(MapChart)
    window.addEventListener("resize", this.debounceResize)
    // 世界地图
    echarts.registerMap('MapJson', InternationalMap);
    echarts.registerMap('OutlineJson', InternationalOutline);
    // 中国地图
    // echarts.registerMap('MapJson', chinaMap);
    // echarts.registerMap('OutlineJson', chinaMapOutline);
    this.Loading = true
    this.getEnterpriseData()
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.debounceResize)
  },
  methods: {
    // 获取下拉框数据
    getEnterpriseData() {
      setTimeout(() => {
        this.selectOptions = [
          { value: '0', label: '选项1' },
          { value: '1', label: '选项2' },
        ]
        this.$set(this, 'firmId', this.selectOptions[0].value)
        this.changeFirmId()
      }, 0)
    },
    // 切换下拉框
    changeFirmId() {
      this.Loading = true
      this.mapEchart.clear()
      this.mapEchart.resize(this.barEchartSzie)
      setTimeout(() => {
        let data = [
          {
            timeData: ['2019', '2021', '2023'],
            mapData: [
              [
                { "name": "摩洛哥", time: '2021-01-03', yield: 5462, "value": [-7.09262, 31.79170, 3] },
                { "name": "阿根廷", time: '2021-07-09', yield: 68967, "value": [-67.51659, -39.68883, 0] },
                { "name": "布隆迪", time: '2021-04-08', yield: 67534, "value": [29.91583, -3.31611, 0] },
                { "name": "保加利亚", time: '2023-12-25', yield: 5678, "value": [25.48583, 42.73388, 0] },
              ], [
                { "name": "巴西", time: '2022-04-23', yield: 234523, "value": [-53.93557, -8.82311, 3] },
                { "name": "瑞士", time: '2022-06-30', yield: 56212, "value": [7.92125, 46.99867, 0] },
                { "name": "古巴", time: '2022-02-28', yield: 674322, "value": [-77.78117, 21.52176, 1] },
              ], [
                { "name": "埃及", time: '2023-12-25', yield: 675434, "value": [29.87463, 26.58671, 0] },
                { "name": "日本", time: '2023-12-25', yield: 673434, "value": [140.15836, 38.07746, 1] },
                { "name": "关岛", time: '2023-12-25', yield: 67743, "value": [144.79373, 13.44430, 1] },
              ]
            ]
          },
          {
            timeData: ['2021', '2022', '2023'],
            mapData: [
              [
                { "name": "美国", time: '2021-01-03', yield: 82004, "value": [-101.36929, 39.78972, 3] },
                { "name": "葡萄牙", time: '2021-07-09', yield: 32500, "value": [-8.61881, 39.63034, 0] },
                { "name": "菲律宾", time: '2021-04-08', yield: 34200, "value": [122.00750, 12.59588, 0] },
                { "name": "文莱", time: '2023-12-25', yield: 2200, "value": [114.72767, 4.53528, 0] },
                { "name": "喀麦隆", time: '2023-12-25', yield: 2070, "value": [11.75606, 3.84056, 0] },
                { "name": "新西兰", time: '2021-05-08', yield: 72004, "value": [170.05699, -44.20668, 2] },
                { "name": "纳米比亚", time: '2021-06-06', yield: 45200, "value": [15.74513, -22.59550, 1] },
              ], [
                { "name": "缅甸", time: '2022-04-23', yield: 76200, "value": [95.57907, 21.56923, 3] },
                { "name": "墨西哥", time: '2022-06-30', yield: 9200, "value": [-104.17650, 26.10325, 0] },
                { "name": "斯里兰卡", time: '2022-02-28', yield: 23200, "value": [80.62697, 8.47649, 1] },
                { "name": "肯尼亚", time: '2022-06-06', yield: 23400, "value": [37.90619, -0.02356, 1] },
                { "name": "冰岛", time: '2022-09-16', yield: 2080, "value": [-18.24764, 65.06115, 0] },
                { "name": "孟加拉国", time: '2023-12-25', yield: 21230, "value": [90.23915, 24.19725, 1] },
                { "name": "哥伦比亚", time: '2023-12-25', yield: 2800, "value": [-73.08441, 3.49247, 0] },
                { "name": "印度尼西亚", time: '2022-12-25', yield: 67200, "value": [119.86984, -4.32047, 2] },
              ], [
                { "name": "圭亚那", time: '2023-12-25', yield: 200, "value": [-58.54359, 2.54955, 0] },
                { "name": "几内亚比绍", time: '2023-12-25', yield: 22060, "value": [-14.93288, 12.04795, 1] },
                { "name": "埃塞俄比亚", time: '2023-12-25', yield: 20650, "value": [39.58070, 8.61105, 1] },
                { "name": "阿尔及利亚", time: '2023-12-25', yield: 2020, "value": [2.55060, 28.16212, 0] },
                { "name": "北塞浦路斯", time: '2023-12-25', yield: 23400, "value": [33.82938, 35.35131, 1] },
                { "name": "加拿大", time: '2023-12-25', yield: 202340, "value": [-106.34677, 56.13037, 3] },
                { "name": "博茨瓦纳", time: '2023-12-25', yield: 20460, "value": [21.97458, -23.96469, 1] },
                { "name": "百慕大", time: '2023-12-25', yield: 2050, "value": [-64.75050, 32.30780, 0] },
                { "name": "阿塞拜疆", time: '2023-12-25', yield: 53, "value": [47.67639, 40.67088, 1] }
              ]
            ]
          }
        ]
        this.map(data[this.firmId].timeData, data[this.firmId].mapData)
      }, 0)
    },
    // 地图绘制
    map(timeData, mapData) {
      const colors = [
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: '#1f5fd300' }, { offset: 1, color: '#1f5fd3ff' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: '#2687cb00' }, { offset: 1, color: '#2687cbff' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: '#1fc2d300' }, { offset: 1, color: '#1fc2d3ff' }]),
        new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: '#94C9FF' }, { offset: 0.8, color: '#275BC1' }]),
        new echarts.graphic.LinearGradient(1, 1, 1, 1, [{ offset: 0, color: '#fff' }, { offset: 1, color: '#7AEEF7' }]),
        new echarts.graphic.LinearGradient(1, 0, 1, 1, [{ offset: 0, color: '#fff' }, { offset: 0.4, color: '#FFA755' }])
      ];
      const coverData = (startcoord, mapData) => {
        let res = mapData.map((item, index) => {
          return {
            coords: [startcoord.coord, [item.value[0], item.value[1]]], value: item.value[2], name: startcoord.namem, lineStyle: { width: item.value[2] * 2 + 1, }, effect: { symbolSize: item.value[2] * 2 + 5 }
          }
          // [
          //   startcoord,
          //   { coord: [item.value[0], item.value[1]], value: item.value[3] }
          // ]
        })
        return res
      }

      this.option = {
        backgroundColor: '#181F4E',
        tooltip: {
          trigger: 'item'
        },
        baseOption: {
          timeline: {
            autoPlay: false,
            currentIndex: timeData.length - 1,
            data: timeData,
          },
          geo: [{
            silent: false,
            map: 'OutlineJson',
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
              show: false
            },
            itemStyle: {
              areaColor: '#00276640',
              borderColor: '#275BC101',
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
                    borderColor: '#FF9E45',
                    borderWidth: 2,
                    shadowColor: '#FF9E45',
                    shadowOffsetX: 0,
                    shadowOffsetY: 4,
                    shadowBlur: 10,
                  }
                }
              },
              ...(mapData[timeData.length - 1].map(item => {
                return {
                  name: item.name,
                  itemStyle: {
                    normal: {
                      areaColor: '#1950A8',
                      borderColor: '#FF9E45',
                      borderWidth: 1.5,
                      shadowColor: '#FF9E45',
                      shadowOffsetX: 0,
                      shadowOffsetY: 4,
                      shadowBlur: 10,
                    }
                  }
                }
              }))
            ]
          }, {
            silent: false,
            map: 'OutlineJson',
            zoom: 1.1,
            aspectScale: 1,
            nameMap: nameMap,
            top: '10%',
            left: '100',
            roam: false,
            z: 6,
            label: {
              show: false,
            },
            tooltip: {
              show: false
            },
            itemStyle: {
              areaColor: '#00276602',
              borderColor: '#275BC180',
              borderWidth: 1.5,
              // shadowColor: '#00ffff80',
              // shadowOffsetX: 0,
              // shadowOffsetY: 4,
              // shadowBlur: 10,
            },
            //   emphasis: {
            //     focus: 'self',
            //     label: {
            //       textStyle: {
            //         color: '#fff',
            //       },
            //     },
            //     itemStyle: {
            //       areaColor: 'rgba(0,255,255,0.3)',
            //       borderColor: 'rgba(0,255,255,0.7)',
            //       borderWidth: 1,
            //     }
            //   },
          }]
        },
        options: []
      }
      let png = require('../../../assets/echarts-title.png')
      this.option.baseOption.timeline.data.forEach((item, index) => {
        this.option.options.push(
          {
            tooltip: {
              trigger: 'item'
            },
            title: {
              text: "{a|产能排行榜（吨）}",
              // subtext: "{b|□}",
              top: 10,
              right: 0,
              width: 200,
              height: 30,
              itemGap: -40,
              textStyle: {
                rich: {
                  'a': {
                    backgroundColor: {
                      image: png
                    },
                    width: 250,
                    height: 30,
                    lineHeight: 30,
                    fontSize: 20,
                    fontWeight: 400,
                    fontFamily: 'HarmonyOS Sans SC-Medium',
                    color: '#E1EAFA',
                    padding: [5, 15],
                    align: 'center'
                  },
                },
              },
              subtextStyle: {
                rich: {
                  'b': {
                    width: 30,
                    height: 30,
                    lineHeight: 30,
                    // backgroundColor: {
                    //   image: png
                    // },
                    fontSize: 20,
                    color: '#7AEEF7',
                    textBorderColor: colors[3],
                    textBorderWidth: 20,
                    textBorderType: 'solid',
                    align: 'right',
                    padding: [0, 0, 0, 20]
                  },
                },
              }
            },
            grid: {
              top: '50',
              right: '50',
              width: '200',
              height: '250',
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
                    color: '#E1EAFA'
                  }
                },
              }
            ],
            yAxis: [
              {
                name: '',
                type: 'category',
                data: mapData[index].map(item => { return item.name }),
                inverse: true,
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#E1EAFA'
                  }
                },
                axisTick: {
                  show: false,
                },
                axisLabel: {
                  interval: 0,
                  textStyle: {
                    color: '#E1EAFA',
                    fontSize: 14,
                    fontWeight: 400,
                  }
                },
              },
            ],
            dataZoom: [
              {
                show: mapData[index].length > 10 ? true : false,
                startValue: 0,
                endValue: 9,
                orient: 'vertical',
                zoomLock: true
              },
            ],
            series: [{
              type: 'bar',
              z: 99,
              data: mapData[index].map(item => { return item.yield }),
              barMaxWidth: 30,
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
                  // barBorderRadius: [0, 10, 10, 0],
                  color: function (params) {
                    if (params.dataIndex < 3) {
                      return colors[params.dataIndex];
                    } else {
                      return colors[3];
                    }
                  },
                }
              },
            }, {
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
                color: colors[5],
              },
              tooltip: {
                show: false,
                // formatter: function (params) {
                //   return params.name;
                // },
              },
              data: coverData({ coord: [105.86913635, 34.91315196], name: '西边来的' }, mapData[index])
            }, {
              type: 'scatter',
              coordinateSystem: 'geo',
              zlevel: 2,
              rippleEffect: { //涟漪特效
                period: 4, //动画时间，值越小速度越快
                brushType: 'stroke', //波纹绘制方式 stroke, fill
                scale: 4 //波纹圆环最大限制，值越大波纹越大
              },
              tooltip: {
                show: true,
                backgroundColor: '#ffffff00',
                borderColor: '#ffffff00',
                padding: 0,
                formatter: function (params) {
                  let str = ''
                  if (params.data.time) {
                    str = `<div class="scatterTooltip">
                      <div class="scatterTooltipText"><p>时间：</p>${params.data.time}</p></div>
                      <div class="scatterTooltipText"><p>产值：</p><p>${params.data.yield}</p></div>
                      </div>`
                  }
                  return str;
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
                return 3 + val[2] * 3; //圆环大小
              },
              itemStyle: {
                normal: {
                  show: false,
                  color: '#F19642',
                }
              },
              data: [{ "name": "中国", "value": [105.86913635, 34.91315196, 4] }, ...mapData[index]],
            }],
          })
      });
      this.option && this.mapEchart.setOption(this.option);
      this.Loading = false
      if (this.option) {
        this.mapEchart.on('georoam', (params) => {
          var option = JSON.parse(JSON.stringify(this.mapEchart.getOption()));
          // if (option.geo.length == 2 && params.zoom != null) {
          //   option.geo = [option.geo[0]]
          //   this.mapEchart.clear()
          //   this.mapEchart.setOption(option)
          //   this.debounceRoam()
          // } else {
            this.roam()
          // }
        })
        this.mapEchart.on('timelinechanged', params => {
          // 获取当前timeline的切换索引
          const currentIndex = params.currentIndex;
          this.option.baseOption.timeline.currentIndex = currentIndex
          this.option.baseOption.geo[0].regions = [
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
            ...(mapData[currentIndex].map(item => {
              return {
                name: item.name,
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
              }
            }))
          ]
          this.mapEchart.setOption(this.option);
        });
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
    // 地图收缩
    roam() {
      var option = this.option;
      var options = JSON.parse(JSON.stringify(this.mapEchart.getOption()));
      option.baseOption.geo[0].zoom = option.baseOption.geo[1].zoom = options.geo[0].zoom
      option.baseOption.geo[0].center = option.baseOption.geo[1].center = options.geo[0].center;
      this.mapEchart.setOption(option); //设置option
    }
  }
}
</script>
<style scoped lang="less">
.mapBox {
  position: relative;
  height: 100%;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;

  .selectBox {
    position: absolute;
    top: 10px;
    left: 50px;
    z-index: 99;
    background: #ffffff00;

    ::v-deep .el-form-item__label {
      color: #B8BECC;
    }
  }

  .echarts-title-icon {
    position: absolute;
    z-index: 3;
    right: 230px;
    top: 20px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 30px;
    text-align: center;
    color: #7AEEF7;
    border: 1px solid #7AEEF7;
  }

  .echarts {
    /* width: 100%; */
    min-width: 1700px;
    height: 100%;
  }
}

::v-deep .scatterTooltip {
  background-image: url('../../../assets/弹窗背景.png');
  background-size: 100% 100%;
  padding: 20px;
  color: #fff;

  .scatterTooltipText {
    display: flex;
    align-content: center;
    justify-content: space-between;
    align-items: center;

    p:nth-of-type(1) {
      font-size: 16px;
    }
  }
}
</style>