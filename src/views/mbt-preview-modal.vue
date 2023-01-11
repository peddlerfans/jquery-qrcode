<script lang="ts" setup>
import {nextTick, ref, watch} from "vue";
import _ from "lodash";
import {message} from "ant-design-vue/es";
import {useI18n} from "vue-i18n";
import { VAceEditor } from 'vue3-ace-editor';
import http from "@/utils/http";
import {useRoute} from "vue-router";

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
    <div class="btn-wrap">
      <a-button type="primary" @click="publish">发布</a-button>
      <a-button @click="cancelPreview" style="margin-left: 8px;">关闭</a-button>
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
    height: 100%;
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
  display: flex;
  justify-content: end;
}
</style>