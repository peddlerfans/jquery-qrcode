<script setup lang="ts">
import { onMounted, reactive, ref, UnwrapRef } from 'vue';
import { useRoute } from 'vue-router';
import request from "@/utils/request"
import { cloneDeep } from 'lodash-es';
import { message } from 'ant-design-vue';
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
let tableData=ref([])

interface DataItem {
  key?: string;
  name: string;
  type: string;
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
  Object.assign(tableData.value.filter((item: { key: string; }) => obj.key === item.key)[0], editableData[obj.key]);
//   delete editableData[obj.key].key
  console.log(editableData[obj.key]);
  
  delete editableData[obj.key];
  
}
// 点击删除的方法
const cancel =async (obj: any) => {
//   let rst=await request.delete(`/api/templates/${obj._id}`)
  message.success('test template has been deleted successfully')
//   query()
  delete editableData[obj.key];
};

// 表格的数据结构
const columns=reactive<Object[]>(
  [
  {
    title: 'name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'type',
    dataIndex: 'type',
    key: 'type',
    },
{
    title:'action',
    dataIndex:'action',
    key:'action'
}]
)



</script>

<template>
   <main style="height:100%;overflow-x: hidden!important;">      
      <a-table :columns="columns" :data-source="tableData" bordered>
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
          <a-input
            v-if="editableData[record.key]"
            v-model:value="editableData[record.key].type"
            style="margin: -5px 0"
          />
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

<style scoped>

</style>