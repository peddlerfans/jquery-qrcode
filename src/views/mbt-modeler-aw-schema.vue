<script setup lang="ts">
import {
  ref,
  onMounted,
  watch,
  computed
} from 'vue'
import { CommonTable } from '@/components/basic/common-table'
import { SearchBar } from '@/components/basic/search-bar'
import http from "@/utils/http";
import { useI18n } from "vue-i18n";
import { MbtData } from "@/stores/modules/mbt-data";
import VueForm from "@lljj/vue3-form-ant";
import _ from "lodash";
import {generateSchema} from "@/utils/jsonschemaform";
import {data2schema} from "@/views/componentTS/schema-constructor";
import {useRoute, useRouter} from "vue-router";

interface Props {
  show: boolean
}

const emit = defineEmits(['save'])

const props = withDefaults(defineProps<Props>(), {
  show: false
})
const router = useRouter()
const route = useRoute()

watch(
    () => props.show,
    () => {
      if (store.getPrimaryAw.schema) {
        schema.value = store.getPrimaryAw.schema
        schema.value = getSchema(schema.value)
        schemaValue.value = store.getPrimaryAw.data || {}
        primaryUiSchema.value = store.getPrimaryAw.uiParams || {}
        isEdit.value = true
      }
      if (store.getPrimaryAw.schema && store.getExpectedAw.schema) {
        expectedSchema.value = store.getExpectedAw.schema
        expectedSchema.value = getSchema(expectedSchema.value)
        expectedSchemaValue.value = store.getExpectedAw.data || {}
        expectedUiSchema.value = store.getExpectedAw.uiParams || {}
      }
    }
)

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
  schema.title = row ? row.name : store.getPrimaryAw.data.name
  schema.description = row ? row.description : store.getPrimaryAw.data.description
  return schema
}

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
const store = MbtData()
const { t } = useI18n()
let isEdit = ref(false)

let searchObj = {
  url: '/api/hlfs/_tags',
  params: {
    q: 'category:meta'
  }
}

// table data
let awTable = ref<any>(null)
const awColumn = [
  { title: 'name', width: 40, link: 'custom' },
  { title: 'description', width: 120 },
  { title: 'tags', width: 100 }
]
let tableParams = ref({
  search: '',
  page: 1,
  perPage: 10
})

function getTableData () {
  awTable.value.loading = true
  http.get('/api/hlfs', {
    params: tableParams.value
  }).then(({ data }) => {
    awTable.value.setTableData({
      tableData: data.data,
      pageSize: tableParams.value.perPage,
      currentPage: tableParams.value.page,
      total: data.total
    })
  }).finally(() => {
    awTable.value.loading = false
  })
}

onMounted(() => {
  getTableData()
})

const hasExpected = computed(() => {
  return !_.isEmpty(store.getExpectedAw.schema)
})

function setSchema (tar: string) {
  let temp: any = {}
  if (tar === 'primary') {
    temp = data2schema(schema.value, store.getDataPoolTableColumns, primaryUiSchema.value)
    schema.value = temp.schema
    primaryUiSchema.value = temp.uiSchema
  } else if (tar === 'expected') {
    temp = data2schema(expectedSchema.value, store.getDataPoolTableColumns, expectedUiSchema.value)
    expectedSchema.value = temp.schema
    expectedUiSchema.value = temp.uiSchema
  }
}


function showAw (row: any) {
  isEdit.value = true
  
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
      appEndedSchema.forEach((field: any) => {
        Object.assign(schema.value.properties, field)
      })
    }
    setSchema('primary')
    schema.value = getSchema(schema.value, row)
    store.setEditingPrimaryAw(schema.value, 'schema')
    store.setEditingPrimaryAw(schemaValue.value, 'data')
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
  }
}

function search (searchText: string) {
  tableParams.value.page = 1
  tableParams.value.search = searchText
  getTableData()
}

function tablePageChange (query: any) {
  tableParams.value.page = query.current
  tableParams.value.perPage = query.pageSize
  getTableData()
}

// AW operation
function saveAW () {
  const editingPrimaryAw = {
    data: schemaValue.value,
    schema: schema.value,
    uiParams: primaryUiSchema.value
  }
  store.setEditingPrimaryAw(editingPrimaryAw)
  if (!_.isEmpty(expectedSchemaValue)) {
    const editingExpectedAw = {
      data: expectedSchemaValue.value,
      schema: expectedSchema.value,
      uiParams: expectedUiSchema.value
    }
    store.setEditingExpectedAw(editingExpectedAw)
  }
  emit('save')
}

function changAW () {
  isEdit.value = false
  selectAwTar = '1'
}

function changeExpAW () {
  isEdit.value = false
  selectAwTar = '2'
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

function deleteExpected() {
  expectedSchema.value = _.cloneDeep(defaultAWSchema)
  expectedUiSchema.value = {}
  expectedSchemaValue.value = {}
  store.setEditingExpectedAw({
    editingExpectedAw: {
      data: null,
      schema: null,
      uiParams: null
    }
  })
}

</script>

<template>
  <div class="edit-aw-wrap">
    <div class="title">
      设置AW
    </div>
    <a-divider />
    <div v-show="isEdit" class="aw-wrap">
      <div class="title">Primary AW</div>
      <VueForm
        v-model="schemaValue"
        :schema="schema"
        :formProps="formProps"
        :uiSchema="primaryUiSchema">
        <div slot-scope="{ schemaValue }"></div>
      </VueForm>
      <div v-show="hasExpected">
        <a-divider />
        <div class="title">Expected AW</div>
        <VueForm
            v-model="expectedSchemaValue"
            :schema="expectedSchema"
            :formProps="formProps"
            :uiSchema="expectedUiSchema">
          <div slot-scope="{ schemaValue }">
          </div>
        </VueForm>
      </div>
      <div>{{ schemaValue }}</div>
      <div class="btn-line">
        <a-button type="primary" @click="saveAW">{{ t('common.submitText') }}</a-button>
        <a-button type="primary" @click="changAW">{{ t('common.chooseAw') }}</a-button>
        <a-button danger @click="updateAW('primary')">{{ t('common.updateAw') }}</a-button>
        <a-button danger @click="changeExpAW">{{ t('common.chooseEx') }}</a-button>
        <a-button danger @click="updateAW('expected')">修改预期</a-button>
        <a-button danger @click="deleteExpected()">删除预期</a-button>
      </div>
    </div>
    <div v-show="!isEdit">
      <search-bar
        :url="searchObj.url"
        :params="searchObj.params"
        @search="search"
      ></search-bar>
      <common-table
          ref="awTable"
          :columns="awColumn"
          tableRef="awTable"
          @go2Page="showAw"
          @pageChange="tablePageChange"
      ></common-table>
    </div>
  </div>
</template>

<style scoped lang="less">
.edit-aw-wrap {
  padding: 4px 8px;
  height: 100%;
  overflow: auto;
  .title {
    font-size: 18px;
    margin-top: 8px;
    margin-bottom: 12px;
  }
  .aw-wrap {
    .title {
      font-size: 16px;
    }
    .btn-line {
      .ant-btn {
        margin-right: 8px;
      }
    }
  }
}
</style>
