<script setup lang="ts">
import { useI18n } from "vue-i18n";
import request from "@/utils/request";
import useTable from "@/composables/useTable";
import { mockMBTUrl, realMBTUrl } from "@/appConfig";
import { message } from "ant-design-vue/es";
import * as _ from "lodash";
import { Stores } from "../../types/stores";
import {
  ref,
  reactive,
  computed,
  onBeforeMount,
  defineComponent,
  UnwrapRef,
  onMounted,
  nextTick,
  watch,
  getCurrentInstance,
unref,
} from "vue";
import type { CascaderProps, FormProps, SelectProps, TableProps, TreeProps } from "ant-design-vue";
import { tableSearch, FormState, ModelState, statesTs } from "./componentTS/mbtmodeler";
import { Rule } from "ant-design-vue/es/form";
import { PlusOutlined, EditOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { CommonTable } from '@/components/basic/common-table'

// 表格数据
const column3 = [
  { title: "name", width: 40, link: 'mbtmodeler', require: true },
  { title: "description", width: 120, require: true },
  { title: "tags", width: 100 },
  { title: "action", width: 100, actionList: ['edit', 'delete', 'clone']},
]
const MBTTableQuery = {
  url: realMBTUrl,
  searchText: '',
  createParams: ''
}

let MBTTable = ref<any>(null)

//Setting url for data fetching
const url = realMBTUrl;
const route = useRoute();
const router = useRouter();
const { t } = useI18n()
// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
  search: "",
});

watch(
    () => formState.search,
    (value: string) => {
      MBTTableQuery.searchText = value
    }
)

let mbtId = ref("");

/**
 * Search the result
 */
const handleFinish: FormProps["onFinish"] = (values: any) => {
  MBTTable.value.query(formState.search)
};
const handleFinishFailed: FormProps["onFinishFailed"] = (errors: any) => {
  console.log(errors);
};

const showModal = () => {
  MBTTable.value.createNewRow({
    name: '',
    description: '',
    tags: []
  })
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
      let rst = await request.get("/api/test-models/_tags", { params: { q: "category:meta" } })
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


let checkName = async (_rule: Rule, value: string) => {
  let reg = /^[a-zA-Z0-9\$][a-zA-Z0-9\d_]*$/
  let reg1 = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
  if (!value) {
    return Promise.reject(t('component.message.emptyName'))
  } else if (!reg.test(value) && !reg1.test(value)) {
    return Promise.reject(t('component.message.hefaName'))
  } else {
    if (copyData.name && copyData.name == value) {
      return Promise.resolve();
    } else {
      let rst = await request.get(url, { params: { q: `name:${value}`, search: '' } })
      if (rst.data && rst.data.length > 0 && rst.data[0].name == value) {
        return Promise.reject(t('component.message.depName'))
      } else {
        return Promise.resolve();
      }
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
   request.post('/api/test-models',copyData.value).then((rst :any)=>{
    let tableData = MBTTable.value.getTableData()
    tableData.unshift(rst)
    MBTTable.value.setTableData(tableData)
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
  <main style="height: 100%; overflow-x: hidden !important">
    <header class="block shadow">
      <!-- <section class="block shadow flex-center"> -->

      <!-- 表单的查询 -->
      <a-row>
        <a-col :span="20">
          <AForm
            layout="inline"
            class="search_form"
            :model="formState"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
            :wrapper-col="{ span: 24 }"
          >
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
          </a-button>
        </a-col>
      </a-row>
    </header>
    <div class="tableContainer">
      <common-table
          :columns="column3"
          :fetch-obj="MBTTableQuery"
          tableRef="MBTTable"
          ref="MBTTable"
          @clone="clone"
      ></common-table>
    </div>
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
.tableContainer {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
<style></style>
