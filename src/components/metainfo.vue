<script setup lang="ts">
import VueForm from "@lljj/vue3-form-ant";
import _ from "lodash";
import { ref, onMounted, toRaw } from "vue";

import { getAllTemplatesByCategory,IColumn,IJSONSchema } from "@/api/mbt/index";
import {string2Obj} from "@/views/componentTS/schema-constructor";
import request from "@/utils/request";
import {generateSchema} from "@/utils/jsonschemaform";
// const emit = defineEmits(['submitTemplate'])
const emit = defineEmits<{
  (e: "submitTemplate", value: object): void;
}>();


const props = defineProps<{
  isFormVisible?: boolean;
  metatemplatedetailtableData?: object;
  schema?: IJSONSchema;
  metaformProps?: object;

  metatemplatecolumns?: IColumn[];
  // metatemplatetableData?:[]
}>();
const formExpectedFooter = {
  show: false, // 是否显示默认底部
};

let tempschema = ref(props.schema);
// tempschema.value = string2Obj(tempschema.value)
let metaformProps = ref(props.metaformProps);
const isFormVisible = ref(props.isFormVisible);
let metatemplatedetailtableData = ref(props.metatemplatedetailtableData);
console.log(metatemplatedetailtableData.value)
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
  Object.assign(metaObj, { data: toRaw(metatemplatedetailtableData.value) });
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
    let required: any[] = temparr.filter((a: any) => a.requerd).map((b: any) => b.description)
    Object.assign(currentschema, {required: required})
    if (_.isArray(temparr)) {
      let schemafileds = generateSchema(temparr);
      schemafileds.forEach((schemafield: any) => {
        Object.assign(currentschema.properties, schemafield);
      });
    }

    return string2Obj(currentschema, temparr);
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
    >
    </VueForm>
  </div>
  <!-- <a-space :size="10">
    <a-button
      style="margin-right: 10px"
      v-if="isFormVisible"
      type="link"
      @click="onImportFromMetaTemplate"
      >Choose A Template</a-button
    >
  </a-space> -->
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
      <!-- <a-button
      style="margin-right: 10px"
      v-if="!isFormVisible"
      danger
      @click="backFormMetaTemplate"
      >Back</a-button> -->
    <!-- </div> -->
  </div>
</template>
