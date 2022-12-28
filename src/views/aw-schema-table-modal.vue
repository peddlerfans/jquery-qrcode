<script setup lang="ts">
import http from "@/utils/http";
import {watch, ref, nextTick} from "vue";
import  {SearchBar}  from "@/components/basic/search-bar";
import  {CommonTable}  from "@/components/basic/common-table";
import _ from "lodash";
import {uuid} from "@/utils/Uuid";
const emit = defineEmits(['clickRow', 'closeModal'])

let treeData = ref<any>([])

interface Props {
  show: boolean
}
const props = withDefaults(defineProps<Props>(), {
  show: false
})

let searchObj = {
  url: '/api/hlfs/_tags',
  params: {
    q: 'category:meta'
  }
}

watch(
    () => props.show,
    (val) => {
      if (val) nextTick(() => {
        getTableData()
        getTreeData()
      })
    }
)

// table data
let awTable = ref<any>(null)
const awColumn = [
  { title: 'name', width: 40, link: 'custom' },
  { title: 'description', width: 120 },
  { title: 'tags', width: 100 }
]

let tableParams = ref({
  search: '',
  page: 1,
  perPage: 10,
  q: ''
})

function search (searchText: string) {
  tableParams.value.page = 1
  tableParams.value.search = searchText
  getTableData()
}

function getTableData () {
  awTable.value.loading = true
  http.get('/api/hlfs', {
    params: tableParams.value
  }).then(({ data }) => {
    awTable.value.setTableData({
      tableData: data.data,
      pageSize: tableParams.value.perPage,
      currentPage: tableParams.value.page,
      total: data.total
    })
  }).finally(() => {
    awTable.value.loading = false
  })
}

function getTreeData () {
  http.get('/api/hlfs/_tree').then(({data}) => {
    treeData.value = objToArr(data)
  })
}

// 数据格式化的函数
function objToArr(obj: any) {
  const arr = []
  if (_.isObject(obj)) {
    for (let i in obj) {
      let oo: any = {
        title: i,
        key: uuid(),
        children: objToArr(obj[i as keyof typeof objToArr])
      };
      if(i === ""){
        i = "/"
        oo = {
          title: i,
          key: uuid(),
          children: objToArr(obj["" as keyof typeof objToArr])
        }
      }
      arr.push(oo)
    }
  }
  return arr
}

function showAw (row: any) {
  emit('clickRow', row)
}

function tablePageChange (query: any) {
  tableParams.value.page = query.current
  tableParams.value.perPage = query.pageSize
  getTableData()
}

function closeModal () {
  emit('closeModal')
}

function onSelect (selectedKeys: any, info?: any) {
  tableParams.value.page = 1
  if (info.node.dataRef.title === '/') {
    tableParams.value.q = ''
    getTableData()
  } else {
    tableParams.value.q = `path:/${info.node.dataRef.title}`
    getTableData()
  }
}

</script>

<template>
  <a-modal
      v-model:visible="props.show"
      width="60%"
      title="选择AW"
      @cancel="closeModal"
      :footer="null">
    <search-bar
        :url="searchObj.url"
        :params="searchObj.params"
        @search="search"
    ></search-bar>
    <div class="content-wrap">
      <a-tree
          style="width: 240px;"
          :show-line="true"
          :tree-data="treeData"
          @select="onSelect">
      </a-tree>
      <common-table
          style="width: 100%;"
          ref="awTable"
          :columns="awColumn"
          tableRef="awTable"
          @go2Page="showAw"
          @pageChange="tablePageChange"
      ></common-table>
    </div>

  </a-modal>
</template>

<style scoped lang="less">
.content-wrap {
  display: flex;
}
</style>