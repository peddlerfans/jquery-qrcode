<script lang="ts">
export default {name: 'Dashboard'}
</script>

<script setup lang="ts">
import {  onMounted, ref } from 'vue';
import EchartsModel from '@/components/EchartsModel.vue'
import { message } from 'ant-design-vue';
import request from "@/utils/request"
import {dashboradUrl}from "@/appConfig"
// import {red, volcano, gold, yellow,lime,green,cyan,blue,geekblue,purple,magenta,grey,} from "@ant-design/colors";
import { SelectValue } from 'ant-design-vue/lib/select';
import { useI18n } from "vue-i18n";

const { t } = useI18n()

interface FormState {
  'range-time-picker': [string, string];
}

function lineData(arr:any){
  let buckets:any = {}
arr.forEach((a: { buckets: any[]; }) => a.buckets.forEach(b => buckets[b.key] = {name:b.key,doc_count:"",data:[],type:"line"} ))
arr.forEach((a: { buckets: any[]; }) => {
    Object.keys(buckets).forEach(k => {
        // console.log(a.bucket)
        let data = a.buckets.find(t => t&&t.key === k);
        if (data) {
          if(buckets[k].doc_count<data.doc_count){
            buckets[k].doc_count=data.doc_count
          }
           
            buckets[k].data.push(data.duration.value/1000000)
            
        } else {
            buckets[k].data.push(0)
        }        
    })
})
let arrdata=Object.values(buckets).sort((a:any,b:any)=>b.doc_count-a.doc_count).filter((item,index)=>{if(index<5){return item}})

return arrdata
}

// 格式化时间的函数
function timeFormat(endDate:Date,hour: number |string |any,unit:"days"|"hours"|"minutes"|"weeks"|"month"="days") {
  const unitmapping:any={
    days:24* 60 * 60 * 1000,
    hours:1* 60 * 60 * 1000,
    minutes:1*60*1000,
    weeks:7*24* 60 * 60 * 1000,
    month:30*24* 60 * 60 * 1000
  }
  let state = new Date(new Date().getTime() - hour * 60 * 60 * 1000)
  if(unit=="days"){
    state=new Date(new Date().getTime() - hour*unitmapping.days)
  }else if(unit=="hours"){
    state=new Date(new Date().getTime() - hour*unitmapping.hours)
  }else if(unit=="minutes"){
    state=new Date(new Date().getTime() - hour*unitmapping.minutes)
  }else if(unit=="weeks"){
    state=new Date(new Date().getTime() - hour*unitmapping.weeks)
  }else if(unit=="month"){
    state=new Date(new Date().getTime() - hour*unitmapping.month)
  }
  return state.toISOString()
}
let endDate=new Date()
// console.log(timeFormat(endDate,7,"days"));
const search={
  start:timeFormat(endDate,7,"days"),
  end:endDate.toISOString(),
  interval:'1d',
  aggs: {
        transaction_duration: {
            avg: {
                field: "transaction.duration.us",
                missing: 0 //无数据时默认显示0
            }
        },
        terms: {
            terms: {
                field: "transaction.name",
                size: 10 //接收条数限制
            }, 
            aggs: {
                duration: {
                    avg: {
                    field: "transaction.duration.us"
                    }
                }
            }
        },
        transations: {

            value_count: {
            field: "transaction.id"
            }
        },
        cpu:{
          avg:{
            field:"system.process.cpu.total.norm.pct",

          }
        },
        memory_total:{
          avg:{
            field:"system.memory.total"
          }
        },
        memory_free:{
          avg:{
            field:"system.memory.actual.free"
          }
        }
        //Latency  Throughput   tpm

        // 处理duration 纳秒转秒
    }
}
// 发送子组件的数据
// 识别展示的数据类型
let cpuCharts:string="cpu(%)" 
let cpuColor="#EE6666"
let cpuData:any=ref([])
let cpu=ref([])
let memorycharts:string="memory(GB)"
let memoryColor="#5470C6"
let memory:any=ref([])
let neicun=ref([])
let throughputTitle:string="throughput(tps)"
let throughputColor="#97CC71"
let throughput:any=ref([])
let tuntuliang=ref([])
let sendXdata=ref([])
let lineCharts:string="latency(seconds)"
let lineColors:any=ref(["#EE6666","#5470C6","#97CC71","#8FD5F3","#F6DC7D"])
let lineDatas:any=ref([])
function TimeTrans(timestamp: string | number | Date){

      let date:any=new Date(new Date(timestamp).getTime() + 8 * 3600 * 1000)

      date=date.toJSON();

      date=date.substring(0,19).replace('T',' ')

    return date.substring(5,16)

}

// 需要的参数 start   end   interval（x轴时间间隔）
async function query(){
  let rst:any=await request.post(dashboradUrl,search)
  console.log(rst);
  
  if(rst){
    sendXdata.value=rst.map((item:any)=>{
      return TimeTrans(item.key_as_string)
    })

     cpu.value=rst.map((item:any)=>{
      return item.cpu.value*10000
    })
    cpuData.value=[{data:cpu.value,type:"line",name:"cpu(%)"}]
    
     neicun.value=rst.map((item:any)=>{
      return item.memory_free.value/1024/1024/1024
    })
    memory.value=[{data:neicun.value,type:"line",name:"memory(GB)"}]

    let requestData=rst.map((item:any)=>{
        return item.terms
      })      
      lineDatas.value=lineData(requestData)

     tuntuliang.value=rst.map((item:any)=>{
      if(search.interval=="1m"){
        return item.transations.value
      }else if(search.interval=="1h"){
        return item.transations.value/60
      }else if(search.interval=="1d"){
        return item.transations.value/1440
      }
    })
    throughput.value=[{data:tuntuliang.value,type:"line",name:"throughput(tps)"}]
  }

  
  
}
onMounted(()=>{
  querys()
  query()

})
const options=ref([
  {label:"Last 30 minutes",value:"Last 30 minutes"  },
  {label:"Last 1 hour",value:"Last 1 hours"},
  {label:"Last 24 hour",value:"Last 24 hours"},
  {label:"Last 7 day",value:"Last 7 days"},
  {label:"Last 30 day",value:"Last 30 days"},
])
const choseData:any=ref("Last 7 days")
const datachange=async (value:SelectValue)=>{
  // sendXdata.value=[]
  // cpuData.value=[]
  // memory.value=[]
  // lineDatas.value=[]
  // throughput.value=[]
  choseData.value=value
  if(value=="Last 30 minutes"){
    search.start=timeFormat(endDate,30,"minutes")
    search.interval='1m'
    // search.interval=
  }else if(value=="Last 1 hours"){
    search.start=timeFormat(endDate,1,"hours")
    search.interval="1m"
  }else if(value=="Last 24 hours"){
    search.start=timeFormat(endDate,24,"hours")
    search.interval="1h"
  }else if(value=="Last 7 days"){
    search.start=timeFormat(endDate,7,"days")
    search.interval="1d"
  }else if(value=="Last 30 days"){
    search.start=timeFormat(endDate,30,"days")
    search.interval="1d"
  }
  await query()
  console.log(sendXdata.value,cpuData.value,memory.value,lineDatas.value,throughput.value);
}


let 	minutes = endDate.getMinutes()
  minutes < 10 ? minutes = Number(`0${minutes}`) : minutes = minutes

const steps=ref<any>([
  {
    title: 'Step 1',
    description: 'dashboard.defineAW',
    content: 'dashboard.step1Content',
    name: 'dashboard.AWUnit',
    number: 0
  },
  {
    title: 'Step 2',
    description: 'dashboard.defineMBT',
    content: 'dashboard.step2Content',
    name: 'dashboard.metaTemp',
    number: 0
  },
  {
    title: 'Step 3',
    description: 'dashboard.defineData',
    content: 'dashboard.step3Content',
    name: ['dashboard.staticData','dashboard.dynamicData'],
    number: [0,0]
  },
  {
    title: 'Step 4',
    description: 'dashboard.defineTest',
    content: 'dashboard.step4Content',
    name: 'dashboard.MBTTemp',
    number: 0
  },
  {
    title: 'Step 5',
    description: 'dashboard.generateMBT',
    content: 'dashboard.step5Content',
    name: 'dashboard.codegenTemp',
    number: 0
  },
])

const current = ref<number>(0);
const next = () => {
  current.value++;
};
const prev = () => {
  current.value--;
};

// 需要的参数 start   end   interval（x轴时间间隔）
async function querys(){
  try {
    // let res = await request.get(`/api/statistics`)
    let res:any = await request.get(`/api/statistics`)
    steps.value[0].number=res.hlfs
    steps.value[1].number=res.template_meta
    steps.value[2].number[0]=res.template_static
    steps.value[2].number[1]=res.template_dynamic
    steps.value[3].number=res.test_model
    steps.value[4].number=res.template_codegen

    // let statistics={}
    // res.map((obj: any)=> {
    //   statistics={...obj}
    // })
    // steps.value[3].number=res[0].test_model
  } catch (e) {
    message.error("Query failed!")
  }
}
let zoomin=ref(0)
let zoomout=ref(100)
const dataZoom=(val1:any,val2:any)=>{
  zoomout.value=val1
  zoomin.value=val2
  
}




</script>

<template>
  <section class="block shadow flex-start" style="width: 100%;  color: var(--gray); flex-direction: column;" >
    <a-row style="width:100%; height: 31.75rem;">
      <div class="steps-div">
        <h2>{{ $t('dashboard.guide') }}</h2>
        <a-steps v-model:current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" :description="$t(item.description)" />
        </a-steps>
        <div class="steps-content">
          <a-row type="flex" justify="center" align="top">
            <a-col :span="21">
              <div v-html="$t(steps[current].content)"></div>
            </a-col>

            <a-col :span="3">
              <div style="text-align: right;">

                <div v-if="current==2">
                  <h4>{{ $t(steps[current].name[0]) }}: <a-badge :count="steps[current].number[0]" :number-style="{ backgroundColor: '#52c41a' }" /></h4>
                  <h4>{{ $t(steps[current].name[1]) }}: <a-badge :count="steps[current].number[1]" :number-style="{ backgroundColor: '#52c41a' }" /></h4>
                </div>
                <div v-else>
                  <h4>{{ $t(steps[current].name) }}: <a-badge :count="steps[current].number" :number-style="{ backgroundColor: '#52c41a' }" /></h4>
                </div>
              </div>
            </a-col>
          </a-row>



        </div>
        <div class="steps-action">
          <a-button :disabled="current == 0" style="margin-right: 8px" @click="prev">{{ $t('common.prev') }}</a-button>
          <a-button :disabled="current >= steps.length - 1" type="primary" @click="next">{{ $t('common.next') }}</a-button>

        </div>
      </div>
    </a-row>

      <a-row style="margin-top:2.25rem; ">
      <a-col :span="18" style="fontSize:20px;fontWeight:700">Data monitoring</a-col>
      <a-col :span="5" style="display:flex">
          <a-select
          :options="options"
          v-model:value="choseData"
          @change="datachange"
          ></a-select>
          <a-button type="primary">{{ $t('common.searchText') }}</a-button>
      </a-col>
    </a-row>
    <a-row style="height:19.75rem;display: flex; justify-content: space-around;margin-top: 20px;">
      <a-col :span="11" >
        <echarts-model v-if="sendXdata.length>0 || lineDatas.length>0 " 
          :sendXdata="sendXdata"
          :cpuData="cpuData"
          :chartstype="cpuCharts"
          :datacolor="cpuColor"
          @dataZoom="dataZoom"
          :zoomin="zoomin"
          :zoomout="zoomout"
          ></echarts-model>
          <div v-else class="noData">{{ $t('component.message.nocpuData') }}</div>
      </a-col>
      <a-col :span="11" >
        <echarts-model v-if="sendXdata.length>0  || lineDatas.length>0 "
          :sendXdata="sendXdata"
          :cpuData="memory"
          :chartstype="memorycharts"
          :datacolor="memoryColor"
          @dataZoom="dataZoom"
          :zoomin="zoomin"
          :zoomout="zoomout"
          ></echarts-model>
          <div v-else class="noData">{{ $t('component.message.nomemoryData') }}</div>
      </a-col>

    </a-row>
    <a-row style="height:19.75rem; margin-top: 20px;display: flex; justify-content: space-around;">
      <a-col :span="11">
        <echarts-model v-if="sendXdata.length>0 ||  lineDatas.length>0"
          :sendXdata="sendXdata"
          :cpuData="lineDatas"
          :chartstype="lineCharts"
          :datacolor="lineColors"
          @dataZoom="dataZoom"
          :zoomin="zoomin"
          :zoomout="zoomout"
          ></echarts-model>
          <div v-else class="noData">{{ $t('component.message.noLatencyData') }}</div>
        </a-col>
      <a-col :span="11">
        <echarts-model v-if="sendXdata.length>0 ||  lineDatas.length>0 "
          :sendXdata="sendXdata"
          :cpuData="throughput"
          :chartstype="throughputTitle"
          :datacolor="throughputColor"
          @dataZoom="dataZoom"
          :zoomin="zoomin"
          :zoomout="zoomout"
          ></echarts-model>
          <div v-else class="noData">{{ $t('component.message.nothroughputData') }}</div>
      </a-col>
    </a-row>
  </section>
</template>

<style lang="less">
.steps-div{
  width:100%;
  padding: 1.875rem 1.25rem 0rem 1.25rem;
}
.steps-content {
  margin-top: 1rem;
  border: .0625rem dashed #e9e9e9;
  border-radius: .375rem;
  background-color: #fafafa;
  height: 300px;
  /*text-align: center;*/
  padding: 1.25rem 1.25rem 1.25rem 3.125rem;
}

.steps-action {
  margin-top: 1.5rem;
}
#left{float:left;}
#right{float:right;}
[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: .0625rem dashed #404040;
}
.ant-select{
  width: 13.5rem !important;
}
.noData{
  width: 100%;
  height: 100%;
  background-color: rgb(237, 237, 237);
  line-height: 19.75rem;
  text-align: center;
  border-radius: .625rem;
  font-size: 2.25rem;
  font-weight: 700;
}
</style>
