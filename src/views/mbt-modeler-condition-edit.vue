<script lang="ts">
export default {
  name:"CreateRule",
  mixins:[],
}
</script>
<script lang="ts" setup>
import { message, SelectProps } from 'ant-design-vue';
import { computed, onMounted, ref } from 'vue';
import InputSelectItem from '@/components/basic/itea-schema-item/input-select-item.vue'

let props=defineProps(['rulesData','keys','formDatas','topDatas','enableDeleteChild','autoIndex'])
let emit=defineEmits(['changeObserver','rulesChange'])

let selectvalue=ref('AND')
const  relations=[{
  label: "AND",
  value:"AND"
},{
  label: "OR",
  value:"OR"
}]

const allOptions = [
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
  },
  {
    value: 'LIKE',
    label: 'LIKE',
  },
  {
    value: 'includes',
    label: 'includes',
  },
  {
    value: 'indexOf',
    label: 'indexOf'
  }
]

// 条件判断中的比较符号
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

const arrayOptions = [
  {
    value: 'includes',
    label: 'includes',
  },
  {
    value: 'indexOf',
    label: 'indexOf'
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

const titleStyle=computed(()=>{
  if(props.rulesData[0]?.relation=="AND"){
    return {backgroundColor:'#ffd591'}
  }else{
    return {backgroundColor:"#91d5ff"}
  }
})

const changeObserver=()=>{
  emit("changeObserver", props.rulesData)
}

function addCondition(){
  props.rulesData[0].conditions.push({
    name: '',
    operator: '',
    value: '' ,
    selectvalues: '',
  })
  rulesChange(props.rulesData)
}

function addChild(){
  props.rulesData[0].children.push({
    relation: '',
    id: props.rulesData[0].id+1,
    conditions:[
      {
        name: '',
        operator: '',
        value: '',
        selectvalues: '',
      }
    ],
    children:[]
  })
  rulesChange(props.rulesData)
}
function deleteChild (index: any){
  let conditionDelete = props.topDatas && props.topDatas[0].children && props.topDatas[0].children.length > 0
  if(conditionDelete){
    props.topDatas[0].children.splice(index, 1)
  }
  rulesChange(props.rulesData)
}
function daeteCondition(index: any){
  props.rulesData[0].conditions.splice(index, 1)
  if(props.rulesData[0].conditions.length==0){
    deleteChild(index)
  }
  rulesChange(props.rulesData)
}
function childChange(childData: any){
  rulesChange(childData)
}
function rulesChange(rulesData:any,){
  changeObserver()
  emit("rulesChange", props.rulesData, props.keys)
}

function inputSelectChange(str: string, index: number, type: number) {
  if (type === 1) props.rulesData[0].conditions[index].name = str
  if (type === 2) props.rulesData[0].conditions[index].value = str
  emit("rulesChange", props.rulesData, props.keys)
}

function getTypeOption(type: string) {
  switch (type) {
    case 'string': {
      return stringOptions
    }
    case 'array': {
      return arrayOptions
    }
    default: {
      return numberOptions
    }
  }
}

const checkrelation=(obj:any)=>{
  if (!obj) return
  if(obj=="AND" || obj=="&&"){
    props.rulesData[0].relation="OR"
    selectvalue.value="OR"
    props.rulesData[0].conditions[0].selectvalues="OR"
    // childrelation=props.rulesData[0].relation
  }else if(obj=="OR" || obj=="||"){
    props.rulesData[0].relation="AND"
    selectvalue.value="AND"
    props.rulesData[0].conditions[0].selectvalues="AND"
  }
}

</script>

<template>
  <div class="rules-box" :class="[props.rulesData[0]?.id%2==0 ? 'bgc-box':'bgc-box1']">
    <div :style="titleStyle" class="title"  @click="checkrelation(props.rulesData[0]?.relation)">{{props.rulesData[0]?.relation || 'AND'}}</div>
    <div class="ant-card-body" >
      <template v-for="(item, index) in rulesData[0]?.conditions || []" :key="'condition'+index">
        <a-row  class="loop-child">
          <input-select-item
              style="width: 100%;"
              v-model:model-value="item.name"
              :options="formDatas"
              @update:modelValue="(str: string) => inputSelectChange(str, index, 1)"
          ></input-select-item>
          <a-select
              style="width: 100%;"
              class="condition"
              v-model:value="item.operator"
              @change="rulesChange"
              :options="allOptions"
              size="small"
              placeholder="operator"
          ></a-select>
          <input-select-item
              style="width: 100%;"
              v-model:model-value="item.value"
              :options="formDatas"
              @update:modelValue="(str: string) => inputSelectChange(str, index, 2)"
          ></input-select-item>
          <a-button
              class="button-select"
              @click="daeteCondition(index)"
              title="delete"
              size="small"
          >delete</a-button>
        </a-row>
      </template>

    </div>
    <mbt-modeler-condition-edit
        style="margin-left:35px"  v-if="rulesData[0]?.children?.length > 0"
        :formDatas="formDatas"
        :topDatas="rulesData"
        :rulesData="rulesData[0].children"
        :enableDeleteChild="true"
        @rulesChange="childChange"
        @changeObserver="changeObserver"
    ></mbt-modeler-condition-edit>
    <a-row class=" loop-childs" >
      <a-button
          v-if="enableDeleteChild"
          class="button-select button-loop"
          title="delete filter"
          size="small"
          @click="deleteChild(autoIndex)"
      >delete</a-button>
      <a-button
          class="button-select"
          title="Add inner group"
          size="small"
          @click="addChild"
      >Add inner group</a-button>
      <a-button
          class="button-select"
          title="Add filter"
          size="small"
          @click="addCondition"
      >Add filter</a-button>
    </a-row>
  </div>
</template>

<style lang="less" scoped>
@import 'ant-design-vue/es/style/color/colors.less';
.box{
  width: 100%;
}
.bgc-box{
  background-color: @cyan-2;
}
.bgc-box1{
  background-color: white;
}
.rules-box{
  margin-left: 1.25rem;
  border-left: 1px solid @blue-6;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  position: relative;
  .title{
    text-align: center;
    cursor: pointer;
    width: 2rem;
    position:absolute;
    top:50%;
    transform:translateY(-50%);
    -webkit-transform:translate(-50%,-50%);
    background-color: @orange-3;
    border-radius: .625rem;
  }
  .loop-child{
    width:100%;
    padding:10px 0 10px 12px;
    line-height:1;
    &:hover :nth-child(4){
      visibility: visible;
    }
    & :nth-child(4){
      visibility: hidden;
    }
    .button-select{
      cursor:pointer;
      margin-right:0.5em;
    }
    .condition{
      width: 96px;
      height: 24px;
      line-height: 24px;
      margin-right: 0.5rem;
    }
  }
}
.loop-childs{
  width:100%;
  position:relative;
  padding:10px 0 10px 12px;
  line-height:1;
  .button-select{
    cursor:pointer;
    margin-right:0.5em;
    visibility: hidden;
  }
  &:hover button{
    visibility: visible;
  }
}
</style>
