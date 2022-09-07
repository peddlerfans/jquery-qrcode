<script lang="ts">
export default { name: 'AWModeler'}
</script>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount, defineComponent, UnwrapRef, onMounted, nextTick, watch } from 'vue';
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
import { message } from 'ant-design-vue/es'
import { useRouter } from 'vue-router'
import request from '@/utils/request';
import { cloneDeep } from 'lodash-es';
import { Rule } from 'ant-design-vue/es/form';
import { string } from 'vue-types';
const router = useRouter()
// const aw = awStore()

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
// const aws = reactive<Stores.aw>({ name: '',
//     description: '',
//     path: '',
//     tags: [],
//     params: [],
//     name_hash: '',
//     description_hash: '',
//     _id: '',
//     _highlight: {
//         description: []
//     }});
// /**
//  * 获取aw列表
//  */
//  function getAWInfo() {
//   aw.getAW('同时').then(res => {
//     console.log('res from axios get aw:',res)
//     return res;
//   }).catch(err => {

//     message.error(err)
//   })

interface tableSearch {
  search:string
  size:number
}
let tableData= ref([])
let searchobj: tableSearch = reactive({
  search: "",
  size:20
})
onMounted(() => {
  query()    
}) 
async function query(data?: any) {    
  let rst = await request.get("/api/hlfs", { params: data || searchobj })
  
  if (rst.data) {
      tableData.value = rst.data
      return rst.data
  }
}
console.log(tableData);
    

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
// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  let rst = await query({ search: value })  
  if (!value) {
    return Promise.reject("Please input your name!")
  }else if (rst.length == 1) {
    return Promise.reject("The name already exists")
  } else {
    return Promise.resolve();
  }
  
}
let checkDesc = async (_rule: Rule, value: string) => {
  let rst = await query({ search: value })  
  if (!value) {
    return Promise.reject("Please input your name!")
  }else if (rst.length == 1) {
    return Promise.reject("The description already exists")
  } else {
    return Promise.resolve();
  }
  
} 
let checktem = async (_rule: Rule, value: string) => { 
  
  if (!value) {    
    rules.template_en[0].required=false
    return Promise.reject("Template or templ is required")
  } else {
    return Promise.resolve();
  }
}
let checkTemen = async (_rule: Rule, value: string) => {
  if (!value) {
  console.log(rules.template_en[0].required);
   
    return Promise.reject("Please input your template_en!")
  } else {
    return Promise.resolve()
      
  }
}
let rules: Record<string, Rule[]> = {
  name: [{ required: true, validator: checkName, trigger: 'blur' }],
  description: [{required: true, validator: checkDesc, trigger: 'blur' }],
  template: [{ required: true, validator: checktem, trigger: 'blur' }],
  template_en: [{ required: true, validator: checkTemen, trigger: 'blur' }],
      
};
    console.log(rules.template[0].required);
    
    

// 模态窗数据
    const visible = ref<boolean>(false);
    const showModal = () => {
      visible.value = true;
    };
    const handleOk = () => {
      onFinishForm(modelstates)
      clear()
};
// 关闭模态窗触发事件
const closemodel = () => {
  visible.value = false;
  clear()
}
// 清除模态窗数据
const clear = () => {
  modelstates.value = {
      name: "",
      description: '',
      template: "",
    _id: "",
    template_en: "",
    params:[],
    tags:[]
  }      
}
// 模态窗表单
interface paramsobj {
    name: string,
    type: string;
  
}
interface ModelState {
  name: string;
  description: string;
  template: string;
  template_en:string
  _id: string;
  tags: Array<string>;
    params:Array<paramsobj>
}

// 点击添加params的函数



let obj = ref<paramsobj>({ name: "", type: "" })
// 添加功能的函数
async function saveAw(data: any) {
  
  let rst = await request.post("/api/hlfs", data)
        console.log(rst);
      }

    let modelstates = ref<ModelState>({
      name: '',
      description: '',
      template: "",
      template_en:"", 
      _id: "",
      params:[],
      tags:[]
    });
    
    // 添加parmas的函数
    function addparams(item:any) {
  console.log(item);
  modelstates.value.params.push(item)
      console.log(modelstates.value.params)
  
}
  // 删除params的函数
function closepar(item:any) {
  console.log(item);
  const parry = modelstates.value.params.filter(paramsitem => paramsitem.name !== item.name)
  modelstates.value.params=parry
 }


const onFinishForm = async (modelstates: any) => {
modelstates.value.tags=states.tags
  // 判断修改或添加
      if (modelstates.value._id) {
       await updateAw(`/api/hlfs/${modelstates.value._id}`, modelstates.value)
        message.success("Modified successfully")
      } else {
        delete modelstates.value._id
        await saveAw(modelstates.value)
        message.success("Added successfully") 
      }
    // }
      query()
  visible.value = false;
      
    };
    const onFinishFailedForm = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
};
// 添加的表单tags
interface statesTs {
  tags: Array<string>
  inputVisible: Boolean;
  inputValue:string
}
let inputRef = ref();
    let states = reactive<statesTs>({
      tags: [],
      inputVisible: false,
      inputValue: '',
    });

    const handleClose = (removedTag: string) => {
      const tags = states.tags.filter(tag => tag !== removedTag);
      console.log(tags);
      states.tags = tags;
    };
    const showInput = () => {
      states.inputVisible = true;
      nextTick(() => {
        inputRef.value.focus();
        })
    };

const handleInputConfirm = () => {
  let tags = states.tags;
  if (states.inputValue && tags.indexOf(states.inputValue) === -1) {
    tags = [...tags, states.inputValue];
  }
  Object.assign(states, {
    tags,
    inputVisible: false,
    inputValue: '',
 });  
}


    // 删除功能
async function delaw(key:any) {
  let rst = await request.delete(`/api/hlfs/${key._id}`)
      query()
      console.log(rst);
      
}
const confirm = (e: MouseEvent) => {
      delaw(e)
      query()
      message.success('Delete on Successed');
    };

    const cancel = (e: MouseEvent) => {
      console.log(e);
      message.error('Cancel deletion');
    };
    


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
const edit = (rowobj:any) => {
  
  showModal()
  modelstates.value.name=rowobj.name
  modelstates.value.description=rowobj.description
  modelstates.value.template=rowobj.template
  modelstates.value._id = rowobj._id
  states.tags = rowobj.tags
  modelstates.value.params = rowobj.params
  
  // let{name  description:,  template: _id:""}={...obj}
}
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: string[], selectedRows: any) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
}

// }
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
      title: 'template',
      dataIndex: 'template',
    key:'template'
    },
   {
      title: 'tags',
      dataIndex: 'tags',
    key:'tags'
    },
  {
      title: 'params',
      dataIndex: 'params',
    key:'params'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
]
)
const expend = (isExpand:any,rected:any) => {
  console.log(isExpand,rected);
  
}

// 子表格的结构
const innerColumns= [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'type', key: 'type', dataIndex: 'type' },
]
 defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
  }
})

const wrapperCol={span:24,offset:12}



const expandedKeys = ref<string[]>(['0-0-0', '0-0-1']);

const treeData: TreeProps['treeData'] = [
   {
        title: 'parent 1',
        key: '0-0',
        children: [
          {
            title: 'parent 1-0',
            key: '0-0-0',
            children: [
              { title: 'leaf', key: '0-0-0-0' },
              {
                key: '0-0-0-1',
              },
              { title: 'leaf', key: '0-0-0-2' },
            ],
          },
          {
            title: 'parent 1-1',
            key: '0-0-1',
            children: [{ title: 'leaf', key: '0-0-1-0' }],
          },
          {
            title: 'parent 1-2',
            key: '0-0-2',
            children: [
              { title: 'leaf 1', key: '0-0-2-0' },
              {
                title: 'leaf 2',
                key: '0-0-2-1',
              },
            ],
          },
        ],
  },
       {
        title: 'parent 2',
        key: '0-1',
        children: [
          {
            title: 'parent 2-0',
            key: '0-1-0',
            children: [
              { title: 'leaf', key: '0-1-0-0' },
              { title: 'leaf', key: '0-1-0-1' },
            ],
          },
        ],
      },
];
const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
      console.log('selected', selectedKeys, info);
    };
</script>

<template>
  <main class="main"> 
      <SplitPanel>
        <template #left-content>
          <div class="flex justify-between">
            <Space>
              <Tooltip v-if="true" placement="top">
                <template #title>新增部门 </template>
              </Tooltip>
              <Tooltip placement="top">
                <template #title>刷新 </template>
              </Tooltip>
            </Space>
          </div>
          <a-tree
      :show-line="true"
      :default-expanded-keys="['0-0-0']"
      :tree-data="treeData"
      @select="onSelect"
    >
      <template #icon><carry-out-outlined /></template>
      <template #title="{ dataRef }">
        <template v-if="dataRef.key === '0-0-0-1'">
          <div>multiple line title</div>
          <div>multiple line title</div>
        </template>
        <template v-else>{{ dataRef.title }}</template>
      </template>
      <template #switcherIcon="{ dataRef, defaultIcon }">
        <SmileTwoTone v-if="dataRef.key === '0-0-2'" />
        <component :is="defaultIcon" v-else />
      </template>
    </a-tree>
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
    <!-- <a-form-item label="name" :wrapper-col="{span:20}">
      <a-input placeholder="name"></a-input>
    </a-form-item> -->
 <a-form-item  label="search" :wrapper-col="{span:20}">

      <a-input v-model:value="formState.search" placeholder="hlf"></a-input>

    </a-form-item>
    <a-form-item :wrapper-col="{span:20}">
      <a-button type="primary" html-type="submit">search</a-button>
    </a-form-item>
          </AForm>
        </a-col>
        <a-col :span="4"><a-button type="primary" @click="showModal" >
        <template #icon><plus-outlined /></template></a-button>
       </a-col>
       </a-row>
          <!-- 模态窗 -->
           <div>
    <a-modal v-model:visible="visible" 
    :title="modelstates._id? 'Update':'Save'"
    @cancel="closemodel"
    @ok="handleOk"
    :width="700"
    >
    <template #footer>
      <a-button @click="closemodel">cancel</a-button>
      <a-button @click="handleOk" type="primary" class="btn_ok">Ok</a-button>
    </template>
        <a-form
      :model="modelstates"
      :rules="rules"
      name="basic"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinishForm"
      @finishFailed="onFinishFailedForm"
    >
      <a-form-item
        label="name"
        name="name"
      >
        <a-input v-model:value="modelstates.name" />
      </a-form-item>

      <a-form-item
        label="description"
        name="description"
      >
        <a-input v-model:value="modelstates.description" />
      </a-form-item>

      <a-form-item
        label="template"
        name="template"
      >
        <a-input  v-model:value="modelstates.template" />
      </a-form-item>
      <a-form-item
        label="template_en"
        name="template_en"
      >
        <a-input v-model:value="modelstates.template_en" />
      </a-form-item>


      <a-form-item 
      label="params"
      
      >
      <template v-for="item in modelstates.params">
        <a-tag color="blue" :closable="true" @close="closepar(item)">name:{{item.name}} type:{{item.type}}</a-tag>
        </template>
      </a-form-item>
      <a-form-item
      name="params"
      label=" ">
      <!-- <template v-for="item in modelstates.params"> -->
      <a-input v-model:value="obj.name" placeholder="Parameter name"/>
      <a-input v-model:value="obj.type" placeholder="Parameter type"/>
      <a-button @click="addparams(obj)" type="primary">+</a-button>
      <!-- </template> -->
      </a-form-item>

<!-- tags标签 -->
      <a-form-item
      label="tags"
      name="tags" >
      <template v-for="(tag, index) in states.tags" :key="tag">
        <a-tooltip v-if="tag.length > 20" :title="tag">
          <a-tag :closable="true" @close="handleClose(tag)">
            {{ `${tag.slice(0, 20)}...` }}
          </a-tag>
        </a-tooltip>
        <a-tag v-else-if="tag.length==0"></a-tag>
        <a-tag v-else :closable="true" @close="handleClose(tag)">
          {{tag}}
        </a-tag>  
      </template>
          <a-input
            v-if="states.inputVisible"
            ref="inputRef"
            v-model:value="states.inputValue"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
        <a-tag v-else style="background: #fff; border-style: dashed" 
        @click="showInput">
          <plus-outlined />
          New Tag
        </a-tag>
      </a-form-item>
  </a-form>
    </a-modal>
  </div>

          
          <!-- 表格的结构 -->

    <a-table bordered
    row-key="record=>record._id" 
      :columns="columns" 
      :data-source="tableData" 
      :row-selection="rowSelection"
      class="components-table-demo-nested"
      @expand="expend">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
    </template>

    <template #bodyCell="{ column,text, record }">
          <!-- <template v-if="['name', 'description','template','tags'].includes(column.dataIndex)">
          </template> -->
          <template v-if="column.key === 'tags'">
              <span>
                <a-tag
                  v-for="tag in record.tags"
                  :key="tag"
                  :color="tag === 'test' ? 'volcano' : 'red'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
          </template>
          <template v-if="column.key === 'params'">
              <span>
                <a-tag
                  v-for="tag in record.params"
                  :key="tag"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
          </template>
          
          <template v-else-if="column.key === 'action'">
              <span >
                  <a @click="edit(record)">Edit</a>
                    <a-divider type="vertical" />
                        <a-popconfirm
                          title="Are you sure delete this task?"
                          ok-text="Yes"
                          cancel-text="No"
                          @confirm="confirm(record)"
                          @cancel="cancel"
                        >
                      <a >Delete</a>
                    </a-popconfirm>
              </span>
          </template>
    </template>
    <!-- 嵌套的子表格 -->
   
      <a-table 
      slot="expandedRowRender" 
      slot-scope="record"
      :columns="innerColumns" 
      :rowKey="item=>item.key"
      :data-source="record.params" 
      >
        <template #bodyCell="{ column,record }">
        
        </template>
        </a-table>
      </a-table>
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
  .ant-table-wrapper{
    margin-top: 1.875rem;
  }
  .right-content{
  padding: 1.25rem 0;
  }
  .ant-form-item{
    margin-bottom: 1.25rem;
  }
  .btn_ok{
    width:4.375rem
  }
  </style>