<script setup lang="ts">
import { MbtModeler } from "@/composables/MbtModeler";
import { Stencil } from "@/composables/stencil";
import * as joint from "jointjs";
import { dia } from "jointjs";
import { ref, onMounted, UnwrapRef, onUpdated, watchEffect, watch, reactive } from "vue";
import type { Ref } from "vue";
import { useRouter, useRoute } from 'vue-router'
import type { FormProps, SelectProps, TableProps, TreeProps } from 'ant-design-vue';
import request from '@/utils/request';
import { SmileOutlined, } from '@ant-design/icons-vue';
import JsonSchemaForm from '@/components/JsonSchemaForm.vue'
import { awStore } from '../stores/aw'
import { Stores } from '../../types/stores'
import $, { param } from "jquery";
import { red, volcano, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey } from '@ant-design/colors';
import VueForm from '@lljj/vue3-form-ant';
import { tableSearch, FormState, paramsobj, ModelState, statesTs } from "./componentTS/awmodeler";
import _ from "lodash";
interface FormState {
  awname: string;
  description: string;
  remember: boolean;
  search?: string
}
const awschema = ref({
  "title": "AW",
  "description": "Configuration for the AW",
  "type": "object",
  "properties": {
    "name": {
      "title": "AW Name",
      "type": "string",
      "readOnly": true   

    },
    "description": {
      "title": "Description",
      "type": "string",
      "readOnly": true
    }
    // ,
    // "tags": {
    //   "title": "tags",
    //   "type": "string",
    //   "readOnly": true
    // },
    // "params": {
    //   "title": "Params",
    //   "type": "string",
    //   "readOnly": true

    // }
  }
})
let schema:any;
const gatewayschema = ref({
  "title": "GATEWAY",
  "description": "Configuration for GATEWAY",
  "type": "object",
  "properties": {
    "name": {
      "title": "Name",
      "type": "string"


    },
    "type": {
            "type": "string",
            "title": "Type",
            "enum": [
                "PARALLEL",
                "EXCLUSIVE"
                
            ],
            "enumNames": [
                "PARALLEL",
                "EXCLUSIVE"
            ]
        }
      
    
  }
})


const wrapperCol = { span: 24, offset: 12 }
const isAW = ref(false);
const awstore = awStore()
const formState = reactive<FormState>({
  awname: '',
  description: '',
  remember: true,
  search: ''
});

const canvas = ref(HTMLElement);
const stencilcanvas = ref(HTMLElement);
const infoPanel = ref(HTMLElement);
let showPropPanel: Ref<boolean> = ref(false);
let showAWPanel: Ref<boolean> = ref(false);
let showGatewayPanel: Ref<boolean> = ref(false); 

function onClose() {
  showPropPanel.value = false;
}

function onShow(cell?: any) {

  showPropPanel.value = true;
}
let tableData = ref([])
let searchobj: tableSearch = reactive({
  search: "",
  size: 20
})
async function query(data?: any) {

  let rst = await request.get("/api/hlfs", { params: data || searchobj })
  if (rst.data) {
    // console.log('rst:',rst.data)
    tableData.value = rst.data?.data
    console.log(tableData, tableData.value);
    return rst.data
  }
}

const handleFinish: FormProps['onFinish'] = (values: any) => {

  query(formState)
  onShow()
  // tableData.value 


};
let colspan = 10;

//通过useRouter()获取路由器的实例
// const router = useRouter()

//route是响应式对象，可监控其变化，需要用useRoute()获取
const route = useRoute()


var verticesTool = new joint.linkTools.Vertices();
var segmentsTool = new joint.linkTools.Segments();
var boundaryTool = new joint.linkTools.Boundary();
var removeButton = new joint.elementTools.Remove();
// var connectButton = new joint.elementTools.Connect();
// 2) creating a tools view
var toolsView = new joint.dia.ToolsView({
  name: 'basic-tools',
  tools: [verticesTool, segmentsTool, boundaryTool]
});



let modeler: MbtModeler;
let stencil: Stencil;

let customNamespace: joint.dia.Paper.Options['cellViewNamespace'] = {};
let Shape = joint.dia.Element.define('shapeGroup.Shape', {
  attrs: {
    // Attributes
  }
}, {
  markup: [{
    // Markup
  }]
});

function setupNamespace() {
  Object.assign(customNamespace, {
    shapeGroup:
      Shape

  });
}
const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => {
  console.log(errors);
};

onMounted(() => {
  stencil = new Stencil(stencilcanvas);
  modeler = new MbtModeler(canvas);

  if (localStorage.getItem('mbt-' + route.params.name)) {
    console.log('local storage')
    setupNamespace();

    modeler.paper.options.cellViewNamespace = customNamespace;


    // console.log('already exists ', JSON.stringify(localStorage.getItem('mbt-'+route.params.name)))
    if (localStorage.getItem('mbt-' + route.params.name)) {
      let tempstr = localStorage.getItem('mbt-' + route.params.name) + '';
      // modeler.graph.fromJSON(JSON.parse(tempstr));
      // return
    }

  } else if (modeler && modeler.graph) {
    localStorage.setItem('mbt-' + route.params.name, JSON.stringify(modeler.graph.toJSON()));
  } else {
    console.log('empty')
  }
  // element.addTo(graph);
  // 1) creating link tools


  stencil.paper.on("cell:pointerdown", (cellView, e: dia.Event, x, y) => {
    $("body").append(
      '<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;"></div>'
    );
    let flyGraph = new joint.dia.Graph();
    let flyPaper = new joint.dia.Paper({
      el: $("#flyPaper"),
      model: flyGraph,
      interactive: false,
    });

    let flyShape = cellView.model!.clone();

    let pos = cellView.model!.position();

    let offset = {
      x: x - pos.x,
      y: y - pos.y,
    };


    flyShape.position(0, 0);
    // flyShape.position();
    flyGraph.addCell(flyShape);


    $("#flyPaper").offset({
      left: (e.pageX as number) - offset.x,
      top: (e.pageY as number) - offset.y,
    });

    $("body").on("mousemove.fly", (e: any) => {
      $("#flyPaper").offset({
        left: (e.pageX as number) - offset.x,
        top: (e.pageY as number) - offset.y,
      });
    });

    $("body").on("mouseup.fly", (e: any) => {

      var x = e.pageX,
        y = e.pageY,
        target = modeler.paper.$el.offset();

      let paperwidth: number = modeler.paper.$el.width();
      let paperheight: number = modeler.paper.$el.height();
      let targetwidth = target.left + paperwidth;
      let targetheight = target.top + paperheight;

      if (x > target.left && x < targetwidth && y > target.top && y < targetheight) {
        var s = flyShape.clone();
        s.position(
          x - target.left - offset.x,
          y - target.top - offset.y
        );

        modeler.graph.addCell(s);
        // var currentElementView = s.findView(modeler.paper);
        // s.attr('body/stroke', 'red');



      }
      $("body").off("mousemove.fly").off("mouseup.fly");
      flyShape.remove();
      $("#flyPaper").remove();
    });
  });
  modeler.paper.on('element:pointerclick', function (elementView: any) {
    console.log('2222', elementView);

    if (elementView.model && elementView.model.attributes && elementView.model.attributes.type && elementView.model.attributes.type=='standard.Rectangle') {
      // if (showPropPanel.value == false)
      //   onShow();
      // console.log(elementView.model.attributes.type)
      schema = awschema.value;
      formData = modelstates.value;
      console.log('model data:',modelstates);
      console.log(schema,formData);
      showAWPanel.value = true
      showGatewayPanel.value =false
      
    }else if(elementView.model && elementView.model.attributes && elementView.model.attributes.type && elementView.model.attributes.type=='RHOMBUS') {

      schema = gatewayschema;
      formData = gatewayData;
      showGatewayPanel.value = true;
      showAWPanel.value=false;

    }
    // console.log('click......', elementView.model.attributes.type);


  });

  // modeler.paper.on('blank:pointerclick', () => {
  //   onClose()
  // });
  // mbtname = this.$route.params.id;

  // console.log('graph:',modeler.graph);
  // console.log('route.query:',route.query,',route.params:',route.params,' fullpath:',route.fullPath,',route name:',route.name)
  // console.log('graph:', modeler.graph.toJSON());



});
// let modelstates = ref<ModelState>({
//   name=''
//     description: string;
//     template: string;
//     template_en: string
//     _id: string;
//     tags: Array<string>;
//     params: Array<paramsobj>
// });
let formData:any;
let gatewayData = ref({
  name:'',
  type:''
})

let modelstates = ref<Stores.aw>({
  // ref<ModelState>({
  name: '',
  description: '',
  // template: "",
  // template_en: "",
  _id: "",
  params: [],
  tags: []
});

function showAWInfo(rowobj: any) {
  // alert('good:' + rowobj.name.toString()+modelstates)
  // onClose()
  // 修改的函数

  modelstates.value.name = rowobj.name
  modelstates.value.description = rowobj.description
  modelstates.value._id = rowobj._id
  // console.log(".....rowobj.tags:",rowobj.tags.value)
  // modelstates.value.tags = rowobj.tags
  // if(_.isArray(rowobj.params)){
  //   _.forEach(rowobj.params, function(value, key) {
  // console.log(key);
  // modelstates.value.params?.push(key)
// });
    
  // }
  // modelstates.value.params = rowobj.params
   modelstates.value.params = []
  showAWPanel.value = true
  showPropPanel.value = false
  // modelstates.value.template = rowobj.template

  // awstore.setAWInfo(rowobj);
  formData = modelstates
  // alert('good:' + rowobj.name.toString()+","+modelstates.value.name+","+modelstates.value.description)
  // formData
}
const colSpan = ref('10');
const columns = reactive<Object[]>(
  [
    {
      name: 'Name',
      dataIndex: 'name',
      key: 'name',

      width: '150px'
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',

      width: '200px'
    },
  ])


let descriptionLight = ref<any>([])
</script>

<template>
  <section class="block shadow flex-center" style="
      width: 100%;
      height: 100%;
      min-height: 100%;
      color: var(--gray);
      font-size: 5rem;
      /* overflow: hidden; */
    ">

    <a-row type="flex" style="
      width: 100%;
      height: 100%;
      min-height: 100%;">
      <a-col :span="2">
        <div class="stencil" ref="stencilcanvas"></div>
      </a-col>
      <a-col :span="16">
        <div class="canvas" ref="canvas"></div>
      </a-col>
      <a-col :span="6">
        <div class="infoPanel" ref="infoPanel">

          <AForm layout="inline" class="search_form" :model="formState" @finish="handleFinish"
            @finishFailed="handleFinishFailed" :wrapperCol="wrapperCol">
            <a-form-item :wrapper-col="{ span: 20 }">
              <a-input v-model:value="formState.search" placeholder="aw"></a-input>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 4 }">
              <a-button type="primary" html-type="submit">search</a-button>
            </a-form-item>
          </AForm>


          <a-row>
            <a-col>
              <!-- v-if="showPropPanel" -->
              <div class="awtable" v-if="showPropPanel">
                <a-table bordered row-key="record=>record._id" :columns="columns" :data-source="tableData"
                  :colSpan="colSpan">
                  <template #headerCell="{ column }">
                    <template v-if="column.key === 'name'">
                      <span>
                        <smile-outlined />
                        Name
                      </span>
                    </template>

                  </template>

                  <template #bodyCell="{ column,text, record }">
                    <template v-if="column.key === 'name'">
                      <a-button type="link" @click="showAWInfo(record)">
                        {{ record.name }}
                      </a-button>
                    </template>

                    <template v-if="column.key === 'description'">
                      <div v-for="desc in descriptionLight" :key="desc">
                        <p v-html="desc"></p>
                      </div>
                    </template>


                  </template>
                </a-table>
              </div>
            </a-col>
          </a-row>


          <a-card style="height:100%; width: 300px;overflow-y: auto;" v-if="showAWPanel">
            <!-- <JsonSchemaForm :formData="modelstates"></JsonSchemaForm> -->
            <!-- --{{schema}}--
            ++{{formData}}++ -->
            <VueForm v-model="modelstates" :schema="awschema">
            </VueForm>
            <!-- v-if="showPropPanel" :schema="schema" -->
            <!-- <a-form :model="formState" name="mbt" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="Param" name="awname"
              :rules="[{ required: true, message: 'Please input your aw name!' }]">
              <a-input v-model:value="formState.awname" placeholder="SUT"/>
            </a-form-item>

            <a-form-item label="Type" name="awname"
              :rules="[{ required: true, message: 'Please input your aw name!' }]">
              <a-input v-model:value="formState.awname" placeholder="str"/>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button type="primary" html-type="submit">Add</a-button>
            </a-form-item>
          </a-form> -->
          </a-card>
        </div>
      </a-col>
    </a-row>

  </section>
</template>

<style scoped>
.canvas {
  margin: 10px;
}

.infoPanel {
  height: 100%;
  /* overflow: hidden; */
  position: relative;
  margin: 10px;
  width: 100%;
  /* min-height: 100%; */
  background-color: #f0f5ff;
  padding-left: 0.2em;
  padding-top: 0.2em;
}

.stencil {
  height: 100%;
  overflow: hidden;
  position: relative;
  margin: 10px;
  width: 100px;
  background-color: #222222;
}

.split-wrapper .scalable {
  width: 20px;
  max-width: 5vw;
  overflow: hidden;
}

.awtable {
  padding-top: 10px;
}
</style>
