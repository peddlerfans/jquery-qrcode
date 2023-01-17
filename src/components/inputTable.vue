<script setup lang="ts">
import {reactive, ref, UnwrapRef, Ref, computed, toRaw, watch} from "vue";
import { cloneDeep } from "lodash-es";
import {
  PlusOutlined,
  DeleteOutlined,
  CheckCircleTwoTone,
  SmileOutlined,
  CheckOutlined,
  EditOutlined,
} from "@ant-design/icons-vue";

import * as _ from "lodash";
//data includes columns and tabledata
const emit = defineEmits<{
  (e: "update", data: object): void;
}>();

const props = defineProps<{
  // dataDefData?: any[]
  detailtableData?: object;
  tableColumns?: any;
  tableData?: any[];
}>();
let dynamiccolumns = ref(props.tableColumns);
let tableData = ref(props.tableData);

interface ColumnItem {
  title: string;
  dataIndex: string;
  key: string;
}

watch(tableData, (val) => {
  emit('update', {
    tableData: toRaw(tableData.value),
    tableColumns: toRaw(dynamiccolumns.value),
    dataFrom: 'input_template'
  })
}, {
  deep: true
})
watch(dynamiccolumns, (val) => {
  emit('update', {
    tableData: toRaw(tableData.value),
    tableColumns: toRaw(dynamiccolumns.value),
    dataFrom: 'input_template'
  })
}, {
  deep: true
})

const dynamicschema: Ref<ColumnItem[]> = ref([
  {
    title: "ID",
    dataIndex: "ID",
    key: "ID",
  },
  {
    title: "action",
    dataIndex: "action",
    key: "action",
    fixed: "right",
    width: 100,
  },
]);

const tableDataOrigin: Ref<any[]> = ref([
  {
    key: "1",
    ID: "1",
  },
]);

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

const tablecount = computed(() => tableData.value!.length + 1);

function HandleSubmit() {
  let obj = {};
  Object.assign(obj, { tableData: toRaw(tableData.value) });
  Object.assign(obj, { tableColumns: toRaw(dynamiccolumns.value) });
  Object.assign(obj, { dataFrom: 'input_template' });
  emit("update", obj);
}

/**
 * Row operations including add/edit/delete/cancel
 */
//Row adding record
const editableData1: UnwrapRef<Record<string, any>> = reactive({});
// console.log(tableData.value);

const addRow = () => {
  let colnames: any[] = [];
  if (dynamiccolumns && dynamiccolumns.value && _.isArray(dynamiccolumns.value)) {
    dynamiccolumns.value.forEach((col: any) => {
      colnames.push(col);
    });
  } else if (typeof dynamiccolumns.value == "undefined") {
    dynamiccolumns.value = dynamicschema.value;
  }
  let newData = {key :""};
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
    tableData.value = tableDataOrigin.value as [];
  if (typeof tableData != "undefined" && typeof tableData.value != "undefined") {
    tableData.value.push(newData);
    if("key" in newData){
      editableData1[newData.key]=newData
    }
    
  }
};

// 点击删除的方法
const delRow = (key: string) => {
  tableData!.value = tableData.value!.filter((item: any) => item.key !== key);
  delete editableData1[key];
};
// 点击save a row
const saveRow = (key: string) => {
  Object.assign(
    tableData.value!.filter((item) => key === item.key)[0], 
    editableData1[key]
  );

  delete editableData1[key];
};

//edit row
const editRow = (key: string) => {
  editableData1[key] = cloneDeep(
    tableData.value!.filter((item: { key: string }) => key === item.key)[0]
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
  // console.log(tablecolcount.value);
  
  let newcolumn = {
    title: `Property${tablecolcount.value}`,
    dataIndex: `Property${tablecolcount.value}`,
    key: `Property${tablecolcount.value}`,
  };
  if(tablecolcount.value=="undefined"){
    newcolumn = {
    title: "Property1",
    dataIndex: "Property1",
    key: "Property1",
  };
  }
  
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
  editableHeaderData[newcolumn.title]={...newcolumn}
};

function delCol(key: string) {
  _.remove(dynamiccolumns.value, (item: ColumnItem) => {
    return item.key == key;
  });
}

const editCol = (key: string) => {
  editableHeaderData[key] = cloneDeep(
    dynamiccolumns.value.filter((item: any) => key === item.title)[0]
  );
};
const saveCol = (key: string) => {
  Object.assign(
    dynamiccolumns.value.filter((item: any) => key === item.title)[0],
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

defineExpose({
  tableData,
  dynamiccolumns
})
</script>

<template>
  <main style="height: 100%; overflow-x: hidden !important">
    <!-- <div class="statictemplate"> -->
    <a-button type="primary" @click="addCol()"> Add column </a-button>
    <span style="margin-left: 5px">
      <a-button type="primary" @click="addRow()">
        <template #icon>
          <plus-outlined />
        </template>
      </a-button>
    </span>

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
          <template v-if="column.key !== 'action'">
            <div>
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

          <template v-else-if="column.dataIndex === 'action'">
            <div class="editable-row-operations">
              <span v-if="editableData1[record.key]">
                <a-typography-link @click="saveRow(record.key)" style="font-size: 16px">
                  <check-circle-two-tone two-tone-color="#52c41a" />
                </a-typography-link>

                <a-typography-link @click="cancelRow(record.key)" style="margin-left: 7px"
                  >cancel</a-typography-link
                >
              </span>
              <span v-else>
                <a @click="editRow(record.key)">Edit</a>

                <a-popconfirm title="Sure to delete?" @confirm="delRow(record.key)">
                  <a style="margin-left: 5px">Delete</a>
                </a-popconfirm>
              </span>
            </div>
          </template>
        </template>
      </a-table>
    </div>
<!--    <a-button type="primary" @click="HandleSubmit()">Save</a-button>-->
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
