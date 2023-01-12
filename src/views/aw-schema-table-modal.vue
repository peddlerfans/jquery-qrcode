<script setup lang="ts">
import http from "@/utils/http";
import {watch, ref, nextTick} from "vue";
import  {SearchBar}  from "@/components/basic/search-bar";
import  {CommonTable}  from "@/components/basic/common-table";
import {objToArr} from "@/utils/treeData";
const emit = defineEmits(['clickRow', 'closeModal'])

let treeData = ref<any>([])

interface Props {
  show: boolean
}
const props = withDefaults(defineProps<Props>(), {
  show: false
})

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

// 获取点击所在节点的整个路径
function getPathByKey(value: string, key: string, arr: string | any[]) {
  let temppath: any[] = [];
  try {
    function getNodePath(node:any){
      temppath.push(node);
      //找到符合条件的节点，通过throw终止掉递归
      if (node[key] === value) {
        throw ("GOT IT!");
      }
      if (node.children && node.children.length > 0) {
        for (var i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i]);
        }
        //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        temppath.pop();
      }
      else {
        //找到叶子节点时，删除路径当中的该叶子节点
        temppath.pop();
      }
    }
    for (let i = 0; i < arr.length; i++) {
      getNodePath(arr[i]);
    }
  } catch (e) {
    return temppath;
  }
}

// 定义一个返回路径的函数
function getPath(key:any,treearr:any){
  let rst:any
  let res=getPathByKey(key,'title',treearr)
  rst=res?.map((obj:any)=>{
    return obj.title
  }).join('/')
  return rst
}

function onSelect (selectedKeys: any, info?: any) {
  tableParams.value.page = 1
  if (info.node.dataRef.title === '/') {
    tableParams.value.q = ''
    getTableData()
  } else {
    let str = getPath(info.node.detaRef.title , treeData.value)
    str=str.substring(1,str.length)
    tableParams.value.q = `path:/${str}`
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
        url="/api/hlfs/_tags"
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