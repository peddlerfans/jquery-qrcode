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
import 'ace-builds/src-noconflict/mode-ejs'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-ftl'




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
    value: 'freemarker',
    label: 'FreeMarker',
  },
  {
    value: 'javascript',
    label: 'JavaScript',
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
]);
const themeOptions = ref<SelectProps['options']>([
  {
    value: 'github',
    label: 'Github',
  },
  {
    value: 'monokai',
    label: 'Monokai',
  },
]);

let sample={
  "data": [
    {
      "data": "在线视频播放并录制",
      "params": {
        "data": "{{url}} "
      },
      "apiData": {
        "doc": "在线视频播放并录制",
        "args": [
          {
            "name": "client",
            "type": "Android"
          },
          {
            "name": "data"
          }
        ],
        "name": "OnlineVideoReplay",
        "file": "videoTest"
      }
    },
    {
      "data": "检查视频播放流畅、不卡顿",
      "params": null,
      "apiData": {
        "doc": "检查视频播放流畅、不卡顿",
        "args": [
          {
            "name": "client",
            "type": "Android"
          }
        ],
        "name": "checkVideoQuality",
        "file": "videoTest"
      }
    },
    {
      "data": "视频不花屏",
      "params": null,
      "apiData": {
        "doc": "视频不花屏",
        "args": [
          {
            "name": "client",
            "type": "Android"
          }
        ],
        "name": "VerifyVideoReplay",
        "file": "demo_mm_video"
      }
    },
    {
      "data": "视频快进",
      "params": null,
      "apiData": {
        "doc": "视频快进",
        "args": [
          {
            "name": "client",
            "type": "Android"
          },
          {
            "name": "progress",
            "type": "float"
          }
        ],
        "name": "VideoMoveForward",
        "file": "demo_mm_video"
      }
    },
    {
      "data": "视频快退",
      "params": null,
      "apiData": {
        "doc": "视频快退",
        "args": [
          {
            "name": "client",
            "type": "Android"
          }
        ],
        "name": "VideoMoveBack",
        "file": "demo_mm_video"
      }
    },
    {
      "data": "视频不花屏",
      "params": null,
      "apiData": {
        "doc": "视频不花屏",
        "args": [
          {
            "name": "client",
            "type": "Android"
          }
        ],
        "name": "VerifyVideoReplay",
        "file": "demo_mm_video"
      }
    }
  ],
  "currentData": {
    "videotype": "在线视频",
    "fps": "60",
    "description": "video",
    "typeformat": "3GP/3G2+H.263",
    "id": "002",
    "resolution": "480x854",
    "url": "{{DS.MultiMedia.videos.video_2k}}"
  },
  "resources": [
    {
      "default": "true",
      "alias": "client1",
      "class": "Android",
      "resourceType": "ITEADemo.android"
    },
    {
      "default": "false",
      "alias": "phone2",
      "class": "Android",
      "resourceType": "ITEADemo.android"
    },
    {
      "default": "false",
      "alias": "phone3",
      "class": "Android",
      "resourceType": "ITEADemo.android"
    }
  ],
  "meta": [
    {
      "title": "id",
      "content": "oppo.test.android.video_quality_{{id}}"
    },
    {
      "title": "description",
      "content": "测试视频质量，视频帧速率{{fps}},分辨率为{{resolution}}"
    },
    {
      "title": "objective",
      "content": "播放帧速率{{fps}},分辨率为{{resolution}}视频不卡顿不花屏"
    }
  ],
  "errors": [],
  "prefix": ""
}




const states = reactive<AceState>({
  theme: 'github',
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
      console.log(err.response.data.message)

      let allErr=anno.getAnnotations()
      allErr.push({
        row: parseInt(err.response.data.message.split("\n")[0].split(":")[1])-1,
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
          <a-button key="submit" type="primary" :loading="loading" @click="handleOk">Ok</a-button>
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