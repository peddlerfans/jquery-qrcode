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
  getCurrentInstance
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


// Specify the api for dynamic template data CRUD
const url = templateUrl;



// ######## Model list table ########

// Inital a null reference for the model list table
const tableRef = ref()

const initModelAttr={
  option: {strategy:''},
  factor: [],
  constraint: []
}
// ##### Invoke table hook #####
// Initialize  without pagination ??????

const columns1 = [ // Setup the header of columns
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    // width: 40
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    // width: 120
  },
  {
    title: 'Tags',
    dataIndex: 'tags',
    key: 'tags',
  },
  {
    title: 'Action',
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

  query()
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

const saveModel = async () => {
  const model = {
    name: modelState.name,
    description: modelState.description,
    tags: toRaw(modelState.tags),
    category: "codegen",
    templateText: '',
    model: initModelAttr
  }
  let rst = await request.post(url, model)
  message.success("Created a model successfully")

  closeModel()
}

const updateModel = async () => {
  const model = {
    name: modelState.name,
    description: modelState.description,
    tags: toRaw(modelState.tags),
    category: "codegen",
    templateText: '',
  }

  if (modelState._id) {
    let rst = await request.put(url + `/${modelState._id}`, model)
    query()
    message.success("Updated a model successfully")
  } else {
    // delete modelState.value._id
    message.warning("Cannot read the model information")
  }
  clearModelState()
}

const deleteModel = async (id: string) => {
  let rst = await request.delete(url + `/${id}`)
  query()
  message.success('Delete Successfully!');
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
  if (!value) {
    return Promise.reject("Please input the name of model")
  } else {
    return Promise.resolve();
  }
}

let checkDesc = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Please input the description of model")
  } else {
    return Promise.resolve();
  }
}

let modelRules: Record<string, Rule[]> = {
  name: [{ required: true, validator: checkName }],
  description: [{ required: true, validator: checkDesc }],
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

              <a-mentions v-model:value="formState.search"
                          placeholder="input @ to search tags, input name to search CodeGen Templates">
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
            Create a New CodeGen Template
          </a-button>
        </a-col>
      </a-row>
    </header>


    <!-- 模态窗 -->

    <div>
      <a-modal v-model:visible="visibleModel"
               :title="modelState._id? 'Update a CodeGen Template':'Create a New CodeGen Template'" @cancel="closeModel" :width="900">

        <!-- Model meta info -->

        <h2>Model</h2>

        <a-form ref="refModelForm" autocomplete="off" :model="modelState" :rules="modelRules" name="basic"
                :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-form-item label="Name" name="name">
            <a-input v-model:value="modelState.name" />
          </a-form-item>

          <a-form-item label="Description" name="description">
            <a-input v-model:value="modelState.description" />
          </a-form-item>

          <!-- tags标签 -->
          <a-form-item label="Tag" name="tags">
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
              Add a New Tag
            </a-tag>
          </a-form-item>
        </a-form>

        <template #footer>
          <a-button @click="closeModel">Cancel</a-button>
          <a-button @click="saveModel" type="primary" class="btn_ok">Save</a-button>
        </template>


      </a-modal>
    </div>





    <!-- ######################### -->
    <!-- List of CodeGen templates -->
    <!-- ######################### -->
    <a-table :columns="columns1" :data-source="tableData" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if='column.key==="name"'>
          <div>
            <a-input v-if="modelState._id===record._id && modelState.editing" v-model:value="modelState.name"
                     style="margin: -5px 0" />
            <template v-else>
              <!-- <a href="javascript:;" @click="viewModel(record._id)">{{text}}</a> -->
              <a :href="`/#/codegenModeler/${record._id}/${record.name}`">{{text}}</a>
            </template>
          </div>
        </template>
        <template v-if='column.key==="description"'>
          <div>
            <a-input v-if="modelState._id===record._id && modelState.editing" v-model:value="modelState.description"
                     style="margin: -5px 0" />
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
              Add a New Tag
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
              <a-typography-link type="danger" @click="updateModel()">Save</a-typography-link>
              <a-divider type="vertical" />
              <a @click="clearModelState()">Cancel</a>
            </span>

            <span v-else>
              <a @click="editModel(record)">Edit</a>

              <a-divider type="vertical" />
              <a-popconfirm title="Are you sure to delete this CodeGen Template?" ok-text="Yes" cancel-text="No"
                            @confirm="deleteModel(record._id)" @cancel="cancel">
                <a>Delete</a>
              </a-popconfirm>


            </span>

          </div>
        </template>
      </template>
    </a-table>



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