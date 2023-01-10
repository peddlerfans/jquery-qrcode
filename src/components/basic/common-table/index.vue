<script setup lang="ts">
import { message } from "ant-design-vue/es"
import request from "@/utils/request";
import {
  nextTick,
  onMounted,
  reactive,
  ref,
  computed,
  unref
} from 'vue'
import {
  statesTs,
  typeOptions,
  typeOptions2,
  tableSelectParams
} from "./common-table"
import cloneDeep from "lodash-es/cloneDeep";
import router from "@/router";
import { useI18n } from "vue-i18n";
import {Rule} from "ant-design-vue/es/form";
import {
  EditOutlined,
  DeleteOutlined,
  CopyOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  UpCircleOutlined,
  DownCircleOutlined,
  FileSearchOutlined
} from '@ant-design/icons-vue'

const { t } = useI18n()

interface Props {
  fetchObj: any,
  columns: any,
  tableRef: any,
  isGlobal: boolean,
  checkUrl?: string
}

let loading = ref(false)
let selectionList = ref([])

// 暂存编辑的数据
let tempRow: any = null

const props = withDefaults(defineProps<Props>(), {
  fetchObj: {
    url: '',
    params: {},
    noPage: false,
    createParams: '',
    searchText: '',
    selection: null,
  },
  columns: [],
  tableRef: '',
  isGlobal: false
})

const initTableSelect = () => {
  let tar = props.fetchObj.selection
  if (!tar) return
  let temp = {
    selections: tar.selections,
    onChange: (changeArr: any, selectedRows: any) => {
      selectionList.value = selectedRows
    }
  }
  return temp
}
const tableSelect = initTableSelect()

/**
 * 表格 action 列方法回传父组件
 * defineEmits 的参数是编译标识（并不是一个函数），必须严格按照规则使用，否则无法识别。
 * 不能使用变量，去找祖师爷提issue
 * */
// 获取需要回传事件数组
let events = props.columns.filter((a: any) => a.title === 'action')
events = events[0]?.cbName || []
const emit = defineEmits(['edit', 'go2Page', 'delete', 'save','clone', 'pageChange', 'detail'])

let tableData = ref<Array<any>>([])
let tagInputRef = ref()
let valueInputRef = ref()
let enumInputRef = ref()

const checkTypeOption = () => {
  const type = props.columns.filter((a: any) => a.title === 'type')
  const option = type[0]?.option
  if (option) return option === '1' ? typeOptions : typeOptions2
  else return []
}
const typeOption: any = checkTypeOption()

// 添加的表单tags
let states = ref<statesTs>({
  // tags 编辑变量
  tags: [],
  inputVisible: false,
  inputValue: '',
  // enum 编辑变量
  enum: [],
  enumInputVisible: false,
  enumInputValue: '',
  // values 编辑变量
  values: [],
  valueInputVisible: false,
  valueInputValue: '',
})

const resetStates = () => {
  states.value = {
    tags: [],
    inputVisible: false,
    inputValue: '',
    enum: [],
    enumInputVisible: false,
    enumInputValue: '',
    values: [],
    valueInputVisible: false,
    valueInputValue: ''
  }
}

onMounted(() => {
  query()
})

const isEditing = computed(() => {
  const editingRow = tableData.value.reduce((total, row) => {
    if (row.editing) total++
    return total
  }, 0)
  return editingRow > 0
})

const query = async (searchText?: string) => {
  let url = props.fetchObj.url
  if (!url) return
  loading.value = true
  if (searchText) pagination.current = 1
  const qParams = props.fetchObj.createParams
  const params = {
    search: props.fetchObj.searchText,
    q: qParams ? `category:${qParams}` : '',
    page: pagination.current,
    perPage: pagination.pageSize
  }
  let rst = await request.get(url, { params })
  loading.value = false
  tableData.value = (rst.data).map((item: any, index: string) => ({ ...item, key: index }))
  pagination.total = rst.total
}

const getSearchRes = async (name: string) => {
  let url = props.fetchObj.url || props.checkUrl
  if (!url) return []
  const qParams = props.fetchObj.createParams
  const params = {
    search: name,
    q: qParams ? `category:${qParams}` : '',
    page: 1,
    perPage: 10
  }
  return await request.get(url, { params })
}

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
    query()
  },
  onChange: (page: number, pageSize: number) => {
    pagination.current = page
    pagination.pageSize = pageSize
    if (props.fetchObj.url) query()
    else emit('pageChange', pagination)
  }
})

// 结构化表格数据
const handleColumn = (obj: any) => {
  let temp: any = {
    title: obj.title,
    dataIndex: obj.dataIndex ? obj.dataIndex : obj.title,
    key: obj.title,
    width: obj.width,
    link: obj.link ? obj.link : '',
    require: !!obj.require
  }
  if (obj.title === 'action') temp.actionList = obj.actionList || []
  return temp
}

const columns = ref(props.columns.map((item: any) => handleColumn(item)))

/**
 * 表单的校验
 * 目前只支持 name 和 description 的校验
 * */
let nameForm = ref()
let descriptionForm = ref()

const checkName = async (_rule: Rule, value: string) => {
  let reg = /^[a-zA-Z\$_][a-zA-Z\d_]*$/
  let reg1 = /^[\u4e00-\u9fa5_a-zA-Z0-9$]+$/
  if (!value) {
    return Promise.reject(t('templateManager.nameinput'))
  } else if (tempRow && tempRow._id && tempRow.name === value) {
    return Promise.resolve()
  } else if (!reg.test(value) && !reg1.test(value)) {
    return Promise.reject(t('templateManager.namehefa'))
  } else {
    let rst: any = await getSearchRes(`@name:${value}`)
    if (rst.data && rst.data.length > 0 && rst.data.some((a: any) => a.name === value)) {
      return Promise.reject(t('templateManager.duplicate'))
    } else {
      return Promise.resolve();
    }
  }
}

const checkDescription = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject(t('templateManager.description'))
  }
}

const nameValidate = [
  { required: true, validator: checkName, trigger: 'blur' }
]
const descriptionValidate = [
  { required: true, validator: checkDescription, trigger: 'blur' }
]

const getRuleData = () => {
  let temp: any = {}
  if (columns.value.some((a: any) => a.title === 'name' && a.require))
    temp.name = nameValidate
  if (columns.value.some((a: any) => a.title === 'description' && a.require))
    temp.description = descriptionValidate
  return temp
}

let rules: Record<string, Rule[]> = getRuleData()

const confirm = (e: any) => {
  removeTableRow(e)
}

const removeTableRow = async (obj: any) => {
  loading.value = true
  const url = props.fetchObj.url
  if (obj.isNewRow) delete obj.isNewRow
  if (!url) {
    loading.value = false
    return emit('delete', obj)
  }
  request.delete(`${url}/${obj._id}`).then(() => {
    const index = tableData.value.indexOf(obj)
    tableData.value.splice(index, 1)
    message.success(t('component.message.delText'))
  }).finally(() => loading.value = false)
}

const tableCheckChange = (e: any, row: any) => {
  row.require = e.target.checked
}

const editRow = (rowData: any) => {
  if (isEditing.value) return message.warning(t('component.message.errTip1'))
  tempRow = rowData
  if (events.includes('edit') && !rowData.isNewRow) {
    emit('edit', rowData)
  } else {
    tempRow = cloneDeep(rowData)
    rowData.editing = true
    states.value.tags = rowData.tags || []
    states.value.enum = rowData.enum || []
    states.value.values = rowData.values || []
  }
}

const detailRow = (rowData: any) => {
  emit('detail', rowData)
}

// 交换两个数组元素位置
const swapArray = (index1: number, index2: number) => {
  tableData.value[index1] = tableData.value.splice(index2, 1, tableData.value[index1])[0]
}

const upRow = (index: number) => {
  if(index !== 0) {
    swapArray(index, index - 1);
  } else {
    message.warning(t('component.message.cantUpItem'))
  }
}

const downRow = (index: number) => {
  if (index+1 !== tableData.value.length) {
    swapArray(index, index+1);
  } else {
    message.warning(t('component.message.cantDownItem'))
  }
}

const save = async (rowData: any) => {
  let nameValidate = !unref(nameForm) || await unref(nameForm).validate()
  let descriptionValidate = !unref(descriptionForm) || await unref(descriptionForm).validate()
  if (nameValidate && descriptionValidate) {
    const temp = tableData.value.filter(row => row.editing)[0]
    if (props.columns.some((a: any) => a.title === 'tags')) temp.tags = states.value.tags
    if (props.columns.some((a: any) => a.title === 'enum')) temp.enum = states.value.enum
    if (props.columns.some((a: any) => a.title === 'values')) temp.values = states.value.values
    // 如果没有 url 说明不立即更新，暂存至表格内，等待更新数据
    temp.editing = false
    delete rowData.isNewRow
    if (!props.fetchObj.url) {
      resetStates()
      emit('save', {
        ...rowData,
        index: tableData.value.indexOf(rowData)
      })
      return
    }
    const q = props.fetchObj.createParams
    if (q) temp.category = props.fetchObj.createParams
    if (rowData.isNewRow) delete rowData.isNewRow
    if (rowData._id) {
      updateTableData(temp)
    } else {
      newTableData(temp)
    }
    resetStates()
  }
}

// 更新数据
const updateTableData = (newData: any) => {
  let url = props.fetchObj.url
  if (!url) return
  loading.value = true
  request.put(`${url}/${newData._id}`, newData)
    .then((res: any) => {
      const index = tableData.value.indexOf(newData)
      tableData.value.splice(index, 1, res)
      message.success(t('component.message.updateText'))
    })
    .catch(e => message.error(t('component.message.updateErr')))
    .finally(() => loading.value = false )
}

// 新建数据更新
const newTableData = (newData: any) => {
  const url = props.fetchObj.url
  if (!url) return
  loading.value = true
  request.post(url, newData).then((res: any) => {
    const index = tableData.value.indexOf(newData)
    tableData.value.splice(index, 1, res)
    message.success(t('component.message.addText'))
  }).catch(e => {
    newData.isNewRow = true
    newData.editing = true
  }).finally(() => loading.value = false )
}

const cancel = (rowData: any) => {
  const flag = rowData.isNewRow
  if (flag) {
    tableData.value = tableData.value.filter(a => !Object.is(rowData, a))
  } else {
    const index = tableData.value.indexOf(rowData)
    tableData.value[index] = tempRow
  }
  tempRow = null
  resetStates()
}

// 移除tags
const handleTagClose = (removedTag: string) => {
  const temp = states.value.tags.filter((a: string) => a !== removedTag)
  states.value.tags = temp
}
const handleEnumClose = (removeEnum: string) => {
  const temp = states.value.enum.filter((a: string) => a !== removeEnum)
  states.value.enum = temp
}
const handleValueClose = (removeValue: string) => {
  const temp = states.value.values.filter((a: string) => a !== removeValue)
  states.value.values = temp
}

// tag标签失去焦点之后添加的tags
const handleInputConfirm = () => {
  let tags = states.value.tags
  if (states.value.inputValue && tags.indexOf(states.value.inputValue) === -1) {
    tags = [...tags, states.value.inputValue]
  }
  states.value.tags = tags
  states.value.inputValue = ''
  states.value.inputVisible = false
}
const handleFactorEnumConfirm = () => {
  let tags = states.value.enum
  if (states.value.enumInputValue && tags.indexOf(states.value.enumInputValue) === -1) {
    tags = [...tags, states.value.enumInputValue]
  }
  states.value.enum = tags
  states.value.enumInputValue = ''
  states.value.enumInputVisible = false
}
const handleValueConfirm = () => {
  let tags = states.value.values
  if (states.value.valueInputValue && tags.indexOf(states.value.valueInputValue) === -1) {
    tags = [...tags, states.value.valueInputValue]
  }
  states.value.values = tags
  states.value.valueInputValue = ''
  states.value.valueInputVisible = false
}

// 点击添加标签的方法
const showInput = () => {
  states.value.inputVisible = true
  nextTick(() => {
    tagInputRef.value.focus();
  })
}

// 点击添加 value 的方法
const showValueInput = () => {
  states.value.valueInputVisible = true
  nextTick(() => {
    valueInputRef.value.focus();
  })
}

// 点击添加 enum 的方法
const showEnumInput = () => {
  states.value.enumInputVisible = true
  nextTick(() => {
    enumInputRef.value.focus();
  })
}

// 新建一行数据
const createNewRow = (createObj: any) => {
  if (isEditing.value) return message.warning(t('component.message.errTip1'))
  if (!createObj.isNewRow) createObj.isNewRow = true
  createObj.editing= true
  tableData.value.unshift(createObj)
}

// 抛出表格数据变更函数
const changeTableData = (data: any) =>{
  tableData.value = data.tableData
  pagination.current = data.page
  pagination.total = data.total
}

// 跳转页面
const go2Page = (record: any, column: any) => {
  if (column.link === 'custom') {
    return emit('go2Page', {...record, clickTar: column.title})
  }
  let url = `/${column.link}/${record._id}/${record.name}`
  router.push(url)
}

const setTableData = (data: any) => {
  if (Array.isArray(data)) tableData.value = data
  else {
    tableData.value = data.tableData
    if (data.hasOwnProperty('currentPage')) pagination.current = data.currentPage
    if (data.hasOwnProperty('pageSize')) pagination.pageSize = data.pageSize
    if (data.hasOwnProperty('total')) pagination.total = data.total
  }
}

const getTableData = () => {
  return tableData.value
}

const changeColumn = (col: Array<any>) => {
  columns.value = col.map((a: any) => handleColumn(a))
}

const cloneRow = (obj: any) => {
  emit('clone', obj)
}

defineExpose({
  createNewRow,
  query,
  changeTableData,
  setTableData,
  getTableData,
  changeColumn,
  loading,
  selectionList,
})

</script>

<template>
  <a-table
      :row-key="(record: any) => record._id"
      :row-selection="tableSelect"
      :loading="loading"
      :pagination="pagination"
      :ref="tableRef"
      :data-source="tableData"
      :columns="columns"
      :scroll="{ x: true }"
      bordered>
    <template #headerCell="{ column }">
      <!--      <span>{{ column.title }}</span>-->
      <span>{{ $t(`component.table.${column.title}`) }}</span>
    </template>
    <template #bodyCell="{ column, text, record, index }">
      <template v-if="column.key === 'name'">
        <template v-if="record.editing">
          <a-form :model="record" ref="nameForm" :rules="rules">
            <a-form-item name="name">
              <a-input
                  v-model:value="record.name"
                  style="margin: -5px 0"
              ></a-input>
            </a-form-item>
          </a-form>
        </template>
        <template v-else-if="record._highlight && record._highlight.name">
          <a
              @click="go2Page(record, column)"
              v-for="item in record._highlight.name"
              v-html="item"
          ></a>
        </template>
        <template v-else>
          <a-tooltip placement="bottom" v-if="record.validationError">
            <template #title>
              <span>{{ record.validationError }}</span>
            </template>
            <exclamation-circle-outlined style="color: #c2953c;margin-right: 8px;" />
          </a-tooltip>
          <template v-if="column.link">
            <a @click="go2Page(record, column)">{{ text }}</a>
          </template>
          <template v-else>
            <span>{{ text }}</span>
          </template>
        </template>
      </template>
      <template v-if='column.key==="type"'>
        <a-select
            ref="select"
            v-if="record.editing"
            v-model:value.trim="record.type"
            :options="typeOption"
        ></a-select>
        <template v-else>{{ text }}</template>
      </template>
      <template v-else-if="column.key === 'values'">
        <template v-if="record.editing">
          <template v-for="(tag) in states.values" :key="tag">
            <a-tooltip v-if="tag.length > 20" :title="tag">
              <a-tag :closable="true" :visible="true" @close="handleValueClose(tag)">
                {{ `${tag.slice(0, 20)}...` }}
              </a-tag>
            </a-tooltip>
            <a-tag v-else-if="tag.length === 0"></a-tag>
            <a-tag v-else :closable="true" :visible="true" @close="handleValueClose(tag)">
              {{tag}}
            </a-tag>
          </template>
          <template v-if="states.valueInputVisible">
            <a-input
                v-if="record.type !== 'number'"
                ref="valueInputRef"
                v-model:value.trim="states.valueInputValue"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                @blur="handleValueConfirm"
                @keyup.enter="handleValueConfirm" />
            <a-input-number
                v-if="record.type === 'number'"
                ref="valueInputRef"
                v-model:value.number="states.valueInputValue"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                @blur="handleValueConfirm"
                @keyup.enter="handleValueConfirm" />
          </template>
          <a-tag
              v-else
              style="background: #fff; border-style: dashed"
              @click="showValueInput">
            <plus-outlined />
            {{ $t('common.newValue') }}
          </a-tag>
        </template>
        <span v-else>
            <a-tag v-for="tag in record.values" :key="tag" color="cyan">
              {{ tag }}
            </a-tag>
          </span>
      </template>
      <template v-else-if="column.key === 'enum'">
        <template v-if="record.editing">
          <template v-for="(tag) in states.enum" :key="tag">
            <a-tooltip v-if="tag.length > 20" :title="tag">
              <a-tag :closable="true" :visible="true" @close="handleEnumClose(tag)">
                {{ `${tag.slice(0, 20)}...` }}
              </a-tag>
            </a-tooltip>
            <a-tag v-else-if="tag.length === 0"></a-tag>
            <a-tag v-else :closable="true" :visible="true" @close="handleEnumClose(tag)">
              {{tag}}
            </a-tag>
          </template>
          <template v-if="states.enumInputVisible">
            <a-input
                v-if="record.type !== 'number'"
                ref="enumInputRef"
                v-model:value.trim="states.enumInputValue"
                type="text"
                size="small" :style="{ width: '78px' }"
                @blur="handleFactorEnumConfirm"
                @keyup.enter="handleFactorEnumConfirm" />
            <a-input-number
                v-if="record.type === 'number'"
                ref="enumInputRef"
                v-model:value.number="states.enumInputValue"
                type="text"
                size="small" :style="{ width: '78px' }"
                @blur="handleFactorEnumConfirm"
                @keyup.enter="handleFactorEnumConfirm" />
          </template>
          <a-tag
              v-else
              style="background: #fff; border-style: dashed"
              @click="showEnumInput">
            <plus-outlined />
            {{ $t('common.newValue') }}
          </a-tag>
        </template>
        <span v-else>
            <a-tag v-for="tag in record.enum" :key="tag" color="cyan">
              {{ tag }}
            </a-tag>
          </span>
      </template>
      <template v-else-if="column.key === 'description'">
        <template v-if="record.editing">
          <a-form :model="record" ref="descriptionForm" :rules="rules">
            <a-form-item name="description">
              <a-input
                  v-model:value="record.description"
                  style="margin: -5px 0"
              ></a-input>
            </a-form-item>
          </a-form>
        </template>
        <template v-else-if="record._highlight && record._highlight.description">
          <p v-for="item in record._highlight.description" v-html="item"></p>
        </template>
        <template v-else>{{ text }}</template>
      </template>
      <template v-else-if="column.key === 'default'">
        <template v-if="record.editing">
          <a-form>
            <a-form-item name="description">
              <a-input
                  v-model:value="record.default"
                  style="margin: -5px 0"
              ></a-input>
            </a-form-item>
          </a-form>
        </template>
        <template v-else>{{ text }}</template>
      </template>
      <template v-else-if="column.key === 'tags'">
        <template v-if="record.editing">
          <template v-for="tag in states.tags" :key="tag">
            <a-tooltip v-if="tag.length > 20" :title="tag">
              <a-tag :closable="true" @close="handleTagClose(tag)">
                {{ `${tag.slice(0, 20)}...` }}
              </a-tag>
            </a-tooltip>
            <a-tag v-else-if="tag.length === 0"></a-tag>
            <a-tag v-else :closable="true" @close="handleTagClose(tag)">
              {{tag}}
            </a-tag>
          </template>
          <a-input
              v-if="states.inputVisible"
              ref="tagInputRef"
              v-model:value="states.inputValue"
              type="text"
              size="small"
              :style="{ width: '78px' }"
              @blur="handleInputConfirm"
              @keyup.enter="handleInputConfirm"
          ></a-input>
          <a-tag v-else style="background: #fff; border-style: dashed"
                 @click="showInput">
            <plus-outlined />
            {{ $t('common.newTag') }}
          </a-tag>
        </template>
        <template v-else>
          <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
          >{{ tag.toUpperCase() }}</a-tag>
        </template>
      </template>
      <template v-else-if="column.key === 'template'">
        <div v-if="record._highlight && record._highlight.template">
          <p v-for="item in record._highlight.template" v-html="item"></p>
        </div>
        <span v-else>{{ text }}</span>
      </template>
      <template v-else-if="column.key === 'params'">
        <span
            v-for="tags in record.params"
            :key="tags">
          <a-tag>{{ tags.name }}</a-tag>
        </span>
      </template>
      <template v-if="column.key === 'if'">
        {{ text }}
      </template>
      <template v-else-if="column.key === 'then'">
        {{ text }}
      </template>
      <template v-else-if="column.key === 'action'">
        <div>
          <span v-show="record.editing">
            <a-tooltip placement="bottom">
              <template #title>
                <span>{{ $t('common.saveText') }}</span>
              </template>
              <check-circle-outlined @click="save(record)" class="icon--success-btn" />
            </a-tooltip>
            <a-divider type="vertical" />
            <a-tooltip placement="bottom">
              <template #title>
                <span>{{ $t('common.cancelText') }}</span>
              </template>
              <close-circle-outlined @click="cancel(record)" class="icon--err-btn" />
            </a-tooltip>
            <a-divider type="vertical" v-if="column.actionList.includes('check')" />
            <template v-if="column.actionList.includes('check')">
              <a-checkbox
                  v-model:checked="record.required"
                  @change="(e: any) => tableCheckChange(e, record)"
              >{{ $t('component.table.isRequire') }}</a-checkbox>
            </template>
        </span>
        <span v-show="!record.editing">
          <template v-if="column.actionList.includes('detail')">
            <a-tooltip placement="bottom">
              <template #title>
                <span>{{ $t('common.detail') }}</span>
              </template>
              <file-search-outlined @click="detailRow(record)" class="icon--primary-btn" />
            </a-tooltip>
          </template>
          <a-divider v-if="column.actionList.includes('edit') && column.actionList.includes('detail')" type="vertical" />
          <template v-if="column.actionList.includes('edit')">
            <a-tooltip placement="bottom">
              <template #title>
                <span>{{ $t('common.editText') }}</span>
              </template>
              <edit-outlined @click="editRow(record)" class="icon--primary-btn" />
            </a-tooltip>
          </template>
          <a-divider v-if="column.actionList.includes('delete')" type="vertical" />
          <template v-if="column.actionList.includes('delete')">
           <a-popconfirm
             :title="$t('component.message.sureDel')"
             :ok-text="$t('common.yesText')"
             :cancel-text="$t('common.noText')"
             @confirm="confirm(record)">
             <a-tooltip placement="bottom">
              <template #title>
                <span>{{ $t('common.delText') }}</span>
              </template>
               <delete-outlined class="icon--primary-btn" />
            </a-tooltip>
           </a-popconfirm>
          </template>
          <a-divider v-if="column.actionList.includes('up')" type="vertical" />
          <template v-if="column.actionList.includes('up')">
            <a-tooltip placement="bottom">
              <template #title>
                <span>{{ $t('common.up') }}</span>
              </template>
              <up-circle-outlined @click="upRow(index)" class="icon--primary-btn" />
            </a-tooltip>
          </template>
          <a-divider v-if="column.actionList.includes('down')" type="vertical" />
          <template v-if="column.actionList.includes('down')">
            <a-tooltip placement="bottom">
              <template #title>
                <span>{{ $t('common.down') }}</span>
              </template>
              <down-circle-outlined @click="downRow(index)" class="icon--primary-btn" />
            </a-tooltip>
          </template>
          <a-divider v-if="column.actionList.includes('check')" type="vertical" />
          <template v-if="column.actionList.includes('check')">
            <a-checkbox
                disabled
                v-model:checked="record.required"
                @change="(e: any) => tableCheckChange(e, record)"
            >{{ $t('component.table.isRequire') }}</a-checkbox>
          </template>
          <a-divider v-if="column.actionList.includes('clone')" type="vertical" />
          <template v-if="column.actionList.includes('clone')" >
             <a-tooltip placement="bottom">
              <template #title>
                <span>{{ $t('component.table.clone') }}</span>
              </template>
              <copy-outlined @click="cloneRow(record)" class="icon--primary-btn" />
            </a-tooltip>
          </template>
        </span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<style>
</style>
