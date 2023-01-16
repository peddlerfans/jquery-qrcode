<script setup lang="ts">
import { useI18n } from "vue-i18n";
import request from "@/utils/request";
import useTable from "@/composables/useTable";
import { mockMBTUrl, realMBTUrl } from "@/appConfig";
import { message } from "ant-design-vue/es";
import * as _ from "lodash";
import { Stores } from "../../types/stores";
import { SplitPanel } from '@/components/basic/split-panel';
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
import { SearchBar } from '@/components/basic/search-bar'
import http from "@/utils/http";
import {Table} from "ant-design-vue";

// 表格数据
const column3 = [
  { title: "name", width: 40, link: 'mbtmodeler', require: true },
  { title: "description", width: 120, require: true },
  { title: "tags", width: 100 },
  { title: "action", width: 100, actionList: ['edit', 'delete', 'clone']},
]

interface TableParams {
  search: string,
  q: string,
  page: number,
  perPage: number
}

let tableParams = ref<TableParams>({
  search: '',
  q: '',
  page: 1,
  perPage: 20
})

const AWTableQuery = {
  selection: {
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE]
  },
}

let MBTTable = ref<any>()

function queryTableData() {  
  MBTTable.value.loading = true
  http.get(realMBTUrl, {
    params: tableParams.value
  }).then(({ data }) => {
    if (data?.data) {
      MBTTable.value.setTableData({
        currentPage: tableParams.value.page,
        pageSize: tableParams.value.perPage,
        total: data.total,
        tableData: data.data
      })
    }
  }).finally(() => {    
    MBTTable.value.loading = false
  })
}

// function queryTree () {
//   http.get('/api/test-models/_tree').then(({ data }) => {
//     treeData.value = objToArr(data)
//   })
// }

onMounted(() => {
  queryTableData()
  // queryTree()
})

//Setting url for data fetching
const url = realMBTUrl;
const route = useRoute();
const router = useRouter();
const { t } = useI18n()
// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
  search: "",
});

let mbtId = ref("");

const showModal = () => {
  MBTTable.value.createNewRow({
    name: '',
    description: '',
    tags: []
  })
};

let searchInput = ref()


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
const clearValida = () => {
  refCopy.value.clearValidate()
}

function go2Detail (row: any) {
  router.push(`/mbtmodeler/${row._id}/${row.name}`)
}

function saveTableItem(row: any) {
  MBTTable.value.loading = true
  const id = row._id
  const url = id ? `/api/test-models/${id}` : '/api/test-models'
  http({
    url,
    data: row,
    method: id ? 'put' : 'post'
  }).then(({ data }) => {
    let tableData = MBTTable.value.getTableData()
    tableData.splice(row.index, 1, data)
    MBTTable.value.setTableData(tableData)
    message.success(t('component.message.updateText'))
  })
      .catch(e => message.error(t('component.message.updateErr')))
      .finally(() => MBTTable.value.loading = false)
}

function deleteTableItem(row: any) {
  MBTTable.value.loading = true
  const id = row._id
  http.delete(`/api/test-models/${id}`).then(() => {
    let tableData = MBTTable.value.getTableData()
    const index = tableData.indexOf(row)
    tableData.splice(index, 1)
    MBTTable.value.setTableData(tableData)
    message.success(t('component.message.delText'))
  }).finally(() => MBTTable.value.loading = false)
}

function pageChange(data: any) {
  tableParams.value.page = data.current
  tableParams.value.perPage = data.pageSize
  queryTableData()
}

function handleSelect(q: string) {
  tableParams.value.q = q
  tableParams.value.page = 1
  queryTableData()
}

function handleAddAW(path: string) {
  const selectList = MBTTable.value.selectionList
  if (selectList.length > 0) {
    let pool: any[] = []
    selectList.forEach((item: any) => {
      item.path = path
      pool.push(request.put(`/api/test-models/${item._id}`, item))
    })
    MBTTable.value.loading = true
    Promise.all(pool)
        .then((res:any)=>{
          let tableData = MBTTable.value.getTableData()
          tableData = tableData.filter((a: any) => !selectList.includes(a))
          MBTTable.value.setTableData(tableData)
          if (res) {message.success(t('common.modificationSuccess'))}
        })
        .catch(()=>{message.error(t('common.modificationError'))})
        .finally(() => MBTTable.value.loading = false)
  } else {
    message.warning(t('awModeler.selectAwTip'))
  }
}

function handleSearch(keyword: string) {
  tableParams.value.page = 1
  tableParams.value.search = keyword
  queryTableData()
}

</script>

<template>
  <main style="height: 100%; overflow-x: hidden !important">
    <SplitPanel>
      <template #left-content>
       <itea-tree tree-url="/api/test-models" @select="handleSelect" @addAW="handleAddAW"></itea-tree>
      </template>
      <template #right-content>
        <header class="block shadow">
          <!-- 表单的查询 -->
          <a-row>
            <a-col :span="20">
              <search-bar url="/api/test-models/_tags" @search="handleSearch"></search-bar>
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
              check-url="api/test-models"
              tableRef="MBTTable"
              :fetch-obj="AWTableQuery"
              ref="MBTTable"
              @clone="clone"
              @go2Page="go2Detail"
              @save="saveTableItem"
              @delete="deleteTableItem"
              @pageChange="pageChange"
          ></common-table>
        </div>
      </template>
    </SplitPanel>
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
  margin-bottom: 2rem;
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
<style lang="less" scoped>
.right-content {
  .block {
    width: 100%;
  }
}
</style>
