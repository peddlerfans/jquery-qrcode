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
    return {if:ifdata(e.if),then:ifdata(e.then),keys:index}
  })
  valueData.value=finalModel.factor
  factorsTable.value.setTableData(finalResult.model!.factor || [])
  constraintTable.value.setTableData(finalResult.model.constraintif)
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
      if (rst) {
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

// Initialize an obj for a single factor
let factorState = reactive<Factor>({
  name: '',
  type: '',
  values: [],
  editing: true,
  inputVisible: false,
  inputValue: '',
})

let newValue = ref();
let showAddFactorBtn = ref(true)

const addNewFactor = () => {
  factorsTable.value.createNewRow({
    name: '',
    type: '',
    values: []
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
  rulesData.value = datas//输出的条件对象

}
const thenrulesChange=(datas: any,key:string)=>{
  thenrulesData.value = datas//输出的条件对象

}


// 定义Constraint (optional)的数据
let condata=ref<Array<any>>([])
  const keys=ref<any>(-1)
// 点击保存时触发数据填充表格
const conditionsend = () => {
    if(rulesData.value && thenrulesData.value){
      let truerow={if:rulesData.value,then:thenrulesData.value}
      if (keys.value>=0) {
        finalModel.constraint[keys.value]={...truerow}
        finalModel.constraintif[keys.value]={if:ifdata(rulesData.value),then:ifdata(thenrulesData.value),keys:keys.value}
        condata.value[keys.value]={if:ifdata(rulesData.value),then:ifdata(thenrulesData.value),keys:keys.value}
      } else {
        condata.value.push({if:ifdata(rulesData.value),then:ifdata(thenrulesData.value),keys:condata.value.length})
        finalModel.constraint.push({...truerow})
        finalModel.constraintif.push({if:ifdata(rulesData.value),then:ifdata(thenrulesData.value),keys:condata.value.length})
      }
        keys.value=-1
      saveModel()
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
    thenrulesData.value= [//初始化条件对象或者，已保存的条件对象
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
const thenrulesData=ref(
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

// factors table
let factorsTable = ref<any>(null)
const factorsColumn = [
  { title: 'name', width: 180 },
  { title: 'type', width: 180, option: '2' },
  { title: 'values', width: 180 },
  { title: 'action', width: 100, actionList: ['edit', 'delete'] },
]
// 点击保存回调
const saveFactorRow = (row: any) => {
  let temp = row.index
  delete row.index
  finalModel.factor.splice(temp, 1, row)
  factorsTable.value.setTableData(finalModel.factor)
}
const deleteFactor = (record: Factor) => {
  const index= finalModel.factor.findIndex(e => JSON.stringify(e) === JSON.stringify(record))
  if (index === -1) return
  finalModel.factor.splice(index,1)
  factorsTable.value.setTableData(finalModel.factor)
  message.success(t('component.message.delText'))
}

// constraint table
let constraintTable = ref<any>(null)
const constraintColumn = [
  { title: 'if', width: 120 },
  { title: 'then', width: 120 },
  {
    title: 'action',
    width: 60,
    cbName: ['edit', 'delete'],
    actionList: ['edit', 'delete']
  }
]
// 点击修改的值
const editCon = (obj: any) => {
  keys.value = obj.keys
  if (finalModel.constraint.length > 0) {
    rulesData.value = finalModel.constraint[obj.keys].if
    thenObj.value.thenName = finalModel.constraint[obj.keys].then.thenName
    thenObj.value.thenOperator = finalModel.constraint[obj.keys].then.thenOperator
    thenObj.value.thenValue = finalModel.constraint[obj.keys].then.thenValue
  }
  childComponent.value = true
}
const deleteconstraint = (obj:any) => {
  condata.value.splice(obj.keys, 1)
  finalModel.constraint.splice(obj.keys, 1)
  finalModel.constraintif.splice(obj.keys, 1)
  saveModel()
}

const handleOk = () => {
  prev.value = false
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
    <!-- ############ -->
    <!-- Factors info -->
    <!-- ############ -->

    <div style="margin: 30px 0 8px 0;">
      <h2 style="display: inline;">{{ $t('templateManager.factorsLabel') }}</h2>
      <a-button @click="addNewFactor" class="editable-add-btn" style="margin-left: 12px;">
        {{ $t('templateManager.newFactor') }}
      </a-button>

    </div>
    <common-table
        ref="factorsTable"
        :columns="factorsColumn"
        tableRef="factorsTable"
        @save="saveFactorRow"
        @delete="deleteFactor"
    ></common-table>

    <!-- ################ -->
    <!-- Constraints info -->
    <!-- ################ -->

    <div style="margin: 30px 0px 8px 0px;">
      <h2 style="display: inline;">{{ $t('templateManager.constraintLabel') }}</h2>
      <a-button v-if="showAddConstraintBtn" @click="addNewConstraint" class="editable-add-btn"
                style="margin-left: 12px;">{{ $t('templateManager.newConstraint' )}}</a-button>
    </div>
    <common-table
        ref="constraintTable"
        :columns="constraintColumn"
        tableRef="constraintTable"
        @edit="editCon"
        @delete="deleteconstraint"
    ></common-table>
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

            <!-- <a-form layout="inline" style="margin-top:1.25rem;">
                <a-form-item :label="$t('component.table.name')">
                    <a-select :options="ifNameOpetions" v-model:value="thenObj.thenName"></a-select>
                </a-form-item>
                <a-form-item :label="$t('component.table.operator')">
                    <a-select :options="ifOperatorOptions" v-model:value="thenObj.thenOperator"></a-select>
                </a-form-item>
                <a-form-item :label="$t('component.table.values')">
                    <a-select :options="ifValueOpetions" v-model:value="thenObj.thenValue" v-if="thenObj.thenOperator !=='IN'"></a-select>
                    <a-select :options="ifValueOpetions" mode="multiple" v-model:value="thenObj.thenValue" v-else></a-select>
                </a-form-item>
            </a-form> -->
        <create-rule :keys="keys" :formDatas="formDatas" :valueData="valueData" :rulesData="thenrulesData" @rulesChange="thenrulesChange"></create-rule>

        </div>
      </a-col>
    </a-row>

    </div>
    <div style="margin-top: 1.875rem">
      <a-button type="primary" @click="saveModel" class=""
                style="margin-bottom: 8px">{{ $t('templateManager.saveModel') }}</a-button>
                <a-button @click="previewModel()">{{ $t('common.preview') }}</a-button>
    </div>
    <a-modal v-model:visible="prev" :title="$t('templateManager.previewModel')" :width="900">
    <!-- Model meta info -->
      <a-tabs v-model:activeKey="activeKey">
        <a-tab-pane key="1" :tab="$t('templateManager.data')">
          <a-table v-if="!previewErrorMsg" :columns="columnPreview" :data-source="modelDataPreview.data" bordered :scroll="{ x: true }">
            <template #bodyCell="{ column, text, record }">
              {{ text }}
            </template>
          </a-table>
          <p v-else style="color:#ff4d4f;">{{previewErrorMsg}}</p>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="$t('templateManager.template')" >
          <pre>{{ JSON.stringify(toRaw(modelDataPreview.model), null, 2) }}</pre>
        </a-tab-pane>
      </a-tabs>
      <template #footer>
        <a-button key="back" @click="handleOk">{{ $t('common.cancelText') }}</a-button>
        <a-button key="submit" type="primary" @click="handleOk">{{ $t('common.okText') }}</a-button>
      </template>
    </a-modal>

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
