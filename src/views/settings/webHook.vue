<script setup lang="ts">
import request from "@/utils/request";
import {settingsWebHook} from "@/appConfig";
import { message } from "ant-design-vue/es";
import {
  ref,
  reactive,
  UnwrapRef,
  nextTick,
  getCurrentInstance,
  computed,
  watch,
  unref
} from "vue";
import type { FormProps } from "ant-design-vue";
import { tableSearch, FormState } from "../componentTS/mbtmodeler";
import {ModelState, statesTs, httpFnList, httpFnEnList, httpNameTrance} from "../componentTS/webHook"
import { Rule } from "ant-design-vue/es/form";
import { PlusOutlined } from "@ant-design/icons-vue";
import { useRoute, useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { CommonTable } from '@/components/basic/common-table'
import VueForm from "@lljj/vue3-form-ant";
import schemaItem from '@/components/basic/itea-schema-item/input-select-item.vue'

let schema = {
  title: '',
  type: 'object',
  properties: {
    inputText: {
      title: '自定义widget',
      "patternProperties": false,
      type: 'string',
    }
  }
}
let uiSchema = {
  inputText: {
    "ui:widget": schemaItem,
    "ui:options": [{
      value: 'lucy',
      label: 'Lucy',
    }]
  }
}
let schemaVal = ref()

const { t } = useI18n()
const url = settingsWebHook;
const route = useRoute();
const router = useRouter();
const tableRef = ref();

// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
  search: "",
});

const webHookTableQuery = {
  url: '/api/webhooks',
  searchText: ''
}

watch(
    () => formState.search,
    (value) => {
      webHookTableQuery.searchText = value
    }
)

// table data
const column = [
  { title: "name", require: true },
  { title: "description", require: true },
  { title: "tags" },
  { title: 'url' },
  {
    title: "action",
    actionList: ['detail', 'edit', 'delete'],
    cbName: ['edit']
  }
]
let webHookTable = ref<any>(null)

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

const onFinishFailedForm = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

/**
 * Search the result
 */
const handleFinish: FormProps["onFinish"] = (values: any) => {
  webHookTable.value.query(formState.search)
};
const handleFinishFailed: FormProps["onFinishFailed"] = (errors: any) => {
  console.log(errors);
};

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

let refForm = ref()
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
  obj.topicsOpts = Object.keys(obj)
  Object.keys(obj).forEach(a => {
    topicsFnObj.topicsFnList.forEach(topics => {
      if (topics.title === a) {
        topics.checkList = obj[a]
      }
    })
  })
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

async function saveWebHook(data: any) {
  webHookTable.value.loading = true
  return new Promise((resolve, reject) => {
    request
        .post(url, data)
        .then((res) => {
          let tableData = webHookTable.value.getTableData()
          tableData.unshift(res)
          webHookTable.value.setTableData(tableData)
        })
        .catch(function (error) {
          if (error.response.status == 409) {
            message.error(t('settings.requiredNameADesc'))
          }
        })
        .finally(() => webHookTable.value.loading = false )
  });
}

const onFinishForm = async (modelstates: any) => {
  await unref(refForm).validate()
  modelstates.value.tags = states.tags;
  let arr:Array<string> = []
  topicsFnObj.topicsFnList.forEach((topics: any) => {
    topics.checkList.forEach((a: any) => arr.push(`${a}:${topics.title}`))
  })
  modelstates.value.topics = arr
  // 判断修改或添加
  if (modelstates.value._id) {
    webHookTable.value.loading = true
    request.put(url + `/${modelstates.value._id}`, modelstates.value).then((res: any) => {
      let tableData = webHookTable.value.getTableData()
      let tar = tableData.filter((a: any) => a._id === res._id)[0]
      let index = tableData.indexOf(tar)
      if (index === -1) return
      tableData[index] = res
      webHookTable.value.setTableData(tableData)
      message.success(t('component.message.updateText'))
    }).finally(() => webHookTable.value.loading = false )
  } else {
    delete modelstates.value._id;
    message.success(t('component.message.saveText'));
    saveWebHook(modelstates.value);
  }
};

/**
 * Create a new model and jump to moderler
 */
const handleOk = () => {
  onFinishForm(modelstates);
}
// 关闭模态窗触发事件
const closemodel = () => {
  clear();
  visible.value = false;
};

// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject(t('component.message.emptyName'));
  } else {
    return Promise.resolve();
  }
};

let checkDesc = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject(t('component.message.emptyDescription'));
  } else {
    return Promise.resolve();
  }
};

let checkUrl = async (_rule: Rule, value: string) => {
  if (!value) return Promise.reject(t('component.message.emptyUrl'))
  const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g
  let res = reg.test(value)
  if (!res) {
    return Promise.reject(t('component.message.realUrl'))
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
  const tags = states.tags.filter((tag: string) => tag !== removedTag)
  states.tags = tags
};
const showInput = () => {
  states.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus()
    inputRef.value.toString().toUpperCase()
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
      <common-table
        ref="webHookTable"
        :columns="column"
        tableRef="webHookTable"
        :fetchObj="webHookTableQuery"
        @edit="(row) => edit(row, false)"
        @detail="(row) => edit(row, true)"
      ></common-table>
    </div>
    <VueForm
        v-model="schemaVal"
        :schema="schema"
        :ui-schema="uiSchema"
    ></VueForm>
    <div>{{schemaVal}}</div>
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
