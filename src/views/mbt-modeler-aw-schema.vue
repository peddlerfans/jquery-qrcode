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
import {data2schema} from "@/views/componentTS/schema-constructor";
import {useRoute, useRouter} from "vue-router";
import {
  PlusCircleOutlined,
  DeleteOutlined,
  EditOutlined,
  CloseCircleOutlined,
  PlusSquareOutlined,
  RedoOutlined
} from "@ant-design/icons-vue";
import AwSchemaTableModal from "@/views/aw-schema-table-modal.vue";
import MbtModelerConditionEdit from "@/views/mbt-modeler-condition-edit.vue";
import InputSelectItem from "@/components/basic/itea-schema-item/input-select-item.vue"
import { message } from 'ant-design-vue';
import  request  from '@/utils/request';

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
let showAssert = ref<boolean>(false)
const isUpdateAw = ref(true)
const defaultAssertData = [{
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

// let assertDesc = ref<string>('')
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
   _id = schemaValue.value?._id || store.getPrimaryAwData?._id
   name = schemaValue.value?.name || store.getPrimaryAwData?.name
  } else if (tar === 'expected') {
    _id = expectedSchemaValue.value?._id || store.getExpectedAwData?._id
    name = expectedSchemaValue.value?.name || store.getExpectedAwData?.name
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

function reloadPrimary(){
  let _id: string = ''
  let name: string = ''
  // if (tar === 'primary') {
   _id = schemaValue.value?._id || store.getPrimaryAwData?._id
   name = schemaValue.value?.name || store.getPrimaryAwData?.name
   selectAwTar = '1'
   request.get(`/api/hlfs/${_id}`).then((res) => {
      showAw(res)      
   }).catch(() => {
    message.error('当前AW不存在')
    // request.post('/api/hlfs',schemaValue.value).then((res:any) => {
    //   showAw(res)
    //   message.success('新建成功')
    // })
   })
  // }
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
  } else if (selectAwTar === '2') {
    // 清空断言信息
    // store.setEditingExpectedAw(false, 'isAssert')
    // store.setEditingExpectedAw('', 'assertDesc')
    assertList.value = []
    rulesData.value = _.cloneDeep(defaultAssertData)
    store.setEditingExpectedAw(row, 'aw')
    store.setEditingExpectedAw({}, 'data')
    showAssert.value = store.hasCondition()
    let temp: any = store.getExpectedAwSchema
    expectedSchema.value = temp.schema
    expectedUiSchema.value = temp.uiSchema
    expectedSchemaValue.value = {}
  }
  emit('change')
}

function initPrimarySchema () {
  schema.value = {}
  schemaValue.value = {}
  primaryUiSchema.value = {}
}

function initExpectedSchema () {
  expectedSchema.value = {}
  expectedSchemaValue.value = {}
  expectedUiSchema.value = {}
  assertList.value = []
  rulesData.value = _.cloneDeep(defaultAssertData)
  // assertDesc.value = ''
}

function initSchema() {
  initPrimarySchema()
  initExpectedSchema()
}

/**
 * schema item 为空会把值变为 undefined
 * 而 joint.js 不能成功设置值为 undefined 的数据
 * 当前只发现值为 string 类型的 schema item 会有如下情况
 * 需要做处理
 * */
function handleSchemaValue(schemaValue: any) {
  let temp = _.cloneDeep(schemaValue)
  if (temp.hasOwnProperty('variable') && temp.variable === void 0) {
    temp.variable = ''
  }
  return temp
}

function handleChange () {
  if (!isEmptyPrimarySchema.value) {
    store.setEditingPrimaryAw(handleSchemaValue(schemaValue.value), 'data')
  }
  if (hasExpected.value) store.setEditingExpectedAw(expectedSchemaValue.value, 'data')
  store.setDescription(desc.value)
  emit('change')
}

function handleData () {
  if(store.getUpdateAw){
    isUpdateAw.value = false
  }
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
   * 3. 新数据，且 aw 至少一个参数设置类型为 condition
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
    showAssert.value = false
  } else if (store.getExpectedAw.isAssert) {
    // assertList.value = store.getAllCustomVar()
    // rulesData.value = store.getExpectedAw.data
    // assertDesc.value = store.getExpectedAw.assertDesc || ''
    // showAssert.value = store.hasCondition
  } else {
    initExpectedSchema()
  }
}

// 断言数据
const keys = 1
let rulesData = ref(_.cloneDeep(defaultAssertData))

function rulesChange() {
  store.setEditingExpectedAw(rulesData.value, 'data')
  store.setEditingExpectedAw(true, 'isAssert')
  emit('change')
}

// function assertInputChange() {
//   store.setEditingExpectedAw(assertDesc.value, 'assertDesc')
//   emit('change')
// }

// function clearAssert() {
//   assertDesc.value = ''
//   rulesData.value = _.cloneDeep(defaultAssertData)
//   store.setEditingExpectedAw('', 'assertDesc')
//   store.setEditingExpectedAw(false, 'isAssert')
//   store.setEditingExpectedAw(null, 'data')
//   emit('change')
//   showAssert.value = false
// }

/**
 * 显示断言条件：
 * 1、primaryAw存在
 * 2、ExpectedAw未设置
 * 3、模型有PrimaryAw设置了变量
 * */
// function addAssert() {
//   if (showAssert.value) return
//   assertList.value = store.getAllCustomVar()
//   if (assertList.value.length) {
//     expectedSchema.value = {}
//     expectedUiSchema.value = {}
//     expectedSchemaValue.value = {}
//     store.setEditingExpectedAw({
//       data: _.cloneDeep(defaultAssertData),
//       schema: null,
//       uiParams: null,
//       aw: null,
//       isAssert: true,
//       assertDesc: ''
//     })
//     // assertDesc.value = ''
//     rulesData.value = _.cloneDeep(defaultAssertData)
//     showAssert.value = true
//     emit('change')
//   } else {
//     message.warning(t('MBTStore.assertTip'))
//   }
// }

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
          <a-tooltip placement="top" v-show="isUpdateAw">
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
          <a-tooltip placement="top">
            <template #title>
              <span>{{ $t('MBTStore.reloadAW') }}</span>
            </template>
            <redo-outlined
                v-show="!isEmptyPrimarySchema"
                @click="reloadPrimary"
                class="icon--primary-btn"
                style="margin-right: 8px;"
            ></redo-outlined>
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
<!--            <a-tooltip placement="top">-->
<!--              <template #title>-->
<!--                <span>{{ $t('MBTStore.addAssert') }}</span>-->
<!--              </template>-->
<!--              <plus-square-outlined-->
<!--                  @click="addAssert"-->
<!--                  class="icon&#45;&#45;primary-btn"-->
<!--                  style="margin-right: 8px;"-->
<!--              ></plus-square-outlined>-->
<!--            </a-tooltip>-->
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
<!--            <a-tooltip placement="top">-->
<!--              <template #title>-->
<!--                <span>{{ $t('MBTStore.clearAssert') }}</span>-->
<!--              </template>-->
<!--              <close-circle-outlined-->
<!--                  v-show="showAssert"-->
<!--                  @click="clearAssert"-->
<!--                  class="icon&#45;&#45;primary-btn"-->
<!--                  style="margin-right: 8px;"-->
<!--              ></close-circle-outlined>-->
<!--            </a-tooltip>-->
          </div>
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
        <div class="setting-assert" v-show="showAssert">
          <!--          <div>-->
          <!--            <div class="title">断言描述：</div>-->
          <!--            <a-input v-model:value="assertDesc" @change="assertInputChange"></a-input>-->
          <!--          </div>-->
          <div class="title">设置断言：</div>
          <mbt-modeler-condition-edit
              :keys="keys"
              :formDatas="assertList"
              :rulesData="rulesData"
              @rulesChange="rulesChange"
          ></mbt-modeler-condition-edit>
        </div>
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
