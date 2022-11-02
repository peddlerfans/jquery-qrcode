<script lang="ts" setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
import {
  TitleComponent,
  TitleComponentOption,
  ToolboxComponent,
  ToolboxComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  DataZoomComponent,
  DataZoomComponentOption
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, ref,watch } from 'vue';
import { computed } from '@vue/reactivity';
import { any, string } from 'vue-types';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  DataZoomComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DataZoomComponentOption
  | LineSeriesOption
>;
onMounted(()=>{
 
}) 
// const props=defineProps(["sendXdata","cpuData","memory"])
// const titleData:any=computed(()=>{
//   if(props.chartstype=="cpucharts"){
//     return "cpu"
//   }else{
//     return "memory"
//   }
// })
const props=defineProps({
  sendXdata:{
    type:Array<any>,

  },
  cpuData:{
    type:Array<any>
  },
  chartstype:{
    type:String
  }
})
let Xdata:any=ref([])
watch(() => props.sendXdata,(newval:any)=>{
  Xdata.value=newval
  
  
},{deep:true,immediate:true})
console.log(Xdata.value);


// 获取div的dom
let main=ref()
let option: EChartsOption;
const colors = ['#5470C6', '#EE6666'];

option = {
  color: colors,
  title: {
    left: 'left',
    text: "titleData",
    textStyle:{
      fontWeight:500,
      fontSize:14
    }
  },
  tooltip: {
    trigger: 'none',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: 'none'
      },
      restore: {},
      saveAsImage: {}
    }
  },
  dataZoom: [
    {
      type: 'inside',
      start: 0,
      end: 20,
      top:100
    },
    {
      start: 0,
      end: 20
    }
  ],
  // legend: {},
  grid: {
    top: 70,
    bottom: 70
  },
  xAxis: [
    {
      type: 'category',
      // axisTick: {
      //   alignWithLabel: true
      // },
      axisLine: {
        onZero: false,
        lineStyle: {
          color: colors[1]
        }
      },
      axisPointer: {
        label: {
          formatter: function (params: any) {
            if(props.chartstype=="cpucharts"){
              return (
              'cpu ' +
              params.value +
              (params.seriesData.length ? '：' + params.seriesData[0].data : '')
            )
            }else{
              return (
              'memory ' +
              params.value +
              (params.seriesData.length ? '：' + params.seriesData[0].data : '')
            );
            }
            
          }
        }
      },
      // prettier-ignore
      data: Xdata.value 
    },
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: 'cpu',
      type: 'line',
      // smooth: true,
      emphasis: {
        focus: 'series'
      },
      data: props.cpuData
    }
  ]
};

// function init(){
  // let myChart = echarts.init(main.value);




// myChart.setOption(option);
// }



</script>
    
<template>
    <div ref="main" style="width:100%;height: 100%;"></div>
</template>