<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, UnwrapRef, Ref, computed } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import request from "@/utils/request"
import { cloneDeep } from 'lodash-es';
import { message, SelectProps } from 'ant-design-vue';
import { PlusOutlined, PlusSquareFilled, DeleteOutlined, CheckCircleTwoTone, SmileOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
import { object } from 'vue-types';
import * as _ from 'lodash';
import dayjs from 'dayjs';
let route = useRoute()
// console.log(route);

interface TableDataItem {
  key: string,
  id?: string,
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

const dynamicschema: Ref<ColumnItem[]> = ref([{
  title: 'ID',
  dataIndex: 'ID',
  key: 'ID'
},
{
  title: 'action',
  dataIndex: 'action',
  key: 'action',
  fixed: 'right',
  width: 100
}
])

const dynamiccolumns: Ref<ColumnItem[]> = ref([{
  title: 'ID',
  dataIndex: 'ID',
  key: 'ID',
// },
// {
//   title: 'ContactType',
//   dataIndex: 'ContactType',
//   key: 'ContactType',
// },
// {
//   title: 'MSG',
//   dataIndex: 'MSG',
//   key: 'MSG',
// },
// {
//   title: 'Terminator',
//   dataIndex: 'Terminator',
//   key: 'Terminator',
// },
// {
//   title: 'PhoneNum',
//   dataIndex: 'PhoneNum',
//   key: 'PhoneNum',
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
    ID: '1',
    ContactType: 'real contact',
    MSG: '{{DS.test}}',
    Terminator: '{{phone2}}',
    PhoneNum: '{{phone2.num}}',

  }
]);


const tablecolcount = computed(() => {
  if(dynamiccolumns && dynamiccolumns.value && dynamiccolumns.value.length){
    return dynamiccolumns.value.length + 1;
  }
  else{
  // dynamiccolumns = dynamicschema;

  }})
  
const tablecount = computed(() => tableData.value.length + 1);
const staticeditableData: UnwrapRef<Record<string, TableDataItem>> = reactive({});

const tableDataedit = (key: string) => {
  staticeditableData[key] = cloneDeep(tableData.value.filter(item => key === item.key)[0]);
};
const tableDatasave = async () => {
  
  let model = {'model':{'schema':[],'data':[]}}
  Object.assign(model.model['schema'],dynamiccolumns.value)
  Object.assign(model.model['data'],tableData.value)
  
  let rst = await request.put(`/api/templates/${recordobj.value._id}`, model)
  message.success('Modification succeeded')
};

const ontableDataDelete = (key: string) => {
  tableData.value = tableData.value.filter(item => item.key !== key);
};
const tableDatahandleAdd = () => {


  let colnames: any[] = [];
  dynamiccolumns.value.forEach((col: any) => {
    colnames.push(col)
  })
  let newData ={};
  let tempkey='key'
  colnames.forEach((key: any) => {
    
    tempkey = key['title'];
    if (tempkey == 'key') {
      Object.assign(newData, { key: `${tablecount.value}` })
    } else
      Object.assign(newData, { [tempkey]: "" })
    // Object.assign(newData,{key:`${tablecount.value}`})
    // editableData1[key] = cloneDeep(tableData.value.filter((item: { key: string; }) => key === item.key)[0]);
  })


  tableData.value.push(newData);
  // tableData.value[newstatic.key]
  // editableData1[tempkey]=tableData.value[newData!.key]

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
  // console.log(rst);
  recordobj.value = rst
  if (rst.model) {

    recordobj.value.model = rst.model
    
    tableData.value = rst.model.data;
    dynamiccolumns.value = rst.model.schema;
    // tableData.value = arr(rst.model)  ;
  } else {

  }
}

// async function query(data?: any) {
//   let rst = await request.get("/api/templates", { params: data || searchobj })
//   console.log(rst.data);

//   tableData.value = arr(rst.data)
// }
// 给每条数据添加条属性
const arr = (dataArr: any) => dataArr.map((item: any, index: string) => ({ ...item, key: index }))
onMounted(() => {
  let getId: any = sessionStorage.getItem('static_' + route.params._id)
  // console.log(JSON.parse(getId));

  query(JSON.parse(getId))
})
// const editableData1: UnwrapRef<Record<string, TableDataItem>> = reactive({});
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
  // console.log('result:', recordobj.value, '    schema:', dynamiccolumns);

  // await updstatic(recordobj.value)
  delete editableData1[obj.key];

}
// 点击删除的方法
const cancel = async (obj: any) => {
  // delete tableData.value[tableData.value.indexOf(obj)]
  tableData.value = tableData.value.filter((item: any) => item.enum !== obj.enum)
  delete editableData1[obj.key];
  // console.log(recordobj.value, tableData.value);
  recordobj.value.model = tableData.value
  let rst = await request.put(`/api/templates/${recordobj.value._id}`, recordobj.value)
  // console.log(rst);

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
  // console.log(inputType.value);

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
  // console.log(key)
  editableHeaderData[key] = cloneDeep(dynamiccolumns.value.filter(item => key === item.title)[0]);
  
};
const headsave = (key: string) => {
  Object.assign(dynamiccolumns.value.filter(item => key === item.title)[0], editableHeaderData[key]);

  let currentVal = editableHeaderData[key].title;
  // console.log(dynamiccolumns.value,';;;;;;;; ',currentVal,' key:',key)
  // Object.assign(
  dynamiccolumns.value.filter((item: any) => {
    if (currentVal === item.title) {
      Object.assign(item, { title: currentVal });
      Object.assign(item, { "dataIndex": currentVal });
      Object.assign(item, { key: currentVal });
      // console.log('++++++',item)
      //     return item} 
    }
  })


  //   // [0], editableHeaderData[key]);  
  // console.log('kkkkk ',dynamiccolumns.value)
  delete editableHeaderData[key];
};



</script>

<template>
  <main style="height:100%;overflow-x: hidden!important;">
    <a-row>
      <a-col span="21">
    <!-- <div class="statictemplateleft"> -->

      <span style="margin-left: 5px;">
        <a-button danger @click="tableDatasave()">
          Save
        </a-button>
      </span>
    <!-- </div> -->
  </a-col>
  <a-col span="3">
    <!-- <div class="statictemplate"> -->
      <a-button type="primary" @click="columnshandleAdd()">
        Add column
      </a-button>
      <span style="margin-left: 5px;">
        <a-button type="primary" @click="tableDatahandleAdd()">
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
              <!-- <a-input v-if="editableData1[record.key]" v-model:value="editableData1[record.key][column.title]"
                --{{record.key}}***{{column.title}}--{{column.dataIndex}}--{{column.key}}
                style="margin: -5px 0" /> -->
              <a-input v-if="editableData1[record.key]" v-model:value="editableData1[record.key][column.dataIndex]"
                style="margin: -5px 0" />
              <template v-else>
                {{text}}
              </template>
            </div>
          </template>

          <template v-else-if="column.dataIndex === 'action'">
            <div class="editable-row-operations">
              <span v-if="editableData1[record.key]">
                <a-typography-link @click="save(record)" style="font-size:16px">
                  <check-circle-two-tone two-tone-color="#52c41a" />
                </a-typography-link>
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