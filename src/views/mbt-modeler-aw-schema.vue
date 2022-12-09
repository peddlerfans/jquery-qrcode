<script setup lang="ts">
import {
  ref,
  onMounted,
  watch
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

const props = withDefaults(defineProps<Props>(), {
  show: false
})

watch(
    () => props.show,
    () => {
      if (store.getPrimaryAw.schema) {
        schema.value = store.getPrimaryAw.schema
        schemaValue.value = store.getPrimaryAw.data || {}
        isEdit.value = true
      }
    }
)

const defaultAWSchema = {
  title: "AW",
  type: "object",
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

let schema = ref(defaultAWSchema)
let schemaValue = ref<any>({})
let ExpectedSchema = ref(defaultAWSchema)
let ExpectedSchemaValue = ref<any>({})
const formProps = {
  layoutColumn: 1,
  labelPosition: 'left',
  labelWidth: '75px',
  labelSuffix: ':',
}
let awUiSchema: any = {}
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

function showAw (row: any) {
  console.log(row)
  return
  isEdit.value = true
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
    let appEndedSchema = generateSchema(row.params)
    appEndedSchema.forEach((field: any) => {
      Object.assign(schema.value.properties, field)
    })
  }
  schema.value = data2schema(schema.value, store.getDataPoolTableColumns)
  store.setEditingPrimaryAw(schema.value, 'schema')
  store.setEditingPrimaryAw(schemaValue.value, 'data')
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

}

function changAW () {
  isEdit.value = false
}

function changeExpAW () {

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
        :uischema="awUiSchema">
        <div slot-scope="{ schemaValue }"></div>
      </VueForm>
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