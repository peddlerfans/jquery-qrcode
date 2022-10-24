<script setup lang="ts">
import request from "@/utils/request";
import useTable from "@/composables/useTable";
import { mockMBTUrl, realMBTUrl } from "@/appConfig";
import * as _ from "lodash";
import { Stores } from "../../types/stores";
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
  nextTick
} from "vue";
import type { FormProps, SelectProps, TableProps, TreeProps } from "ant-design-vue";
import { tableSearch, FormState } from "@/views/componentTS/mbtmodeler";

import { PlusOutlined, EditOutlined } from "@ant-design/icons-vue";

import {
  getTemplate,
  getAllTemplatesByCategory,
  IColumn,
  IJSONSchema,
  getTemplatePreview,
  transfer2Table
} from "@/api/mbt/index";
import { tableDataSource } from "@/composables/getTable";
const emit = defineEmits<{
  (e: "submitTemplate", value: object): void;
  (e:"update",value:object):void;
}>();
const props = defineProps<{
  templatedetailtableData?: object;
  templateCategory?: number;
  templatecolumns?: IColumn[];
  // metatemplatetableData?:[]
}>();
//Setting url for data fetching
// const url=mockMBTUrl;
let url: string = "";
let columnsOrigin=ref([
    { title: "name", dataIndex: "name", key: "name", width: 40 },
    { title: "description", dataIndex: "description", key: "description", width: 120 },
    {
      title: "tags",
      dataIndex: "tags",
      key: "tags",
      width: 100,
      customRender: (opt:any) => {
        if (_.isArray(opt.value)) {
          return opt.value.toString();
        } else return opt.value;
      },
    }   
  ])

let templateCategory = ref(props.templateCategory);

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

const {
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
  columns:columnsOrigin.value,
  updateTableOptions: {
    fetchUrl: url,
  },
});

onBeforeMount(() => {
  updateTable();
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

/**
 * Search the result
 */
const handleFinish: FormProps["onFinish"] = (values: any) => {
  let fetchUrl = "";
  if (formState && formState.search.toString().substring(0, 6) == "@tags:") {
    fetchUrl =
      url +
      `?q=tags:` +
      formState.search.substring(6, formState.search.length).toUpperCase().trim();
  } else {
    fetchUrl = url + `?search=` + formState.search;
  }

  updateTable({ fetchUrl: fetchUrl });
};
const handleFinishFailed: FormProps["onFinishFailed"] = (errors: any) => {
  console.log(errors);
};


onMounted(() => {
  // console.log("datasource111:", dataSource);
  let category = templateCategory!.value;
  // console.log("category:", category);
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

      dataSource.value = temparr;
    }
    //   console.log('datasource:',dataSource)
  });
  //   query();
});

function showDetailInfo(data:any){
    // console.log('......',data)
    if(data && data._id && data.category=='dynamic'){
        getTemplatePreview(data._id).then((dat:any)=>{
            // console.log(',,,,,,,,',dat)
            let cust_columns = transfer2Table(dat);
            // console.log('data:,,,,,,,,',dat,'columns:',cust_columns);
            columnsOrigin.value = cust_columns;
            dataSource.value = dat;
            // columnsOrigin.value = dat.model.schema;
        })
    }else if(data && data._id && data.category == 'static'){
        // console.log(data.model)
        if(data.model){
            dataSource.value = data.model.data;
            columnsOrigin.value = data.model.schema;
        }else{
            console.log('Pleaes define the params in static template.')
        }
        
    }
    

}
// 修改功能4
// 修改函数
// async function updateMBT(url: string, data: any) {
//   let rst = await request.put(url, data)
//   // console.log(rst);
// }
// let refForm = ref(null)

//     async function saveMBT(data: any) {

//       return new Promise((resolve, reject) => {
//         request.post(url, data).then(res => {
//           console.log('post successfully',res);

//         }).catch(function (error) {
//           if (error.response.status == 409) {
//             message.error("Duplicate name or description")
//           }
//         });
//       })

//   }
// }
interface statesTs {
  enums: Array<string>
  inputVisible: Boolean;
  inputValue: string
}
// 添加的表单tags
let states = reactive<statesTs>({
  enums: [],
  inputVisible: false,
  inputValue: '',
});
function HandleSubmit() {
  let obj = {};
  Object.assign(obj, { tableData: dataSource.value });
  Object.assign(obj, { tableColumns: columnsOrigin.value });
  emit("update", obj);
}

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
      bordered
      @resizeColumn="tableResize"
      
    >
    <!-- :rowSelection="{ selectedRowKeys, onChange: onTableRowSelectChange }" -->
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>            
            Name
          </span>
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
    <a-button type="primary" @click="HandleSubmit()">Save</a-button>
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
