<script lang="ts">
export default { name: 'AWModeler'}
</script>

<!-- SUT --> system under test
<!-- json数据类型 -->
<!-- 树形基本功能 -->



<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount, defineComponent, UnwrapRef, onMounted, nextTick, watch } from 'vue';
import type { FormProps, SelectProps, TableProps, TreeProps } from 'ant-design-vue';
  import {  CarryOutFilled,  CarryOutOutlined,  SmileTwoTone, SmileOutlined,DownOutlined } from '@ant-design/icons-vue'
import { Tree, Dropdown, Space, Tooltip, Modal, Alert, Menu } from 'ant-design-vue';
import { SplitPanel } from '@/components/basic/split-panel';
import { message } from 'ant-design-vue/es'
import { useRouter } from 'vue-router'
import request from '@/utils/request';
import { cloneDeep } from 'lodash-es';
import { Rule } from 'ant-design-vue/es/form';
import { tableSearch, FormState, paramsobj, ModelState, statesTs } from "./componentTS/awmodeler";
// const aw = awStore()
// const [DynamicTable, dynamicTableInstance] = useTable();
// const [showModal] = useFormModal();

// const deptListLoading = ref(false);
let tableData= ref([])
let searchobj: tableSearch = reactive({
  search: "",
  size:20
})
async function query(data?: any) {    
  let rst = await request.get("/api/hlfs", { params: data || searchobj })
  if (rst.data) {
      tableData.value = rst.data.data 
      return rst.data
  }
}
console.log(tableData.value);

onMounted(() => {
  query()    
}) 
// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
      search: ''
});
      let highlight = ref<any>([])
      let descriptionLight=ref<any>([])
      let templateLight=ref<any>([])
const handleFinish: FormProps['onFinish'] = (values: any) => {
  query(formState)
      highlight.value=tableData.value.filter((item:any, index: any) => {
        return item._highlight
        })
      
 
};

 highlight.value.forEach((item: any) => {
        if (item.description) {
          descriptionLight.value.push(...item.description)            
        }
        if (item.template) {
          templateLight.value.push(...item.template)
        }
 });
      console.log(descriptionLight.value)
 
    
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
    return Promise.reject("Please input your template_en!")
  } else {
    return Promise.resolve()
      
  }
}
let rules: Record<string, Rule[]> = {
  name: [{ required: true, validator: checkName, trigger: 'blur' }],
  description: [{required: true, validator: checkDesc, trigger: 'blur' }],
  template: [{ required: true, validator: checktem, trigger: 'blur' }],
  template_en: [{ validator: checkTemen, trigger: 'blur' }],
      
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
  clear()
  visible.value = false;
  query()
  console.log(modelstates.value);
  
}
// 模态窗表单

let partype = ref('')
  const options = ref<SelectProps['options']>([
      {
        value: 'Str',
        label: 'Str',
      },
      {
        value: 'undefined',
        label: 'undefined',
      },
      {
        value: 'number',
        label: 'number',
      },
      {
        value: 'boolean',
        label: 'boolean',
    },
      {
        value: 'null',
        label: 'null',
    },
     {
        value: 'Array',
        label: 'Array',
    },
     {
        value: 'Object',
        label: 'OBject',
    },
    {
      value: 'SUT',
        label:'SUT'
      }
    ]);
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
const handleChange = (value: any) => {
      console.log(value);
      
      obj.value.type = value
  console.log(obj);
  
    };

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

    function addparams() {
  console.log(obj);
  modelstates.value.params.push({...obj.value})
      console.log(modelstates.value.params)
  
}
  // 删除params的函数
function closepar(item:any) {
  console.log(item);
  const parry = modelstates.value.params.filter((paramsitem: { name: any; }) => paramsitem.name !== item.name)
  modelstates.value.params=parry
 }


const onFinishForm = async (modelstates: any) => {
  modelstates.value.tags = states.tags
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
      clear()
  visible.value = false;
      
    };
    const onFinishFailedForm = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
};
// 添加的表单tags
let inputRef = ref();
    let states = reactive<statesTs>({
      tags: [],
      inputVisible: false,
      inputValue: '',
    });

    const handleClose = (removedTag: string) => {
      const tags = states.tags.filter((tag: string) => tag !== removedTag);
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

// 修改的函数
const edit = (rowobj:any) => {
  
  showModal()
  modelstates.value.name=rowobj.name
  modelstates.value.description=rowobj.description
  modelstates.value.template=rowobj.template
  modelstates.value._id = rowobj._id
  states.tags = rowobj.tags
  modelstates.value.params = [...rowobj.params]
  console.log(rowobj.params);
  // let{name  description:,  template: _id:""}={...obj}
}
const rowSelection: TableProps['rowSelection'] = {
  onChange: (selectedRowKeys: any[], selectedRows: any) => {
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
 defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
  }
})

const wrapperCol={span:24,offset:12}
const treeData: TreeProps['treeData'] = [
   {
        title: 'Setup',
        key: '0-0',
        children: [
          {
            title: 'Display and brightness',
            key: '0-0-0',
            children: [
              { title: 'Rest screen style', key: '0-0-0-0' },
              {
                key: '0-0-0-1',
              },
              { title: 'Auto lock', key: '0-0-0-2' },
            ],
          },
          {
            title: 'Portable tools',
            key: '0-0-1',
            children: [{ title: 'gesture', key: '0-0-1-0' }],
          },
          {
            title: 'System settings',
            key: '0-0-2',
            children: [
              { title: 'Reset system', key: '0-0-2-0' },
              {
                title: 'Background refresh',
                key: '0-0-2-1',
              },
            ],
          },
        ],
  },
       {
        title: 'test',
        key: '0-1',
        children: [
          {
            title: 'Audio and video test',
            key: '0-1-0',
            children: [
              { title: 'Function panel', key: '0-1-0-0' },
              { title: 'Collect sound', key: '0-1-0-1' },
            ],
          },
        ],
      },
];
const onSelect: TreeProps['onSelect'] = (selectedKeys: any, info: any) => {
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
 <a-form-item :wrapper-col="{span:20}">

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

      <a-form-item 
      label="params"
      name="params"
      >
      <template v-for="item in modelstates.params" :key="item.name">
        <a-tag color="blue" :closable="true" @close="closepar(item)">name:{{item.name}} type:{{item.type}}</a-tag>
        </template>
      </a-form-item>
  </a-form>
  <a-form layout="inline" :model="obj" class="formPar">
          <a-form-item name="name">
            <a-input v-model:value="obj.name" placeholder="Parameter name"/>
          </a-form-item>
          <a-form-item label="type" name="type">
               <a-select
                ref="select"
                v-model:value="partype"
                style="width: 120px"
                @change="handleChange"
                :options="options"
                placeholder="Parameter Type"
              >
                <!-- <a-select-option v-for="item in partype" :key="item" :value="item">{{item}}</a-select-option> -->
              </a-select>
          </a-form-item>
          <a-form-item>
            <a-button @click="addparams" type="primary">+</a-button>
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
          <template v-if="column.key === 'description'"
          >
          <div v-for="desc in descriptionLight" :key="desc">
            <p v-text="desc"></p>
          </div>
          </template>
           <template v-if="column.key === 'template'"
          >
          <div v-for="desc in templateLight" :key="desc">
            <p v-html="desc"></p>
          </div>
          </template>
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
              <span  v-for="tags in record.params"
                  :key="tags">
                <a-tag
                    >
                  {{ tags.name }}
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
  .formPar{
  display: flex;
  justify-content: center;
  }
  </style>