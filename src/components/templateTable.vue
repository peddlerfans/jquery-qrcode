<script setup lang="ts">
import request from "@/utils/request";
import useTable from "@/composables/useTable";
import { mockMBTUrl, realMBTUrl } from "@/appConfig";
import * as _ from "lodash";
import { useRoute } from "vue-router";
import {
  ref,
  watch,
  reactive,
  UnwrapRef,
  computed,
  onBeforeMount,
  toRaw,
  onMounted,
  onUpdated,
  nextTick,
} from "vue";
import { FormProps, message, SelectProps, TableProps, TreeProps } from "ant-design-vue";
import { tableSearch, FormState } from "@/views/componentTS/mbtmodeler";

import { PlusOutlined, EditOutlined } from "@ant-design/icons-vue";

import {
  getTemplate,
  getAllTemplatesByCategory,
  IColumn,
  IJSONSchema,
  getTemplatePreview,
  transfer2Table,
} from "@/api/mbt/index";
import { tableDataSource } from "@/composables/getTable";
import { ColumnsType } from "ant-design-vue/es/table";
const emit = defineEmits<{
  (e: "submitTemplate", value: object): void;
  (e: "update", value: object): void;
  (e: "clear", value: object): void;
}>();
const props = defineProps<{
  templatedetailtableData?: object;
  tableData?: never[];
  tableColumns?: any[];
  templateCategory?: number;
  // metatemplatetableData?:[]
}>();
//Setting url for data fetching
// const url=mockMBTUrl;
let tableData = ref(props.tableData);
let tableColumns = ref(props.tableColumns);
let templateCategory = ref(props.templateCategory);
let url: string = "";
let hasData = ref(false);
let columnsOrigin = ref();
columnsOrigin.value = [
  { title: "name", dataIndex: "name", key: "name", width: 40 },
  { title: "description", dataIndex: "description", key: "description", width: 120 },
  {
    title: "tags",
    dataIndex: "tags",
    key: "tags",
    width: 100,
    customRender: (opt: any) => {
      if (_.isArray(opt.value)) {
        return opt.value.toString();
      } else return opt.value;
    },
  },
];
let columnsOrigin2 = ref([
  { title: "name", dataIndex: "name", key: "name", width: 40 },
  { title: "description", dataIndex: "description", key: "description", width: 120 },
  {
    title: "tags",
    dataIndex: "tags",
    key: "tags",
    width: 100,
    customRender: (opt: any) => {
      if (_.isArray(opt.value)) {
        return opt.value.toString();
      } else return opt.value;
    },
  },
]);

const tableRef = ref();
let searchobj: tableSearch = reactive({
  search: "",
  size: 20,
  page: 1,
  perPage: 20,
});
// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
  search: "",
});

let {
  dataSource,
  columns,
  originColumns,
  tableLoading,
  pagination,
  // selectedRowKeys,
  updateTable,
  onTableRowSelectChange,
  tableResize,
} = useTable({
  table: tableRef,
  columns: columnsOrigin.value,
  updateTableOptions: {
    fetchUrl: url,
  },
});

onBeforeMount(() => {
  if (tableData && templateCategory.value == 1) {
    hasData.value = true;
    // console.log("********tableData,", tableData,'templateCategory.value :',templateCategory.value );
    
    dataSource.value = tableData.value as never[];
    let cust_columns = tableColumns.value;
    columnsOrigin.value = cust_columns;
    // console.log("......columns:", columns);
    // console.log("......datasource:", dataSource);
  } else {
    
    updateTable();
    
  }
});

async function query(data?: any) {
  let rst;
  if (data && data.search.toString().substring(0, 6) == "@tags:") {
    rst = await request.get(
      url + `?q=tags:` + data.search.substring(6, data.search.length).toUpperCase().trim()
    );
  } else {
    rst = await request.get(url, { params: data || searchobj });
  }

  if (rst.data) {
    // console.log('rst:', rst.data)

    dataSource.value = rst.data;
    return rst.data;
  }
}
const route = useRoute();
onMounted(() => {
  

  let savedDataInfo = localStorage.getItem("mbt_" + route.params._id + route.params.name);
  
  if (_.isString(savedDataInfo)) {
    let tempObj = JSON.parse(savedDataInfo);
    let searchParam: string = "";
    if (
      tempObj.dataDefinition &&
      tempObj.dataDefinition.data &&
      tempObj.dataDefinition.data.tableData.length > 0
    ) {
      dataSource.value = tempObj.dataDefinition.data.tableData;
      columnsOrigin.value = tempObj.dataDefinition.data.tableColumns;
      if (
        templateCategory.value == 1 &&
        tempObj.dataDefinition.data.dataFrom == "static_template"
      ) {
       
        searchParam = "dynamic";

        getAllTemplatesByCategory(searchParam).then((rst: any[]) => {
          if (rst.length > 0) {
            let temparr = rst;
            dataSource.value = temparr;
            columnsOrigin.value = columnsOrigin2.value;
          }
        });
      } else if (
        templateCategory.value == 2 &&
        tempObj.dataDefinition.data.dataFrom == "dynamic_template"
      ) {
        searchParam = "static";

        getAllTemplatesByCategory(searchParam).then((rst: any[]) => {
          if (rst.length > 0) {
            let temparr = rst;
            dataSource.value = temparr;
            columnsOrigin.value = columnsOrigin2.value;
          }
        });
      }
    } else {
      let category = templateCategory!.value;
      // console.log("category:", category);
      // searchParam: string = "";
      if (dataSource) {
        // console.log("Read data from backend");
      } else {
        if (category == 1) {
          searchParam = "dynamic";
          url = `/api/templates?q=category:dynamic&search=`;
        } else if (category == 2) {
          searchParam = "static";
          url = `/api/templates?q=category:static&search=`;
        }
        getAllTemplatesByCategory(searchParam).then((rst: any[]) => {
          if (rst.length > 0) {
            let temparr = rst;
            dataSource.value = temparr;
            
          }
          //   console.log('datasource:',dataSource)
        });
      }
    }
  }
});

function showDetailInfo(data: any) {
  
  if (data && data._id && data.category == "dynamic") {
    hasData.value = true;
    getTemplatePreview(data._id).then((dat: any) => {
  
      let cust_columns = transfer2Table(dat);
  
      columnsOrigin.value = cust_columns;
      dataSource.value = dat;
      // columnsOrigin.value = dat.model.schema;
    }).catch(()=>{
      message.warning("Please configure this template first")
    });
  } else if (data && data._id && data.category == "static") {
    // console.log(data.model)
    if (data.model) {
      dataSource.value = data.model.data;
      columnsOrigin.value = data.model.schema;
    } else {
      message.warning("Pleaes define the params in static template.");
    }
  }
}

interface statesTs {
  enums: Array<string>;
  inputVisible: Boolean;
  inputValue: string;
}
// 添加的表单tags
let states = reactive<statesTs>({
  enums: [],
  inputVisible: false,
  inputValue: "",
});
function HandleSubmit() {
  let obj = {};
  Object.assign(obj, { tableData: dataSource.value });
  Object.assign(obj, { tableColumns: columnsOrigin.value });
  emit("update", obj);
}

function HandleClear() {
  let obj = {};
  emit("clear", obj);
  dataSource.value = [];
  columnsOrigin.value = [];
  chooseTemplate.value = true;
  hasData.value = false;
}
const chooseTemplate = ref(true);
const chooseTemplateFunc = () => {
  
  let category = templateCategory!.value;
  
  let searchParam: string = "";
  if (category == 1) {
    searchParam = "dynamic";
    url = `/api/templates?q=category:dynamic&search=`;
  } else if (category == 2) {
    searchParam = "static";
    url = `/api/templates?q=category:static&search=`;
  }
  getAllTemplatesByCategory(searchParam).then((rst: any[]) => {
    if (rst.length > 0) {
      let temparr = rst;
      columnsOrigin.value = columnsOrigin2.value;
      dataSource.value = temparr;
    }
   
  });
  chooseTemplate.value=true
  updateTable();
};
</script>

<template>
  <main style="height: 100%; overflow-x: hidden !important">
    <ATable
      ref="tableRef"
      class="table"
      rowKey="key"
      :dataSource="dataSource"
      :columns="columnsOrigin"
      :pagination="pagination"
      :loading="tableLoading"
      :scroll="{ x: true }"
      bordered
      @resizeColumn="tableResize"
    >
      <!-- :rowSelection="{ selectedRowKeys, onChange: onTableRowSelectChange }" -->
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span> Name </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a-button type="link" @click="showDetailInfo(record)">
            {{ record.name }}
          </a-button>
          <!-- <a :href="`/#/mbtmodeler/${record._id}/${record.name}`">{{ record.name }}</a> -->
        </template>

        <template v-else-if="column.key === 'description'">
          {{ record.description }}
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
      </template>
    </ATable>
    <div>
      <a-button style="margin-right: 5px" type="primary" @click="HandleSubmit()"
        >Save</a-button
      >

      <a-button
        v-if="chooseTemplate"
        style="margin-right: 5px"
        type="link"
        @click="chooseTemplateFunc()"
        >Choose A Template</a-button
      >
      
      <!-- <a-button v-if="!chooseTemplate && hasData" danger @click="HandleClear()"
        >Clear</a-button
      > -->
    </div>
    <!-- </section> -->
  </main>
</template>
<style lang="postcss" scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  margin-bottom: 1rem;
}

footer {
  margin-top: 1rem;
}

∏ .table {
  width: 100%;
  height: 100px;
  flex: 1;
  background-color: #fff;
  border-radius: 0.7rem;
}
</style>
