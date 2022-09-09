<script setup lang="ts">

  import useTable from '@/composables/useTable'
  import * as _ from 'lodash'
  // import { exportSheetFile } from '@/utils/fileAction'
  import { ref, reactive, computed, onBeforeMount, defineComponent, UnwrapRef, onMounted, nextTick, watch } from 'vue';
  import type { FormProps, SelectProps, TableProps, TreeProps } from 'ant-design-vue';
  
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
      { title: 'name', dataIndex: 'name', key: 'name', width: 40 },
      { title: 'description', dataIndex: 'description', key: 'description', width: 120 },
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
  
    <main style="height:100%;overflow-x: hidden!important;">
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
  
  </style>