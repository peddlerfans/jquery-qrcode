<script setup lang="ts">
import { MbtModeler } from "@/composables/MbtModeler";
import { Stencil } from "@/composables/stencil";
import * as joint from "jointjs";
import { dia } from "jointjs";
import { message } from 'ant-design-vue/es'
import { ref, onMounted, UnwrapRef, onUpdated, watchEffect, watch, reactive, toRefs } from "vue";
import type { Ref } from "vue";
import { useRoute } from 'vue-router'
import type { FormProps, SelectProps, TableProps, TreeProps } from 'ant-design-vue';
import request from '@/utils/request';
import { SmileOutlined, } from '@ant-design/icons-vue';
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

/** drawer  */
//drawer visible
const visible = ref(false);
const showDrawer = (el?: any) => {
  visible.value = true;
  if (el && _.isObject(el) && el.hasOwnProperty('path')) {
    console.log('click link ')
  } else if (el && _.isObject(el)) {
    console.log('click element')
  } else {
    console.log('click blank')
  }
};

const onCloseDrawer = () => {
  visible.value = false;
};

/** Panel -> AW part, including a searching form and table */
//AW panel visible, including search form and table for searching results
let isAW = ref(false);
let isGlobal = ref(false);
let isLink = ref(false);
// aw form searching
const formState = reactive<FormState>({
  awname: '',
  description: '',
  remember: true,
  search: ''
});

let tableData = ref([])
let searchobj = reactive({
  search: "",
  size: 20
})
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
      width: '150px'
    }
  ]);

async function awquery(data?: any) {
  let rst = await request.get("/api/hlfs", { params: data || searchobj })
  if (rst.data) {
    // console.log('rst:',rst.data)
    tableData.value = rst.data
    console.log(tableData, tableData.value);
    return rst.data
  }
}

function onShow(cell?: any) {
  showPropPanel.value = true;
}
const handleFinish: FormProps['onFinish'] = (values: any) => {
  awquery(formState)
  onShow();
};
const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => {
  console.log(errors);
};


/**
 * Panel --Json schema forms
 */

let globalformData = ref<any>();
let linkFormData = ref({
  label: ''
})
let awformdata = ref<Stores.aw>({
  name: '',
  description: '',
  _id: "",
  params: [],
  tags: []
});
const globalschema = ref({
  "title": "MBTConfiguration",
  "description": "Configuration for the MBT",
  "type": "object",
  "properties": {
    "name": {
      "title": "MBT Name",
      "type": "string",
      "readOnly": true

    }
  }
})
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

const linkschema = ref({
  "title": "LINK",
  "description": "Configuration for Link",
  "type": "object",
  "properties": {
    "label": {
      "title": "Label",
      "type": "string"
    }

  }
})

function handlerSubmit() {

  message.success('Save it Successfully');
};
function handlerCancel() {

  // message.warning('Cancel');
}


/**
 * Global https://mbt-dev.oppo.itealab.net/api/test-models?search=
 */
let mbtCache :[Stores.mbt];//save the data from backend
 async function mbtquery(data?: any) {
  let rst = await request.get("/api/test-models?search="+route.params.name)
  if (rst.data) {
    console.log('mbt:',rst.data)
    mbtCache = rst.data;
    // tableData.value = rst.data
    // console.log(tableData, tableData.value);
    return rst.data
  }
}
// save data in the paper as map, {cid:1,elementview: ev,properties:prop} 
let mbtMap = new Map();

/**
 * Global elements in the component
 */
 async function updateMBT(url: string, data: any) {
  let rst = await request.put(url, data)
  // console.log(rst);
}

const canvas = ref(HTMLElement);
const stencilcanvas = ref(HTMLElement);
const infoPanel = ref(HTMLElement);
let showPropPanel: Ref<boolean> = ref(false);
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

/**
 * Localstorage saving the data of this model
 */
//route是响应式对象，可监控其变化，需要用useRoute()获取
const route = useRoute()



onMounted(() => {
  stencil = new Stencil(stencilcanvas);
  modeler = new MbtModeler(canvas);
  mbtquery();
  

  if (localStorage.getItem('mbt-' + route.params.name)) {
    console.log('local storage')
    setupNamespace();

    modeler.paper.options.cellViewNamespace = customNamespace;

    /**
     * localstorage ... todo next
     */
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


  /**
   * Drag & Drop stencil to modeler paper
   */
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

      }
      $("body").off("mousemove.fly").off("mouseup.fly");
      flyShape.remove();
      $("#flyPaper").remove();
    });
  });


  /**
   *  When click the element/link/blank, show the propsPanel
   */
  modeler.paper.on('link:pointerclick', function (linkView: any) {
    console.log('linkView:', linkView);
    isAW.value = false;
    isLink.value = true;
    isGlobal.value = false;
    showDrawer(linkView)
  })

  modeler.paper.on('element:pointerclick', function (elementView: any) {
    console.log('elementView:', elementView);
    if (elementView.model && elementView.model.attributes && elementView.model.attributes.type && elementView.model.attributes.type == 'standard.Rectangle') {
      isAW.value = true;

      isLink.value = false;
      isGlobal.value = false;
      // schema = awschema;

      showDrawer(elementView)
    }else if(elementView && elementView.model && elementView.model.attributes && elementView.model.attributes.type=='standard.Polygon'){
      console.log('...save to backend...')
      if(mbtCache && mbtCache[0] && mbtCache[0].hasOwnProperty('_id')){
        updateMBT(`/api/test-models/${mbtCache[0]['_id']}`,mbtCache.values)
        message.success("Save MBT model successfully")
      }
      
      // updateMBT(`/api/test-models/${modelstates.value._id}`, modelstates.value)
      // message.success("Save MBT model successfully")
    }
    // console.log('click......', elementView.model.attributes.type); 'schema:',schema,


  });

  modeler.paper.on('blank:pointerclick', () => {

    isAW.value = false;
    isLink.value = false;
    isGlobal.value = true;
    showDrawer()
  });

});



function showAWInfo(rowobj: any) {
  // alert('good:' + rowobj.name.toString()+awformdata)
  awformdata.value.name = rowobj.name
  awformdata.value.description = rowobj.description
  awformdata.value._id = rowobj._id
  // console.log(".....rowobj.tags:",rowobj.tags.value)
  // awformdata.value.tags = rowobj.tags
  // if(_.isArray(rowobj.params)){
  //   _.forEach(rowobj.params, function(value, key) {
  // console.log(key);
  // awformdata.value.params?.push(key)
  // });

  // }
  // awformdata.value.params = rowobj.params
  awformdata.value.params = []
  // showPropPanel.value = false
  // formData = awformdata
  // schema = awschema;


}





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
      <a-col :span="22">
        <div class="canvas" ref="canvas"></div>
      </a-col>
      <!-- <a-button type="primary" @click="showDrawer">Open</a-button> :wrapper-col="{ span: 20 }"-->
      <a-drawer width="480" title="Configuration" placement="right" :closable="false" :visible="visible"
        :get-container="false" :style="{ position: 'absolute' , overflow:'hidden' }" @close="onCloseDrawer">
        <div class="infoPanel" ref="infoPanel">

          <AForm v-if="isAW" layout="inline" class="search_form" :model="formState" @finish="handleFinish"
            @finishFailed="handleFinishFailed">
            <a-form-item :wrapper-col="{ span: 24 }">
              <a-input v-model:value="formState.search" placeholder="aw"></a-input>
            </a-form-item>

            <a-form-item :wrapper-col="{ span: 4 }">
              <a-button type="primary" html-type="submit">search</a-button>
            </a-form-item>
          </AForm>

          <div class="awtable" v-if="isAW">
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
                  <div>
                    {{record.description}}
                  </div>
                </template>


              </template>
            </a-table>
          </div>


          <a-card style="overflow-y: auto;">
            <div style="padding: 5px;">
              <VueForm v-model="awformdata" :schema="awschema" @submit="handlerSubmit" @cancel="handlerCancel"
                v-if="isAW">
              </VueForm>
              <VueForm v-model="globalformData" :schema="globalschema" @submit="handlerSubmit" @cancel="handlerCancel"
                v-else-if="isGlobal">
              </VueForm>
              <VueForm v-model="linkFormData" :schema="linkschema" @submit="handlerSubmit" @cancel="handlerCancel"
                v-else-if="isLink">
              </VueForm>
            </div>
          </a-card>
        </div>
      </a-drawer>


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
  padding: 5px;
}

.search_form {
  width: 100%;
  padding: 5px;
}

.ant-drawer-body {
  overflow: hidden !important;
}
</style>
