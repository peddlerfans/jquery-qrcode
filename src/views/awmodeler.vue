<script lang="ts">
export default { name: 'AWModeler'}
</script>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount, defineComponent, UnwrapRef, onMounted, nextTick, watch, getCurrentInstance } from 'vue';
import type { FormProps, SelectProps, TableProps, TreeProps, } from 'ant-design-vue';
  import { CarryOutOutlined,  SmileTwoTone, SmileOutlined, DownOutlined,PlusOutlined,SearchOutlined} from '@ant-design/icons-vue'
import {  Space, Tooltip, } from 'ant-design-vue';
import { SplitPanel } from '@/components/basic/split-panel';
import { message } from 'ant-design-vue/es'
import request from '@/utils/request';
import { Rule } from 'ant-design-vue/es/form';
import { tableSearch, FormState, paramsobj, ModelState, statesTs } from "./componentTS/awmodeler";
let tableData= ref([])
let searchobj: tableSearch = reactive({
  search: "",
  size:30
})
async function query(data?: any) {    
  let rst = await request.get("/api/hlfs", { params: data || searchobj })
  // console.log(rst.total.value);
  if (rst.data) {
    pagination.value.total = rst.total
    console.log(pagination.value.total);
    
    tableData.value = rst.data
      return rst.data
  }
}
onMounted(() => {
  
  query()    
}) 
const instance=getCurrentInstance()
// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
      search: ''
});
const handleFinish: FormProps['onFinish'] = (values: any) => {
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
      onFinishForm(modelstates)
      clear()
};
// 关闭模态窗触发事件
const closemodel = () => {
  clear()
  visible.value = false;
  query()
}
// 模态窗表单

let partype = ref('')
  const options = ref<SelectProps['options']>([
      {
        value: 'Str',
        label: 'Str',
      },
      {
        value: 'Number',
        label: 'Number',
      },
      {
        value: 'ture',
        label: 'ture',
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
// 点击添加params的函数

let obj = ref<paramsobj>({ name: "", type: "" })
// 添加功能的函数
async function saveAw(data: any) {
  return new Promise((resolve, reject) => {
    request.post("/api/hlfs", data).then(res => {
    console.log(res);
    
  }).catch(function (error) {
    if (error.response.status == 409) {
      message.error("Duplicate name or description")
    }
  });
  })
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
    params: [],
    tags: []
  },
    obj.value = {
    name: '',
    type:''
  }
    states.tags = []; 
    
    (instance?.refs.refForm as any).resetFields()

}
// 添加和删除param
    function addparams() {
  console.log(obj);
  modelstates.value.params.push({...obj.value})
      
  
}
function closepar(item:any) {
  console.log(item);
  const parry = modelstates.value.params.filter((paramsitem: { name: any; }) => paramsitem.name !== item.name)
  modelstates.value.params=parry
}
// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Please input your name!")
  }else {
    return Promise.resolve();
  }
  
}
let checkDesc = async (_rule: Rule, value: string) => { 
  if (!value) {
    return Promise.reject("Please input your description!")
  }else  {
    return Promise.resolve();
  }
  
} 
let checktem = async (_rule: Rule, value: string) => { 
  
  if (!value) {    
    return Promise.reject("Template or templ is required")
  } else {
    return Promise.resolve();
  }
}
let rules: Record<string, Rule[]> = {
  name: [{ required: true, validator: checkName, trigger: 'blur' }],
  description: [{ required: true, validator: checkDesc, trigger: 'blur' }],
  template: [{ required: true, validator: checktem, trigger: 'blur' }],
}
let refForm=ref(null)
const onFinishForm = async (modelstates: any) => {
  console.log(modelstates.value);
  
  modelstates.value.tags = states.tags
  if (modelstates.value.name && modelstates.value.description && modelstates.value.template) {
    if (modelstates.value._id) {
       await updateAw(`/api/hlfs/${modelstates.value._id}`, modelstates.value)
        message.success("Modified successfully")
    } else {
        delete modelstates.value._id
        await saveAw(modelstates.value)
        message.success("Added successfully") 
    } 
    visible.value = false;
    clear()
    query()
    }else {
    return message.error("name and descript is required")
  }
  }
    // 判断修改或添加
      
    // }
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
    tags = [...tags, states.inputValue.toUpperCase()];
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
    dataIndex: 'Name',
    key: 'Name',
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

// 分页的数据
let pagination=ref( {
        pageNo: 1,
        pageSize: 10, // 默认每页显示数量
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ['10', '20', '50', '100'], // 每页数量选项
        showTotal: (total: any) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current: any, pageSize: any) => onSizeChange(current, pageSize), // 改变每页数量时更新显示
        onChange:(page: any,pageSize: any)=>onPageChange(page,pageSize),//点击页码事件
        total:0 //总条数
       })

const onPageChange = (page: number, pageSize: any) => {
        console.log(page,pageSize);
      pagination.value.pageNo = page
       query()
   }
   const onSizeChange=(current: any, pageSize: number)=> {
       pagination.value.pageNo = 1
       pagination.value.pageSize = pageSize
       query()
   }

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
let treeData: TreeProps['treeData'] = [
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
// 递归查询当前选中节点的方法
const getchildKey = (childs: any, findKey: string):any => {
  let finditem = null;
   for (let i = 0, len = childs.length; i < len; i++) {
     let item = childs[i]
     if (item.title !== findKey && item.children && item.children.length > 0) {
       finditem = getchildKey(item.children, findKey)
     }
     if (item.title == findKey) {
       finditem = item
     }
     if (finditem != null) {
       break
     }
   }
   return finditem
}
// 递归查询父节点children
const getTreeParentChilds=(childs :any, findKey: any):any=> {
   let parentChilds = []
   for (let i = 0, len = childs.length; i < len; i++) {
     let item = childs[i]
     if (item.key !== findKey && item.children && item.children.length > 0) {
       parentChilds = getTreeParentChilds(item.children, findKey)
     }
     if (item.key == findKey) {
       parentChilds = childs
     }
     if (parentChilds.length > 0) {
       break
     }
   }
   return parentChilds
}

// 查询树节点的方法
const expandedKeys = ref<(string | number)[]>([]);
 const autoExpandParent = ref<boolean>(true);
const searchValues = ref<string>('');
watch(searchValues, value => {  
  console.log(treeData);
      
      if(value.length != 0){
        const expanded = treeData?.filter(item => {
          console.log(item);
          
        if(item.title.includes(value)){
          return item.key;
        } else {
          if (item.children) {
            
            item.children.filter(childItem => {
              
              if (childItem.title.includes(value)) {
                // console.log(item.children?.includes(childItem.key))
                return childItem.key
              }
            })
          }
        }
        
        return null;
      })
        // .filter((item, i, self) => item && self.indexOf(item) === i);
      console.log('tree',expanded);
      console.log('datalist',treeData)
      console.log(value);

      expandedKeys.value= expanded as any;
      searchValues.value = value;
      autoExpandParent.value = true;
      }else{
        //折叠起来
        autoExpandParent.value =  false;
      }
    })

const onExpand = (keys: any) => {
      console.log(keys);
      expandedKeys.value = keys ;
      autoExpandParent.value = true;
    };

// 右键点击树形控件触发的事件
const onContextMenuClick = (treeKey: string, menuKey: string | number) => {
      console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`);
};
const deltree = (key:string) => {
  console.log(key);
  let parent = getTreeParentChilds(treeData, key)
  let delIndex = parent.findIndex((item: { key: string; }) => item.key == key)
  console.log(delIndex);
  
}
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
            <a-input-search v-model:value="searchValues" style="margin-bottom: 8px" placeholder="Search" />
          <a-tree
            :show-line="true"
            :default-expanded-keys="['0-0-0']"
            :tree-data="treeData"
            @select="onSelect"
            :expanded-keys="expandedKeys"
            :auto-expand-parent="autoExpandParent"
            @expand="onExpand"  >
      <template #icon><carry-out-outlined /></template>
  <template #title="{key:treeKey, title }" >
    <a-dropdown :trigger="['contextmenu']" >
        <a-tooltip placement="right" overlayClassName="bgc_tooltip">
            <template #title >
              <a-menu  @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">
                <a-menu-item  key="1" >add Node</a-menu-item>
                <a-menu-item key="2">upd Node</a-menu-item>
                <a-menu-item key="3" @click="deltree(treeKey)">del Node</a-menu-item>
              </a-menu>
            </template>
              <template v-if="searchValues &&  title.includes(searchValues)">
                <div style="color: #f50; border:1px solid red"> 
                  <span>{{title}}</span>
                </div>
                </template>
              <template v-else>{{ title }}</template>
        </a-tooltip>
    </a-dropdown>
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
      <a-form-item :wrapper-col="{span:20}" class="searchForm">

      <a-input style="width:18.15rem" v-model:value="formState.search" placeholder="hlf">
      <template #prefix><search-outlined /></template>
      </a-input>
    
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
        ref="refForm"
      :model="modelstates"
      name="basic"
      :rules="rules"
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
      :pagination="pagination"
      @expand="expend">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'Name'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
    </template>

    <template #bodyCell="{ column,text, record }">
      <template v-if="column.key === 'Name'">
          <div v-if="record.name.indexOf(formState.search)!=-1" >
            <p v-html="record.name.replace(formState.search,`<b style='color:red'>${formState.search}</b>`)"></p>
          </div>
          <div v-else>
            <p>{{record.name}}</p>
          </div>
          </template>
          <template v-if="column.key === 'description'">
          <div v-if="record.description.indexOf(formState.search)!=-1" >
            <p v-html="record.description.replace(formState.search,`<b style='color:red'>${formState.search}</b>`)"></p>
          </div>
          <div v-else>
            <p>{{record.description}}</p>
          </div>
          </template>
           <template v-if="column.key === 'template'"
          >
          <div v-if="record.template.indexOf(formState.search)!=-1">
            <p v-html="record.template.replace(formState.search,`<b style='color:red'>${formState.search}</b>`)"></p>
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
  margin-top: -1.25rem;
      margin-left: 6.25rem;
  }
  .searchForm{
    margin-right: 0.75rem;
  }
  .highlight{
    background-color: yellow;
  }
  
  </style>
  <style lang="less">
.bgc_tooltip .ant-tooltip-inner{
    
    background-color: white!important;
    width: 7.5rem;
    height: 6.375rem;
    .ant-menu-vertical{
      width: 100%;
      height: 100%;
      .ant-menu-item-only-child{
        width: 100%;
        height: 25%;
        line-height: 1.5625rem;
      }
    }
    }
  
  </style>
