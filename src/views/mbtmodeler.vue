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
import {MBTStore} from "@/stores/MBTModel"
import { storeToRefs } from "pinia";
import {MBTShapeInterface} from "@/composables/customElements/MBTShapeInterface"
import  schema  from '@/components/schema.vue'
const shape = <MBTShapeInterface><unknown>null

const store = MBTStore()
// let {_id,name,descriptions,condegen_text,condegen_script} = storeToRefs(store).mbtData.value.attributesTem
const { t } = useI18n()
const route = useRoute()
let rappid : MbtServe
let apps : HTMLElement | any= ref()
let isGlobal = ref(true)
const url = realMBTUrl;


const activeKey = ref("1")
const isFormVisible = ref(false);
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

// 发送各组件的事件
let awSchema: any = ref(null)
let awData :any = ref()
// 请求后台的数据
async function mbtquery(id?: any, reLoad?: boolean) {
  let rst;
  let dataFrom: any
  getAllTemplatesByCategory('codegen').then((rst:any)=>{
  if(rst && _.isArray(rst)){
    rst.forEach((rec:any)=>{              
      codegennames.value.push({title:rec.name , const: rec._id})
    })
  }
}).catch((err)=>{console.log(err);
})
  rst = await request.get(url + '/' + id).then((value: any) => {

      // debugger
      if (
        value.hasOwnProperty("modelDefinition") &&
        value.modelDefinition.hasOwnProperty("cellsinfo") &&
        value.hasOwnProperty('dataDefinition')
      ) {
        let tempstr = JSON.stringify(value.modelDefinition.cellsinfo);
        rappid.graph.fromJSON(JSON.parse(tempstr));

        if (value.modelDefinition.hasOwnProperty("props")) {
          const map = new Map(
            Object.entries(JSON.parse(JSON.stringify(value.modelDefinition.props)))
          );
          // cacheprops = map;
        }

        if(value['_id'] && value['name'] && value['description']){
          globalformData.value._id = value['_id']
          globalformData.value.description = value['description']
          globalformData.value.name = value['name']
          if(value.attributes.codegen_text && value.attributes.codegen_script){
            globalformData.value.codegen_text = value.attributes.codegen_text
            globalformData.value.codegen_script = value.attributes.codegen_script
          }
        }

        if (value.modelDefinition.hasOwnProperty("paperscale")) {
          rappid.paper.scale(value.modelDefinition.paperscale);
        }
        //dataDefinition includes meta, datapool and resources

        if (value.dataDefinition.meta) {
          isFormVisible.value = true;
          // cacheDataDefinition.meta = value.dataDefinition.meta;
          tempschema.value = value.dataDefinition.meta.schema;
          metatemplatedetailtableData.value = value.dataDefinition.meta.data;
        }

        if (value.dataDefinition.data) {
          // console.log('has data info ',value.dataDefinition.data.tableData)
          // cacheDataDefinition.data = value.dataDefinition.data;
          // tableData.value = value.dataDefinition.data.tableData;
          // condataName.value = value.dataDefinition.data.tableColumns
          // conditionalValue.value = value.dataDefinition.data.tableData
          dataFrom = value.dataDefinition.data.dataFrom;
          if (dataFrom == "direct_input") {
            templateRadiovalue.value = 3;
            templateCategory.value = 3;
            tableDataDirectInput.value = value.dataDefinition.data.tableData;
            tableColumnsDirectInput.value = value.dataDefinition.data.tableColumns;
          } else if (dataFrom == "dynamic_template") {
            templateRadiovalue.value = 1;
            templateCategory.value = 1;
            tableDataDynamic.value = value.dataDefinition.data.tableData;
            tableColumnsDynamic.value = value.dataDefinition.data.tableColumns.filter((a: any) => a.title !== 'key');
            console.log(tableDataDynamic.value);
            
          } else {
            templateRadiovalue.value = 2;
            templateCategory.value = 2;
            tableData.value = value.dataDefinition.data.tableData;
            tableColumns.value = value.dataDefinition.data.tableColumns;
          }
        }
        localStorage.setItem("mbt_" + route.params._id + route.params.name , JSON.stringify(value))
      }
        
    }).catch((err)=>{console.log(err);
  })
   
  } 

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
  console.log(store.mbtData);
  
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

onMounted(async()=>{  
  if(route.params._id){
    localStorage.setItem("mbt_" + route.params._id + route.params.name + '_id',JSON.stringify(route.params._id))
  }
    getAllTemplatesByCategory('codegen').then((rst:any)=>{
  if(rst && _.isArray(rst)){
    rst.forEach((rec:any)=>{              
      codegennames.value.push({title:rec.name , const: rec._id})
    })
  }
    }).catch((err) => { console.log(err); })

  let idstr = JSON.parse(localStorage.getItem("mbt_" + route.params._id + route.params.name + '_id')!)
  await store.getMbtmodel(idstr)

  if(store.mbtData._id){
    Datafintion(store.mbtData)
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
  if(store.mbtData.modelDefinition && store.mbtData.modelDefinition.cellsinfo && store.mbtData.modelDefinition.cellsinfo.cells){
    rappid.graph.fromJSON(store.mbtData.modelDefinition.cellsinfo);
    
  }
  if  (store.mbtData.modelDefinition && store.mbtData.modelDefinition.hasOwnProperty("paperscale")) {
          rappid.paper.scale(store.mbtData.modelDefinition.paperscale);
        }
        
    rappid.paper.on('cell:pointerdown', (elementView: joint.dia.CellView) => {
      let el: any
      el = elementView.model
      // console.log(elementView.model?.getInspectorSchema());
      // el.getInspectorSchema().awData = awData.value
      if(elementView.model?.getInspectorSchema() && elementView.model?.getInspectorSchema().schema){
        awSchema.value = elementView.model?.getInspectorSchema().schema
      }
      console.log(elementView);
      
      
    })
    rappid.paper.on('blank:pointerdown', (evt: joint.dia.Event, x: number, y: number) => {
    console.log(rappid.selection.collection.toArray());
    
    rappid.selection.collection.reset([]);
    rappid.paperScroller.startPanning(evt);
    rappid.paper.removeTools();
      awSchema.value = null
    
});
})

const saveMbt = () => {
    console.log(rappid.graph.getCells());
}

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
              <a-button type="primary" size="small" style="margin-right: 5px">
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

              <!-- <div class="inspector-container"> -->
              <!-- <VueForm :schema="awSchema"></VueForm> -->
            <!-- </div> -->
            <schema :awSchema="awSchema" v-if="awSchema"></schema>
            <div class="navigator-container"/>
          </div>

  </main>
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

.infoPanel{
  position: relative;
}
.joint-inspector {
  top: 3.125rem;
}
.joint-navigator{
  width: 300px;
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
