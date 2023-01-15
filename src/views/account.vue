<script lang="ts">
export default { name: "UserManager" };
</script>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import {
  ref,
  reactive,
  defineComponent,
  UnwrapRef,
  onMounted,
  nextTick,
  watch,
  getCurrentInstance,
  computed,
  unref,
} from "vue";
import {
  CascaderProps,
  FormProps,
  SelectProps,
  Table,
  TableProps,
  TreeProps,
} from "ant-design-vue";
import {
  CheckCircleTwoTone,
  PlusOutlined,
  ExclamationCircleTwoTone,
  MailOutlined,
  UsergroupAddOutlined,
  TeamOutlined,
  UnlockOutlined,
} from "@ant-design/icons-vue";
import { SplitPanel } from "@/components/basic/split-panel";
import { message } from "ant-design-vue/es";
import request from "@/utils/request";
import http from "@/utils/http";
import { Rule } from "ant-design-vue/es/form";
import {
  tableSearch,
  FormState,
  paramsobj,
  ModelState,
  statesUserModel,
  statesTs,
  statesRole,
  clickobj,
  statesResource,
} from "./componentTS/usermodeler";
import _ from "lodash";
import type { ColumnsType } from "ant-design-vue/es/table/interface";
import { uuid } from "@/utils/Uuid";
import { Key } from "ant-design-vue/es/_util/type";
import accountManager from "@/locales/lang/zh-CN/routes/account";
import { CommonTable } from "@/components/basic/common-table";
import router from "@/router";
import type { MenuProps } from "ant-design-vue";
import cloneDeep from "lodash-es/cloneDeep";
import { RadioGroupProps } from "ant-design-vue";
import {
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  FileSearchOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons-vue";
const { t } = useI18n();
// 分页数据
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
  pageSizeOptions: ["10", "20", "50", "100", "200"],
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: any, range: any[]) =>
    t("component.table.pageTip", {
      head: range[0],
      tail: range[1],
      total: total,
    }),
  onShowSizeChange: (page: any, pageSize: any, target: string) => {
    pagination.current = page;
    pagination.pageSize = pageSize;
    query(target);
  },
  onChange: (page: number, pageSize: number) => {
    pagination.current = page;
    pagination.pageSize = pageSize;
    // if (props.fetchObj.url) query()
  },
});
let isUserModel = ref<boolean>(false);
let isResource = ref<boolean>(false);
let isRole = ref<boolean>(true);
let target = ref<String>("isRole");

// user table data
let userModelTable = ref<any>(null);

// role table data
let roleTable = ref<any>(null);
// let roleTable = ref<Array<any>>([])

let resourceTable = ref<any>(null);
const setTableData = (data: any, tableData: any) => {
  if (Array.isArray(data)) tableData.value = data;
  else {
    tableData.value = data.tableData;
    if (data.hasOwnProperty("currentPage"))
      pagination.current = data.currentPage;
    if (data.hasOwnProperty("pageSize")) pagination.pageSize = data.pageSize;
    if (data.hasOwnProperty("total")) pagination.total = data.total;
  }
};
const userColumns = [
  // { title: "name", width: 40, link: "custom", require: true },
  { title: "email", width: 120, key: "email" },
  { title: "role", width: 100, key: "role" },
  {
    title: "action",
    width: 100,
    dataIndex: "operation",
    key: "operation",
  },
];

const roleColumns: ColumnsType = [
  { title: "role", dataIndex: "rolename", key: "rolename" },

  {
    title: "action",

    key: "operation",

  }
];

const resourceAuthColumns = [
  { title: "resource", dataIndex: "resource", key: "resource" },
  // { title: "resourceId", dataIndex: "resourceId", key: "resourceId" },
  { title: "method", dataIndex: "method", key: "method" },
  // { title:"methodId",dataIndex:"methodId",key:"methodId"},
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
  },
];

const viewColumns = [
  { title: "view", dataIndex: "view", key: "view" },
  // { title: "resourceId", dataIndex: "resourceId", key: "resourceId" },
  { title: "visible", dataIndex: "visible", key: "visible" },
  // { title:"methodId",dataIndex:"methodId",key:"methodId"},
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
  },
];

const resourceColumns = [
  { title: "resource", dataIndex: "resourceName", key: "resourceName" },
  // { title: "type", dataIndex: "resourceType", key: "resourceType" },
  {
    title: "Action",
    dataIndex: "operation",
    key: "operation",
  },
];

interface resourceDataItem {
  key: number;
  resource?: string;
  _id?: string;
  method: string;
}

let innerData: resourceDataItem[] = [];


const userTableQuery = {
  url: "/api/users",
  searchText: "",
  //   createParams: 'dynamic'
  //   selection: {
  //     selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE]
  //   },
};

const roleTableQuery = {
  url: "/api/roles",
  searchText: "",
  //   createParams: 'dynamic'
  //   selection: {
  //     selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE]
  //   },
};

const go2Detail = (row: any) => {
  const url = `/users/${row._id}`;
  if (row.clickTar === "name") router.push(`${url}?canEdit=true`);
  else router.push(url);
};

const go2DetailRole = (row: any) => {
  const url = `/roles/${row._id}`;
  if (row.clickTar === "role") router.push(`${url}?canEdit=true`);
  else router.push(url);
};

const pageChange = (data: any, target: string) => {
  searchobj.page = data.current;
  searchobj.perPage = data.pageSize;
  query(target);
};


let searchobj: tableSearch = reactive({
  search: "",
  page: 1,
  perPage: 10,
  q: "",
  total: 0,
});

// async function query(data?: any) {
//   if (userModelTable.value && userModelTable.value.loading) {
//     userModelTable.value.loading = true;

//     const params: any = data || searchobj;

//     const rst = await http.get("/api/users");

//     userModelTable.value = rst.data.data;

//     userModelTable.value.loading = false;

//     return userModelTable;
//   }
// }

async function query(target: string) {

  let url = "";

  let tempTable = ref<any>(null);
  if (target == "isRole") {
    url = "/api/roles";
    tempTable = roleTable;
  } else if (target == "isUserModel") {
    url = "/api/users";
    tempTable = userModelTable;
  } else if (target == "isResource") {
    url = "/api/resource";
    tempTable = resourceTable;
  }

  const rst = await http.get(`${url}`);

  tempTable.value = rst.data.data;

  // innerData=rst.data.data.grantedResource
  // console.log("innerData:", rst.data.data);

  return tempTable;
}



const tabledom = ref();

onMounted(() => {
  // queryRole();
  // queryResource();
  query('isRole');
  query('isResource');
  query('isUserModel');
});

watch(
  { roleTable, resourceTable, userModelTable },
  () => {
    //     console.log('Role DataChanged')
  },
  {
    deep: true,
  }
);

const instance = getCurrentInstance();
// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
  q: "",
  search: "",
});

// 表单提交失败时的回调
const handleFinishFailed: FormProps["onFinishFailed"] = (errors: any) => { };
// 模态窗数据
const visible = ref<boolean>(false);
const showModal = () => {
  visible.value = true;
};

let searchInput = ref();
let cascder = ref(false);
let selectvalue: any = ref("");
let selectoptions: any = ref([
  {
    value: "name:",
    label: "name:",
  },
]);

let disable = ref(true);

// 关闭模态窗触发事件
const closemodel = (target: String) => {
  clear();
  visible.value = false;
};

// 添加功能的函数
let deleteId = "";

let returnInput = ref("");
let returnVisibal = ref(false);
let returnRef = ref();
let modelstates = ref<ModelState>({
  key: 0,
  name: "",
  rolename: "",
  grantedResource: {},
  _id: "",
});

// 清除模态窗数据
const clear = () => {
  modelstates.value = {
    name: "",
    rolename: "",
    grantedResource: {},
    _id: "",
  };

  (instance?.refs.refForm as any).resetFields();
};

// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  let reg = /^[a-zA-Z0-9\$][a-zA-Z0-9\d_]*$/;
  let reg1 = /^[\u4e00-\u9fa5_a-zA-Z0-9$]+$/;
  if (!value) {
    return Promise.reject(t("component.message.emptyName"));
  } else if (!reg.test(value) && !reg1.test(value)) {
    return Promise.reject(t("component.message.hefaName"));
  } else {
    let rst = await request.get("/api/roles", {
      params: { q: `rolename:${value}`, search: "" },
    });
    if (rst.data && rst.data.length > 0 && rst.data[0].name == value) {
      // message.error("Duplicate name")
      // modelstates.value.name=""
      return Promise.reject(t("component.message.depName"));
    } else {
      return Promise.resolve();
    }
  }
};

let rules: Record<string, Rule[]> = {
  name: [{ required: true, validator: checkName, trigger: "blur" }],
};
let refForm = ref();



async function saveRole(data: any) {
  let rst = await request.post("/api/roles", data);
}
async function saveUserModel(data: any) {
  let rst = await request.post("/api/users", data);
}
async function saveResource(data: any) {
  console.log("data   ", data);
  debugger;
  let rst = await request.put("/api/resource", data);
}

const handleOk = (data: any, target: String) => {
  if (target == "isRole") {
    refForm.value.validate().then(async () => {
      delete data._id;
      await saveRole(data).then(() => {
        visible.value = false;
        roleTable.value.loading = false;
        closemodel(target);
        message.success(t("component.message.addText"));
      });
    });
  } else if (target == "isResource") {
    debugger;
    refForm.value.validate().then(async () => {
      newTableData(data, 'isResource')

      visible.value = false;
      resourceTable.value.loading = false;
      closemodel(target);

    });
  } else if (target == "isUserModel") {
    refForm.value.validate().then(async () => {
      delete data._id;
      await saveUserModel(data).then(() => {
        visible.value = false;
        userModelTable.value.loading = false;
        closemodel(target);
        message.success(t("component.message.addText"));
      });
    });
  }
};
// const onFinishForm = (modelstates: any) => {
//   closemodel(target)
//     message.success(t('component.message.addText'))
//  };
const onFinishFailedForm = (errorInfo: any) => { };
// 添加的表单tags
let inputRef = ref();

// 删除功能
const confirm = async (obj: any, target: string) => {
  let url = "";

  let tempTable = ref<any>(null);
  if (target == "isRole") {
    url = "/api/roles";
    tempTable = roleTable;
  } else if (target == "isUserModel") {
    url = "/api/users";
    tempTable = userModelTable;
  } else if (target == "isResource") {
    url = "/api/resource";
    tempTable = resourceTable;
  }

  request.delete(`${url}/${obj._id}`).then(() => {
    const index = tempTable.value.indexOf(obj);
    tempTable.value.splice(index, 1);
    message.success(t("component.message.delText"));
  });
};

const wrapperCol = { span: 24, offset: 12 };


const handleFinish = () => {
  console.log("finish");
};
const handleClick: MenuProps["onClick"] = (e) => {
  // console.log('handle click', e);
};

async function queryUser(data?: any) {
  const rst = await http.get("/api/users");

  userModelTable.value = rst.data.data;

  // innerData=rst.data.data.grantedResource
  console.log("userdata:", rst.data.data);

  return userModelTable;
}

const viewRoles = (e: any) => {

  isRole.value = true;
  target.value = "isRole";
  isUserModel.value = false;
  isResource.value = false;
  query('isRole');
};
const viewUsers = (e: any) => {

  isRole.value = false;
  isUserModel.value = true;
  target.value = "isUserModel";
  isResource.value = false;
  query('isUserModel');
};

const viewResources = (e: any) => {

  isRole.value = false;
  isUserModel.value = false;
  isResource.value = true;
  target.value = "isResource";
};

let nameForm = ref();


// 添加的表单tags
let roleStates = ref<statesRole>({
  // tags 编辑变量
  rolename: "",
  inputVisible: false,
  inputValue: "",
});

let resourceStates = ref<statesResource>({
  resourceName: "",
  inputVisible: false,
  inputValue: "",
});
let userModelStates = ref<statesUserModel>({
  email: "",
  inputVisible: false,
  inputValue: "",
});
// 更新数据????
const updateTableData = (newData: any, target: string) => {
  let url = "";

  let tempTable = ref<any>(null);
  if (target == "isRole") {
    url = "/api/roles";
    tempTable = roleTable;
  } else if (target == "isUserModel") {
    url = "/api/users";
    tempTable = userModelTable;
  } else if (target == "isResource") {
    url = "/api/resource";
    tempTable = resourceTable;
  }
  // let url = "/api/roles";
  // if (!url) return;

  request
    .put(`${url}/${newData._id}`, newData)
    .then((res: any) => {
      const index = tempTable.value.indexOf(newData);
      tempTable.value.splice(index, 1, res);
      message.success(t("component.message.updateText"));
    })
    .catch((e) => message.error(t("component.message.updateErr")))
    .finally(() => {
      query(target)
      // if (target == "isRole") {
      //   query('isRole');
      // } else if (target == "isUserModel") {
      //   query('isUserModel');
      // } else if (target == "isResource") {
      //   query('isResource');
      // }
    });
};

// 更新数据



// 新建数据更新
const newTableData = (newData: any, target: string) => {
  let url = "";

  let tempTable = ref<any>(null);
  if (target == "isRole") {
    url = "/api/roles";
    tempTable = roleTable;
  } else if (target == "isUserModel") {
    url = "/api/users";
    tempTable = userModelTable;
  } else if (target == "isResource") {
    url = "/api/resource";
    tempTable = resourceTable;
  }
  console.log('temptable1:', tempTable)
  request
    .post(url, newData)
    .then((res: any) => {
      const index = tempTable.value.indexOf(newData);
      tempTable.value.splice(index, 1, res);
      console.log('temptable2:', tempTable)
      message.success(t("component.message.addText"));
    })
    .catch((e) => {
      newData.isNewRow = true;
      newData.editing = true;
    });
};





const resetStates = (target: string) => {
  if (target == 'isRole') {
    roleStates.value = {
      rolename: "",
      inputVisible: false,
      inputValue: "",
    };
  } else if (target == "isUserModel") {
    userModelTable.value = {
      email: "",
      inputVisible: false,
      inputValue: "",
    };
  } else if (target == "isResource") {
    resourceStates.value = {
      resourceName: "",
      inputVisible: false,
      inputValue: "",
    };
  }

};


const save = async (rowData: any, target: string) => {

  console.log("rowData:       ", rowData);
  let tempTable = ref<any>(null);
  if (target == "isRole") {

    tempTable = roleTable;
  } else if (target == "isUserModel") {

    tempTable = userModelTable;
  } else if (target == "isResource") {

    tempTable = resourceTable;
  }

  let nameValidate = !unref(nameForm) || (await unref(nameForm).validate());

  if (nameValidate) {
    const temp = tempTable!.value.filter((row: any) => row.editing)[0];
    console.log('temp.....temp....', temp);
    // debugger
    // if (target == "isRole") {
    //   temp.rolename = roleStates.value.rolename;
    // } else if (target == "isUserModel") {
    //   temp.email = userModelStates.value.email;
    // } else if (target == "isResource") {

    //   temp.resourceName = resourceStates.value.resourceName;
    // }
    temp.editing = false;
    delete rowData.isNewRow;

    if (rowData.isNewRow) delete rowData.isNewRow;
    if (rowData._id) {
      console.log("temp:", temp);
      updateTableData(temp, target);
      // updateTableData(rowData, target);
    } else {
      newTableData(temp, target);
      // newTableData(rowData, target);
    }
    resetStates(target);
  }
};

const save2 = async (rowData: any, target: string, authValue?:any) => {
  debugger
  console.log("rowData:       ", rowData),"  auth value:",authValue; 
  if(authValue){

  }
  let tempTable = ref<any>(null);
  if (target == "isRole") {

    tempTable = roleTable;
  } else if (target == "isUserModel") {

    tempTable = userModelTable;
  } else if (target == "isResource") {

    tempTable = resourceTable;
  }

  let nameValidate = !unref(nameForm) || (await unref(nameForm).validate());

  if (nameValidate) {
    const temp = tempTable!.value.filter((row: any) => row.editing)[0];
    console.log('temp.....temp....', temp);
    // debugger
    // if (target == "isRole") {
    //   temp.rolename = roleStates.value.rolename;
    // } else if (target == "isUserModel") {
    //   temp.email = userModelStates.value.email;
    // } else if (target == "isResource") {

    //   temp.resourceName = resourceStates.value.resourceName;
    // }
    temp.editing = false;
    delete rowData.isNewRow;

    if (rowData.isNewRow) delete rowData.isNewRow;
    if (rowData._id) {
      console.log("temp:", temp);
      updateTableData(temp, target);
      // updateTableData(rowData, target);
    } else {
      newTableData(temp, target);
      // newTableData(rowData, target);
    }
    resetStates(target);
  }
};



const cancel = (rowData: any, target: string) => {
  debugger
  let tempTable = ref<any>(null);
  if (target == "isRole") {

    tempTable = roleTable;
  } else if (target == "isUserModel") {

    tempTable = userModelTable;
  } else if (target == "isResource") {

    tempTable = resourceTable;
  }
  const flag = rowData.isNewRow;
  if (flag) {
    tempTable.value = tempTable.value.filter(
      (a: any) => !Object.is(rowData, a)
    );
  } else {
    const index = tempTable.value.indexOf(rowData);
    tempTable.value[index] = tempRow;
  }
  tempRow = null;
  resetStates(target);
};




// 暂存编辑的数据
let tempRow: any = null;

const isEditing = computed(() => {
  if (roleTable.value) {
    let editingRow = roleTable.value.reduce((total: any, row: any) => {
      if (row.editing) total++;
      return total;
    }, 0);
    return editingRow > 0;
  }
});

const isResourceEditing = computed(() => {
  if (resourceTable.value) {
    let editingRow = resourceTable.value.reduce((total: any, row: any) => {
      if (row.editing) total++;
      return total;
    }, 0);
    return editingRow > 0;
  }
});

const editRow = (rowData: any) => {
  if (isEditing.value) return message.warning(t("component.message.errTip1"));
  console.log("rowdata   ", rowData);
  //   if (!rowData.isNewRow) {
  //     emit('edit', rowData)
  //   } else {
  tempRow = cloneDeep(rowData);
  rowData.editing = true;
  roleStates.value.rolename = rowData.rolename || ""

  //   }
};

const editResourceRow = (rowData: any) => {
  debugger;
  if (isResourceEditing.value)
    return message.warning(t("component.message.errTip1"));
  console.log("rowdata  in resource ", rowData);
  //   if (!rowData.isNewRow) {
  //     emit('edit', rowData)
  //   } else {
  tempRow = cloneDeep(rowData);
  rowData.editing = true;
  resourceStates.value.resourceName = rowData.resourceName || "";

  //   }
};


// enum:['readonly','readwrite','writeexec','all'],
const options = [
  { label: "Read Write Execute", value: "all" },
  { label: "Read and Write", value: "readwrite" },
  { label: "Read Only", value: "readonly" }
 
];

const viewoptions= [
  { label: "Hide", value: false },
  { label: "Show", value: true },
   
];
// let index = 0;
// const items = ref(["MBTModeler", "AWModeler"]);
const authValue = ref("");
const visibleValue = ref("");

// {
//         "resource": {
//             "_id": "63b459ad40bee9edb4b1da7a",
//             "resourceName": "mbtmodeler",
//             "resourceType": "modeler",
//             "__v": 0
//         },
//         "method": "readonly",
//         "_id": "63bde71804def2a4502a52c7"
//     }


const onAuthChange =(e:any)=>{
  
      console.log('e value：'+ e.target.value);
      authValue.value = e.target.value;
  
    }
  
    const onVisibleChange=(e:any)=>{
  
  console.log('e value：'+ e.target.value);
  authValue.value = e.target.value;

}


</script>
<template>
  <main class="main">
    <div ref="leftRef" style="height: 100%" class="id">
      <SplitPanel>
        <template #left-content>
          <a-menu id="submenu" style="width: 256px" mode="inline" @click="handleClick">
            <a-menu-item key="1">
              <TeamOutlined />
              <a @click="viewRoles">{{ $t("common.roleManagement") }}</a>
            </a-menu-item>

            <a-menu-item key="2">
              <UnlockOutlined />
              <a @click="viewUsers">{{ $t("common.permissionManagement") }}</a>
            </a-menu-item>

            <a-menu-item key="3">
              <FolderOpenOutlined />
              <a @click="viewResources">{{
                $t("common.resourceManagement")
              }}</a>
            </a-menu-item>
          </a-menu>
        </template>
        <template #right-content>
          <!-- 表单的查询 -->
          <a-row>
            <a-col :span="20">
              <AForm v-if="isUserModel" layout="inline" class="search_form" :model="formState" @finish="handleFinish"
                @finishFailed="handleFinishFailed" :wrapperCol="wrapperCol">
                <a-col :span="4">
                  <a-button type="primary" html-type="submit">{{
                    $t("common.searchText")
                  }}</a-button>
                </a-col>
              </AForm>
            </a-col>
            <a-col :span="2"><a-button type="primary" @click="showModal">
                <template #icon><plus-outlined /></template></a-button>
            </a-col>
          </a-row>
          <!-- --  {{isUserModel  }}++++{{ userModelTable }}xxxx -->
          <a-table v-if="isUserModel" :columns="userColumns" :data-source="userModelTable"
            :row-key="(record: any) => record._id" class="components-table-demo-nested">
            <template #headerCell="{ column }">
              <!-- ---==={{ column }}===--- -->
              <template v-if="column.key === 'email'">
                <span style="color: #1890ff">{{ $t("account.email") }}</span>
              </template>
              <template v-else-if="column.key === 'role'">
                <span style="color: #1890ff">{{ $t("account.role") }}</span>
              </template>
              <template v-else-if="column.key === 'operation'">
                <span style="color: #1890ff">{{ $t("account.action") }}</span>
              </template>
            </template>
            <template #bodyCell="{ column, text, record, index }">
              <!-- ----==={{ column.key }}===--- -->
              <!-- -----{{ record }}---- -->
              <template v-if="column.key === 'email'">
                <template v-if="record.editing">
                  <a-form :model="record" ref="nameForm" :rules="rules">
                    <a-form-item name="email">
                      <a-input v-model:value="record.email" style="margin: -5px 0"></a-input>
                    </a-form-item>
                  </a-form>
                </template>
                <template v-else>
                  <a-tooltip placement="bottom" v-if="record.validationError">
                    <template #title>
                      <span>{{ record.validationError }}</span>
                    </template>
                    <exclamation-circle-outlined style="color: #c2953c; margin-right: 8px" />
                  </a-tooltip>

                  {{ record.email }}
                  <!-- <span>{{ text }}====</span> -->
                </template>
              </template>
              <template v-if="column.key === 'role'">
                <template v-if="record.editing">
                  <a-form :model="record" ref="nameForm" :rules="rules">
                    <a-form-item name="role">
                      <a-input v-model:value="record.role" style="margin: -5px 0"></a-input>
                    </a-form-item>
                  </a-form>
                </template>
                <template v-else>
                  <a-tooltip placement="bottom" v-if="record.validationError">
                    <template #title>
                      <span>{{ record.validationError }}</span>
                    </template>
                    <exclamation-circle-outlined style="color: #c2953c; margin-right: 8px" />
                  </a-tooltip>

                  {{ record.role?.rolename }}
                  <!-- <span>{{ text }}====</span> -->
                </template>
              </template>

              <template v-if="column.key === 'operation'">
                <div>
                  <span>
                    <span v-show="record.editing">
                      <a-tooltip placement="bottom">
                        <template #title>
                          <span>{{ $t("common.saveText") }}</span>
                        </template>
                        <check-circle-outlined @click="save(record, 'isRole')" class="icon--success-btn" />
                      </a-tooltip>
                      <a-divider type="vertical" />
                      <a-tooltip placement="bottom">
                        <template #title>
                          <span>{{ $t("common.cancelText") }}</span>
                        </template>
                        <close-circle-outlined @click="cancel(record, 'isUserModel')" class="icon--err-btn" />
                      </a-tooltip>
                    </span>
                    <a-divider type="vertical" />
                    <span v-show="!record.editing">
                      <a-tooltip placement="bottom">
                        <template #title>
                          <span>{{ $t("common.editText") }}</span>
                        </template>
                        <edit-outlined @click="editRow(record)" class="icon--primary-btn" />
                      </a-tooltip>
                      <a-divider type="vertical" />
                      <a-popconfirm :title="$t('component.message.sureDel')" :ok-text="$t('common.yesText')"
                        :cancel-text="$t('common.noText')" @confirm="confirm(record, 'isUserModel')">
                        <a-tooltip placement="bottom">
                          <template #title>
                            <span>{{ $t("common.delText") }}</span>
                          </template>
                          <delete-outlined class="icon--primary-btn" />
                        </a-tooltip>
                      </a-popconfirm>
                    </span>
                  </span>
                </div>
              </template>
            </template>
          </a-table>

          <!-- 模态窗 -->
          <div>
            <a-modal v-model:visible="visible" :title="
              modelstates._id
                ? $t('common.updateText')
                : $t('common.saveText')
            " :width="1300">
              <template #footer>
                <a-button @click="closemodel(target)">{{
                  $t("common.cancelText")
                }}</a-button>
                <a-button @click="handleOk(modelstates, target)" type="primary" class="btn_ok">{{
                  $t("common.okText")
                }}</a-button>
              </template>
              <a-form ref="refForm" :model="modelstates" name="basic" :rules="rules" :label-col="{ span: 6 }"
                :wrapper-col="{ span: 16 }" autocomplete="off">
                <a-form-item :label="$t('component.table.name')" name="rolename">
                  <a-input v-if="isRole" v-model:value="modelstates.rolename" />
                  <a-input v-else-if="isResource" v-model:value="modelstates.resourceName" />
                  <a-input v-else-if="isUserModel" v-model:value="modelstates.email" />
                  <!-- <span v-else>{{modelstates.name}}</span> -->
                </a-form-item>


              </a-form>

            </a-modal>
          </div>


          <!-- 表格的结构 role ??????  -->
          <div ref="tabledom">

            <a-table v-if="isRole" :columns="roleColumns" :data-source="roleTable"
              :row-key="(record: any) => record._id" class="components-table-demo-nested">
              <template #headerCell="{ column }">
                <template v-if="column.key === 'name'">
                  <span style="color: #1890ff">{{ $t("account.role") }}</span>
                </template>
                <template v-else-if="column.key === 'views'">
                  <span style="color: #1890ff">{{ $t("account.views") }}</span>
                </template>
                <template v-else-if="column.key === 'operation'">
                  <span style="color: #1890ff">{{ $t("account.action") }}</span>
                </template>
              </template>


              <template #bodyCell="{ column, text, record, index }">

                <template v-if="column.key === 'rolename'">
                  <template v-if="record.editing">
                    <a-form :model="record" ref="nameForm" :rules="rules">
                      <a-form-item name="rolename">
                        <a-input v-model:value="record.rolename" style="margin: -5px 0"></a-input>
                      </a-form-item>
                    </a-form>

                  </template>
                  <template v-else>
                    <a-tooltip placement="bottom" v-if="record.validationError">
                      <template #title>
                        <span>{{ record.validationError }}</span>
                      </template>
                      <exclamation-circle-outlined style="color: #c2953c; margin-right: 8px" />
                    </a-tooltip>

                    <span>{{ text }}</span>
                  </template>
                </template>




                <template v-if="column.key === 'operation'">
                  <div>
                    <span>
                      <span v-show="!record.editing">
                        <a-tooltip placement="bottom">
                          <template #title>
                            <span>{{ $t("common.editText") }}</span>
                          </template>
                          <edit-outlined @click="editRow(record)" class="icon--primary-btn" />
                        </a-tooltip>
                      </span>

                      <a-divider type="vertical" />
                      <span v-show="record.editing">
                        <a-tooltip placement="bottom">
                          <template #title>
                            <span>{{ $t("common.saveText") }}</span>
                          </template>
                          <check-circle-outlined @click="save(record, 'isRole')" class="icon--success-btn" />
                        </a-tooltip>
                        <a-divider type="vertical" />
                        <a-tooltip placement="bottom">
                          <template #title>
                            <span>{{ $t("common.cancelText") }}</span>
                          </template>
                          <close-circle-outlined @click="cancel(record, 'isRole')" class="icon--err-btn" />
                        </a-tooltip>
                      </span>
                      <a-divider type="vertical" />
                      <a-popconfirm :title="$t('component.message.sureDel')" :ok-text="$t('common.yesText')"
                        :cancel-text="$t('common.noText')" @confirm="confirm(record, 'isRole')">
                        <span v-show="!record.editing">
                          <a-tooltip placement="bottom">
                            <template #title>
                              <span>{{ $t("common.delText") }}</span>
                            </template>
                            <delete-outlined class="icon--primary-btn" />
                          </a-tooltip>
                        </span>
                      </a-popconfirm>
                    </span>
                  </div>
                </template>

              </template>
<!-- [
    {
        "resource": {
            "_id": "63b459ad40bee9edb4b1da7a",
            "resourceName": "mbtmodeler",
            "resourceType": "modeler",
            "__v": 0
        },
        "method": "readonly",
        "_id": "63bde71804def2a4502a52c7"
    }
] -->
              <template #expandedRowRender="{ record }">
                <a-table :columns="resourceAuthColumns" :data-source="record.grantedResource" :pagination="false"
                  bordered>
                  <template #headerCell="{ column }">
                    <template v-if="column.key === 'resource'">
                      <span style="color: #1890ff">{{
                        $t("account.resource")
                      }}</span>
                    </template>
                    <template v-else-if="column.key === 'method'">
                      <span style="color: #1890ff">{{
                        $t("account.method")
                      }}</span>
                    </template>
                    <template v-else-if="column.key === 'operation'">
                      <span style="color: #1890ff">{{
                        $t("account.action")
                      }}</span>
                    </template>
                  </template>

                  <template #bodyCell="{ column, text, record: any, index }">
      
                    <template v-if="column.key === 'resource'">

                        <span> {{ text.resourceName }}</span>

                    </template>

                    <template v-if="column.key === 'method'">
                      <a-space direction="vertical">

                   <template v-if="!record.editing">
                        <a-radio-group name="radioGroup" :value="text" >
                          
                          <a-radio :value="item.value" v-for="item in options" :key="item.value">
                            {{ item.label }}
                          </a-radio>
                        </a-radio-group>
                      </template>
                      <template v-else>
                        <a-radio-group name="radioGroup" :value="authValue"  @change="onAuthChange">
                          
                          <a-radio :value="item.value" v-for="item in options" :key="item.value">
                            {{ item.label }}
                          </a-radio>
                        </a-radio-group>
                        </template>

                        <!-- {{ text }} -->
                      </a-space>
                    </template>

                    <template v-if="column.key === 'operation'">
                      <div>
                        <span v-show="!record.editing">
                          <a-tooltip placement="bottom">
                            <template #title>
                              <span>{{ $t("common.editText") }}</span>
                            </template>
                            <edit-outlined @click="editRow(record)" class="icon--primary-btn" />
                          </a-tooltip>
                        </span>
                        <a-divider type="vertical" />
                        <span v-show="record.editing">
                          <a-tooltip placement="bottom">
                            <template #title>
                              <span>{{ $t("common.saveText") }}</span>
                            </template>
                            <check-circle-outlined @click="save2(record, 'isRole',authValue)" class="icon--success-btn" />
                          </a-tooltip>
                          <a-divider type="vertical" />
                          <a-tooltip placement="bottom">
                            <template #title>
                              <span>{{ $t("common.cancelText") }}</span>
                            </template>
                            <close-circle-outlined @click="cancel(record, 'isRole')" class="icon--err-btn" />
                          </a-tooltip>
                        </span>
                      </div>
                    </template>
                  </template>
                </a-table>
                ----{{ record.views }}----
                <a-table :columns="viewColumns" :data-source="record.views" :pagination="false"
                  bordered>
                  <template #headerCell="{ column }">
                    <template v-if="column.key === 'view'">
                      <span style="color: #1890ff">{{
                        $t("account.view")
                      }}</span>
                    </template>
                    <template v-else-if="column.key === 'visible'">
                      <span style="color: #1890ff">{{
                        $t("account.visible")
                      }}</span>
                    </template>
                    <template v-else-if="column.key === 'operation'">
                      <span style="color: #1890ff">{{
                        $t("account.action")
                      }}</span>
                    </template>
                  </template>

                  <template #bodyCell="{ column, text, record: any, index }">
      
                    <template v-if="column.key === 'view'">

                        <span> {{ text.view }}</span>

                    </template>

                    <template v-if="column.key === 'visible'">
                      <a-space direction="vertical">

                   <template v-if="!record.editing">
                        <a-radio-group name="radioGroup" :value="text" >
                          
                          <a-radio :value="item.value" v-for="item in viewoptions" :key="item.label">
                            {{ item.label }}
                          </a-radio>
                        </a-radio-group>
                      </template>
                      <template v-else>
                        <a-radio-group name="radioGroup" :value="visibleValue"  @change="onVisibleChange">
                          
                          <a-radio :value="item.value" v-for="item in viewoptions" :key="item.label">
                            {{ item.label }}
                          </a-radio>
                        </a-radio-group>
                        </template>

                        <!-- {{ text }} -->
                      </a-space>
                    </template>

                    <template v-if="column.key === 'operation'">
                      <div>
                        <span v-show="!record.editing">
                          <a-tooltip placement="bottom">
                            <template #title>
                              <span>{{ $t("common.editText") }}</span>
                            </template>
                            <edit-outlined @click="editRow(record)" class="icon--primary-btn" />
                          </a-tooltip>
                        </span>
                        <a-divider type="vertical" />
                        <span v-show="record.editing">
                          <a-tooltip placement="bottom">
                            <template #title>
                              <span>{{ $t("common.saveText") }}</span>
                            </template>
                            <check-circle-outlined @click="save2(record, 'isRole',authValue)" class="icon--success-btn" />
                          </a-tooltip>
                          <a-divider type="vertical" />
                          <a-tooltip placement="bottom">
                            <template #title>
                              <span>{{ $t("common.cancelText") }}</span>
                            </template>
                            <close-circle-outlined @click="cancel(record, 'isRole')" class="icon--err-btn" />
                          </a-tooltip>
                        </span>
                      </div>
                    </template>
                  </template>
                </a-table>
              </template>
            </a-table>

            <a-table v-if="isResource" :columns="resourceColumns" :data-source="resourceTable"
              :row-key="(record: any) => record._id" class="components-table-demo-nested">
              <template #headerCell="{ column }">
                <template v-if="column.key === 'resourceName'">
                  <span style="color: #1890ff">{{
                    $t("account.resource")
                  }}</span>
                </template>

                <template v-else-if="column.key === 'operation'">
                  <span style="color: #1890ff">{{ $t("account.action") }}</span>
                </template>
              </template>
              <template #bodyCell="{ column, text, record, index }">
                <template v-if="column.key === 'resourceName'">
                  <template v-if="record.editing">
                    <a-form :model="record" ref="nameForm" :rules="rules">
                      <a-form-item name="resourceName">
                        <a-input v-model:value="record.resourceName" style="margin: -5px 0"></a-input>
                      </a-form-item>
                    </a-form>
                  </template>
                  <template v-else>
                    <a-tooltip placement="bottom" v-if="record.validationError">
                      <template #title>
                        <span>{{ record.validationError }}</span>
                      </template>
                      <exclamation-circle-outlined style="color: #c2953c; margin-right: 8px" />
                    </a-tooltip>

                    <span>{{ text }}</span>
                  </template>
                </template>

                <template v-if="column.key === 'operation'">
                  <div>
                    <span>
                      <span v-show="!record.editing">
                        <a-tooltip placement="bottom">
                          <template #title>
                            <span>{{ $t("common.editText") }}</span>
                          </template>
                          <edit-outlined @click="editResourceRow(record)" class="icon--primary-btn" />
                        </a-tooltip>
                      </span>
                      <a-divider type="vertical" />
                      <span v-show="record.editing">
                        <a-tooltip placement="bottom">
                          <template #title>
                            <span>{{ $t("common.saveText") }}</span>
                          </template>
                          <check-circle-outlined @click="updateTableData(record, 'isResource')"
                            class="icon--success-btn" />
                        </a-tooltip>
                        <a-divider type="vertical" />
                        <a-tooltip placement="bottom">
                          <template #title>
                            <span>{{ $t("common.cancelText") }}</span>
                          </template>
                          <close-circle-outlined @click="cancel(record, 'isResource')" class="icon--err-btn" />
                        </a-tooltip>
                      </span>
                      <a-divider type="vertical" />
                      <a-popconfirm :title="$t('component.message.sureDel')" :ok-text="$t('common.yesText')"
                        :cancel-text="$t('common.noText')" @confirm="confirm(record, 'isResource')">
                        <span v-show="!record.editing">
                          <a-tooltip placement="bottom">
                            <template #title>
                              <span>{{ $t("common.delText") }}</span>
                            </template>
                            <delete-outlined class="icon--primary-btn" />
                          </a-tooltip>
                        </span>
                      </a-popconfirm>
                    </span>
                  </div>
                </template>

              </template>
            </a-table>
          </div>
        </template>
      </SplitPanel>

      <!-- </section> -->
    </div>
  </main>
</template>

<style scoped lang="postcss">
.main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.ant-table-wrapper {
  margin-top: 1.875rem;
}

.right-content {
  padding: 1.25rem 0;
}

.ant-form-item {
  margin-bottom: 1.25rem;
}

.btn_ok {
  width: 4.375rem;
}

.formPar {
  display: flex;
  justify-content: center;
  margin-top: -1.25rem;
}

.searchForm {
  margin-right: 0.75rem;
}
</style>
<style lang="less">
.validationError {
  background-color: bisque;
}

.rightMenu {
  width: 5.8rem !important;
  height: 2.15rem !important;
  border: 0.0625rem solid antiquewhite;
  border-right: 0.0625rem solid antiquewhite !important;
  // background-color: antiquewhite !important;
  font-size: 0.75rem;
  box-shadow: -4px 4px 4px -5px rgba(0, 0, 0, 0.35),
    2px 3px 4px -5px rgba(0, 0, 0, 0.35);

  .ant-menu-item {
    width: 96%;
    text-align: center !important;
    padding: 0 0 !important;
    height: 1.575rem;
    background-color: #fff;
  }
}

.found-kw {
  color: red !important;
  font-weight: 600;
}

.iconsave {
  margin-left: 1rem;
  width: 3.125rem !important;
  font-size: 1.25rem !important;
}

.ant-dropdown-trigger {
  min-width: 30px;
  display: block;
}

// .exampleEnum{
//   // width:400px
// }
</style>
