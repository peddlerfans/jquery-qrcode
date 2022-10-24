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
  DoubleRightOutlined
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
import { purple } from '@ant-design/colors';

import { VAceEditor } from 'vue3-ace-editor';
// import { VAceEditor } from '@/components/AceEditor';

import "./componentTS/ace-config";
// import 'ace-builds/src-noconflict/mode-ejs'
// import 'ace-builds/src-noconflict/mode-html'
// import 'ace-builds/src-noconflict/mode-python'
// import 'ace-builds/src-noconflict/mode-javascript'
// import 'ace-builds/src-noconflict/mode-json'
// import 'ace-builds/src-noconflict/mode-ftl'




// Specify the api for dynamic template data CRUD
let url = templateUrl;
let route = useRoute()
let finalResult: any;
let modelId: any;

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



let sample2={
  "data": [
    {
      "step": {
        "input": {
          "username": "{{username}}",
          "passwd": "{{passwd}}"
        },
        "login_with_credential": {
          "description": "用户登录",
          "template": "用户登录输入{{username}}和{{password}}",
          "params": [
            {
              "name": "username",
              "type": "str"
            },
            {
              "name": "passwd",
              "type": "str"
            }
          ],
          "name": "login_with_credential",
          "path": "/login"
        }
      }
    },
    {
      "step": {
        "input": {
          "isLoginSuccess": true
        },
        "login_redirect": {
          "description": "用户登录成功后跳转",
          "template": "用户登录成功后跳转{{redirctUrl}}",
          "params": [
            {
              "name": "redirctUrl",
              "type": "str"
            }
          ],
          "name": "login_redirect",
          "path": "/login/success"
        }
      },
      "expection": {
        "input": {
          "routePath": "{{routePath}}"
        },
        "loading_page": {
          "description": "加载页面",
          "template": "加载页面{{routePath}}",
          "params": [
            {
              "name": "routePath",
              "type": "str"
            }
          ],
          "name": "loading_page",
          "path": "/login/success/routepath"
        }
      }
    },
    {
      "step": {
        "input": {
          "isLoginSuccess": false
        },
        "login_failed": {
          "description": "用户登录失败返回提示",
          "template": "用户登录失败返回提示{{errorUrl}}",
          "params": [
            {
              "name": "errorUrl",
              "type": "str"
            }
          ],
          "name": "login_failed",
          "path": "/login/failed"
        }
      },
      "expection": {
        "input": {
          "routePath": "{{routePath}}"
        },
        "loading_page": {
          "description": "加载页面",
          "template": "加载页面{{routePath}}",
          "params": [
            {
              "name": "routePath",
              "type": "str"
            },
            {
              "name": "error_msg",
              "type": "str"
            }
          ],
          "name": "loading_page",
          "path": "/login/failed/routepath"
        }
      }
    }
  ]
}


const states = reactive<AceState>({
  theme: 'sqlserver',
  lang: 'json',
  input: sample,
  result: '',
});

const inputData = ref<string>(JSON.stringify(states.input, null, 2))


watch(inputData,(newValue,oldValue)=>{
  states.input = JSON.parse(newValue)
})

let modelState = reactive<Model>({
  _id: '',
  name: '',
  category: 'codegen',
  description: '',
  tags: [],
  model: {
    templateEngine: "ejs",
    outputLanguage: "python"
  },
  templateText: "",
});

onMounted(() => {
  modelId = sessionStorage.getItem('codegen_' + route.params._id)
  if (modelId === null){
    message.error("Model cannot be found")
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
    modelState.model = res.model
    modelState.templateText = res.templateText

    if (modelState.model.templateEngine === 'freemarker'){
      modelState.model.templateEngine =  'ftl'
    }

  } catch (e) {
    message.error("Query failed!")
    console.log(e)
  }

}

const aceTemplate = ref<AceEditor>();

const saveModel = async () => {
  if (modelState.templateText){
    const anno=aceTemplate.value?._editor.getSession()

    try {
      if (modelState.model.templateEngine === 'ftl'){
        modelState.model.templateEngine =  'freemarker'
      }

      let res = await request.put(url+`/${route.params._id}`, toRaw(modelState))
      states.result=res.data
    }catch (e){
      message.success("Save failed!")
    }

    // message.success("Saved successfully!")
    anno.setAnnotations([])

    try {
      let res = await request.post(url+`/${route.params._id}/preview`, states.input)
      states.result=res.data
      message.success("Preview successful!")

    }catch (err:any){
      console.log("catch preview error: ")

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
      message.error("Something wrong in the Template")
    }
  }else{
    message.warning("Template engine cannot be null!")
  }


}


const visible = ref<boolean>(false);

const showModal = () => {
  visible.value = true;
};

const handleOk = (e: MouseEvent) => {
  console.log(e);
  visible.value = false;
};



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
              <a-form-item label="Template Engine">
                <a-select v-model:value="modelState.model.templateEngine" :options="templateOptions"></a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="Output Language">
                <a-select v-model:value="modelState.model.outputLanguage" :options="langOptions"></a-select>
              </a-form-item>
            </a-col>
            <a-col :span="6">
              <a-form-item label="Theme">
                <a-select v-model:value="states.theme" :options="themeOptions"></a-select>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </header>

    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="12">

        <a-typography-title :level="5"><edit-filled /> Edit Template</a-typography-title>
        <VAceEditor
            v-model:value="modelState.templateText"
            class="ace-template"
            ref="aceTemplate"
            :lang="modelState.model.templateEngine"
            :theme="states.theme"
            :options="{ useWorker: true }"
        />
      </a-col>
<!--      <a-col :span="1">-->
<!--        <a-layout-content><a-button type="primary" @click="previewModel"><double-right-outlined /></a-button></a-layout-content>-->

<!--      </a-col>-->
      <a-col :span="12">
        <a-typography-title :level="5"><code-filled /> Preview Result (Read-only)</a-typography-title>
        <VAceEditor
            v-model:value="states.result"
            class="ace-result"
            :readonly="true"
            :lang="modelState.model.outputLanguage"
            :theme="states.theme"
            :options="{ useWorker: true }"
        />
      </a-col>
    </a-row>



    <div style="margin-top: 30px">
      <a-button type="primary" @click="saveModel">Save & Preview</a-button>
      <a-button type="link" @click="showModal" style="margin-left:50px;">Edit Data</a-button>
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
  font-size: 18px;
  border: 1px solid;
  height: 70vh;
}
</style>
<style>

</style>