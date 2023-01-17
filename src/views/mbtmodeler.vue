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
import { ExclamationCircleOutlined} from '@ant-design/icons-vue'
import { Stores } from "../../types/stores";
import joint from "../../node_modules/@clientio/rappid/rappid.js"
import { computed, watch, onMounted, reactive, Ref, ref, UnwrapRef, createVNode, provide, toRaw } from 'vue';
import { useI18n } from 'vue-i18n'
import { cloneDeep, concat, map, sortedIndex } from "lodash";
import {onBeforeRouteLeave, useRoute , useRouter} from 'vue-router'
import request from "@/utils/request";
import { realMBTUrl ,awModelUrl} from "@/appConfig";
import {getTemplate, getAllTemplatesByCategory, IColumn, IJSONSchema,} from "@/api/mbt/index";
import _ from "lodash";
import { MBTStore } from "@/stores/MBTModel"
import { MbtData } from '@/stores/modules/mbt-data'
import { RouteInfo } from "@/stores/modules/route"
import { errTipTool } from '@/stores/modules/modeler-preview-err-msg'
import {showErrCard ,CodegenErr , setErrData} from "@/views/componentTS/mbt-modeler-preview-err-tip";
import MbtModelerRightModal from "@/views/mbt-modeler-right-modal.vue";
import { message, Modal } from "ant-design-vue";
import "./componentTS/ace-config";
import { throttle } from "lodash-es";
import { fitAncestors,isValidKey } from "@/utils/jointFun"
import MbtPreviewModal from "@/views/mbt-preview-modal.vue";
import { VAceEditor } from 'vue3-ace-editor';
import Preview from "ant-design-vue/lib/vc-image/src/Preview";
import {exportFile, getExcelData} from "@/utils/fileAction";
import {UploadChangeParam} from "ant-design-vue";
import {Rule} from "ant-design-vue/es/form";
import MbtModelerTemplateSetting from "@/views/mbt-modeler-template-setting.vue";



const store = MBTStore()
const storeAw = MbtData()
const storePre = errTipTool()
const storeRoute = RouteInfo()
const { t } = useI18n()
const route = useRoute()
const router = useRouter()
let rappid : MbtServe
let apps : HTMLElement | any= ref()
let isGlobal = ref(false)
let leaveRouter = ref(false)
let spinning = ref<boolean>(false)
const activeKey = ref("1")
const isFormVisible = ref(false);
const toolbarDom = ref()
localStorage.setItem("mbt_" + route.params._id + route.params.name + '_id', JSON.stringify(route.params._id))
localStorage.setItem("mbt_" + route.params.name + 'aw', JSON.stringify(route.params.name))
// Aw组件的数据
let rightSchemaModal = ref()
let showpaper =ref(false)
const templateRadiovalue = ref<number>(1);

// 选择模板的函数
const chooseTem = () => {
    isGlobal.value = true
}

function closeTemplateModel() {
  activeKey.value = '1'
  isGlobal.value = false
}

// 依据uiSchema更新data数据
function newData(aw: any, data?: any) {
  // debugger
  let newdata:any = {}
  if (_.isEmpty(aw)) {
    newdata = {}
  } else {
    if(!data){
      newdata = {}
    }else{
      if (aw.params && aw.params.length > 0) {
      let paramsName = _.map(aw.params, 'name');
      let dataKey = Object.keys(data)      
      newdata = _.pick(data, _.intersection(paramsName, dataKey))
    }
    if (!_.isEmpty(newdata)) {
      for (let key in newdata) {
        if (isValidKey(key, newdata)) {
          if(_.isObject(newdata[key])){
            newdata
          }else{
            newdata[key] = {val: data[key] , type:'2'}
          }
        }
      }
    }
    Object.assign(newdata , {_id:data._id})
    }
    
    
  }
  return newdata
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
          cell = { ...cell , prop:getProperty(cell , mbtData)}
        }
        
      }
      cell=  {...cell,type:getShapeTypeMapping(cell.type)};
    }   
      
    // delete cell.attrs;
    //  Object.keys(cell.attrs).filter(k => k.startsWith(".")).forEach(k => delete cell.attrs[k])
    return cell

   })
   console.log(cells);
   
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
        Object.assign(prop.custom,{step : {aw:awprop.aw, data:newData(awprop.aw,awprop.data),uiParams:storeAw.handleSchema(awprop.aw, 'primary').uiSchema}})
    } else {
      message.error('当前Aw节点无数据,请reload')
      Object.assign(prop.custom,{step : {aw:{}, data:awprop.data,uiParams:{}}})
      }
    }
  if(mbtData.modelDefinition.props[cell.id]?.props?.hasOwnProperty('expectedprops')){
    let awprop = mbtData.modelDefinition.props[cell.id].props.expectedprops;
    
    awprop.schema.description = awprop.aw?.description || awprop.data?.description || awprop.schema.description
    if (awprop.aw) {
      Object.assign(prop.custom, { expectation: { aw: awprop?.aw, data: newData(awprop.aw, awprop.data), uiParams:storeAw.handleSchema(awprop.aw, 'expected').uiSchema} })
    }else{
      message.error('当前Aw节点无数据,请reload')
      Object.assign(prop.custom, { expectation: { aw: {}, data: awprop.data, uiParams:{} } })
    }
    
     }
   return prop
  } 

async function query(){
  idstr = JSON.parse(localStorage.getItem("mbt_" + route.params._id + route.params.name + '_id')!)
  let rst = await request.get(`${realMBTUrl}/${idstr}`)
  return rst
}

onMounted(async () => {
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
  query().then((res:any) => {
    store.setMbtData(res)
    if (store.mbtData && store.mbtData.modelDefinition && store.mbtData.modelDefinition.cellsinfo && store.mbtData.modelDefinition.cellsinfo.cells) {
    rappid.graph.fromJSON(transformCells(JSON.parse(JSON.stringify(store.getAlldata))));
    }
    if (store.mbtData && store.mbtData.modelDefinition && store.mbtData.modelDefinition.hasOwnProperty("paperscale")) {
      rappid.paper.scale(store.mbtData.modelDefinition.paperscale);
    }
    if (store.mbtData._id) {
    storeAw.setAllData(store.mbtData)
  }
  })

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
      'closeMbt:pointerclick' : close.bind(this)
    })
    rappid.paper.on('blank:pointerdblclick' ,() => {
      isGlobal.value=true
    })
    toolbarDom.value.firstChild.lastChild.style.display = 'none'
    if(storeRoute.getIsEmbedded){
      storeAw.setUpdateAw(true)
      toolbarDom.value.firstChild.lastChild.style.display = 'block'
  }
})

provide('activeKey',activeKey)
watch (()=>storeAw.getifsaveMbt,(val:boolean)=>{
  if(val){
    saveMbt()
  }
})
watch(() => storePre.getCheck ,(newval: boolean) => {
    if(newval){
      let index = storePre.getIndex
        checkChange(newval,storePre.getErrList[index]?.err)
    }
})
watch(() => store.getChooseDataPool, (val: boolean) => {
  if (val) {
    isGlobal.value = true
    activeKey.value = "3" ,
    templateRadiovalue.value = 1
  }
})
let vaceErr = ref()
let previewErr = ref(false)
let errOutLang = ref()
let jsonData = ref()


function checkChange(check:boolean,str:any) {
  storePre.setCheck(false)
    switch (str) {
      case 'no_data': {
        isGlobal.value = true ,
        activeKey.value = "3" ,
        templateRadiovalue.value = 1
        break
      }
      case 'no_meta':{
        isGlobal.value = true ,
        activeKey.value = "2"
        break
      }
      case 'no_templates_define': {
        isGlobal.value = true ,
        activeKey.value = "1"
        break
      }
      case 'textErr': {
        if(storePre.getErrmsg){
          vaceErr.value = CodegenErr(storePre.getErrmsg,'textErr').vaceErr
          errOutLang.value = CodegenErr(storePre.getErrmsg,'textErr').outputLang
          jsonData.value = JSON.stringify(toRaw(CodegenErr(storePre.getErrmsg, 'textErr').currentData) , null,2)
          console.log(jsonData.value);

          previewErr.value = true
        }
        break
      }
      case 'scriptErr': {
        if(storePre.getErrmsg){
          vaceErr.value = CodegenErr(storePre.getErrmsg,'scriptErr').vaceErr
          errOutLang.value = CodegenErr(storePre.getErrmsg,'scriptErr').outputLang
          jsonData.value = JSON.stringify(toRaw(CodegenErr(storePre.getErrmsg, 'scriptErr').currentData), null ,2)
          console.log(jsonData.value);
          previewErr.value = true
          }
        break
      }
      case 'not_start_end': {
        if (storePre.getErrmsg) {
          storePre.getErrmsg[str].forEach((cellIdArr: Array<Array<string>>) => {
            cellIdArr.forEach((cellId: any) => {
              rappid.graph.getCell(cellId).findView(rappid.paper).highlight()
              setTimeout(() =>{
                rappid.graph.getCell(cellId).findView(rappid.paper).unhighlight()
              } ,5000)
            });

          })
        }
        break
      }
    }
  }
// 离开路由时调用
onBeforeRouteLeave((to, form, next) => {  
    leaveRouter.value = rappid.commandManager.undoStack.length > 0;
  if(leaveRouter.value){
    Modal.confirm({
        icon: createVNode(ExclamationCircleOutlined),
        content: t("MBTStore.leaveRouter"),
        onOk() {
          return new Promise<void>((resolve, reject) => {
            next()
            resolve()
            storePre.setVisible(false)
          }).catch(() => console.log('Oops errors!'));
        },
        onCancel() {
          next(false)
        },
      });
  }else{
    next()
    storePre.setVisible(false)
  }
})

// 退出当前路由
function close() {
  router.push('/mbtstore')
}

// reload所有aw
async function awqueryByBatchIds(ids: string ,perPage:number) {
  let rst = await request.get("/api/hlfs?q=_id:" + ids,{params:{page:1,perPage:perPage}});
  if (rst.data) {
    return rst.data;
  }
}

async function awQueryByPath(name:string ,path:string){
  let rst = await request.get('/api/hlfs' , {params:{search:`@name:"${name}",@path:"${path}"`,page:1,perPage:10}})
  if(rst.data){
    return rst.data
  }
}


function reload(){
  let sqlstr = ''
  let pathArr: any = []
  let newProp: { _id: any; prop: any; cell: any; }[] = []
  let pathNameData:any = []
  if (store.getAlldata.modelDefinition.cellsinfo) {
    rappid.graph.getCells().forEach((item: any) => {
      if (item.attributes.type == "itea.mbt.test.MBTAW") {
        newProp.push({_id:item.id , prop:item.get('prop').custom , cell:item})
        if (item.get('prop').custom?.step.data?._id || item.get('prop').custom?.step?.aw?._id) {
          sqlstr += item.get('prop').custom.step?.data?._id + '|' || item.get('prop').custom?.step?.aw?._id
        }
        if(item.get('prop').custom?.step?.aw || item.get('prop').custom?.step.data){
          let aw = item.get('prop').custom?.step?.aw || item.get('prop').custom?.step.data
            pathNameData.push(awQueryByPath(aw.name, aw.path))
        }
        if (item.get('prop').custom?.expectation.data?._id || item.get('prop').custom?.expectation?.aw?._id) {
          sqlstr += item.get('prop').custom?.step?.data?._id + '|' || item.get('prop').custom?.expectation?.aw._id + '|'
        }
        if(item.get('prop').custom?.expectation?.aw || item.get('prop').custom?.expectation?.data){
          let aw = item.get('prop').custom?.expectation?.aw || item.get('prop').custom?.expectation.data
            pathNameData.push(awQueryByPath(aw.name, aw.path))
        }
        if (item.get('prop').custom.expectation.aw) {
          pathArr.push({name:item.get('prop').custom.expectation.aw.name , path:item.get('prop').custom.expectation.aw.path})
        }
      }
    })
    
    sqlstr = sqlstr.slice(0, sqlstr.length - 1);
    let perPage = sqlstr.split('|')
    let awDatas = awqueryByBatchIds(sqlstr, perPage.length)
    awDatas.then((aws) => {
      let awById :any
      if(perPage == aws.length){
        awById = _.groupBy(aws, "_id")
        newProp.forEach((obj: any) => {
          if (obj.prop.step?.data?._id) {
            if (awById[obj.prop.step?.data?._id]) {
              obj.prop.step.aw = awById[obj.prop.step?.data?._id][0]
              obj.prop.step.uiParams = storeAw.handleSchema(awById[obj.prop.step?.data?._id][0], 'primary')
              obj.prop.step.data = newData(obj.prop.step.aw , obj.prop.step.data)
              storeAw.setEditingPrimaryAw(obj.prop.step.aw , 'aw')
              storeAw.setEditingPrimaryAw(obj.prop.step.data , 'data')
              storeAw.setEditingPrimaryAw(obj.prop.step.uiParams , 'uiParams')
              obj.cell.prop('prop/custom/step' , obj.prop.step)
            }
            }
            if (obj.prop.expectation?.data?._id) {
            if (awById[obj.prop.expectation?.data?._id]) {
              obj.prop.expectation.aw = awById[obj.prop.expectation?.data?._id][0]
              obj.prop.expectation.uiParams = storeAw.handleSchema(awById[obj.prop.expectation?.data?._id][0], 'expected')
              obj.prop.expectation.data = newData(obj.prop.expectation.aw , obj.prop.expectation.data)
              storeAw.setEditingPrimaryAw(obj.prop.expectation.aw , 'aw')
              storeAw.setEditingPrimaryAw(obj.prop.expectation.data , 'data')
              storeAw.setEditingPrimaryAw(obj.prop.expectation.uiParams , 'uiParams')
              obj.cell.prop('prop/custom/expectation' , obj.prop?.expectation)
            }
          }
          storeAw.setData(obj.cell)
          obj.cell.setPropertiesData()
        })
      }else{
        Promise.all(pathNameData).then((res: any)=>{
          let removeById = _.uniqBy([].concat(...res) , '_id')
          awById = _.groupBy(removeById, '_id')
          newProp.forEach((obj: any) => {
            if (obj.prop.step?.data?._id) {
              if (awById[obj.prop.step?.data?._id]) {
                obj.prop.step.aw = awById[obj.prop.step?.data?._id][0]
                obj.prop.step.uiParams = storeAw.handleSchema(awById[obj.prop.step?.data?._id][0], 'primary')
                obj.prop.step.data = newData(obj.prop.step.aw , obj.prop.step.data)
                storeAw.setEditingPrimaryAw(obj.prop.step.aw , 'aw')
                storeAw.setEditingPrimaryAw(obj.prop.step.data , 'data')
                storeAw.setEditingPrimaryAw(obj.prop.step.uiParams , 'uiParams')
                obj.cell.prop('prop/custom/step' , obj.prop.step)
              }
              }
              if (obj.prop.expectation?.data?._id) {
              if (awById[obj.prop.expectation?.data?._id]) {
                obj.prop.expectation.aw = awById[obj.prop.expectation?.data?._id][0]
                obj.prop.expectation.uiParams = storeAw.handleSchema(awById[obj.prop.expectation?.data?._id][0], 'expected')
                obj.prop.expectation.data = newData(obj.prop.expectation.aw , obj.prop.expectation.data)
                storeAw.setEditingPrimaryAw(obj.prop.expectation.aw , 'aw')
                storeAw.setEditingPrimaryAw(obj.prop.expectation.data , 'data')
                storeAw.setEditingPrimaryAw(obj.prop.expectation.uiParams , 'uiParams')
                obj.cell.prop('prop/custom/expectation' , obj.prop?.expectation)
              }
            }
            storeAw.setData(obj.cell)
            obj.cell.setPropertiesData()
          })
          }).catch(() =>{})
      }
      message.success(t("MBTStore.reloadTip"));
    }).catch(()=>{})


    
  }
}


const saveMbt = () => {
  store.setVersion('2.0')
  store.setGraph(rappid.paper.model.toJSON())  
  rappid.commandManager.undoStack.length = 0
  if (idstr) {
    request.put(`${realMBTUrl}/${idstr}`, store.getAlldata).then(() => {
      leaveRouter.value = false
      storeAw.setIfsaveMbt(false)
          return message.success(t('common.saveSuccess'))
        }).catch(() => {
          return message.error(t('common.saveError'))
        })
  }
}

const visiblepreciew=ref(false)
const previewData: any = ref({})
let searchPreview=reactive({
  mode:""
})
let outLang=ref()


async function querycode(show?: boolean) {
  spinning.value = !!show
  request.get(`${realMBTUrl}/${route.params._id}/codegen`,{params:searchPreview}).then((rst)=>{
  if(rst && rst.results && rst.results.length > 0){
    outLang.value=rst.outputLang
    previewData.value = rst.results.map((item:any)=>{
      return {
        ...item.json,
        script: item.script || ''
      }
    })
    if (!show) {
      visiblepreciew.value = false
    } else {
      visiblepreciew.value = true
    }
    
    store.showPreview(false)    
  }
  }).catch((err)=>{
    // 这里提示用户详细错误问题
    const errMsg = err.response.data
    console.log(errMsg);

    setErrData(errMsg)
    if (storePre.getErrmsg) {
      showErrCard(errMsg)
    }
    message.error(t('common.previewError'))
  }).finally(() => spinning.value = false)
  
}
const preview=async (show?:boolean)=>{
    if(rappid.commandManager.undoStack.length > 0){
      message.warn("当前模型未保存")
      return
    }
    searchPreview.mode="all"
    await querycode(show)
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
let data = ref()
let style = ref()

const inspector = (n:number) =>{
  if(n == 1){
    data.value.style.display = 'none'
    style.value.style.display = 'block'
  }else{
    data.value.style.display = 'block'
    style.value.style.display = 'none'
  }
}

</script>

<template >
  <a-spin class="loading-wrap" :tip="$t('common.previewLoad')" :spinning="spinning"></a-spin>
  <main class="joint-app joint-theme-modern" ref="apps" :class="spinning ? 'show-spin' : 'hide-spin'">

    <div class="app-header">
      <div class="toolbar-container" ref="toolbarDom">

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
            <li @click="inspector(1)">样式修改</li>
            <li
                v-if="true"
                @click="inspector(2)"
            >数据编辑</li>
            <div style="clear:both;"></div>
          </ul>
          <div ref="style" class="inspector-container"></div>
          <div ref="data" class="dataStyle" style="display:none">
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
  <mbt-modeler-template-setting :show="isGlobal" @close="closeTemplateModel"></mbt-modeler-template-setting>
<a-modal  :width="950" v-model:visible = 'previewErr' :footer="null" :keyboard="true" centered>
  <a-row class="previewErr">
    <a-col :span="12">
      <VAceEditor
      class="currentData"
        v-model:value="jsonData"
        lang="json"
        theme="sqlserver"
        :options="{ useWorker: true }"
      >
      </VAceEditor>
    </a-col>
    <a-col :span="10" style=" margin-left: 10px;">
        <VAceEditor
        v-model:value="vaceErr"
        class="aceErr-results"
        :lang="errOutLang"
        :wrap="true"
        :readonly="true"
        theme="sqlserver"
        :options="{ useWorker: true }"
        ></VAceEditor>
    </a-col>
  </a-row>
  <!-- preview错误信息 -->

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
        margin-bottom: 0;
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
  height: 40vw;
  .ant-modal-content{
    height: 100%;
    .ant-modal-body{
      height: 90%;
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

.mbt-modeler-btn-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 12px;
  display: flex;
  width: 100%;
  justify-content: end;
  .ant-btn {
    margin-right: 8px;
  }
}

.joint-navigator{
  width: 330px;
}


</style>
