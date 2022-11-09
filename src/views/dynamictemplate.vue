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
import { useI18n } from "vue-i18n";
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

const { t } = useI18n()

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
  dataSource, columns, originColumns, tableLoading, pagination ,
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
  q: "category:dynamic",
  size: 20,
  page: 1,
  perPage: 10
})


// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
  search: '',
  q: "category:dynamic",
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

  console.log('query')
  console.log(url)
  // If search successfully, it returns a new table and reassign to dataSource
  // Somehow the list table would be rerendered
  if (rst.data) {
    // console.log('rst:', rst.data)
    dataSource.value = rst.data
    tableData.value = rst.data

    return rst.data
  }
}

const handleFinish: FormProps['onFinish'] = (values: any) => {
  // console.log(' formstate to search :', formState);

  query(formState)
  // highlight.value = dataSource.value.filter((item: any, index: any) => {

  //   return item._highlight
  // })
  // console.log(highlight.value);

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
  // console.log(modelstates);
}

// Handel Tags in modal form
const handleCloseTag = (removedTag: string) => {
  const tags = modelState.tags.filter((tag: string) => tag !== removedTag);
  console.log(tags);
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
    category: "dynamic",
    templateText: '',
    model: initModelAttr
  }
  let rst = await request.post(url, model)
  message.success(t('templateManager.createModelSuccess'))

  closeModel()
}

const updateModel = async () => {
  const model = {
    name: modelState.name,
    description: modelState.description,
    tags: toRaw(modelState.tags),
    category: "dynamic",
    templateText: '',
  }

  if (modelState._id) {
    let rst = await request.put(url + `/${modelState._id}`, model)
    query()
    message.success(t('templateManager.updateModelSuccess'))
  } else {
    // delete modelState.value._id
    message.warning(t('templateManager.readModelErr'))
  }
  clearModelState()
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

let columnPreview=ref<any>()
let modelDataPreview=ref<any>()
let prev=ref<boolean>(false);

const previewModel = async (id: string) => {
  let rst = await request.post(url+`/${id}/preview`)

  modelDataPreview.value=rst
  debugger
  columnPreview.value = rst.model?.parameters.map((e:any)=>{
    return {
      title: e.property,
      dataIndex: e.property,
      key: e.property,
    }
  })

  prev.value=true

}

// ################################
// ######## Model CRUD END ########
// ################################


// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject(t('component.message.emptyName'))
  } else {
    return Promise.resolve();
  }
}

let checkDesc = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject(t('component.message.emptyDescription'))
  } else {
    return Promise.resolve();
  }
}

let modelRules: Record<string, Rule[]> = {
  name: [{ required: true, validator: checkName, trigger: 'blur' }],
  description: [{ required: true, validator: checkDesc, trigger: 'blur' }],
};


// const handleOk = () => {
//   onFinishForm(modelState)
//
//   clearModelState()
//   query()
// };


// const onFinishForm = async (modelState: any) => {
//   // 输入验证
//
//   const model = {
//     name: modelState.name,
//     description: modelState.description,
//     tags: toRaw(modelState.tags),
//     category: "dynamic",
//     templateText: '',
//     model: {
//       option: {},
//       factor: [],
//       constraint: []
//     }
//   }
//
//   visibleModel.value = false;
//
//   // 判断修改或添加
//   if (modelState._id) {
//     let rst = await request.put(url + `/${modelState.value._id}`, model)
//     // message.success("Modified successfully")
//   } else {
//     // delete modelState.value._id
//     let rst = await request.post(url, model)
//     console.log(rst)
//     message.success("Added successfully")
//   }
//
//   // showAddConstraint.value = false
//   // showAddFactor.value = false
//   // if (modelState.value.name && modelState.value.description) {
//
//   //   // }
//   //   visible.value = false;
//   //   clear()
//   //   query()
//   // } else {
//   //   return message.error("name and descript is required")
//   // }
// };

// const onFinishFailedForm = (errorInfo: any) => {
//   console.log('Failed:', errorInfo);
// };


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
  console.log("xxxxxxxxxx")
})

onMounted(() => {
  console.log("onMounted: dataSource")
  console.log(dataSource)
  console.log(tableData)
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

              <a-input
                  v-model:value="formState.search"
                  :placeholder="$t('templateManager.metaSearchText')">
                <!-- <a-mentions-option value="tags:">
                  tags:
                </a-mentions-option> -->
              </a-input>
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
            {{ $t('templateManager.createDynamicTemp') }}
          </a-button>
        </a-col>
      </a-row>
    </header>


    <!-- 模态窗 -->

    <div>
      <a-modal v-model:visible="visibleModel"
        :title="modelState._id? $t('templateManager.updateDynamicTemp') : $t('templateManager.createDynamicTemp')" @cancel="closeModel" :width="900">

        <!-- Model meta info -->

        <h2>{{ $t('templateManager.template') }}</h2>

        <a-form ref="refModelForm" autocomplete="off" :model="modelState" :rules="modelRules" name="basic"
          :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }">
          <a-form-item :label="$t('component.table.name')" name="name">
            <a-input v-model:value.trim="modelState.name" />
          </a-form-item>

          <a-form-item :label="$t('component.table.description')" name="description">
            <a-input v-model:value.trim="modelState.description" />
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
            <a-input v-if="modelState.inputVisible" ref="inputRef1" v-model:value.trim="modelState.inputValue" type="text"
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







    <a-modal v-model:visible="prev" :title="modelState._id? 'Model preview':'Model preview'" :width="900">

      <!-- Model meta info -->

      <h2>{{ $t('templateManager.data') }}</h2>

      <a-table :columns="columnPreview" :data-source="modelDataPreview.data" bordered>
        <template #headerCell="{ column }">
          <span>{{ $t(column.title) }}</span>
        </template>
        <template #bodyCell="{ column, text, record }">
<!--          <template v-if='column.key==="name"'><div>{{ text }}</div></template>-->
<!--          <template v-if='column.key==="age"'><div>{{ text }}</div></template>-->
<!--          <template v-if='column.key==="address"'><div>{{ text }}</div></template>-->
          {{ text }}
        </template>
      </a-table>

      <template #footer>
<!--        <a-button @click="closeModel">Cancel</a-button>-->
      </template>

      <h2>{{ $t('templateManager.template') }}</h2>
      <pre>{{ JSON.stringify(toRaw(modelDataPreview.model), null, 2) }}</pre>

    </a-modal>


    <!-- ######################### -->
    <!-- List of dynamic templates -->
    <!-- ######################### -->
    <a-table :columns="columns1" :data-source="tableData" bordered>
      <template #headerCell="{ column }">
        <span>{{ $t(column.title) }}</span>
      </template>
      <template #bodyCell="{ column, text, record }">
        <template v-if='column.key==="name"'>
          <div>
            <a-input v-if="modelState._id===record._id && modelState.editing" v-model:value.trim="modelState.name"
              style="margin: -5px 0" />
            <template v-else>
              <!-- <a href="javascript:;" @click="viewModel(record._id)">{{text}}</a> -->
              <a :href="`/#/dynamicModeler/${record._id}/${record.name}`">{{text}}</a>
              <!-- <a v-if="record.model.factor.length>1" @click="previewModel(record._id)">{{text}}</a> -->
              <!-- <span v-else>{{text}}</span> -->
            </template>
          </div>
        </template>
        <template v-if='column.key==="description"'>
          <div>
            <a-input v-if="modelState._id===record._id && modelState.editing" v-model:value.trim="modelState.description"
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
            <a-input v-if="modelState.inputVisible" ref="inputRef2" v-model:value.trim="modelState.inputValue" type="text"
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
              <a-popconfirm
                  :title="$t('component.message.sureCancel')"
                  @confirm="clearModelState()"
                  :ok-text="$t('common.okText')"
                  :cancel-text="$t('common.cancelText')">
                <a>{{ $t('common.cancelText') }}</a>
              </a-popconfirm>
            </span>

            <span v-else>
              <a @click="editModel(record)">{{ $t('component.table.edit') }}</a>
              <!-- <a-divider type="vertical" />
              <a v-if="record.model.factor.length>1" @click="previewModel(record._id)">Config</a> -->

              <a-divider type="vertical" />
              <a-popconfirm
                  :title="$t('templateManager.delDynamicTemp')"
                  :ok-text="$t('common.yesText')"
                  :cancel-text="$t('common.noText')"
                  @confirm="deleteModel(record._id)"
                  @cancel="cancel">
                <a>{{ $t('common.delText') }}</a>
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