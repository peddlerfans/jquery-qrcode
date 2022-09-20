<script lang="ts">
export default { name: 'Account' }
</script>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount } from 'vue';
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
// import { useTable } from '@/components/core/dynamic-table';
// import {

//   getAWInfo

// } from '@/api/aw';
// import { createDept, deleteDept, updateDept, getDeptList, transferDept } from '@/api/system/dept';
// import { useFormModal } from '@/hooks/useModal/index';
// import { formatDept2Tree, findChildById } from '@/core/permission/utils';

// defineOptions({
//   name: 'SystemUser',
// });
interface AWInfo {
  name: string,
  description: string,
  path: string,
  tags: string[],
  params: string[],
  name_hash: string,
  description_hash: string,
  _id: string,
  _highlight: {
    description: string[]
  }
};
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
 * 获取aw列表
 */
const fetchAWList = async () => {
  // deptListLoading.value = true;
  // const dept = await getDeptList().finally(() => (deptListLoading.value = false));
  // state.deptTree = formatDept2Tree(dept);
  // state.expandedKeys = [...state.expandedKeys, ...state.deptTree.map((n) => Number(n.key))];
};


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