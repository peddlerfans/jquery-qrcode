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
} from '@ant-design/icons-vue';
import {
  message,
  Table
} from 'ant-design-vue/es'
import { Rule } from 'ant-design-vue/es/form';
import { Dropdown, Space, Tooltip, Modal, Alert, Menu } from 'ant-design-vue';
import {
  Model, ModelState,
} from "./componentTS/codegen";
import { purple } from '@ant-design/colors';

import { VAceEditor } from 'vue3-ace-editor';
import "./componentTS/ace-config";
import 'ace-builds/src-noconflict/mode-ejs'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-python'




// Specify the api for dynamic template data CRUD
let url = templateUrl;
let route = useRoute()
let finalResult: any;
let modelId: any;

sessionStorage.setItem('codegen_' + route.params._id, String(route.params._id))
// 获取当前数据并赋值

const templateOptions = ref<SelectProps['options']>([
  {
    value: 'ejs',
    label: 'EJS',
  },
  {
    value: 'freemarker',
    label: 'FreeMarker',
  },
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
    value: 'chrome',
    label: 'Chrome',
  },
  {
    value: 'monokai',
    label: 'Monokai',
  },
]);

const states = reactive({
  // template: 'ejs',
  lang: 'python',
  theme: 'github',
  // content: '',
  result: '',
});

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

    console.log(res)
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

const sampledata={
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

const previewModel = async () => {
  console.log('previewModel')
  console.log(toRaw(modelState))

  if (modelState.templateText){
    try {
      let res = await request.post(url+`/${route.params._id}/preview`, sampledata)
      console.log(res)
      states.result=res.data
    }catch (err){
      console.log(err)
      states.result=''
    }

  }else{
    message.warning("No content!")
  }

}

const saveModel = async () => {
  let res = await request.put(url+`/${route.params._id}`, toRaw(modelState))
  console.log('saveModel')
  message.success("Saved successfully!")
}

</script>



<template>

  <main style="height:100%;overflow-x: hidden!important;">

    <!-- ############ -->
    <!-- Preview info -->
    <!-- ############ -->
      <header>
        <a-form name="basic"
                :label-col="{ span: 8 }"
                :wrapper-col="{ span: 6 }"
                autocomplete="off">
          <a-form-item label="Template Engine">
            <a-select v-model:value="modelState.model.templateEngine" :options="templateOptions"></a-select>
          </a-form-item>

          <a-form-item label="Output Language">
            <a-select v-model:value="modelState.model.outputLanguage" :options="langOptions"></a-select>
          </a-form-item>

          <a-form-item label="Theme">
            <a-select v-model:value="states.theme" :options="themeOptions"></a-select>
          </a-form-item>

        </a-form>
      </header>

    <a-row type="flex" justify="space-around" align="middle">
      <a-col :span="11">

        <a-typography-title :level="5"><edit-filled /> Edit</a-typography-title>
        <VAceEditor
            v-model:value="modelState.templateText"
            class="vue-ace-editor"
            :lang="modelState.model.templateEngine"
            :theme="states.theme"
            :options="{ useWorker: true }"
        />
      </a-col>
      <a-col :span="2">
        <a-layout-content><a-button type="primary" @click="previewModel">Preview >></a-button></a-layout-content>

      </a-col>
      <a-col :span="11">
        <a-typography-title :level="5"><code-filled /> Result (Readonly)</a-typography-title>
        <VAceEditor
            v-model:value="states.result"
            class="vue-ace-editor"
            :readonly="true"
            :lang="modelState.model.outputLanguage"
            :theme="states.theme"
            :options="{ useWorker: true }"
        />
      </a-col>
    </a-row>



    <div style="margin-top: 30px">
      <a-button type="primary" @click="saveModel">Save</a-button>
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

.vue-ace-editor {
  flex: 1;
  margin-top: 15px;
  font-size: 16px;
  border: 1px solid;
  height: 500px;
}
</style>
<style>

</style>