<<<<<<< HEAD
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { onBeforeMount } from 'vue'
import useTable from '@/composables/useTable'
import * as _ from 'lodash'
import { exportSheetFile } from '@/utils/fileAction'
import {
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SwapOutlined,
  DownOutlined
} from '@ant-design/icons-vue';

const tableRef = ref()

const {
  dataSource, columns, originColumns, tableLoading, pagination, selectedRowKeys,
  updateTable, onTableRowSelectChange, tableResize
} = useTable({
  table: tableRef,
  columns: [
    { title: 'name', dataIndex: 'name', key: 'name', width: 50 },
    { title: 'description', dataIndex: 'description', key: 'description', width: 150 },
    {
      title: 'tags', dataIndex: 'tags', key: 'tags', width: 100, customRender: ((opt) => {

        if (_.isArray(opt.value)) {
          return opt.value.toString();
        }
        else return opt.value
      })
    },
    { title: 'Action', dataIndex: 'action', key: 'action', width: 100 },


  ],
  updateTableOptions: {
    fetchUrl: '/mbtlist/mbt-models'
    // '/api/mbt-models'
    // '/mbtapi/mbt-models'
  }
})
function openMenuModal() {
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
      :rowSelection="{ selectedRowKeys, onChange: onTableRowSelectChange }">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <edit-outlined />
            Name
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
        
            {{ record.name }}
          
        </template>

        <template v-else-if="column.key === 'description'">
         
            {{ record.description }}
         
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag v-for="tag in record.tags" :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a href="/#/mbtmodeler/index">Edit</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link">
              More actions
              <down-outlined />
            </a>
          </span>
        </template>
      </template>


    </ATable>
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

=======
<script lang="ts">
export default {name: 'MBTStore'}
</script>

<script setup lang="ts">
</script>

<template>
<<<<<<< HEAD
  <section class="block shadow flex-center" style="width: 100%; min-height: 100%; color: var(--gray); font-size: 5rem;">
    To be continued
  </section>
</template>

=======

<main>
  <header class="block shadow">头部</header>
  <section class="block shadow flex-center" style="width: 100%; min-height: 100%; color: var(--gray); font-size: 5rem;">
    To be continued
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
>>>>>>> cfb6473... 解析树形数据渲染表格
<style>
>>>>>>> 3e242a4... 更新
</style>