<script lang="ts" setup>
import {onMounted, reactive, ref, watch} from "vue";
import _ from "lodash";
import {message} from "ant-design-vue/es";
import {useI18n} from "vue-i18n";
import { VAceEditor } from 'vue3-ace-editor';
import http from "@/utils/http";
import {useRoute} from "vue-router";
import {saveAs} from '@/utils/fileAction'
import ExcelJs from 'exceljs'
import JSZip from "jszip";
import {arr2Tree} from "@/utils/treeData";

const { t } = useI18n()
let tableData = ref<any>([])
let tableCol = ref<any>([])
let script = ref<string>('')
let previewTree = ref()
let activeKey = ref('1')
const route = useRoute()
const treeData = ref()
const scriptPath = ref()

interface Props {
  visible: boolean,
  previewData: any,
  outLang: string
}
const props = withDefaults(defineProps<Props>(), {
  visible: false,
  previewData: {},
  outLang: ''
})


function handleTableCol () {
  let temp: any = props.previewData[0]
  if (!temp) return
  Object.keys(temp).forEach((key: string) => {
    if (key !== 'script') {
      tableCol.value.push({
        title: key,
        dataIndex: key,
        key: key,
        width: 50
      })
    }
  })
}

function splitByFile(script: string) {
  let pos: number = 0
  let result: any = {}
  const tempTableData = _.cloneDeep(tableData.value)
  let r = /^(.*---- filename: (.+)----.*)$/gm
  let res: any = r.exec(script)
  let defaultName: any = res[2] ? res[2] : tempTableData.unshift().id
  do {
    res = r.exec(script)
    if (res) {
      if ( pos ===0 && res.index>0) {
        result[defaultName] = script.slice(0, res.index)
      } else {
        result[defaultName] = script.slice(pos + res[1].length + 1, res.index)
      }
      defaultName = res[2]
      pos = res.index
    } else {
      result[defaultName] = script.slice(pos)
    }
  } while (res)
  return result
}

watch(() => props.visible, value => {
  if (value) {
    if (_.isEmpty(props.previewData)) {
      emit('closeModal')
      message.warning(t('MBTStore.noPreviewData'))
      return
    }
    // 处理详情表头数据
    handleTableCol()
    tableData.value = props.previewData
    script.value = props.previewData[0].script
    // script 里面可能包含多个文件，需要获取拆分数据
    scriptPath.value = splitByFile(script.value)
    // 生成树形数据
    treeData.value = arr2Tree(Object.keys(scriptPath.value))
  } else {
    tableData.value = []
    tableCol.value = []
    script.value = ''
  }
})

// 分页数据
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  pageSizeOptions: ['10', '20', '50', '100', '200'],
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: any, range: any[]) => t('component.table.pageTip', {
    head: range[0],
    tail: range[1],
    total: total
  }),
  onShowSizeChange: (page: any, pageSize: any) => {
    pagination.current = page
    pagination.pageSize = pageSize
  },
  onChange: (page: number, pageSize: number) => {
    pagination.current = page
    pagination.pageSize = pageSize
  }
})

const emit = defineEmits(['closeModal'])

function cancelPreview () {
  emit('closeModal')
}

function selectTreeNode(selectedKeys: any, info: any) {
  tableData.value.length = 0
  tableData.value.push(info.node.dataRef)
  script.value = info.node.script
}

function publish() {
  const id = route.params?._id
  http.post(`/api/test-models/${id}/publish`).then(() => {
    message.success('发布成功')
  }).catch(() => message.warning('发布失败'))
}

function setExcelCell(workbook: any) {
  const col :Partial<ExcelJs.Column>[] = []
  let headerList: Array<string> = Object.keys(props.previewData[0]).filter((str: string) => str !== 'script')
  const workSheet = workbook.addWorksheet('是我')
  headerList.forEach((head: string) => {
    col.push({
      header: head,
      key: head,
      width: 120,
    })
  })
  workSheet.columns = col
  props.previewData.forEach((a: any) => {
    workSheet.addRow(a)
  })
}

async function exportData() {
  const workbook = new ExcelJs.Workbook()
  const jsZip = new JSZip()
  workbook.views = [
    {
      x: 0,
      y: 0,
      width: 1000,
      height: 2000,
      firstSheet: 0,
      activeTab: 1,
      visibility: 'visible'
    }
  ]
  setExcelCell(workbook)
  let excelData = await workbook.xlsx.writeBuffer()
  let blob = new Blob([excelData], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  jsZip.file('zftext.xlsx', blob)
  props.previewData.forEach((item: any) => {
    const txtBlob = new Blob([item.script])
    jsZip.file(`${item.id}.txt`, txtBlob)
  })
  jsZip.generateAsync({
    type: 'blob'
  }).then(blob => {
    saveAs(blob, `zfText.zip`)
  })
}

function handleSelect(selectedKeys: any, info: any) {
  // 拼接路径名
  let key: string = ''
  const pNode = info.node.parent.nodes
  pNode.forEach((a: any) => {
    const v = '/' + (a.title === '/' ? '' : a.title)
    key +=  v
  })
  key += '/' + info.node.title
  key = key.slice(1)
  const tempScript = scriptPath.value[key]
  if (tempScript) script.value = tempScript
}

</script>

<template>
  <a-modal v-model:visible="props.visible"
           :title="$t('MBTStore.previewModel')"
           :footer="null"
           :keyboard="true"
           :mask-closable="true"
           width="70%"
           centered
           class="previewModel"
           @cancel="cancelPreview">
    <!-- <div class="preview-wrap">
      <div class="left-tree">
        <a-tree
            ref="previewTree"
            :tree-data="props.previewData"
            :virtual="true"
            @select="selectTreeNode">
          <template #title="{id}">
            <span>{{ id }}</span>
          </template>
        </a-tree>
      </div>
      <div class="right-detail">
        <template v-if="tableData.length">
          <div class="top" style="width: 100%; overflow-x: hidden">
            <ATable
                :scroll="{ x: true }"
                class="previewText"
                :data-source="tableData"
                :columns="tableCol"
                :pagination="{hideOnSinglePage: true}">
              <template #bodyCell="{text}">
                <div style="white-space: pre;">{{ text }}</div>
              </template>
            </ATable>
          </div>
          <div class="bottom">
            <VAceEditor
                v-model:value="script"
                class="ace-result"
                :wrap="true"
                :readonly="true"
                :lang="props.outLang"
                theme="sqlserver"
                :options="{ useWorker: true }"
            ></VAceEditor>
          </div>
        </template>
        <template v-else>
          <div>{{ $t('MBTStore.selectTip') }}</div>
        </template>
      </div>
    </div> -->
      <div class="preview-wrap">
        <a-tabs v-model:activeKey="activeKey" type="card" class="mbt-preview-modal-tab">
          <a-tab-pane key="1" tab="text">
            <!-- <template v-if="tableData.length"> -->
              <div class="top" style="width: 100%;height:100%" >
                <ATable
                  class="previewText"
                  :data-source="tableData"
                  :columns="tableCol"
                  :pagination="pagination">
                <template #bodyCell="{text}">
                  <div style="white-space: pre;">{{ text }}</div>
                </template>
              </ATable>
            </div>
            <!-- </template> -->

          </a-tab-pane>
          <a-tab-pane key="2" tab="script" style="height:500px">
            <div class="script-wrap">
              <a-tree
                  :defaultExpandAll="true"
                  class="script-tree"
                  :tree-data="treeData"
                  @select="handleSelect"
              ></a-tree>
              <a-divider type="vertical" />
              <VAceEditor
                  v-model:value="script"
                  class="ace-result"
                  :wrap="true"
                  :readonly="true"
                  :lang="props.outLang"
                  theme="sqlserver"
                  :options="{ useWorker: true }"
              ></VAceEditor>
            </div>
          </a-tab-pane>
        </a-tabs>
      </div>
    <div class="btn-wrap" slot="footer">
      <a-divider></a-divider>
      <div class="btn-list">
        <a-button type="primary" @click="exportData">导出</a-button>
        <a-button type="primary" @click="publish">发布</a-button>
        <a-button @click="cancelPreview">关闭</a-button>
      </div>
    </div>
  </a-modal>
</template>

<style scoped lang="less">
.ant-table-cell {
  white-space: pre;
}

.preview-wrap {
  display: flex;
  height: 94%;
  .ant-tabs > .ant-tabs-content-holder > .ant-tabs-content {
    height: 100%!important;
  }
  .mbt-preview-modal-tab {
    width: 100%;
  }
  /deep/ .script-wrap {
    display: flex;
    height: 100%;
    .script-tree {
      width: 180px;
      overflow: auto;
    }
    .ace-result {
      height: 100%;
    }
  }
  /deep/ .ant-tabs-content-holder {
    overflow: auto;
  }
  .left-tree {
    height: 110vh;
    overflow: auto;
    min-width: 140px;
    width: 8.75rem;
  }
  .right-detail {
    width: 86%;
    margin-left: 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
    .previewText{
      width: 100%;
      height: 100%;
    }
    .bottom {
      flex: 1;
      .ace-result {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.btn-wrap {
  position: absolute;
  bottom: 0;
  left: 0;
  .btn-list {
    display: flex;
    justify-content: end;
    padding-left: 16px;
    padding-bottom: 16px;
    .ant-btn {
      margin-left: 16px;
    }
  }
}
</style>