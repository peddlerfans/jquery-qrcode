<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount, UnwrapRef, onMounted, nextTick, getCurrentInstance } from 'vue';
import type { FormProps, SelectProps, TreeProps } from 'ant-design-vue';
import {
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SwapOutlined,
} from '@ant-design/icons-vue';
import { Tree, Dropdown, Space, Tooltip, Modal, Alert, Menu } from 'ant-design-vue';
import { SplitPanel } from '@/components/basic/split-panel';
import request from "@/utils/request"
import { tableSearch ,FormState, statesTs, ModelState} from './componentTS/metatemplate';
import cloneDeep from 'lodash-es/cloneDeep';
// import { FormState } from './componentTS/awmodeler';
// 表单查询的数据
const formState: UnwrapRef<FormState> = reactive({
      search: '',
      q:'category:dynamic'
});
// 表单完成后的回调
const handleFinish: FormProps['onFinish'] = async (values: any) => {
  query(formState)
};
// 表单失败后的回调
const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => {
      console.log(errors);
};
// 表格的数据
let tableData= ref([])
let searchobj: tableSearch = reactive({
  search: "",
  // page: 1,
  // perPage:10,
  q:'category:dynamic'
})
async function query(data?:any){
 let rst= await request.get("/api/templates",{params:data || searchobj})
 console.log(rst.data);
 tableData.value=rst.data
}


onMounted(()=>{
  query()
  // updTable()
})
// 分页的数据
let pagination=ref( {
        pageNo: 1,
        pageSize: 10, // 默认每页显示数量
        showQuickJumper: true,
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ['10', '20', '50', '100'], // 每页数量选项
        showTotal: (total: any) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current: any, pageSize: any) => onSizeChange(current, pageSize), // 改变每页数量时更新显示
        onChange:(page: any,pageSize: any)=>onPageChange(page,pageSize),//点击页码事件
        total:0 //总条数
       })

const onPageChange = async(page: number, pageSize: any) => {
  pagination.value.pageNo = page
  pagination.value.pageSize=pageSize
  // searchobj.page= page
  // searchobj.perPage = pageSize
  if (formState.search) {
    searchobj.search=formState.search
  } else {
    searchobj.search=''
  }
       await query()
   }
  //  分页的数据
const onSizeChange =async (current: any, pageSize: number) => {
        pagination.value.pageNo = current
        pagination.value.pageSize=pageSize
      //  searchobj.page= current
  // searchobj.perPage = pageSize
      if (formState.search) {
    searchobj.search=formState.search
      } else {
    searchobj.search=''
  }
     await query()
   }
   const expend = (isExpand:any,rected:any) => {
  console.log(isExpand,rected);
  
}
// 给表格的数据中遍历添加一个递增数

// interface DataItem {
//   key: string;
//   name: string;
//   age: number;
//   address: string;
// }
// const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

// function updTable(){
//   const arr=(dataArr:any)=> dataArr.map((item: any,index: string)=>({...item,key:index}))
// tableData.value=arr(tableData.value)
// }
// console.log(tableData.value);

// const edit = (key: string) => {
 
//   console.log(tableData.value);
//   editableData[key] = cloneDeep(tableData.value.filter(item => key === item.key)[0]);
// };
// const save = (key: string) => {
//   Object.assign(tableData.value.filter(item => key === item.key)[0], editableData[key]);
//   delete editableData[key];
// };
// const cancel = (key: string) => {
//   delete editableData[key];
// };
// 表格的结构
const columns = reactive<Object[]>(
  [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
    },

   {
      title: 'tags',
      dataIndex: 'tags',
    key:'tags'
    },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
]
)
const visible = ref<boolean>(false);
const showModal = () => {
  console.log(123);
  
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
}
// 模态窗表单

let partype = ref('')
  const optiones = ref<SelectProps['options']>([
      {
        value: 'str',
        label: 'str',
      },
      {
        value: 'float',
        label: 'float',
      },  
      {
        value: 'false',
        label: 'false',
    },
      {
        value: 'number',
        label: 'number',
    },
    {
        value: 'int',
        label: 'int',
    },
    {
      value: 'SUT',
        label:'SUT'
      }
    ]);
    let modelstates = ref<ModelState>({
      name: '',
      description: '',
      _id: "",
      tags:[]
    });
    
    // 清除模态窗数据
    const instance=getCurrentInstance()
const clear = () => {
  modelstates.value = {
    name: "",
    description: '',
    _id: "",
    tags: []
  }
    states.tags = []; 
    
    (instance?.refs.refForm as any).resetFields()

}
// 表单提交的方法
const onFinishForm=(modelstates:any)=>{}
// 表单提交失败的方法
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
// 点击添加标签的方法
const showInput = () => {
      states.inputVisible = true;
      nextTick(() => {
        inputRef.value.focus();
        })
    };
// tag标签失去焦点之后添加的tags
const handleInputConfirm = () => {
  let tags = states.tags;
  if (states.inputValue && tags.indexOf(states.inputValue) === -1) {
    tags = [...tags, states.inputValue.toUpperCase()];
  }
  Object.assign(states, {
    tags,
    inputVisible: false,
    inputValue: '',
 });  
}
// 移除tags
const handleClose = (removedTag: string) => {
      const tags = states.tags.filter((tag: string) => tag !== removedTag);
      states.tags = tags;
    };
</script>

<template>
  <main style="height:100%;overflow-x: hidden!important;">
      <header class="block shadow" style="width:100%;margin-bottom: 1rem">
        <a-row>
        <a-col :span="20">
          <AForm layout="inline" class="search_form" :model="formState" @finish="handleFinish"
            @finishFailed="handleFinishFailed" :wrapper-col="{ span: 24 }">
            <a-col :span="20">

              <a-mentions v-model:value="formState.search"
                placeholder="input @ to search tags, input name to search MBT">
                <a-mentions-option value="tags:">
                  tags:
                </a-mentions-option>
              </a-mentions>
            </a-col>

            <a-col :span="4">
              <a-button type="primary" html-type="submit">search</a-button>
            </a-col>

          </AForm>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="showModal">
            <template #icon>
              <plus-outlined />
            </template>
          </a-button>
        </a-col>
      </a-row>
      </header>
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
        ref="refForm"
      :model="modelstates"
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
      <a-table :columns="columns" :data-source="tableData" bordered>
    <template #bodyCell="{ column, text, record }">
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
    </template>
  </a-table>
      
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