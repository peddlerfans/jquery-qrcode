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
  watch
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import request from '@/utils/request';
import {data as sample} from './componentTS/sampleData';
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
  EditFilled,
  CodeFilled,
  UploadOutlined
} from '@ant-design/icons-vue';
import {
  message,
  Table
} from 'ant-design-vue/es'
import { Rule } from 'ant-design-vue/es/form';
import { Dropdown, Space, Tooltip, Modal, Alert, Menu } from 'ant-design-vue';
import {
  AceEditor, AceState,
  Model, ModelState,
} from "./componentTS/codegen";
import dayjs from 'dayjs';
import {SHA256} from "crypto-js";
import { VAceEditor } from 'vue3-ace-editor';

import { defineAsyncComponent } from 'vue'
import {useI18n} from "vue-i18n";


import "./componentTS/ace-config";
import ace from 'ace-builds';


const { t } = useI18n()

// Specify the api for dynamic template data CRUD
let url = templateUrl;
let route = useRoute()
let finalResult: any;
let modelId: any;

let modelState = reactive<Model>({
  _id: '',
  name: '',
  category: 'codegen',
  description: '',
  tags: [],
  model: {
    templateEngine: "ejs",
    outputLanguage: "python",
    outputType: "",
    data: "",
    history: []
  },
  templateText: "",
});

sessionStorage.setItem('codegen_' + route.params._id, String(route.params._id))
// 获取当前数据并赋值


// 表单验证
let checkInputType = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Please select the Template Engine")
  } else {
    return Promise.resolve();
  }
}

let checkOuputType = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Please select the Output Language")
  } else {
    return Promise.resolve();
  }
}

let modelRules: Record<string, Rule[]> = {
  inputtype: [{ required: true, validator: checkInputType }],
  outputtype: [{ required: true, validator: checkOuputType }],
};


const templateOptions = ref<SelectProps['options']>([
  {
    value: 'ejs',
    label: 'EJS',
  },
  {
    value: 'ftl',
    label: 'FreeMarker',
  }
]);

const templateName=<any>{
  ejs: 'EJS',
  ftl: 'FreeMarker'
}
const langName=<any>{
  python: 'Python',
  java: 'JAVA',
  javascript: 'JavaScript',
  yaml: 'YAML'
}

const langOptions = ref<SelectProps['options']>([
  {
    value: 'python',
    label: 'Python',
  },
  {
    value: 'java',
    label: 'JAVA',
  },
  {
    value: 'yaml',
    label: 'YAML',
  },
  {
    value: 'javascript',
    label: 'JavaScript',
  }
]);
const typeOptions = ref<SelectProps['options']>([
  {
    value: 'python',
    label: 'Python',
  },
  {
    value: 'java',
    label: 'JAVA',
  },
  {
    value: 'yaml',
    label: 'YAML',
  },
  {
    value: 'javascript',
    label: 'JavaScript',
  }
]);
const themeOptions = ref<SelectProps['options']>([
  {
    value: 'sqlserver',
    label: 'Light',
  },
  {
    value: 'monokai',
    label: 'Dark',
  },
]);

const aceTemplate = ref<AceEditor>();




const states = reactive<AceState>({
  theme: String(sessionStorage.getItem('codegen_theme') || 'sqlserver'),
  lang: 'json',
  result: '',
});


onMounted(() => {
  modelId = sessionStorage.getItem('codegen_' + route.params._id)

  if (modelId === null){
    message.error(t('templateManager.noTemplate'))
  }else{
    query(modelId)

  }
})

async function query(id?: any) {
  try {
    let res = await request.get(`/api/templates/${id}`, { params: { category: 'codegen' } })
    modelState._id = res._id
    modelState.name = res.name
    modelState.tags = res.tags
    modelState.description = res.description
    modelState.model = res.hasOwnProperty('model') ? res.model : {
      data: '',
      templateEngine: '',
      outputLanguage: ''
    }
    modelState.templateText = res.templateText

    if (modelState.model?.data === '') {
      modelState.model.data=sample
    }

    if (modelState.model.templateEngine === '') {
      modelState.model.templateEngine='ejs'
    }

    if (modelState.model.outputLanguage === '') {
      modelState.model.outputLanguage='python'
    }

    if (modelState.model.templateEngine === 'freemarker'){
      modelState.model.templateEngine =  'ftl'
    }

  } catch (e) {
    message.error(t('templateManager.queryFail'))
  }

  setTimeout(()=> {
    // aceTemplate.value?._editor.setValue(modelState.templateText)
    aceTemplate.value?._editor.getSession().setUndoManager(new ace.UndoManager())
  }, 0)
  /**
   * 修复VACEEditor光标错位问题
   * 定位不到具体问题
   * 临时处理方法
   * */
  setTimeout(() => {
    let dom: any = document.getElementsByClassName('ace_editor')
    dom[0].style.fontSize = '14px'
    dom[1].style.fontSize = '14px'
  }, 500)
}



const saveModel = async () => {
  sessionStorage.setItem('codegen_theme', String(states.theme))

  if ( modelState.model.templateEngine.trim === ''){
    message.warning(t('templateManager.emptyTemplate'))
  }else if (modelState.model.outputLanguage.trim === ''){
    message.warning(t('templateManager.emptyOutput'))
  }

  const currId=SHA256(String(modelState.templateText)).toString()

  modelState.model.history = toRaw(modelState.model.history || []).filter(obj => obj.id!==currId)

  modelState.model.history.unshift(
      {
        id:currId,
        templateEngine: modelState.model.templateEngine,
        outputLanguage: modelState.model.outputLanguage,
        templateText: modelState.templateText,
        data: toRaw(modelState.model.data),
        time: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
  )

  if (modelState.model.history.length>10) modelState.model.history.splice(-1)

  if (modelState.templateText){
    const anno=aceTemplate.value?._editor.getSession()

    try {
      if (modelState.model.templateEngine === 'ftl'){
        modelState.model.templateEngine =  'freemarker'
      }

      let res = await request.put(url+`/${route.params._id}`, toRaw(modelState))

    }catch (e){
      message.error(t('templateManager.saveErr'))
    }

    anno.setAnnotations([])

    try {
      let res = await request.post(url+`/${route.params._id}/preview`, toRaw(modelState.model.data))
      

      states.result=res.data
      message.success(t('templateManager.previewSuccess'))

    }catch (err:any){

      let allErr=anno.getAnnotations()

      /**
       * For the error message,
       * (1.split by \n
       * (2. remove all the empty element in the array
       * (3. get the first element
       * (4. split by :
       * (5. get the second element
       * (6. minus 1 and convert to int as the index in the editor
       * **/
      allErr.push({
        row: parseInt(err.response.data.message.split("\n").filter((n:string) => {return n})[0].split(":")[1])-1,
        column: 0,
        text: err.response.data.message,
        type: "error" // also warning and information
      })
      anno.setAnnotations(allErr)
      states.result=''
      message.error(t('templateManager.templateErr'))
    }
  }else{
    message.warning(t('templateManager.emptyTemplateEngine'))
  }
}

let inputData = ref<string>('')

watch(inputData,(newValue,oldValue)=>{
  modelState.model.data = JSON.parse(newValue)
})


const visible = ref<boolean>(false);

const showModal = () => {
  visible.value = true;

  inputData.value=JSON.stringify(toRaw(modelState.model.data), null, 2)
};

const handleOk = (e: MouseEvent) => {
  visible.value = false;
};

const columns = [ // Setup the header of columns
  {
    title: 'templateManager.timeStamp',
    dataIndex: 'time',
    key: 'time',
    // width: 40
  },
  {
    title: 'templateManager.templateEngine',
    dataIndex: 'template',
    key: 'template',
    // width: 120
  },
  {
    title: 'templateManager.outLang',
    dataIndex: 'output',
    key: 'output',
  },
  {
    title: 'component.table.action',
    dataIndex: 'action',
    key: 'action',
    // width: 100
  },

]

const loadHistory = (e:any)=>{
  modelState.templateText = e.templateText
  modelState.model.templateEngine = e.templateEngine
  modelState.model.outputLanguage = e.outputLanguage
  modelState.model.data = e.data

  message.success(t('templateManager.loadSuccess'))
}

const softwrap=true

</script>



<template>

  <main style="height:100%;overflow-x: hidden!important;">

    <!-- ############ -->
    <!-- Preview info -->
    <!-- ############ -->
      <header>
        <a-form name="basic"  :rules="modelRules" autocomplete="off">

          <a-row  type="flex" justify="center" :gutter="24">
            <a-col :span="6">
              <a-form-item :label="$t('templateManager.templateEngine')">
                <a-select v-model:value="modelState.model.templateEngine" :options="templateOptions"></a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :label="$t('templateManager.outLang')">
                <a-select v-model:value="modelState.model.outputLanguage" :options="langOptions"></a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item :label="$t('templateManager.theme')">
                <a-select v-model:value="states.theme" :options="themeOptions"></a-select>
              </a-form-item>
            </a-col>
            <!-- <a-col :span="6">
              <a-form-item :label="$t('templateManager.outputType')">
                <a-select v-model:value="modelState.model.outputType" :options="typeOptions"></a-select>
              </a-form-item>
            </a-col> -->
            <a-col :span="6">
              <a-form-item :label="$t('templateManager.outputType')">
                <a-input v-model:value="modelState.model.outputType" :options="typeOptions"></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </header>

    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="12">

        <a-typography-title :level="5">
          <edit-filled />
          {{ $t('templateManager.editTemp') }}
        </a-typography-title>
        <VAceEditor
            v-model:value="modelState.templateText"
            class="ace-template"
            ref="aceTemplate"
            :wrap="softwrap"
            :lang="modelState.model.templateEngine"
            :theme="states.theme"
            :options="{ useWorker: true }"
        />
      </a-col>
<!--      <a-col :span="1">-->
<!--        <a-layout-content><a-button type="primary" @click="previewModel"><double-right-outlined /></a-button></a-layout-content>-->

<!--      </a-col>-->
      <a-col :span="12">
        <a-typography-title :level="5"><code-filled />{{ $t('templateManager.previewTemp') }}</a-typography-title>
        <VAceEditor
            v-model:value="states.result"
            class="ace-result"
            :wrap="softwrap"
            :readonly="true"
            :lang="modelState.model.outputLanguage"
            :theme="states.theme"
            :options="{ useWorker: true }"
        />
      </a-col>
    </a-row>



    <div style="margin-top: 30px">
      <a-button type="primary" @click="saveModel">{{ $t('templateManager.saveApreview') }}</a-button>
      <a-button type="link" @click="showModal" style="margin-left:50px;">{{ $t('templateManager.editData') }}</a-button>
      <a-modal v-model:visible="visible" width="1000px" title="Edit Data" @ok="handleOk">
        <VAceEditor
            v-model:value="inputData"
            class="ace-data"
            :lang="states.lang"
            :theme="states.theme"
            :options="{ useWorker: true }"
        />

        <template #footer>
          <a-button key="submit" type="primary" @click="handleOk">Ok</a-button>
        </template>
      </a-modal>
    </div>


    <h2 style="margin-top:30px">History</h2>

    <a-table :columns="columns" :data-source="modelState.model?.history || []" bordered>
      <template #headerCell="{ column }">
        <span>{{ $t(column.title) }}</span>
      </template>
      <template #bodyCell="{ column, text, record }">
        <template v-if='column.key==="time"'>
          <div>
            {{ record.time}}
          </div>
        </template>
        <template v-if='column.key==="template"'>
          <div>
            {{ templateName[record.templateEngine] }}
          </div>
        </template>
        <template v-if="column.key === 'output'">
          <div>
            {{ langName[record.outputLanguage] }}
          </div>
        </template>
        <template v-else-if="column.key === 'action'">
          <div class="editable-row-operations">
            <a-button @click="loadHistory(record)"><upload-outlined /> {{ $t('common.loadText') }}</a-button>
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

.ace-template, .ace-result, .ace-data {
  flex: 1;
  margin-top: 15px;
  /*font-family: monospace;*/
  /* font-size: 16px; */
  border: 1px solid;
  height: 70vh;
}

</style>
<style>

</style>
