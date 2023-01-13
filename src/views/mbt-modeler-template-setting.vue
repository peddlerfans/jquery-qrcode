<!--<script setup lang="ts">-->
<!--import {reactive, ref} from "vue";-->
<!--import {Stores} from "../../types/stores";-->
<!--import _ from "lodash";-->
<!--import MetaInfo from "@/components/metainfo.vue";-->

<!--interface Props {-->
<!--  show: boolean-->
<!--}-->
<!--const props = withDefaults(defineProps<Props>(), {-->
<!--  show: false-->
<!--})-->

<!--const activeKey = ref('1')-->
<!--// attributes的数据-->
<!--let globalformData = ref<Stores.mbtView>({-->
<!--  _id: '',-->
<!--  name: '',-->
<!--  description: '',-->
<!--  codegen_text: '',-->
<!--  codegen_script: '',-->
<!--})-->
<!--const defaultGlobalSchema = {-->
<!--  type: "object",-->
<!--  properties: {-->
<!--    name: {-->
<!--      title: "MBT Name",-->
<!--      type: "string",-->
<!--      readOnly: true,-->
<!--    },-->
<!--    description: {-->
<!--      title: "Description",-->
<!--      type: "string",-->
<!--    },-->
<!--    codegen_text: {-->
<!--      title: "Output Text",-->
<!--      type: "string",-->
<!--      anyOf: [],-->
<!--    },-->
<!--    codegen_script: {-->
<!--      title: "Output Script",-->
<!--      type: "string",-->
<!--      anyOf: [],-->
<!--    },-->
<!--  },-->
<!--}-->
<!--const globalschema = ref(_.cloneDeep(defaultGlobalSchema))-->
<!--const isFormVisible = ref(false)-->
<!--let metatemplatedetailtableData = ref({})-->
<!--// meta的数据-->
<!--let tempschema = ref({-->
<!--  type: "object",-->
<!--  properties: {},-->
<!--})-->
<!--const metaformProps = {-->
<!--  layoutColumn: 2,-->
<!--  labelPosition: "left",-->
<!--  labelWidth: "75px",-->
<!--  labelSuffix: ":  ",-->
<!--}-->
<!--const metatemplatecolumns = reactive<Object[]>([-->
<!--  {-->
<!--    title: "name",-->
<!--    dataIndex: "name",-->
<!--    key: "name",-->
<!--    width: 180,-->
<!--  },-->
<!--  {-->
<!--    title: "description",-->
<!--    dataIndex: "description",-->
<!--    key: "description",-->
<!--    width: 180,-->
<!--  },-->
<!--  {-->
<!--    title: "tag",-->
<!--    dataIndex: "tag",-->
<!--    key: "tag",-->
<!--  },-->
<!--])-->
<!--</script>-->

<!--<template>-->
<!--  <a-modal-->
<!--     v-model:visible="props.show" :title="$t('common.template')"-->
<!--     :bodyStyle="{paddingBottom: '50px'}"-->
<!--     :width="1000"-->
<!--     :footer="null">-->
<!--    <div class="infoPanel card-container">-->
<!--      <a-tabs v-model:activeKey="activeKey" type="card">-->
<!--        <a-tab-pane key="1" tab="Attributes" force-render style="height:550px;">-->
<!--          <div style="padding: 5px" class="attrconfig">-->
<!--            <VueForm-->
<!--                v-model="globalformData"-->
<!--                :schema="globalschema"-->
<!--                :formFooter="{show:false}"-->
<!--            ></VueForm>-->
<!--          </div>-->
<!--        </a-tab-pane>-->
<!--        <a-tab-pane key="2" tab="Meta" style="height:550px; position: relative;">-->
<!--          <meta-info-->
<!--            ref="metaInfo"-->
<!--            :show-meta-info="activeKey === '2'"-->
<!--            :isFormVisible="isFormVisible"-->
<!--            :metatemplatedetailtableData="metatemplatedetailtableData"-->
<!--            :schema="tempschema"-->
<!--            :metaformProps="metaformProps"-->
<!--            :metatemplatecolumns="metatemplatecolumns"-->
<!--          ></meta-info>-->
<!--        </a-tab-pane>-->

<!--        <a-tab-pane key="3" tab="Data Pool" style="height:550px; position: relative;">-->
<!--          <a-radio-group-->
<!--              v-model:value="templateRadiovalue"-->
<!--              @change="handleRadioChange(templateRadiovalue)"-->
<!--          >-->
<!--            <a-radio :value="1">Dynamic Template</a-radio>-->
<!--            <a-radio :value="2">Static Template</a-radio>-->
<!--            <a-radio :value="3">Input directly</a-radio>-->
<!--          </a-radio-group>-->
<!--          <template-table-->
<!--              v-if="templateRadiovalue === 1"-->
<!--              :tableColumns="tableColumnsDynamic"-->
<!--              :templateCategory="templateCategory"-->
<!--              :tableData="tableDataDynamic"-->
<!--          ></template-table>-->
<!--          &lt;!&ndash; &#45;&#45;********-&#45;&#45;{{tableData}}**-->
<!--            ++++{{tableColumns}}########                   &ndash;&gt;-->

<!--          <template-table-->
<!--              v-if="templateRadiovalue === 2"-->
<!--              :tableColumns="tableColumns"-->
<!--              :templateCategory="templateCategory"-->
<!--              :tableData="tableData"-->

<!--          ></template-table>-->
<!--          <input-table-->
<!--              :tableColumns="tableColumnsDirectInput"-->
<!--              :tableData="tableDataDirectInput"-->
<!--              v-if="templateRadiovalue === 3"-->
<!--              @update="handleDirectInput"-->
<!--          ></input-table>-->
<!--        </a-tab-pane>-->
<!--        <a-tab-pane key="4" tab="Resources" style="height:550px;">-->
<!--          <a-button-->
<!--              class="editable-add-btn"-->
<!--              style="margin-bottom: 8px"-->
<!--              @click="resourceshandleAdd"-->
<!--          >Add-->
<!--          </a-button>-->
<!--          <a-table-->
<!--              bordered-->
<!--              :data-source="resourcesdataSource"-->
<!--              :columns="resourcescolumns"-->
<!--          >-->
<!--            <template #bodyCell="{ column, text, record }">-->
<!--              <template-->
<!--                  v-if="['alias', 'class', 'resourcetype'].includes(column.dataIndex)"-->
<!--              >-->
<!--                <div class="editable-cell">-->
<!--                  <div-->
<!--                      v-if="resourceEditing"-->
<!--                      class="editable-cell-input-wrapper"-->
<!--                  >-->
<!--                    <a-input-->
<!--                        type="string"-->
<!--                        v-model:value.trim="resourceEditing[column.title]"-->
<!--                        @pressEnter="resourcessave(record.key)"-->
<!--                    />-->
<!--                  </div>-->
<!--                  <div v-else class="editable-cell-text-wrapper">-->
<!--                    {{ text || " " }}-->
<!--                  </div>-->
<!--                </div>-->
<!--              </template>-->
<!--              <template v-else-if="column.dataIndex === 'operation'">-->
<!--                <div class="editable-row-operations">-->
<!--                        <span v-if="resourceEditing">-->
<!--                          <a-tooltip placement="bottom">-->
<!--                            <template #title>-->
<!--                              <span>{{ $t('common.saveText') }}</span>-->
<!--                            </template>-->
<!--                            <check-circle-outlined @click="resourcessave(record.key)" class="icon&#45;&#45;success-btn" />-->
<!--                          </a-tooltip>-->
<!--                          <a-divider type="vertical" />-->
<!--                          <a-popconfirm-->
<!--                              :title="$t('component.message.sureCancel')"-->
<!--                              @confirm="resourcescancel(record.key)"-->
<!--                          >-->
<!--                            <a-tooltip placement="bottom">-->
<!--                              <template #title>-->
<!--                                <span>{{ $t('common.cancelText') }}</span>-->
<!--                              </template>-->
<!--                              <close-circle-outlined @click="resourcescancel(record.key)" class="icon&#45;&#45;err-btn" />-->
<!--                            </a-tooltip>-->
<!--                          </a-popconfirm>-->
<!--                        </span>-->
<!--                  <span v-else>-->
<!--                          <a-tooltip placement="bottom">-->
<!--                            <template #title>-->
<!--                              <span>{{ $t('common.editText') }}</span>-->
<!--                            </template>-->
<!--                            <edit-outlined @click="resourcesedit(record.key)" class="icon&#45;&#45;primary-btn" />-->
<!--                          </a-tooltip>-->
<!--                        </span>-->
<!--                  <a-divider type="vertical" />-->
<!--                  <span>-->
<!--                          <a-popconfirm-->
<!--                              v-if="resourcesdataSource.length"-->
<!--                              title="Sure to delete?"-->
<!--                              @confirm="onresourcesDelete(record.key)"-->
<!--                          >-->
<!--                            <a-tooltip placement="bottom">-->
<!--                              <template #title>-->
<!--                                <span>{{ $t('common.delText') }}</span>-->
<!--                              </template>-->
<!--                               <delete-outlined class="icon&#45;&#45;primary-btn" />-->
<!--                            </a-tooltip>-->
<!--                          </a-popconfirm>-->
<!--                        </span>-->
<!--                </div>-->
<!--              </template>-->
<!--            </template>-->
<!--          </a-table>-->
<!--        </a-tab-pane>-->
<!--      </a-tabs>-->
<!--    </div>-->
<!--    <div class="mbt-modeler-btn-wrap" slot="footer">-->
<!--      <a-button type="primary" @click="exportData" v-show="activeKey !== '1'">导出</a-button>-->
<!--      <a-upload :customRequest="customRequest" :beforeUpload="handleUploadChange" accept=".xlsx, .xls" :showUploadList="false">-->
<!--        <a-button type="primary" v-show="activeKey === '4'">导入</a-button>-->
<!--      </a-upload>-->
<!--      <a-button @click="closeTemplateModel">取消</a-button>-->
<!--      <a-button type="primary" @click="handleOk">保存</a-button>-->
<!--    </div>-->
<!--  </a-modal>-->
<!--</template>-->

<!--<style scoped>-->
<!--.infoPanel{-->
<!--  position: relative;-->
<!--}-->
<!--.card-container p {-->
<!--  margin: 0;-->
<!--}-->
<!--.card-container > .ant-tabs-card .ant-tabs-content {-->
<!--  height: 100%;-->
<!--  margin-top: -16px;-->
<!--}-->
<!--.card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {-->
<!--  padding: 16px;-->
<!--  background: #fff;-->
<!--}-->
<!--.card-container > .ant-tabs-card > .ant-tabs-nav::before {-->
<!--  display: none;-->
<!--}-->
<!--.card-container > .ant-tabs-card.ant-tabs-top > .ant-tabs-nav .ant-tabs-tab {-->
<!--  border-radius: 6px 6px 0 0;-->
<!--}-->
<!--.card-container > .ant-tabs-card .ant-tabs-tab,-->
<!--[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab {-->
<!--  background: transparent;-->
<!--  border-color: transparent;-->
<!--}-->
<!--.card-container > .ant-tabs-card .ant-tabs-tab-active,-->
<!--[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-tab-active {-->
<!--  background: #fff;-->
<!--  border-color: #fff;-->
<!--}-->
<!--#components-tabs-demo-card-top .code-box-demo {-->
<!--  padding: 24px;-->
<!--  overflow: hidden;-->
<!--  background: #f5f5f5;-->
<!--}-->
<!--[data-theme='compact'] .card-container > .ant-tabs-card .ant-tabs-content {-->
<!--  height: 120px;-->
<!--  margin-top: -8px;-->
<!--}-->
<!--[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab {-->
<!--  background: transparent;-->
<!--  border-color: transparent;-->
<!--}-->
<!--[data-theme='dark'] #components-tabs-demo-card-top .code-box-demo {-->
<!--  background: #000;-->
<!--}-->
<!--[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-content > .ant-tabs-tabpane {-->
<!--  background: #141414;-->
<!--}-->
<!--[data-theme='dark'] .card-container > .ant-tabs-card .ant-tabs-tab-active {-->
<!--  background: #141414;-->
<!--  border-color: #141414;-->
<!--}-->
<!--</style>-->