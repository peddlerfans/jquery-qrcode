<script lang="ts">
export default {name: 'Dashboard'}
</script>

<script setup lang="ts">
import { h, onMounted, reactive, ref } from 'vue';
import EchartsModel from '@/components/EchartsModel.vue'
import { message } from 'ant-design-vue';
import request from "@/utils/request"
import {dashboradUrl}from "@/appConfig"
import { QuestionCircleFilled } from '@ant-design/icons-vue';

interface FormState {
  'range-time-picker': [string, string];
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
  // minutes < 0 ? minutes = Number(`0${minutes}`) : minutes = minutes
  //转换格式
  // return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${minutes}`
  return state.toISOString()
}
let endDate=new Date()
// console.log(timeFormat(endDate,7,"days"));
let 	minutes = endDate.getMinutes()
  minutes < 10 ? minutes = Number(`0${minutes}`) : minutes = minutes
const search={
  start:timeFormat(endDate,7,"hours"),
  end:endDate.toISOString(),
  interval:'1h',
  aggs: {
        transaction_duration: {
            avg: {
                field: "transaction.duration.us",
                missing: 0
            }
        },
        terms: {
            terms: {
                field: "transaction.name",
                size: 10

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
        }
    }
}
console.log(search);

// 需要的参数 start   end   interval（x轴时间间隔）
async function query(){
  let rst=await request.post(dashboradUrl,search)
}
onMounted(()=>{
  query()
})
const formState = reactive({} as FormState);
const options=ref([
  {label:"Last 30 minutes",value:"Last 30 minutes"  },
  {label:"Last 1 hour",value:"Last 1 hour"},
  {label:"Last 24 hour",value:"Last 24 hour"},
  {label:"Last 7 day",value:"Last 7 day"},
  {label:"Last 30 day",value:"Last 30 day"},
])
const choseData=ref("")
const datachange=(value:string)=>{
  choseData.value=value
  if(value=="today"){
    // search.start=timeFormat(24)
    // search.interval=
  }
}


const current = ref<number>(0);
const next = () => {
  current.value++;
};
const prev = () => {
  current.value--;
};
const steps=[
  {
    title: 'Step 1',
    description: '定义AW',
    content: '<h4>Step 1: 定义可重复利用的测试步骤抽象:</h4><ul>' +
        '<li>name：通常为脚本函数/方法名</li>' +
        '<li>description：步骤简要说明</li>' +
        '<li>template：中文步骤模版，模版作为文本步骤生成格式化内容</li>' +
        '<li>template_en：英文步骤模版\n</li>' +
        '<li>params：步骤参数，用于自动化脚本或文本步骤内容替换</li>' +
        '<li>returnType定义AW返回数据类型，用于结果判断（第一阶段未包含）\n</li>' +
        '<li>name_hash：用户不可见，当前对name直接进行hash，意味着name全局不可重复，可以调整为path+name\n</li>'+
        '<li>description_hasn：用户不可见，当前对description 进行NLP处理，提取top 20单词进行hash\n</li>'+
        '</ul><a href="/#/awmodeler">进入 >></a>',
  },
  {
    title: 'Step 2',
    description: '定义用例元模型',
    content: '<h4>Step 2: 定义一组用例共享的元模型，每个字段的类型、枚举等</h4><p>测试模型可以引用用例元模型模版，这样可以方便用户定义最终用例生成所需要的字段用例或者脚本生成的时候会根据模版定义内容来生成相关用例、脚本字段。</p><a href="/#/templatemanager/meta">进入 >></a>',
  },
  {
    title: 'Step 3',
    description: '定义数据模型',
    content: '<h4>Step 3: 定义测试模型所需的相关数据</h4><p>数据原则上会影响业务模型的最终输出，也是测试设计的重要考虑因素。数据模型可以是静态的或者动态的：</p><ul>' +
        '<li><b>静态数据</b> 是一组定义的数据列表，用户可以根据自己的需求手动配置。和动态数据相比，静态数据模型可以跨业务模型共享。<a href="/#/templatemanager/static">进入 >></a></li>'+
        '<li><b>动态数据</b> 是定义数据规则和策略（比如pairwise、全排列、随机等）通过算法生成相关数据列表。当前主要还是pairwise策略，整体参考微软的PICT语法定义，我们主要是提供向导式建模。业务模型中引用的时候会从模型中动态生成导入。<a href="/#/templatemanager/dynamic">进入 >></a></li></ul>',
  },
  {
    title: 'Step 4',
    description: '定义测试模型',
    content: '<h4>Step 4: 定义测试模型</h4><p>通过调用之前定义好的模型来设计整个测试流程。其中包括以下步骤：</p><ul>' +
        '<li>起始节点</li>'+
        '<li>结束节点</li>'+
        '<li>步骤节点：1个操作步骤，可选一个预期结果</li>'+
        '<li>并行网关，分支路径都需要覆盖</li>'+
        '<li>条件网关，分支路径根据条件进行选择0~N</li></ul>',
  },
  {
    title: 'Step 5',
    description: 'MBT用例生成',
    content: '<h4>Step 5: 生成MBT用例</h4><p>根据需要生成相应的测试代码或测试文本。</p><ul><li>支持EJS，FreeMarker模板引擎</li><li>支持输出Python, JAVA测试代码，或YAML格式的文本用例</li></ul><a href="/#/mbtstore">进入 >></a>',
  },
]
</script>

<template>
  <section class="block shadow flex-start" style="width: 100%; height: 100%; color: var(--gray); flex-direction: column;" >
    <a-row style="width:100%; height: 55%;">
      <div class="steps-div">
        <h2>使用向导</h2>
        <a-steps v-model:current="current">
          <a-step v-for="item in steps" :key="item.title" :title="item.title" :description="item.description" />
        </a-steps>
        <div class="steps-content" v-html="steps[current].content"></div>
        <div class="steps-action">
          <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
          <!--          <a-button-->
          <!--              v-if="current == steps.length - 1"-->
          <!--              type="primary"-->
          <!--              @click="message.success('Processing complete!')"-->
          <!--          >-->
          <!--            Done-->
          <!--          </a-button>-->
          <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
        </div>
      </div>
    </a-row>

      <a-row style="margin-top:2.25rem">
      <a-col :span="18" style="fontSize:20px;fontWeight:700">Data monitoring</a-col>
      <a-col :span="5" style="display:flex">
        
          <a-select 
          :options="options"
          v-model:value="choseData"
          ></a-select>
          <!-- <a-range-picker
            v-model:value="formState['range-time-picker']"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          /> -->
          <a-button type="primary">search</a-button>

      </a-col>
    </a-row>
    <a-row style="height:32%;display: flex; justify-content: space-between;margin-top: 1.25rem;">
      <a-col :span="10" style="backgroundColor:origin ; border:1px solid red">
        <echarts-model :sendtime="search.start"></echarts-model>
      </a-col>
      <a-col :span="10" style="backgroundColor:origin">Line Chart2</a-col>
    </a-row>

  </section>
</template>

<style>
.steps-div{
  width:100%;
  padding: 30px 20px 0px 20px;
}
.steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  /*text-align: center;*/
  padding: 20px 20px 20px 50px;
}

.steps-action {
  margin-top: 24px;
}
#left{float:left;}
#right{float:right;}
[data-theme='dark'] .steps-content {
  background-color: #2f2f2f;
  border: 1px dashed #404040;
}
</style>
