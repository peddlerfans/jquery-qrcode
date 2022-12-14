<script setup lang="ts">
import VueForm from "@lljj/vue3-form-ant";
import _ from "lodash";
import { ref, onMounted, toRaw, watch } from "vue";

import { getAllTemplatesByCategory,IColumn,IJSONSchema } from "@/api/mbt/index";
import {string2Obj, checkDataStructure} from "@/views/componentTS/schema-constructor";
import request from "@/utils/request";
import {generateSchema} from "@/utils/jsonschemaform";
import { MbtData } from "@/stores/modules/mbt-data";

const store = MbtData()

const emit = defineEmits<{
  (e: "submitTemplate", value: object): void;
}>();

const props = defineProps<{
  isFormVisible?: boolean;
  metatemplatedetailtableData?: object;
  schema?: IJSONSchema;
  metaformProps?: object;
  metatemplatecolumns?: IColumn[];
}>();
const formExpectedFooter = {
  show: false, // 是否显示默认底部
};

let tempschema = ref(props.schema);
let uiSchema = ref({})

function setSchema (schema: any, uiSchema: any) {
  const temp = string2Obj(tempschema.value, uiSchema.value)
  tempschema.value = temp.schema
  uiSchema.value = temp.uiSchema
}

setSchema(tempschema.value, uiSchema)
let metaformProps = ref(props.metaformProps);
const isFormVisible = ref(props.isFormVisible);
let metatemplatedetailtableData = ref(props.metatemplatedetailtableData);

watch(metatemplatedetailtableData, (val: any) => {
    for (let key in val) {
      if (Array.isArray(val[key]) && val[key].length > 1) {
        val[key] = [val[key].pop()]
      }
    }
  }, {
    deep: true
  }
)

let metatemplatecolumns = ref(props.metatemplatecolumns);
let metatemplatetableData = ref([]);

const isMetaTemplateEmpty = ref(false);

onMounted(() => {
  
  getAllTemplatesByCategory('meta').then((rst: any[]) => {
    if (rst.length > 0) {
      isMetaTemplateEmpty.value = false;
      let temparr = rst;

      metatemplatetableData.value = temparr as never[];
    }
  });
});

function submitTemplate() {
  let metaObj = {};
  Object.assign(metaObj, { schema: toRaw(tempschema.value) });
  Object.assign(metaObj, { data: toRaw(checkDataStructure(metatemplatedetailtableData.value)) });
  Object.assign(metaObj, { detail: store.getMetaData.detail });
  emit("submitTemplate", metaObj);
}

async function getTemplate(metaId: string, category: string) {
  let currentschema = {
    type: "object",
    properties: {},
  };
  let rst1 = await request.get(`/api/templates/${metaId}`, {
    params: {q: `category:${category}`, search: ""},
  });
  if (rst1.model) {
    let temparr = rst1.model;
    store.setMetaData(temparr, 'detail')
    store.setMetaData(rst1._id, '_id')
    let required: any[] = temparr.filter((a: any) => a.requerd).map((b: any) => b.description)
    Object.assign(currentschema, {required: required})
    if (_.isArray(temparr)) {
      let schemafileds = generateSchema(temparr,metaId);
      schemafileds.forEach((schemafield: any) => {
        Object.assign(currentschema.properties, schemafield);
      });
    }

    return string2Obj(currentschema, uiSchema.value).schema;
  }
}
const showJSONSchemeForm = (templdateId: string) => {
  isFormVisible.value = !isFormVisible.value;
  getTemplate(templdateId,'meta').then((schema: any) => {
    tempschema.value = schema;
  });
};

const onImportFromMetaTemplate = () => {
  isFormVisible.value = false;

  metatemplatedetailtableData.value = {};

  if (tempschema && tempschema.value) tempschema.value.properties = {};
};

// const backFormMetaTemplate=()=>{
//   isFormVisible.value=true
// }

</script>
<template>
  <div style="margin: 5px; padding: 5px">
    <VueForm
      v-if="isFormVisible"
      v-model="metatemplatedetailtableData"
      :schema="tempschema"
      :formProps="metaformProps"
      :formFooter="formExpectedFooter"
      :uiSchema="uiSchema"
    >
    </VueForm>
  </div>
  <a-table
    v-if="!isFormVisible"
    :columns="metatemplatecolumns"
    :data-source="metatemplatetableData"
    bordered
  >
    <template #bodyCell="{ column, text, record }">
      <template v-if="column.key === 'name'">
        <div>
          <a-button type="link" @click="showJSONSchemeForm(record._id)">{{
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
    <a-button type="primary" @click="submitTemplate">Save</a-button>
    <!-- <div> -->
      <a-button
      style="margin-right: 10px"
      v-if="isFormVisible"
      type="link"
      @click="onImportFromMetaTemplate"
      >Choose A Template</a-button>
  </div>
</template>

<style scoped>
.ant-form-item-control-input {
  min-height: auto;
}
</style>
