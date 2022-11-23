<script setup lang="ts">
import { ref, reactive, UnwrapRef, onMounted, nextTick, unref, watch } from 'vue';
import { CascaderProps, FormProps, message  } from 'ant-design-vue';
import {  PlusOutlined} from '@ant-design/icons-vue';
import request from "@/utils/request"
import { tableSearch ,FormState, statesTs} from './componentTS/metatemplate';
import cloneDeep from 'lodash-es/cloneDeep';
import { useI18n } from "vue-i18n";
import { useRouter,onBeforeRouteLeave } from 'vue-router';
import { Rule } from 'ant-design-vue/es/form';
import { CommonTable } from '@/components/basic/common-table'

// 表格数据
let staticTable = ref<any>(null)
const staticTableQuery = {
  url: '/api/templates',
  searchText: '',
  noPage: true,
  createParams: 'static'
}
const column = [
  { title: "name", link: 'staticModeler', require: true },
  { title: "description", require: true },
  { title: "tags" },
  { title: "action", actionList: ['edit', 'delete'] },
]

const { t } = useI18n()
let tableloading=ref(false)
// 表单查询的数据
const formState: UnwrapRef<FormState> = reactive({
      search: '',
      q:'category:static'
});
watch(
    () => formState.search,
    (value) => {
      staticTableQuery.searchText = value
    }
)
// 表单完成后的回调
const handleFinish: FormProps['onFinish'] = async (values: any) => {
  formState.search = ''
  staticTable.value.query(formState.search)
};
// 表单失败后的回调
const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => {
      console.log(errors);
};

let searchInput = ref()
let cascder = ref(false)
let selectvalue = ref("")
let selectoptions:any = ref([
  {
    value: 'tags:',
    label: 'tags:',
    isLeaf: false,
  },
  {
    value: 'name:',
    label: 'name:',

  },
])
const loadData: CascaderProps['loadData'] = async (selectedOptions:any  ) => {
  console.log(selectedOptions);
  let rst = await request.get("/api/templates/_tags", { params: { q: "category:static" } })
  const targetOption = selectedOptions[0];
  targetOption.loading = true
  if (rst.length > 0) {
    rst = rst.map((item: any) => ({ value: item, label: item }))
    targetOption.children = rst
  }
  targetOption.loading = false;
  selectoptions.value = [...selectoptions.value];
};
const onSelectChange = async (value: any) => {
  if (value) {
    let reg = new RegExp("," ,"g")
    formState.search += value.toString().replace(reg,'')
  }
  selectvalue.value = ''
  cascder.value = false
  nextTick(() => {
    searchInput.value.focus()
  })
}
const inputChange = (value: any) => {
  if (formState.search == "@") {
    cascder.value = true
  }
}


const createMeta=()=>{
  staticTable.value.createNewRow({
    name: '',
    description: '',
    category: 'static',
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
    let rst=await request.get("/api/templates",{params:{q:"category:static",search:`@name:${value}`}})
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
    let tableData = staticTable.value.getTableData()
    tableData.unshift(rst)
    staticTable.value.setTableData(tableData)
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

</script>

<template>
  <main style="height:100%;overflow-x: hidden!important;">
      <header class="block shadow" style="width:100%;margin-bottom: 1rem">
        <a-row>
        <a-col :span="20">
          <AForm layout="inline" class="search_form" :model="formState" @finish="handleFinish"
            @finishFailed="handleFinishFailed" :wrapper-col="{ span: 24 }">
            <a-col :span="20">


              <a-input v-model:value="formState.search"
              :placeholder="$t('awModeler.inputSearch1')"
              @change="inputChange"
              ref="searchInput"
              >
              </a-input>
              <a-cascader
              v-if="cascder"
              :load-data="loadData"
              v-model:value="selectvalue"
              placeholder="Please select"
              :options="selectoptions"
              @change="onSelectChange"
              ></a-cascader>
            </a-col>

            <a-col :span="4">
              <a-button type="primary" html-type="submit">{{ $t('common.searchText') }}</a-button>
            </a-col>
          </AForm>
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
        ref="staticTable"
        :columns="column"
        tableRef="staticTemplateTable"
        :fetchObj="staticTableQuery"
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
