<script lang="ts">
export default { name: 'AWModeler'}
</script>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount ,defineComponent, UnwrapRef,onMounted, onActivated, nextTick} from 'vue';
import type { FormProps, TableProps, TreeProps } from 'ant-design-vue';
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
// import {storeToRefs} from "pinia" 
// import { awStore } from "@/stores/awtable"
import request from '@/utils/request';
import { cloneDeep } from 'lodash-es';
interface tableSearch {
  search:string
  size:number
}
let tableData= ref([])
let searchobj: tableSearch = reactive({
  search: "",
  size:20
})
async function query(data?: any) {  
  let rst=await request.get("/api/hlfs", { params: data || searchobj })
  if (rst.data) {
    
    tableData.value=rst.data
  }
}
    console.log(tableData);
onMounted(() => {
    query()
}) 


// 表单的数据
interface FormState {
  search: string;
}
const formState: UnwrapRef<FormState> = reactive({
      search: ''
    });
const handleFinish: FormProps['onFinish'] = (values: any) => {
      // console.log(values,formState);
      
    query(formState)
    };
const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => {
      console.log(errors);
    };

// 模态窗数据
    const visible = ref<boolean>(false);

    const showModal = () => {
      visible.value = true;
    };

    const handleOk = () => {
      visible.value = false;
};
// 模态窗表单
interface ModelState {
  name: string;
  description: string;
  template: string;
  _id:string
}


// 添加功能的函数
async function saveAw (data:any) {
        let rst = await request.post("/api/hlfs", data)
        console.log(rst);
        
      }

    let modelstates = reactive<ModelState>({
      name: '',
      description: '',
      template: "",
      _id:""
    });
const onFinishForm = (values: any) => {
      
  if (modelstates._id) {
        updateAw(`/api/hlfs/${modelstates._id}`,values  )
  } else {
        saveAw(values)
      }
      handleOk()
      query()
    };

    const onFinishFailedForm = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
};
    // 删除功能
async function delaw(key:any) {
      let rst=await request.delete(`/api/hlfs/${key._id}`)
      console.log(rst);
      
    }


    // 修改功能4
    // 修改函数
async function updateAw(url:string,data:any) {
  let rst = await request.put(url, data)
      console.log(rst);
      
    }


interface DataItem {
  key: string;
  name: string;
  description: string
}

// 修改的函数
const edit = (obj:[]) => {
  console.log(obj);
  showModal()
  // let{name:string
  //     description: '',
  //     template: "",
  //     _id:""}=[...obj]
}


// 编辑弹窗的设置
//     const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
// const edit = (key: string) => {   
//       console.log(key);
      
//   editableData[key] = cloneDeep((tableData.value as any).map((item: { _id: string; },index:string) => {
//     if (key === item._id) {
//           return item
//         }
//       }));
//       console.log(editableData[key]);

//     };
//     const save = (key: string) => { 
//       let updateobj = Object.assign((tableData.value as any).map((item: { _id: string; }) => {
//          if (key === item._id) {
//           return (tableData.value as any)[key]
//         }
//       })[key], editableData[key]);
//       updateAw(`/api/hlfs/:id=${updateobj._id}`,updateobj)
//       console.log(key,updateobj);
      
//       delete editableData[key];
//     };
//     const cancel = (key: string) => {
//       delete editableData[key];
// };

const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: string[], selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
}

    // 查询高级功能
// interface AWInfo {
//   name: string,
//   description: string,
//   path: string,
//   tags: string[],
//   params: string[],
//   name_hash: string,
//   description_hash: string,
//   _id: string,
//   _highlight: {
//     description: string[]
//   }
// };
interface State {
  expandedKeys: number[];
  departmentIds: number[];
  // deptTree: TreeDataItem[];
}

// const [DynamicTable, dynamicTableInstance] = useTable();
// const [showModal] = useFormModal();

// const deptListLoading = ref(false);

const state = reactive<State>({
  expandedKeys: [],
  departmentIds: [],
  // deptTree: [],
});


// const rowSelection = ref({
  // selectedRowKeys: [] as number[],
  // onChange: (selectedRowKeys: number[], selectedRows: TableListItem[]) => {
  //   console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   rowSelection.value.selectedRowKeys = selectedRowKeys;
  // },
// });


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
// watch(() => [...tableData], (now, old) => {
//     console.log(now, old)
// })
// const data=ref((tableData.value as any).map((item:any,index:any)=>{
//   return {...item,key:index}
// }))
// console.log(data);


// 表格的结构
const columns = reactive<Object[]>(
  [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Action',
    dataIndex: 'action',

    key: 'action',
  },
]
)
 defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
  }
})

const wrapperCol={span:24,offset:12}
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
       <a-row>
        <a-col :span="20">
           <AForm  layout="inline"
          class="search_form"
    :model="formState"
    @finish="handleFinish"
    @finishFailed="handleFinishFailed"
    :wrapperCol="wrapperCol">
    <a-form-item label="name" :wrapper-col="{span:20}">
      <a-input placeholder="name"></a-input>
    </a-form-item>
 <a-form-item  label="description" :wrapper-col="{span:20}">

      <a-input v-model:value="formState.search" placeholder="hlf"></a-input>

    </a-form-item>
    <a-form-item :wrapper-col="{span:20}">
      <a-button type="primary" html-type="submit">search</a-button>
    </a-form-item>
          </AForm>
        </a-col>
        <a-col :span="4"><a-button type="primary" @click="showModal" >
        <template #icon><plus-outlined /></template>
      Save Aw</a-button>
       </a-col>
       </a-row>


          <!-- 模态窗 -->
           <div>
    
       
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
      <a-form
    :model="modelstates"
    name="basic"
    :label-col="{ span: 8 }"
    :wrapper-col="{ span: 16 }"
    autocomplete="off"
    @finish="onFinishForm"
    @finishFailed="onFinishFailedForm"
  >
    <a-form-item
      label="name"
      name="name"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="modelstates.name" />
    </a-form-item>

    <a-form-item
      label="description"
      name="description"
      :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input v-model:value="modelstates.description" />
    </a-form-item>

    <a-form-item
      label="template"
      name="name"
      :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="modelstates.template" />
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
    </a-modal>
  </div>

          
          <!-- 表格的结构 -->

          <a-table :columns="columns" :data-source="tableData" :row-selection="rowSelection">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
    </template>

    <template #bodyCell="{ column,text, record }">
      <template v-if="['name', 'description', ].includes(column.dataIndex)">
        <!-- <div>
          <a-input
            v-if="editableData[record._id]"
            v-model:value="editableData[record.key][column.dataIndex]"
            style="margin: -5px 0"
          />
          <template v-else>
            {{ text }}
          </template>
        </div> -->
      </template>
      <template v-else-if="column.key === 'action'">
        <!-- <span>
           <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span> -->
          <span >
            <a @click="edit(record)">Edit</a>
            <a-divider type="vertical" />
            <a @click="delaw(record)">del</a>
          </span>
        <!-- </div> -->
        <!-- </span> -->
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
