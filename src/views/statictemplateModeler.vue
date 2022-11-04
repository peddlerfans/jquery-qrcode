<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { nextTick, onMounted, reactive, ref, UnwrapRef, Ref, computed } from "vue";
import { onBeforeRouteLeave, useRoute } from "vue-router";
import request from "@/utils/request";
import { cloneDeep } from "lodash-es";
import { message, SelectProps } from "ant-design-vue";
import {
  PlusOutlined,
  PlusSquareFilled,
  DeleteOutlined,
  CheckCircleTwoTone,
  SmileOutlined,
  CheckOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";

import * as _ from "lodash";
const { t } = useI18n()

let route = useRoute();

// interface TableDataItem {
//   key: string,
//   id?: string,

// }
interface ColumnItem {
  title: string;
  dataIndex: string;
  key: string;
}

const dynamicschema: Ref<ColumnItem[]> = ref([
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Enum",
    dataIndex: "enum",
    key: "enum",
  },
  {
    title: "action",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 100,
  },
]);

let dynamiccolumns: Ref<ColumnItem[]> = ref([
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Enum",
    dataIndex: "enum",
    key: "enum",
  },
  {
    title: "action",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 100,
  },
]);

const tableDataOrigin: Ref<any[]> = ref([]);

let tableData: Ref<any[]> = ref([]);

/**
 * Whole table operations, including count,save(update)
 */

const tablecolcount = computed(() => {
  if (dynamiccolumns && dynamiccolumns.value && dynamiccolumns.value.length) {
    return dynamiccolumns.value.length;
  } else if (typeof dynamiccolumns.value == "undefined") {
    dynamiccolumns.value = dynamicschema.value;
    return dynamiccolumns.value.length;
  }
});

const tablecount = computed(() => tableData.value.length + 1);

const tableDatasave = async () => {
  let model = { model: { schema: [], data: [] } };
  Object.assign(model.model["schema"], dynamiccolumns.value);
  Object.assign(model.model["data"], tableData.value);
  let rst = await request.put(`/api/templates/${recordobj.value._id}`, model);
  message.success(t('component.message.saveSuccess'));
};

/**
 * Row operations including add/edit/delete/cancel
 */
//Row adding record
const editableData1: UnwrapRef<Record<string, any>> = reactive({});
const addRow = () => {
  let colnames: any[] = [];
  if (dynamiccolumns && dynamiccolumns.value && _.isArray(dynamiccolumns.value)) {
    dynamiccolumns.value.forEach((col: any) => {
      colnames.push(col);
    });
  } else if (typeof dynamiccolumns.value == "undefined") {
    dynamiccolumns.value = dynamicschema.value;
  }
  let newData = {};
  let tempkey = "key";

  // colnames = _.remove(colnames,col=>{col.title=='action'});
  let newkeycol = ref({
    title: "key",
    dataIndex: "key",
    key: "key",
  });
  colnames.push(newkeycol.value);

  colnames.forEach((key: any) => {
    tempkey = key["title"];
    if (tempkey == "key") {
      Object.assign(newData, { key: `${tablecount.value}` });
    } else Object.assign(newData, { [tempkey]: "" });
  });

  if (tableData && typeof tableData.value == "undefined")
    tableData.value = tableDataOrigin.value;
  tableData.value.push(newData);
};

// 点击删除的方法
const delRow = async (key: string) => {
  tableData.value = tableData.value.filter((item: any) => item.key !== key);
  delete editableData1[key];
  // recordobj.value.model = tableData.value
};
// 点击save a row
const saveRow = (key: string) => {
  Object.assign(
    tableData.value.filter((item) => key === item.key)[0],
    editableData1[key]
  );
  delete editableData1[key];
};

//edit row
const editRow = (key: string) => {
  editableData1[key] = cloneDeep(
    tableData.value.filter((item: { key: string }) => key === item.key)[0]
  );
};
//cancel row
const cancelRow = (key: string) => {
  delete editableData1[key];
};

/**
 * Header operations, including add,edit,save,delete head column, dynamicColumn
 */
const editableHeaderData: UnwrapRef<Record<string, ColumnItem>> = reactive({});

const addCol = () => {
  const newcolumn = {
    title: `Property${tablecolcount.value}`,
    dataIndex: `Property${tablecolcount.value}`,
    key: `Property${tablecolcount.value}`,
  };
  const actionColumn = {
    title: "action",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 100,
  };
  if (dynamiccolumns && typeof dynamiccolumns.value == "undefined") {
    dynamiccolumns.value = dynamicschema.value;
  }
  _.remove(dynamiccolumns.value, (item: ColumnItem) => {
    return item.key == "action";
  });
  dynamiccolumns.value.push(newcolumn);
  dynamiccolumns.value.push(actionColumn);
};

function delCol(key: string) {
  _.remove(dynamiccolumns.value, (item: ColumnItem) => {
    return item.key == key;
  });
}

const editCol = (key: string) => {
  editableHeaderData[key] = cloneDeep(
    dynamiccolumns.value.filter((item) => key === item.title)[0]
  );
};
const saveCol = (key: string) => {
  Object.assign(
    dynamiccolumns.value.filter((item) => key === item.title)[0],
    editableHeaderData[key]
  );

  let currentVal = editableHeaderData[key].title;
  dynamiccolumns.value.filter((item: any) => {
    if (currentVal === item.title) {
      Object.assign(item, { title: currentVal });
      Object.assign(item, { dataIndex: currentVal });
      Object.assign(item, { key: currentVal });
    }
  });
  delete editableHeaderData[key];
};

sessionStorage.setItem("static_" + route.params._id, route.params._id as string);

// 获取当前数据并赋值
let recordobj = ref();
// 根据传来的name值获取到数据
const query = async (data?: any) => {
  //  request.get("/api/templates", { params: data || searchobj })
  let rst = await request.get(`/api/templates/${data}`, {
    params: { q: "category:static", search: "" },
  });

  recordobj.value = rst;
  if (rst.model) {
    recordobj.value.model = rst.model;
    let tempobj = rst.model;

    tableData.value = rst.model.data;

    dynamiccolumns.value = rst.model.schema;
  } else {
    // console.log('No model in the backend system')
  }
};

// 给每条数据添加条属性
const arr = (dataArr: any) =>
  dataArr.map((item: any, index: string) => ({ ...item, key: index }));

onMounted(() => {
  let getId: string = sessionStorage.getItem("static_" + route.params._id) as string;
  // console.log(JSON.parse(getId));
  query(getId);
});
interface statesTs {
  tags: Array<string>;
  inputVisible: Boolean;
  inputValue: string;
}
let states = reactive<statesTs>({
  tags: [],
  inputVisible: false,
  inputValue: "",
});

// 移除tags
const handleClose = (removedTag: string) => {
  const tags = states.tags.filter((tag: string) => tag !== removedTag);
  states.tags = tags;
};

// tag标签失去焦点之后添加的tags
const handleInputConfirm = () => {
  let tags = states.tags;
  if (states.inputValue && tags.indexOf(states.inputValue) === -1) {
    tags = [...tags, states.inputValue.toUpperCase()];
  }
  Object.assign(states, {
    tags,
    inputVisible: false,
    inputValue: "",
  });
  console.log(states.tags);
};
// 获取新建tags的dom
let inputRef = ref();
// 点击添加标签的方法
const showInput = () => {
  states.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  });
};
</script>

<template>
  <main style="height: 100%; overflow-x: hidden !important">
    <a-row>
      <a-col span="21">
        <!-- <div class="statictemplateleft"> -->

        <span style="margin-left: 5px">
          <a-button danger @click="tableDatasave()"> {{ $t('common.saveText') }} </a-button>
        </span>
        <!-- </div> -->
      </a-col>
      <a-col span="3">
        <!-- <div class="statictemplate"> -->
        <a-button type="primary" @click="addCol()"> {{ $t('templateManager.addColumn') }} </a-button>
        <span style="margin-left: 5px">
          <a-button type="primary" @click="addRow()">
            <template #icon>
              <plus-outlined />
            </template>
          </a-button>
        </span>
        <!-- </div> -->
      </a-col>
    </a-row>
    <div>
      <a-table :dataSource="tableData" :columns="dynamiccolumns">
        <template #headerCell="{ column }">
          <template v-if="column.key !== 'action'">
            <div class="editable-cell">
              <div
                v-if="editableHeaderData[column.title]"
                class="editable-cell-input-wrapper"
              >
                <a-input
                  v-model:value="editableHeaderData[column.title].title"
                  @pressEnter="saveCol(column.title)"
                />
                <check-outlined
                  class="editable-cell-icon-check"
                  @click="saveCol(column.title)"
                />
              </div>
              <div v-else class="editable-cell-text-wrapper">
                {{ column.title }}
                <edit-outlined
                  class="editable-cell-icon"
                  @click="editCol(column.title)"
                />

                <delete-outlined @click="delCol(column.key)"></delete-outlined>
              </div>
            </div>
          </template>
        </template>
        <template #bodyCell="{ column, text, record }">
          <!-- --{{ editableData1 }}++ -->
          <template v-if="column.key !== 'action' && column.key !== 'enum'">
            <div>
            <!-- ****{{record}}..... -->
              <a-input
                v-if="editableData1[record.key]"
                v-model:value="editableData1[record.key][column.dataIndex]"
                style="margin: -5px 0"
              />
              <template v-else>
                {{ text }}
              </template>
            </div>
          </template>
          <template v-else-if="column.key === 'enum'">
            <template v-if="editableData1[record.key]">
              <template v-for="(tag, index) in states.tags" :key="tag">
                <a-tooltip v-if="tag.length > 20" :title="tag">
                  <a-tag :closable="true" @close="handleClose(tag)">
                    {{ `${tag.slice(0, 20)}...` }}
                  </a-tag>
                </a-tooltip>
                <a-tag v-else-if="tag.length == 0"></a-tag>
                <a-tag v-else :closable="true" @close="handleClose(tag)">
                  {{ tag }}
                </a-tag>
              </template>
              <a-input
                v-if="states.inputVisible"
                ref="inputRef"
                v-model:value="states.inputValue"
                type="text"
                size="small"
                :style="{ width: '78px' }"
                @blur="handleInputConfirm"
                @keyup.enter="handleInputConfirm"
              />
              <a-tag
                v-else
                style="background: #fff; border-style: dashed"
                @click="showInput"
              >
                <plus-outlined />
                New eTag
              </a-tag>
            </template>
            <template v-else>
              <a-tag
                v-for="tag in record.tags"
                :key="tag"
                :color="tag === 'test' ? 'volcano' : 'red'"
              >
                {{ tag.toUpperCase() }}
              </a-tag>
            </template>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
            <div class="editable-row-operations">
              <span v-if="editableData1[record.key]">
                <a-typography-link @click="saveRow(record.key)" style="font-size: 16px">
                  <check-circle-two-tone two-tone-color="#52c41a" />
                </a-typography-link>
                <a-popconfirm title="Sure to delete?" @confirm="delRow(record.key)">
                  <a style="margin-left: 10px; font-size: 14px">
                    <delete-outlined />
                  </a>
                </a-popconfirm>
                <a-typography-link @click="cancelRow(record.key)" style="margin-left: 7px"
                  >{{ $t('common.cancelText') }}</a-typography-link
                >
              </span>
              <span v-else>
                <a @click="editRow(record.key)">{{ $t('common.editText') }}</a>
              </span>
            </div>
          </template>
        </template>
      </a-table>
    </div>
  </main>
</template>

<style scoped lang="less">
.statictemplateleft {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.statictemplate {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  //   align-content: flex-end;
  //   align-items: flex-end;
}

.iconsave {
  margin-left: 2.5rem;
  width: 3.125rem !important;
  font-size: 1.25rem !important;
}

/deep/ .ant-table-tbody {
  > tr:hover:not(.ant-table-expanded-row) > td,
  .ant-table-row-hover,
  .ant-table-row-hover > td {
    background: none !important;
    //这里是将鼠标移入时的背景色取消掉了
  }
}

.editable-cell-icon {
  padding: 5px;
}
.editable-row-operations {
  width: 100px;
}
</style>
