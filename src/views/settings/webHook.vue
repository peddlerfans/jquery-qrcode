<script setup lang="ts">
import request from "@/utils/request";
import useTable from "@/composables/useTable";
import {settingsWebHook} from "@/appConfig";
import { message } from "ant-design-vue/es";
import * as _ from "lodash";
import {
  ref,
  reactive,
  onBeforeMount,
  UnwrapRef,
  onMounted,
  nextTick,
  getCurrentInstance,
  computed
} from "vue";
import type { FormProps } from "ant-design-vue";
import { tableSearch, FormState } from "../componentTS/mbtmodeler";
import {ModelState, statesTs, webHookDetail, httpFnList, httpFnEnList, httpNameTrance} from "../componentTS/webHook"
import { Rule } from "ant-design-vue/es/form";
import { PlusOutlined, EditOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

const { t } = useI18n()
const url = settingsWebHook;
const route = useRoute();
const router = useRouter();
const tableRef = ref();
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

const topicsFnObj = reactive({
  topicsFnList: [
    {
      title: 'hlfs',
      checkList: <any>[]
    },
    {
      title: 'templates',
      checkList: <any>[]
    },
    {
      title: 'test-models',
      checkList: <any>[]
    }
  ]
})

const instance = getCurrentInstance();

const {
  dataSource,
  columns,
  tableLoading,
  pagination,
  updateTable,
  tableResize,
  selectedRowKeys,
} = useTable({
  table: tableRef,
  columns: [
    { title: "component.table.name", dataIndex: "name", key: "name", width: 40 },
    { title: "component.table.description", dataIndex: "description", key: "description", width: 120 },
    {
      title: "component.table.tags",
      dataIndex: "tags",
      key: "tags",
      width: 100,
      customRender: (opt) => {
        if (_.isArray(opt.value)) {
          return opt.value.toString();
        } else return opt.value;
      },
    },
    {
      title: 'component.table.url',
      dataIndex: 'url',
      key: 'url',
      width: 100
    },
    { title: "component.table.action", dataIndex: "action", key: "action", width: 100 },
  ],
  updateTableOptions: {
    fetchUrl: url,
  },
});
function openMenuModal() {
  alert("good");
}

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
let canEdit = ref<boolean>(false)
const showModal = () => {
  visible.value = true;
  canEdit.value = false
};
const DetailModal = () => {
  canEdit.value = true
  visible.value = true;
}
let modelstates = ref<ModelState>({
  name: "",
  description: "",
  _id: "",
  tags: [],
  url: "",
  topics: []
});

const modalTitle = computed(() => {
  if (canEdit.value) {
    return t('settings.detailWebHook')
  } else if (modelstates.value._id) {
    return t('settings.updateWebHook')
  } else {
    return t('settings.saveWebHook')
  }
})

let webhookdetail = ref<webHookDetail>({
  topicsObj: {},
  topicsOpts: []
})

onMounted(() => {
  query();
});
// 修改功能4
// 修改函数
async function updateMBT(url: string, data: any) {
  let rst = await request.put(url, data);
  // console.log(rst);
}
let refForm = ref(null);
// 清除模态窗数据
const clear = () => {
  (modelstates.value = {
    name: "",
    description: "",
    _id: "",
    tags: [],
    url: "",
    topics: []
  }),
      (states.tags = []);
  (states.topics = []);

  (instance?.refs.refForm as any).resetFields();
};

// 添加的表单tags
let inputRef = ref();
let states = reactive<statesTs>({
  tags: [],
  topics: [],
  inputVisible: false,
  inputValue: "",
  topicsInputVisible: false,
  inputTopics: ""
});

// 显示模态窗
const edit = (rowobj: any, isCheck: boolean) => {
  modelstates.value.name = rowobj.name;
  modelstates.value.description = rowobj.description;
  modelstates.value._id = rowobj._id;
  modelstates.value.url = rowobj.url
  states.tags = rowobj.tags;
  // 处理topics数组
  let obj: any = {}
  rowobj.topics.forEach((a: any) => {
    let splits:string = a.split(':')
    let httpFn:string = splits[0]
    if (isCheck) httpFn = httpNameTrance[httpFn]
    let fnName = splits[1]
    if (!httpFn || !fnName) return
    if (obj.hasOwnProperty(fnName)) {
      if (!obj[fnName].includes(httpFn)) obj[fnName].push(httpFn)
    } else {
      obj[fnName] = [httpFn]
    }
  })
  console.log(obj)
  obj.topicsOpts = Object.keys(obj)
  // webhookdetail.value.topicsObj = obj
  // webhookdetail.value.topicsOpts = Object.keys(obj)
  Object.keys(obj).forEach(a => {
    topicsFnObj.topicsFnList.forEach(topics => {
      if (topics.title === a) {
        topics.checkList = obj[a]
      }
    })
  })
  console.log(topicsFnObj.topicsFnList)
  if (isCheck) {
    DetailModal()
  } else {
    showModal();
  }
};

const onCheckAllChange = (e: any, idx: number) => {
  let res = e.target.checked
  let tar = topicsFnObj.topicsFnList[idx]
  if (!tar) return
  topicsFnObj.topicsFnList[idx].checkList = res ? httpFnList.map(a => a.value) : []
}

async function saveMBT(data: any) {
  return new Promise((resolve, reject) => {
    request
        .post(url, data)
        .then((res) => {
          mbtId.value = res._id as string;

          let fetchUrl = `${url}/${mbtId.value}`;

          updateTable({ fetchUrl: fetchUrl });
        })
        .catch(function (error) {
          if (error.response.status == 409) {
            message.error("Duplicate name or description");
          }
        });
  });
}

const onFinishForm = async (modelstates: any) => {
  modelstates.value.tags = states.tags;
  let arr:Array<string> = []
  topicsFnObj.topicsFnList.forEach((topics: any) => {
    topics.checkList.forEach((a: any) => arr.push(`${a}:${topics.title}`))
  })
  modelstates.value.topics = arr
  console.log(modelstates.value.topics)

  // 判断修改或添加
  if (modelstates.value.name && modelstates.value.description) {
    if (modelstates.value._id) {
      mbtId.value = modelstates.value._id;
      updateMBT(url + `/${modelstates.value._id}`, modelstates.value).then((res: any) => {

        updateTable({ fetchUrl: url });
      });
      message.success("Modified successfully");
    } else {
      delete modelstates.value._id;
      message.success("Added successfully");
      saveMBT(modelstates.value);
    }
    // }
    visible.value = false;
    clear();
  } else {
    return message.error("name and descript is required");
  }
};

/**
 * Create a new model and jump to moderler
 */
const handleOk = () => {
  visible.value = false;
  onFinishForm(modelstates);
  clear();
};
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
  message.success("Delete on Successed");
};

const cancel = (e: MouseEvent) => {
  console.log(e);
};

// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Please input your name!");
  } else {
    return Promise.resolve();
  }
};

let checkDesc = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Please input your name!");
  } else {
    return Promise.resolve();
  }
};

let checkUrl = async (_rule: Rule, value: string) => {
  if (!value) return Promise.reject("Please input url")
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
  let res = reg.test(value)
  if (!res) {
    return Promise.reject("Please input real url")
  } else {
    return Promise.resolve()
  }
}

let rules: Record<string, Rule[]> = {
  name: [{ required: true, validator: checkName, trigger: "blur" }],
  description: [{ required: true, validator: checkDesc, trigger: "blur" }],
  url: [{ required: true, validator: checkUrl, trigger: "blur" }],
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

</script>

<template>
  <main style="height: 100%; overflow-x: hidden !important">
    <header class="block shadow">
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
              <a-input
                  v-model:value="formState.search"
                  split=""
                  :placeholder="$t('settings.searchText')"
              ></a-input>
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
          :title="modalTitle"
          @cancel="closemodel"
          @ok="handleOk"
          :width="700"
      >
        <template #footer>
          <a-button @click="closemodel">{{ $t('common.cancelText') }}</a-button>
          <a-button @click="handleOk" type="primary" class="btn_ok">{{ $t('common.okText') }}</a-button>
        </template>
        <a-form
            ref="refForm"
            :model="modelstates"
            :rules="rules"
            name="basic"
            :label-col="{ span: 6 }"
            :wrapper-col="{ span: 16 }"
            autocomplete="off"
            @finish="onFinishForm"
            @finishFailed="onFinishFailedForm"
        >
          <a-form-item :label="$t('component.table.name')" name="name">
            <a-input v-model:value="modelstates.name" :disabled="canEdit"/>
          </a-form-item>

          <a-form-item :label="$t('component.table.description')" name="description">
            <a-input v-model:value="modelstates.description" :disabled="canEdit"/>
          </a-form-item>

          <a-form-item :label="$t('component.table.url')" name="url">
            <a-input v-model:value="modelstates.url" :disabled="canEdit"/>
          </a-form-item>

          <!-- tags标签 -->
          <a-form-item :label="$t('component.table.tags')" name="tags">
            <template v-for="(tag, index) in states.tags" :key="tag">
              <a-tooltip v-if="tag.length > 20" :title="tag">
                <a-tag :closable="true" @close="handleClose(tag)">
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag v-else-if="tag.length === 0"></a-tag>
              <a-tag v-else :closable="!canEdit" @close="handleClose(tag)">
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
                v-show="!canEdit"
            >
              <plus-outlined />
              {{ $t('common.newTag') }}
            </a-tag>
          </a-form-item>

          <a-form-item :label="$t('component.table.topics')" name="topics">
            <a-card v-for="(topics, idx) in topicsFnObj.topicsFnList" :key="idx" class="web-hook-topics-card">
              <div slot="title" class="topics-title">
                <a-checkbox
                    :disabled="canEdit"
                    @change="(e: any) => onCheckAllChange(e, idx)"
                    :name="topics.title"
                >{{ topics.title }}</a-checkbox>
              </div>
              <a-checkbox-group
                  :disabled="canEdit"
                  v-model:value="topics.checkList"
                  :options="canEdit ? httpFnList : httpFnEnList"
              ></a-checkbox-group>
            </a-card>
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
              <a @click="edit(record, true)" style="margin-right: 16px;">{{ $t('component.table.detail') }}</a>
              <a @click="edit(record, false)">{{ $t('common.editText') }}</a>
              <a-divider type="vertical" />
              <!-- <a :href="'/#/mbtmodeler/'+ record.name">Details</a>
                <a-divider type="vertical" /> -->
              <a-popconfirm
                  :title="$t('component.message.sureDel')"
                  :ok-text="$t('common.yesText')"
                  :cancel-text="$t('common.noText')"
                  @confirm="confirm(record)"
                  @cancel="cancel"
              >
                <a>{{ $t('common.delText') }}</a>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </ATable>
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
<style lang="less">
.web-hook-topics-card {
  margin-bottom: 16px;
  .ant-card-body {
    padding: 0;
    .topics-title {
      padding: 12px 8px;
      background-color: #f5f5f5;
    }
    .ant-checkbox-group {
      padding: 16px 8px;
    }
  }
}
</style>
