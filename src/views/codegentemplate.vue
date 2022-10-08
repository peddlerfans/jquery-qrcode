<script setup lang="ts">
  import { ref, reactive, computed, onBeforeMount ,Ref,UnwrapRef} from 'vue';
  import type { TreeProps } from 'ant-design-vue';
  import {
    SyncOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined,
    SwapOutlined,
  } from '@ant-design/icons-vue';
  import { Tree, Dropdown, Space, Tooltip, Modal, Alert, Menu } from 'ant-design-vue';
  // import type { LoadDataParams } from '@/components/core/dynamic-table';
  // import type { TreeDataItem } from '@/core/permission/utils';
  import { SplitPanel } from '@/components/basic/split-panel';
  import request from "@/utils/request"
  import { cloneDeep } from 'lodash-es';
  interface State {
    expandedKeys: number[];
    // departmentIds: number[];
    // deptTree: TreeDataItem[];
  }
  
  // const [DynamicTable, dynamicTableInstance] = useTable();
  // const [showModal] = useFormModal();
  
  // const deptListLoading = ref(false);
  
  const state = reactive<State>({
    expandedKeys: [],
    // departmentIds: [],
    // deptTree: [],
  });
  
  
  const rowSelection = ref({
    selectedRowKeys: [] as number[],
    // onChange: (selectedRowKeys: number[], selectedRows: TableListItem[]) => {
    //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    //   rowSelection.value.selectedRowKeys = selectedRowKeys;
    // },
  });
  
  
  /**
   * 获取statictemplate列表
   */
  const fetchStaticTemplate = async () => {
    
  };
  // let dataSource= [
  //         {
  //           key: '1',
  //           name: 'Mike',
  //           age: 32,
  //           address: '10 Downing Street',
  //         },
  //         {
  //           key: '2',
  //           name: 'John',
  //           age: 42,
  //           address: '10 Downing Street',
  //         },
  //       ];

        interface TableDataItem{
          key:string,
          name:string,
          age:number,
          address:string
        }
        interface ColumnItem{
          title: string,
            dataIndex: string,
            key: string
        }
        const dynamiccolumns: Ref<ColumnItem[]> = ref([{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
          },
          {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
          }])
        const TabledataSource: Ref<TableDataItem[]> = ref([
          {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
          },
          {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
          },
]);

const tablecount = computed(() => TabledataSource.value.length + 1);
const metaeditableData: UnwrapRef<Record<string, TableDataItem>> = reactive({});

const tableDataedit = (key: string) => {
  metaeditableData[key] = cloneDeep(TabledataSource.value.filter(item => key === item.key)[0]);
};
const tableDatasave = (key: string) => {
  Object.assign(TabledataSource.value.filter(item => key === item.key)[0], metaeditableData[key]);
  delete metaeditableData[key];
};

const ontableDataDelete = (key: string) => {
  TabledataSource.value = TabledataSource.value.filter(item => item.key !== key);
};
const tableDatahandleAdd = () => {
  const newData = {
    key: `${tablecount.value}`,
    name: `Objective${tablecount.value}`,
    age: tablecount.value,
    address: `details${tablecount.value}`,
  };
  TabledataSource.value.push(newData);
};

const columnshandleAdd = () => {
  const newcolumn = {
    title: `${tablecount.value}`,
    dataIndex: `Objective${tablecount.value}`,
    key: `${tablecount.value}`
    
  };
  dynamiccolumns.value.push(newcolumn);
};
      //  let columns= ref([
      //     {
      //       title: 'Name',
      //       dataIndex: 'name',
      //       key: 'name',
      //     },
      //     {
      //       title: 'Age',
      //       dataIndex: 'age',
      //       key: 'age',
      //     },
      //     {
      //       title: 'Address',
      //       dataIndex: 'address',
      //       key: 'address',
      //     },
      //   ]);
  
  const expandedKeys = ref<string[]>(['0-0-0', '0-0-1']);
  
  const treeData: TreeProps['treeData'] = [
    {
      title: 'parent 1',
      key: '0-0',
      children: [
        {
          title: 'parent 1-0',
          key: '0-0-0',
          disabled: true,
          children: [
            { title: 'leaf', key: '0-0-0-0', disableCheckbox: true },
            { title: 'leaf', key: '0-0-0-1' },
          ],
        },
        {
          title: 'parent 1-1',
          key: '0-0-1',
          children: [{ key: '0-0-1-0', title: 'sss' }],
        },
      ],
    },
  ];
  // function addColumn(){
  //   console.log(dynamiccolumns.value)
  //   let newcol = {
  //           title: 'Newcol',
  //           dataIndex: 'Newcol',
  //           key: 'Newcol',
  //         };
  //   columns.value=columns.value.splice(0,0,newcol)
  //   console.log(columns)

  // }
  </script>
  
  <template>
    <main class="main">
      <!-- <section class="block shadow flex-center"
        style="width: 100%; min-height: 100%; color: var(--gray); font-size: 5rem;"> -->
        <SplitPanel>
          <template #left-content>
            <div class="flex justify-between">
              <!-- <div>
                <p style="height:16px!important;">组织1架构</p>
              </div> -->
              <Space>
                <Tooltip v-if="true" placement="top">
                  <template #title>新增部门 </template>
                  <!-- <PlusOutlined @click="openDeptModal({})" /> -->
                </Tooltip>
                <Tooltip placement="top">
                  <template #title>刷新 </template>
                  <!-- <SyncOutlined :spin="deptListLoading"  /> -->
                </Tooltip>
              </Space>
            </div>
            <Tree v-model:expandedKeys="expandedKeys" auto-expand-parent :tree-data="treeData">
              <template #title="{ key, title, formData }">
                <Dropdown :trigger="['contextmenu']">
                  <span>{{ title }}</span>
                  <template #overlay>
                    <Menu>
                      <Menu.Item key="1">
                        编辑
                        <EditOutlined />
                      </Menu.Item>
                      <!-- <Menu.Item key="2" :disabled="!$auth('sys.dept.delete')" @click="delDept(key)">
                    删除 <DeleteOutlined />
                  </Menu.Item> -->
                    </Menu>
                  </template>
                </Dropdown>
              </template>
            </Tree>
          </template>
          <template #right-content>
            <a-button type="primary" @click="columnshandleAdd()">
          Save
        </a-button>
            <a-table :dataSource="TabledataSource" :columns="dynamiccolumns" />
            <!-- <p>
              Show the details of organization
            </p> -->
          </template>
        </SplitPanel>
      <!-- </section> -->
    </main>
  </template>
  
  <style scoped lang="postcss">
  .main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  </style>