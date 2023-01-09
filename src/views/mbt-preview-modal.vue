<script lang="ts" setup>
import {ref, watch} from "vue";
import _ from "lodash";
import {message} from "ant-design-vue/es";
import {useI18n} from "vue-i18n";
import { VAceEditor } from 'vue3-ace-editor';
import ExcelJs from 'exceljs'

const { t } = useI18n()
let tableData = ref<any>([])
let tableCol = ref<any>([])
let script = ref<string>('')
let previewTree = ref()

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

function setExcelCell(workbook: any) {
  const col :Partial<ExcelJs.Column>[] = []
  let headerList: Array<string> = Object.keys(props.previewData[0]).filter((str: string) => str !== 'script')
  const workSheet = workbook.addWorksheet('是我')
  headerList.forEach((head: string) => {
    col.push({
      header: head,
      key: head,
      width: 120
    })
  })
  workSheet.columns = col
  props.previewData.forEach((a: any) => {
    workSheet.addRow(a)
  })
  // workSheet.eachRow({ includeEmpty: true }, (row: any, rowNumber: number) => {
  //   row.height = 240
  // })
}

function exportData() {
  const workbook = new ExcelJs.Workbook()
  // workbook.creator = 'zfTest'
  // workbook.lastModifiedBy = 'zf'
  // workbook.creator = String(new Date())
  // workbook.modified = new Date()
  // workbook.lastPrinted = new Date(1997, 2, 3)

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

  workbook.xlsx.writeBuffer().then((data) => {
    let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'zf' + '.xlsx';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(a.href);
    a.remove()
  });
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
  height: 100%;
  .left-tree {
    height: 55vh;
    overflow: auto;
    min-width: 140px;
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