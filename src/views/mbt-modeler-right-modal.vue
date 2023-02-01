<script setup lang="ts">
import {computed, createVNode, ref, watch} from "vue";
import MbtModelerAwSchema from './mbt-modeler-aw-schema.vue'
import { MbtData } from "@/stores/modules/mbt-data";
import { MBTStore } from '@/stores/MBTModel'
import VueForm from "@lljj/vue3-form-ant";
import _ from "lodash";
import { useI18n } from 'vue-i18n'
import MbtModelerConditionEdit from "@/views/mbt-modeler-condition-edit.vue";

// import testParser from "@/api/parser.js"
// console.log(testParser.parse('url == "a" && (file == "file" && resolution == "1080P") && videotype == "在线视频"'));
let o = '(LeftRightMove == "-20°" && ExceptResult == "65537") && is_support == "False" || (is_explorer == "False") || ExceptResult == "null" && (DownUpMove == "-20°" && Brightness == "1000lux")'
// let pegData = testParser.parse('(LeftRightMove == "-20°" && ExceptResult == "65537") && is_support == "False" || (is_explorer == "False") || ExceptResult == "null" && (DownUpMove == "-20°" && Brightness == "1000lux")')


function childleft(data:any){

if(data?.conditionleft?.left){
  data.conditionleft = {name:data.conditionleft.left.name , operator:data.conditionleft.operator , value:data.conditionleft.right.name}
}else{
childleft(data?.conditionleft?.conditionleft)
}

return data.conditionleft
}
function childright(data:any){

if(data.conditionright && data.conditionright.conditionleft){
  childright(data.conditionright.conditionleft)
  }else{
  console.log(data);
  
  data.conditionright = {name:data.left.name , operator:data.operator , value:data.right?.name}
}
return data.conditionright
}



function digui(data: any){
  let obj :any
  if( data.conditionleft ){
     obj = Object.assign(data , childleft(data.conditionleft), childright(data.conditionright))
  }else{
    obj = {name:data.left.name , operator:data.operator ,value:data.right.value}
  }
  return obj
}
// console.log(digui(pegData.body[0].expression));


function condition(data :any){
  if(data.left && data.right && data.operator){
    return {name:data.left.name , operator:data.operator ,value: data.right.name}
  }
}

const store = MBTStore()
const { t } = useI18n()
const storeAw = MbtData()
const emit = defineEmits(['change'])
const rulesDataDefaultItem = {
  relation: 'AND',
  id: 1,
  conditions: [
    {
      name: 'name',
      operator: '=',
      value: undefined,
      selectvalues: 'AND',
    }
  ],
  children: [],
}
const keys = 1
let show = ref(false)
let showAw = ref<boolean>(false)
let showDrawer = ref(false)
let AwDom = ref()
let schemaData = ref({})
let data:any = ref({})
let awSchemaData = ref()
let props = defineProps(['currentEl'])
let showCondition = ref(true)
const ifGroupRulesData = ref<any>([_.cloneDeep(rulesDataDefaultItem)])
const ifGroupOption = ref<any>([])
const isIfGroup = ref<boolean>(false)
awSchemaData.value = props.currentEl
// 复杂条件编辑的逻辑
let formDatas = computed(() => {
  return storeAw.getDataPoolTableColumns.map((e: any) => {
    return {
      value: e.title,
      label: e.title
    }
  })
})
 
let childValue = computed(() => {
  return storeAw.getDataPoolTableData.length > 0
      ? valueOption(storeAw.getDataPoolTableData)
      : []
})
let valueData = childValue

function valueOption(arr: any) {
  let newArr = Object.keys(arr[0])
  let setArr = newArr.map((item: any) => ({ name: item, type: '', values: [] }))
  arr.forEach((item: any, index: any) => {
    let keys = Object.keys(arr[0])
    if (keys) {
      setArr.forEach((tureItem: {type: string; name: string; values: any[]; }, i: any) => {
        if(tureItem.name==keys[i]){
          tureItem.type = typeof item[keys[i]]
          tureItem.values.push(item[keys[i]])
        }
        tureItem.values=[...new Set(tureItem.values)]
      })
    }
  })
  return setArr
}

// 递归改变if结构
function ifdata(arr: any) {
  let finditem = null;
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (item.relation == "AND") {
      item.relation = "&&";
    }
    if (item.relation == "OR") {
      item.relation = "||";
    }
    if (item.conditions.length > 1) {
      // finditem='('+conditionstr(item.conditions)+')'+' '+item.relation+' '
      finditem = `(${conditionstr(item.conditions)}) ${item.relation} `;
    } else {
      // finditem=conditionstr(item.conditions)+' '+item.relation
      finditem = `${conditionstr(item.conditions)} ${item.relation} `;
    }
    if (item.children.length > 0) {
      finditem += ifdata(item.children);
      // if
    } else {
      break;
    }
  }
  if (finditem != null) {
    let findlength = finditem.length;
    if (
      finditem.substring(findlength - 3, findlength) == "&& " ||
      finditem.substring(findlength - 3, findlength) == "|| "
    ) {
      finditem = finditem.substring(0, findlength - 3);
    }

    return finditem;
  }
}
function selectvalue(value: any) {
  let values = null;
  if (Array.isArray(value)) {
    if (value.length > 1) {
      if (JSON.stringify(formDatas.value).includes(value[0])) {
        let newvalue = value.map((strArr: any) => [strArr]);
        values = `{${JSON.stringify(newvalue)
          .substring(1, JSON.stringify(newvalue).length - 1)
          .replace(/"/g, "")}}`;
      } else {
        values = `{${JSON.stringify(value).replace("[", "").replace("]", "")}}`;
      }
    } else {
      if (JSON.stringify(formDatas.value).includes(value[0])) {
        values = JSON.stringify(value).replaceAll('"', "");
      } else {
        values = JSON.stringify(value).replace("[", "").replace("]", "");
      }
    }
  } else {
    if (JSON.stringify(formDatas.value).includes(value)) {
      values = `[${value}]`;
    } else {
      values = JSON.stringify(value);
    }
  }
  return values;
}

function expr2js(expr: string) {
  if (/^{{([a-zA-Z0-9_]+)}}$/.test(expr)) {
    // @ts-ignore
    return /^{{([a-zA-Z0-9_]+)}}$/.exec(expr)[1]
  } else if (/{{([a-zA-Z0-9_]+)}}/gm.test(expr)) {
    return "`" + expr.replaceAll(/{{([a-zA-Z0-9_]+)}}/gm, "${$1}") + "`"
  } else {
    return JSON.stringify(expr)
  }
}

// 解决括号链接
const conditionstr = (arr: any) => {
  let ifcondition = null;
  ifcondition = arr.map((item: any) => {
    if (item.operator == "=") {
      item.operator = "==";
    }
    if (item.selectvalues) {
      if (item.selectvalues == "AND") {
        item.selectvalues = "&&";
      }
      if (item.selectvalues == "OR") {
        item.selectvalues = "||";
      }
      return `${expr2js(item.name)} ${item.operator} ${expr2js(item.value)} ${item.selectvalues} `;
    } else {
      return `${expr2js(item.name)} ${item.operator} ${expr2js(item.value)} `;
    }
  });

  return ifcondition
    .join("")
    .toString()
    .substring(0, ifcondition.join("").toString().length - 4);
};

const rulesData :any = ref([rulesDataDefaultItem])
function rulesChange (datas: any, key: string) {
  rulesData.value = datas
}
watch(
  rulesData,  
  (newvalue: any) => {
    if (rulesData.value.length > 0) {
      if ( showDrawer.value && _.has(data.value , 'label')){
        data.value.label = ifdata(newvalue);
        rulesData.value = newvalue
        if (data.value.label == 'name == undefined ') {          
          data.value.label = ''
        }
      }
    }
  },
  { deep: true }
);

function handleAwData () {
  const el = storeAw.getShowData
  const checkAwProps = el.getPropertiesSchema()
  storeAw.setEditingPrimaryAw(checkAwProps.step)
  storeAw.setEditingExpectedAw(checkAwProps.expectation)
  storeAw.setDescription(checkAwProps.description)
  showAw.value = true
  AwDom.value.handleData()
}

function handleData() {
  const el = storeAw.getShowData
  showDrawer.value = false
  
  if (el.attributes.source && el.attributes.target) {
    const sourceId = el.attributes.source.id
    const targetId = el.attributes.target?.id
    if (sourceId) {
      const sourceEl = el.graph.getCell(sourceId)
      showDrawer.value = sourceEl.attributes.type === 'itea.mbt.test.MBTExclusiveGateway'
    }
  }
  schemaData.value = _.cloneDeep(el.getPropertiesSchema())
  data.value = _.cloneDeep(el.getPropertiesData())

  if(data.value.rulesData) {
    if (data.value.rulesData.length == 0) {
      data.value.rulesData = [_.cloneDeep(rulesDataDefaultItem)]
    }
    rulesData.value = data.value.rulesData
  }
  showCondition.value = formDatas.value.length > 0
  show.value = true
}

function getType () {
  const el = storeAw.getShowData
  return el?.attributes?.type || ''
}

function setGroupConditionData() {
  const arr: any = []
  // 当前模型变量名
  arr.push({
    label: '返回变量名',
    options: storeAw.getAllCustomVar(2)
  })
  // data pool 数据
  arr.push({
    label: 'Data Pool',
    options: storeAw.getDataPoolTableColumns.map((a: any) => {
      return {
        value: `{{${a.title}}}`,
        label: a.title
      }
    }).filter((b: any) => b.label !== 'action' && b.label !== 'key')
  })
  ifGroupOption.value = arr
  isIfGroup.value = true
  const el = storeAw.getShowData
  showDrawer.value = false
  schemaData.value = el.getPropertiesSchema()
  const temp = el.getPropertiesData()
  data.value = {
    condition: temp.condition || '',
    description: temp.description || ''
  }
  ifGroupRulesData.value = temp.rulesData || [_.cloneDeep(rulesDataDefaultItem)]
  show.value = true
}

function result2Condition(arr: any) {

}

function ifGroupRulesChange(rulesData: any) {
  ifGroupRulesData.value = rulesData
  data.value.condition = ifdata(rulesData)
  emit('change', getType(), Object.assign({
    rulesData: rulesData,
  }, data.value))
}

function handleShowData () {
  showAw.value = false
  show.value = false
  const type = getType()
  isIfGroup.value = false
  switch (type) {
    case 'itea.mbt.test.MBTAW': {
      handleAwData()
      break
    }
    case 'itea.mbt.test.MBTLink':
    case 'itea.mbt.test.link': {
      handleData()
      break
    }
    case 'itea.mbt.test.MBTGroup': {
      handleData()
      break
    }
    case 'itea.mbt.test.MBTIfGroup': {
      setGroupConditionData()
      break
    }
    case 'itea.mbt.test.MBTSection': {
      handleData()
      break
    }
  }
}

function handleChange() {
  if(data.value.description == undefined){
      data.value.description = ''
    }
  if( _.has(data.value , 'rulesData')){
    data.value.rulesData = rulesData.value
    if(data.value.label == undefined){
      data.value.label = ''
    }
  }
  emit('change', getType(), data.value)
}

defineExpose({
  handleShowData
})

function openSelect(){
  store.saveChooseDataPool( true )
}

</script>

<template>
  <div class="mbt-modeler-right-modal-wrap">
    <mbt-modeler-aw-schema 
      v-show="showAw"
      ref="AwDom"
      :show="showAw"
      @change="handleChange"
      :awSchemaData = "awSchemaData"
    ></mbt-modeler-aw-schema>
    <VueForm  v-show="show" :schema="schemaData" v-model="data" @change="handleChange">
      <div v-if="showDrawer" slot-scope="{ linkSchemaValue }">
        <create-rule
          v-show="showCondition"
          :keys="keys"
          :formDatas="formDatas"
          :valueData="valueData"
          :rulesData="rulesData"
          @rulesChange="rulesChange"
        ></create-rule>
        <div v-show="!showCondition">
          <p style="color:red">{{ $t('common.goDataPool') }}</p>
          <a-button size="small" @click="openSelect" type="primary">设置</a-button>
        </div>
      </div>
      <mbt-modeler-condition-edit
        v-if="isIfGroup"
        key="1"
        :form-datas="ifGroupOption"
        :rules-data="ifGroupRulesData"
        @rulesChange="ifGroupRulesChange"
      ></mbt-modeler-condition-edit>
    </VueForm>
  </div>
</template>

<style scoped lang="less">
.mbt-modeler-right-modal-wrap {
  margin: 8px 4px;
  .desc-wrap {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
}
</style>