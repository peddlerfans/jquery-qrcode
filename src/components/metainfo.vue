<script setup lang="ts">
import VueForm from "@lljj/vue3-form-ant";
import _ from "lodash";
import { ref, onMounted, toRaw } from "vue";

import { getTemplate, getAllTemplatesByCategory,IColumn,IJSONSchema } from "@/api/mbt/index";
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
console.log(props.isFormVisible ,props.metatemplatedetailtableData,props.metaformProps);

let tempschema = ref(props.schema);
let metaformProps = ref(props.metaformProps);
const isFormVisible = ref(props.isFormVisible);
let metatemplatedetailtableData = ref(props.metatemplatedetailtableData);
let metatemplatecolumns = ref(props.metatemplatecolumns);
let metatemplatetableData = ref([]);

const isMetaTemplateEmpty = ref(false);

onMounted(() => {
  
  getAllTemplatesByCategory('meta').then((rst: any[]) => {
    //   console.log(rst)
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
  console.log(metatemplatedetailtableData.value);
  
  emit("submitTemplate", metaObj);
}

const showJSONSchemeForm = (templdateId: string) => {
  isFormVisible.value = !isFormVisible.value;
  getTemplate(templdateId,'meta').then((schema: any) => {
    tempschema.value = schema;
  });
};

const onImportFromMetaTemplate = () => {
  isFormVisible.value = false;

  // metatemplatedetailtableData.value = {};

  // if (tempschema && tempschema.value) tempschema.value.properties = {};
};

const backFormMetaTemplate=()=>{
  isFormVisible.value=true
}

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
  <main style="height: 100%; overflow-x: hidden !important">
  <a-table
    v-if="!isFormVisible"
    :columns="metatemplatecolumns"
    :data-source="metatemplatetableData"
    bordered
    :scroll="{ x: true }"
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
  </main>

    <a v-if="isMetaTemplateEmpty" href="/#/templatemanager/meta">
      Jump to Meta Template
    </a>
    <a-button type="primary" @click="submitTemplate">Save</a-button>
    <!-- <div> -->
      <a-button
      style="position: absolute; top: -2.25rem; right: 0;"
      v-if="isFormVisible"
      type="primary"
      @click="onImportFromMetaTemplate"
      >Choose A Template</a-button>
      <a-button
      style="position: absolute; top: -2.25rem; right: 0;"
      v-if="!isFormVisible"
      danger
      @click="backFormMetaTemplate"
      >Back</a-button>
    <!-- </div> -->

</template>
