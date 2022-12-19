<script setup lang="ts">
import http from "@/utils/http";
import {watch, ref, nextTick} from "vue";
import  {SearchBar}  from "@/components/basic/search-bar";
import  {CommonTable}  from "@/components/basic/common-table";
const emit = defineEmits(['clickRow', 'closeModal'])

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
      if (val) nextTick(() => getTableData())
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
  perPage: 10
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

function showAw (row: any) {
  emit('clickRow', row)
}

function tablePageChange (query: any) {
  tableParams.value.page = query.current
  tableParams.value.perPage = query.pageSize
  getTableData()
}

function closeModal () {
  console.log(1)
  emit('closeModal')
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
    <common-table
        ref="awTable"
        :columns="awColumn"
        tableRef="awTable"
        @go2Page="showAw"
        @pageChange="tablePageChange"
    ></common-table>
  </a-modal>
</template>

<style scoped>

</style>