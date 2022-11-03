<template>
    <div ref="main" style="width:100%;height:100%">

    </div>
</template>

<script lang="ts" setup>
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
  LegendComponent,
  LegendComponentOption
} from 'echarts/components';
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { onMounted, ref, watch } from 'vue';

echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | ToolboxComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | LegendComponentOption
  | LineSeriesOption
>;
let main=ref()
onMounted(()=>{
//     let myChart = echarts.init(main.value);
//   myChart.setOption(option,true);
//   window.onresize = function () {
//     myChart.resize()
//       }
optionChange()
})
const props=defineProps({
  lineDatas:{
    type:Array<any>,
  },
  sendXdata:{
    type:Array<any>,
  },
})
let option: EChartsOption;
let myChart:any=null
const optionChange=()=>{
  myChart = echarts.init(main.value);
  myChart.setOption(option);
  window.onresize = function () {
    myChart.resize()
  }
 }


watch(() => [props.sendXdata,props.lineDatas],(newval:any)=>{
 // let myChart = echarts.init(main.value);
 option = {
    title: {
    text: 'request'
  },
  tooltip: {
    trigger: 'axis'
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
      end: 20,

    }
  ],
  grid: {
    left: '3%',
    bottom: 70,
    containLabel: true
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
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: newval[0]
  },
  yAxis: {
    type: 'value'
  },
  series:newval[1]

};
if(newval.length>0){ myChart.setOption(option);}

  // optionChange()
},{deep:true})
option = {
  title: {
    text: 'request'
  },
  tooltip: {
    trigger: 'axis'
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
      end: 20,

    }
  ],
  grid: {
    left: '3%',
    bottom: 70,
    containLabel: true
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
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: props.sendXdata
  },
  yAxis: {
    type: 'value'
  },
  series:props.lineDatas
};

</script>

<style lang="scss" scoped>

</style>