<script setup lang="ts">
import { ref, reactive, UnwrapRef, onMounted, nextTick, unref, watch } from 'vue';
import { CascaderProps, FormProps, message  } from 'ant-design-vue';
import {  PlusOutlined} from '@ant-design/icons-vue';
import request from "@/utils/request"
import { tableSearch, statesTs} from './componentTS/metatemplate';
import cloneDeep from 'lodash-es/cloneDeep';
import { useI18n } from "vue-i18n";
import { useRouter,onBeforeRouteLeave } from 'vue-router';
import { Rule } from 'ant-design-vue/es/form';
import { RadarChart } from 'echarts/charts';
import { CommonTable } from '@/components/basic/common-table'
import { SearchBar } from '@/components/basic/search-bar'

// table data
let metaTable = ref<any>(null)
const column = [
  { title: "name", width: 40, link: 'metaModeler', require: true },
  { title: "description", width: 120, require: true },
  { title: "tags", width: 100 },
  { title: "action", width: 100, actionList: ['edit', 'delete', 'clone'] },
]

const metaTableQuery = {
  url: '/api/templates',
  searchText: '',
  createParams: 'meta'
}

const { t } = useI18n()
const createMeta = () => {
  metaTable.value.createNewRow({
    name: '',
    description: '',
    category: 'meta',
    tags: []
  })
}

let checkName=async (_rule:Rule,value:string)=>{
  let reg=/^[a-zA-Z\$_][a-zA-Z\d_]*$/
  let reg1=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
  if(!value){
    return Promise.reject(t('templateManager.nameinput'))
  }else if(!reg.test(value) && !reg1.test(value)){
    return Promise.reject(t('templateManager.namehefa'))
  }else{
    let rst=await request.get("/api/templates",{params:{q:"category:meta",search:`@name:${value}`}})
      if(rst.data && rst.data.length>0 && rst.data[0].name==value){
        // message.error("Duplicate name")
        // modelstates.value.name=""

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
    let tableData = metaTable.value.getTableData()
    tableData.unshift(rst)
    metaTable.value.setTableData(tableData)
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
  metaTable.value.query(str)
}

function handleChange(str: string) {
  metaTableQuery.searchText = str
}

</script>

<template>
  <main style="v-show:100%;overflow-x: hidden!important;">
      <header class="block shadow" style="width:100%;margin-bottom: 1rem">
        <a-row>
        <a-col :span="20">
          <search-bar
              url="/api/templates/_tags"
              :params="{ q: 'category:meta'}"
              @change="handleChange"
              @search="handleSearch"
          ></search-bar>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="createMeta">
            <template #icon>
              <plus-outlined />
            </template>
          </a-button>
        </a-col>
      </a-row>
      </header>
    <common-table
        ref="metaTable"
        :columns="column"
        tableRef="metaTemplateTable"
        :fetchObj="metaTableQuery"
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

<style scoped lang="postcss">
.main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
