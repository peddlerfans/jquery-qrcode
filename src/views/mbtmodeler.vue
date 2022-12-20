<script lang="ts">
export default { name: 'Account' }
</script>
<script setup lang="ts">
import MbtServe from "@/composables/mbtServe"
import { StencilService } from '@/composables/stencil';
import { ToolbarService } from '@/composables/Toolbar';
import { HaloService } from "@/composables/haloService";
import { InspectorService } from "@/composables/inspector";
import { KeyboardService } from "@/composables/keyboard";
import metainfo from "@/components/metainfo.vue";
import inputTable from "@/components/inputTable.vue";
import { CheckOutlined ,EditOutlined , DeleteOutlined , CheckCircleOutlined} from '@ant-design/icons-vue'
import { booleanLiteral, stringLiteral } from "@babel/types";
import { Stores } from "../../types/stores";
import joint from "../../node_modules/@clientio/rappid/rappid.js"
import $ from 'jquery'
import { computed, watch, onMounted, reactive, Ref, ref, UnwrapRef } from 'vue';
import { useI18n } from 'vue-i18n'
import { cloneDeep, sortedIndex } from "lodash";
import {useRoute} from 'vue-router'
import request from "@/utils/request";
import { realMBTUrl } from "@/appConfig";
import VueForm from "@lljj/vue3-form-ant";
import {getTemplate, getAllTemplatesByCategory, IColumn, IJSONSchema,} from "@/api/mbt/index";
import _ from "lodash";
import { MBTStore } from "@/stores/MBTModel"
import { MbtData } from '@/stores/modules/mbt-data'
import { storeToRefs } from "pinia";
import {MBTShapeInterface} from "@/composables/customElements/MBTShapeInterface"
import mbtModelerAwschema from "./mbt-modeler-aw-schema.vue"
import mbtModelerLink from "./mbt-modeler-link-schema.vue"
import {showErrCard} from "@/views/componentTS/mbt-modeler-preview-err-tip";
import MbtModelerRightModal from "@/views/mbt-modeler-right-modal.vue";

const store = MBTStore()
const storeAw = MbtData()
// let {_id,name,descriptions,condegen_text,condegen_script} = storeToRefs(store).mbtData.value.attributesTem
const { t } = useI18n()
const route = useRoute()
let rappid : MbtServe
let apps : HTMLElement | any= ref()
let isGlobal = ref(false)
const url = realMBTUrl;


const activeKey = ref("2")
const isFormVisible = ref(false);
// Aw组件的数据
let activeSchema = ref('2')
let activeLink = ref('2')
let activeGroup = ref('2')
let show = ref(false)
let rightSchemaModal = ref()
let showDrawer = ref(false)
let showGroup = ref(false)
let showLink = ref(false)
let showSection = ref(false)
let showpaper =ref(false)
let metatemplatedetailtableData = ref({});
const templateCategory = ref(1);
const templateRadiovalue = ref<number>(1);
// 静态模板的数据
let tableData = ref([]);
let tableColumns = ref([]);
// 动态模板的数据
  let tableDataDynamic = ref([]);
  let tableColumnsDynamic = ref();
  // input模板的数据
  let tableDataDirectInput = ref([]);
let tableColumnsDirectInput = ref([]);

// resource的数据
const resourcescount = computed(() => resourcesdataSource.value.length + 1);
const resourceseditableData: UnwrapRef<Record<string, ResourcesDataItem>> = reactive({});
interface ResourcesDataItem {
  key: string;
  alias: string;
  class: string;
  resourcetype: string;
}
interface columnDefinition {
  title: string;
  dataIndex: string;
  width?: string;
}
const resourcesdataSource: Ref<ResourcesDataItem[]> = ref([]);
const resourcescolumns: columnDefinition[] = [
  {
    title: "alias",
    dataIndex: "alias",
    width: "20%",
  },
  {
    title: "class",
    dataIndex: "class",
  },
  {
    title: "resourcetype",
    dataIndex: "resourcetype",
  },
  {
    title: "operation",
    dataIndex: "operation",
  },
];

// meta的数据
let tempschema = ref({
  // description: "Config",
  type: "object",
  properties: {},
});
const metaformProps = {
  layoutColumn: 2,
  labelPosition: "left",
  labelWidth: "75px",
  labelSuffix: ":  ",
};
const metatemplatecolumns = reactive<Object[]>([
  {
    title: "name",
    dataIndex: "name",
    key: "name",
    width: 180,
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
    width: 180,
  },
  {
    title: "tag",
    dataIndex: "tag",
    key: "tag",
  },
]);

// attributes的数据
let globalformData = ref<Stores.mbtView>({
  _id: '',
  name: '',
  description: '',
  codegen_text: '',
  codegen_script: '',
});
let codegennames: any = ref([]);
const globalschema = ref({
  type: "object",
  properties: {
    name: {
      title: "MBT Name",
      type: "string",
      readOnly: true,
    },
    description: {
      title: "Description",
      type: "string",
    },
    codegen_text: {
      title: "Output Text",
      type: "string",
      anyOf: codegennames.value,
    },
    codegen_script: {
      title: "Output Script",
      type: "string",
      anyOf: codegennames.value,
    },
  },
});

// 选择模板的函数
const chooseTem = () => {
    isGlobal.value=true
}
// 保存meta的函数
// const submitTemplate = (data: any) => {
//   store.saveMeta(data.schema , data.data)
// };



// 选择动态，静态模板的函数
const handleRadioChange: any = (v: any) => {
  templateCategory.value = v;
};

// 保存动态模板的函数
const handleDynamicTable = (data: any) => {
  console.log(data);
  
};

// 清除动态模板的函数
const handleDynamicTableClear = (data: any) => {
};

// 保存静态模板的函数
const handleStaticTable = (data: any) => {
};

// 保存input模板的函数
const handleDirectInput = (data: any) => {
};

// 添加resource列头的函数
const resourceshandleAdd = () => {
  const newData = {
    key: `${resourcescount.value}`,
    alias: `Resource ${resourcescount.value}`,
    class: `Class. ${resourcescount.value}`,
    resourcetype: `resource type. ${resourcescount.value}`,
  };
  resourcesdataSource.value.push(newData);
};

// 保存单元格的函数
const resourcessave = (key: string) => {
  Object.assign(
    resourcesdataSource.value.filter((item: { key: string; }) => key === item.key)[0],
    resourceseditableData[key]
  );
  delete resourceseditableData[key];
};

// 修改行的函数
const resourcesedit = (key: string) => {
  resourceseditableData[key] = cloneDeep(
    resourcesdataSource.value.filter((item) => key === item.key)[0]
  );
};

// 取消修改的函数
const resourcescancel = (key: string) => {
  delete resourceseditableData[key];
};

// 删除行的函数
const onresourcesDelete = (key: string) => {
  resourcesdataSource.value = resourcesdataSource.value.filter(
    (item: { key: string; }) => item.key !== key
  );
};

// 保存resource的函数
function globalhandlerSubmit(data?:any) {
}

// 关闭模态窗的函数
const handleOk = () => {
  store.saveattr(globalformData.value);
  if(resourcesdataSource.value.length>0){
    store.saveResources(resourcesdataSource.value)
  }
  isGlobal.value = false  
  // isGlobal.value = false
}

// 回显数据的地方
function Datafintion(data: any) {  
  if(store.changeTemplate?._id){
    globalformData.value = {...store.changeTemplate}
  }
  if (store.showMetaSchema) {
    tempschema.value = computed(()=>store.showMetaSchema).value
    isFormVisible.value = true    
  }
  if (store.showMetaData) {
    metatemplatedetailtableData.value = store.showMetaData
  }
  if(data.dataDefinition.resources.length>0){
    resourcesdataSource.value = data.dataDefinition.resources
  }
  
  if(
    data &&
    data.dataDefinition &&
      data.dataDefinition.data &&
      data.dataDefinition.data.tableData
  ) {
    if(data.dataDefinition.data.dataFrom == 'dynamic_template'){
      templateRadiovalue.value = 1;
      templateCategory.value = 1;
      tableDataDynamic.value = data.dataDefinition.data.tableData
      tableColumnsDynamic.value = data.dataDefinition.data.tableColumns
    }else if(data.dataDefinition.data.dataFrom == 'static_template'){
      templateRadiovalue.value = 2;
      templateCategory.value = 2;
      tableData.value = data.dataDefinition.data.tableData
      tableColumns.value = data.dataDefinition.data.tableColumns
    }else{
      templateRadiovalue.value = 3;
      templateCategory.value = 3;
      tableDataDirectInput.value  = data.dataDefinition.data.tableData
      tableColumnsDirectInput.value = data.dataDefinition.data.tableColumns
    }
  }
}
let schemaGroup = ref()
let schemaSection = ref()
let DataGroup = ref({
  description: '',
  loopCount:''
})
let DataSection = ref({
  description:''
})
let cell: any = null

function getLinkType(linkView: any): string {
  if (linkView.hasOwnProperty("id")) {
    if (rappid.graph.getCell(linkView.id).hasOwnProperty("linktype")) {
      return linkView["linktype"];
    }
  }
  return "";
}

function setLinkType(el: any, cell: any) {
    if (el && el.attributes && el.attributes.source && el.attributes.source.id)
      try {
        let linksource:any = rappid.graph.getCell(el.attributes.source.id);
        // console.log('type:',linksource.attributes.type)
        if (linksource.attributes.type == "itea.mbt.test.MBTExclusiveGateway") {
            Object.assign(cell, { linktype: "exclusivegateway" });
        } else {
            Object.assign(cell, { linktype: "parallelgateway" });
          }
      } catch (e) {
        console.log("e:", e);
      }
  }

let idstr: any = null

onMounted(async () => {
  if (route.params._id) {
    localStorage.setItem("mbt_" + route.params._id + route.params.name + '_id', JSON.stringify(route.params._id))
  }
  getAllTemplatesByCategory('codegen').then((rst: any) => {
    if (rst && _.isArray(rst)) {
      rst.forEach((rec: any) => {
        codegennames.value.push({ title: rec.name, const: rec._id })
      })
    }
  }).catch((err) => { console.log(err); })

  idstr = JSON.parse(localStorage.getItem("mbt_" + route.params._id + route.params.name + '_id')!)
  await store.getMbtmodel(idstr)

  if (store.mbtData._id) {
    Datafintion(store.mbtData)
    storeAw.setAllData(store.mbtData)
  }
  rappid = new MbtServe(
    apps.value,
    new StencilService(),
    new ToolbarService(),
    new HaloService(),
    new InspectorService(),
    new KeyboardService()
  )
  rappid.startRappid()
  if (store.mbtData && store.mbtData.modelDefinition && store.mbtData.modelDefinition.cellsinfo && store.mbtData.modelDefinition.cellsinfo.cells) {
    
    rappid.graph.fromJSON(JSON.parse(JSON.stringify(store.getcells)));

  }
  if (store.mbtData && store.mbtData.modelDefinition && store.mbtData.modelDefinition.hasOwnProperty("paperscale")) {
    rappid.paper.scale(store.mbtData.modelDefinition.paperscale);
  }

  rappid.graph.on("add", function (el: any) {
    storeAw.resetEditingExpectedAw()

    if (el && el.hasOwnProperty("id")) {
      try {
        showpaper.value = true
        // inspectorstyle2.value = {display:'block'}
        let cell:any = rappid.graph.getCell(el.id);
        let type = cell.get('type')        

        if (cell.isLink() && type == 'itea.mbt.test.MBTLink') {

          showLink.value = true
          show.value = false
        showGroup.value = false
        showSection.value = false
          setLinkType(el, cell);
          if (getLinkType(cell) == "exclusivegateway") {          
          showDrawer.value = true
        }else{
          showDrawer.value = false
        }
        } else if(type == 'itea.mbt.test.MBTAW'){
          showLink.value = false
            show.value = true
            showGroup.value = false
            showSection.value = false
        }else if(type == 'itea.mbt.test.MBTGroup'){
          show.value = false
        showGroup.value = true
        showLink.value = false
        showSection.value = false
        }else if(type == 'itea.mbt.test.MBTSection'){
        show.value = false
        showLink.value = false
        showGroup.value = false
        showSection.value = true
        }else{
        show.value = false
        showLink.value = false
        showGroup.value = false
        showSection.value = true
        }
      } catch (e) {
        console.log("error:", e);
      }
     }      
  })

    rappid.paper.on('cell:pointerdown', (elementView: joint.dia.CellView) => {
      console.log('clickpointerdown')
      let el: any
      el = elementView.model
      cell = el
      // el.getPropertiesSchema(),将它的值存入pinia中给  大schema使用
      const checkAwProps = el.getPropertiesSchema()
      storeAw.setData(checkAwProps)
      storeAw.setVisible(true)
      rightSchemaModal.value.handleShowData()
      saveAw()
      show.value = false
      setLinkType(elementView.model,elementView.model)
      showpaper.value = true
      // let type = elementView.model?.get('type');
      // if(type == 'itea.mbt.test.MBTAW'){
      //
      //   showGroup.value = false
      //   showSection.value = false
      //   showLink.value = false
      //   let checkAwprops = el.getPropertiesSchema()
      //   if(checkAwprops && checkAwprops.description){
      //     storeAw.setDescription(checkAwprops.description)
      //
      //     if (JSON.stringify(checkAwprops?.primary?.schema || {}) !== '{}') {
      //     storeAw.setEditingPrimaryAw(checkAwprops.primary)
      //
      //     if(JSON.stringify(checkAwprops.expected.schema) !== '{}'){
      //       storeAw.setEditingExpectedAw(checkAwprops.expected)
      //     }
      //   }
      // }
      // setTimeout(() => {
      //   show.value = true
      // }, 0);
      // }else if(type == 'itea.mbt.test.MBTGroup'){
      //   show.value = false
      //
      //   showLink.value = false
      //   showGroup.value = true
      //   showSection.value = false
      //   schemaGroup.value = el.getInspectorSchema().schema
      //   if (el.getPropertiesData().description || el.getPropertiesData().loopCount) {
      //     DataGroup.value = {...el.getPropertiesData()}
      //   }
      // }else if (type == 'itea.mbt.test.MBTSection') {
      //   schemaSection.value = el.getInspectorSchema().schema
      //   if (el.getPropertiesData().sectionName) {
      //     DataSection.value = {...el.getPropertiesData()}
      //   }
      //   show.value = false
      //   showGroup.value = false
      //   showSection.value = true
      //   showLink.value = false
      // } else if (type == 'itea.mbt.test.MBTLink') {
      //   if (getLinkType(elementView.model) == "exclusivegateway") {
      //     showDrawer.value = true
      //   }else{
      //     showDrawer.value = false
      //   }
      //   showLink.value = true
      // }else{
      //   show.value = false
      //   showLink.value = false
      //   showGroup.value = false
      //   showSection.value = false
      // }
    })

    rappid.paper.on('blank:pointerdown', (evt: joint.dia.Event, x: number, y: number) => {
      storeAw.setVisible(false)
      
      let Nowcell = rappid.selection.collection.take()
      cell = Nowcell
      saveAw()
      if (Nowcell) {
        let type = Nowcell.attributes?.type
          if(type == 'itea.mbt.test.MBTAW') {
            // saveAw()
            
           if(storeAw.getAWBothDesc){
              Nowcell.setPropertiesData(storeAw.getPrimaryAw,storeAw.getExpectedAw,storeAw.getAWBothDesc)
              // storeAw.resetEditingExpectedAw()
           };
            

          } else if (type == 'itea.mbt.test.MBTGroup') {
          Nowcell.setPropertiesData(DataGroup.value)
          } else if (type == 'itea.mbt.test.MBTSection') {
            
          Nowcell.setPropertiesData()
        }
      }
      showpaper.value = false
      show.value = false
      showGroup.value = false
      showSection.value = false
      showLink.value = false
    rappid.selection.collection.reset([]);
    rappid.paperScroller.startPanning(evt);
      rappid.paper.removeTools();
    // tabchange(0)
});
})
const saveAw = () => {
  if(cell && !_.isEmpty(storeAw.getShowData)){
    cell.setPropertiesData(storeAw.getShowData)
  }
  
}
const saveMbt = () => {
  console.log(store.mbtData);
  
  store.setGraph(rappid.paper.model.toJSON())  
  if (idstr) {
    request.put(`${realMBTUrl}/${idstr}`, store.getAlldata).then(() => {
          return '保存成功'
        }).catch(() => {
          return '保存失败'
        })
  }
}


// 实时更新数据，依据change事件来调用函数

const changeGroup = () => {
  if(cell){
      cell.setPropertiesData(DataGroup.value)
  }
}
const changeSection = () => {
  if(cell){
      cell.setPropertiesData(DataSection.value)
  }
}
const saveLink = () =>{  
  if(cell && storeAw.LinkData.linkSchemaValue){    
    cell.setPropertiesData(storeAw.getLinkData.linkSchemaValue,storeAw.getLinkData.rulesData)
  }
}
// let inspectorstyle1 = ref()
// let inspectorstyle2 = ref()
// const tabchange = (n: number) => {
//   if (n == 0) {
//     inspectorstyle1.value = {display:'block'}
//     inspectorstyle2.value = {display:'none'}
//   } else {
//     inspectorstyle1.value = {display:'none'}
//     inspectorstyle2.value = {display:'block'}
//   }
// }

const visiblepreciew=ref(false)
const previewActiveKey = ref("1")
const casesKey=ref("1")
let previewcol:any=ref([])
const previewData:any=ref([])
let previewScript = ref("")
const softwrap=true
let searchPreview=reactive({
  mode:""
})
let outLang=ref()


async function querycode(){
  request.get(`${realMBTUrl}/${route.params._id}/codegen`,{params:searchPreview}).then((rst)=>{

  if(rst && rst.results && rst.results.length>0){

    outLang.value=rst.outputLang
    Object.keys(rst.results[0].json).forEach((obj)=>{
      let objJson={
        title:obj,
        dataIndex:obj,
        key:obj,
        width:50
      }
      previewcol.value.push(objJson)
    })
    previewcol.value.push({title:"action",dataIndex:"action",key:"action"})
    previewData.value=rst.results.map((item:any)=>{
      if(item.script){
        Object.assign(item.json,{script:item.script})
      }
      return item.json
    })
    visiblepreciew.value = true
  }
  }).catch((err)=>{
    // 这里提示用户详细错误问题
    const errMsg = err.response.data
    showErrCard(errMsg)
  })
  
}
const preview=async (data:any)=>{
  
  searchPreview.mode="all"
  await querycode()
}

const openPreview = (record:any)=>{
  previewScript.value=record.script
}

const preciewHandleOk = () =>{
  visiblepreciew.value=false
  previewData.value=[]
  previewcol.value=[]
}
const cencelpreview=()=>{
  previewData.value=[]
  previewcol.value=[]
}


// 工具栏

</script>

<template>
  <main class="joint-app joint-theme-modern" ref="apps">
        <div class="app-header">
          <div class="app-title">
            <a-button-group>
              <span>
            <a-button @click="saveMbt" type="primary" size="small" style="margin-right: 5px">
              {{ $t("common.saveText") }}
            </a-button>
          </span>
          <span>
              <a-button type="primary"
               size="small" 
               @click="preview(route)"
               style="margin-right: 5px">
                {{ $t("layout.multipleTab.preview") }}
              </a-button>
            </span>
            <span>
              <a-button danger size="small">
                {{ $t("layout.multipleTab.reload") }}
              </a-button>
            </span>
          </a-button-group>

          </div>
          <div class="toolbar-container">
            
          </div>
          <div class="choose-template">
            <a-button type="primary" @click="chooseTem">Choose Template</a-button>
          </div>
        </div>
          <div class="app-body">
            <div ref="stencils" class="stencil-container"/>
            <div class="paper-container"/>
            <div class="AwtabInspector" v-show="showpaper">
              <ul class="tab_ul">
                    <li v-if="!show && !showGroup && !showSection && !showLink">样式修改</li>
                    <li
                    v-if="show || showGroup || showSection || showLink"
                    >数据编辑</li>
                    <div style="clear:both;"></div>
              </ul>
              <!-- <div v-show="!show && !showGroup && !showSection && !showLink" class="inspector-container"></div> -->
              <div class="dataStyle">
                <mbt-modeler-right-modal ref="rightSchemaModal"></mbt-modeler-right-modal>
<!--                <mbtModelerAwschema @change="saveAw" v-show="show" :show="show" ref="aaaaa"></mbtModelerAwschema>-->
<!--                <VueForm-->
<!--                v-show="showGroup"-->
<!--                :schema="schemaGroup"-->
<!--                v-model="DataGroup"-->
<!--                @change = 'changeGroup'-->
<!--                ></VueForm>-->
<!--                 <mbtModelerLink-->
<!--                  v-show="showLink"-->
<!--                  @change="saveLink"-->
<!--                  :showDrawer="showDrawer"-->
<!--                  ></mbtModelerLink>-->
<!--                  <VueForm-->
<!--                v-show="showSection"-->
<!--                :schema="schemaSection"-->
<!--                v-model="DataSection"-->
<!--                @change = 'changeSection'-->
<!--                ></VueForm>-->
              </div>
              
            </div>
        <!-- <div v-show="!show || !showGroup || !showSection || !showLink" class="inspector-container"></div> -->
            <div class="navigator-container"/>
          </div>


  </main>
   <a-modal v-model:visible="visiblepreciew" 
          title="Preview Modal" @ok="handleOk" 
          :footer="null"
          :keyboard="true"
          :mask-closable="true"
          width="1280"
          class="previewModel"
          @cancel="cencelpreview"
          >
          <a-table :columns="previewcol" 
          :data-source="previewData" 
          :pagination="{pageSize:5}"
          bordered
          :rowKey="(record: any) => record.id"
          class="previewclass"
          >
        <template #bodyCell="{column,record}">
           <template v-if="column.key=='can_be_automated'">
            <p >{{record.can_be_automated}}</p>
          </template>
          <template v-if="column.key=='is_implemented_automated'">
            <p >{{record.is_implemented_automated}}</p>
          </template>
          <template v-if="column.key=='is_in_project'">
            <p >{{record.is_in_project}}</p>
          </template>
          <template v-if="column.key=='test_steps'">
            <pre >{{record.test_steps}}</pre>
          </template>
          <template v-if="column.key=='expected_results'">
            <pre >{{record.expected_results}}</pre>
          </template>
          <template v-if="column.key=='action'">
            <a-button type="link" @click="openPreview(record)">previewDetails</a-button>
          </template>
          </template>
        </a-table>
          <!-- <div > -->
            <VAceEditor
            v-if="previewScript"
                          v-model:value="previewScript"
                          class="ace-result"
                          :wrap="softwrap"
                          :readonly="true"
                          :lang="outLang"
                          theme="sqlserver"
                          :options="{ useWorker: true }"
                      />
          <!-- </div> -->
          </a-modal>

  <a-modal v-model:visible="isGlobal" title="Please select a template first" 
      @ok="handleOk"
      :width="1000"
      ok-text="save"
      >
      <div class="infoPanel card-container">
            <a-tabs v-model:activeKey="activeKey" type="card">
              <a-tab-pane key="1" tab="Attributes" force-render style="height:550px;">
      
                  <div style="padding: 5px" class="attrconfig">
                    <VueForm
                      v-model="globalformData"
                      :schema="globalschema"
                      :formFooter="{show:false}"
                    >
                    </VueForm>
                  </div>
              </a-tab-pane>
              <a-tab-pane key="2" tab="Meta" style="height:550px; position: relative;">
                <metainfo
                  :isFormVisible="isFormVisible"
                  :metatemplatedetailtableData="metatemplatedetailtableData"
                  :schema="tempschema"
                  :metaformProps="metaformProps"
                  :metatemplatecolumns="metatemplatecolumns"
                >
                </metainfo>
              </a-tab-pane>

              <a-tab-pane key="3" tab="Data Pool" style="height:550px; position: relative;">
                <a-radio-group
                  v-model:value="templateRadiovalue"
                  @change="handleRadioChange(templateRadiovalue)"
                >
                  <a-radio :value="1">Dynamic Template</a-radio>
                  <a-radio :value="2">Static Template</a-radio>
                  <a-radio :value="3">Input directly</a-radio>
                </a-radio-group>
              <KeepAlive>
                <template-table
                  v-if="templateRadiovalue === 1"
                  :tableColumns="tableColumnsDynamic"
                  :templateCategory="templateCategory"
                  :tableData="tableDataDynamic"
                  @update="handleDynamicTable"
                  @clear="handleDynamicTableClear"
                ></template-table>
                </KeepAlive>
                <!-- --********---{{tableData}}**
                  ++++{{tableColumns}}########                   -->
                <KeepAlive>
                  <template-table
                  v-if="templateRadiovalue === 2"
                  :tableColumns="tableColumns"
                  :templateCategory="templateCategory"
                  :tableData="tableData"
                  @update="handleStaticTable"
                ></template-table>
                </KeepAlive>
                <input-table
                  :tableColumns="tableColumnsDirectInput"
                  :tableData="tableDataDirectInput"
                  v-if="templateRadiovalue === 3"
                  @update="handleDirectInput"
                ></input-table>
              </a-tab-pane>
              <a-tab-pane key="4" tab="Resources" style="height:550px;">
                <a-button
                  class="editable-add-btn"
                  style="margin-bottom: 8px"
                  @click="resourceshandleAdd"
                  >Add
                </a-button>
                <a-table
                  bordered
                  :data-source="resourcesdataSource"
                  :columns="resourcescolumns"
                >
                  <template #bodyCell="{ column, text, record }">
                    <template
                      v-if="['alias', 'class', 'resourcetype'].includes(column.dataIndex)"
                    >
                      <div class="editable-cell">
                        <div
                          v-if="resourceseditableData[record.key]"
                          class="editable-cell-input-wrapper"
                        >
                          <a-input
                            v-model:value="resourceseditableData[record.key][column.dataIndex as keyof typeof stringLiteral ]"
                            @pressEnter="resourcessave(record.key)"
                          />
                          <check-outlined
                            class="editable-cell-icon-check"
                            @click="resourcessave(record.key)"
                          />
                        </div>
                        <div v-else class="editable-cell-text-wrapper">
                          {{ text || " " }}
                          <edit-outlined
                            class="editable-cell-icon"
                            @click="resourcesedit(record.key)"
                          />
                        </div>
                      </div>
                    </template>
                    <template v-else-if="column.dataIndex === 'operation'">
                      <div class="editable-row-operations">
                        <span v-if="resourceseditableData[record.key]">
                          <a-tooltip placement="bottom">
                            <template #title>
                              <span>{{ $t('common.saveText') }}</span>
                            </template>
                            <check-circle-outlined @click="resourcessave(record.key)" class="icon--success-btn" />
                          </a-tooltip>
                          <a-divider type="vertical" />
                          <a-popconfirm
                            :title="$t('component.message.sureCancel')"
                            @confirm="resourcescancel(record.key)"
                          >
                            <a-tooltip placement="bottom">
                              <template #title>
                                <span>{{ $t('common.cancelText') }}</span>
                              </template>
                              <close-circle-outlined @click="resourcescancel(record.key)" class="icon--err-btn" />
                            </a-tooltip>
                          </a-popconfirm>
                        </span>
                        <span v-else>
                          <a-tooltip placement="bottom">
                            <template #title>
                              <span>{{ $t('common.editText') }}</span>
                            </template>
                            <edit-outlined @click="resourcesedit(record.key)" class="icon--primary-btn" />
                          </a-tooltip>
                        </span>
                        <a-divider type="vertical" />
                        <span>
                          <a-popconfirm
                            v-if="resourcesdataSource.length"
                            title="Sure to delete?"
                            @confirm="onresourcesDelete(record.key)"
                          >
                            <a-tooltip placement="bottom">
                              <template #title>
                                <span>{{ $t('common.delText') }}</span>
                              </template>
                               <delete-outlined class="icon--primary-btn" />
                            </a-tooltip>
                          </a-popconfirm>
                        </span>
                      </div>
                    </template>
                  </template>
                </a-table>
                <a-button type="primary" @click="globalhandlerSubmit">{{
                  $t("common.saveText")
                }}</a-button>
              </a-tab-pane>
            </a-tabs>
  </div>
</a-modal>
</template>

<style lang="scss">
@import "../../node_modules/@clientio/rappid/rappid.css";
@import '../composables/css/style.css';

.app-header{
  background-color: #717D98;
}

			ul {
				list-style: none;
			}
			.tab_ul {
        display: flex;
				background-color: #717D98;
				overflow: hidden;
        width: 100%;
        height: 50px;
			}
			.tab_ul li {
				padding: 15px;
				cursor: pointer;
			}
			.tab_ul .active {
				color: #ec1818;
			}

.AwtabInspector{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 120px;
    width: 300px;
    box-sizing: border-box;
    .dataStyle{
    top: 50px;
    display: block;
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow: auto;
}
.inspector-container {
    top: 50px;
    overflow: auto;
    height: 100%;
    box-sizing: border-box;
}
.joint-inspector {
  bottom: 50px;
}
}
.GroupInspector{
    position: absolute;
    top: 50px;
    overflow: auto;
    bottom: 0;
    width: 100%;
    flex: 1;
}
.inspector-container {
    flex: 1 1 0%;
    top: 3.125rem;
    bottom: 0;
    overflow: auto;
    height: 100%;
    box-sizing: border-box;
}
.joint-inspector.joint-theme-material{
  position: absolute;
  bottom: 50px;
}


.infoPanel{
  position: relative;
}

.joint-navigator{
  width: 330px;
}
.card-container p {
  margin: 0;
}
.card-container > .ant-tabs-card .ant-tabs-content {
  height: 100%;
  margin-top: -16px;
}
.card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  padding: 16px;
  background: #fff;
}
.card-container > .ant-tabs-card > .ant-tabs-nav::before {
  display: none;
}
.card-container > .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab {
  border-radius: 6px 6px 0 0;
}
.card-container > .ant-tabs-card .ant-tabs-tab,
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}
.card-container > .ant-tabs-card .ant-tabs-tab-active,
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
  background: #fff;
  border-color: #fff;
}
#components-tabs-demo-card-top .code-box-demo {
  padding: 24px;
  overflow: hidden;
  background: #f5f5f5;
}
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-content {
  height: 120px;
  margin-top: -8px;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}
[data-theme='dark'] #components-tabs-demo-card-top .code-box-demo {
  background: #000;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  background: #141414;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
  background: #141414;
  border-color: #141414;
}


</style>
