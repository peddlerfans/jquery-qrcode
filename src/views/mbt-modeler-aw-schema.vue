<script setup lang="ts">
import {
  ref,
  watch,
  onMounted,
  computed,
inject
} from 'vue'
import { useI18n } from "vue-i18n";
import { MbtData } from "@/stores/modules/mbt-data";
import VueForm from "@lljj/vue3-form-ant";
import _ from "lodash";
import {generateSchema} from "@/utils/jsonschemaform";
import {data2schema} from "@/views/componentTS/schema-constructor";
import {useRoute, useRouter} from "vue-router";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined
} from "@ant-design/icons-vue";
import AwSchemaTableModal from "@/views/aw-schema-table-modal.vue";

interface Props {
  show: boolean
}
const props = withDefaults(defineProps<Props>(), {
  show: true
})

const emit = defineEmits(['change'])
let desc = ref<string>('')
const showTable = ref<boolean>(false)
const router = useRouter()
const route = useRoute()
const defaultAWSchema = {
  title: "AW",
  type: "object",
  description: '',
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
      "ui:widget": "TextAreaWidget",
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
  }
}

const store = MbtData()
const { t } = useI18n()

/**
 * 优化ui页面，重构schema
 * 把表单的 name 转化为 schema 的 title
 * 表单 description 转化为 schema 的 description
 * */
function getSchema (schema: any, row?: any) {
  const nameProp = schema.properties.name
  const descProp = schema.properties.description
  const tempProp = schema.properties.template
  const tagsProp = schema.properties.tags
  if (nameProp) delete schema.properties.name
  if (descProp) delete schema.properties.description
  if (tempProp) delete schema.properties.template
  if (tagsProp) delete schema.properties.tags
  schema.title = row ? row.name : store.getPrimaryAw.data?.name || ''
  schema.description = row ? row.description : store.getPrimaryAw.data?.description || ''
  return schema
}

let selectAwTar: string = '1'
let schema = ref(defaultAWSchema)
let schemaValue = ref<any>({})

let primaryUiSchema = ref({})
let expectedSchema = ref(defaultAWSchema)
let expectedSchemaValue = ref<any>({})
let expectedUiSchema = ref({})
const formProps = {
  layoutColumn: 1,
  labelPosition: 'left',
  labelWidth: '75px',
  labelSuffix: ':',
}

const hasExpected = computed(() => {
  return !_.isEmpty(store.getExpectedAw.schema)
})

const isEmptyPrimarySchema = computed(() => {
  return _.isEmpty(store.getPrimaryAw.schema)
})

function getAWBothDesc () {
  let tempPrimaryDesc = schema.value.description || ''
  let tempExpectedDesc = expectedSchema.value.description || ''
  return tempPrimaryDesc && tempExpectedDesc
      ? tempPrimaryDesc + '/' + tempExpectedDesc
      : tempPrimaryDesc + tempExpectedDesc
}

function changAW () {
  selectAwTar = '1'
  showTable.value = true
}

function changeExpAW () {
  selectAwTar = '2'
  showTable.value = true
}

function updateAW (tar: string) {
  let _id: string = ''
  let name: string = ''
  let mbtId = localStorage.getItem('mbt_' + route.params._id + route.params.name + '_id')
  if (tar === 'primary') {
   _id = schemaValue.value._id
   name = schemaValue.value.name
  } else if (tar === 'expected') {
    _id = expectedSchemaValue.value._id
    name = expectedSchemaValue.value.name
  }
  router.push({
    name: 'awupdate',
    params: {
      _id,
      name,
      awupdate: 'mbtAW',
      mbtid: mbtId,
      mbtname: localStorage.getItem('mbt_' + route.params.name)
    }
  })
}

function deletePrimary() {
  schema.value = _.cloneDeep(defaultAWSchema)
  primaryUiSchema.value = {}
  schemaValue.value = {}
  store.setEditingPrimaryAw({
    editingPrimaryAw: {
      data: null,
      schema: null,
      uiParams: null
    }
  })
}

function deleteExpected() {
  expectedSchema.value = _.cloneDeep(defaultAWSchema)
  expectedUiSchema.value = {}
  expectedSchemaValue.value = {}
  store.setEditingExpectedAw({
      data: null,
      schema: null,
      uiParams: null
    
  })
}

function showAw (row: any) {
  showTable.value = false
  if (selectAwTar === '1') {
    schema.value = _.cloneDeep(defaultAWSchema)
    schemaValue.value = {
      name: row.name,
      description: row.description,
      tags: '',
      template: row.template,
      _id: row._id
    }
    if (_.isArray(row.tags)) {
      _.forEach(row.tags, function (value: any) {
        schemaValue.value.tags += value + " "
      })
    }
    if (_.isArray(row.params) && row.params.length > 0) {
      let appEndedSchema = generateSchema(row.params)
      appEndedSchema.forEach((a: any) => {
        Object.keys(a).forEach((b: any) => {
          a[b].custom = 'awParams'
        })
      })
      appEndedSchema.forEach((field: any) => {
        Object.assign(schema.value.properties, field)
      })
      
    }
    if (row.returnType) {
      Object.assign(schema.value.properties, {
        variable: {
          title: '变量',
          type: 'string'
        }
      })
    }
    setSchema('primary')
    console.log('uischema' ,primaryUiSchema.value);
    
    schema.value = getSchema(schema.value, row)
    // store.getShowData.setPropertiesData()
    store.setEditingPrimaryAw(schema.value, 'schema')
    store.setEditingPrimaryAw(schemaValue.value, 'data')
    store.setEditingPrimaryAw(primaryUiSchema.value, 'uiParams')
  } else if (selectAwTar === '2') {
    // hasAWExpectedInfo.value = true;
    expectedSchema.value = _.cloneDeep(defaultAWSchema)
    store.setExpectedTableRow(row)
    expectedSchemaValue.value = {
      name: row.name,
      description: row.description,
      tags: '',
      template: row.template,
      _id: row._id
    }
    if (_.isArray(row.tags)) {
      _.forEach(row.tags, function (value, key) {
        expectedSchemaValue.value.tags += value + ' '
      })
    }
    if (_.isArray(row.params)) {
      let appEndedSchema = generateSchema(row.params)
      appEndedSchema.forEach((field: any) => {
        Object.assign(expectedSchema.value.properties, field)
      })
    }
    setSchema('expected')
    expectedSchema.value = getSchema(expectedSchema.value, row)
    store.setEditingExpectedAw(expectedSchema.value, 'schema')
    store.setEditingExpectedAw(expectedSchemaValue.value, 'data')
    store.setEditingExpectedAw(expectedUiSchema.value, 'uiParams')
  }
  emit('change')
}

function setSchema (tar: string) {
  let temp: any = {}
  if (tar === 'primary') {
    temp = data2schema(schema.value, primaryUiSchema.value)
    schema.value = temp.schema
    primaryUiSchema.value = temp.uiSchema
  } else if (tar === 'expected') {
    temp = data2schema(expectedSchema.value, expectedUiSchema.value)
    expectedSchema.value = temp.schema
    expectedUiSchema.value = temp.uiSchema
  }
}

function initPrimarySchema () {
  schema.value = defaultAWSchema
  schemaValue.value = {}
  primaryUiSchema.value = {}
}

function initExpectedSchema () {
  expectedSchema.value = defaultAWSchema
  expectedSchemaValue.value = {}
  expectedUiSchema.value = {}
}

function initSchema() {
  initPrimarySchema()
  initExpectedSchema()
}

function handleChange () {

  
  // console.log("...........handleChange",schemaValue.value , isEmptyPrimarySchema)
  if (!isEmptyPrimarySchema.value) store.setEditingPrimaryAw(schemaValue.value, 'data')
  if (hasExpected.value) store.setEditingExpectedAw(expectedSchemaValue.value, 'data')
  const _desc = desc.value
  store.setDescription(_desc)
  emit('change')
}

function handleData () {
  if (store.getPrimaryAw.schema) {
    schema.value = store.getPrimaryAw.schema
    schema.value = getSchema(schema.value)
    schemaValue.value = store.getPrimaryAw.data || {}
    primaryUiSchema.value = store.getPrimaryAw.uiParams || {}
    console.log(schema.value,schemaValue.value);
    
  } else {
    initPrimarySchema()
  }
  if (store.getPrimaryAw.schema && store.getExpectedAw.schema) {
    expectedSchema.value = store.getExpectedAw.schema
    expectedSchema.value = getSchema(expectedSchema.value)
    expectedSchemaValue.value = store.getExpectedAw.data || {}
    expectedUiSchema.value = store.getExpectedAw.uiParams || {}
  } else {
    initExpectedSchema()
  }
}

const keys = 1
let rulesData = ref([{
  relation: 'AND',
  id: 1,
  conditions: [
    {
      name: 'name',
      operator: '=',
      value: undefined,
      selectvalues: 'AND',
    },
  ],
  children: [],
}])
let formDatas = ref([{"value":"Memory","label":"Memory"},{"value":"GPU","label":"GPU"},{"value":"DPI","label":"DPI"},{"value":"key","label":"key"}])
let valueData = ref([{"name":"Memory","type":"string","values":["4G","2G","6G"]},{"name":"GPU","type":"number","values":[8,32,16]},{"name":"DPI","type":"string","values":["1080P","2K"]},{"name":"key","type":"number","values":[0,1,2,3,4,5,6,7,8]}])
function rulesChange() {

}

defineExpose({
  initSchema,
  handleData
})

</script>

<template>

  <div class="edit-aw-wrap">
    <div class="desc-wrap">
      <div class="title">描述：</div>
      <a-input v-model:value="desc" @change="handleChange"></a-input>
    </div>
    <a-divider />
    <div class="aw-wrap">
      <div class="title-wrap">
        <div class="title">{{ $t('MBTStore.primary') }}</div>
        <div class="right-btn">
          <a-tooltip placement="top">
            <template #title>
              <span>{{ t('common.chooseAw') }}</span>
            </template>
            <plus-circle-outlined
                @click="changAW"
                class="icon--primary-btn"
                style="margin-right: 8px;"
            ></plus-circle-outlined>
          </a-tooltip>
          <a-tooltip placement="top">
            <template #title>
              <span>{{ t('common.updateAw') }}</span>
            </template>
            <edit-outlined
                @click="updateAW('primary')"
                class="icon--primary-btn"
                style="margin-right: 8px;"
            ></edit-outlined>
          </a-tooltip>
          <a-tooltip placement="top">
            <template #title>
              <span>{{ $t('MBTStore.deleteAW') }}</span>
            </template>
            <delete-outlined
                v-show="!isEmptyPrimarySchema"
                @click="deletePrimary"
                class="icon--primary-btn"
                style="margin-right: 8px;"
            ></delete-outlined>
          </a-tooltip>
        </div>
      </div>
      <VueForm
        v-show="!isEmptyPrimarySchema"
        v-model="schemaValue"
        :schema="schema"
        :formProps="formProps"
        :uiSchema="primaryUiSchema"
        @change="handleChange">
        <div slot-scope="{ schemaValue }"></div>
      </VueForm>
      <a-divider />
      <div>
        <div class="title-wrap">
          <div class="title">{{ $t('MBTStore.expected') }}</div>
          <div class="right-btn">
            <a-tooltip placement="top">
              <template #title>
                <span>{{ t('common.chooseAw') }}</span>
              </template>
              <plus-circle-outlined
                  @click="changeExpAW"
                  class="icon--primary-btn"
                  style="margin-right: 8px;"
              ></plus-circle-outlined>
            </a-tooltip>
            <a-tooltip placement="top">
              <template #title>
                <span>{{ $t('MBTStore.updateAw') }}</span>
              </template>
              <edit-outlined
                  @click="updateAW('primary')"
                  class="icon--primary-btn"
                  style="margin-right: 8px;"
              ></edit-outlined>
            </a-tooltip>
            <a-tooltip placement="top">
              <template #title>
                <span>{{ $t('MBTStore.deleteAW') }}</span>
              </template>
              <delete-outlined
                  v-show="hasExpected"
                  @click="deleteExpected"
                  class="icon--primary-btn"
                  style="margin-right: 8px;"
              ></delete-outlined>
            </a-tooltip>
          </div>
        </div>
<!--        <div class="setting-assert">-->
<!--          <div class="title">设置断言：</div>-->
<!--          <create-rule-->
<!--            :keys="keys"-->
<!--            :formDatas="formDatas"-->
<!--            :valueData="valueData"-->
<!--            :rulesData="rulesData"-->
<!--            @rulesChange="rulesChange"-->
<!--          ></create-rule>-->
<!--        </div>-->
        <VueForm
            v-show="hasExpected"
            v-model="expectedSchemaValue"
            :schema="expectedSchema"
            :formProps="formProps"
            :uiSchema="expectedUiSchema"
            @change="handleChange">
          <div slot-scope="{ schemaValue }">
          </div>
        </VueForm>
        <a-divider />
      </div>
    </div>
    <aw-schema-table-modal
        @clickRow="showAw"
        :show="showTable"
        @closeModal="showTable = false"
    ></aw-schema-table-modal>
  </div>
</template>

<style scoped lang="less">
.edit-aw-wrap {
  padding: 4px 8px;
    .desc-wrap {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
  .aw-wrap {
    .title-wrap {
      display: flex;
      //justify-content: space-between;
      .title {
        font-size: 16px;
        margin-right: 12px;
      }
      .right-btn {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
