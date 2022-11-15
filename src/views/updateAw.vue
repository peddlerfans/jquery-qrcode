<script setup lang="ts">
import request from "@/utils/request"
import { message, SelectProps } from "ant-design-vue";
import { Rule } from "ant-design-vue/es/form";
import { nextTick, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import {PlusOutlined} from '@ant-design/icons-vue'
import { routerKey, useRoute, useRouter } from "vue-router";
import { tableSearch, FormState, paramsobj, ModelState, statesTs ,clickobj} from "./componentTS/awmodeler";
const { t } = useI18n()


async function query(data?:any){
    let rsts=await request.get(`/api/hlfs/${data}`)
    if(rsts){
        modelstates.value={...rsts} as any
        states.tags=rsts.tags!
        sessionStorage.setItem("awData"+route.params._id,JSON.stringify(rsts))
    }
}
let route=useRoute()

let router=useRouter()

// 判断是否是详情还是编辑操作
let canEdit = ref(!router.currentRoute.value.query?.canEdit)
// console.log(canEdit)

if(route.params._id){
  sessionStorage.setItem('awupdate_'+route.params._id,JSON.stringify(route.params._id))
sessionStorage.setItem('awupdate_'+route.params.awupdate,JSON.stringify(route.params.awupdate))
let str:any=route.params.mbtid
localStorage.setItem("mbt_" + route.params.mbtid + route.params.mbtname + "_id", str)
localStorage.setItem("mbt_" + route.params.mbtname+"aw" , JSON.stringify(route.params.mbtname))

}

onMounted(()=>{
  let getId:any=sessionStorage.getItem('awupdate_'+route.params._id)
  query(JSON.parse(getId))

})

let modelstates = ref<ModelState>({
  key:0,
  name: '',
  description: '',
  template: "",
  template_en:"",
  _id: "",
  params:[],
  tags:[],
  path:""
});
// 点击添加params的函数
let obj = ref<paramsobj>({ name: "", type: "" ,enum:[],inputVisible:false,inputValue:'',editing:false})

// params的表格结构
const paramsColum = [
{
    title: 'component.table.paramsName',
    dataIndex: 'name',
    key: 'name',
    width:180
  },
  {
    title: 'component.table.type',
    dataIndex: 'type',
    key: 'type',
    width:100
  },
  {
    title: 'component.table.enum',
    dataIndex: 'enum',
    key: 'enum',
    width:180
  }
]
if (canEdit) paramsColum.push( {
  title: 'component.table.action',
  dataIndex: 'action',
  key: 'action',
  width:100
})
// 新添加一条params数据
const addNewParams = () => {
  modelstates.value.params.push({
    name: '',
    type: '',
    enum: [],
    editing: true,
    inputVisible: true,
    inputValue: ''
  })
}
// 添加params的enu
const handleCloseTag = (record: any, removedTag: string) => {
  const tags = record.enum.filter((tag: string) => tag !== removedTag);
  record.enum = tags;
};
const handleFactorValueConfirm = (record: any) => {
  let values = record.enum;
  if (record.inputValue && values.indexOf(record.inputValue) === -1) {
    values = [...values, record.inputValue];
  }
  Object.assign(record, {
    enum: values,
    inputVisible: false,
    inputValue: '',
  });
}
// 点击取消修改或添加params的函数
const cancelparams = (record:any) => {
  if (obj.value.name === ''){
    const index= modelstates.value.params.findIndex(e => e === record)
    modelstates.value.params.splice(index,1);
  }else{
    record.name = obj.value.name
    record.type = obj.value.type
    states.tags=obj.value.enum
    record.editing = false
  }
  clearFactorState()
}
let inputRefs=ref()
const newFactorValueInput = (record: any) => {
  record.inputVisible = true;

  nextTick(() => {
    inputRefs.value.focus();
  })
};
// 清空赋值params单行的数据
const clearFactorState = () => {
  obj.value.name = ''
  obj.value.type = ''
  obj.value.enum = []
  obj.value.editing = true
  obj.value.inputVisible = false
  obj.value.inputValue = '';

  // (instance?.refs.refFactorForm as any).resetFields();
}
// 点击保存params的函数
const saveparams = async (record: any) => {
  record.editing = false
  clearFactorState()
}
// 点击修改params触发的函数
const editparams = (record:any) => {
  if (!canEdit.value) return
  obj.value.name = record.name
  obj.value.type = record.type
  obj.value.enum = record.values
  record.editing = true
}
// 点击删除params的函数
const delmodel = (record: any) => {
  const index= modelstates.value.params.findIndex(e => e === record)
  modelstates.value.params.splice(index,1);
  message.success(t('component.message.delText'));
}
// 添加的表单tags
let inputRef = ref();
let states = reactive<statesTs>({
  tags: [],
  inputVisible: false,
  inputValue: '',
});

const handleClose = (removedTag: string) => {

  const tags = states.tags.filter((tag: string) => tag !== removedTag);
  states.tags = tags;
};

const showInput = () => {
  states.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
    })
};

const handleInputConfirm = () => {
  let tags = states.tags;
  if (states.inputValue && tags.indexOf(states.inputValue) === -1) {
    tags = [...tags, states.inputValue.toUpperCase()];
  }
  Object.assign(states, {
    tags,
    inputVisible: false,
    inputValue: '',
 });
}
let getupdate:any=sessionStorage.getItem('awupdate_'+route.params.awupdate)
let getmbtId=localStorage.getItem("mbt_" + route.params.mbtid + route.params.mbtname + "_id")
let getmbtname=localStorage.getItem("mbt_" +route.params.mbtname+"aw" )
// 修改函数
async function updateAw(url:string,data:any) {
  delete data._id
  let rst = await request.put(url, data)
  console.log(JSON.parse(getupdate));
  if(rst && JSON.parse(getupdate)=="awmodeler"){
    message.success(t('component.message.modifiedText'))
            router.push("/awmodeler/index")
    }else if(rst && JSON.parse(getupdate)=="mbtAW"){
      router.push({
        name:"mbtmodeler",
        params:{
          _id:getmbtId,
          name:JSON.parse(getmbtname!)
        }
      })
    }
}

let refForm=ref()
// const validator = new Schema(descriptor);
const onFinishForm = () => {  
  // console.log(modelstates.value);
  
  refForm.value.validate().then(async (res:any)=>{
    modelstates.value.tags=states.tags
     await updateAw(`/api/hlfs/${modelstates.value._id}`, modelstates.value)
  }).catch((error:any)=>{
    disable.value=true

  })


    }
  const onFinishFailedForm = (errorInfo: any) => {
    if(JSON.parse(getupdate)=="awmodeler"){
        router.push("/awmodeler/index")
    }else if(JSON.parse(getupdate)=="mbtAW"){
      router.push({
        name:"mbtmodeler",
        params:{
          _id:getmbtId,
          name:JSON.parse(getmbtname!)
        }
      })
    }
  };
// 模态窗表单
const optiones = ref<SelectProps['options']>([
      {
        value: 'str',
        label: 'str',
      },
      {
        value: 'float',
        label: 'float',
      },
      {
        value: 'boolean',
        label: 'boolean',
    },
      {
        value: 'number',
        label: 'number',
    },
    {
        value: 'int',
        label: 'int',
    },
    {
      value: 'SUT',
        label:'SUT'
      }
]);
const editAw = () => {
  // if (canEdit) {
    canEdit.value=true
  // }
}
    
 
let disable=ref(false)
let rst:any=route.params.name

// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  let reg=/^[a-zA-Z\$][a-zA-Z\d_]*$/
  let reg1=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
  if (!value) {
    disable.value=true
    return Promise.reject(t('component.message.emptyName'))
  }else if(rst==value){

    disable.value=false
    return Promise.resolve();
  }else  if(!reg.test(value)  && !reg1.test(value)){
    disable.value=true
      return Promise.reject(t('component.message.hefaName'))
    }else{
    let rst=await request.get("/api/hlfs",{params:{q:`name:${value}`,search:''}})
      if(rst.data && rst.data.length>0 && rst.data[0].name==value){
        // message.error("Duplicate name")
        // modelstates.value.name=""
        disable.value=true
        return Promise.reject(t('component.message.depName'))
      }else{
        disable.value=false
        return Promise.resolve();

      }
  }

}
let checkDesc = async (_rule: Rule, value: string) => {
  // let reg=/^[a-zA-Z\_$][a-zA-Z\d_]*$/
  if (!value) {
    disable.value=true
    return Promise.reject(t('component.message.emptyDescription'))
  }else  {
    // if(!reg.test(value)){
    //   return Promise.reject('The AW description is not standardized')
    // }else{
      if(modelstates.value.description==value){
        disable.value=false
      return Promise.resolve()
    }else{
      let rst=await request.get("/api/hlfs",{params:{search:modelstates.value.description}})

      if(rst.data && rst.data.length>0 && rst.data[0].description==value){
        disable.value=true
        return Promise.reject(t('component.message.dupDescription'))
      }
    }
    // }
    disable.value=false
    return Promise.resolve();
  }

}
let checktem = async (_rule: Rule, value: string) => {
  // let reg=/^[a-zA-Z\_$][a-zA-Z\d_]*$/
  if (!value) {
    disable.value=true
    return Promise.reject(t('awModeler.emptyTemp'))
  }else{
    disable.value=false
    return Promise.resolve()
  }
  // else if(!reg.test(value)){
  //     return Promise.reject('The AW name is not standardized')
  // }

}
let rules: Record<string, Rule[]> = {
  name: [{ required: true, validator: checkName, trigger: 'blur' }],
  description: [{ required: true, validator: checkDesc, trigger: 'change' }],
  template: [{ required: true, validator: checktem, trigger: 'change' }],
}
</script>
<template>
    <div>
        <a-form
        ref="refForm"
      :model="modelstates"
      name="basic"
      :rules="rules"
      :label-col="{ span: 2 }"
      :wrapper-col="{ span: 12 }"
      autocomplete="off"
      >
      <a-form-item
        :label="$t('component.table.name')"
        name="name"
      >
      <!-- <template #suffix v-if="modelstates.name"><edit-outlined /></template> -->

        <a-input v-model:value="modelstates.name" v-if="canEdit" />
        <span v-else>{{ modelstates.name }}</span>
        <!-- <span v-else>{{modelstates.name}}</span> -->
      </a-form-item>

      <a-form-item
          :label="$t('component.table.description')"
        name="description"
      >
        <a-input v-model:value="modelstates.description" v-if="canEdit" />
        <span v-else>{{ modelstates.description }}</span>
      </a-form-item>

      <a-form-item
          :label="$t('component.table.template')"
        name="template"
      >
        <a-input v-model:value="modelstates.template" v-if="canEdit" />
        <span v-else>{{ modelstates.template }}</span>
      </a-form-item>
      <a-form-item
          :label="$t('component.table.template_en')"
        name="template_en"
      >
        <a-input v-model:value="modelstates.template_en" v-if="canEdit" />
        <span v-else>{{ modelstates.template_en }}</span>
      </a-form-item>

<!-- tags标签 -->
      <a-form-item
        :label="$t('component.table.tags')"
        name="tags" >
      <template v-for="(tag, index) in states.tags" :key="tag">
        <a-tooltip v-if="tag.length > 20" :title="tag">
          <a-tag :closable="true" @close="handleClose(tag)">
            {{ `${tag.slice(0, 20)}...` }}
          </a-tag>
        </a-tooltip>
        <a-tag v-else-if="tag.length==0"></a-tag>
        <a-tag v-else :closable="canEdit" @close="handleClose(tag)">
          {{tag}}
        </a-tag>
      </template>
          <a-input
            v-show="states.inputVisible"
            ref="inputRef"
            v-model:value="states.inputValue"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
        <a-tag
            v-show="!states.inputVisible && canEdit"
            style="background: #fff; border-style: dashed"
            @click="showInput">
          <plus-outlined />
          {{ $t('common.newTag') }}
        </a-tag>
      </a-form-item>
      <a-form-item
          :label="$t('component.table.params')"
          name="params"  >
        <a-button @click="addNewParams" v-if="canEdit">{{$t('awModeler.addParams')}}</a-button>
      </a-form-item>
      </a-form>

        <a-table v-if="modelstates.params.length>0" :columns="paramsColum" :data-source="modelstates.params" bordered>
          <template #headerCell="{ column }">
            <span>{{ $t(column.title) }}</span>
          </template>
          <template #bodyCell="{column,text,record}">
            <template v-if='column.key==="name"'>
              <a-input v-if="record.editing" v-model:value.trim="record.name" style="margin: -5px 0" />
            <template v-else>
              {{text}}
            </template>
            </template>
              <template v-if='column.key==="type"'>
               <div>
                <a-select ref="select" v-if="record.editing" v-model:value.trim="record.type" :options="optiones"
                ></a-select>
              <template v-else>
                {{ text }}
              </template>
               </div>
              </template>
              <template v-if="column.key === 'enum'">
                <div>
          <template v-if="record.editing">
            <template v-for="(tag) in record.enum" :key="tag">
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
            <a-input v-if="record.inputVisible || record.type=='string'" ref="inputRefs" v-model:value.trim="record.inputValue" type="text"
                     size="small" :style="{ width: '78px' }" @blur="handleFactorValueConfirm(record)"
                     @keyup.enter="handleFactorValueConfirm(record)" />
            <a-input-number v-else-if="record.inputVisible && record.type=='number'" ref="inputRefs" v-model:value.number="record.inputValue" type="text"
            size="small" :style="{ width: '78px' }" @blur="handleFactorValueConfirm(record)"
            @keyup.enter="handleFactorValueConfirm(record)" />
            <a-tag v-else style="background: #fff; border-style: dashed" @click="newFactorValueInput(record)">
              <plus-outlined />
              {{ $t('common.newValue') }}
            </a-tag>
          </template>

          <span v-else>
            <a-tag v-for="tag in record.enum" :key="tag" color="cyan">
              {{ tag }}
            </a-tag>
          </span>
        </div>
        </template>
        <template v-if="column.key === 'action'">
          <div class="editable-row-operations">
            <span v-if="record.editing">
              <a-typography-link type="danger" @click="saveparams(record)" style="font-size:16px">{{ $t('common.saveText' )}}</a-typography-link>
              <a-divider type="vertical" />
            <a @click="cancelparams(record)">{{$t('common.cancelText') }}</a>
            </span>
            <span v-else>
              <a-button type="link" @click="editparams(record)" :disabled="!canEdit">{{ $t('component.table.edit') }}</a-button>
              <a-divider type="vertical" />
              <a-popconfirm
                  
                  :title="$t('component.message.sureDel')"
                  @confirm="delmodel(record)"
                  :cancel-text="$t('common.cancelText')"
                  :ok-text="$t('common.okText')">
              <a-button type="link"  style="margin-left:10px;margin-right:10px;font-size:16px;" :disabled="!canEdit">{{ $t('common.delText') }}</a-button>
            </a-popconfirm>
            </span>
          </div>
        </template>
            </template>
        </a-table>
        <div>
          <a-button typr="primary" @click="editAw" v-if="!canEdit">Edit</a-button>
            <a-button type="primary" @click="onFinishForm" :disabled="disable" v-if="canEdit">Save</a-button>
            <a-button @click="onFinishFailedForm">Cancel</a-button>
        </div>
    </div>
</template>


<style scoped>

</style>
