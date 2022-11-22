<script setup lang="ts">
import { useI18n } from "vue-i18n";
import request from "@/utils/request";
import useTable from "@/composables/useTable";
import { mockMBTUrl, realMBTUrl } from "@/appConfig";
import { message } from "ant-design-vue/es";
import * as _ from "lodash";
import { Stores } from "../../types/stores";
import {
  ref,
  reactive,
  computed,
  onBeforeMount,
  defineComponent,
  UnwrapRef,
  onMounted,
  nextTick,
  watch,
  getCurrentInstance,
unref,
} from "vue";
import type { CascaderProps, FormProps, SelectProps, TableProps, TreeProps } from "ant-design-vue";
import { tableSearch, FormState, ModelState, statesTs } from "./componentTS/mbtmodeler";
import { Rule } from "ant-design-vue/es/form";
import { PlusOutlined, EditOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
//Setting url for data fetching
// const url=mockMBTUrl;
const url = realMBTUrl;
const route = useRoute();
const router = useRouter();
const tableRef = ref();
const { t } = useI18n()
let searchobj: tableSearch = reactive({
  search: "",
  size: 20,
  page: 1,
  perPage: 20,
});
// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
  search: "",
});

const instance = getCurrentInstance();

const {
  dataSource,
  columns,
  originColumns,
  tableLoading,
  pagination,
  updateTable,
  onTableRowSelectChange,
  tableResize,
  // selectedRowKeys,
} = useTable({
  table: tableRef,
  columns: [
    { title: 'component.table.name', dataIndex: "name", key: "name", width: 40 },
    { title: 'component.table.description', dataIndex: "description", key: "description", width: 120 },
    {
      title: 'component.table.tags',
      dataIndex: "tags",
      key: "tags",
      width: 100,
      customRender: (opt) => {
        if (_.isArray(opt.value)) {
          return opt.value.toString();
        } else return opt.value;
      },
    },
    { title: 'component.table.action', dataIndex: "action", key: "action", width: 100 },
  ],
  updateTableOptions: {
    fetchUrl: url,
  },
});

onBeforeMount(() => {
  updateTable();
});

const onFinishFailedForm = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

let mbtId = ref("");
async function query(data?: any) {
  let rst;

  rst = await request.get(url, { params: data || searchobj });

  if (rst.data) {
    pagination.total=rst.total
    dataSource.value = rst.data;
    return rst.data;
  }
}

/**
 * Search the result
 */
const handleFinish: FormProps["onFinish"] = (values: any) => {
  let fetchUrl = url + `?search=` + formState.search;

  updateTable({ fetchUrl: fetchUrl });
};
const handleFinishFailed: FormProps["onFinishFailed"] = (errors: any) => {
  console.log(errors);
};
const wrapperCol = { span: 24, offset: 12 };
// 模态窗数据
const visible = ref<boolean>(false);
const showModal = () => {
  visible.value = true;
};

let modelstates = ref<ModelState>({
  name: "",
  description: "",
  _id: "",
  tags: [],
});
onMounted(() => {
  query();
});
// 修改功能4
// 修改函数
async function updateMBT(url: string, data: any) {
  let rst = await request.put(url, data);
  // console.log(rst);
}
let refForm = ref();
// 清除模态窗数据
const clear = () => {
  (modelstates.value = {
    name: "",
    description: "",
    _id: "",
    tags: [],
  }),
    (states.tags = []);

  (instance?.refs.refForm as any).resetFields();
};

// 添加的表单tags
let inputRef = ref();
let states = reactive<statesTs>({
  tags: [],
  inputVisible: false,
  inputValue: "",
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
      let rst = await request.get("/api/test-models/_tags", { params: { q: "category:meta" } })
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



// 修改的函数
let editName=""
const edit = (rowobj: any) => {
  showModal();
  editName=rowobj.name
  modelstates.value.name = rowobj.name;
  modelstates.value.description = rowobj.description;
  modelstates.value._id = rowobj._id;
  states.tags = rowobj.tags;
};

async function saveMBT(data: any) {
  return new Promise((resolve, reject) => {
    request
      .post(url, data)
      .then((res: any) => {
        mbtId.value = res._id as string;
        // let fetchUrl = `${url}/${mbtId.value}`;
        // updateTable({ fetchUrl: fetchUrl });
      })
      .catch(function (error) {
        if (error.response.status == 409) {
          message.error(t('MBTStore.tip1'));
        }
      })
      .finally(() => {
        let routeparam = `/mbtmodeler/${mbtId.value}/${modelstates.value.name}`;
        clear();
        router.push({ path: routeparam });
      });
  });
}
let disable=ref(false)
const handleOk = (modelstates:any) => {
  modelstates.tags = states.tags;
  refForm.value.validate().then(()=>{    
  // disable.value=false
  // 判断修改或添加
  if (modelstates.name && modelstates.description) {
    if (modelstates._id) {
      mbtId.value = modelstates._id;
      updateMBT(url + `/${modelstates._id}`, modelstates).then((res: any) => {
        let fetchUrl = `${url}/${mbtId.value}`;

        updateTable({ fetchUrl: fetchUrl });
      });
      message.success(t('component.message.modifiedText'));
    } else {
    
      delete modelstates._id
      saveMBT(modelstates);

      message.success('component.message.addText');
    }
    // }
    visible.value = false;
  } else {
    return message.error(t('MBTStore.tip2'));
  }
}).catch(()=>{
  // disable.value=true
})
  // onFinishForm(modelstates);
};
const onFinishForm =  (modelstates: any) => {};

/**
 * Create a new model and jump to moderler
 */


// 关闭模态窗触发事件
const closemodel = () => {
  clear();
  visible.value = false;
  // query()
  // console.log(modelstates.value);
};
// 删除功能
async function delmbt(key: any) {
  let rst = await request.delete(url + `/${key._id}`);
  updateTable();
}
const confirm = (e: MouseEvent) => {
  delmbt(e);
  query();
  message.success(t('MBTStore.tip3'));
};

const cancel = (e: MouseEvent) => {
  console.log(e);
};

let checkName = async (_rule: Rule, value: string) => {
  let reg = /^[a-zA-Z0-9\$][a-zA-Z0-9\d_]*$/
  let reg1 = /^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
  if (!value) {
    return Promise.reject(t('component.message.emptyName'))
  } else if (!reg.test(value) && !reg1.test(value)) {
    return Promise.reject(t('component.message.hefaName'))
  } else {
    if (editName && editName == value) {
      return Promise.resolve();
    } else {
      let rst = await request.get(url, { params: { q: `name:${value}`, search: '' } })
      if (rst.data && rst.data.length > 0 && rst.data[0].name == value) {
        // message.error("Duplicate name")
        // modelstates.value.name=""

        return Promise.reject(t('component.message.depName'))
      } else {
        return Promise.resolve();
      }
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

const handleClose = (removedTag: string) => {
  const tags = states.tags.filter((tag: string) => tag !== removedTag);
  // console.log(tags);
  states.tags = tags;
};
const showInput = () => {
  states.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
    inputRef.value.toString().toUpperCase();
  });
};

const handleInputConfirm = () => {
  let tags = states.tags;
  if (states.inputValue && tags.indexOf(states.inputValue) === -1) {
    tags = [...tags, states.inputValue.toUpperCase()];
  }
  Object.assign(states, {
    tags,
    inputVisible: false,
    inputValue: "",
  });
};

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
    tableLoading.value=true
    delete copyData.value._id
    
   request.post('/api/test-models',copyData.value).then((rst :any)=>{
    dataSource.value.push(copyData.value)
    let tableindex = dataSource.value.indexOf(copyData.value)
    if(rst && rst._id){
      dataSource.value[tableindex]._id=rst._id
      copyVisible.value = false
      tableLoading.value=false
      updateTable();
    }
    
   })
   
  })
}


</script>

<template>
  <main style="height: 100%; overflow-x: hidden !important">
    <header class="block shadow">
      <!-- <section class="block shadow flex-center"> -->

      <!-- 表单的查询 -->
      <a-row>
        <a-col :span="20">
          <AForm
            layout="inline"
            class="search_form"
            :model="formState"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
            :wrapper-col="{ span: 24 }"
          >
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
          </a-button>
        </a-col>
      </a-row>
    </header>
    <!-- 模态窗 -->
    <div>
      <a-modal
        v-model:visible="visible"
        :title="modelstates._id ? $t('MBTStore.updateTitle') : $t('MBTStore.saveTitle')"
        :width="700"
      >
        <template #footer>
          <a-button @click="closemodel">{{ $t('common.cancelText') }}</a-button>
          <a-button @click="handleOk(modelstates)" :disabled="disable" type="primary" class="btn_ok">{{ $t('common.okText') }}</a-button>
        </template>
        <a-form
          ref="refForm"
          :model="modelstates"
          :rules="rules"
          name="basic"
          :label-col="{ span: 6 }"
          :wrapper-col="{ span: 16 }"
          autocomplete="off"
        >
          <a-form-item :label="$t('component.table.name')" name="name">
            <a-input v-model:value="modelstates.name" />
          </a-form-item>

          <a-form-item :label="$t('component.table.description')" name="description">
            <a-input v-model:value="modelstates.description" />
          </a-form-item>

          <!-- tags标签 -->
          <a-form-item :label="$t('component.table.tags')" name="tags">
            <template v-for="(tag, index) in states.tags" :key="tag">
              <a-tooltip v-if="tag.length > 20" :title="tag">
                <a-tag :closable="true" @close="handleClose(tag)">
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag v-else-if="tag.length == 0"></a-tag>
              <a-tag v-else :closable="true" @close="handleClose(tag)">
                {{ tag }}
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
            <a-tag
              v-else
              style="background: #fff; border-style: dashed"
              @click="showInput"
            >
              <plus-outlined />
              {{ $t('common.newTag') }}
            </a-tag>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <div class="tableContainer">
      <ATable
        ref="tableRef"
        class="table"
        rowKey="key"
        :dataSource="dataSource"
        :columns="columns"
        :pagination="pagination"
        :loading="tableLoading"
        bordered
        @resizeColumn="tableResize"
      >
        >
        <template #headerCell="{ column }">
          <span>{{ $t(column.title) }}</span>
        </template>

        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'name'">
            <a :href="`/#/mbtmodeler/${record._id}/${record.name}`">{{ record.name }}</a>
          </template>

          <template v-else-if="column.key === 'description'">
            {{ record.description }}
          </template>
          <template v-else-if="column.key === 'tags'">
            <span>
              <a-tag
                v-for="tag in record.tags"
                :key="tag"
                :color="
                  tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'
                "
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </span>
          </template>

          <template v-else-if="column.key === 'action'">
            <span>
              <a @click="edit(record)">{{ $t('component.table.edit') }}</a>
              <a-divider type="vertical" />
              <!-- <a :href="'/#/mbtmodeler/'+ record.name">Details</a>
                <a-divider type="vertical" /> -->
              <a-popconfirm
                :title="$t('MBTStore.tip6')"
                :ok-text="$t('common.yesText')"
                :cancel-text="$t('common.noText')"
                @confirm="confirm(record)"
                @cancel="cancel"
              >
                <a>{{ $t('common.delText') }}</a>
              </a-popconfirm>
            </span>
           <span style="margin-left:0.625rem;" v-show="!record.editing">
            <a-button type="primary" size="small" @click="copyName(record)">{{ $t('component.table.clone') }}</a-button>
          </span>
          </template>
        </template>
      </ATable>
      <a-modal v-model:visible="copyVisible" :title="$t('component.table.clone')" @ok="copyOk" :ok-text="$t('common.okText')" :cancel-text="$t('common.cancelText')">
      <AForm :model="copyData" ref="refCopy" :rules="copyRule">
          <a-form-item name="name" :label="$t('component.table.name')">
            <a-input v-model:value="copyData.name"></a-input>
          </a-form-item>
      </AForm>
    </a-modal>
    </div>
    <!-- </section> -->
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
.tableContainer {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
<style></style>
