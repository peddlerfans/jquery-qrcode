<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onBeforeMount } from 'vue'
import useTable from '@/composables/useTable'
import * as _ from 'lodash'
import { exportSheetFile } from '@/utils/fileAction'
// modelDefinition: {  },
//         dataDefinition: {
//             resources: [
//                 {
//                     name: "phone1",
//                     type: "sut"
//                 },
//                 {
//                     name: "phone2",
//                     type: "sut"
//                 }
//             ],
//             // static or dynamic(Pairwise), default is static
//             dataType: "number",

//             // either use dataUrl or data
//             dataUrl: "http://localhost",


//             data: [],
//             // meta 
//             metaTemplate: "template{}",
//             meta: []


const tableRef = ref()

const {
  dataSource, columns, originColumns, tableLoading, pagination, selectedRowKeys,
  updateTable, onTableRowSelectChange, tableResize
} = useTable({
  table: tableRef,
  columns: [
    { title: 'name', dataIndex: 'name', key: 'name', width: 50 },
    { title: 'description', dataIndex: 'description', key: 'description', width: 150 },
    { title: 'tags', dataIndex: 'tags', key: 'tags', width: 100, customRender:((opt)=>{ 
      
      if(_.isArray(opt.value)){
        return opt.value.toString();
      }
      else return opt.value}) },
    // { title: 'operations', dataIndex: 'operations', key: 'operations', width: 100, customRender:({})
    
    // },


  ],
  updateTableOptions: {
    fetchUrl: '/mbtlist/mbt-models'
    // '/api/mbt-models'
    // '/mbtapi/mbt-models'
  }
})
function openMenuModal(){
  alert('good')
}
  


 
onBeforeMount(() => {

  updateTable()
})


</script>

<template>

  <main>
    <header class="block shadow">Search</header>
    <!-- <section class="block shadow flex-center"> -->
      <!-- <ATable :data-source="data"></ATable> -->
      <ATable ref="tableRef" class="table" rowKey="key" :dataSource="dataSource" :columns="columns"
        :pagination="pagination" :loading="tableLoading" bordered @resizeColumn="tableResize"
        :rowSelection="{ selectedRowKeys, onChange: onTableRowSelectChange }"></ATable>
    <!-- </section> -->
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

.table {
  width: 100%;
  height: 100px;
  flex: 1;
  background-color: #fff;
  border-radius: 0.7rem;
}
</style>
<style>
</style>