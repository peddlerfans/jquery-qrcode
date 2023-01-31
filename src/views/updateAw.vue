<script setup lang="ts">
import request from "@/utils/request"
import { message, SelectProps } from "ant-design-vue";
import { Rule } from "ant-design-vue/es/form";
import { nextTick, onMounted, reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import {PlusOutlined} from '@ant-design/icons-vue'
import { routerKey, useRoute, useRouter } from "vue-router";
import { tableSearch, FormState, paramsobj, ModelState, statesTs ,clickobj} from "./componentTS/awmodeler";
import { AnyKindOfDictionary } from "lodash";
import { identifier } from "@babel/types";
import { CommonTable } from '@/components/basic/common-table'
import {func} from "vue-types";
import {checkVarName} from "@/utils/validator";

const { t } = useI18n()

async function query (data?:any) {
  let rsts=await request.get(`/api/hlfs/${data}`)
  if(rsts){
    modelstates.value={...rsts} as any
    if(!modelstates.value.returnType) modelstates.value.returnType = ''
    awParamsTable.value.setTableData(modelstates.value.params)
    states.tags=rsts.tags!
    sessionStorage.setItem("awData"+route.params._id,JSON.stringify(rsts))
  }
}
let route=useRoute()

let router=useRouter()

// 判断是否是详情还是编辑操作
let canEdit = ref(!router.currentRoute.value.query?.canEdit)

// table data
let awParamsTable = ref<any>(null)
const regs: any = [
  {
    required: true,
    validator: checkVarName,
    trigger: 'blur'
  }
]
let awParamsColumn: any = [
  { title: "name", width: 280, require: true, regs },
  { title: "description", width: 100 },
  { title: "type", width: 60, option: '3' },
  { title: "enum", width: 100 },
  { title: "default", width: 100 }
]

if (canEdit.value) awParamsColumn.push({
  title: "action",
  width: 140,
  actionList: ['edit', 'delete', 'check', 'up', 'down']
})

const returnTypeOptions = [
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
    value: 'array',
    label: 'array'
  },
  {
    value: 'int',
    label: 'int',
  },
  {
    value: 'SUT',
    label:'SUT'
  }
]

const deleteParams = (row: any) => {
  let tableData = awParamsTable.value.getTableData()
  const index= tableData.findIndex((e: any) => JSON.stringify(e) === JSON.stringify(row))
  if (index === -1) return
  tableData.splice(index,1)
  awParamsTable.value.setTableData(tableData)
  message.success(t('component.message.delText'))
}



onMounted(()=>{
  if(route.params._id){
  sessionStorage.setItem('awupdate_'+route.params._id,JSON.stringify(route.params._id))
  sessionStorage.setItem('awupdate_'+route.params.awupdate,JSON.stringify(route.params.awupdate))
  let str:any=route.params.mbtid
  localStorage.setItem("mbt" + route.params.mbtid + route.params.mbtname + "id", str)
  localStorage.setItem("mbt_" + route.params.mbtname+"aw" , JSON.stringify(route.params.mbtname))
}
  let getId:any=sessionStorage.getItem('awupdate_'+route.params._id)
  query(JSON.parse(getId))

})
let returnInput = ref('')
let returnRef = ref()
let returnVisibal = ref(false)
let modelstates = ref<ModelState>({
  key:0,
  name: '',
  description: '',
  template: "",
  template_en: "",
  validationError:"",
  returnType: '',
  _id: "",
  params:[],
  tags:[],
  path:""
});


// 新添加一条params数据
const addNewParams = () => {
  awParamsTable.value.createNewRow({
    required :false,
    name : '',
    description : '',
    type : '',
    enum : []
  })
}

const showreturnInput = () => {
  returnVisibal.value = true;
  nextTick(() => {
    returnRef.value.focus();
  })
};


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
let getId:any=sessionStorage.getItem('awupdate_'+route.params._id)
let getupdate:any=sessionStorage.getItem('awupdate_'+route.params.awupdate)
let getmbtId=localStorage.getItem("mbt" + route.params.mbtid + route.params.mbtname + "id")
let getmbtname=localStorage.getItem("mbt_" +route.params.mbtname+"aw" )
// 修改函数
async function updateAw(url:string,data:any) {
  delete data._id
  let rst = await request.put(url, data)
  if(rst){
    canEdit.value=false
    awParamsColumn = awParamsColumn.filter((a: any) => a.title !== 'action')
    awParamsTable.value.changeColumn(awParamsColumn)
  }

}

let refForm=ref()
const onFinishForm = () => {
  refForm.value.validate().then(async (res:any)=>{
    
    modelstates.value.tags=states.tags
    modelstates.value.params = awParamsTable.value.getTableData()
    if (modelstates.value.params.some((a: any) => a.editing))
      return message.warning(t('component.message.tableEditingWarn'))
    const id = route.params?._id
    if (!id) return
    await updateAw(`/api/hlfs/${id}`, modelstates.value)
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
        _id: route.params?.mbtid,
        name:JSON.parse(getmbtname!)
      }
    })
  }
};

const editAw = () => {
  canEdit.value=true
  awParamsColumn.push({
    title: "action",
    width: 140,
    actionList: ['edit', 'delete', 'check', 'up', 'down']
  })
  awParamsTable.value.changeColumn(awParamsColumn)
}


let disable=ref(false)
let rst:any=route.params.name

// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  let reg=/^[a-zA-Z\$][a-zA-Z\d_]*$/
  if (!value) {
    return Promise.reject(t('component.message.emptyName'))
  }else if(rst == value){
    disable.value=false
    return Promise.resolve();
  }else  if(!reg.test(value) ){
    return Promise.reject(t('component.message.hefaName'))
  }else{
    let rst=await request.get("/api/hlfs",{params:{q:`name:${value}`,search:''}})
    if(rst.data && rst.data.length>0 && rst.data[0].name==value){
      // message.error("Duplicate name")
      // modelstates.value.name=""
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
    return Promise.reject(t('component.message.emptyDescription'))
  }else  {
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
    disable.value=false
    return Promise.resolve();
  }

}
let checktem = async (_rule: Rule, value: string) => {
  // let reg=/^[a-zA-Z\_$][a-zA-Z\d_]*$/
  if (!value) {
    return Promise.reject(t('awModeler.emptyTemp'))
  }else{
    disable.value=false
    return Promise.resolve()
  }
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
      <a-form-item :label="$t('component.table.returnType')" name="returnType">
        <a-select
            :disabled="!canEdit"
            v-model:value="modelstates.returnType"
            :options="returnTypeOptions"
            style="width: 120px;"
        ></a-select>
        </a-form-item>

      <a-form-item
          :label="$t('component.table.params')"
          name="params"  >
        <a-button @click="addNewParams" v-if="canEdit">{{$t('awModeler.addParams')}}</a-button>
      </a-form-item>
    </a-form>
    <common-table
        ref="awParamsTable"
        :columns="awParamsColumn"
        tableRef="awParamsTable"
        @delete="deleteParams"
    ></common-table>
    <div v-if="modelstates.validationError" style="color:red">
      <p>{{modelstates.validationError}}</p>
    </div>
    <div>
      <a-button typr="primary" @click="editAw" v-if="!canEdit">{{$t("common.editText")}}</a-button>
      <a-button type="primary" @click="onFinishForm" :disabled="disable" v-if="canEdit">{{$t("common.saveText")}}</a-button>
      <a-button @click="onFinishFailedForm">{{$t("common.back")}}</a-button>
    </div>

  </div>
</template>


<style scoped>

</style>
