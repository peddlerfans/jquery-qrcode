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
import MbtModelerConditionEdit from "@/views/mbt-modeler-condition-edit.vue";
import InputSelectItem from "@/components/basic/itea-schema-item/input-select-item.vue"

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
    }
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
  const pathProp = schema.properties.path
  if (pathProp) delete schema.properties.path
  schema.title = row ? row.name : store.getPrimaryAw.data?.name || ''
  schema.description = row ? row.description : store.getPrimaryAw.data?.description || ''
  return schema
}
function getExpectedSchema (schema: any, row?: any) {
  const pathProp = schema.properties.path
  if (pathProp) delete schema.properties.path
  schema.title = row ? row.name : store.getExpectedAwSchemaValue?.name || ''
  schema.description = row ? row.description : store.getExpectedAwSchemaValue?.description || ''
  return schema
}

let selectAwTar: string = '1'
let schema = ref<any>({})
let schemaValue = ref<any>({})

let primaryUiSchema = ref({})
let expectedSchema = ref({})
let expectedSchemaValue = ref<any>({})
let expectedUiSchema = ref({})
const formProps = {
  layoutColumn: 1,
  labelPosition: 'left',
  labelWidth: '75px',
  labelSuffix: ':',
}

let assertDesc = ref<string>('')
let assertList = ref<Array<any>>([])

const hasExpected = computed(() => {
  return !_.isEmpty(expectedSchema.value)
})

const isEmptyPrimarySchema = computed(() => {
  return _.isEmpty(schema.value)
})

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
  if (tar === 'primary') {
   _id = schemaValue.value._id || store.getPrimaryAwData._id
   name = schemaValue.value.name || store.getPrimaryAwData.name
  } else if (tar === 'expected') {
    _id = expectedSchemaValue.value._id || store.getExpectedAwData._id
    name = expectedSchemaValue.value.name || store.getExpectedAwData.name
  }
  router.push({
    name: 'awupdate',
    params: {
      _id,
      name,
      awupdate: 'mbtAW',
      mbtid: route.params._id,
      mbtname: localStorage.getItem('mbt_' + route.params.name)
    }
  })
}

function deletePrimary() {
  // schema.value = _.cloneDeep(defaultAWSchema)
  schema.value = {}
  primaryUiSchema.value = {}
  schemaValue.value = {}
  store.setEditingPrimaryAw({
    data: null,
    schema: null,
    uiParams: null,
    aw: null
  })
  emit('change')
  getAllCustomVar()
}

function deleteExpected() {
  expectedSchema.value = {}
  expectedUiSchema.value = {}
  expectedSchemaValue.value = {}
  store.setEditingExpectedAw({
      data: null,
      schema: null,
      uiParams: null,
      aw: null
  })
  emit('change')
}

function showAw (row: any) {
  showTable.value = false
  if (selectAwTar === '1') {
    store.setEditingPrimaryAw(row, 'aw')
    store.setEditingPrimaryAw({}, 'data')
    let temp: any = store.getPrimaryAwSchema
    schema.value = temp.schema
    primaryUiSchema.value = temp.uiSchema
    schemaValue.value = {}
    getAllCustomVar()
  } else if (selectAwTar === '2') {
    store.setEditingExpectedAw(row, 'aw')
    store.setEditingExpectedAw({}, 'data')
    let temp: any = store.getExpectedAwSchema
    expectedSchema.value = temp.schema
    expectedUiSchema.value = temp.uiSchema
    expectedSchemaValue.value = {}
    assertList.value = []
    rulesData.value = [{
      relation: 'AND',
      id: 1,
      conditions: [
        {
          name: '',
          operator: '',
          value: undefined,
          selectvalues: 'AND',
        },
      ],
      children: [],
    }]
  }
  emit('change')
}

function initPrimarySchema () {
  // schema.value = defaultAWSchema
  schema.value = {}
  schemaValue.value = {}
  primaryUiSchema.value = {}
}

function initExpectedSchema () {
  // expectedSchema.value = defaultAWSchema
  expectedSchema.value = {}
  expectedSchemaValue.value = {}
  expectedUiSchema.value = {}
  assertList.value = []
  rulesData.value = [{
    relation: 'AND',
    id: 1,
    conditions: [
      {
        name: '',
        operator: '',
        value: undefined,
        selectvalues: 'AND',
      },
    ],
    children: [],
  }]
}

function initSchema() {
  initPrimarySchema()
  initExpectedSchema()
}

function handleChange () {

  // console.log(3);
  
  // console.log("...........handleChange",expectedSchema.value )
  if (!isEmptyPrimarySchema.value) store.setEditingPrimaryAw(schemaValue.value, 'data')
  if (hasExpected.value) store.setEditingExpectedAw(expectedSchemaValue.value, 'data')
  if(desc.value == ""){
    store.setDescription('')
  }else{
    store.setDescription(desc.value)
  }
  if (hasExpected.value) store.setEditingExpectedAw(expectedSchemaValue.value, 'data')
  store.setDescription(desc.value)
  emit('change')
  getAllCustomVar()
}

function handleData () {
  desc.value = store.getDescription
  // 处理PrimaryAW数据，同事兼容新旧数据结构
  // 旧aw数据结构
  if (store.getPrimaryAw.schema) {
    let schemaTemp: any = store.getPrimaryAw.schema
    schemaTemp = getSchema(schemaTemp)
    let temp: any = data2schema(schemaTemp, store.getPrimaryAw.uiParams || {})
    schema.value = temp.schema
    primaryUiSchema.value = temp.uiSchema
    schemaValue.value = store.getPrimaryAw.data || {}
  } else if (store.getPrimaryAw.aw) {
    // 新aw数据结构
    let temp: any = store.getPrimaryAwSchema
    schema.value = temp.schema
    primaryUiSchema.value = temp.uiSchema
    schemaValue.value = store.getPrimaryAwSchemaValue
  } else {
    initPrimarySchema()
  }
  /**
   * Expected 有三种情况：
   * 1. 旧数据
   * 2. 新数据
   * 3. 没添加 Expected AW 但是有断言有值
   * */
  if (store.getExpectedAw.schema) {
    let schemaTemp1: any = store.getExpectedAw.schema
    schemaTemp1 = getExpectedSchema(schemaTemp1)
    let temp: any = data2schema(schemaTemp1, store.getExpectedAw.uiParams)
    expectedSchema.value = temp.schema
    expectedUiSchema.value = temp.params
    expectedSchemaValue.value = store.getExpectedAw.data || {}
  } else if (store.getExpectedAw.aw) {
    let temp: any = store.getExpectedAwSchema
    expectedSchema.value = temp.schema
    expectedUiSchema.value = temp.uiSchema
    expectedSchemaValue.value = store.getExpectedAwSchemaValue
  } else if (store.getExpectedAw.data) {
    rulesData.value = store.getExpectedAw.data
  } else {
    initExpectedSchema()
  }
  getAllCustomVar()
}

// 获取当前模型所有带有 变量 属性并有 值 的数据
// 只有 aw 版本为 version 3.0 以上才支持
function getAllCustomVar () {
  const cell = store.getShowData
  if (_.isEmpty(cell)) return
  let arr = cell.graph.getCells()
  arr = arr.filter((a: any) => a.attributes.type === 'itea.mbt.test.MBTAW')
  let temp: Array<any> = []
  arr.forEach((b: any) => {
    const type = b.attributes.prop?.custom?.step?.aw?.returnType
    const schemaVal = b.attributes.prop?.custom?.step?.data
    if (schemaVal?.variable) {
      temp.push({
        label: schemaVal.variable,
        value: schemaVal.variable,
        type: type ? type : 'string'
      })
    }
  })
  assertList.value = temp
}

// 断言数据
const keys = 1
let rulesData = ref([{
  relation: 'AND',
  id: 1,
  conditions: [
    {
      name: '',
      operator: '',
      value: undefined,
      selectvalues: 'AND',
    },
  ],
  children: [],
}])

function rulesChange() {
  store.setEditingExpectedAw(rulesData.value, 'data')
  emit('change')
}

/**
 * 显示断言条件：
 * 1、primaryAw存在
 * 2、ExpectedAw未设置
 * 3、模型有PrimaryAw设置了变量
 * */
const assertShow = computed(() => {
  return !hasExpected.value && assertList.value.length && !isEmptyPrimarySchema.value
})

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
                v-show="!isEmptyPrimarySchema"
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
        @change="handleChange"
        >
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
                  v-show="hasExpected"
                  @click="updateAW('expected')"
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
        <div class="setting-assert" v-show="assertShow">
          <div>
            <div class="title">断言描述：</div>
            <a-input v-model:value="assertDesc"></a-input>
          </div>
          <div class="title">设置断言：</div>
          <mbt-modeler-condition-edit
            :keys="keys"
            :formDatas="assertList"
            :rulesData="rulesData"
            @rulesChange="rulesChange"
          ></mbt-modeler-condition-edit>
        </div>
        <VueForm
            v-show="hasExpected"
            v-model="expectedSchemaValue"
            :schema="expectedSchema"
            :formProps="formProps"
            :uiSchema="expectedUiSchema"
            @change="handleChange"
            >
          <div slot-scope="{ expectedSchemaValue }">
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
