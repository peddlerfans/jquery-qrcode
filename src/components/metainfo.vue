<script setup lang='ts'>
import VueForm from "@lljj/vue3-form-ant";
import _ from "lodash";
import {ref,reactive} from 'vue';
import request from "@/utils/request";
import { message } from "ant-design-vue/es";
import { generateSchema, generateObj } from "@/utils/jsonschemaform";
interface IJSONSchema {
    type?:string,
    properties?:object
}
interface DataDefinition {
  data: object,
  meta: object,
  resources: object,
}
interface IColumn{
    title?: string,
    dataIndex?: string,
    key?: string,
    width?: number

}
const props = defineProps<{
    isVisible?: boolean
    metatemplatedetailtableData?:object
    schema?: IJSONSchema
    metaformProps?:object
    metaformFooter?:object
    metatemplatecolumns?:IColumn[]
    metatemplatetableData?:[]

}>()

// const metatemplatecolumns = reactive<Object[]>([
//   {
//     title: "name",
//     dataIndex: "name",
//     key: "name",
//     width: 180,
//   },
//   {
//     title: "description",
//     dataIndex: "description",
//     key: "description",
//     width: 180,
//   },
//   {
//     title: "tag",
//     dataIndex: "tag",
//     key: "tag",
//   },
// ]);

// let tempschema = ref({ 
//   type: "object",
//   properties: {},
// });
let tempschema = ref(props.schema);
let  metaformProps = ref(props.metaformProps)
let metaformFooter = ref(props.metaformFooter)
const isVisible = ref(props.isVisible);
let metatemplatedetailtableData = ref(props.metatemplatedetailtableData);
let metatemplatecolumns = ref(props.metatemplatecolumns)
let metatemplatetableData = ref(props.metatemplatetableData);
/** drawer  */
//drawer visible
const visible = ref(false);

let metatemplaterecordobj = ref();
const onCloseDrawer = () => {
  visible.value = false;
};
// const metaformProps = {
//   layoutColumn: 2,
//   labelPosition: "left",
//   labelWidth: "75px",
//   labelSuffix: ":  ",
// };
const isMetaTemplateEmpty = ref(true);
// let metaformFooter = ref({
//   show: false,
// });

const arr = (dataArr: any) =>
  dataArr.map((item: any, index: string) => ({ ...item, key: index }));
let cacheDataDefinition: DataDefinition = {
  data: {},
  meta: {},
  resources: [],
};
function globalhandlerSubmit() {
  // console.log(tempschema,metatemplatedetailtableData);
  let metaObj = {};
  Object.assign(metaObj, { schema: tempschema.value });
  Object.assign(metaObj, { data: metatemplatedetailtableData.value });
  cacheDataDefinition.meta = metaObj;
  onCloseDrawer();
  message.success("Save config Successfully");
}
const hasmultipleMetaTemplates = ref(false);
async function metatemplatequery(data?: any) {
  //  let rst=await request.get('/api/templates',{params:{q:'category:meta', search:data}})
  let currentschema = {
    type: "object",
    properties: {},
  };
  
  if (data) {
    isVisible.value = !isVisible.value;
  
    let rst1 = await request.get(`/api/templates/${data}`, {
      params: { q: "category:meta", search: "" },
    });
    // console.log("rst1:", rst1);
    metatemplaterecordobj.value = rst1;
    if (rst1.model) {
      metatemplaterecordobj.value.model = rst1.model;
  
      let temparr = rst1.model;
     
      if (_.isArray(temparr)) {
        let schemafileds = generateSchema(temparr);
        schemafileds.forEach((schemafield: any) => {
          Object.assign(currentschema.properties, schemafield);
        });
             
        tempschema.value = currentschema;
      
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

      })
      .finally(() => {
        // console.log("rst:", rst);
        if (rst.length > 0) {
          hasmultipleMetaTemplates.value = true;
        }
        return rst;
      });
  }

}
const onImportFromMetaTemplate = () => {
  isVisible.value = !isVisible.value;

  metatemplatedetailtableData.value = {};

  if (tempschema && tempschema.value) tempschema.value.properties = {};

};

</script>
<template>
    <div style="margin: 5px; padding: 5px">
                  <!-- {{tempschema}} -->
                  <!-- {{metatemplatedetailtableData}} -->
                  <VueForm
                    v-if="isVisible"
                    v-model="metatemplatedetailtableData"
                    :schema="tempschema"
                    :formProps="metaformProps"
                    :formFooter="metaformFooter"
                  >
                  </VueForm>
                </div>
                <a-space :size="10">
                  <a-button
                    style="margin-right: 10px"
                    v-if="isVisible"
                    type="link"
                    @click="onImportFromMetaTemplate"
                    >Choose A Template</a-button
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
                    >Save</a-button
                  >
                </div>
</template>