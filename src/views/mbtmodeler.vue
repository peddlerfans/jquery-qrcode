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
import { CheckOutlined ,EditOutlined , DeleteOutlined , CheckCircleOutlined,CloseCircleOutlined, ExclamationCircleOutlined} from '@ant-design/icons-vue'
import { booleanLiteral, returnStatement, stringLiteral } from "@babel/types";
import { Stores } from "../../types/stores";
import joint from "../../node_modules/@clientio/rappid/rappid.js"
import $ from 'jquery'
import { computed, watch, onMounted, reactive, Ref, ref, UnwrapRef, provide, createVNode } from 'vue';
import { useI18n } from 'vue-i18n'
import { cloneDeep, map, sortedIndex } from "lodash";
import {onBeforeRouteLeave, useRoute} from 'vue-router'
import request from "@/utils/request";
import { realMBTUrl ,awModelUrl} from "@/appConfig";
import VueForm from "@lljj/vue3-form-ant";
import {getTemplate, getAllTemplatesByCategory, IColumn, IJSONSchema,} from "@/api/mbt/index";
import _ from "lodash";
import { MBTStore } from "@/stores/MBTModel"
import { MbtData } from '@/stores/modules/mbt-data'
import {MBTShapeInterface} from "@/composables/customElements/MBTShapeInterface"
import {showErrCard} from "@/views/componentTS/mbt-modeler-preview-err-tip";
import MbtModelerRightModal from "@/views/mbt-modeler-right-modal.vue";
import { message, Modal } from "ant-design-vue";
import "./componentTS/ace-config";
import { throttle } from "lodash-es";
import { fitAncestors,isValidKey } from "@/utils/jointFun"
import MbtPreviewModal from "@/views/mbt-preview-modal.vue";



const store = MBTStore()
const storeAw = MbtData()
const { t } = useI18n()
const route = useRoute()
let rappid : MbtServe
let apps : HTMLElement | any= ref()
let isGlobal = ref(false)
let leaveRouter = ref(false)
let spinning = ref<boolean>(false)
const activeKey = ref("1")
const isFormVisible = ref(false);
// Aw组件的数据
let rightSchemaModal = ref()
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
let codegenTextName :any =ref([])
let codegenScriptName :any =ref([])
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
      anyOf: codegenTextName.value,
    },
    codegen_script: {
      title: "Output Script",
      type: "string",
      anyOf: codegenScriptName.value,
    },
  },
});

let schemaValue :any = ref({})
let schema = ref({
    title: "AW",
  type: "object",
  description: '',
  properties: {
    _id: {
      type: "string",
      "ui:hidden": true,
      required: true,
    },
    name: {
      title: "AW Name",
      type: "string",
      readOnly: true,
    },
    description: {
      title: "Description",
      type: "string",
      readOnly: true,
      "ui:widget": "TextAreaWidget",
    },
    template: {
      title: "Template",
      type: "string",
      readOnly: true,
    },
    tags: {
      title: "Tags",
      type: "string",
      readOnly: true,
    },
  }
  })
// 选择模板的函数
const chooseTem = () => {
    isGlobal.value=true
}

// 选择动态，静态模板的函数
const handleRadioChange: any = (v: any) => {
  templateCategory.value = v;
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
watch(resourcesdataSource.value ,(newval:any)=>{
  if(newval){
    store.saveResources(newval)
  }
},{deep:true})
function attrsChange(){
  store.saveattr(globalformData.value);
}

// 关闭模态窗的函数
const handleOk = () => {
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

// async function getAw(id: string){
//   return await request.get(`${awModelUrl}/${id}`) 
// }
// 依据uiSchema更新data数据
function newData(aw: any, data: any) {
  let newdata:any = {}
  if (_.isEmpty(aw)) {
    newdata = {}
  } else {
    if (aw.params && aw.params.length > 0) {
      let paramsName = _.map(aw.params, 'name');
      let dataKey = Object.keys(data)
      newdata = _.pick(data, _.intersection(paramsName, dataKey))
    }
    if (!_.isEmpty(newData)) {
      for (let key in newdata) {
        if (isValidKey(key, newdata)) {
          newdata[key] = {val:newData[key] , type:'2'}
        }
      }
    }
    
  }
  return newdata
}
function ifuiSchema(uiSchema:any, data:any){
  let Awdata:any = {}
  if(uiSchema){
    let uikey = Object.keys(uiSchema)
    let dataKey = Object .keys(uiSchema)
    Awdata = _.pick(data, _.intersection(uikey, dataKey))
  }else{
    Awdata = {}
  }
  return Awdata
}

function getAwData(cell: any) {
  // debugger
  let prop = {custom:{}}
  let awdata:any
  let custom = cell.prop.custom
  if (custom.step?.aw) {
    Object.assign(prop.custom,{step : {aw:custom.step?.aw || {}, data:newData(custom.step?.aw,custom.step?.data),uiParams:custom.step?.uiParams || {}}})
  } else {
      Object.assign(prop.custom,{step : {aw:custom.step?.data || {}, data:ifuiSchema(custom.step?.uiParams, custom.step?.data),uiParams:custom.step?.uiParams || {}}})
    }

  
  if (custom.expectation?.aw) {
    Object.assign(prop.custom,{expectation : {aw:custom.expectation?.aw, data:newData(custom.expectation.aw,custom.expectation?.data),uiParams:custom.expectation?.uiParams || {}}})
  } else {
     Object.assign(prop.custom,{expectation : {aw:custom.expectation?.data, data:ifuiSchema(custom.expectation?.uiParams , custom.expectation?.data),uiParams:custom.expectation?.uiParams || {}}})
  }
  
  return prop
}


let idstr: any = null

const lagacyShapeTypeMapping:any = {
  'uml.StartState':'itea.mbt.test.MBTStartEvent', 'standard.HeaderedRectangle':'itea.mbt.test.MBTAW',
  'uml.EndState':'itea.mbt.test.MBTEndEvent','standard.Polygon':'itea.mbt.test.MBTExclusiveGateway','standard.Link':'itea.mbt.test.MBTLink'
}

function getShapeTypeMapping(shapeType:string) {
  return  lagacyShapeTypeMapping[shapeType] || shapeType
}
function transformCells(mbtData:any){
  if(!mbtData?.modelDefinition?.cellsinfo?.cells){
    return [];
  }
   let cells = mbtData.modelDefinition.cellsinfo.cells.map((cell:any)=>{
    if(mbtData.modelDefinition?.props){
      if(cell.type == 'standard.Link'){
        cell=  {...cell,type:getShapeTypeMapping(cell.type),prop:getProperty(cell,mbtData)};
      }else if(cell.type == 'standard.HeaderedRectangle'){
        cell=  {...cell,type:getShapeTypeMapping(cell.type),prop:getProperty(cell,mbtData)};
      } else if (cell.type == 'itea.mbt.test.MBTAW') {
        if (!mbtData?.modelDefinition?.version) {
          cell = { ...cell , prop:getAwData(cell)}
        }
        
      }
      cell=  {...cell,type:getShapeTypeMapping(cell.type)};
    } 
    if(cell.type == 'itea.mbt.test.MBTAW'){
      if(!mbtData?.version){
        cell = { ...cell , prop:getAwData(cell)}
      }
    }
      
      
      
     delete cell.attrs;
    //  Object.keys(cell.attrs).filter(k => k.startsWith(".")).forEach(k => delete cell.attrs[k])
    return cell

   })
  //  console.log(cells);
   
   return {cells};
}

 function getProperty(cell: any, mbtData: any) {
  // debugger
  let prop = {custom:{}}
  if (mbtData.modelDefinition.props[cell.id]?.props?.label && mbtData.modelDefinition.props[cell.id]?.props?.label.trim()) {
    Object.assign(prop.custom,{description:'',label:mbtData.modelDefinition.props[cell.id]?.props?.label, rulesData:mbtData.modelDefinition.props[cell.id]?.props?.ruleData})
  }
  if (mbtData.modelDefinition.props[cell.id]?.props?.hasOwnProperty('primaryprops')) {
    let awprop = mbtData.modelDefinition.props[cell.id].props.primaryprops;
    awprop.schema.description = awprop.aw?.description || awprop.data?.description || awprop.schema.description || ''
    if (awprop?.aw) {
        Object.assign(prop.custom,{step : {aw:awprop?.aw, data:newData(awprop.aw,awprop.data),uiParams:{}}})
    } else {
        Object.assign(prop.custom,{step : {aw:awprop.data, data:{},uiParams:{}}})
      }
      
      }
  if(mbtData.modelDefinition.props[cell.id]?.props?.hasOwnProperty('expectedprops')){
    let awprop = mbtData.modelDefinition.props[cell.id].props.expectedprops;
    
    awprop.schema.description = awprop.aw?.description || awprop.data?.description || awprop.schema.description
    if (awprop.aw) {
      Object.assign(prop.custom, { expectation: { aw: awprop?.aw, data: newData(awprop.aw, awprop.data), uiParams:{}} })
    }
    Object.assign(prop.custom, { expectation: { aw: awprop?.data, data: {}, uiParams:{} } })
     }
   return prop
  } 
   

onMounted(async () => {  
  if (route.params._id) {
    localStorage.setItem("mbt_" + route.params._id + route.params.name + '_id', JSON.stringify(route.params._id))
  }
  if (route.params.name) {
    localStorage.setItem("mbt_" + route.params.name + 'aw', JSON.stringify(route.params.name))
  }
  getAllTemplatesByCategory('codegen').then((rst: any) => {
    if (rst && _.isArray(rst)) {
      rst.forEach((rec: any) => {
        if(rec.model && rec.model.outputLanguage){
          if(rec.model.outputLanguage == 'yaml'){
            codegenTextName.value.push({ title: rec.name , const: rec._id})
          }else{
            codegenScriptName.value.push({ title: rec.name , const: rec._id})
          }
        }
      
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
  // 屏蔽浏览器自导ctrl+s 功能
  document.onkeydown = function (e :any) { 
	         e=window.event||e; 
           var key=e.keyCode;
             if(key== 83 && e.ctrlKey){
            	   /*延迟，兼容FF浏览器  */
            	    setTimeout(function(){        		  
            	   },1); 
                    return false;      
       		    }    
           };
  if (store.mbtData && store.mbtData.modelDefinition && store.mbtData.modelDefinition.cellsinfo && store.mbtData.modelDefinition.cellsinfo.cells) {
    rappid.graph.fromJSON(transformCells(JSON.parse(JSON.stringify(store.getAlldata))));
    // rappid.graph.fromJSON(JSON.parse(JSON.stringify(store.getAlldata.modelDefinition.cellsinfo)));
  }
  if (store.mbtData && store.mbtData.modelDefinition && store.mbtData.modelDefinition.hasOwnProperty("paperscale")) {
    rappid.paper.scale(store.mbtData.modelDefinition.paperscale);
  }
  rappid.graph.on("add", function (el: any) {
    fitAncestors(el)
    storeAw.resetEditingExpectedAw()
    storeAw.setData(el)
    if (el && el.hasOwnProperty("id")) {
      showpaper.value = true
      rightSchemaModal.value.handleShowData()
    }
  })
    rappid.paper.on('cell:pointerdown', (elementView: joint.dia.CellView) => {
      console.log(elementView.model);
      
      storeAw.setData(elementView.model)
      rightSchemaModal.value.handleShowData()
      showpaper.value = true
    })
    rappid.graph.on('remove' ,function(el: any){
      fitAncestors(el)
      showpaper.value = false
    })
       
    rappid.paper.on('blank:pointerdown', (evt: joint.dia.Event, x: number, y: number) => {
      showpaper.value = false
      rappid.selection.collection.reset([]);
      rappid.paperScroller.startPanning(evt);
      rappid.paper.removeTools();
    });
store.setRappid(rappid)
rappid.toolbarService.toolbar.on({
  'save:pointerclick': saveMbt.bind(this),
  'preview:pointerclick': preview.bind(this),
  'reload:pointerclick': reload.bind(this),
  'chooseTem:pointerclick': chooseTem.bind(this),
})
rappid.paper.on('blank:pointerdblclick' ,() => {
  isGlobal.value=true
})
if(rappid.graph.toJSON().cells.length > 0){
  preview(false)
}
})
watch (()=>storeAw.getifsaveMbt,(val:boolean)=>{
  if(val){
    saveMbt()
  }
})
// 离开路由时调用
onBeforeRouteLeave((to, form, next) => {  
    if (rappid.commandManager.undoStack.length > 0) {
      leaveRouter.value = true
    } else {
      leaveRouter.value = false
    }
  if(leaveRouter.value){
    Modal.confirm({
        icon: createVNode(ExclamationCircleOutlined),
        content: t("MBTStore.leaveRouter"),
        onOk() {
          return new Promise<void>((resolve, reject) => {
            next()
            resolve()
            
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {
          next(false)
        },
      });
  }else{
    next()
  }
})

// reload所有aw
async function awqueryByBatchIds(ids: string ,perPage:number) {

  let rst = await request.get("/api/hlfs?q=_id:" + ids,{params:{page:1,perPage:perPage}});
  if (rst.data) {
    return rst.data;
  }
}

async function reload(){
  await store.getMbtmodel(idstr)
  let sqlstr = ''
  let newProp: { _id: any; prop: any; cell: any; }[] = []
  if (store.getAlldata.modelDefinition.cellsinfo) {
    rappid.graph.getCells().forEach((item: any) => {
      if (item.attributes.type == "itea.mbt.test.MBTAW") {
        newProp.push({_id:item.id , prop:item.get('prop').custom , cell:item})
        if (item.get('prop').custom.step.data?._id) {
          sqlstr += item.get('prop').custom.step?.data?._id + '|'
        }
        if (item.get('prop').custom.expectation.data?._id) {
          sqlstr += item.get('prop').custom.step?.data?._id + '|'
        }
      }
    })
    
    sqlstr = sqlstr.slice(0, sqlstr.length - 1);
    let perPage = sqlstr.split('|')
    let awDatas = awqueryByBatchIds(sqlstr, perPage.length);
    awDatas.then((aws) => {
      const awById = _.groupBy(aws, "_id")
      newProp.forEach((obj: any) => {
      if (obj.prop.step?.data?._id) {
        if (awById[obj.prop.step?.data?._id]) {
          obj.prop.step.data = awById[obj.prop.step?.data?._id][0]
          obj.cell.prop('prop/custom/step' , obj.prop.step)
        }
        }
        if (obj.prop.expectation?.data?._id) {
        if (awById[obj.prop.expectation?.data?._id]) {
          obj.prop.step.data = awById[obj.prop.expectation?.data?._id][0]
          obj.cell.prop('prop/custom/expectation' , obj.prop?.expectation)
        }
      }
    })
    })
    
  }
}


const saveMbt = () => {
  store.setVersion('2.0')
  store.setGraph(rappid.paper.model.toJSON())  
  if (idstr) {
    request.put(`${realMBTUrl}/${idstr}`, store.getAlldata).then(() => {
      leaveRouter.value = false
      storeAw.setIfsaveMbt(false)
          return message.success('保存成功')
        }).catch(() => {
          return message.error('保存失败')
        })
  }
}

const visiblepreciew=ref(false)
const previewData: any = ref({})
let previewScript = ref("")
const softwrap=true
let searchPreview=reactive({
  mode:""
})
let outLang=ref()


async function querycode(show?:boolean){
  spinning.value = true
  request.get(`${realMBTUrl}/${route.params._id}/codegen`,{params:searchPreview}).then((rst)=>{
  if(rst && rst.results && rst.results.length > 0){
    outLang.value=rst.outputLang
    previewData.value = rst.results.map((item:any)=>{
      return {
        ...item.json,
        script: item.script || ''
      }
    })
    if(!show){
      visiblepreciew.value = false
    }else{
      visiblepreciew.value = true
    }
    
    store.showPreview(false)    
  }
  }).catch((err)=>{
    console.log(err);
    
    // 这里提示用户详细错误问题
    const errMsg = err.response.data
    showErrCard(errMsg)
  }).finally(() => spinning.value = false)
  
}
const preview=async (show?:boolean)=>{

    searchPreview.mode="all"
    await querycode(show)
  
  
}

const openPreview = (record:any, index: number)=>{
  previewScript.value = record.script
  const id = record.id + index
  if (expandRowKeys.value.includes(id)) {
    expandRowKeys.value = expandRowKeys.value.filter((a: any) => a !== id)
  } else expandRowKeys.value.push(id)
}

function handleChange(str: string, data: any) {
  switch (str) {
    case 'itea.mbt.test.MBTAW': {
      storeAw.getShowData?.setPropertiesData()
      break
    }
    case 'itea.mbt.test.MBTLink':
    case 'itea.mbt.test.link': {
      storeAw.getShowData?.setPropertiesData(data)
      break
    }
    case 'itea.mbt.test.MBTGroup': {
      storeAw.getShowData?.setPropertiesData(data)
      break
    }
    case 'itea.mbt.test.MBTSection': {
      storeAw.getShowData?.setPropertiesData(data)
      break
    }
  }
}
let startX: number;
let startWidth: number;
const scalable = ref<HTMLDivElement>();
const scalableLeft = ref<HTMLDivElement>();
const scalableN = ref<HTMLDivElement>();
let expandRowKeys = ref<any>([])
const onDrag = throttle(function (e: MouseEvent) {
  let w=window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;
  scalable.value && (scalable.value.style.width = `${w - e.clientX}px`);
  scalableN.value && (scalableN.value.style.width = `${w - e.clientX}px`);
  scalableLeft.value && (scalableLeft.value.style.width = `${startWidth + e.clientX - startX}px`);
  
}, 20);
  const startDrag = (e: MouseEvent) => {
    // debugger
    startX = e.clientX;
    scalableLeft.value && (startWidth = parseInt(window.getComputedStyle(scalableLeft.value).width, 10));
    document.documentElement.style.userSelect = 'none';
    document.documentElement.addEventListener('mousemove', onDrag);
    document.documentElement.addEventListener('mouseup', dragEnd);
  };
  const dragEnd = () => {
    document.documentElement.style.userSelect = 'unset';
    document.documentElement.removeEventListener('mousemove', onDrag);
    document.documentElement.removeEventListener('mouseup', dragEnd);
  };

// 工具栏

function closePreviewModal() {
  visiblepreciew.value = false
}

</script>

<template>
  <main class="joint-app joint-theme-modern" ref="apps">

    <div class="app-header">
      <div class="toolbar-container">

      </div>
    </div>
    <div class="app-body">
      <div  class="mbtScalable"  ref = "scalableLeft">
        <div calss="left">
          <div ref="stencils" class="stencil-container"/>
          <div class="paper-container"/>
        </div>

        <div ref="separator" class="mbtSeparator" @mousedown="startDrag"><i calss="mbtI"></i><i calss="mbtI"></i></div>
      </div>
      <div class="mbtRight"  ref = "scalable">
        <div class="AwtabInspector" v-show="showpaper">
          <ul class="tab_ul">
            <!-- <li v-if="!show">样式修改</li> -->
            <li
                v-if="true"
            >数据编辑</li>
            <div style="clear:both;"></div>
          </ul>
          <!-- <div v-show="!show && !showGroup && !showSection && !showLink" class="inspector-container"></div> -->
          <div class="dataStyle">
            <mbt-modeler-right-modal ref="rightSchemaModal" @change="handleChange"></mbt-modeler-right-modal>
          </div>
        </div>
        <div class="navigator-container" ref = "scalableN"/>
      </div>

    </div>


  </main>

  <mbt-preview-modal
      :visible="visiblepreciew"
      @closeModal="closePreviewModal"
      :preview-data="previewData"
      :out-lang="outLang"
  ></mbt-preview-modal>
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
                      @change = 'attrsChange'
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
                <template-table
                  v-if="templateRadiovalue === 1"
                  :tableColumns="tableColumnsDynamic"
                  :templateCategory="templateCategory"
                  :tableData="tableDataDynamic"
                  
                ></template-table>
                <!-- --********---{{tableData}}**
                  ++++{{tableColumns}}########                   -->
          
                  <template-table
                  v-if="templateRadiovalue === 2"
                  :tableColumns="tableColumns"
                  :templateCategory="templateCategory"
                  :tableData="tableData"
                  
                ></template-table>
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
                            v-model:value="resourceseditableData[record.key][column.dataIndex as keyof typeof stringLiteral]"
                            @pressEnter="resourcessave(record.key)"
                          />
                          <!-- <check-outlined
                            class="editable-cell-icon-check"
                            @click="resourcessave(record.key)"
                          /> -->
                        </div>
                        <div v-else class="editable-cell-text-wrapper">
                          {{ text || " " }}
                          <!-- <edit-outlined
                            class="editable-cell-icon"
                            @click="resourcesedit(record.key)"
                          /> -->
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
                <!-- <a-button type="primary" @click="globalhandlerSubmit">{{
                  $t("common.saveText")
                }}</a-button> -->
              </a-tab-pane>
            </a-tabs>
  </div>
</a-modal>
</template>

<style lang="scss" >
@import "../../node_modules/@clientio/rappid/rappid.css";
@import '../composables/css/style.css';
@import "../assets/fonts/iconfont.css";

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

      .previewclass .ant-table-tbody > tr > td{
  padding: 0px;
}
.previewModel{
  height: 50vw;
  .ant-modal-content{
    height: 100%;
    .ant-modal-body{
      overflow: auto;
      height: calc(100% - 55px);
      .ace-result{
      flex: 1;
      font-size: 18px;
      border: 1px solid;
      height: 72%;
      width:31.25rem
}
    }
  }
}


.AwtabInspector{
    display: flex;
    flex-direction: column;
    top: 0;
    right: 0;
    bottom: 120px;
    width: 100%;
    box-sizing: border-box;
    height: -moz-calc(100% - 120px);
    height: -webkit-calc(100% - 120px);
    height: calc(100% - 120px);
    .dataStyle{
    top: 50px;
    display: block;
    flex: 1;
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
