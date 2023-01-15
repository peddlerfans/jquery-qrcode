<script setup lang="ts">
import {computed, reactive, Ref, ref, watch} from "vue";
import {Stores} from "../../types/stores";
import _, {cloneDeep} from "lodash";
import MetaInfo from "@/components/metainfo.vue";
import VueForm from "@lljj/vue3-form-ant";
import {MBTStore} from '@/stores/MBTModel'
import {getAllTemplatesByCategory} from "@/api/mbt";
import {message, Modal} from "ant-design-vue";
import {useI18n} from "vue-i18n";
import {CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined,} from '@ant-design/icons-vue'
import {MbtData} from "@/stores/modules/mbt-data";
import {exportFile, getExcelData} from "@/utils/fileAction";
import InputTable from "@/components/inputTable.vue"

interface Props {
  show: boolean
}
const props = withDefaults(defineProps<Props>(), {
  show: false
})

const emit = defineEmits(['close'])
const { t } = useI18n()

watch(
    () => props.show,
    (val) => {
      if (val) {
        // Attribute 初始化数据
        if (store.changeTemplate?._id) {
          globalFormData.value = {...store.changeTemplate}
          getAllTemplatesByCategory('codegen').then((rst: any) => {
            if (rst && _.isArray(rst)) {
              rst.forEach((rec: any) => {
                if (rec.model && rec.model.outputLanguage) {
                  if (rec.model.outputLanguage == 'yaml') {
                    globalSchema.value.properties.codegen_text.anyOf.push({ title: rec.name , const: rec._id})
                  } else {
                    globalSchema.value.properties.codegen_script.anyOf.push({ title: rec.name , const: rec._id})
                  }
                }

              })
            }
          })
        }
        // meta 初始化数据
        if (store.showMetaSchema) tempSchema.value = computed(() => store.showMetaSchema).value
        if (store.showMetaData) metaTemplateDetailTableData.value = store.showMetaData
        // Data Pool 初始化数据
        if (store.getDataPool?.tableData?.length) {
          if (store.getDataPoolDataForm === 'dynamic_template') {
            dataPoolRadio.value = 1
            tableDataDynamic.value = store.getDataPoolTableData
            tableColumnsDynamic.value = store.getDataPoolColData
          } else if (store.getDataPoolDataForm === 'static_template') {
            dataPoolRadio.value = 2
            tableData.value = store.getDataPoolTableData
            tableColumns.value = store.getDataPoolColData
          } else {
            dataPoolRadio.value = 3
            tableDataDirectInput.value  = store.getDataPoolTableData
            tableColumnsDirectInput.value = store.getDataPoolColData
          }
        }
        // Resources 初始化数据
        console.log(store.getResource)
        resourcesDataSource.value = store.getResource || []
      }
    }
)

const dataPoolRadio = ref<number>(1)
const store = MBTStore()
const storeAw = MbtData()
const activeKey = ref('1')
const dynamicTable = ref()
const staticTable = ref()
const inputTable = ref()
// Data Pool
// 动态数据
let tableColumnsDynamic = ref()
let tableDataDynamic = ref([])
// 静态模板的数据
let tableData = ref([])
let tableColumns = ref([])
// input模板的数据
let tableDataDirectInput = ref([])
let tableColumnsDirectInput = ref([])
// attributes的数据
let globalFormData = ref<Stores.mbtView>({
  _id: '',
  name: '',
  description: '',
  codegen_text: '',
  codegen_script: '',
})
const defaultGlobalSchema = {
  type: "object",
  properties: {
    name: {
      title: "MBT Name",
      type: "string",
      readOnly: true,
    },
    description: {
      title: "Description",
      type: "string",
    },
    codegen_text: {
      title: "Output Text",
      type: "string",
      anyOf: <any>[],
    },
    codegen_script: {
      title: "Output Script",
      type: "string",
      anyOf: <any>[],
    },
  },
}
const globalSchema = ref(_.cloneDeep(defaultGlobalSchema))
let metaTemplateDetailTableData = ref({})
// meta的数据
let tempSchema = ref({
  type: "object",
  properties: {},
})
const metaFormProps = {
  layoutColumn: 2,
  labelPosition: "left",
  labelWidth: "75px",
  labelSuffix: ":  ",
}
const metaTemplateColumns = reactive<Object[]>([
  {
    title: "name",
    dataIndex: "name",
    key: "name",
    width: 180,
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
    width: 180,
  },
  {
    title: "tag",
    dataIndex: "tag",
    key: "tag",
  },
])
// resource的数据
const resourcescount = computed(() => resourcesDataSource.value.length + 1);
const resourceEditing = ref<any>(null)
interface ResourcesDataItem {
  key: string;
  alias: string;
  class: string;
  resourcetype: string;
}
interface columnDefinition {
  title: string;
  dataIndex: string;
  width?: string;
}
const resourcesDataSource: Ref<ResourcesDataItem[]> = ref([]);
const resourcesColumns: columnDefinition[] = [
  {
    title: "alias",
    dataIndex: "alias",
    width: "20%",
  },
  {
    title: "class",
    dataIndex: "class",
  },
  {
    title: "resourcetype",
    dataIndex: "resourcetype",
  },
  {
    title: "operation",
    dataIndex: "operation",
  },
]
// 如果有改动，这里就应该有数据
let metaInfo: any = ref(null)
let dataDefinition: any = ref(null)

function closeTemplateModel() {
  emit('close')
  activeKey.value = '1'
}

function save() {
  // 保存 Attribute 数据
  store.saveattr(globalFormData.value)
  // 保存 Meta 数据
  if (metaInfo.value) store.saveMeta(metaInfo.value)
  // 保存 Data Pool 数据
  if (dataDefinition.value) {
    store.saveData(dataDefinition.value.tableData , dataDefinition.value.tableColumns , dataDefinition.value.dataForm)
    storeAw.setDataDefinition(dataDefinition.value)
  }
  // 保存 Resources 数据
  debugger
  if (resourcesDataSource.value.length > 0) store.saveResources(resourcesDataSource.value)
  message.success('保存成功！')
}

// 添加resource列头的函数
function resourcesHandleAdd() {
  const newData = {
    key: `${resourcescount.value}`,
    alias: `Resourc${resourcescount.value}`,
    class: `Class${resourcescount.value}`,
    resourcetype: `resourceType${resourcescount.value}`,
  };
  resourcesDataSource.value.push(newData);
}

// 保存单元格的函数
function resourcesSave(key: string) {
  const reg = new RegExp(/\s+/g)
  const flag: boolean = Object.keys(resourceEditing.value).some((a: any) => reg.test(resourceEditing.value[a]))
  if (flag) return message.warning(t('MBTStore.varErrTip'))
  const index = resourcesDataSource.value.findIndex((a: any) => a.key === key)
  if (index !== -1) resourcesDataSource.value.splice(index , 1, resourceEditing.value)
  resourceEditing.value = null
}

// 取消修改的函数
function resourcesCancel(key: string) {
  resourceEditing.value = null
}

// 修改行的函数
function resourcesEdit(key: string) {
  resourceEditing.value = cloneDeep(
      resourcesDataSource.value.filter((item) => key === item.key)[0]
  )
}

// 删除行的函数
function onresourcesDelete(key: string) {
  resourcesDataSource.value = resourcesDataSource.value.filter(
      (item: { key: string; }) => item.key !== key
  )
}

function metaInfoChange(info: any) {
  metaInfo.value = info
}

function dataPoolChange(data: any) {
  data.dataForm = dataPoolRadio.value === 1 ? 'dynamic_template' : 'static_template'
  dataDefinition.value = data
}

function exportMeta() {
  const props = store.getMeta?.schema?.properties
  const data: any = store.getMeta.data
  if (!props || _.isEmpty(props)) return message.warning('暂无数据')
  const cols = [
    {
      title: '字段名',
      key: 'name'
    },
    {
      title: '值',
      key: 'value'
    },
    {
      title: '输入类型',
      key: 'type'
    }
  ]
  const arr = Object.keys(props).map((a: any) => {
    const val = data[a]
    return {
      name: a,
      type: val && val.type === '2' ? '自定义输入' : '选项输入',
      value: val && val.val ? val.val : ''
    }
  })
  exportFile(cols, arr)
}

function exportDataPool() {
  const dataPool = store.getDataPool
  if (!dataPool) return message.warning('暂无数据')
  exportFile(dataPool.tableColumns, dataPool.tableData)
}

function exportResource() {
  const resource = store.getResource
  if (!resource || !resource.length) return message.warning('暂无数据')
  const cols = Object.keys(resource[0]).map((key: string) => {
    return {
      title: key
    }
  })
  exportFile(cols, resource)
}

function exportData() {
  switch (activeKey.value) {
    case '2': {
      exportMeta()
      break
    }
    case '3': {
      exportDataPool()
      break
    }
    case '4': {
      exportResource()
      break
    }
  }
}

function customRequest() {
  //
}

async function handleUploadChange(file: any) {
  let data: any = await getExcelData(file)
  data = data.flat(Infinity)
  if (resourcesDataSource.value.length) {
    Modal.confirm({
      content: '导入后resources原本数据会被清除，还要进行导入操作吗？',
      onOk() {
        resourcesDataSource.value = data
      },
      cancelText: '取消',
      onCancel() {
        Modal.destroyAll()
      }
    })
  } else {
    resourcesDataSource.value = data
  }
}

</script>

<template>
  <a-modal
     v-model:visible="props.show"
     :title="$t('common.template')"
     :bodyStyle="{paddingBottom: '50px'}"
     :width="1000"
     @cancel="closeTemplateModel"
     :footer="null">
    <div class="infoPanel card-container">
      <a-tabs v-model:activeKey="activeKey" type="card">
        <a-tab-pane key="1" tab="Attributes" force-render style="height:550px;">
          <div style="padding: 5px" class="attrConfig">
            <VueForm
              v-model="globalFormData"
              :schema="globalSchema"
              :formFooter="{show:false}"
            ></VueForm>
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="Meta" style="height:550px; position: relative;">
          <meta-info
            v-if="props.show"
            :show-meta-info="activeKey === '2'"
            :isFormVisible="true"
            :metatemplatedetailtableData="metaTemplateDetailTableData"
            :schema="tempSchema"
            :metaformProps="metaFormProps"
            :metatemplatecolumns="metaTemplateColumns"
            @change="metaInfoChange"
          ></meta-info>
        </a-tab-pane>
        <a-tab-pane key="3" tab="Data Pool" style="height:550px; position: relative;">
          <a-radio-group v-model:value="dataPoolRadio">
            <a-radio :value="1">Dynamic Template</a-radio>
            <a-radio :value="2">Static Template</a-radio>
            <a-radio :value="3">Input directly</a-radio>
          </a-radio-group>
          <template-table
              ref="dynamicTable"
              v-if="dataPoolRadio === 1"
              :tableColumns="tableColumnsDynamic"
              :templateCategory="dataPoolRadio"
              :tableData="tableDataDynamic"
              @change="dataPoolChange"
          ></template-table>
          <template-table
              ref="staticTable"
              v-if="dataPoolRadio === 2"
              :tableColumns="tableColumns"
              :templateCategory="dataPoolRadio"
              :tableData="tableData"
              @change="dataPoolChange"
          ></template-table>
          <input-table
              ref="inputTable"
              v-if="dataPoolRadio === 3"
              :tableColumns="tableColumnsDirectInput"
              :tableData="tableDataDirectInput"
              @update="dataPoolChange"
          ></input-table>
        </a-tab-pane>
        <a-tab-pane key="4" tab="Resources" style="height:550px;">
          <a-button
              class="editable-add-btn"
              style="margin-bottom: 8px"
              @click="resourcesHandleAdd"
          >Add
          </a-button>
          <a-table
              bordered
              :data-source="resourcesDataSource"
              :columns="resourcesColumns"
          >
            <template #bodyCell="{ column, text, record }">
              <template
                  v-if="['alias', 'class', 'resourcetype'].includes(column.dataIndex)"
              >
                <div class="editable-cell">
                  <div
                      v-if="resourceEditing"
                      class="editable-cell-input-wrapper"
                  >
                    <a-input
                        type="string"
                        v-model:value.trim="resourceEditing[column.title]"
                        @pressEnter="resourcesSave(record.key)"
                    />
                  </div>
                  <div v-else class="editable-cell-text-wrapper">
                    {{ text || " " }}
                  </div>
                </div>
              </template>
              <template v-else-if="column.dataIndex === 'operation'">
                <div class="editable-row-operations">
                        <span v-if="resourceEditing">
                          <a-tooltip placement="bottom">
                            <template #title>
                              <span>{{ $t('common.saveText') }}</span>
                            </template>
                            <check-circle-outlined @click="resourcesSave(record.key)" class="icon--success-btn" />
                          </a-tooltip>
                          <a-divider type="vertical" />
                          <a-popconfirm
                              :title="$t('component.message.sureCancel')"
                              @confirm="resourcesCancel(record.key)"
                          >
                            <a-tooltip placement="bottom">
                              <template #title>
                                <span>{{ $t('common.cancelText') }}</span>
                              </template>
                              <close-circle-outlined @click="resourcesCancel(record.key)" class="icon--err-btn" />
                            </a-tooltip>
                          </a-popconfirm>
                        </span>
                  <span v-else>
                          <a-tooltip placement="bottom">
                            <template #title>
                              <span>{{ $t('common.editText') }}</span>
                            </template>
                            <edit-outlined @click="resourcesEdit(record.key)" class="icon--primary-btn" />
                          </a-tooltip>
                        </span>
                  <a-divider type="vertical" />
                  <span>
                          <a-popconfirm
                              v-if="resourcesDataSource.length"
                              title="Sure to delete?"
                              @confirm="onresourcesDelete(record.key)"
                          >
                            <a-tooltip placement="bottom">
                              <template #title>
                                <span>{{ $t('common.delText') }}</span>
                              </template>
                               <delete-outlined class="icon--primary-btn" />
                            </a-tooltip>
                          </a-popconfirm>
                        </span>
                </div>
              </template>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="mbt-modeler-btn-wrap" slot="footer">
      <a-button type="primary" @click="exportData" v-show="activeKey !== '1'">导出</a-button>
      <a-upload :customRequest="customRequest" :beforeUpload="handleUploadChange" accept=".xlsx, .xls" :showUploadList="false">
        <a-button type="primary" v-show="activeKey === '4'">导入</a-button>
      </a-upload>
      <a-button @click="closeTemplateModel">取消</a-button>
      <a-button type="primary" @click="save">保存</a-button>
    </div>
  </a-modal>
</template>

<style scoped>
.infoPanel{
  position: relative;
}
.card-container p {
  margin: 0;
}
.card-container > .ant-tabs-card .ant-tabs-content {
  height: 100%;
  margin-top: -16px;
}
.card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  padding: 16px;
  background: #fff;
}
.card-container > .ant-tabs-card > .ant-tabs-nav::before {
  display: none;
}
.card-container > .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab {
  border-radius: 6px 6px 0 0;
}
.card-container > .ant-tabs-card .ant-tabs-tab,
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}
.card-container > .ant-tabs-card .ant-tabs-tab-active,
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
  background: #fff;
  border-color: #fff;
}
#components-tabs-demo-card-top .code-box-demo {
  padding: 24px;
  overflow: hidden;
  background: #f5f5f5;
}
[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-content {
  height: 120px;
  margin-top: -8px;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab {
  background: transparent;
  border-color: transparent;
}
[data-theme='dark'] #components-tabs-demo-card-top .code-box-demo {
  background: #000;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {
  background: #141414;
}
[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab-active {
  background: #141414;
  border-color: #141414;
}
</style>