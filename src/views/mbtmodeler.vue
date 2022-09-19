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
import { mockMBTUrl, realMBTUrl } from '@/appConfig';
window.joint = joint

const formFooter = {
  show: true, // 是否显示默认底部
  okBtn: '保存', // 确认按钮文字
  okBtnProps: { type: 'primary' }, // 传递确认按钮的 props，例如配置按钮 loading 状态 okBtnProps: { loading: true }
  cancelBtn: '编辑', // 取消按钮文字

  // 透传给formFooter 中的formItem组件的参数
  // 例如 vue3-ant 配置wrapperCol  formItemAttrs = { wrapperCol: { span: 10, offset: 5 }}
  formItemAttrs: {}
}

//Setting url for data fetching
// const url=mockMBTUrl;
const url = realMBTUrl;

const namespace = joint.shapes; // e.g. { standard: { Rectangle: RectangleElementClass }}

/// save data to localstorage, and send to backend as modelDefinition 
interface modelDefinition {
  cellsInfo?: {
    cellNamespace?: Object,
    cells?: Object[]
  },
  props?: Object

}
interface FormState {
  awname: string;
  description: string;
  remember: boolean;
  search?: string
}

let cacheprops = new Map();

/** drawer  */
//drawer visible
const visible = ref(false);
const showDrawer = (el?: any) => {
  visible.value = true;
  if (el && _.isObject(el) && el.hasOwnProperty('path')) {
    // console.log('click link ')
  } else if (el && _.isObject(el)) {
    // console.log('click element')
  } else {
    // console.log('click blank')
  }
};
// const hideDrawer=()=>{
// visible.value = false;
// }

const onCloseDrawer = () => {
  visible.value = false;
};

/** Panel -> AW part, including a searching form and table */
//AW panel visible, including search form and table for searching results
let isAW = ref(false);
let isGlobal = ref(false);
let isLink = ref(false);
let hasAWInfo = ref(false);
// aw form searching
const formState = reactive<FormState>({
  awname: '',
  description: '',
  remember: true,
  search: ''
});

let tableData = ref([])
let searchobj: tableSearch = reactive({
  search: "",
  size: 20,
  page: 1,
  perPage: 10
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
    // console.log(tableData, tableData.value);
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

let globalformData = ref<Stores.mbt>({
  _id: '',
  name: '',
  description: ''
  ,
  tags: []

});
let linkFormData = ref({
  label: ''
})
let awformdata = ref<Stores.awView>({
  name: '',
  description: '',
  params: ''
  , tags: ''
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
    },
    "description": {
      "title": "Description",
      "type": "string",
      "readOnly": true
    },
    "tags": {
      "title": "Tags",
      "type": "string",
      //   // "items":{
      //   //   "type":"string"
      //   // },
      "readOnly": true
    },
    "meta": {
      "title": "Meta",
      "type": "string",
    },
    "resources": {
      "title": "Resources",
      "type": "string",

    },
    "data": {
      "title": "Data",
      "type": "string",
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
      "type": "string"
      ,
      "readOnly": true

    },
    "description": {
      "title": "Description",
      "type": "string"
      ,
      "readOnly": true
    }
    ,
    "tags": {
      "title": "Tags",
      "type": "string",
      "readOnly": true
    }
    ,
    "params": {
      "title": "Params",
      "type": "string",
      "readOnly": true

    }
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

function awhandlerSubmit() {
  console.log('awformdata.......', awformdata);
  // console.log('awformdata222.......', awformdata.value);
  // console.log('cacheprops.......', cacheprops);
  // console.log('currentElementMap.......', currentElementMap);
  // 迭代 Map 中的 key
  for (let key of currentElementMap.keys()) {
    // console.log(key);
    // if(!cacheprops.has(key)){
    //   debugger
    //   cacheprops.set(key,{  'props': awformdata.value });
    // }
    let tempaw = {}
    for (const [key, value] of Object.entries(awformdata.value)) {

      // console.log(`${key}: ${value}`);
      // console.log(JSON.parse(`{"${key}":"${value}"}`))
      let obj = JSON.parse(`{"${key}":"${value}"}`)
      Object.assign(tempaw, obj)
      // Object.assign(tempdata, { cellsinfo: modeler.graph.toJSON() })

    }
    console.log('awobj:', tempaw);
    cacheprops.set(key, { 'props': tempaw });
    console.log('cacheprops2.......', cacheprops);
  }

  //to show labels 

  message.success('Save aw Successfully');
};

function globalhandlerSubmit() {

  message.success('Save config Successfully');
};

function linkhandlerSubmit() {

  message.success('Save it Successfully');
};

function handlerCancel() {

  hasAWInfo.value = false;
};


/**
 * Global https://mbt-dev.oppo.itealab.net/api/test-models?search=
 */
let mbtCache: Stores.mbt;//save the data from backend
//route是响应式对象，可监控其变化，需要用useRoute()获取
const route = useRoute()


async function mbtquery(data?: any) {
  let rst = await request.get(url + "?search=" + route.params.name)
  if (rst.data) {

    rst.data.forEach((record: any) => {
      if (record.name == route.params.name) {
        mbtCache = record
        return
      }
    })


    // console.log('mbtCache:', mbtCache)
    // tableData.value = rst.data
    // console.log(tableData, tableData.value);
    return mbtCache
  }
}
// save data in the paper as map, {cid:1,elementview: ev,properties:prop} 
let currentElementMap = new Map();

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

function saveMBT(route: any) {

  // console.log('route:', route)

  // localStorage.removeItem('mbt-' + route.params.name);
  // console.log('cleared localstorage:', 'mbt-' + route.params.name)
  // tempdata:modelDefinition:
  let tempdata: modelDefinition = {};
  // console.log('.....graph:',modeler.graph)
  Object.assign(tempdata, { cellsinfo: modeler.graph.toJSON() })
  //todo : create cacheprops, when dblclick element or link, save them to cach props
  // let props=[];
  // props.push(awformdata.value);
  let obj = Object.fromEntries(cacheprops)
  // console.log('++++++++++++',obj);
  Object.assign(tempdata, { props: obj })

  mbtCache['modelDefinition'] = tempdata;
  // localStorage.setItem('mbt-' + route.params.name, JSON.stringify(tempdata));
  // localStorage.setItem('mbt-' + route.params.name, JSON.stringify(modeler.graph.toJSON()));
  // console.log('mbtCache.values  ,', mbtCache)
  updateMBT(url + `/${mbtCache['_id']}`, mbtCache)
  message.success("Save MBT model successfully")

}


/**
 * Localstorage saving the data of this model
 */




onMounted(() => {
  stencil = new Stencil(stencilcanvas);
  modeler = new MbtModeler(canvas);
  let res = mbtquery();
  res.then((value: any) => {
    // console.log('res:',value)
    if (value.hasOwnProperty('modelDefinition') && value.modelDefinition.hasOwnProperty('cellsinfo')) {
      let tempstr = JSON.stringify(value.modelDefinition.cellsinfo);
      modeler.graph.fromJSON(JSON.parse(tempstr));
      if (value.modelDefinition.hasOwnProperty('props')) {
        // debugger
        // console.log('before:',cacheprops)
        const map = new Map(Object.entries(JSON.parse(JSON.stringify(value.modelDefinition.props))))
        cacheprops = map;
        // console.log('after:',cacheprops)
      }

    } else if (localStorage.getItem('mbt-' + route.params.name)) {
      // console.log('local storage')
      // setupNamespace();

      // modeler.paper.options.cellViewNamespace = customNamespace;

      /**
       * localstorage ... todo next
       */
      // console.log('already exists ', JSON.stringify(localStorage.getItem('mbt-'+route.params.name)))
      // if (localStorage.getItem('mbt-' + route.params.name)) {
      let tempobj = localStorage.getItem('mbt-' + route.params.name) + '';
      // console.log('load data from here:', tempobj);
      // modeler.graph.fromJSON(JSON.parse(tempstr));
      // return
    } else if (modeler && modeler.graph) {
      let tempdata: modelDefinition = {};
      Object.assign(tempdata, { cellsinfo: modeler.graph.toJSON() })

      Object.assign(tempdata, { props: {} })
      // console.log('save tempdata:', tempdata)
      localStorage.setItem('mbt-' + route.params.name, JSON.stringify(tempdata));
      // localStorage.setItem('mbt-' + route.params.name, JSON.stringify(modeler.graph.toJSON()));
    } else {
      // console.log('empty')
    }
  })

  //modelDefinition



  /**
   * Drag & Drop stencil to modeler paper
   */
  stencil.paper.on("cell:pointerdown", (cellView, e: dia.Event, x, y) => {
    $("body").append(
      '<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;"></div>'
    );
    let flyGraph = new joint.dia.Graph({ cellNamespace: namespace });
    let flyPaper = new joint.dia.Paper({
      el: $("#flyPaper"),
      model: flyGraph,
      interactive: false,
      cellViewNamespace: namespace
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
  modeler.paper.on('link:pointerdblclick', function (linkView: any) {
    // linkView.addLabel
    // console.log('linkView:', linkView);
    isAW.value = false;
    isLink.value = true;
    isGlobal.value = false;
    if (cacheprops.has(linkView.id)) {
      cacheprops.get(linkView.id)
    } else {
      // todo link props
      currentElementMap.set(linkView.id, { 'props': 'linkporps' });
      cacheprops.set(linkView.id, { 'props': 'linkporps' });

      // console.log('cacheprops:', cacheprops);
    }
    showDrawer(linkView)
  })

  modeler.paper.on('element:pointerdblclick', function (elementView: any) {

    // elementView.vel.attr('label', 'Ellipse');
    // elementView.vel.attr('body..fill', '#30d0c6');

    // elementView.el.attr('label', 'Ellipse');

    if (elementView.model && elementView.model.attributes && elementView.model.attributes.type && elementView.model.attributes.type == 'standard.Rectangle') {
      isAW.value = true;

      isLink.value = false;
      isGlobal.value = false;
      // console.log('elementView:', elementView);
      // debugger
      if (cacheprops.get(elementView.model.id) != null && cacheprops.get(elementView.model.id).props.name.length > 0) {
        elementView.model.attr('label/text', cacheprops.get(elementView.model.id).props.description)
        let awformData = cacheprops.get(elementView.model.id)
        awformdata.value = awformData.props;
        // console.log('form data:',awformdata.value,awschema);
        currentElementMap.set(elementView.model.id, { 'props': awformdata.value });
        hasAWInfo.value = true;
      } else {
        // todo
        currentElementMap.set(elementView.model.id, { 'props': awformdata.value });
        // debugger
        cacheprops.set(elementView.model.id, { 'props': awformdata.value });

        // console.log('mbtMap:',mbtMap);

        // console.log('cacheprops.push mbtMap', cacheprops);
      }



      // schema = awschema;

      showDrawer(elementView)
    } else if (elementView && elementView.model && elementView.model.attributes && elementView.model.attributes.type == 'standard.Polygon') {
      // console.log('...save to backend...')
      // if (mbtCache && mbtCache[0] && mbtCache[0].hasOwnProperty('_id')) {
      //   updateMBT(url+`/${mbtCache[0]['_id']}`, mbtCache.values)
      //   message.success("Save MBT model successfully")
      // }


      // message.success("Save MBT model successfully")
    }
    // console.log('click......', elementView.model.attributes.type); 'schema:',schema,


  });

  modeler.paper.on('blank:pointerdblclick', () => {

    isAW.value = false;
    isLink.value = false;
    isGlobal.value = true;
    showGlobalInfo();
    showDrawer()
  });

});

function showGlobalInfo() {
  if (mbtCache && mbtCache && mbtCache.hasOwnProperty('name')) {
    // console.log('...kkkk0...', mbtCache, mbtCache[0]['name']);  
    globalformData.value.name = mbtCache['name'];
    globalformData.value.description = mbtCache['description'];
    globalformData.value.tags = mbtCache['tags'];
  }
  // console.log('...kkkk1...', mbtCache);
  // console.log('...kkkk2...', globalformData);
}


function showAWInfo(rowobj: any) {
  hasAWInfo.value = true;
  awformdata.value.name = rowobj.name
  awformdata.value.description = rowobj.description
  awformdata.value.tags = ''
  awformdata.value.params = ''
  // awformdata.value._id = rowobj._id

  if (_.isArray(rowobj.tags)) {
    _.forEach(rowobj.tags, function (value, key) {
      awformdata.value.tags += value
    })
  }

  if (_.isArray(rowobj.params)) {
    _.forEach(rowobj.params, function (value, key) {
      awformdata.value.params += value.name

    })
  }



}





</script>

<template>
  <main>
    <header class="block shadow">
      <!-- <a-row>
        <a-col :span="24"> -->
      <a-button type="primary" @click="saveMBT(route)">
        Save

      </a-button>
      <!-- </a-col>
      </a-row> -->
    </header>
    <section class="block shadow flex-center" style="
      width: 100%;
      height: 100%;
      min-height: 100%;
      color: var(--gray);
      font-size: 5rem;
      overflow: hidden;
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
        <a-drawer width="70%" title="Configuration" placement="right" :closable="false" :visible="visible"
          :get-container="false" :style="{ position: 'absolute' , overflow:'hidden' }" @close="onCloseDrawer">
          <div class="infoPanel" ref="infoPanel">

            <AForm v-if="!hasAWInfo && isAW" layout="inline" class="search_form" :model="formState"
              @finish="handleFinish" @finishFailed="handleFinishFailed">
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-input v-model:value="formState.search" placeholder="aw"></a-input>
              </a-form-item>

              <a-form-item :wrapper-col="{ span: 4 }">
                <a-button type="primary" html-type="submit">search</a-button>
              </a-form-item>
            </AForm>

            <div class="awtable" v-if="!hasAWInfo && isAW">
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
                <VueForm v-model="awformdata" :schema="awschema" :formFooter="formFooter" @submit="awhandlerSubmit()"
                  @cancel="handlerCancel" v-if="isAW && hasAWInfo">
                </VueForm>
                <VueForm v-model="globalformData" :schema="globalschema" @submit="globalhandlerSubmit"
                  @cancel="onCloseDrawer" v-else-if="isGlobal">
                </VueForm>
                <VueForm v-model="linkFormData" :schema="linkschema" @submit="linkhandlerSubmit" @cancel="onCloseDrawer"
                  v-else-if="isLink">
                </VueForm>
              </div>
            </a-card>
          </div>
        </a-drawer>


      </a-row>

    </section>
  </main>
</template>
<!-- <div slot-scope="{ formData, formRefFn }">
  <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
  <p><el-button @click="consoleLog(formRefFn)" type="primary">点击</el-button></p>
</div> -->
<style scoped>
#content-window {
  overflow: hidden !important;
}

main {
  overflow: hidden;
  height: 100%;
}

header {
  margin-bottom: 1rem;
  width: 100%;
}

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
