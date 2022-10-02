<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, UnwrapRef, Ref, computed } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import request from "@/utils/request"
import { cloneDeep } from 'lodash-es';
import { message, SelectProps } from 'ant-design-vue';
import { PlusOutlined, PlusSquareFilled, DeleteOutlined, SmileOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import { object } from 'vue-types';
import * as _ from 'lodash';
let route = useRoute()
console.log(route);

interface TableDataItem {
  key: string,
  name?: string,
  contacttype?: number,
  msg?: string,
  terminator?: string,
  phonenum?: string
}
interface ColumnItem {
  title: string,
  dataIndex: string,
  key: string
}
const dynamiccolumns: Ref<ColumnItem[]> = ref([{
  title: 'ID',
  dataIndex: 'name',
  key: 'name',
},
{
  title: 'ContactType',
  dataIndex: 'contacttype',
  key: 'contacttype',
},
{
  title: 'MSG',
  dataIndex: 'msg',
  key: 'msg',
},
{
  title: 'Terminatior',
  dataIndex: 'terminator',
  key: 'terminator',
},
{
  title: 'PhoneNum',
  dataIndex: 'phonenum',
  key: 'phonenum',
},
{
  title: 'action',
  dataIndex: 'action',
  key: 'action',
  fixed: 'right',
  width: 100
}
])
const tableData: Ref<any[]> = ref([

  {
    key: '1',
    name: '1',
    contacttype: 'real contact',
    msg: '{{DS.test}}',
    terminator: '{{phone2}}',
    phonenum: '{{phone2.num}}',
    test: 'test'
  },
  {
    key: '2',
    name: '2',
    contacttype: 'system contact',
    msg: '{{DS.test}}',
    terminator: '{{phone3}}',
    phonenum: '{{phone4.num}}',
    test: 'test'
  },
]);


const tablecolcount = computed(() => dynamiccolumns.value.length + 1);
const tablecount = computed(() => tableData.value.length + 1);
const staticeditableData: UnwrapRef<Record<string, TableDataItem>> = reactive({});

const tableDataedit = (key: string) => {
  staticeditableData[key] = cloneDeep(tableData.value.filter(item => key === item.key)[0]);
};
// const tableDatasave = (key: string) => {
//   Object.assign(tableData.value.filter(item => key === item.key)[0], static[key]);
//   delete static[key];
// };

const ontableDataDelete = (key: string) => {
  tableData.value = tableData.value.filter(item => item.key !== key);
};
const tableDatahandleAdd = () => {
  const newData = {
    key: `${tablecount.value}`,
    name: `Objective${tablecount.value}`,
    age: tablecount.value,
    address: `details${tablecount.value}`,
  };
  tableData.value.push(newData);
};

const columnshandleAdd = () => {
  const newcolumn = {
    title: `Property${tablecolcount.value}`,
    dataIndex: `Property${tablecolcount.value}`,
    key: `Property${tablecolcount.value}`

  };
  const actionColumn = {
    title: 'action',
    dataIndex: 'action',
    key: 'action',
    fixed: 'right',
    width: 100
  };
  //  _.without(dynamiccolumns.value, ()=>{
  //    return if(item.key == 'action')
  // })
  // let actionIndex = _.sortedLastIndexBy(dynamiccolumns.value, { "key": "action","title":"Action","dataIndex":"action" }, function(o) { return o.key; });
  // console.log(actionIndex);
  _.remove(dynamiccolumns.value, (item: ColumnItem) => {
    return item.key == 'action'
  })
  dynamiccolumns.value.push(newcolumn);
  dynamiccolumns.value.push(actionColumn);
};
// _.remove(dynamiccolumns.value,(item:ColumnItem)=>{
//     return item.key == key
//   }) 

sessionStorage.setItem('static_' + route.params._id, JSON.stringify(route.params._id))
// sessionStorage.setItem('static_'+route.params.name,JSON.stringify(route.params.name))
// 获取当前数据并赋值
let recordobj = ref()
// 根据传来的name值获取到数据
async function query(data?: any) {
  //  let rst=await request.get('/api/templates',{params:{q:'category:static', search:data}})
  let rst = await request.get(`/api/templates/${data}`, { params: { q: 'category:static', search: '' } })
  console.log(rst);
  recordobj.value = rst
  if (rst.model) {

    recordobj.value.model = rst.model
    tableData.value = arr(rst.model)
      ;
  } else {

  }
}
// 给每条数据添加条属性
const arr = (dataArr: any) => dataArr.map((item: any, index: string) => ({ ...item, key: index }))
onMounted(() => {
  let getId: any = sessionStorage.getItem('static_' + route.params._id)
  console.log(JSON.parse(getId));

  query(JSON.parse(getId))
})
const editableData2: UnwrapRef<Record<string, TableDataItem>> = reactive({});
const editableData1: UnwrapRef<Record<string, any>> = reactive({});

const editableHeaderData: UnwrapRef<Record<string, ColumnItem>> = reactive({});



// 修改static的方法
const updstatic = async (data: any) => {

  let rst = await request.put(`/api/templates/${recordobj.value._id}`, data)
  message.success('Modification succeeded')
}

const edit = (key: string) => {
  editableData1[key] = cloneDeep(tableData.value.filter((item: { key: string; }) => key === item.key)[0]);
  // inputType.value = editableData[key].contacttype
  // state.tags=editableData[key].enum
};
// 点击save触发的函数
const save = async (obj: any) => {
  // editableData[obj.key].enum=state.tags
  Object.assign(tableData.value.filter((item: { key: string; }) => obj.key === item.key)[0], editableData1[obj.key]);
  //   delete editableData[obj.key].key
  // console.log(editableData[obj.key]);

  recordobj.value.model = tableData.value
  console.log(recordobj.value);

  // await updstatic(recordobj.value)
  // delete editableData[obj.key];

}
// 点击删除的方法
const cancel = async (obj: any) => {
  // delete tableData.value[tableData.value.indexOf(obj)]
  tableData.value = tableData.value.filter((item: any) => item.enum !== obj.enum)
  delete editableData1[obj.key];
  console.log(recordobj.value, tableData.value);
  recordobj.value.model = tableData.value
  let rst = await request.put(`/api/templates/${recordobj.value._id}`, recordobj.value)
  console.log(rst);

  message.success('test template has been deleted successfully')
  query()
};
// 点击添加数据
// const saveModel = () => {
//   const newModel = {
//     name: 'new Model name',
//     type: 'new Model type',
//     enum: ""
//   }
//   tableData.value.push({ ...newModel })
// }
// 定义属性判断输入框该输入的数据类型
let inputType = ref()
// 改变type的值
const handleChange = (value: any) => {
  inputType.value = value
  console.log(inputType.value);

};
const changeType = (value: any) => {
  if (inputType.value == "int") {
    let reg = /^[0-9]+$/;
    if (value != "" && !reg.test(value)) {
      alert('只能输入整数！');
      return false;
    }
  }
  // if(inputType.value=='number'){
  //   let type=typeof value
  //   if(value!=""&& type!=='number'){
  //     alert('只能输入数字')
  //     return false
  //   }
  // }

}

// 获取新建tags的dom
let inputRef = ref();
// 添加的表单tags
let state = reactive<statesTs>({
  inputVisible: false,
  inputValue: '',
  tags: null
});
// 定义tag标签的输入类型
interface statesTs {
  tags: any
  inputVisible: Boolean;
  inputValue: string
}
// 点击添加标签的方法
const showInput = () => {
  state.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  })
};
// 移除tags
const handleClose = (removedTag: string) => {
  const tags = state.tags.filter((tag: string) => tag !== removedTag);
  state.tags = tags;
};
// 表格的数据结构

function deleteCol(key: string) {


  _.remove(dynamiccolumns.value, (item: ColumnItem) => {
    return item.key == key
  })

}
// function headsave(key:any){
//   Object.assign(metadataSource.value.filter(item => key === item.key)[0], metaeditableData[key]);
//   delete metaeditableData[key];

// }

const headedit = (key: string) => {
  console.log(key)
  debugger
  editableHeaderData[key] = cloneDeep(dynamiccolumns.value.filter(item => key === item.title)[0]);
};
const headsave = (key: string) => {
  Object.assign(dynamiccolumns.value.filter(item => key === item.title)[0], editableHeaderData[key]);
  delete editableHeaderData[key];
};
</script>

<template>
  <main style="height:100%;overflow-x: hidden!important;">
    <div class="statictemplate">
      <a-button type="primary" @click="columnshandleAdd()">
        Add column
      </a-button>
    </div>
    <div>
      <a-table :dataSource="tableData" :columns="dynamiccolumns">
        <template #headerCell="{ column }">
          <template v-if="column.key !== 'action'">
            <!-- <span>{{column.title}}</span> 
            <a-input v-if="editableData[column.key]" v-model:value="editableData[column.key].name"
                  style="margin: -5px 0" />
                <template v-else>
                  {{column.title}}--{{column.key}}
                </template>
            <delete-outlined @click="deleteCol(column.key)"></delete-outlined>
              -->


            <div class="editable-cell">

              <div v-if="editableHeaderData[column.title]" class="editable-cell-input-wrapper">
                <a-input v-model:value="editableHeaderData[column.title].title" @pressEnter="headsave(column.title)" />
                <check-outlined class="editable-cell-icon-check" @click="headsave(column.title)" />

              </div>
              <div v-else class="editable-cell-text-wrapper">
                {{ column.title}}
                <edit-outlined class="editable-cell-icon" @click="headedit(column.title)" />

                <delete-outlined @click="deleteCol(column.key)"></delete-outlined>
              </div>

            </div>

          </template>

        </template>
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key !== 'action'">
            <div>
              <a-input v-if="editableData1[record.key]" v-model:value="editableData1[record.key][column.title]"
                style="margin: -5px 0" />
              <template v-else>
                {{text}}
              </template>
            </div>
          </template>

          <template v-else-if="column.dataIndex === 'action'">
            <div class="editable-row-operations">
              <span v-if="editableData1[record.key]">
                <a-typography-link @click="save(record)">Save</a-typography-link>
                <a-popconfirm title="Sure to cancel?" @confirm="cancel(record)">
                  <a style="margin-left:10px;font-size:14px">
                    <delete-outlined />
                  </a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="edit(record.key)">Edit</a>
              </span>
            </div>
          </template>
        </template>
      </a-table>

    </div>
  </main>
</template>

<style scoped lang="less">
.statictemplate {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  align-content: flex-end;
  align-items: flex-end;
}

.iconsave {
  margin-left: 2.5rem;
  width: 3.125rem !important;
  font-size: 1.25rem !important;
}

/deep/ .ant-table-tbody {
  >tr:hover:not(.ant-table-expanded-row)>td,
  .ant-table-row-hover,
  .ant-table-row-hover>td {
    background: none !important;
    //这里是将鼠标移入时的背景色取消掉了
  }
}

.editable-cell-icon {
  padding: 5px;
}
</style>