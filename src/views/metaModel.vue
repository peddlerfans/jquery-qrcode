<script setup lang="ts">
import { onMounted, reactive, ref, UnwrapRef } from 'vue';
import { useRoute } from 'vue-router';
import request from "@/utils/request"
import { cloneDeep } from 'lodash-es';
import { message, SelectProps } from 'ant-design-vue';
import { PlusOutlined,PlusSquareFilled} from '@ant-design/icons-vue'
let route=useRoute()
console.log(route.query.record);
// 获取当前数据并赋值
let recordobj=ref()
// 根据传来的name值获取到数据
async function query (){
   let rst=await request.get('/api/templates',{params:{search:"",category:'meta'}})
    let table=rst.data.filter((item:any)=>item.name==route.query.record)
    recordobj.value=table[0]
    if(table[0].model){
        console.log(table[0].model);
        tableData.value=arr(table[0].model)
        console.log(tableData.value);
        
    }else{
    alert('This template has no model')
   }
}
// 给每条数据添加条属性
const arr=(dataArr:any)=> dataArr.map((item: any,index: string)=>({...item,key:index}))
onMounted(()=>{
    query()
})
// 表格的数据
let tableData=ref<Array<any>>([])

interface DataItem {
  key?: string;
  name: string;
  type: string;
  enum:string;
}
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

// 修改meta的方法
const updMeta=async (data:any)=>{
  let rst=await request.put(`/api/templates/${data._id}`,data)
  console.log(rst);
}
const edit = (key: string) => {
  editableData[key] = cloneDeep(tableData.value.filter((item: { key: string; }) => key === item.key)[0]);
  console.log(editableData[key]);
  
};
// 点击save触发的函数
const save =async (obj:any) => {
  console.log(tableData.value);
  
  Object.assign(tableData.value.filter((item: { key: string; }) => obj.key === item.key)[0], editableData[obj.key]);
//   delete editableData[obj.key].key
  console.log(editableData[obj.key]);
  recordobj.value.model=tableData.value
  await updMeta(recordobj.value)
  delete editableData[obj.key];
  
}
// 点击删除的方法
const cancel =async (obj: any) => {
//   let rst=await request.delete(`/api/templates/${obj._id}`)
  message.success('test template has been deleted successfully')
  query()
  delete editableData[obj.key];
};
// 点击添加数据
const saveModel=()=>{
  const newModel={
    name:'new Model',
    type:'new Model'
  }
  tableData.value.push({...newModel})
}
// 改变type的值
const handleChange = (value: any) => {      
  console.log(value);
};


// 表格的数据结构
const columns=reactive<Object[]>(
  [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
    width:180
  },
  {
    title: 'type',
    dataIndex: 'type',
    key: 'type',
    width:180
    },
    {
    title: 'enum',
    dataIndex: 'enum',
    key: 'enum',
    width:180
    },
{
    title:'action',
    dataIndex:'action',
    key:'action',
    width:100
}]
)
// 下拉框的数据
const optiones = ref<SelectProps['options']>([
      {
        value: 'str',
        label: 'str',
      },
      {
        value: 'float',
        label: 'float',
      },  
      {
        value: 'false',
        label: 'false',
    },
      {
        value: 'number',
        label: 'number',
    },
    {
        value: 'int',
        label: 'int',
    },
    {
      value: 'SUT',
        label:'SUT'
      }
    ]);


</script>

<template>
   <main style="height:100%;overflow-x: hidden!important;">      
    <a-table :columns="columns" :data-source="tableData" bordered>
      <template #headerCell="{column}">
        <template v-if="column.key==='action'">
          <span>action</span>
          <span class="iconsave" style="color:#1890ff;" @click="saveModel">
            <plus-square-filled />
          </span>
        </template>
      </template>
      <template #bodyCell="{ column, text, record }">
        <template v-if='column.key==="name"'>
          <div>
            <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key].name"
              style="margin: -5px 0"
            />           
            <template v-else>
              {{ text }}
            </template>
          </div>
          </template>
          <template v-if='column.key==="type"'>
          <div>
            <a-select v-if="editableData[record.key]" 
            :options="optiones"
            v-model:value="editableData[record.key].type"
            @change="handleChange"
            ></a-select>
            <template v-else>
              {{ text }}
            </template>
          </div>
          </template>
            <template v-else-if="column.dataIndex === 'action'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a-typography-link @click="save(record)">Save</a-typography-link>
              <a-popconfirm title="Sure to cancel?" @confirm="cancel(record)">
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.key)">Edit</a>
            </span>
          </div>
        </template>
      </template>
  </a-table>
      
  </main>
</template>

<style scoped lang="less">
.iconsave{
  margin-left: 2.5rem;
  width:3.125rem!important;
  font-size: 1.25rem!important;
}
</style>