<script setup lang="ts">
import {
  ref,
  reactive,
  computed,
  onBeforeMount,
  defineComponent,
  UnwrapRef,
  onMounted,
  nextTick,
  toRaw,
  getCurrentInstance,
unref
} from 'vue';
import { useRouter } from 'vue-router';

import useTable from '@/composables/useTable';
import request from '@/utils/request';
import {
  templateUrl
} from '@/appConfig'
import * as _ from 'lodash'
import { cloneDeep } from 'lodash-es';
import type {
CascaderProps,
  FormProps,
  SelectProps,
} from 'ant-design-vue';
import {
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SwapOutlined,
} from '@ant-design/icons-vue';
import {
  message
} from 'ant-design-vue/es'
import { Rule } from 'ant-design-vue/es/form';
import { Dropdown, Space, Tooltip, Modal, Alert, Menu } from 'ant-design-vue';
import {
  tableSearch,
  FormState,
  paramsobj,
  ModelState,
  statesTs,
  Model,
  Factor,
  Constraint,
  valueStatesTs,
} from "./componentTS/dynamictemplate";
import { useI18n } from "vue-i18n";

const { t } = useI18n()

// Specify the api for dynamic template data CRUD
const url = templateUrl;



// ######## Model list table ########

// Inital a null reference for the model list table
const tableRef = ref()

const initModelAttr={
  outputLanguage: '',
  templateEngine: '',
  data: '',
  history: []
}
// ##### Invoke table hook #####
// Initialize  without pagination ??????

const columns1 = [ // Setup the header of columns
  {
    title: 'component.table.name',
    dataIndex: 'name',
    key: 'name',
    // width: 40
  },
  {
    title: 'component.table.description',
    dataIndex: 'description',
    key: 'description',
    // width: 120
  },
  {
    title: 'component.table.tags',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: 'component.table.action',
    dataIndex: 'action',
    key: 'action',
    // width: 100
  },


]

const {
  dataSource, columns, originColumns, tableLoading, pagination, selectedRowKeys,
  updateTable, onTableRowSelectChange, tableResize
} = useTable({
  table: tableRef, // Predefined a null reference which might be an instance of component
  columns: [ // Setup the header of columns
    { title: 'Name', dataIndex: 'name', key: 'name', width: 40 },
    { title: 'Description', dataIndex: 'description', key: 'description', width: 120 },
    {
      title: 'Tags', dataIndex: 'tags', key: 'tags', width: 100, customRender: ((opt) => {
        // Check whether tags is an array
        if (_.isArray(opt.value)) {
          return opt.value.toString();
        }
        else return opt.value
      })
    },
    { title: 'Action', dataIndex: 'action', key: 'action', width: 100 },


  ],
  updateTableOptions: {
    fetchUrl: url
    // '/mbtlist/mbt-models'//For mockup
    // '/api/test-models'// For real backend
    // '/mbtapi/mbt-models'
  }
})



// ######## Search bar ########

// Search
let searchobj: tableSearch = reactive({
  search: "",
  q: "category:codegen",
  size: 20,
  page: 1,
  perPage: 10
})


// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
  search: '',
  q: "category:codegen",
});

// 表格的数据
let tableData = ref<Array<any>>([])

// 点击跳转metamodel
let router = useRouter()

// Setup query for the searching in table
async function query(data?: any) {

  let rst;
  // Search tags, cut off the first 6 characters '@tags:' and pass the rest (trim & uppercase)
  if (data && data.search.toString().substring(0, 6) == '@tags:') {
    rst = await request.get(url + `?q=tags:` + data.search.substring(6, data.search.length).toUpperCase().trim())
  } else {
    // Inital render search
    rst = await request.get(url, { params: data || searchobj })
  }

  // If search successfully, it returns a new table and reassign to dataSource
  // Somehow the list table would be rerendered
  if (rst.data) {
    pagination.total=rst.total
    dataSource.value = rst.data
    tableData.value = rst.data

    return rst.data
  }
}

const handleFinish: FormProps['onFinish'] = (values: any) => {

  query(formState)

};

// Catch search failed
const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => {
  console.log(errors);
};

// ??????
const instance = getCurrentInstance()



// ##################################
// ######## Model CRUD Start ########
// ##################################

// Modal is hidden by default
const visibleModel = ref<boolean>(false);
let inputRef1 = ref();
let inputRef2 = ref();

// Initialize an obj for model meta information
let modelState = reactive<ModelState>({
  name: '',
  description: '',
  _id: "",
  tags: [],
  editing: false,
  inputVisible: false,
  inputValue: '',
});


let searchInput = ref()
let cascder = ref(false)
let selectvalue = ref("")
let selectoptions:any = ref([
   {
    value: 'tags:',
    label: 'tags:',
    isLeaf: false,
  },
  {
    value: 'name:',
    label: 'name:',
    
  },
])
const loadData: CascaderProps['loadData'] = async (selectedOptions:any  ) => {
    console.log(selectedOptions);
      let rst = await request.get("/api/templates/_tags", { params: { q: "category:codegen" } })
      const targetOption = selectedOptions[0];
      targetOption.loading = true
        if (rst.length > 0) {
          rst = rst.map((item: any) => ({ value: item, label: item }))
          targetOption.children = rst
        }
        targetOption.loading = false;
        selectoptions.value = [...selectoptions.value];
    };
const onSelectChange = async (value: any) => {
  if (value) {
    let reg = new RegExp("," ,"g")
    formState.search += value.toString().replace(reg,'')
  }  
  selectvalue.value = ''
  cascder.value = false
  nextTick(() => {
    searchInput.value.focus()
  })
}
const inputChange = (value: any) => {
  if (formState.search == "@") {
    cascder.value = true
  }
}



// 清除模态窗数据
const clearModelState = () => {

  modelState.name = ''
  modelState.description = ''
  modelState._id = ""
  modelState.tags = []
  modelState.editing = false // Toggle model edit mode
  modelState.inputVisible = false
  modelState.inputValue = '';
}

const showModal = () => {
  visibleModel.value = true;
};

// 关闭模态窗触发事件
const closeModel = () => {
  (instance?.refs.refModelForm as any).resetFields();
  visibleModel.value = false;
  clearModelState()

  // query()
}

// Handel Tags in modal form
const handleCloseTag = (removedTag: string) => {
  const tags = modelState.tags.filter((tag: string) => tag !== removedTag);
  modelState.tags = tags;

};

const newModelTagInput = (index: number) => {
  modelState.inputVisible = true;

  if (index === 1) {
    nextTick(() => {
      inputRef1.value.focus();
      inputRef1.value.toString().toUpperCase();
    })
  } else {
    nextTick(() => {
      inputRef2.value.focus();
      inputRef2.value.toString().toUpperCase();
    })
  }

};

const handleModelTagConfirm = () => {
  let tags = modelState.tags;
  if (modelState.inputValue && tags.indexOf(modelState.inputValue) === -1) {
    tags = [...tags, modelState.inputValue.toUpperCase()];
  }
  Object.assign(modelState, {
    tags: tags,
    inputVisible: false,
    inputValue: '',
  });
}

// 修改的函数
const editModel = (rowobj: any) => {
  // showModal()
  modelState.name = rowobj.name
  modelState.description = rowobj.description
  modelState._id = rowobj._id
  modelState.tags = rowobj.tags
  modelState.editing = true

}
let refModelForm=ref()
const saveModel = async () => {
  const model = {
    name: modelState.name,
    description: modelState.description,
    tags: toRaw(modelState.tags),
    category: "codegen",
    templateText: '',
    model: initModelAttr
  }

  unref(refModelForm).validate('name', 'description').then(async (res: any) => { 
    let rst = await request.post(url, model)
    if (rst) {
      tableData.value.unshift(rst)
    }
    message.success(t('templateManager.createModelSuccess'))
    closeModel()
  })
}
let refForm=ref()
let refFormdec=ref()
const updateModel = async () => {
  const model = {
    name: modelState.name,
    description: modelState.description,
    tags: toRaw(modelState.tags),
    category: "codegen",
    templateText: '',
  }
unref(refForm).validate('name').then(async (res:any) => {
    unref(refFormdec).validate().then(async (res:any) => {
      if (modelState._id) {
    let rst = await request.put(url + `/${modelState._id}`, model)
    query()
    message.success(t('templateManager.updateModelSuccess'))
  } else {
    // delete modelState.value._id
    message.warning(t('templateManager.readModelErr'))
  }
  clearModelState()
    })
    
  })
}

const deleteModel = async (id: string) => {
  let rst = await request.delete(url + `/${id}`)
  query()
  message.success(t('component.message.delText'));
}

const cancelModel = () => {
  modelState.name = ''
  modelState.description = ''
  modelState._id = ""
  modelState.tags = []
  modelState.editing = false
  modelState.inputVisible = false
  modelState.inputValue = ''
}


// ################################
// ######## Model CRUD END ########
// ################################


// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  let reg=/^[a-zA-Z0-9\$][a-zA-Z0-9\d_]*$/
  let reg1=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
  if (!value) {
    return Promise.reject(t('templateManager.nameinput'))
  } else if(!reg.test(value) && !reg1.test(value)){
      return Promise.reject(t('templateManager.namehefa'))
  }else{
    let rst=await request.get("/api/templates",{params:{q:"category:codegen",search:`@name:${value}`}})
      if(rst.data && rst.data.length>0 && rst.data[0].name==value){
        // message.error("Duplicate name")
        // modelstates.value.name=""
 
        return Promise.reject(t('templateManager.duplicate'))
      }else{
        return Promise.resolve();
      
      }
  }
}

let checkDesc = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject(t('MBTStore.tip5'));
  } else {
    return Promise.resolve();
  }
};

let rules: Record<string, Rule[]> = {
  name: [{ required: true, validator: checkName, trigger: "blur" }],
  description: [{ required: true, validator: checkDesc, trigger: "blur" }],
};



// Antdv select
const focus = () => {
  console.log('focus');
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
};

const cancel = (e: MouseEvent) => {
  console.log(e);
};

onBeforeMount(() => {
  console.log("")
})

onMounted(() => {
  query()
})


let tableloading=ref(false)
let refCopy=ref()
let copyRule:Record<string,Rule[]>={
  name:[{required:true,validator:checkName,trigger:'blur'}],
}
let copyData:any = ref ({
  name:""
})
let copyVisible = ref<boolean>(false)
const copyName = (record:any) => {

    copyData.value.name = `${record.name}_clone`
    
    
    copyData.value = {...record,name:copyData.value.name}
    copyVisible.value = true
}
const copyOk=()=>{
  unref(refCopy).validate().then(async ()=>{
    tableloading.value=true
    delete copyData.value._id
   request.post('/api/templates',copyData.value).then((rst :any)=>{
     tableData.value.push(copyData.value)
    // pagination.value.total +=1
    let tableindex = tableData.value.indexOf(copyData.value)
    if(rst && rst._id){
      tableData.value[tableindex]._id=rst._id
      copyVisible.value = false
      tableloading.value=false
    }

   })
   
  })
}
</script>



<template>

  <main style="height:100%;overflow-x: hidden!important;">
    <header class="block shadow">
      <!-- <section class="block shadow flex-center"> -->

      <!-- 表单的查询 -->
      <a-row>
        <a-col :span="20">
          <AForm layout="inline" class="search_form" :model="formState" @finish="handleFinish"
                 @finishFailed="handleFinishFailed" :wrapper-col="{ span: 24 }">
            <a-col :span="20">

               <a-input v-model:value="formState.search"
              :placeholder="$t('awModeler.inputSearch1')"
              @change="inputChange"
              ref="searchInput"
              >
              </a-input>
              <a-cascader
              v-if="cascder"
              :load-data="loadData"
              v-model:value="selectvalue"
              placeholder="Please select"
              :options="selectoptions"
              @change="onSelectChange"
              ></a-cascader>
            </a-col>

            <a-col :span="4">
              <a-button type="primary" html-type="submit">{{ $t('common.searchText') }}</a-button>
            </a-col>

          </AForm>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="showModal">
            <template #icon>
              <plus-outlined />
            </template>
            {{ $t('templateManager.newCodegenTemp') }}
          </a-button>
        </a-col>
      </a-row>
    </header>


    <!-- 模态窗 -->

    <div>
      <a-modal v-model:visible="visibleModel"
               :title="modelState._id? $t('templateManager.updateCodegenTemp') : $t('templateManager.newCodegenTemp')" @cancel="closeModel" :width="900">

        <!-- Model meta info -->

        <h2>{{ $t('templateManager.template') }}</h2>

        <a-form ref="refModelForm" autocomplete="off" :model="modelState" :rules="rules" name="basic"
                :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-form-item :label="$t('component.table.name')" name="name">
            <a-input v-model:value="modelState.name" />
          </a-form-item>

          <a-form-item :label="$t('component.table.description')" name="description">
            <a-input v-model:value="modelState.description" />
          </a-form-item>

          <!-- tags标签 -->
          <a-form-item :label="$t('component.table.tags')" name="tags">
            <template v-for="(tag) in modelState.tags" :key="tag">
              <a-tooltip v-if="tag.length > 20" :title="tag">
                <a-tag :closable="true" @close="handleCloseTag(tag)">
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag v-else-if="tag.length==0"></a-tag>
              <a-tag v-else :closable="true" @close="handleCloseTag(tag)">
                {{tag}}
              </a-tag>
            </template>
            <a-input v-if="modelState.inputVisible" ref="inputRef1" v-model:value="modelState.inputValue" type="text"
                     size="small" :style="{ width: '78px' }" @blur="handleModelTagConfirm"
                     @keyup.enter="handleModelTagConfirm" />
            <a-tag v-else style="background: #fff; border-style: dashed" @click="newModelTagInput(1)">
              <plus-outlined />
              {{ $t('common.newTag') }}
            </a-tag>
          </a-form-item>
        </a-form>

        <template #footer>
          <a-button @click="closeModel">{{ $t('common.cancelText') }}</a-button>
          <a-button @click="saveModel" type="primary" class="btn_ok">{{ $t('common.saveText') }}</a-button>
        </template>


      </a-modal>
    </div>





    <!-- ######################### -->
    <!-- List of CodeGen templates -->
    <!-- ######################### -->
    <a-table :columns="columns1" 
    :data-source="tableData" bordered 
    :loading="tableloading"
    :pagination="pagination">
      <template #headerCell="{ column }">
        <span>{{ $t(column.title) }}</span>
      </template>
      <template #bodyCell="{ column, text, record }">
        <template v-if='column.key==="name"'>
          <div>
           <a-form v-if="modelState._id===record._id && modelState.editing" ref="refForm" :rules="rules"  :model="modelState" >
              <a-form-item name="name">
                <a-input
                :placeholder="$t('templateManager.codegenName')"  
                v-model:value.trim="modelState.name"
              style="margin: -5px 0" />
              </a-form-item>
            </a-form>
            <template v-else>
              <!-- <a href="javascript:;" @click="viewModel(record._id)">{{text}}</a> -->
              <a :href="`/#/codegenModeler/${record._id}/${record.name}`">{{text}}</a>
            </template>
          </div>
        </template>
        <template v-if='column.key==="description"'>
          <div>
             <a-form v-if="modelState._id===record._id && modelState.editing" ref="refFormdec" :rules="rules"  :model="modelState" >
              <a-form-item name="description">
                <a-input
                :placeholder="$t('templateManager.codegenDes')" 
                v-model:value.trim="modelState.description"
              style="margin: -5px 0" />
              </a-form-item>
            </a-form>
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-if="column.key === 'tags'">
          <template v-if="modelState._id===record._id && modelState.editing">
            <template v-for="(tag) in modelState.tags" :key="tag">
              <a-tooltip v-if="tag.length > 20" :title="tag">
                <a-tag :closable="true" @close="handleCloseTag(tag)">
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag v-else-if="tag.length==0"></a-tag>
              <a-tag v-else :closable="true" @close="handleCloseTag(tag)">
                {{tag}}
              </a-tag>
            </template>
            <a-input v-if="modelState.inputVisible" ref="inputRef2" v-model:value="modelState.inputValue" type="text"
                     size="small" :style="{ width: '78px' }" @blur="handleModelTagConfirm"
                     @keyup.enter="handleModelTagConfirm" />
            <a-tag v-else style="background: #fff; border-style: dashed" @click="newModelTagInput(2)">
              <plus-outlined />
              {{ $t('common.newTag') }}
            </a-tag>
          </template>

          <span v-else>
            <a-tag v-for="tag in record.tags" :key="tag"
                   :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.dataIndex === 'action'">
          <div class="editable-row-operations">
            <span v-if="modelState._id===record._id && modelState.editing">
              <a-typography-link type="danger" @click="updateModel()">{{ $t('common.saveText') }}</a-typography-link>
              <a-divider type="vertical" />
              <a @click="clearModelState()">{{ $t('common.cancelText') }}</a>
            </span>

            <span v-else>
              <a @click="editModel(record)">{{ $t('common.editText') }}</a>

              <a-divider type="vertical" />
              <a-popconfirm :title="$t('templateManager.delCodegenTemp')"
                            :ok-text="$t('common.yesText')"
                            :cancel-text="$t('common.noText')"
                            @confirm="deleteModel(record._id)"
                            @cancel="cancel">
                <a>{{ $t('common.delText') }}</a>
              </a-popconfirm>
            </span>
              <span style="margin-left:0.625rem;" v-show="!record.editing">
            <a-button type="primary" size="small" @click="copyName(record)">{{ $t('component.table.clone') }}</a-button>
          </span>
          </div>
        </template>
      </template>
    </a-table>
       <a-modal v-model:visible="copyVisible" :title="$t('component.table.clone')" @ok="copyOk" :ok-text="$t('common.okText')" :cancel-text="$t('common.cancelText')">
      <AForm :model="copyData" ref="refCopy" :rules="copyRule">
          <a-form-item name="name" :label="$t('component.table.name')">
            <a-input v-model:value="copyData.name"></a-input>
          </a-form-item>
      </AForm>
    </a-modal>


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

∏ .table {
  width: 100%;
  height: 100px;
  flex: 1;
  background-color: #fff;
  border-radius: 0.7rem;
}
</style>
<style>

</style>