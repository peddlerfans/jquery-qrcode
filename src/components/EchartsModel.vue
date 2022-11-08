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
import { onMounted, ref,watch,defineProps } from 'vue';

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

//   let myChart = echarts.init(main.value);
//  myChart.setOption(option,true);
//  window.onresize = function () {
//    myChart.resize()
// }
optionChange()
}) 
let option: EChartsOption;

const props=defineProps({
 sendXdata:{
   type:Array<any>,

 },
 cpuData:{
   type:Array<any>
 },
 chartstype:{
   type:String
 },
 datacolor:{
   type:String
 }
})
let myChart:any=null
const optionChange=()=>{
  myChart = echarts.init(main.value);
  myChart.setOption(option);
  window.onresize = function () {
    myChart.resize()
  }
 }
watch(() => [props.sendXdata,props.cpuData,props.chartstype,props.datacolor],(newval:any)=>{
 // let myChart = echarts.init(main.value);
 option = {
 color: props.datacolor,
 title: {
   left: 'left',
   text: props.chartstype,
   textStyle:{
     fontWeight:700,
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
     saveAsImage: {},
   },
   right: "9%"
 },
 dataZoom: [
   {
     type: 'inside',
     start: 0,
     end: 50,
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
   bottom: 80
 },
 xAxis: [
   {
     type: 'category',
     // axisTick: {
     //   alignWithLabel: true
     // },
     axisLine: {
       onZero: false,
       // lineStyle: {
       //   color: colors[1]
       // }
     },
     axisPointer: {
       label: {
         formatter: function (params: any) {
             return (
             params.value +
             (params.seriesData.length ? '：' + params.seriesData[0].data : '')
           )
           
           
         }
       }
     },
     // prettier-ignore
     data: newval[0] 
   },
 ],
 yAxis: [
   {
     type: 'value'
   }
 ],
 series: [
   {
     name: props.chartstype,
     type: 'line',
     // smooth: true,
     emphasis: {
       focus: 'series'
     },
     data: newval[1]
   }
 ],

};
if(newval.length>0){ myChart.setOption(option);}

  // optionChange()
},{deep:true})
// 获取div的dom
let main=ref()

option = {
 color: props.datacolor,
 title: {
   left: 'left',
   text: props.chartstype,
   textStyle:{
     fontWeight:700,
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
     saveAsImage: {},
   },
   right: "9%"
 },
 dataZoom: [
   {
     type: 'inside',
     start: 0,
     end: 50,
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
   bottom: 80
 },
 xAxis: [
   {
     type: 'category',
     // axisTick: {
     //   alignWithLabel: true
     // },
     axisLine: {
       onZero: false,
       // lineStyle: {
       //   color: colors[1]
       // }
     },
     axisPointer: {
       label: {
         formatter: function (params: any) {
             return (
             params.value +
             (params.seriesData.length ? '：' + params.seriesData[0].data : '')
           )
         }
       }
     },
     // prettier-ignore
     data: props.sendXdata
   },
 ],
 yAxis: [
   {
     type: 'value'
   }
 ],
 series: [
   {
     name: props.chartstype,
     type: 'line',
     // smooth: true,
     emphasis: {
       focus: 'series'
     },
     data: props.cpuData
   }
 ],

};






</script>
    
<template>
    <div ref="main" calss="box_echarts" style="width:100%;height: 100%;"></div>
</template>