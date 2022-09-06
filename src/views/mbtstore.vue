<script setup lang="ts">
import MockApi from "../../mock"
import { ref, onMounted } from "vue";
import { onBeforeMount  } from 'vue'
  import useTable from '@/composables/useTable'
  import { exportSheetFile } from '@/utils/fileAction'
import enableMock from "../../mock";
  
  
  const tableRef = ref()
  console.log('mockapi:',MockApi)
  const {
    dataSource, columns, originColumns, tableLoading, pagination, selectedRowKeys,
    updateTable, onTableRowSelectChange, tableResize
  } = useTable({
    table: tableRef,
    columns: [
      { title: 'name', dataIndex: 'name', key: 'name', width: 50 },
      { title: 'description', dataIndex: 'description', key: 'description', width: 150 },
      { title: 'version', dataIndex: 'version', key: 'version', width: 100 },
      // { title: '地址', dataIndex: 'address', key: 'address', width: 400 },
    ],
    updateTableOptions: {
      fetchUrl: '/mbtlist/mbt-models'
      // '/api/mbt-models'
      // '/mbtapi/mbt-models'
    }
  })
  
  onBeforeMount(() => {
    // MockApi
    updateTable()
  })
  // let data = ref([]);

// const fetchMBTList = async () => {
//   // deptListLoading.value = true;
//    const data = await getMBTList();
//   // state.deptTree = formatDept2Tree(dept);
//   // state.expandedKeys = [...state.expandedKeys, ...state.deptTree.map((n) => Number(n.key))];
// };
// onMounted(() => {
//   let data = getMBTList();
//   console.log(' data from mbt... ',data.value);
// });

</script>

<template>

<main>
  <header class="block shadow">头部</header>
  <section class="block shadow flex-center" style="width: 100%; min-height: 100%; color: var(--gray); font-size: 5rem;">
    <!-- <ATable :data-source="data"></ATable> -->
 <ATable ref="tableRef" class="table" rowKey="key" :dataSource="dataSource" :columns="columns"
        :pagination="pagination" :loading="tableLoading" bordered @resizeColumn="tableResize"
        :rowSelection="{ selectedRowKeys, onChange: onTableRowSelectChange }"></ATable>
  </section>
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