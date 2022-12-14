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

interface Props {
  show: boolean
}

const emit = defineEmits(['save'])

const props = withDefaults(defineProps<Props>(), {
  show: false
})

watch(
    () => props.show,
    () => {
      if (store.getPrimaryAw.schema) {
        getSchema()
        schemaValue.value = store.getPrimaryAw.data || {}
        primaryUiSchema.value = store.getPrimaryAw.uiParams || {}
        isEdit.value = true
      }
    }
)

/**
 * 优化ui页面，重构schema
 * 把表单的 name 转化为 schema 的 title
 * 表单 description 转化为 schema 的 description
 * */
function getSchema () {
  schema.value = store.getPrimaryAw.schema
  const nameProp = schema.value.properties.name
  const descProp = schema.value.properties.description
  // if (schema.value.properties && nameProp) delete schema.value.properties.name
  // if (descProp) delete schema.value.properties.description
  schema.value.title = store.getPrimaryAw.data.name
  schema.value.description = store.getPrimaryAw.data.description
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

let selectAwTar: string = ''
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
    awTable.value['loading'] = false
  })
}

onMounted(() => {
  getTableData()
})

const hasExpected = computed(() => {
  // return !_.isEmpty(store.geExpectedAw.schema)
})

function setSchema (schema: any, columns: any, uiSchema: any) {
  const temp = data2schema(schema, columns, uiSchema)
  schema.value = temp.schema
  primaryUiSchema.value = temp.uiSchema
}

function showAw (row: any) {
  isEdit.value = true
  if (selectAwTar === '1') {
    schemaValue.value.name = row.name
    schemaValue.value.description = row.description
    schemaValue.value.tags = ""
    schemaValue.value.template = row.template
    schemaValue.value._id = row._id
    if (_.isArray(row.tags)) {
      _.forEach(row.tags, function (value: any) {
        schemaValue.value.tags += value + " "
      })
    }
    if (_.isArray(row.params) && row.params.length > 0) {
      let appEndedSchema = generateSchema(row.params, row._id)
      appEndedSchema.forEach((field: any) => {
        Object.assign(schema.value.properties, field)
      })
    }
    setSchema(schema.value, store.getDataPoolTableColumns, primaryUiSchema.value)
    store.setEditingPrimaryAw(schema.value, 'schema')
    store.setEditingPrimaryAw(schemaValue.value, 'data')
  } else if (selectAwTar === '2') {
    // hasAWExpectedInfo.value = true;

    // store.setExpectedTableRow(row)
    expectedSchemaValue.value.name = row.name
    expectedSchemaValue.value.description = row.description
    expectedSchemaValue.value.tags = ''
    expectedSchemaValue.value.template = row.template
    expectedSchemaValue.value._id = row._id
    if (_.isArray(row.tags)) {
      _.forEach(row.tags, function (value, key) {
        expectedSchemaValue.value.tags += value + ' '
      })
    }
    debugger
    if (_.isArray(row.params)) {
      let appEndedSchema = generateSchema(row.params)
      appEndedSchema.forEach((field: any) => {
        Object.assign(expectedSchema.value.properties, field)
      })
    }
    setSchema(expectedSchema.value, store.getDataPoolTableColumns, expectedUiSchema.value)
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
      data: expectedSchema.value,
      schema: expectedSchemaValue.value,
      uiParams: expectedUiSchema.value
    }
    // store.setEditingExpectedAw(editingExpectedAw)
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

function updateAW () {

}

</script>

<template>
  <div class="edit-aw-wrap">
    <div class="title">
      设置AW
    </div>
    <div v-show="isEdit" class="aw-wrap">
      <VueForm
        v-model="schemaValue"
        :schema="schema"
        :formProps="formProps"
        :uiSchema="primaryUiSchema">
        <div slot-scope="{ schemaValue }"></div>
      </VueForm>
      <VueForm
          v-show="hasExpected"
          v-model="expectedSchemaValue"
          :schema="expectedSchema"
          :formProps="formProps"
          :uiSchema="expectedUiSchema">
        <div slot-scope="{ schemaValue }"></div>
      </VueForm>
      <div>{{ schemaValue }}</div>
      <div class="btn-line">
        <a-button type="primary" @click="saveAW">{{ t('common.submitText') }}</a-button>
        <a-button type="primary" @click="changAW">{{ t('common.chooseAw') }}</a-button>
        <a-button danger @click="changeExpAW">{{ t('common.chooseEx') }}</a-button>
        <a-button danger @click="updateAW">{{ t('common.updateAw') }}</a-button>
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
    font-size: 16px;
    margin-top: 8px;
    margin-bottom: 12px;
  }
  .aw-wrap {
    .btn-line {
      .ant-btn {
        margin-right: 8px;
      }
    }
  }
}
</style>