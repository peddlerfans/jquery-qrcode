<script setup lang="ts">
import {
  ref,
  reactive,
  UnwrapRef,
  nextTick,
  unref, watch
} from 'vue';
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';
import request from '@/utils/request';
import {
  templateUrl
} from '@/appConfig'
import type {
CascaderProps,
  FormProps,
} from 'ant-design-vue';
import {
  PlusOutlined
} from '@ant-design/icons-vue';
import { Rule } from 'ant-design-vue/es/form';
import {
  FormState
} from "./componentTS/dynamictemplate";
import { CommonTable } from '@/components/basic/common-table'

// 表格数据
const column = [
  { title: "name", link: 'dynamicModeler', require: true },
  { title: "description", require: true },
  { title: "tags" },
  { title: "action", actionList: ['edit', 'delete', 'clone'] }
]
const dynamicTableQuery = {
  url: '/api/templates',
  searchText: '',
  createParams: 'dynamic'
}
let dynamicTable = ref<any>(null)

const { t } = useI18n()
const url = templateUrl
// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
  search: '',
  q: "category:dynamic",
});

watch(
    () => formState.search,
    (value) => {
      dynamicTableQuery.searchText = value
    }
)

// 表格的数据
let tableData = ref<Array<any>>([])

// 点击跳转metamodel
let router = useRouter()

const handleFinish: FormProps['onFinish'] = (values: any) => {
  dynamicTable.value.query(formState.search)
};

// Catch search failed
const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => {
  console.log(errors);
};

let searchInput = ref()
let cascder = ref(false)
let selectvalue:any = ref("")
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
      let rst = await request.get("/api/templates/_tags", { params: { q: "category:dynamic" } })
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

const showModal = () => {
  dynamicTable.value.createNewRow({
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
    let rst=await request.get("/api/templates",{params:{q:"category:dynamic",search:`@name:${value}`}})
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
    let tableData = dynamicTable.value.getTableData()
    tableData.unshift(rst)
    dynamicTable.value.setTableData(tableData)
    if(rst && rst._id){
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
    <header class="block shadow">
      <!-- 表单的查询 -->
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
          <a-button type="primary" @click="showModal">
            <template #icon>
              <plus-outlined />
            </template>
            {{ $t('templateManager.createDynamicTemp') }}
          </a-button>
        </a-col>
      </a-row>
    </header>
    <!-- ######################### -->
    <!-- List of dynamic templates -->
    <!-- ######################### -->
    <common-table
        ref="dynamicTable"
        :columns="column"
        tableRef="dynamicTemplateTable"
        :fetchObj="dynamicTableQuery"
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
