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
import { SmileOutlined, SearchOutlined } from '@ant-design/icons-vue';
import { Stores } from '../../types/stores'
import $, { param } from "jquery";
import { red, volcano, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey } from '@ant-design/colors';
import VueForm from '@lljj/vue3-form-ant';
import { tableSearch, FormState, paramsobj, ModelState, statesTs } from "./componentTS/awmodeler";
import _ from "lodash";
import { mockMBTUrl, realMBTUrl } from '@/appConfig';
import { Context } from "vm";
import { useCurrentElement } from "@vueuse/core";

import { computed, defineComponent, } from 'vue';

import { CheckOutlined, EditOutlined } from '@ant-design/icons-vue';
import { cloneDeep } from 'lodash-es';
import { stringLiteral } from "@babel/types";
import { array } from "vue-types";

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
let ev_id = '';
/** drawer  */
//drawer visible
const visible = ref(false);
const showDrawer = (el?: any) => {
  visible.value = true;
  if (el && _.isObject(el) && el.hasOwnProperty('path')) {
    // console.log('click link ')
  } else if (el && _.isObject(el)) {
    // console.log('click element')
  } else if (el == 'aw') {
    //show aw
    isAW.value = true;
    awquery();
   
  }
  else {
    // console.log('click blank')
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
// const colSpan = ref('10');
const columns = reactive<Object[]>(
  [
  {
    name: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
    },
    {
      title: 'template',
      dataIndex: 'template',
      key:'template'
    },
    {
      title: 'tags',
      dataIndex: 'tags',
      key:'tags'
    }
    // {
    //   name: 'Name',
    //   dataIndex: 'name',
    //   key: 'name',
    //   width: '150px'
    // },
    // {
    //   title: 'description',
    //   dataIndex: 'description',
    //   key: 'description',
    //   width: '150px'
    // }
  ]);


async function awqueryById(id: string) {
  let rst = await request.get("/api/hlfs/" + id)
  if (rst.data) {
    console.log('rst:', rst.data)
    return rst.data
  }
}
async function awquery(data?: any) {
  let rst = await request.get("/api/hlfs", { params: data || searchobj })
  if (rst.data) {
    // console.log('rst:',rst.data)
    pagination.value.total = rst.total
    tableData.value = rst.data
    // console.log(tableData, tableData.value);
    return rst.data
  }
}

function onShow(cell?: any) {
  showPropPanel.value = true;
}


// 分页的数据
let pagination = ref({
  pageNo: 1,
  pageSize: 5, // 默认每页显示数量
  showQuickJumper: true,
  showSizeChanger: true, // 显示可改变每页数量
  pageSizeOptions: ['5','10', '20', '50', '100'], // 每页数量选项
  showTotal: (total: any) => `共 ${total} 条`, // 显示总数
  onShowSizeChange: (current: any, pageSize: any) => onSizeChange(current, pageSize), // 改变每页数量时更新显示
  onChange: (page: any, pageSize: any) => onPageChange(page, pageSize),//点击页码事件
  total: 0 //总条数
})

const onPageChange = async (page: number, pageSize: any) => {
  pagination.value.pageNo = page
  pagination.value.pageSize = pageSize
  searchobj.page = page
  searchobj.perPage = pageSize
  if (formState.search) {
    searchobj.search = formState.search
  } else {
    searchobj.search = ''
  }
  await awquery()
}
const onSizeChange = async (current: any, pageSize: number) => {
  pagination.value.pageNo = current
  pagination.value.pageSize = pageSize
  searchobj.page = current
  searchobj.perPage = pageSize
  if (formState.search) {
    searchobj.search = formState.search
  } else {
    searchobj.search = ''
  }
  await awquery()
}

const handleFinish: FormProps['onFinish'] = (values: any) => {
  awquery(formState)
  pagination.value.pageNo = 1
  onShow();
};
const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => {
  console.log(errors);
};


/**
 * Panel --Json schema forms
 */

let globalformData = ref<Stores.mbtView>({
  _id: '',
  name: '',
  description: ''
  ,
  tags: ''

});
let linkData = ref({
  label: ''
})
let awformdata = ref<Stores.awView>({
  _id: '',
  name: '',
  description: '',
  params: ''
  , tags: ''
});
const globalschema = ref({
  // "title": "MBTConfiguration",
  // "description": "Configuration for the MBT",
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
      "readOnly": true
    },
    // // "requirements":{
    // //   "title":"Requirements",
    // //   "type":"string",


    // }

  }
})
const awschema = ref({
  "title": "AW",
  "description": "Configuration for the AW",
  "type": "object",
  "properties": {
    "_id": {
      "type": "string"
    },
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
let currentElementView: dia.ElementView;
let currentLinkView: dia.LinkView;

function awhandlerSubmit() {


  // 迭代 Map 中的 key
  for (let key of currentElementMap.keys()) {

    let tempaw = {}
    for (const [key, value] of Object.entries(awformdata.value)) {
      let obj = JSON.parse(`{"${key}":"${value}"}`)
      Object.assign(tempaw, obj)
      if (key == "template" || key == "description") {

        // let tempWidth =currentElementView.model!.findView(modeler.paper).getBBox().width / 8;
        // if(tempWidth<100) tempWidth =100;
        // console.log('tempWidth1:',tempWidth);
        // console.log('size x:',sizeX)
        // currentElementView.model?.resize(sizeX, 45)
        let showtext = cacheprops.get(ev_id).props.template || cacheprops.get(ev_id).props.description

        let sizeX = showtext.length * 2.5;
        if (sizeX < 100 || sizeX > 150) sizeX = 160;
        let sizeY = cacheprops.get(ev_id).props.description.length * 2.5;
        if (sizeY < 45) sizeY = 45;
        if (sizeY > 135) sizeY = 180;

        // currentElementView.model?.attr(
        //   "label/text",
        //   joint.util.breakText(showtext, {
        //     width: sizeX
        //   }, { ellipsis: true }))
        // currentElementView.model?.resize(sizeX, sizeY);
        modeler.graph.getCell(ev_id + '').resize(sizeX, sizeY);
        modeler.graph.getCell(ev_id + '').attr(
          "label/text", joint.util.breakText(showtext, {
            width: sizeX
          }, { ellipsis: true }))
        // currentElementView.model?.attr('label/text',`"${value}"`)

      }
    }
    cacheprops.set(key, { 'props': tempaw });
  }

  onCloseDrawer();
  message.success('Save aw Successfully');


};

function globalhandlerSubmit() {

  message.success('Save config Successfully');
};

function linkhandlerSubmit() {

  for (let key of currentLinkMap.keys()) {
    let templink = {}
    for (const [key, value] of Object.entries(linkData.value)) {
      let obj = JSON.parse(`{"${key}":"${value}"}`)
      Object.assign(templink, obj)
      if (key == "label") {

        currentLinkView.model?.appendLabel({
          attrs: {
            text: {
              text: `${value}`
            }
          }
        })


      }
    }

    cacheprops.set(key, { 'props': templink });
  }
  message.success('Save it Successfully');
};

function handlerCancel() {
  awquery()
  hasAWInfo.value = false;
};


/**
 * Global https://mbt-dev.oppo.itealab.net/api/test-models?search=
 */
let mbtCache: any;//save the data from backend Stores.mbt
//route是响应式对象，可监控其变化，需要用useRoute()获取


const route = useRoute()

let toReload = ref(false);
/**
 * 
 * @param id 
 * @param reload 
 * _id for mbt, the response is an object
 * Without id, the response is an array of object
 * If reload is true, it will fetch AW info from backend
 */
async function mbtquery(id?: any, reLoad?: boolean) {

  let rst;
  let idstr = '';
  if (id && reLoad == true) {
    toReload.value = true;
    cacheprops.clear()
    rst = await request.get(url + "/" + id).then(response => {
      if (response && response.name == route.params.name) {
        idstr = response._id + '';
        if (response.modelDefinition && response.modelDefinition.props) {
          const propsMap = new Map(Object.entries(JSON.parse(JSON.stringify(response.modelDefinition.props))))
          let cells = response.modelDefinition.cellsinfo.cells
          cacheprops = propsMap;
          propsMap.forEach((val: any, key: any) => {
            //Only element has name, link doesn't have it
            if (val.props.hasOwnProperty('name') && val.props.hasOwnProperty('_id')) {
              console.log(key);//element id in the paper of modeler
              //Get the latest AW from backend one by one
              awqueryById(val.props._id).then((awresponse: Stores.aw) => {
                let tempparams = ''
                if (_.isArray(awresponse.params)) {
                  _.forEach(awresponse.params, function (value: any, key) {
                    tempparams += value.name + ' '

                  })
                }
                //Update aw info and save them to cacheprops
                cacheprops.set(key, {
                  "props": {
                    "name": awresponse.name,
                    "_id": awresponse._id,
                    "description": awresponse.description,
                    "template": awresponse.template,
                    "params": tempparams
                  }
                })

                // if type == standard.Rectangle replace attrs label text by id which is the key 
                cells.forEach(cell => {
                  if (cell.type == 'standard.Rectangle' && cell.id == key) {
                    cell.attrs!.label.text = cacheprops.get(key)['props']['template'] || cacheprops.get(key)['props']['description']
                  }
                })

              }).catch(err => {
                console.log(err)
              })
            }
          })
          console.log('refresh aw from backend and save them to cache,', cacheprops);
        }
        mbtCache = response;//should work on here
        localStorage.setItem('mbt_' + route.params.name + '_id', idstr)
        localStorage.setItem('mbt_' + route.params.name, JSON.stringify(response._id))
        return mbtCache
      }
    }

    ).catch(err => console.log(err))


    console.log('id query:', id, rst)


  } else if (id) {
    rst = await request.get(url + "/" + id)
    console.log('id query:', id, rst)
    if (rst && rst.name == route.params.name) {
      let str = rst._id + '';

      mbtCache = rst;
      localStorage.setItem('mbt_' + route.params.name + '_id', str)
      localStorage.setItem('mbt_' + route.params.name, JSON.stringify(rst._id))


    }

  }
  else {
    rst = await request.get(url + "?search=" + route.params.name)
    console.log('name query:', route.params.name)
    if (rst.data) {

      rst.data.forEach((record: any) => {
        if (record.name == route.params.name) {
          mbtCache = record
          localStorage.setItem('mbt_' + route.params.name + '_id', record._id)
          localStorage.setItem('mbt_' + route.params.name, JSON.stringify(record))
        }
      })
    }
    // console.log('mbtCache:', mbtCache)
    // tableData.value = rst.data
    // console.log(tableData, tableData.value);

  }
  return mbtCache

}
// save data in the paper as map, {cid:1,elementview: ev,properties:prop} 
let currentElementMap = new Map();
let currentLinkMap = new Map();

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

  let tempdata: modelDefinition = {};

  let oldgraphData = modeler.graph.toJSON();
  console.log(oldgraphData);
  let graphIds: string[] = [];//Save ids for all elements,links,etc on the paper. If cacheprops don't find it, remove from cacheprops.
  debugger
  oldgraphData.cells.forEach((item: any) => {
    graphIds.push(item.id);
    if (item.type == 'standard.Rectangle') {
      //if label in the element is different with cacheprops, correct it as same as cacheprops
      item.attrs.label.text = cacheprops.get(item.id)
    }
    console.log(oldgraphData);

  })
  /*删除找不到的*/
  cacheprops.forEach((aw: any) => {
    if (graphIds.find((id: string) => id == aw.id) == 'undefined') {
      cacheprops.delete(aw)

    }
  })

  //   modeler.graph!.model.attributes.cells.models
  // .find(item=>{ if(item.id=='b3b8f2df-1f81-401b-8cf2-886f9d94056e') item.attributes.attrs.label.text='开始播放5s'}


  Object.assign(tempdata, { cellsinfo: modeler.graph.toJSON() })
  //todo : create cacheprops, when dblclick element or link, save them to cach props

  let obj = Object.fromEntries(cacheprops)

  Object.assign(tempdata, { props: obj })

  mbtCache['modelDefinition'] = tempdata;
  // localStorage.setItem('mbt-' + route.params.name, JSON.stringify(tempdata));
  // localStorage.setItem('mbt-' + route.params.name, JSON.stringify(modeler.graph.toJSON()));
  // console.log('mbtCache.values  ,', mbtCache)
  updateMBT(url + `/${mbtCache['_id']}`, mbtCache)
  message.success("Save MBT model successfully")

}


function reloadMBT(route: any) {

  let res;
  let mbtId = localStorage.getItem('mbt_' + route.params.name + '_id') + '';
  console.log('mbtId:', mbtId)
  if (mbtId.length > 0) {
    console.log('mbtid > 0')
    res = mbtquery(mbtId, true);
  }
  else {
    console.log('query again by name')
    res = mbtquery();
  }
  res.then((value: any) => {
    console.log('res:', value)
    debugger
    if (value.hasOwnProperty('modelDefinition') && value.modelDefinition.hasOwnProperty('cellsinfo')) {
      let tempstr = JSON.stringify(value.modelDefinition.cellsinfo);
      modeler.graph.fromJSON(JSON.parse(tempstr));
      if (value.modelDefinition.hasOwnProperty('props')) {

        const map = new Map(Object.entries(JSON.parse(JSON.stringify(value.modelDefinition.props))))
        cacheprops = map;
        // console.log('after:',cacheprops)
      }
    }
  })

  let tempdata: modelDefinition = {};

  let oldgraphData = modeler.graph.toJSON();
  console.log(oldgraphData);
  let graphIds: string[] = [];//Save ids for all elements,links,etc on the paper. If cacheprops don't find it, remove from cacheprops.
  debugger
  oldgraphData.cells.forEach((item: any) => {
    graphIds.push(item.id);
    if (item.type == 'standard.Rectangle') {
      //if label in the element is different with cacheprops, correct it as same as cacheprops
      item.attrs.label.text = cacheprops.get(item.id)
    }


  })
  console.log(oldgraphData);
  /*删除找不到的*/
  cacheprops.forEach((aw: any) => {
    if (graphIds.find((id: string) => id == aw.id) == 'undefined') {
      cacheprops.delete(aw)

    }
  })

  //   modeler.graph!.model.attributes.cells.models
  // .find(item=>{ if(item.id=='b3b8f2df-1f81-401b-8cf2-886f9d94056e') item.attributes.attrs.label.text='开始播放5s'}


  Object.assign(tempdata, { cellsinfo: modeler.graph.toJSON() })
  //todo : create cacheprops, when dblclick element or link, save them to cach props

  let obj = Object.fromEntries(cacheprops)

  Object.assign(tempdata, { props: obj })

  mbtCache['modelDefinition'] = tempdata;
  // localStorage.setItem('mbt-' + route.params.name, JSON.stringify(tempdata));
  // localStorage.setItem('mbt-' + route.params.name, JSON.stringify(modeler.graph.toJSON()));
  // console.log('mbtCache.values  ,', mbtCache)
  updateMBT(url + `/${mbtCache['_id']}`, mbtCache)
  message.success("MBT model reloaded")

}

/**
 * Localstorage saving the data of this model
 */




onMounted(() => {
  stencil = new Stencil(stencilcanvas);
  modeler = new MbtModeler(canvas);
  let mbtId = localStorage.getItem('mbt_' + route.params.name + '_id');
  let res;
  console.log('mbtId:', mbtId)
  if (mbtId) {
    console.log('mbtId:', mbtId)
    res = mbtquery(mbtId);
    res.then((value: any) => {
      console.log('res:', value)
      if (value.hasOwnProperty('modelDefinition') && value.modelDefinition.hasOwnProperty('cellsinfo')) {
        let tempstr = JSON.stringify(value.modelDefinition.cellsinfo);
        modeler.graph.fromJSON(JSON.parse(tempstr));
        if (value.modelDefinition.hasOwnProperty('props')) {

          const map = new Map(Object.entries(JSON.parse(JSON.stringify(value.modelDefinition.props))))
          cacheprops = map;
          //         // console.log('after:',cacheprops)
        }
      }
    })
  }
  else {
    res = mbtquery();
    res.then((value: any) => {
      console.log('res:', value)

      if (value.hasOwnProperty('modelDefinition') && value.modelDefinition.hasOwnProperty('cellsinfo')) {
        let tempstr = JSON.stringify(value.modelDefinition.cellsinfo);
        modeler.graph.fromJSON(JSON.parse(tempstr));
        if (value.modelDefinition.hasOwnProperty('props')) {

          const map = new Map(Object.entries(JSON.parse(JSON.stringify(value.modelDefinition.props))))
          cacheprops = map;
          //         // console.log('after:',cacheprops)
        }
      }

    })
  }
  // res.then((value: any) => {
  //   console.log('res:', value)

  //   if (value.hasOwnProperty('modelDefinition') && value.modelDefinition.hasOwnProperty('cellsinfo')) {
  //     let tempstr = JSON.stringify(value.modelDefinition.cellsinfo);
  //     modeler.graph.fromJSON(JSON.parse(tempstr));
  //     if (value.modelDefinition.hasOwnProperty('props')) {

  //       const map = new Map(Object.entries(JSON.parse(JSON.stringify(value.modelDefinition.props))))
  //       cacheprops = map;
  //       // console.log('after:',cacheprops)
  //     }

  //   } else if (localStorage.getItem('mbt-' + route.params.name)) {


  //     /**
  //      * localstorage ... todo next
  //      */
  //     // console.log('already exists ', JSON.stringify(localStorage.getItem('mbt-'+route.params.name)))
  //     // if (localStorage.getItem('mbt-' + route.params.name)) {
  //     let tempobj = localStorage.getItem('mbt-' + route.params.name) + '';
  //     // console.log('load data from here:', tempobj);
  //     // modeler.graph.fromJSON(JSON.parse(tempstr));
  //     // return
  //   } else if (modeler && modeler.graph) {
  //     let tempdata: modelDefinition = {};
  //     Object.assign(tempdata, { cellsinfo: modeler.graph.toJSON() })

  //     Object.assign(tempdata, { props: {} })
  //     // console.log('save tempdata:', tempdata)
  //     // localStorage.setItem('mbt-' + route.params.name, JSON.stringify(tempdata));
  //     // localStorage.setItem('mbt-' + route.params.name, JSON.stringify(modeler.graph.toJSON()));
  //   } else {
  //     // console.log('empty')
  //   }
  // })

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
      showDrawer('aw');
    });
  });


  /**
   *  When click the element/link/blank, show the propsPanel
   */
  modeler.paper.on('link:pointerdblclick', function (linkView: any) {
    currentLinkView = linkView;

    isAW.value = false;
    isLink.value = true;
    isGlobal.value = false;
    if (cacheprops.has(linkView.model.id)) {
      cacheprops.get(linkView.model.id)
    } else {
      // todo link props
      currentLinkMap.set(linkView.model.id, { 'label': linkData.value });
      cacheprops.set(linkView.model.id, { 'label': linkData.value });

    }
    showDrawer(linkView)
  })


  modeler.paper.on('element:pointerclick', (elementView: dia.ElementView, node: dia.Event, x: number, y: number) => {
    console.log('....elementView:', elementView, x, y)
    console.log(cacheprops);
    // debugger
    // currentElementView = elementView
    if (elementView.model && elementView.model.attributes && elementView.model.attributes.type && elementView.model.attributes.type == 'standard.Rectangle') {
      ev_id = elementView.model.id + '';
      isAW.value = true;

      isLink.value = false;
      isGlobal.value = false;

      if (cacheprops.get(ev_id) != null && cacheprops.get(ev_id).props.name.length > 0) {

        let showtext = cacheprops.get(ev_id).props.template || cacheprops.get(ev_id).props.description
        let sizeX = showtext.length * 2.5;
        if (sizeX < 100 || sizeX > 150) sizeX = 160;
        let sizeY = cacheprops.get(ev_id).props.description.length * 2.5;
        if (sizeY < 45) sizeY = 45;
        if (sizeY > 135) sizeY = 180;


        modeler.graph.getCell(ev_id).resize(sizeX, sizeY);
        modeler.graph.getCell(ev_id).attr(
          "label/text", joint.util.breakText(showtext, {
            width: sizeX
          }, { ellipsis: true }))

        // currentElementView.model?.attr(
        //   "label/text",
        //   joint.util.breakText(showtext, {
        //     width: sizeX
        //   }, { separator: '.', ellipsis: true }))
        // currentElementView.model?.resize(sizeX, sizeY);
      }
    }
    // currentElementView.requestUpdate(1);
    elementView.requestUpdate(1);

  });

  modeler.paper.on('element:pointerdblclick', (elementView: dia.ElementView, node: dia.Event, x: number, y: number) => {
    awformdata.value.description = '';
    awformdata.value.name = '';
    awformdata.value.params = ''
    awformdata.value.tags = ''
    awformdata.value.template = ''
    // currentElementView = elementView
    // console.log('ce:', currentElementView)
    // console.log('ev:', elementView);

    if (elementView.model && elementView.model.attributes && elementView.model.attributes.type && elementView.model.attributes.type == 'standard.Rectangle') {
      ev_id = elementView.model.id + '';
      isAW.value = true;

      isLink.value = false;
      isGlobal.value = false;

      if (cacheprops.get(ev_id) != null && cacheprops.get(ev_id).props.name.length > 0) {

        let awformData = cacheprops.get(ev_id)
        awformdata.value = awformData.props;

        currentElementMap.set(ev_id, { 'props': awformdata.value });
        hasAWInfo.value = true;
      } else {
        // todo
        currentElementMap.set(ev_id, { 'props': awformdata.value });
        cacheprops.set(ev_id, { 'props': awformdata.value });

      }

      showDrawer(elementView)
    } else if (elementView && elementView.model && elementView.model.attributes && elementView.model.attributes.type == 'standard.Polygon') {
      // message.success("Save MBT model successfully")
    }
    // currentElementView.requestUpdate(1);
    // elementView.requestUpdate(1);
    modeler.graph.getCell(ev_id).graph.resize;

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
  globalformData.value.tags = ''
  if (mbtCache && mbtCache && mbtCache.hasOwnProperty('name')) {
    // console.log('...kkkk0...', mbtCache, mbtCache[0]['name']);  
    globalformData.value.name = mbtCache['name'];
    globalformData.value.description = mbtCache['description'];
    if (_.isArray(mbtCache['tags'])) {
      _.forEach(mbtCache['tags'], function (value, key) {
        globalformData.value.tags += value + ' '
      })
    }
    // globalformData.value.tags = mbtCache['tags'];
  }

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
      awformdata.value.tags += value + ' '
    })
  }


  if (_.isArray(rowobj.params)) {
    _.forEach(rowobj.params, function (value, key) {
      awformdata.value.params += value.name + ' '

    })
  }



}
const activeKey = ref('1')

interface columnDefinition {
  title: string,
  dataIndex: string,
  width?: string
}
interface MetaDataItem {
  key: string;
  title: string;
  content: string;

}
interface ResourcesDataItem {
  key: string;
  alias: string;
  class: string;
  resourcetype: string;

}
interface MetaDataItem {
  key: string;
  title: string;
  content: string;

}
interface AttributesDataItem {
  key: string;
  description: string;
  requirements: string;


}
const attributescolumns: columnDefinition[] = [
  {
    title: 'description',
    dataIndex: 'description',
    width: '30%',
  },
  {
    title: 'requirements',
    dataIndex: 'requirements',
  }

];

const resourcescolumns: columnDefinition[] = [
  {
    title: 'alias',
    dataIndex: 'alias',
    width: '20%',
  },
  {
    title: 'class',
    dataIndex: 'class',
  },
  {
    title: 'resourcetype',
    dataIndex: 'resourcetype',
  }
  ,
  {
    title: 'operation',
    dataIndex: 'operation',
  },
];


const metacolumns: columnDefinition[] = [
  {
    title: 'title',
    dataIndex: 'title',
    width: '30%',
  },
  {
    title: 'content',
    dataIndex: 'content',
  },
  {
    title: 'operation',
    dataIndex: 'operation',
  },
];

const attributesdataSource: Ref<AttributesDataItem[]> = ref([
  {
    key: '0',
    description: 'Edward King 0',
    requirements: 'London, Park Lane no. 0',
  }
]);

const metadataSource: Ref<MetaDataItem[]> = ref([
  {
    key: '0',
    title: 'Edward King 0',
    content: 'London, Park Lane no. 0',
  },
  {
    key: '1',
    title: 'Edward King 1',
    content: 'London, Park Lane no. 1',
  },
]);

const resourcesdataSource: Ref<ResourcesDataItem[]> = ref([
  {
    key: '0',
    alias: 'Edward King 0',
    class: '1',
    resourcetype: 'London, Park Lane no. 0',
  },
  {
    key: '1',
    alias: 'Edward King 1',
    class: '2',
    resourcetype: 'London, Park Lane no. 1',
  },
]);

const metacount = computed(() => metadataSource.value.length + 1);
const metaeditableData: UnwrapRef<Record<string, MetaDataItem>> = reactive({});

const metaedit = (key: string) => {
  metaeditableData[key] = cloneDeep(metadataSource.value.filter(item => key === item.key)[0]);
};
const metasave = (key: string) => {
  Object.assign(metadataSource.value.filter(item => key === item.key)[0], metaeditableData[key]);
  delete metaeditableData[key];
};

const onMetaDelete = (key: string) => {
  metadataSource.value = metadataSource.value.filter(item => item.key !== key);
};
const metahandleAdd = () => {
  const newData = {
    key: `${metacount.value}`,
    title: `Edward King ${metacount.value}`,
    content: `London, Park Lane no. ${metacount.value}`,
  };
  metadataSource.value.push(newData);
};


const resourcescount = computed(() => metadataSource.value.length + 1);
const resourceseditableData: UnwrapRef<Record<string, ResourcesDataItem>> = reactive({});

const resourcesedit = (key: string) => {
  resourceseditableData[key] = cloneDeep(resourcesdataSource.value.filter(item => key === item.key)[0]);
};
const resourcessave = (key: string) => {
  Object.assign(resourcesdataSource.value.filter(item => key === item.key)[0], resourceseditableData[key]);
  delete resourceseditableData[key];
};
const resourcescancel = (key: string) => {
  delete resourceseditableData[key];
};
const metacancel = (key: string) => {
  delete metaeditableData[key];
};
const onresourcesDelete = (key: string) => {
  resourcesdataSource.value = resourcesdataSource.value.filter(item => item.key !== key);
};
const resourceshandleAdd = () => {
  const newData = {
    key: `${resourcescount.value}`,
    alias: `Edward King ${resourcescount.value}`,
    class: `London, Park Lane no. ${resourcescount.value}`,
    resourcetype: `London, Park Lane no. ${resourcescount.value}`,
  };
  resourcesdataSource.value.push(newData);
};


</script>

<template>
  <main>
    <header class="block shadow" style="padding:0rem!important;margin-bottom: 0.2rem!important;">
      <a-button-group>
        <a-button type="primary" @click="saveMBT(route)">
          Save
        </a-button>
        <span style="margin-left: 5px;">
          <a-button danger @click="reloadMBT(route)">
            Reload
          </a-button>
        </span>
      </a-button-group>
    </header>
    <section class="block shadow flex-center" style="
      width: 100%;
      height: 100%;
      min-height: 100%;
      color: var(--gray);
      font-size: 5rem;
      overflow: hidden;
      padding:0rem!important;
    ">

      <a-row type="flex" style="
      width: 100%;
      height: 100%;
      min-height: 100%;
      padding:0rem!important;">
        <a-col :span="1" style="padding:0rem!important;">
          <div class="stencil" ref="stencilcanvas"></div>
        </a-col>
        <a-col :span="23">
          <div class="canvas" ref="canvas"></div>
        </a-col>

        <a-drawer width="50%" placement="right" :closable="false" :visible="visible" :get-container="false"
          :style="{ position: 'absolute' , overflow:'hidden' }" @close="onCloseDrawer">
          <div class="infoPanel" ref="infoPanel" v-if="isAW">

            <AForm v-if="!hasAWInfo && isAW" layout="inline" class="search_form" :model="formState"
              @finish="handleFinish" @finishFailed="handleFinishFailed">
              <a-form-item :wrapper-col="{ span: 24 }">
                <a-input v-model:value="formState.search" placeholder="aw">
                  <template #prefix>
                    <search-outlined />
                  </template>
                </a-input>
              </a-form-item>

              <a-form-item :wrapper-col="{ span: 4 }">
                <a-button type="primary" html-type="submit">search</a-button>
              </a-form-item>
            </AForm>

            <div class="awtable" v-if="!hasAWInfo && isAW">
              <a-table bordered 
              row-key="record=>record._id" 
                :columns="columns" 
                :data-source="tableData"
                class="components-table-demo-nested"
                :pagination="pagination" 
           
                >
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
                    <div v-if="record._highlight">
                      <div v-if="record._highlight.name">
                        <a-button type="link" @click="showAWInfo(record)"> <p v-for="item in record._highlight.name" v-html="item"></p>
                        </a-button>
                      </div>
                      <div v-else><a-button type="link" @click="showAWInfo(record)"> {{record.name}}</a-button></div>
                    </div>
                    <div v-else><a-button type="link" @click="showAWInfo(record)"> {{record.name}}</a-button></div>
                  </template>
                  

                  <template v-if="column.key === 'description'">
                    <div v-if="record._highlight">
                      <div v-if="record._highlight.description">
                        <p v-for="item in record._highlight.description" v-html="item"></p>
                      </div>
                      <div v-else>{{record.description}}</div>
                    </div>
                    <div v-else>{{record.description}}</div>
                  </template>
                  <template v-if="column.key === 'template'">
                    <div v-if="record._highlight">
                      <div v-if="record._highlight.template">
                        <p v-for="item in record._highlight.template" v-html="item"></p>
                      </div>
                      <div v-else>{{record.template}}</div>
                    </div>
                    <div v-else>{{record.template}}</div>
                  </template>

                  <template v-if="column.key === 'tags'">
              <span>
                <a-tag
                  v-for="tag in record.tags"
                  :key="tag"
                  :color="tag === 'test' ? 'volcano' : 'red'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
          </template>

                  

                  


                </template>
              </a-table>
              <a-button type="primary" @click="onCloseDrawer()">Close </a-button>

            </div>
            <VueForm v-model="awformdata" :schema="awschema" :formFooter="formFooter" @submit="awhandlerSubmit()"
              @cancel="handlerCancel" v-if="isAW && hasAWInfo">
            </VueForm>

          </div>
          <div class="infoPanel" ref="infoPanel" v-if="isLink">
            <VueForm v-model="linkData" :schema="linkschema" @submit="linkhandlerSubmit" @cancel="onCloseDrawer">
            </VueForm>
          </div>
          <a-tabs v-model:activeKey="activeKey" v-if="isGlobal">
            <a-tab-pane key="1" tab="Meta">
              <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="metahandleAdd">Add</a-button>
              <a-table bordered :data-source="metadataSource" :columns="metacolumns">
                <template #bodyCell="{ column, text, record }">
                  <template v-if="['title', 'content'].includes(column.dataIndex)">
                    <div class="editable-cell">
                      <div v-if="metaeditableData[record.key]" class="editable-cell-input-wrapper">
                        <a-input
                          v-model:value="metaeditableData[record.key][column.dataIndex as keyof typeof stringLiteral ]"
                          @pressEnter="metasave(record.key)" />
                        <check-outlined class="editable-cell-icon-check" @click="metasave(record.key)" />
                      </div>
                      <div v-else class="editable-cell-text-wrapper">
                        {{ text || ' ' }}
                        <edit-outlined class="editable-cell-icon" @click="metaedit(record.key)" />
                      </div>
                    </div>
                  </template>
                  <template v-else-if="column.dataIndex === 'operation'">
                    <a-popconfirm v-if="metadataSource.length" title="Sure to delete?"
                      @confirm="onMetaDelete(record.key)">
                      <a>Delete</a>
                    </a-popconfirm>
                  </template>
                </template>
              </a-table>
            </a-tab-pane>
            <a-tab-pane key="2" tab="Attributes" force-render>
              <a-card style="overflow-y: auto;">
                <div style="padding: 5px;">

                  <VueForm v-model="globalformData" :schema="globalschema" @submit="globalhandlerSubmit"
                    @cancel="onCloseDrawer" v-if="isGlobal">
                  </VueForm>


                </div>
              </a-card>
            </a-tab-pane>
            <a-tab-pane key="3" tab="Data Pool">Content of datapool</a-tab-pane>
            <a-tab-pane key="4" tab="Resources">
              <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="resourceshandleAdd">Add
              </a-button>
              <a-table bordered :data-source="resourcesdataSource" :columns="resourcescolumns">
                <template #bodyCell="{ column, text, record }">
                  <template v-if="['alias', 'class','resourcetype'].includes(column.dataIndex)">
                    <div class="editable-cell">
                      <div v-if="resourceseditableData[record.key]" class="editable-cell-input-wrapper">
                        <a-input
                          v-model:value="resourceseditableData[record.key][column.dataIndex as keyof typeof stringLiteral ]"
                          @pressEnter="resourcessave(record.key)" />
                        <check-outlined class="editable-cell-icon-check" @click="resourcessave(record.key)" />
                      </div>
                      <div v-else class="editable-cell-text-wrapper">
                        {{ text || ' ' }}
                        <edit-outlined class="editable-cell-icon" @click="resourcesedit(record.key)" />
                      </div>

                    </div>
                  </template>
                  <template v-else-if="column.dataIndex === 'operation'">
                    <div class="editable-row-operations">
                      <span v-if="resourceseditableData[record.key]">
                        <a-typography-link @click="resourcessave(record.key)">Save</a-typography-link>
                        <a-popconfirm title="Sure to cancel?" @confirm="resourcescancel(record.key)">
                          <a>Cancel</a>
                        </a-popconfirm>
                      </span>
                      <span v-else>
                        <a @click="resourcesedit(record.key)">Edit</a>
                      </span>
                      <span>
                        <a-popconfirm v-if="resourcesdataSource.length" title="Sure to delete?"
                          @confirm="onresourcesDelete(record.key)">
                          <a> Delete</a>
                        </a-popconfirm>
                      </span>
                    </div>
                  </template>
                </template>
              </a-table>

            </a-tab-pane>
          </a-tabs>






        </a-drawer>


      </a-row>

    </section>
  </main>
</template>
<!-- <div slot-scope="{ formData, formRefFn }">
  <pre style="background-color: #eee;">{{ JSON.stringify(formData, null, 4) }}</pre>
  <p><el-button @click="consoleLog(formRefFn)" type="primary">点击</el-button></p>
</div> -->
<style lang="less">
#content-window {
  overflow: hidden !important;
  padding: 0rem !important;
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
  // height: 100%;
  /* overflow: hidden; */
  position: relative;
  margin: 2px;
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
  // display: flex!important;
  justify-content: flex-end;
  // flex-direction:column-reverse!important; 
}

.search_form {
  width: 100%;
  padding: 5px;
}

.ant-drawer-body {
  overflow-x: hidden !important;
  padding:0px!important;
}
.found-kw{
    color: red!important;
    font-weight: 600;
  }
</style>
