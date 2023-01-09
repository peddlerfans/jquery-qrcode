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
  getCurrentInstance,
  unref, watch
} from 'vue';
import { useRouter } from 'vue-router';

import useTable from '@/composables/useTable';
import request from '@/utils/request';
import {
  templateUrl
} from '@/appConfig'
import * as _ from 'lodash'
import { cloneDeep } from 'lodash-es';
import type {
CascaderProps,
  FormProps,
  SelectProps,
} from 'ant-design-vue';
import {
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SwapOutlined,
} from '@ant-design/icons-vue';
import {
  message
} from 'ant-design-vue/es'
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
import { useI18n } from "vue-i18n";
import { CommonTable } from '@/components/basic/common-table'
import { SearchBar } from '@/components/basic/search-bar'

const { t } = useI18n()

// Specify the api for dynamic template data CRUD
const url = templateUrl;

// 表格数据
const column = [
  { title: "name", width: 40, link: 'codegenModeler', require: true },
  { title: "description", width: 120, require: true },
  { title: "tags", width: 100 },
  { title: "action", width: 100, actionList: ['edit', 'delete', 'clone'] },
]
const codegenTableQuery = {
  url,
  searchText: '',
  createParams: 'codegen'
}
let codegenTable = ref<any>(null)

const tableRef = ref()

// 点击跳转metamodel
let router = useRouter()

const showModal = () => {
  codegenTable.value.createNewRow({
    name: '',
    description: '',
    tags: []
  })
}

// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  let reg=/^[a-zA-Z0-9\$][a-zA-Z0-9\d_]*$/
  let reg1=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
  if (!value) {
    return Promise.reject(t('templateManager.nameinput'))
  } else if(!reg.test(value) && !reg1.test(value)){
    return Promise.reject(t('templateManager.namehefa'))
  }else{
    let rst=await request.get("/api/templates",{params:{q:"category:codegen",search:`@name:${value}`}})
    if(rst.data && rst.data.length>0 && rst.data[0].name==value){
      return Promise.reject(t('templateManager.duplicate'))
    }else{
      return Promise.resolve();
    }
  }
}

let refCopy=ref()
let copyRule:Record<string,Rule[]>={
  name:[{required:true,validator:checkName,trigger:'blur'}],
}
let copyData:any = ref ({
  name:""
})
let copyVisible = ref<boolean>(false)
const clone = (record:any) => {

    copyData.value.name = `${record.name}_clone`
    
    
    copyData.value = {...record,name:copyData.value.name}
    copyVisible.value = true
}
const copyOk=()=>{
  unref(refCopy).validate().then(async ()=>{
    delete copyData.value._id
   request.post('/api/templates',copyData.value).then((rst :any)=>{
    let tableData = codegenTable.value.getTableData()
    tableData.unshift(rst)
    codegenTable.value.setTableData(tableData)
    // let tableindex = metaTable.value.indexOf(copyData.value)
    if(rst && rst._id){
      // metaTable.value[tableindex]._id=rst._id
      copyVisible.value = false
    }
   })
   
  })
}
const clearValida =()=>{
  refCopy.value.clearValidate()
}

function handleSearch(str: string) {
  codegenTable.value.query(str)
}

function handleChange(str: string) {
  codegenTableQuery.searchText = str
}

</script>

<template>
  <main style="height:100%;overflow-x: hidden!important;">
    <header class="block shadow">
      <!-- 表单的查询 -->
      <a-row>
        <a-col :span="20">
          <search-bar
              url="/api/templates/_tags"
              :params="{ q: 'category:codegen'}"
              @change="handleChange"
              @search="handleSearch"
          ></search-bar>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="showModal">
            <template #icon>
              <plus-outlined />
            </template>
            {{ $t('templateManager.newCodegenTemp') }}
          </a-button>
        </a-col>
      </a-row>
    </header>
    <common-table
        ref="codegenTable"
        :columns="column"
        tableRef="codegenTemplateTable"
        :fetchObj="codegenTableQuery"
        @clone="clone"
    ></common-table>
    <a-modal v-model:visible="copyVisible" :title="$t('component.table.clone')" @ok="copyOk" :ok-text="$t('common.okText')" :cancel-text="$t('common.cancelText')" @cancel="clearValida">
      <AForm :model="copyData" ref="refCopy" :rules="copyRule">
          <a-form-item name="name" :label="$t('component.table.name')">
            <a-input v-model:value="copyData.name"></a-input>
          </a-form-item>
      </AForm>
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
<style>

</style>
