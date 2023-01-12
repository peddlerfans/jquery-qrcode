<script lang="ts" setup>
import {ref, watch} from "vue";
import _ from "lodash";
import {message} from "ant-design-vue/es";
import {useI18n} from "vue-i18n";
import { VAceEditor } from 'vue3-ace-editor';
import http from "@/utils/http";
import {useRoute} from "vue-router";
import {saveAs} from '@/utils/fileAction'
import ExcelJs from 'exceljs'
import JSZip from "jszip";

const { t } = useI18n()
let tableData = ref<any>([])
let tableCol = ref<any>([])
let script = ref<string>('')
let previewTree = ref()
const route = useRoute()

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

watch(() => props.visible, value => {
  if (value) {
    if (_.isEmpty(props.previewData)) {
      emit('closeModal')
      message.warning(t('MBTStore.noPreviewData'))
      return
    }
    // 处理详情表头数据
    handleTableCol()
  } else {
    tableData.value = []
    tableCol.value = []
    script.value = ''
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
    <div class="preview-wrap">
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
          <div class="top">
            <a-table
                :data-source="tableData"
                :columns="tableCol"
                :pagination="{hideOnSinglePage: true}">
              <template #bodyCell="{text}">
                <div style="white-space: pre;">{{ text }}</div>
              </template>
            </a-table>
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
  .left-tree {
    height: 56vh;
    overflow: auto;
    min-width: 140px;
    overflow: auto;
  }
  .right-detail {
    margin-left: 8px;
    flex: 1;
    display: flex;
    flex-direction: column;
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