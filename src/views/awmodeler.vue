<script lang="ts">
export default { name: 'AWModeler'}
</script>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount ,defineComponent, UnwrapRef} from 'vue';
import type { FormProps, TreeProps } from 'ant-design-vue';
import {
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SwapOutlined,
  SmileOutlined,
    DownOutlined,
} from '@ant-design/icons-vue';
import { Tree, Dropdown, Space, Tooltip, Modal, Alert, Menu } from 'ant-design-vue';
// import type { LoadDataParams } from '@/components/core/dynamic-table';
// import type { TreeDataItem } from '@/core/permission/utils';
import { SplitPanel } from '@/components/basic/split-panel';

// 导入pinia中的请求
import { awStore } from "@/stores/awtable"
import { tryOnMounted } from '_@vueuse_shared@9.1.1@@vueuse/shared';
const awTab = awStore()
tryOnMounted(() => {
  awTab.queryTree()
})

console.log(awTab.treeData, );

// 处理树形结构的数据
function handleTree(arr:Array<string>) {
  let Datatree : Array<any>=[];
  arr.forEach((path:any) => {
    let strTree = path.split("/");
    let strList:Array<any> = Datatree;
    // 遍历待查询节点
    for (let title of strTree) {
      // 同层同名节点查找匹配
      let obj = strList.find((item: any) => item.title == title)
      // 若不存在则建立该节点
      if (!obj) {
        obj = { title, children: [] }
        strList.push(obj)
        // 7.若当前被增节点是叶子节点，则裁剪该节点子节点属性
        if (title == strTree[strTree.length - 1]) {
          delete obj.children
        }
      }
      // 8.已有则进入下一层，继续寻找
      strList = obj.children
      }
  })
    return Datatree
  }
console.log(handleTree(awTab.treeData));




// 表单的数据
interface FormState {
  user: string;
  password: string;
}
const formState: UnwrapRef<FormState> = reactive({
      user: '',
      password: '',
    });
    const handleFinish: FormProps['onFinish'] = values => {
      console.log(values, formState);
    };
    const handleFinishFailed: FormProps['onFinishFailed'] = errors => {
      console.log(errors);
    };




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


// 表格的结构
const columns = reactive<Object[]>(
  [
  {
    name: 'Name',
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
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
  },
  {
    title: 'Action',
    key: 'action',
  },
]
)

const data = reactive<Object[]>(
   [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
]
)
 defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
  }
})

</script>

<template>
  <main class="main">
    <section class="block shadow flex-center"
      style="width: 100%; min-height: 100%; color: var(--gray); font-size: 5rem;">
      <SplitPanel>
        <template #left-content>
          <div class="flex justify-between">
            <!-- <div>组织架构</div> -->
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
          <!-- 表单的查询 -->
          <AForm  layout="inline"
          class="search_form"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed">
 <a-form-item>
      <a-input v-model:value="formState.user" placeholder="Username">
        <!-- <template #prefix><UserOutlined style="color: rgba(0, 0, 0, 0.25)" /></template> -->
      </a-input>

    </a-form-item>

    <a-form-item>
      <a-input v-model:value="formState.password" type="password" placeholder="Password">
        <!-- <template #prefix><LockOutlined style="color: rgba(0, 0, 0, 0.25)" /></template> -->
      </a-input>
    </a-form-item>

    <a-form-item>
      <a-button type="primary">search</a-button>
    </a-form-item>
          </AForm>


          <!-- 表格的结构 -->

          <a-table :columns="columns" :data-source="data">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
    </template>

    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'name'">
        <a>
          {{ record.name }}
        </a>
      </template>
      <template v-else-if="column.key === 'tags'">
        <span>
          <a-tag
            v-for="tag in record.tags"
            :key="tag"
            :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >
            {{ tag.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'action'">
        <span>
          <a>Invite 一 {{ record.name }}</a>
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
  </a-table>
        </template>
      </SplitPanel>
    </section>
  </main>
</template>

<style scoped lang="postcss">
  .main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .ant-form{
    margin-bottom: 1rem;
  }
  </style>
