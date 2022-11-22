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
  unref, watch
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
import { CommonTable } from '@/components/basic/common-table'

const { t } = useI18n()

// Specify the api for dynamic template data CRUD
const url = templateUrl;

// 表格数据
const column = [
  { title: "name", width: 40, link: 'codegenModeler' },
  { title: "description", width: 120 },
  { title: "tags", width: 100 },
  { title: "action", width: 100, actionList: ['edit', 'delete'] },
]
const codegenTableQuery = {
  url,
  searchText: '',
  createParams: 'codegen'
}
let codegenTable = ref<any>(null)


// ######## Model list table ########

// Inital a null reference for the model list table
const tableRef = ref()

const initModelAttr={
  outputLanguage: '',
  templateEngine: '',
  data: '',
  history: []
}
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

watch(
    () => formState.search,
    (value) => {
      codegenTableQuery.searchText = value
    }
)

// 点击跳转metamodel
let router = useRouter()

const handleFinish: FormProps['onFinish'] = (values: any) => {
  codegenTable.value.query(formState.search)

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
let inputRef1 = ref()

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
  nextTick(() => {
    inputRef1.value.focus();
    inputRef1.value.toString().toUpperCase();
  })

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
    let tableData = codegenTable.value.getTableData()
    tableData.unshift(rst)
    codegenTable.value.setTableData(tableData)
    message.success(t('templateManager.createModelSuccess'))
    closeModel()
  })
}

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
      return Promise.reject(t('templateManager.duplicate'))
    }else{
      return Promise.resolve();
    }
  }
}

let checkDesc = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject(t('templateManager.description'))
  } else {

    return Promise.resolve();
  }
}

let modelRules: Record<string, Rule[]> = {
  name: [{ required: true, validator: checkName, trigger: 'blur' }],
  description: [{ required: true, validator: checkDesc, trigger: 'blur' }],
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

        <a-form ref="refModelForm" autocomplete="off" :model="modelState" :rules="modelRules" name="basic"
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
    <common-table
        ref="codegenTable"
        :columns="column"
        tableRef="codegenTemplateTable"
        :fetchObj="codegenTableQuery"
    ></common-table>
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
