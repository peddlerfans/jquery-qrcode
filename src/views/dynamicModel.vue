<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  onBeforeMount,
  defineComponent,
  UnwrapRef,
  onMounted,
  nextTick,
  toRaw,
  getCurrentInstance
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import request from '@/utils/request';
import {
  templateUrl
} from '@/appConfig'
import * as _ from 'lodash'
import { cloneDeep, isArray } from 'lodash-es';
import type {  FormProps,  SelectProps,} from 'ant-design-vue';
import {  SyncOutlined, PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SwapOutlined,
} from '@ant-design/icons-vue';
import {  message,  Table} from 'ant-design-vue/es'
import { Rule } from 'ant-design-vue/es/form';
import { Dropdown, Space, Tooltip, Modal, Alert, Menu } from 'ant-design-vue';
import {
  tableSearch,
  FormState,
  paramsobj,
  ModelState,
  statesTs,
  Model,
  Factor,
  Constraint,
  valueStatesTs,
} from "./componentTS/dynamictemplate"; 
import CreateRule from '@/components/CreateRule.vue'
import { useI18n } from "vue-i18n";

const { t } = useI18n()
// Specify the api for dynamic template data CRUD
let url = templateUrl;
let route = useRoute()
let finalResult: any;

sessionStorage.setItem('dynamic_' + route.params._id, JSON.stringify(route.params._id))
// 获取当前数据并赋值
let finalModel: Model = reactive({
  option: {},
  factor: [],
  constraint: [],
  constraintif:[]
})// 根据传来的id值获取到数据
async function query(id?: any) {
  finalResult = await request.get(`/api/templates/${id}`, { params: { category: 'dynamic' } })

  finalModel.option = finalResult.model!.option
  finalModel.factor = finalResult.model!.factor.map((e: any) => {
    return {
      ...e, editing: false, inputVisible: false, inputValue: ''
    }
  })
  if(finalResult.model.constraint){
    finalModel.constraint=conditionData(finalResult.model.constraint)
  }
  
  if(finalResult.model.constraintif){
    finalModel.constraintif=conditionData(finalResult.model.constraintif)
  }

  condata.value = finalModel.constraint.map((e: any,index:number) => {
    return {if:ifdata(e.if),then:{...e.then},keys:index}
  })
  valueData.value=finalModel.factor
}
let modelId: any
onMounted(() => {
  modelId = sessionStorage.getItem('dynamic_' + route.params._id)
  query(JSON.parse(modelId))
}) 


const saveModel = async () => {
  if (showAddFactorBtn.value ){
    if (finalModel.factor.length<2){
      message.warning(t('templateManager.saveModelTip'))
    }else{
      let rst = await request.put(url + `/${finalResult._id}`, {model: toRaw(finalModel)})
      if(rst){
         query(finalResult._id)
      }
      
      message.success(t('templateManager.saveModelSuccess'))
    }
  }else{
    message.warning(t('templateManager.saveTip'))
  }


}

// Types of factor
const orderOptions = ref<SelectProps['options']>([
  {
    value: 'pairwise',
    label: 'Pairwise',
  },
  {
    value: 'fullcombination',
    label: 'Full Combination',
    disabled: true
  },
  {
    value: 'random',
    label: 'Random',
    disabled: true
  }
])

const typeOptions = ref<SelectProps['options']>([
  {
    value: 'string',
    label: 'String',
  },
  {
    value: 'number',
    label: 'Number',
  }
])

// Initialize an obj for a single factor
let factorState = reactive<Factor>({
  name: '',
  type: '',
  values: [],
  editing: true,
  inputVisible: false,
  inputValue: '',
})

const factorColumns = [ // Setup the header of columns
  {
    title: 'component.table.name',
    dataIndex: 'name',
    key: 'name',
    // width: 40
  },
  {
    title: 'component.table.type',
    dataIndex: 'type',
    key: 'type',
    // width: 120
  },
  {
    title: 'component.table.values',
    dataIndex: 'values',
    key: 'values',
  },
  {
    title: 'component.table.action',
    dataIndex: 'action',
    key: 'action',
    // width: 100
  },


]

let newValue = ref();
let showAddFactorBtn = ref(true)

const addNewFactor = () => {
  showAddFactorBtn.value = false;
  finalModel.factor.unshift({
    name: '',
    type: '',
    values: [],
    editing: true,
    inputVisible: true,
    inputValue: ''
  })
}

const editFactor = (record: Factor) => {
  factorState.name = record.name
  factorState.type = record.type
  factorState.values = record.values
  showAddFactorBtn.value=false
  record.editing = true

}


const saveFactor = async (record: Factor) => {
  record.editing = false

  clearFactorState()
  showAddFactorBtn.value = true
}


const deleteFactor = (record: Factor) => {
  const index= finalModel.factor.findIndex(e => e === record)
  finalModel.factor.splice(index,1);
  message.success(t('component.message.delText'));
}
const cancelFactor = (record: Factor) => {

  if (factorState.name === ''){
    const index= finalModel.factor.findIndex(e => e === record)
    finalModel.factor.splice(index,1);
  }else{
    record.name = factorState.name
    record.type = factorState.type
    record.values = factorState.values

    record.editing = false
  }

  clearFactorState()
  showAddFactorBtn.value = true
}
const clearFactorState = () => {
  factorState.name = ''
  factorState.type = ''
  factorState.values = []
  factorState.editing = true
  factorState.inputVisible = false
  factorState.inputValue = '';

  // (instance?.refs.refFactorForm as any).resetFields();
}

// Handel Tags in modal form
const handleCloseTag = (record: Factor, removedTag: string) => {
  const tags = record.values.filter((tag: string) => tag !== removedTag);
  record.values = tags;

};
let inputRef = ref();

const handleFactorValueConfirm = (record: Factor) => {
  let values = record.values;
  if (record.inputValue && values.indexOf(record.inputValue) === -1) {
    values = [...values, record.inputValue];
  }
  Object.assign(record, {
    values: values,
    inputVisible: false,
    inputValue: '',
  });
}

const newFactorValueInput = (record: Factor) => {
  record.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
    inputRef.value.toString();
  })
};
// Operators

const stringOptions = [
  {
    value: '=',
    label: '=',
  },
  {
    value: '<>',
    label: '<>',
  },
  {
    value: 'IN',
    label: 'IN',
  },
  {
    value: 'LIKE',
    label: 'LIKE',
  }
]
const numberOptions = [
  {
    value: '=',
    label: '=',
  },
  {
    value: '<',
    label: '<',
  },
  {
    value: '>',
    label: '>',
  },
  {
    value: '<=',
    label: '<=',
  },
  {
    value: '>=',
    label: '>=',
  },
  {
    value: '<>',
    label: '<>',
  },
  {
    value: 'IN',
    label: 'IN',
  }
]
const thenObj=ref({
  thenName:'',
  thenOperator:'',
  thenValue:''
})
const ifOperatorOptions = computed(() => {
  if (thenObj.value.thenName == '') {
    return ref<SelectProps['options']>([]).value;
  } else {
    if (finalModel.factor.filter(e => e.name == thenObj.value.thenName)[0].type == 'string') {
      return ref<SelectProps['options']>(stringOptions).value
    } else {
      return ref<SelectProps['options']>(numberOptions).value
    }
  }
})
const ifNameOpetions = computed(() => {
  return ref<SelectProps['options']>(finalModel.factor.map(e => { return { value: e.name, label: e.name } })).value
})

const ifValueOpetions = computed(() => {
  if (thenObj.value.thenName == '') {
    return ref<SelectProps['options']>([]).value
  } else {
    return ref<SelectProps['options']>(
        finalModel.factor.filter(e => e.name == thenObj.value.thenName)[0].values
            .map(e => { return { value: e, label: e } })).value
  }
})

let showAddConstraintBtn = ref(true)

let currentFactorName = reactive([])
let childComponent=ref(false)
// 向子组件传递的参数
let conditional=ref()
const addNewConstraint = () => {
  childComponent.value=!childComponent.value
  conditional.value=finalModel.factor
  // clearConstraintState()
  showAddConstraintBtn.value = false;
}



const instance = getCurrentInstance()

const cancel = (e: MouseEvent) => {
};

const focus = () => {
};

const columns=[
{
    title: 'component.table.if',
    dataIndex: 'if',
    key: 'if',
    width: 120
  },
  {
    title: 'component.table.then',
    dataIndex: 'then',
    key: 'then',
    width: 120
  },
  {
    title: 'component.table.action',
    dataIndex:'action',
    key:'action',
    width:60
  }
]


// 将表格数据追加识别索引属性
const conditionData=(arr:any)=>arr.map((item:any,index:string)=>({...item,keys:index}))

// 递归改变if结构
function ifdata(arr:any){
  let finditem=null
  for(let i=0;i<arr.length;i++){
    let item=arr[i]
    // if(item.children.length==0){
    //   item.relation=""
    // }
    if(item.conditions.length>1){
      // finditem='('+conditionstr(item.conditions)+')'+' '+item.relation+' '
      finditem=`(${conditionstr(item.conditions)}) ${item.relation} `
    }else{
      // finditem=conditionstr(item.conditions)+' '+item.relation
      finditem=`${conditionstr(item.conditions)} ${item.relation} `
    }
    if(item.children.length>0){
      finditem+=ifdata(item.children)
    }else{
      break
    }
    
  }
  if(finditem!=null){
    let findlength=finditem.length
      if(finditem.substring(findlength-4,findlength)=="AND " || finditem.substring(findlength-3,findlength)=="OR "){
        finditem= finditem.substring(0,findlength-4)
      }
    return finditem
  }
  
}
function selectvalue(value:any){
  let values=null
    if(Array.isArray(value)){
      if(value.length>1){
        if(JSON.stringify(ifNameOpetions.value).includes(value[0])){
        let newvalue=value.map((strArr:any)=>[strArr])
         values=`{${JSON.stringify(newvalue).substring(1,JSON.stringify(newvalue).length-1).replace(/"/g,"")}}`
      }else{
         values=`{${JSON.stringify(value).replace("[","").replace("]","")}}`
      }
      }else{
        if(JSON.stringify(ifNameOpetions.value).includes(value[0])){
           values=JSON.stringify(value).replaceAll('"',"")
        }else{
           values=JSON.stringify(value).replace("[","").replace("]","")
        }
      }
    }else{
      if(JSON.stringify(ifNameOpetions.value).includes(value)){
        values=`[${value}]`
      }else{
        values=JSON.stringify(value)
      }
    }
    return values
}
// 解决括号链接
const conditionstr=(arr:any)=>{
  let ifcondition=null
  if(arr[arr.length-1].value){
        // delete arr[arr.length-1].selectvalues  
  }
  ifcondition=arr.map((item:any)=>{
      if(item.selectvalues){
        return `[${item.name}] ${item.operator} ${selectvalue(item.value)} ${item.selectvalues} `
        // return '['+item.name+']'+' '+item.operator+' '+'{'+item.value+'}'+' '+item.selectvalue+' '
      }else{
        // return '['+item.name+']'+' '+item.operator+' '+'{'+item.value+'}'+' '
        return `[${item.name}] ${item.operator} ${selectvalue(item.value)} `
      }    
  })
  return ifcondition.join("").toString().substring(0,ifcondition.join("").toString().length-4)
}

const rulesChange=(datas: any,key:string)=>{
    rulesData.value=datas//输出的条件对象 
}

// 定义Constraint (optional)的数据
let condata=ref<Array<any>>([])
  const keys=ref<any>(-1)
// 点击保存时触发数据填充表格
const conditionsend = () => {
      console.log(rulesData.value && thenObj.value.thenName && thenObj.value.thenOperator && thenObj.value.thenValue);
      
    if(rulesData.value && thenObj.value.thenName && thenObj.value.thenOperator && thenObj.value.thenValue){
      let thencondition
      if(typeof thenObj.value.thenValue=="number"){
        thencondition=`[${thenObj.value.thenName}] ${thenObj.value.thenOperator} ${thenObj.value.thenValue}`
      }else{
        thencondition=`[${thenObj.value.thenName}] ${thenObj.value.thenOperator} "${thenObj.value.thenValue}"`
        // console.log(thencondition);
      }

      let truerow={if:rulesData.value,then:{...thenObj.value}}
      
      
      if (keys.value>=0) {
        // console.log(1);
        
        finalModel.constraint[keys.value]={...truerow}
        finalModel.constraintif[keys.value]={if:ifdata(rulesData.value),then:thencondition,keys:keys.value}
        condata.value[keys.value]={if:ifdata(rulesData.value),then:{...thenObj.value},keys:keys.value}
      } else {
        // console.log(2);
        condata.value.push({if:ifdata(rulesData.value),then:{...thenObj.value},keys:condata.value.length})
        // // finalModel.constraint=[...finalModel.constraint,{...truerow}] 
        finalModel.constraint.push({...truerow})
        // // finalModel.constraintif=[...finalModel.constraintif,{...conrow,keys:condata.value.length}]
        finalModel.constraintif.push({if:ifdata(rulesData.value),then:thencondition,keys:condata.value.length})
        // console.log(condata.value);
      }
        // console.log(keys.value);
        keys.value=-1
      saveModel()
      
      // condata.value=conditionData(condata.value)
  }
  cancelbulid()
}
// 点击取消时触发的函数
const cancelbulid=()=>{
  keys.value=-1
  rulesData.value= [//初始化条件对象或者，已保存的条件对象
    {relation:"AND",
    id:1,
                conditions:[
                {
        name:'name',
        operator:"=",
        value:undefined,
        selectvalues:childselectvalue
      }
                ],
                children:[]}
  ],
  thenObj.value.thenName=''
  thenObj.value.thenOperator=''
  thenObj.value.thenValue=''
  childComponent.value=false
  showAddConstraintBtn.value = true;
}
// 点击修改的值
const editCon=(obj:any)=>{
  keys.value=obj.keys
  showAddConstraintBtn.value=false
if(finalModel.constraint.length>0){
    rulesData.value=finalModel.constraint[obj.keys].if
  thenObj.value.thenName=finalModel.constraint[obj.keys].then.thenName
  thenObj.value.thenOperator=finalModel.constraint[obj.keys].then.thenOperator
  thenObj.value.thenValue=finalModel.constraint[obj.keys].then.thenValue
}
  childComponent.value=true
}
// 点击删除触发的函数
const deleteconstraint = (obj: any) => {  
  if (childComponent.value) {
    return message.warning(t('templateManager.dynamicDelText'))
  }
  condata.value.splice(obj.keys,1)
  finalModel.constraint.splice(obj.keys,1)
  finalModel.constraintif.splice(obj.keys,1)
  saveModel()
}
const conditionshow=computed(()=>{
  if(rulesData.value[0].conditions.length>0){
    let strData=ifdata(rulesData.value)
        if(strData!.includes('undefined')){
          return ""
    }else{
      return ifdata(rulesData.value)
    }
    
  }
})
// 递归组件需要的数据
// const enableDeleteChild=ref(false)

const formDatas=ifNameOpetions
const valueData=ref()
let childrelation="AND"
let childselectvalue=childrelation
const rulesData=ref(
  [//初始化条件对象或者，已保存的条件对象
      {relation:childrelation,
      id:1,
      conditions:[{
        name:'name',
        operator:"=",
        value:undefined,
        selectvalues:childselectvalue
      }],
      children:[]}
  ]
)
let previewErrorMsg=ref("")
let prev=ref<boolean>(false);
let columnPreview=ref<any>()
let modelDataPreview=ref<any>()
let ids=JSON.parse(sessionStorage.getItem('dynamic_' + route.params._id)!)
let activeKey=ref("1")
const previewModel = async () => {
  let rst = await request.post('/api/templates'+`/${ids}/preview`)
  if (rst.error) {
  previewErrorMsg.value=rst.error
  } else {
  previewErrorMsg.value=""
  }
console.log(previewErrorMsg.value,rst);

  modelDataPreview.value=rst
  columnPreview.value=rst.model?.parameters.map((e:any)=>{
    return {
      title: e.property,
      dataIndex: e.property,
      key: e.property,
    }
  })

  prev.value=true

}

</script>



<template>

  <main style="height:100%;overflow-x: hidden!important;">

    <!-- ############ -->
    <!-- Options info -->
    <!-- ############ -->

    <div>
      <h2>{{ $t('templateManager.optionLabel') }}</h2>
      <a-form
          name="basic"
          :wrapper-col="{ span: 2 }"
          autocomplete="off"
      >
        <a-form-item :label="$t('templateManager.strategyLabel')">
          <a-select v-model:value="finalModel.option.strategy" :options="orderOptions"></a-select>
        </a-form-item>
      </a-form>
    </div>



    <!-- ############ -->
    <!-- Factors info -->
    <!-- ############ -->

    <div style="margin: 30px 0 8px 0;">
      <h2 style="display: inline;">{{ $t('templateManager.factorsLabel') }}</h2>
      <a-button v-if="showAddFactorBtn" @click="addNewFactor" class="editable-add-btn" style="margin-left: 12px;">
        {{ $t('templateManager.newFactor') }}
      </a-button>

    </div>


    <a-table v-if="finalModel.factor.length>0" :columns="factorColumns" :data-source="finalModel.factor" bordered>
      <template #headerCell="{ column }">
        <span>{{ $t(column.title) }}</span>
      </template>
      <template #bodyCell="{ column, text, record }">

        <template v-if='column.key==="name"'>
          <div>
            <a-input v-if="record.editing" v-model:value.trim="record.name" style="margin: -5px 0" />
            <template v-else>
              {{text}}
            </template>
          </div>
        </template>


        <template v-if='column.key==="type"'>
          <div>
            <!-- <a-form-item label="Type" name="type">
              <a-select ref="select" v-if="factorState.name===record.name" v-model:value="factorState.type" :options="typeOptions" @focus="focus"></a-select>
            </a-form-item>
            <a-input v-if="factorState.name===record.name" v-model:value="factorState.type" style="margin: -5px 0" /> -->
            <a-select ref="select" v-if="record.editing" v-model:value.trim="record.type" :options="typeOptions"
                      @focus="focus"></a-select>

            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>


        <template v-if="column.key === 'values'">
          <template v-if="record.editing">
            <template v-for="(tag) in record.values" :key="tag">
              <a-tooltip v-if="tag.length > 20" :title="tag">
                <a-tag :closable="true" :visible="true" @close="handleCloseTag(record, tag)">
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag v-else-if="tag.length==0"></a-tag>
              <a-tag v-else :closable="true" :visible="true" @close="handleCloseTag(record, tag)">
                {{tag}}
              </a-tag>
            </template>
            <a-input
                v-if="record.inputVisible && record.type=='string'"
                ref="inputRef"
                v-model:value.trim="record.inputValue"
                type="text"
                size="small" :style="{ width: '78px' }"
                @blur="handleFactorValueConfirm(record)"
                @keyup.enter="handleFactorValueConfirm(record)" />
            <a-input-number v-else-if="record.inputVisible && record.type=='number'" ref="inputRef" v-model:value.number="record.inputValue" type="text"
            size="small" :style="{ width: '78px' }" @blur="handleFactorValueConfirm(record)"
            @keyup.enter="handleFactorValueConfirm(record)" />
            <a-tag v-show="!record.inputVisible" style="background: #fff; border-style: dashed; cursor: pointer;" @click="newFactorValueInput(record)">
              <plus-outlined />
              {{ $t('common.newValue') }}
            </a-tag>
          </template>

          <span v-else>
            <a-tag v-for="tag in record.values" :key="tag" color="cyan">
              {{ tag }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <div class="editable-row-operations">
            <span v-if="record.editing">
              <a-typography-link type="danger" @click="saveFactor(record)">{{ $t('common.saveText') }}</a-typography-link>
              <a-divider type="vertical" />

                <a @click="cancelFactor(record)">{{ $t('common.cancelText') }}</a>
            </span>

            <span v-else>
              <a @click="editFactor(record)">{{ $t('component.table.edit') }}</a>
              <a-divider type="vertical" />
              <a-popconfirm
                  :title="$t('templateManager.delFactor')"
                  :ok-text="$t('common.yesText')"
                  :cancel-text="$t('common.noText')"
                  @confirm="deleteFactor(record)" @cancel="cancel">
                <a>{{ $t('common.delText') }}</a>
              </a-popconfirm>
            </span>

          </div>
        </template>
      </template>
    </a-table>




    <!-- ################ -->
    <!-- Constraints info -->
    <!-- ################ -->

    <div style="margin: 30px 0px 8px 0px;">
      <h2 style="display: inline;">{{ $t('templateManager.constraintLabel') }}</h2>
      <a-button v-if="showAddConstraintBtn" @click="addNewConstraint" class="editable-add-btn"
                style="margin-left: 12px;">{{ $t('templateManager.newConstraint' )}}</a-button>
    </div>
    <a-table :columns="columns" :data-source="condata" bordered>
      <template #headerCell="{ column }">
        <span>{{ $t(column.title) }}</span>
      </template>
      <template  #bodyCell="{ column, text, record }">
        <template v-if="column.key==='then'">

          <span v-show="typeof record.then.thenValue=='number'">{{`[${record.then.thenName}] ${record.then.thenOperator} ${record.then.thenValue}`}}</span>
          <span v-show="typeof record.then.thenValue=='string'">{{`[${record.then.thenName}] ${record.then.thenOperator} "${record.then.thenValue}"`}}</span>
        
        </template>
        <template v-if="column.key=='action'">
          <span>
            <a @click="editCon(record)">{{ $t('common.editText') }}</a>
              <a-divider type="vertical" />
              <a-popconfirm
              
                  :title="$t('templateManager.delConstraint')"
                  :ok-text="$t('common.yesText')"
                  :cancel-text="$t('common.noText')"
                  @confirm="deleteconstraint(record)" @cancel="cancel">
                <a >{{ $t('common.delText') }}</a>
              </a-popconfirm>
          </span>
        </template>
      </template>
    </a-table>
    <a-divider/>
    <div v-if="childComponent">
      <!-- <condition :factorsconditional="conditional" @parentdata="ondata"></condition> -->
    <a-row style="backgroundColor:white">
      <a-col :span="12" style="padding-top: 10px;">
        <h2 style="display: flex; align-items: center;">{{ $t('component.table.if') }}
          <div style="font-size: 14px; margin-left: .625rem;">{{conditionshow}}</div>
        </h2>
        <hr/>
        <div style="margin-top: .625rem; ">
        <create-rule :keys="keys" :formDatas="formDatas" :valueData="valueData" :rulesData="rulesData" @rulesChange="rulesChange"></create-rule>
      </div>
      </a-col>
      <a-divider type="vertical" />
      <a-col :span="11" style="margin-left: .625rem; padding-top: .625rem;">
        <h2 style="display: flex; justify-content: space-between;">{{ $t('component.table.then') }}
          <div style="display: flex;">
                    <a-button type="primary" @click='conditionsend'>{{ $t('common.saveText') }}</a-button>
                    <a-button @click="cancelbulid">{{ $t('common.cancelText') }}</a-button>
                </div>
        </h2>
        
        <hr/>
        <div style="margin-top: .625rem;">
          
                <a-form layout="inline" style="margin-top:1.25rem;">
                <a-form-item :label="$t('component.table.name')">
                    <a-select :options="ifNameOpetions" v-model:value="thenObj.thenName"></a-select>
                </a-form-item>
                <a-form-item :label="$t('component.table.operator')">
                    <a-select :options="ifOperatorOptions" v-model:value="thenObj.thenOperator"></a-select>
                </a-form-item>
                <a-form-item :label="$t('component.table.values')">
                    <a-select :options="ifValueOpetions" v-model:value="thenObj.thenValue"></a-select>
                </a-form-item>
                
            </a-form>
                
        </div>
      </a-col>
    </a-row>
      
    </div>
    <div style="margin-top: 1.875rem">
      <a-button type="primary" @click="saveModel" class=""
                style="margin-bottom: 8px">{{ $t('templateManager.saveModel') }}</a-button>
                <a-button @click="previewModel()">{{ $t('common.preview') }}</a-button>
    </div>
    <a-modal v-model:visible="prev" :title="modelId? 'Model preview':'Model preview'" :width="900">

<!-- Model meta info -->

<a-tabs v-model:activeKey="activeKey">
  <a-tab-pane key="1" tab="Data">
          <a-table v-if="!previewErrorMsg" :columns="columnPreview" :data-source="modelDataPreview.data" bordered>
        
        
        
            <template #bodyCell="{ column, text, record }">
      <!--          <template v-if='column.key==="name"'><div>{{ text }}</div></template>-->
      <!--          <template v-if='column.key==="age"'><div>{{ text }}</div></template>-->
      <!--          <template v-if='column.key==="address"'><div>{{ text }}</div></template>-->
          {{ text }}
        </template>
      </a-table>
      <p v-else style="color:#ff4d4f;">{{previewErrorMsg}}</p>
  </a-tab-pane>
  <a-tab-pane key="2" tab="Model" >
    <pre>{{ JSON.stringify(toRaw(modelDataPreview.model), null, 2) }}</pre>
  </a-tab-pane>
</a-tabs>
<!-- <h2>Data</h2> -->
<!-- <a-table :columns="columnPreview" :data-source="modelDataPreview.data" bordered>
  <template #bodyCell="{ column, text, record }"> -->
<!--          <template v-if='column.key==="name"'><div>{{ text }}</div></template>-->
<!--          <template v-if='column.key==="age"'><div>{{ text }}</div></template>-->
<!--          <template v-if='column.key==="address"'><div>{{ text }}</div></template>-->
    <!-- {{ text }}
  </template>
</a-table> -->
<!-- <template #footer> -->
<!--        <a-button @click="closeModel">Cancel</a-button>-->
<!-- </template> -->

<!-- <h2>Model</h2>
<pre>{{ JSON.stringify(toRaw(modelDataPreview.model), null, 2) }}</pre> -->
</a-modal>

    <!-- <header class="block shadow">
      <a-row>
        <a-col :span="20">
          <AForm layout="inline" class="search_form" :model="formState" @finish="handleFinish"
            @finishFailed="handleFinishFailed" :wrapper-col="{ span: 24 }">
            <a-col :span="20">

              <a-mentions v-model:value="formState.search"
                placeholder="input @ to search tags, input name to search Dynamic Templates">
                <a-mentions-option value="tags:">
                  tags:
                </a-mentions-option>
              </a-mentions>
            </a-col>

            <a-col :span="4">
              <a-button type="primary" html-type="submit">search</a-button>
            </a-col>

          </AForm>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="showModal">
            <template #icon>
              <plus-outlined />
            </template>
          </a-button>
        </a-col>
      </a-row>
    </header> -->


    <!-- 模态窗 -->

    <!-- <div>
      <a-modal v-model:visible="visibleModel"
        :title="modelState._id? 'Update a Dynamic Template':'Create a New Dynamic Template'" @cancel="closeModel"
        @ok="handleOk" :width="900">


        <h2>Model</h2>

        <a-form ref="refModelForm" autocomplete="off" :model="modelState" :rules="modelRules" name="basic"
          :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-form-item label="Name" name="name">
            <a-input v-model:value="modelState.name" />
          </a-form-item>

          <a-form-item label="Description" name="description">
            <a-input v-model:value="modelState.description" />
          </a-form-item>

          <a-form-item label="Tag" name="tags">
            <template v-for="(tag) in modelState.tags" :key="tag">
              <a-tooltip v-if="tag.length > 20" :title="tag">
                <a-tag :closable="true" @close="handleCloseTag(tag)">
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag v-else-if="tag.length==0"></a-tag>
              <a-tag v-else :closable="true" @close="handleCloseTag(tag)">
                {{tag}}
              </a-tag>
            </template>
            <a-input v-if="modelState.inputVisible" ref="inputRef" v-model:value="modelState.inputValue" type="text"
              size="small" :style="{ width: '78px' }" @blur="handleModelTagConfirm"
              @keyup.enter="handleModelTagConfirm" />
            <a-tag v-else style="background: #fff; border-style: dashed" @click="newModelTagInput">
              <plus-outlined />
              Add a New Tag
            </a-tag>
          </a-form-item>
        </a-form>

        <template #footer>
          <a-button @click="closeModel">Cancel</a-button>
          <a-button @click="saveModel" type="primary" class="btn_ok">Save</a-button>
        </template>


      </a-modal>
    </div> -->




    <!-- ######################### -->
    <!-- List of dynamic templates -->
    <!-- ######################### -->

    <!-- <ATable ref="tableRef" class="table" rowKey="key" :dataSource="dataSource" :columns="columns"
      :pagination="pagination" :loading="tableLoading" bordered @resizeColumn="tableResize"
      :rowSelection="{ selectedRowKeys, onChange: onTableRowSelectChange }">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <edit-outlined />
            Name
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">

          <a :href="'/#/mbtmodeler/'+ record.name">{{ record.name }}</a>
        </template>

        <template v-else-if="column.key === 'description'">

          {{ record.description }}

        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag v-for="tag in record.tags" :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>

        <template v-else-if="column.key === 'action'">
          <span>
            <a @click="editModel(record)">Edit</a>
            <a-divider type="vertical" />
            <a-popconfirm title="Are you sure delete this Dynamic Template?" ok-text="Yes" cancel-text="No"
              @confirm="deleteModel(record._id)" @cancel="cancel">
              <a>Delete</a>
            </a-popconfirm>
          </span>
        </template>
      </template>


    </ATable> -->
    <!-- </section> -->
  </main>
</template>

<style lang="postcss" scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  margin-bottom: 1rem;
}

footer {
  margin-top: 1rem;
}

∏ .table {
  width: 100%;
  height: 100px;
  flex: 1;
  background-color: #fff;
  border-radius: 0.7rem;
}
</style>
<style lang="less">
.ant-card-body{
  padding:0 1rem;
}
</style>