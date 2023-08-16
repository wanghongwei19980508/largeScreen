<template>
  <div class="about">
    <div ref="main" id="main"></div>
  </div>
</template>

<script>

import * as echarts from 'echarts';
import { MapChart } from 'echarts/charts'
import loadBMap from '../utils/baiduapi'
import { InternationalMap } from '../utils/InternationalMap'
import { InternationalOutline } from '../utils/InternationalOutline'
import 'echarts/extension/bmap/bmap';
export default {
  data() {
    return {
      option: []
    }
  },
  mounted() {
    loadBMap("密钥").then(() => {
      echarts.use(MapChart)
      this.map()
    })
  },
  methods: {
    map() {
      var myChart = echarts.init(document.getElementById('main'));

      echarts.registerMap('InternationalMap', InternationalMap);
      echarts.registerMap('InternationalOutline', InternationalOutline);


      var chinaGeoCoordMap = {
        '黑龙江': [65.91347205, 38.07253963],
        '内蒙古': [73.35741779, 44.70031083],
        "吉林": [65.8055114, 49.47057901],
        '北京市': [87.38231815, 50.71629756],
        "辽宁": [75.73084376, 49.54063518],
        "河北": [51.88840662, 55.07229351],
        "天津": [115.00065627, 53.04648107],
        "山西": [69.4735132, 57.29311985],
        "陕西": [44.87612302,
          39.58523026],
        "甘肃": [61.59816903,
          31.06292714],
        "宁夏": [102.05457995,
          59.8242106],
        "青海": [87.4901852,
          61.15259914],
        "新疆": [147.15029084,
          61.46337121],
        "西藏": [91.11, 29.97],
        "四川": [103.9526, 30.7617],
        "重庆": [108.384366, 30.439702],
        "山东": [117.1582, 36.8701],
        "河南": [113.4668, 34.6234],
        "江苏": [118.8062, 31.9208],
        "安徽": [117.29, 32.0581],
        "湖北": [114.3896, 30.6628],
        "浙江": [119.5313, 29.8773],
        "福建": [119.4543, 25.9222],
        "江西": [116.0046, 28.6633],
        "湖南": [113.0823, 28.2568],
        "贵州": [106.6992, 26.7682],
        "云南": [102.9199, 25.4663],
        "广东": [113.12244, 23.009505],
        "广西": [108.479, 23.1152],
        "海南": [110.3893, 19.8516],
        '上海': [121.4648, 31.2891]
      };
      var chinaDatas = [
        [{
          name: '黑龙江',
          value: 0
        }], [{
          name: '内蒙古',
          value: 0
        }], [{
          name: '吉林',
          value: 0
        }], [{
          name: '辽宁',
          value: 0
        }], [{
          name: '河北',
          value: 0
        }], [{
          name: '天津',
          value: 0
        }], [{
          name: '山西',
          value: 0
        }], [{
          name: '陕西',
          value: 0
        }], [{
          name: '甘肃',
          value: 0
        }], [{
          name: '宁夏',
          value: 0
        }], [{
          name: '青海',
          value: 0
        }], [{
          name: '新疆',
          value: 0
        }], [{
          name: '西藏',
          value: 0
        }], [{
          name: '四川',
          value: 0
        }], [{
          name: '重庆',
          value: 0
        }], [{
          name: '山东',
          value: 0
        }], [{
          name: '河南',
          value: 0
        }], [{
          name: '江苏',
          value: 0
        }], [{
          name: '安徽',
          value: 0
        }], [{
          name: '湖北',
          value: 0
        }], [{
          name: '浙江',
          value: 0
        }], [{
          name: '福建',
          value: 0
        }], [{
          name: '江西',
          value: 0
        }], [{
          name: '湖南',
          value: 0
        }], [{
          name: '贵州',
          value: 0
        }], [{
          name: '广西',
          value: 0
        }], [{
          name: '海南',
          value: 0
        }], [{
          name: '北京市',
          value: 1
        }]
      ];

      var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var dataItem = data[i];
          var fromCoord = chinaGeoCoordMap[dataItem[0].name];
          var toCoord = [107.00134568, 32.54246249];
          if (fromCoord && toCoord) {
            res.push([{
              coord: toCoord,
            }, {
              coord: fromCoord,
              value: dataItem[0].value
            }]);
          }
        }
        return res;
      };
      var series = [
        {
          map: 'InternationalMap',
          type: 'map',
          zoom: 1.3,
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          top: '22%',
          tooltip: {
            show: false
          },
          roam: false,
          itemStyle: {
            normal: {
              areaColor: 'transparent',
              borderColor: 'rgba(0,255,255,.1)',
              borderWidth: 1,
            },
            emphasis: {
              areaColor: 'rgba(0,255,255,.1)',
              textStyle: {
                color: 'red'
              }
            }
          }
        },
      ];
      [['中国', chinaDatas]].forEach(function (item, i) {
        series.push({
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
            }
          },
          data: convertData(item[1])
        }, {
          type: 'scatter',
          coordinateSystem: 'geo',
          zlevel: 2,
          rippleEffect: { //涟漪特效
            period: 4, //动画时间，值越小速度越快
            brushType: 'stroke', //波纹绘制方式 stroke, fill
            scale: 4 //波纹圆环最大限制，值越大波纹越大
          },
          label: {
            normal: {
              show: false,
              position: 'right', //显示位置
              offset: [5, 0], //偏移设置
              formatter: function (params) {//圆环显示文字
                return params.data.name;
              },
              fontSize: 13
            },
            emphasis: {
              show: true
            }
          },
          symbol: 'circle',
          symbolSize: function (val) {
            return 5 + val[2] * 5; //圆环大小
          },
          itemStyle: {
            normal: {
              show: false,
              color: '#34c6bb'
            }
          },
          data: item[1].map(function (dataItem) {
            return {
              name: dataItem[0].name,
              value: chinaGeoCoordMap[dataItem[0].name].concat([dataItem[0].value])
            };
          }),
        }
        );
      });



      this.option = {
        backgroundColor: '#181F4E',
        tooltip: {
          trigger: 'item'
        },
        color: ['#34c6bb'],
        geo: {
          silent: true,
          map: 'InternationalOutline',
          zoom: 1.3,
          top: '22%',
          label: {
            normal: {
              show: false,
              textStyle: {
                color: '#fff'
              }
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },

          roam: false,
          itemStyle: {
            normal: {
              areaColor: 'rgba(0,255,255,.02)',
              borderColor: '#00ffff',
              borderWidth: 1.5,
              shadowColor: '#00ffff',
              shadowOffsetX: 0,
              shadowOffsetY: 4,
              shadowBlur: 10,
            },
            emphasis: {
              areaColor: 'transparent', //悬浮背景
              textStyle: {
                color: '#fff'
              }
            }
          }
        },
        series: series
      }
      this.option && myChart.setOption(this.option);
    }
  }
}
</script>
<style scoped>
#main {
  width: 100vw;
  height: 100vh;
}
</style>