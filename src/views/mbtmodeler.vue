<script setup lang="ts">
import { MbtModeler } from "@/composables/MbtModeler";
import { Stencil } from "@/composables/stencil";
import dynamicTable from "@/components/dynamicTable.vue";
import * as joint from "jointjs";
import { dia } from "jointjs";
import { message } from "ant-design-vue/es";
import { ref, onMounted, UnwrapRef, reactive, toRefs, unref } from "vue";
import type { Ref } from "vue";
import { useRoute } from "vue-router";
import type { FormProps, SelectProps, TableProps, TreeProps } from "ant-design-vue";
import request from "@/utils/request";
import { RadioGroupProps } from "ant-design-vue";

import {
  SmileOutlined,
  SearchOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons-vue";
import { Stores } from "../../types/stores";
import $, { param } from "jquery";
import {
  red,
  volcano,
  gold,
  yellow,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
  magenta,
  grey,
} from "@ant-design/colors";
import VueForm from "@lljj/vue3-form-ant";
import {
  tableSearch,
  FormState,
  paramsobj,
  ModelState,
  statesTs,
} from "./componentTS/awmodeler";
import _, { transform } from "lodash";
import { mockMBTUrl, realMBTUrl } from "@/appConfig";
import { StorageSerializers, useCurrentElement } from "@vueuse/core";

import { computed, defineComponent } from "vue";

import { CheckOutlined, EditOutlined } from "@ant-design/icons-vue";
import { cloneDeep } from "lodash-es";
import { stringLiteral } from "@babel/types";
import { array } from "vue-types";

window.joint = joint;

const formFooter = {
  show: true, // 是否显示默认底部
  okBtn: "保存", // 确认按钮文字
  okBtnProps: { type: "primary" }, // 传递确认按钮的 props，例如配置按钮 loading 状态 okBtnProps: { loading: true }
  cancelBtn: "编辑", // 取消按钮文字
  nextBtn: "选择下一个",
  // 透传给formFooter 中的formItem组件的参数
  // 例如 vue3-ant 配置wrapperCol  formItemAttrs = { wrapperCol: { span: 10, offset: 5 }}
  formItemAttrs: {},
};

const formExpectedFooter = {
  show: true, // 是否显示默认底部
  okBtn: "确定", // 确认按钮文字
  okBtnProps: { type: "primary" }, // 传递确认按钮的 props，例如配置按钮 loading 状态 okBtnProps: { loading: true }
  cancelBtn: "编辑", // 取消按钮文字

  // 透传给formFooter 中的formItem组件的参数
  // 例如 vue3-ant 配置wrapperCol  formItemAttrs = { wrapperCol: { span: 10, offset: 5 }}
  formItemAttrs: {},
};

//Setting url for data fetching
// const url=mockMBTUrl;
const url = realMBTUrl;

const namespace = joint.shapes; // e.g. { standard: { Rectangle: RectangleElementClass }}

const templateOptions = ["Dynamic Template", "Static Template", "Input directly"];
const templatevalue = ref<string>("Static Template");

/// save data to localstorage, and send to backend as modelDefinition
interface modelDefinition {
  cellsInfo?: {
    cellNamespace?: Object;
    cells?: Object[];
  };
  props?: Object;
}
interface FormState {
  awname: string;
  description: string;
  remember: boolean;
  search?: string;
}

interface DataDefinition {
  data: any[];
  meta: any[];
  resources: any[];
}
let cacheprops = new Map();
let cacheDataDefinition: DataDefinition = {
  data: [],
  meta: [],
  resources: [],
};
let ev_id = ""; //elememtview id

let lv_id = ""; //linkview id

/** drawer  */
//drawer visible
const visible = ref(false);

/**
 *First param used when clicking an element or a link.If it'sUndefined, that means not clicking
 * second param used by aw, id specify the element/link id
 */

const showDrawer = (
  el?: dia.LinkView | dia.ElementView | undefined,
  aw?: string,
  id?: string
) => {
  visible.value = true;

  if (typeof el == "undefined" && aw == "aw" && id) {
    isAW.value = true;
    ev_id = id;

    awformdata.value._id = "";

    awformdata.value.description = "";
    awformdata.value.name = "";
    awformdata.value.params = "";
    awformdata.value.tags = "";
    awformdata.value.template = "";
    // handlerCancel()

    hasAWInfo.value = false;

    awquery();
    awquery("", true);
  } else if (typeof el == "undefined") {
    // console.log('click blank')
  } else if (el!.hasOwnProperty("path")) {
    // if (el!.model!.attributes.attrs.label && el!.model!.attributes.attrs.label.text && el!.model!.attributes.attrs.label.text.text)
    //   linkData.value.label = el!.model!.attributes.attrs.label.text.text || '';
  } else if (el && _.isObject(el)) {
    // console.log('click element')
  } else {
    // console.log('click blank')
  }
};

const isMetaTemplateEmpty = ref(true);
// 获取当前数据并赋值
let metatemplaterecordobj = ref();
// 根据传来的name值获取到数据
// showMetaDetail

let tempschema = ref({
  description: "Config",
  type: "object",
  properties: {},
});
async function metatemplatequery(data?: any) {
  //  let rst=await request.get('/api/templates',{params:{q:'category:meta', search:data}})

  if (data) {
    isVisible.value = !isVisible.value;
    // console.log("+++++++ ", data);
    let rst1 = await request.get(`/api/templates/${data}`, {
      params: { q: "category:meta", search: "" },
    });
    // console.log("rst1:", rst1);
    metatemplaterecordobj.value = rst1;
    if (rst1.model) {
      metatemplaterecordobj.value.model = rst1.model;
      metatemplatedetailtableData.value = arr(rst1.model);
      // console.log("rst1:", rst1);
      let temparr = rst1.model;
      // console.log("temparr:", temparr);
      if (_.isArray(temparr)) {
        temparr.forEach((mod: any) => {
          // let keyname = mod.name;
          let typeinschema = "";
          let enumVal: any[] = [];
          switch (mod.type) {
            case "int":
              typeinschema = "number";
              break;
            case "str":
              typeinschema = "string";
              break;
            case "float":
              typeinschema = "number";
              break;
            case "number":
              typeinschema = "number";
              break;
            case "boolean":
              typeinschema = "boolean";
              break;
            case "SUT":
              typeinschema = "string";
              break;
            default:
              break;
          }
          let tempobj;
          if (
            mod.hasOwnProperty("enum") &&
            mod.enum.length > 0 &&
            typeinschema == "string"
          ) {
            enumVal = _.split(mod.enum, ",");
            tempobj = {
              [mod.name]: {
                type: `${typeinschema}`,
                description: mod.description,
                // "title":mod.name,
                enum: enumVal,
                enumNames: enumVal,
              },
            };
          } else if (
            mod.hasOwnProperty("enum") &&
            mod.enum.length > 0 &&
            typeinschema == "number"
          ) {
            let tempenumVal = _.split(mod.enum, ",");
            let len = tempenumVal.length;
            for (let i = 0; i < len; i++) {
              enumVal.push(parseInt(tempenumVal[i]));
            }

            tempobj = {
              [mod.name]: {
                type: `${typeinschema}`,
                description: mod.description,
                // "title":mod.name,
                enum: enumVal,
                enumNames: enumVal,
              },
            };
          } else {
            tempobj = {
              [mod.name]: {
                type: `${typeinschema}`,
                description: mod.description,
                // "title":mod.name,
              },
            };
          }

          Object.assign(tempschema.value.properties, tempobj);
        });
        // console.log("tempschema:    ", tempschema);
        // if (rst && typeof rst.model != "undefined")
        //   metatemplatetableData.value = arr(rst?.model);
      }
    }
  } else {
    let meta_id = "";
    let strsql = `/api/templates?q=category:meta&search=`;
    let rst: [] = [];

    await request
      .get(strsql)
      .then((record: any) => {
        // console.log(record);
        rst = record.data;
        if (rst.length > 0) {
          isMetaTemplateEmpty.value = false;
        }

        metatemplatetableData.value = arr(rst);

        // if (record && record.data && record.data[0] && record.data[0].hasOwnProperty("_id"))
        //   meta_id = record.data[0]._id;
      })
      .finally(() => {
        // console.log("rst:", rst);
        if (rst.length > 0) {
          hasmultipleMetaTemplates.value = true;
        }
        return rst;
      });
  }

  // let rst1=await request.get(`/api/templates/${data}`,{params:{q:'category:meta',search:''}})
  //  console.log(rst);
  //  route.params.name=rst.name
}
// 给每条数据添加条属性
const arr = (dataArr: any) =>
  dataArr.map((item: any, index: string) => ({ ...item, key: index }));

const onBack = () => {
  // hasAWInfo.value = !hasAWInfo.value
  hasAWInfo.value = true;
};

const onAWExpectedBack = () => {
  // hasAWInfo.value = !hasAWInfo.value
  hasAWExpectedInfo.value = true;
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
let hasAWExpectedInfo = ref(false);
// aw form searching primary
const formState = reactive<FormState>({
  awname: "",
  description: "",
  remember: true,
  search: "",
});

// aw form searching expected
const formStateExpected = reactive<FormState>({
  awname: "",
  description: "",
  remember: true,
  search: "",
});
let metatemplatetableData = ref([]);
let metatemplatedetailtableData = ref([]);
let tableData = ref([]);
let tableDataExpected = ref([]);
let searchobj: tableSearch = reactive({
  search: "",
  size: 20,
  page: 1,
  perPage: 10,
});

let searchobjExpected: tableSearch = reactive({
  search: "",
  size: 20,
  page: 1,
  perPage: 10,
});
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

const metatemplatedetailcolumns = reactive<Object[]>([
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
    title: "type",
    dataIndex: "type",
    key: "type",
    width: 180,
  },
]);
const columns = reactive<Object[]>([
  {
    name: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "template",
    dataIndex: "template",
    key: "template",
  },
  {
    title: "tags",
    dataIndex: "tags",
    key: "tags",
  },
]);

async function awqueryById(id: string) {
  let rst = await request.get("/api/hlfs/" + id);
  if (rst.data) {
    // console.log('rst:', rst.data)
    return rst.data;
  }
}
//format: i.g.    ids: xxxxxxxx1|yyyyyyyyy2
async function awqueryByBatchIds(ids: string) {
  // console.log(ids)
  let rst = await request.get("/api/hlfs?q=_id:" + ids);
  if (rst.data) {
    // console.log('rst:', rst.data)
    return rst.data;
  }
}
async function awquery(data?: any, isExpected?: boolean) {
  let rst;
  if (isExpected) {
    rst = await request.get("/api/hlfs", { params: data || searchobjExpected });
  } else {
    rst = await request.get("/api/hlfs", { params: data || searchobj });
  }

  if (rst.data) {
    // console.log('rst:', rst.data)

    // console.log('rst total:', rst.total, '  pagination page size:', pagination.value.pageSize)
    if (isExpected) {
      // console.log('awquery for pagechange or onSizeChangeExpected');
      paginationExpected.value.total = rst.total;
      tableDataExpected.value = rst.data;
    } else {
      pagination.value.total = rst.total;
      tableData.value = rst.data;
    }

    // console.log(tableData, tableData.value);
    return rst.data;
  }
}
// dataSource` length is less than `pagination.total` but large than `pagination.pageSize`.
function onShow(cell?: any) {
  showPropPanel.value = true;
}

// 分页的数据
let pagination = ref({
  pageNo: 1,
  pageSize: 10, // 默认每页显示数量
  showQuickJumper: true,
  showSizeChanger: true, // 显示可改变每页数量
  pageSizeOptions: ["10", "20", "50", "100"], // 每页数量选项
  showTotal: (total: any) => `共 ${total} 条`, // 显示总数
  onShowSizeChange: (current: any, pageSize: any) => onSizeChange(current, pageSize), // 改变每页数量时更新显示
  onChange: (page: any, pageSize: any) => onPageChange(page, pageSize), //点击页码事件
  total: 0, //总条数
});

const onPageChange = async (page: number, pageSize: any) => {
  pagination.value.pageNo = page;
  pagination.value.pageSize = pageSize;
  searchobj.page = page;
  searchobj.perPage = pageSize;
  if (formState.search) {
    searchobj.search = formState.search;
  } else {
    searchobj.search = "";
  }
  await awquery();
};
const onSizeChange = async (current: any, pageSize: number) => {
  pagination.value.pageNo = current;
  pagination.value.pageSize = pageSize;
  searchobj.page = current;
  searchobj.perPage = pageSize;
  if (formState.search) {
    searchobj.search = formState.search;
  } else {
    searchobj.search = "";
  }
  await awquery();
};

// 分页的数据-expected
let paginationExpected = ref({
  pageNo: 1,
  pageSize: 10, // 默认每页显示数量
  showQuickJumper: true,
  showSizeChanger: true, // 显示可改变每页数量
  pageSizeOptions: ["10", "20", "50", "100"], // 每页数量选项
  showTotal: (total: any) => `共 ${total} 条`, // 显示总数
  onShowSizeChange: (current: any, pageSize: any) =>
    onSizeChangeExpected(current, pageSize), // 改变每页数量时更新显示
  onChange: (page: any, pageSize: any) => onPageChangeExpected(page, pageSize), //点击页码事件
  total: 0, //总条数
});

const onPageChangeExpected = async (page: number, pageSize: any) => {
  paginationExpected.value.pageNo = page;
  paginationExpected.value.pageSize = pageSize;
  searchobjExpected.page = page;
  searchobjExpected.perPage = pageSize;
  if (formStateExpected.search) {
    searchobjExpected.search = formStateExpected.search;
  } else {
    searchobjExpected.search = "";
  }
  await awquery("", true);
};
const onSizeChangeExpected = async (current: any, pageSize: number) => {
  paginationExpected.value.pageNo = current;
  paginationExpected.value.pageSize = pageSize;
  searchobjExpected.page = current;
  searchobjExpected.perPage = pageSize;
  if (formStateExpected.search) {
    searchobjExpected.search = formStateExpected.search;
  } else {
    searchobjExpected.search = "";
  }
  await awquery("", true);
};

const handleFinish: FormProps["onFinish"] = (values: any) => {
  awquery(formState, false);
  pagination.value.pageNo = 1;
  onShow();
};
const handleFinishFailed: FormProps["onFinishFailed"] = (errors: any) => {
  console.log(errors);
};

const handleFinishExpected: FormProps["onFinish"] = (values: any) => {
  awquery(formStateExpected, true);
  paginationExpected.value.pageNo = 1;
  onShow();
};

/**
 * Panel --Json schema forms
 */

let globalformData = ref<Stores.mbtView>({
  _id: "",
  name: "",
  description: "",
  tags: "",
});
let linkData = ref({
  _id: "",
  label: "",
  routerType: "manhattan",
  connectorType: "rounded",
  loop: false,
  loopcount: 1,
});
interface LinkFormData {
  _id: string;
  label: string;
  loop?: boolean;
  loopcount?: number;
  connectorType?: string;
  routerType?: string;
}
let linkFormData: LinkFormData = {
  _id: "",
  label: "",
  loop: false,
  loopcount: 1,
  connectorType: "rounded",
  routerType: "manhattan",
};
let awformdata = ref<Stores.awView>({
  _id: "",
  name: "",
  description: "",
  params: "",
  tags: "",
  template: "",
});

//For expected
let awformdataExpected = ref<Stores.awView>({
  _id: "",
  name: "",
  description: "",
  params: "",
  tags: "",
  template: "",
});
const globalschema = ref({
  // "title": "MBTConfiguration",
  // "description": "Configuration for the MBT",
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
      readOnly: true,
    },
    tags: {
      title: "Tags",
      type: "string",
      readOnly: true,
    },
  },
});

const awschema = ref({
  title: "AW",
  description: "Configuration for the AW",
  type: "object",
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
    params: {
      title: "Params",
      type: "string",
      readOnly: true,
    },
  },
});
// linkData
// "ui:hidden": "{{linkData.loop === false}}"
const linkschema = ref({
  title: "LINK",
  description: "Configuration for Link",
  type: "object",
  properties: {
    _id: {
      type: "string",
      "ui:hidden": true,
      required: true,
    },
    routerType: {
      type: "string",
      title: "Style",
      enum: ["manhattan", "metro", "normal", "orthogonal", "oneSide"],
      enumNames: ["manhattan", "metro", "normal", "orthogonal", "oneSide"],
    },
    connectorType: {
      type: "string",
      title: "Type",
      enum: ["jumpover", "normal", "rounded", "smooth", "curve"],
      enumNames: ["jumpover", "normal", "rounded", "smooth", "curve"],
    },
    label: {
      title: "Condition",
      type: "string",
      // "ui:hidden": "{{parentFormData.loop === true}}"
    },
    loop: {
      type: "boolean",
      title: "Loop",
      default: false,
    },
    loopcount: {
      title: "Loop count",
      type: "integer",
      minimum: 1,
      "ui:hidden": "{{parentFormData.loop === false}}",
    },
  },
});
const onExpectedAW = () => {
  awActiveKey.value = "2";
  isDisabled.value = false;
};

function awhandlerSubmit() {
  // console.log('primary started.')
  isAW.value = true;
  isLink.value = false;
  isGlobal.value = false;
  let tempformdata: Stores.awView = {
    _id: "",
    name: "",
    tags: "",
    template: "",
    description: "",
    params: "",
  };
  //刚从stencil拖过来currentElementMap为空。如果是双击状态则不为空
  if (currentElementMap.size == 0) {
    // console.log('cacheprops set.....1', cacheprops)
    if (
      cacheprops.get(ev_id) != null &&
      cacheprops.get(ev_id).props.primaryprops.name.length > 0
    ) {
      // console.log('cacheprops set.....1/1', cacheprops)
      let awformData = cacheprops.get(ev_id).props.primaryprops;
      // awformdata.value = awformData.props;
      awformdata.value = awformData;
      currentElementMap.set(ev_id, { props: { primaryprops: awformdata.value } });
      hasAWInfo.value = true;
    } //新的aw拖入modeler
    else {
      currentElementMap.set(ev_id, { props: { primaryprops: awformdata.value } });

      tempformdata._id = awformdata.value._id;
      tempformdata.name = awformdata.value.name;
      tempformdata.description = awformdata.value.description;
      if (_.isArray(awformdata.value.tags)) {
        _.forEach(awformdata.value.tags, function (value, key) {
          tempformdata.tags += value + " ";
        });
      }
      if (_.isArray(awformdata.value.params)) {
        _.forEach(awformdata.value.params, function (value, key) {
          tempformdata.params += value.name + " ";
        });
      }

      cacheprops.set(ev_id, { props: { primaryprops: tempformdata } });

      // cacheprops.set(ev_id, { 'expectedprops': tempformdata });
    }
  } //1. 双击状态 ，2. 设置primary后 currentElementMap不为空
  else {
    //获取epected的
    let tempexpected;
    if (
      currentElementMap.get(ev_id) &&
      currentElementMap.get(ev_id).props &&
      currentElementMap.get(ev_id).props.expectedprops
    ) {
      console.log(
        "expected in handler:",
        currentElementMap.get(ev_id).props.expectedprops
      );
      tempexpected = currentElementMap.get(ev_id).props.expectedprops;
    }
    console.log(" 2/1-1 : tempexpected", tempexpected);
    // currentElementMap.set(ev_id, { 'props': { 'primaryprops': awformdata.value, 'expectedprops': awformdata.value } });

    tempformdata._id = awformdata.value._id;
    tempformdata.name = awformdata.value.name;
    tempformdata.description = awformdata.value.description;
    if (_.isArray(awformdata.value.tags)) {
      _.forEach(awformdata.value.tags, function (value, key) {
        tempformdata.tags += value + " ";
      });
    }
    if (_.isArray(awformdata.value.params)) {
      _.forEach(awformdata.value.params, function (value, key) {
        tempformdata.params += value.name + " ";
      });
    }
    // console.log('cacheprops set.....2/2', cacheprops)
    if (typeof tempexpected != "undefined") {
      currentElementMap.set(ev_id, {
        props: { primaryprops: tempformdata, expectedprops: tempexpected },
      });
      cacheprops.set(ev_id, {
        props: { primaryprops: tempformdata, expectedprops: tempexpected },
      });
    } //未设置expected，只存primary
    else {
      console.log("correct");
      currentElementMap.set(ev_id, { props: { primaryprops: tempformdata } });
      cacheprops.set(ev_id, { props: { primaryprops: tempformdata } });
    }
  }

  //画图
  let tempaw = {};
  let maxX = 180;
  let maxY = 150;
  // let breaklineHeight = 120;
  // let breaklineHeightExpected = 0;
  let showheadtext = "";
  let showbodytext = "";
  let cell = modeler.graph.getCell(ev_id);
  let isOneAW = true;
  for (const [key, value] of Object.entries(
    currentElementMap.get(ev_id).props.primaryprops
  )) {
    let obj = JSON.parse(`{"${key}":"${value}"}`);
    Object.assign(tempaw, obj);
    if (key == "template" || key == "description") {
      showheadtext =
        cacheprops.get(ev_id).props.primaryprops.template ||
        cacheprops.get(ev_id).props.primaryprops.description;

      if (showheadtext.length > 45) {
        showheadtext = showheadtext.slice(0, 42) + " ...";
      }
      let sizeX = showheadtext.length * 2.5;

      if (sizeX < 100 || sizeX > 150) sizeX = 160;
      let sizeY = cacheprops.get(ev_id).props.primaryprops.description.length * 2.5;
      // breaklineHeight = sizeY;
      if (sizeY < 45) sizeY = 45;
      if (sizeY > 135) sizeY = 150;

      // console.log('sizex:', sizeX, '  sizey:', sizeY, ' , breaklineheight:', breaklineHeight);
      maxX = maxX > sizeX ? maxX : sizeX;
      maxY = maxY > sizeY ? maxX : sizeY;
      break;
    }
  }
  if (
    currentElementMap.get(ev_id) &&
    currentElementMap.get(ev_id).props &&
    currentElementMap.get(ev_id).props.expectedprops
  ) {
    console.log("error expected ");
    isOneAW = false;
    for (const [key, value] of Object.entries(
      currentElementMap.get(ev_id).props.expectedprops
    )) {
      let obj = JSON.parse(`{"${key}":"${value}"}`);
      Object.assign(tempaw, obj);
      if (key == "template" || key == "description") {
        showbodytext =
          cacheprops.get(ev_id).props.expectedprops.template ||
          cacheprops.get(ev_id).props.expectedprops.description;
        let sizeX = showbodytext.length * 2.5;
        if (showbodytext.length > 45) {
          showbodytext = showbodytext.slice(0, 42) + " ...";
        }
        if (sizeX < 100 || sizeX > 150) sizeX = 160;
        let sizeY = cacheprops.get(ev_id).props.expectedprops.description.length * 2.5;
        if (sizeY < 45) sizeY = 45;
        if (sizeY > 135) sizeY = 150;
        // breaklineHeightExpected = sizeY;
        maxX = maxX > sizeX ? maxX : sizeX;
        maxY = maxY > sizeY ? maxX : sizeY;
        break;
      }
    }
  } else {
    console.log("last else");
    isOneAW = true;
    showbodytext = "";
  }

  /**
   * For only primary
   */
  cell.attr(
    "headerText/text",
    joint.util.breakText(
      showheadtext,
      {
        width: maxX,
      },
      { "font-size": 16 }
    )
  );

  if (showbodytext.length > 0)
    cell.attr(
      "bodyText/text",
      joint.util.breakText(
        showbodytext,
        {
          width: maxX,
        },
        { "font-size": 16 }
      )
    );

  if (isOneAW) {
    cell.attr("header", { width: maxX, height: maxY * 0.5 });
    cell.attr("header").transform = "matrix(1,0,0,1,0,-20)";
    cell.attr("bodyText/text", "");
    cell.attr("body").transform = "matrix(0,0,0,0,0,0)";
    cell.resize(maxX, maxY * 0.5 - 20);
  } // For both primary and expected
  else {
    cell.attr("header", { width: maxX, height: maxY * 0.5 });
    cell.attr("header").transform = "matrix(1,0,0,1,0,-20)";
    cell.attr("body").transform = "matrix(1,0,0,1,0,-20)";
    cell.resize(maxX, maxY - 10);
  }

  // console.log('new cacheprops:   ', cacheprops)
  currentElementMap.clear();
  onCloseDrawer();
  message.success("Save aw Successfully");
}

function globalhandlerSubmit() {
  cacheDataDefinition.meta = metadataSource.value;
  message.success("Save config Successfully");
}

function linkhandlerSubmit() {
  linkData.value._id = lv_id;
  linkFormData._id = linkData.value._id;
  linkFormData.label = linkData.value.label;
  linkFormData.loop = linkData.value.loop;
  linkFormData.loopcount = linkData.value.loopcount;
  linkFormData.connectorType = linkData.value.connectorType;
  linkFormData.routerType = linkData.value.routerType;
  // console.log(linkData.value.connectorType)
  // console.log(linkData.value.routerType);
  modeler.graph.getCell(lv_id).router(linkData.value.routerType);
  modeler.graph.getCell(lv_id).connector(linkData.value.connectorType);
  let loopcount1 = linkData.value.loopcount;
  while (modeler.graph.getCell(lv_id).hasLabels) {
    modeler.graph.getCell(lv_id).removeLabel(-1);
    break;
  }
  if (linkFormData.loop == true) {
    modeler.graph.getCell(lv_id).appendLabel({
      attrs: {
        text: {
          text: linkFormData.label + ` Loop : ${loopcount1}`,
        },
      },
    });
    modeler.graph.getCell(lv_id).attr("line/stroke", "red");
    linkFormData.label += ` Loop : ${loopcount1}`;
  } else {
    if (typeof linkFormData.label == "undefined") linkFormData.label = "";
    modeler.graph.getCell(lv_id).appendLabel({
      attrs: {
        text: {
          text: linkFormData.label || "",
        },
      },
    });
    modeler.graph.getCell(lv_id).attr("line/stroke", "black");
  }
  let tempObj = {};
  Object.assign(tempObj, { _id: linkFormData._id });
  Object.assign(tempObj, { label: linkFormData.label });
  Object.assign(tempObj, { loop: linkFormData.loop });
  Object.assign(tempObj, { loopcount: linkFormData.loopcount });
  Object.assign(tempObj, { connectorType: linkFormData.connectorType });
  Object.assign(tempObj, { routerType: linkFormData.routerType });
  cacheprops.set(lv_id, { props: tempObj });
  onCloseDrawer();
  message.success("Save it Successfully");
}

function handlerEditExpected() {
  awquery("", true);
  hasAWExpectedInfo.value = false;
}

function handlerClearExpected() {
  // hasAWExpectedInfo.value = false;
  console.log("clear expected,ev_id:", ev_id);

  if (
    cacheprops.get(ev_id) != null &&
    cacheprops.get(ev_id).props.expectedprops &&
    cacheprops.get(ev_id).props.expectedprops.name.length > 0
  ) {
    console.log("success 2   awformdataExpected", awformdataExpected);
    cacheprops.set(ev_id, { props: { primaryprops: awformdata.value } });
    console.log("succ3 ", cacheprops.get(ev_id).props);
    // awformdataExpected.value._id=''

    // awformdata.value = awformdataExpected;

    currentElementMap.set(ev_id, {
      props: { primaryprops: awformdata.value },
    });
  }
  awActiveKey.value = "1";
  isDisabled.value = true;
}

function handlerCancel() {
  awquery();
  hasAWInfo.value = false;
}

let mbtCache: any; //save the data from backend Stores.mbt
const route = useRoute();
let dataDefData: Ref<any[]> = ref([]);
let cacheDataSchema: any[] = [];
let cacheDataContent: any[] = [];
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
  // console.log('mbtq:', id)
  let rst;
  let idstr = "";
  if (id && reLoad == true) {
    toReload.value = true;
    // console.log('cacheprops clear')
    cacheprops.clear();
    rst = await request
      .get(url + "/" + id)
      .then((response) => {
        if (response && response.name == route.params.name) {
          idstr = response._id + "";
          if (response.modelDefinition && response.modelDefinition.props) {
            const propsMap = new Map(
              Object.entries(JSON.parse(JSON.stringify(response.modelDefinition.props)))
            );
            // let cells = response.modelDefinition.cellsinfo.cells
            cacheprops = propsMap;
          } else {
            // console.log('no response.modelDefinition:', response.modelDefinition, idstr);
          }
          if (
            response.dataDefinition &&
            typeof response.dataDefinition.data != "undefined"
          ) {
            dataDefData.value.push(response.dataDefinition.data);
          } else if (
            response.dataDefinition &&
            typeof response.dataDefinition.meta != "undefined"
          ) {
            //read meta info from backend, todo
          } else if (
            response.dataDefinition &&
            typeof response.dataDefinition.resources != "undefined"
          ) {
            //read resources info from backend, todo
          }
          mbtCache = response; //should work on here
          localStorage.setItem(
            "mbt_" + route.params._id + route.params.name + "_id",
            idstr
          );

          localStorage.setItem(
            "mbt_" + route.params._id + route.params.name,
            JSON.stringify(response)
          );
          return mbtCache;
        }
      })
      .catch((err) => console.log(err));
  } else if (id) {
    rst = await request.get(url + "/" + id);
    // console.log('id query:', id, rst)
    if (rst && rst.name == route.params.name) {
      let str = rst._id + "";
      mbtCache = rst;
      localStorage.setItem("mbt_" + route.params._id + route.params.name + "_id", str);
      localStorage.setItem(
        "mbt_" + route.params._id + route.params.name,
        JSON.stringify(rst)
      );
    }
  } else {
    // console.log('reloadfunc, no id no reload......cacheprops/', cacheprops)
    rst = await request.get(url + "?search=" + route.params.name);
    // console.log('name query:', route.params.name)
    if (rst.data) {
      rst.data.forEach((record: any) => {
        if (record.name == route.params.name) {
          mbtCache = record;
          localStorage.setItem(
            "mbt_" + route.params._id + route.params.name + "_id",
            record._id
          );
          localStorage.setItem(
            "mbt_" + route.params._id + route.params.name,
            JSON.stringify(record)
          );
        }
      });
    }
  }
  return mbtCache;
}
// save data in the paper as map, {cid:1,elementview: ev,properties:prop}
let currentElementMap = new Map();
let currentLinkMap = new Map();

/**
 * Global elements in the component
 */
async function updateMBT(url: string, data: any) {
  await request.put(url, data);
}

const canvas = ref(HTMLElement);
const stencilcanvas = ref(HTMLElement);
const infoPanel = ref(HTMLElement);
let showPropPanel: Ref<boolean> = ref(false);
let modeler: MbtModeler;
let stencil: Stencil;

function saveMBT(route?: any) {
  let graphIds: string[] = []; //Save ids for all elements,links,etc on the paper. If cacheprops don't find it, remove them

  let tempdata: modelDefinition = {};
  // console.log(modeler.graph);
  modeler.graph.getCells().forEach((item: any) => {
    graphIds.push(item.id);
    if (item.attributes.type == "standard.HeaderedRectangle") {
    } else if (item.attributes.type == "standard.Link") {
      if (_.isArray(item.attributes.labels)) {
        // modeler.graph.getCell(item.id)
        while (modeler.graph.getCell(item.id).hasLabels) {
          modeler.graph.getCell(item.id).removeLabel(-1);
          break;
        }
        modeler.graph.getCell(item.id).appendLabel({
          attrs: {
            text: {
              text: cacheprops.get(item.id).props.label,
            },
          },
        });
      }
    }
  });

  /*删除找不到的*/
  // console.log('graphids:', graphIds)
  // console.log('saveMBT, if not found ......cacheprops/', cacheprops)
  for (let key of cacheprops.keys()) {
    if (!graphIds.includes(key)) {
      // console.log('delete cacheprops')
      cacheprops.delete(key);
    }
  }
  // console.log('saveMBT, ......cacheprops/', cacheprops)
  Object.assign(tempdata, { cellsinfo: modeler.graph.toJSON() });

  let obj = Object.fromEntries(cacheprops);

  Object.assign(tempdata, { props: obj });
  Object.assign(tempdata, { paperscale: paperscale.value });
  mbtCache["modelDefinition"] = tempdata;
  mbtCache["dataDefinition"] = cacheDataDefinition;

  updateMBT(url + `/${mbtCache["_id"]}`, mbtCache);
  message.success("Save MBT model successfully");
}

function reloadMBT(route: any) {
  // console.log('reloadMBT, if id not reload......cacheprops/', cacheprops)
  let res;
  let mbtId =
    localStorage.getItem("mbt_" + route.params._id + route.params.name + "_id") + "";
  console.log("reloadMBT, mbtid", mbtId);
  if (mbtId.length > 0) {
    res = mbtquery(mbtId, true);
  } else {
    res = mbtquery();
  }
  res.then((value: any) => {
    let graphIds: string[] = []; //Save aw ids for all elements,links,etc on the paper.
    if (
      value.hasOwnProperty("modelDefinition") &&
      value.modelDefinition.hasOwnProperty("cellsinfo")
    ) {
      let sqlstr = "";

      if (value.modelDefinition.hasOwnProperty("props")) {
        const map = new Map(
          Object.entries(JSON.parse(JSON.stringify(value.modelDefinition.props)))
        );
        cacheprops = map;
        // console.log('after:',cacheprops)
      }
      modeler.graph.getCells().forEach((item: any) => {
        if (item.attributes.type == "standard.HeaderedRectangle") {
          graphIds.push(item.id);
          sqlstr += cacheprops.get(item.id).props._id + "|";
        }
      });

      let tempcellsinfo = value.modelDefinition.cellsinfo;
      sqlstr = sqlstr.slice(0, sqlstr.length - 1);
      // console.log('...sqlstr:', sqlstr)
      let tempdata = awqueryByBatchIds(sqlstr);
      tempdata.then((aws) => {
        aws.forEach((aw: Stores.aw) => {
          for (let [key, val] of cacheprops) {
            //update cacheprops
            if (val.props._id == aw._id) {
              val.props.description = aw.description;
              val.props.template = aw.template;
            }
            //update aw details in value.modelDefinition.cellsinfo
            //rendering using updated cellsinfo
            tempcellsinfo.cells.forEach((cell: any) => {
              if (cell.type == "standard.HeaderedRectangle" && cell.id == key) {
                cell.attrs.label.text = aw.template || aw.description;
              }
            });
          }
        });
        // console.log('tempcellsinfo:', tempcellsinfo,'cacheprops:', cacheprops)
        let tempstr = JSON.stringify(tempcellsinfo);
        modeler.graph.fromJSON(JSON.parse(tempstr)); //Loading data from backend
      });
    }
  });
  message.success("MBT model reloaded");
}

onMounted(() => {
  stencil = new Stencil(stencilcanvas);
  modeler = new MbtModeler(canvas);

  let mbtId = localStorage.getItem("mbt_" + route.params._id + route.params.name + "_id");
  let res;
  if (mbtId) {
    res = mbtquery(mbtId);
    res.then((value: any) => {
      if (
        value.hasOwnProperty("modelDefinition") &&
        value.modelDefinition.hasOwnProperty("cellsinfo")
      ) {
        let tempstr = JSON.stringify(value.modelDefinition.cellsinfo);
        // console.log('rendering string:',tempstr)
        modeler.graph.fromJSON(JSON.parse(tempstr));
        if (value.modelDefinition.hasOwnProperty("props")) {
          const map = new Map(
            Object.entries(JSON.parse(JSON.stringify(value.modelDefinition.props)))
          );
          cacheprops = map;
        }
        if (value.modelDefinition.hasOwnProperty("paperscale")) {
          modeler.paper.scale(value.modelDefinition.paperscale);
        }
        //dataDefinition includes meta, datapool and resources
        if (value.dataDefinition.meta.length > 0) {
          cacheDataDefinition.meta = value.dataDefinition.meta;
          metadataSource.value = cacheDataDefinition.meta;
        }
      }
    });
  } else {
    res = mbtquery();
    res.then((value: any) => {
      if (
        value.hasOwnProperty("modelDefinition") &&
        value.modelDefinition.hasOwnProperty("cellsinfo")
      ) {
        let tempstr = JSON.stringify(value.modelDefinition.cellsinfo);
        modeler.graph.fromJSON(JSON.parse(tempstr));
        if (value.modelDefinition.hasOwnProperty("props")) {
          const map = new Map(
            Object.entries(JSON.parse(JSON.stringify(value.modelDefinition.props)))
          );
          cacheprops = map;
        }
      }
    });
  }

  /**
   * Drag & Drop stencil to modeler paper
   */
  stencil.paper.on("cell:pointerdown", (cellView, e: dia.Event, x, y) => {
    let aw = "";
    let cellid = ""; //element ID
    $("body").append(
      '<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;"></div>'
    );
    let flyGraph = new joint.dia.Graph({ cellNamespace: namespace });
    let flyPaper = new joint.dia.Paper({
      el: $("#flyPaper"),
      model: flyGraph,
      interactive: false,
      cellViewNamespace: namespace,
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
        s.position(x - target.left - offset.x, y - target.top - offset.y);

        modeler.graph.addCell(s);
        // console.log('sss:', s);
        if (s.attributes.type == "standard.HeaderedRectangle") {
          aw = "aw";
          cellid = s.id + "";
        }
      }
      $("body").off("mousemove.fly").off("mouseup.fly");
      flyShape.remove();
      $("#flyPaper").remove();
      if (aw.length > 0) showDrawer(undefined, aw, cellid); //First param used when clicking an element or a link. Undefined means not clicking
    });
  });

  /**
   *  When click the element/link/blank, show the propsPanel
   */

  modeler.paper.on("link:pointerdblclick", function (linkView: any) {
    lv_id = linkView.model.id + "";

    isAW.value = false;
    isLink.value = true;
    isGlobal.value = false;
    if (cacheprops.has(linkView.model.id)) {
      let templinkData = cacheprops.get(linkView.model.id);
      linkData.value = templinkData.props;
      currentLinkMap.set(lv_id, { props: templinkData });

      linkData.value._id = linkView.model.id;
    } else {
      // todo link props

      currentLinkMap.set(linkView.model.id, { props: {} });

      // cacheprops.set(linkView.model.id, { 'label': linkData.value.label || '' });
      cacheprops.set(linkView.model.id, { props: {} });
    }
    // console.log('cacheprops for link dblclick:',cacheprops)
    // console.log('currentLinkMap',currentLinkMap);
    showDrawer(linkView);
  });

  modeler.paper.on(
    "element:pointerclick",
    (elementView: dia.ElementView, node: dia.Event, x: number, y: number) => {
      if (
        elementView.model &&
        elementView.model.attributes &&
        elementView.model.attributes.type &&
        elementView.model.attributes.type == "standard.HeaderedRectangle"
      ) {
        ev_id = elementView.model.id + "";
        isAW.value = true;

        isLink.value = false;
        isGlobal.value = false;
      }
    }
  );

  modeler.paper.on(
    "element:pointerdblclick",
    (elementView: dia.ElementView, node: dia.Event, x: number, y: number) => {
      if (
        elementView.model &&
        elementView.model.attributes &&
        elementView.model.attributes.type &&
        elementView.model.attributes.type == "standard.HeaderedRectangle"
      ) {
        ev_id = elementView.model.id + "";
        isAW.value = true;

        isLink.value = false;
        isGlobal.value = false;

        if (
          cacheprops.get(ev_id) != null &&
          cacheprops.get(ev_id).props.primaryprops &&
          cacheprops.get(ev_id).props.primaryprops.name &&
          cacheprops.get(ev_id).props.primaryprops.name.length > 0
        ) {
          // console.log('success    ', cacheprops.get(ev_id).props.primaryprops)
          let awformData = cacheprops.get(ev_id).props.primaryprops;
          awformdata.value = awformData;

          if (
            cacheprops.get(ev_id) != null &&
            cacheprops.get(ev_id).props.expectedprops &&
            cacheprops.get(ev_id).props.expectedprops.name &&
            cacheprops.get(ev_id).props.expectedprops.name.length > 0
          ) {
            console.log("success 1437   ", cacheprops.get(ev_id).props.expectedprops);
            awformdataExpected.value = cacheprops.get(ev_id).props.expectedprops;
            isDisabled.value = false;
            // awformdata.value = awformdataExpected;
            hasAWExpectedInfo.value = true;
            currentElementMap.set(ev_id, {
              props: { primaryprops: awformdata.value, expectedprops: awformdata.value },
            });
          } else {
            cacheprops.set(ev_id, { props: { primaryprops: awformdata.value } });
            currentElementMap.set(ev_id, { props: { primaryprops: awformdata.value } });
          }
          // console.log('final result cacheprops:    ', cacheprops)
          hasAWInfo.value = true;
        } else {
          // console.log('empty   ', currentElementMap)
        }

        showDrawer(elementView, "aw", ev_id);
        // modeler.graph.getCell(ev_id).graph.resize;
      } else if (
        elementView &&
        elementView.model &&
        elementView.model.attributes &&
        elementView.model.attributes.type == "standard.Polygon"
      ) {
        // message.success("Save MBT model successfully")
      }
    }
  );

  modeler.paper.on("blank:pointerdblclick", () => {
    isAW.value = false;
    isLink.value = false;
    isGlobal.value = true;
    metatemplatequery();
    showGlobalInfo();
    showDrawer(undefined, "", "");
  });
});

function showGlobalInfo() {
  globalformData.value._id =
    localStorage.getItem("mbt_" + route.params._id + route.params.name + "_id") + "";
  globalformData.value.tags = "";
  if (mbtCache && mbtCache && mbtCache.hasOwnProperty("name")) {
    globalformData.value.name = mbtCache["name"];
    globalformData.value.description = mbtCache["description"];
    if (_.isArray(mbtCache["tags"])) {
      _.forEach(mbtCache["tags"], function (value, key) {
        globalformData.value.tags += value + " ";
      });
    }
    // globalformData.value.tags = mbtCache['tags'];
  }
}

function showAWInfo(rowobj: any) {
  // console.log('showAWInfo')
  hasAWInfo.value = true;
  awformdata.value.name = rowobj.name;
  awformdata.value.description = rowobj.description;
  awformdata.value.tags = "";
  awformdata.value.params = "";
  awformdata.value._id = rowobj._id;

  if (_.isArray(rowobj.tags)) {
    _.forEach(rowobj.tags, function (value, key) {
      awformdata.value.tags += value + " ";
    });
  }

  if (_.isArray(rowobj.params)) {
    _.forEach(rowobj.params, function (value, key) {
      awformdata.value.params += value.name + " ";
    });
  }
}

function showAWExpectedInfo(rowobj: any) {
  // console.log('showAWExpectedInfo， currentelement：', currentElementMap)
  // console.log('showAWExpectedInfo， cacheprops：', cacheprops)
  // currentElementMap.set(ev_id, { props: { 'primaryprops': awformdataExpected.value, 'expectedprops': awformdataExpected.value } });
  hasAWExpectedInfo.value = true;
  awformdataExpected.value.name = rowobj.name;
  awformdataExpected.value.description = rowobj.description;
  awformdataExpected.value.tags = "";
  awformdataExpected.value.params = "";
  awformdataExpected.value._id = rowobj._id;

  if (_.isArray(rowobj.tags)) {
    _.forEach(rowobj.tags, function (value, key) {
      awformdataExpected.value.tags += value + " ";
    });
  }

  if (_.isArray(rowobj.params)) {
    _.forEach(rowobj.params, function (value, key) {
      awformdataExpected.value.params += value.name + " ";
    });
  }
  currentElementMap.set(ev_id, { props: { expectedprops: awformdataExpected.value } });
  cacheprops.set(ev_id, { props: { expectedprops: awformdataExpected.value } });
  awActiveKey.value = "1";
}

const activeKey = ref("2");
const metaActiveKey = ref(["1"]);
const awActiveKey = ref("1");

interface columnDefinition {
  title: string;
  dataIndex: string;
  width?: string;
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
// interface AttributesDataItem {
//   key: string;
//   description: string;
//   requirements: string;

// }
// const attributescolumns: columnDefinition[] = [
//   {
//     title: 'description',
//     dataIndex: 'description',
//     width: '30%',
//   },
//   {
//     title: 'requirements',
//     dataIndex: 'requirements',
//   }

// ];
const dataPoolcolumns: columnDefinition[] = [
  {
    title: "id",
    dataIndex: "id",
    width: "10%",
  },
  {
    title: "description",
    dataIndex: "description",
  },
  {
    title: "typeformat",
    dataIndex: "typeformat",
  },
  {
    title: "resolution",
    dataIndex: "resolution",
  },
  {
    title: "url",
    dataIndex: "url",
  },
  {
    title: "fps",
    dataIndex: "fps",
  },
  {
    title: "videotype",
    dataIndex: "videotype",
  },
];
// const dataPooldataSource: Ref<DataPoolDataItem[]> = ref([
//   {
//     key: '0',
//     title: 'ID',
//     content: 'oppo.test',
//   },
//   {
//     key: '1',
//     title: 'Description',
//     content: '测试触控力度',
//   },
// ]);
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

const metacolumns: columnDefinition[] = [
  {
    title: "title",
    dataIndex: "title",
    width: "30%",
  },
  {
    title: "content",
    dataIndex: "content",
  },
  {
    title: "operation",
    dataIndex: "operation",
  },
];

const metadataSource: Ref<MetaDataItem[]> = ref([
  {
    key: "0",
    title: "ID",
    content: "oppo.test",
  },
  {
    key: "1",
    title: "Description",
    content: "测试触控力度",
  },
]);

const resourcesdataSource: Ref<ResourcesDataItem[]> = ref([
  {
    key: "0",
    alias: "Phone 0",
    class: "1",
    resourcetype: "phone",
  },
  {
    key: "1",
    alias: "Phone 2",
    class: "2",
    resourcetype: "phone",
  },
]);

function setFormData(awformData: Stores.aw) {
  let tempformdata: Stores.awView = {
    _id: "",
    name: "",
    tags: "",
    template: "",
    description: "",
    params: "",
  };
  tempformdata._id = awformdata.value._id;
  tempformdata.name = awformdata.value.name;
  tempformdata.description = awformdata.value.description;
  if (_.isArray(awformdata.value.tags)) {
    _.forEach(awformdata.value.tags, function (value, key) {
      tempformdata.tags += value + " ";
    });
  }

  if (_.isArray(awformdata.value.params)) {
    _.forEach(awformdata.value.params, function (value, key) {
      tempformdata.params += value.name + " ";
    });
  }
  return tempformdata;
}
const metacount = computed(() => metadataSource.value.length + 1);
const metaeditableData: UnwrapRef<Record<string, MetaDataItem>> = reactive({});

const metaedit = (key: string) => {
  // console.log(metaeditableData)
  // console.log(metaeditableData[key])
  metaeditableData[key] = cloneDeep(
    metadataSource.value.filter((item) => key === item.key)[0]
  );
};
const metasave = (key: string) => {
  Object.assign(
    metadataSource.value.filter((item) => key === item.key)[0],
    metaeditableData[key]
  );
  delete metaeditableData[key];
};

const onMetaDelete = (key: string) => {
  metadataSource.value = metadataSource.value.filter((item) => item.key !== key);
};
const metahandleAdd = () => {
  const newData = {
    key: `${metacount.value}`,
    title: `Objective${metacount.value}`,
    content: `details${metacount.value}`,
  };
  metadataSource.value.push(newData);
};

const resourcescount = computed(() => resourcesdataSource.value.length + 1);
const resourceseditableData: UnwrapRef<Record<string, ResourcesDataItem>> = reactive({});

const resourcesedit = (key: string) => {
  resourceseditableData[key] = cloneDeep(
    resourcesdataSource.value.filter((item) => key === item.key)[0]
  );
};
const resourcessave = (key: string) => {
  Object.assign(
    resourcesdataSource.value.filter((item) => key === item.key)[0],
    resourceseditableData[key]
  );
  delete resourceseditableData[key];
};
const resourcescancel = (key: string) => {
  delete resourceseditableData[key];
};
const metacancel = (key: string) => {
  delete metaeditableData[key];
};
const onresourcesDelete = (key: string) => {
  resourcesdataSource.value = resourcesdataSource.value.filter(
    (item) => item.key !== key
  );
};
const resourceshandleAdd = () => {
  const newData = {
    key: `${resourcescount.value}`,
    alias: `Resource ${resourcescount.value}`,
    class: `Class. ${resourcescount.value}`,
    resourcetype: `resource type. ${resourcescount.value}`,
  };
  resourcesdataSource.value.push(newData);
};

const isVisible = ref(false);
const hasmultipleMetaTemplates = ref(false);
const onImportFromMetaTemplate = () => {
  isVisible.value = !isVisible.value;

  metatemplatedetailtableData.value = [];
  // tempschema.value.description='';
  tempschema.value.properties = {};
  // tempschema.value.type =''
  // console.log("import other meta template");
};

const importfromstatic = () => {};
const isDisabled = ref(true);
const value1 = ref<number>(1);
const paperscale = ref(1);
const onAfterChange = (value: any) => {
  modeler.paper.scale(value);
  paperscale.value = value;
};
</script>

<template>
  <main>
    <header
      class="block shadow"
      style="padding: 0rem !important; margin-bottom: 0.2rem !important"
    >
      <a-row>
        <a-col span="18">
          <a-button-group>
            <a-button type="primary" @click="saveMBT(route)"> Save </a-button>
            <span style="margin-left: 5px">
              <a-button danger @click="reloadMBT(route)"> Reload </a-button>
            </span>
          </a-button-group>
        </a-col>
        <a-col span="4">
          <div class="icon-wrapper">
            <minus-circle-outlined />
            <a-slider
              v-model:value="value1"
              :min="0.2"
              :max="3"
              :step="0.2"
              @afterChange="onAfterChange"
            />
            <plus-circle-outlined />
          </div>
        </a-col>
      </a-row>
    </header>

    <section
      class="block shadow flex-center"
      style="
        width: 100%;
        height: 100%;
        min-height: 100%;
        color: var(--gray);
        font-size: 5rem;
        overflow: hidden;
        padding: 0rem !important;
      "
    >
      <a-row
        type="flex"
        style="width: 100%; height: 100%; min-height: 100%; padding: 0rem !important"
      >
        <a-col :span="1" style="padding: 0rem !important">
          <div class="stencil" ref="stencilcanvas"></div>
        </a-col>
        <a-col :span="23">
          <div class="canvas" ref="canvas"></div>
        </a-col>

        <!-- aw-panel -->
        <a-drawer
          width="50%"
          placement="right"
          :closable="false"
          :visible="visible"
          :get-container="false"
          :style="{ position: 'absolute', overflow: 'hidden' }"
          @close="onCloseDrawer"
        >
          <div class="infoPanel" ref="infoPanel" v-if="isAW">
            <a-tabs v-model:activeKey="awActiveKey">
              <a-tab-pane key="1" tab="Primary">
                <a-row>
                <a-col span ="18">
                <AForm
                  v-if="!hasAWInfo && isAW"
                  layout="inline"
                  class="search_form"
                  :model="formState"
                  @finish="handleFinish"
                  @finishFailed="handleFinishFailed"
                >
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
              </a-col>
              <a-col>
                    <span style="margin-right: 5px">
                      <a-button     
                        v-if="!hasAWInfo"                  
                        type="primary"
                        @click="onCloseDrawer()"
                        >Close</a-button
                      >
                    </span>

                    <a-button danger v-if="!hasAWInfo" @click="onBack()">Back</a-button>
                  </a-col>
                  </a-row>
                <div class="awtable" v-if="!hasAWInfo && isAW">
                  <a-row>
                    <a-table
                      bordered
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
                      <template #bodyCell="{ column, text, record }">
                        <template v-if="column.key === 'name'">
                          <div v-if="record._highlight">
                            <div v-if="record._highlight.name">
                              <a-button type="link" @click="showAWInfo(record)">
                                <p
                                  v-for="item in record._highlight.name"
                                  v-html="item"
                                ></p>
                              </a-button>
                            </div>
                            <div v-else>
                              <a-button type="link" @click="showAWInfo(record)">
                                {{ record.name }}</a-button
                              >
                            </div>
                          </div>
                          <div v-else>
                            <a-button type="link" @click="showAWInfo(record)">
                              {{ record.name }}</a-button
                            >
                          </div>
                        </template>
                        <template v-if="column.key === 'description'">
                          <div v-if="record._highlight">
                            <div v-if="record._highlight.description">
                              <p
                                v-for="item in record._highlight.description"
                                v-html="item"
                              ></p>
                            </div>
                            <div v-else>{{ record.description }}</div>
                          </div>
                          <div v-else>{{ record.description }}</div>
                        </template>
                        <template v-if="column.key === 'template'">
                          <div v-if="record._highlight">
                            <div v-if="record._highlight.template">
                              <p
                                v-for="item in record._highlight.template"
                                v-html="item"
                              ></p>
                            </div>
                            <div v-else>{{ record.template }}</div>
                          </div>
                          <div v-else>{{ record.template }}</div>
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
                  </a-row>
                  
                </div>
                <VueForm v-model="awformdata" :schema="awschema" v-if="isAW && hasAWInfo">
                  <div slot-scope="{ awformdata }">
                    <span style="margin-right: 5px">
                      <a-button type="primary" @click="awhandlerSubmit()"
                        >Submit</a-button
                      >
                    </span>
                    <span style="margin-right: 5px">
                      <a-button type="primary" @click="handlerCancel()">Edit</a-button>
                    </span>
                    <a-button danger @click="onExpectedAW()">Next</a-button>
                  </div>
                </VueForm>
              </a-tab-pane>

              <a-tab-pane key="2" tab="Expected" :disabled="isDisabled">
                <AForm
                  v-if="!hasAWExpectedInfo && isAW"
                  layout="inline"
                  class="search_form"
                  :model="formStateExpected"
                  @finish="handleFinishExpected"
                  @finishFailed="handleFinishFailed"
                >
                  <a-form-item :wrapper-col="{ span: 24 }">
                    <a-input v-model:value="formStateExpected.search" placeholder="aw">
                      <template #prefix>
                        <search-outlined />
                      </template>
                    </a-input>
                  </a-form-item>
                  <a-form-item :wrapper-col="{ span: 4 }">
                    <a-button type="primary" html-type="submit">search</a-button>
                  </a-form-item>
                </AForm>
                <div class="awtable" v-if="!hasAWExpectedInfo && isAW">
                  <a-table
                    bordered
                    row-key="record=>record._id"
                    :columns="columns"
                    :data-source="tableDataExpected"
                    class="components-table-demo-nested"
                    :pagination="paginationExpected"
                  >
                    <template #headerCell="{ column }">
                      <template v-if="column.key === 'name'">
                        <span>
                          <smile-outlined />
                          Name
                        </span>
                      </template>
                    </template>
                    <template #bodyCell="{ column, text, record }">
                      <template v-if="column.key === 'name'">
                        <div v-if="record._highlight">
                          <div v-if="record._highlight.name">
                            <a-button type="link" @click="showAWExpectedInfo(record)">
                              <p v-for="item in record._highlight.name" v-html="item"></p>
                            </a-button>
                          </div>
                          <div v-else>
                            <a-button type="link" @click="showAWExpectedInfo(record)">
                              {{ record.name }}</a-button
                            >
                          </div>
                        </div>
                        <div v-else>
                          <a-button type="link" @click="showAWExpectedInfo(record)">
                            {{ record.name }}</a-button
                          >
                        </div>
                      </template>
                      <template v-if="column.key === 'description'">
                        <div v-if="record._highlight">
                          <div v-if="record._highlight.description">
                            <p
                              v-for="item in record._highlight.description"
                              v-html="item"
                            ></p>
                          </div>
                          <div v-else>{{ record.description }}</div>
                        </div>
                        <div v-else>{{ record.description }}</div>
                      </template>
                      <template v-if="column.key === 'template'">
                        <div v-if="record._highlight">
                          <div v-if="record._highlight.template">
                            <p
                              v-for="item in record._highlight.template"
                              v-html="item"
                            ></p>
                          </div>
                          <div v-else>{{ record.template }}</div>
                        </div>
                        <div v-else>{{ record.template }}</div>
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

                  <a-button
                    v-if="isAW && hasAWExpectedInfo"
                    type="primary"
                    @click="onAWExpectedBack()"
                    >Back
                  </a-button>
                </div>
                <VueForm
                  v-model="awformdataExpected"
                  :schema="awschema"
                  v-if="isAW && hasAWExpectedInfo"
                >
                  <div slot-scope="{ awformdataExpected }">
                    <span style="margin-right: 5px">
                      <a-button type="primary" @click="handlerEditExpected()"
                        >Edit</a-button
                      >
                    </span>
                    <span style="margin-left: 5px">
                      <a-button danger @click="handlerClearExpected()">Clear</a-button>
                    </span>
                  </div>
                </VueForm>
              </a-tab-pane>
            </a-tabs>
          </div>

          <!-- link panel -->

          <div class="infoPanel" ref="infoPanel" v-if="isLink">
            <div style="margin: 5px; padding: 5px">
              <VueForm
                v-model="linkData"
                :schema="linkschema"
                @submit="linkhandlerSubmit"
                @cancel="onCloseDrawer"
              >
              </VueForm>
            </div>
          </div>

          <!-- Global panel -->

          <div class="infoPanel" v-if="isGlobal">
            <a-tabs v-model:activeKey="activeKey">
              <a-tab-pane key="1" tab="Meta">
                <div style="margin: 5px; padding: 5px">
                  <VueForm
                    v-if="isVisible"
                    v-model="metatemplatedetailtableData"
                    :schema="tempschema"
                    @submit="linkhandlerSubmit"
                    @cancel="onCloseDrawer"
                  >
                  </VueForm>
                </div>
                <a-table
                  v-if="isVisible"
                  :columns="metatemplatedetailcolumns"
                  :data-source="metatemplatedetailtableData"
                  bordered
                >
                  <template #headerCell="{ column }"> </template>
                  <template #bodyCell="{ column, text, record }">
                    <template v-if="column.key === 'name'">
                      <div>
                        {{ text }}
                      </div>
                    </template>
                    <template v-if="column.key === 'description'">
                      <div>
                        {{ text }}
                      </div>
                    </template>
                    <template v-if="column.key === 'type'">
                      <div>
                        {{ text }}
                      </div>
                    </template>
                  </template>
                </a-table>
                <a-space :size="10">
                  <a-button
                    style="margin-right: 10px"
                    v-if="isVisible"
                    type="link"
                    @click="onImportFromMetaTemplate"
                    >Back</a-button
                  >
                </a-space>
                <a-table
                  v-if="!isVisible"
                  :columns="metatemplatecolumns"
                  :data-source="metatemplatetableData"
                  bordered
                >
                  <template #bodyCell="{ column, text, record }">
                    <template v-if="column.key === 'name'">
                      <div>
                        <a-button type="link" @click="metatemplatequery(record._id)">{{
                          text
                        }}</a-button>
                      </div>
                    </template>
                    <template v-if="column.key === 'description'">
                      <div>
                        {{ text }}
                      </div>
                    </template>
                    <template v-if="column.key === 'tags'">
                      {{ text }}
                    </template>
                  </template>
                </a-table>
                <div class="awtable">
                  <a v-if="isMetaTemplateEmpty" href="/#/templatemanager/meta">
                    Jump to Meta Template
                  </a>
                  <a-button
                    v-if="!isMetaTemplateEmpty && isVisible"
                    type="primary"
                    @click="globalhandlerSubmit"
                    >保存</a-button
                  >
                </div>
              </a-tab-pane>
              <a-tab-pane key="2" tab="Attributes" force-render>
                <a-card style="overflow-y: auto">
                  <div style="padding: 5px">
                    <VueForm
                      v-model="globalformData"
                      :schema="globalschema"
                      @submit="globalhandlerSubmit"
                      @cancel="onCloseDrawer"
                      v-if="isGlobal"
                    >
                    </VueForm>
                  </div>
                </a-card>
              </a-tab-pane>
              <a-tab-pane key="3" tab="Data Pool">
                <a-radio-group v-model:value="templatevalue" :options="templateOptions" />

                <a-collapse v-model:activeKey="metaActiveKey">
                  <a-collapse-panel key="1" header="Input directly">
                    <dynamic-table></dynamic-table>
                  </a-collapse-panel>
                  <a-collapse-panel key="2" header="Import From Template">
                    <a-button type="primary" @click="importfromstatic()">Import</a-button>
                  </a-collapse-panel>
                </a-collapse>
              </a-tab-pane>
              <a-tab-pane key="4" tab="Resources">
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
                          <a-typography-link @click="resourcessave(record.key)"
                            >Save</a-typography-link
                          >
                          <a-popconfirm
                            title="Sure to cancel?"
                            @confirm="resourcescancel(record.key)"
                          >
                            <a>Cancel</a>
                          </a-popconfirm>
                        </span>
                        <span v-else>
                          <a @click="resourcesedit(record.key)">Edit</a>
                        </span>
                        <span>
                          <a-popconfirm
                            v-if="resourcesdataSource.length"
                            title="Sure to delete?"
                            @confirm="onresourcesDelete(record.key)"
                          >
                            <a> Delete</a>
                          </a-popconfirm>
                        </span>
                      </div>
                    </template>
                  </template>
                </a-table>
                <a-button type="primary" @click="globalhandlerSubmit">保存</a-button>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-drawer>
      </a-row>
    </section>
  </main>
</template>

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
  margin: 0px;
  min-width: 58px;
  width: 60px;
  background-color: #222222;
}

.split-wrapper .scalable {
  width: 20px;
  max-width: 5vw;
  overflow: hidden;
}

.awtable {
  padding: 5px;
  display: flex !important;
  justify-content: flex-end;
  // flex-direction:column-reverse!important;
}

.search_form {
  width: 100%;
  padding: 5px;
}

.ant-drawer-body {
  overflow-x: hidden !important;
  padding: 0px !important;
}

.found-kw {
  color: red !important;
  font-weight: 600;
}

.ant-table-tbody > tr > td {
  padding: 3px 6px !important;
}

.icon-wrapper {
  position: relative;
  padding: 0px 30px;
}

.icon-wrapper .anticon {
  position: absolute;
  top: -2px;
  width: 16px;
  height: 16px;
  line-height: 1;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.25);
}

.icon-wrapper .anticon:first-child {
  left: 0;
}

.icon-wrapper .anticon:last-child {
  right: 0;
}
</style>
