<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, UnwrapRef } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import request from "@/utils/request"
import { cloneDeep } from 'lodash-es';
import { message, SelectProps } from 'ant-design-vue';
import { PlusSquareFilled,DeleteTwoTone,CheckCircleTwoTone,PlusOutlined} from '@ant-design/icons-vue'
import { any } from 'vue-types';
let route=useRoute()
console.log(route);


sessionStorage.setItem('meta_'+route.params._id,JSON.stringify(route.params._id))
// sessionStorage.setItem('meta_'+route.params.name,JSON.stringify(route.params.name))
// 获取当前数据并赋值
let recordobj=ref()
// 根据传来的name值获取到数据
async function query (data?:any){
  //  let rst=await request.get('/api/templates',{params:{q:'category:meta', search:data}})
  let rst=await request.get(`/api/templates/${data}`,{params:{q:'category:meta',search:''}})
   console.log(rst);
   route.params.name=rst.name
   recordobj.value=rst   
          
          recordobj.value.model=rst.model
          if(rst.model){
            tableData.value=arr(rst.model)
          }
      ;
   
}
// 给每条数据添加条属性
const arr=(dataArr:any)=> dataArr.map((item: any,index: string)=>({...item,key:index}))
onMounted(()=>{
  let getId:any=sessionStorage.getItem('meta_'+route.params._id)
console.log(JSON.parse(getId));
  
    query(JSON.parse(getId))
})
// 表格的数据
let tableData=ref<Array<any>>([])
interface DataItem {
  key?: string;
  name: string;
  description:string
  type: string;
  enum:any;
  delekey?:any
}
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});

// 修改meta的方法
const updMeta=async (data:any)=>{
  if(data.__v){
    delete data.__v
  }
  let rst=await request.put(`/api/templates/${data._id}`,data)
  message.success('Modification succeeded')
}

const edit = (key: string) => {
  editableData[key] = cloneDeep(tableData.value.filter((item: { key: string; }) => key === item.key)[0]);
  inputType.value=editableData[key].type
  state.tags=editableData[key].enum

};
// 点击save触发的函数
const save =async (obj:any) => {
  delete editableData[obj.key].delekey
  Object.assign(tableData.value.filter((item: { key: string; }) => obj.key === item.key)[0], editableData[obj.key]);
//   delete editableData[obj.key].key
  
  recordobj.value.model=tableData.value  
  console.log(recordobj.value);
  
  await updMeta(recordobj.value)
  delete editableData[obj.key];
  
}
// 点击删除的方法
const delmodel =async (obj: any) => {
  // delete tableData.value[tableData.value.indexOf(obj)]
  tableData.value=tableData.value.filter((item:any)=>item.key!==obj.key)
  console.log(editableData[obj.key]);
  recordobj.value.model=tableData.value
  if(recordobj.value.__v){
    delete recordobj.value.__v
  }
if(editableData[obj.key].delekey!==1){
  let rst=await request.put(`/api/templates/${recordobj.value._id}`,recordobj.value)
  query()
} 
  delete editableData[obj.key];
  message.success('test template has been deleted successfully')
  
};
// 点击取消的函数
const cancel=(key:any)=>{
  console.log(123);
  
  delete editableData[key]
}
// 点击添加数据
const saveModel=()=>{
  const newModel={
    key:tableData.value.length,
    name:'ModelName',
    type:'str',
    enum:"",
    delekey:1
  }
  tableData.value.push({...newModel})
  editableData[newModel.key]=tableData.value[newModel.key]
}
// 定义属性判断输入框该输入的数据类型
let inputType=ref()
// 改变type的值
const handleChange = (value: any) => {      
  inputType.value=value
  console.log(inputType.value);
  
};
const changeType=(value:any)=>{
  if(inputType.value=="int"){
    let reg = /^[0-9]+$/; 
    if(value!=""&&!reg.test(value)){ 
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
  tags: []
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
// tag标签失去焦点之后添加的tags
const handleInputConfirm = (record:any) => {
  console.log(123);
  
  let tags = record.enum;
  if (state.inputValue && tags.indexOf(state.inputValue) === -1) {
    tags = [...tags, state.inputValue];
  }
  Object.assign(record, {
    enum:tags,
 });
 editableData[record.key].enum=record.enum
 console.log(record.enum);
 
 state.inputVisible=false
 state.inputValue=''
}
// 移除tags
const handleCloseTag = (record:any,removedTag: string) => {
      const tags = record.enum.filter((tag: string) => tag !== removedTag);
      record.enum = tags;
      editableData[record.key].enum=tags
      console.log(record.enum);
      
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
    title:'description',
    dataIndex:'description',
    key:'description',
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
        value: 'boolean',
        label: 'boolean',
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
          <template v-if='column.key==="description"'>
          <div>
            <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key].description"
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
          <template v-if="column.key === 'enum'">

          <template v-if="editableData[record.key]">
            <template v-for="(tag,index) in editableData[record.key].enum" :key="index">
              <a-tooltip v-if="tag.length > 20" :title="tag">
                <a-tag :closable="true" :visible="true" @close="handleCloseTag(record, tag)">
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag v-else-if="tag.length==0"></a-tag>
              <a-tag v-else :closable="true" :visible="true" @close="handleCloseTag(record, tag)">
                {{tag}}
              </a-tag>
            </template>
            <a-input v-if="state.inputVisible && record.type=='str'" ref="inputRef" v-model:value.trim="state.inputValue" type="text"
                     size="small" :style="{ width: '78px' }" @blur="handleInputConfirm(record)"
                     @keyup.enter="handleInputConfirm(record)" />
            <a-input-number v-else-if="state.inputVisible && record.type=='number'" ref="inputRef" v-model:value.number="state.inputValue" type="text"
            size="small" :style="{ width: '78px' }" @blur="handleInputConfirm(record)"
            @keyup.enter="handleInputConfirm(record)" />
            <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput()">
              <plus-outlined />
              New Value
            </a-tag>
          </template>

          <span v-else>
            <a-tag v-for="tag in record.enum" :key="tag" color="cyan">
              {{ tag }}
            </a-tag>
          </span>
        
    </template>
            <template v-if="column.dataIndex === 'action'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a style="color:red" @click="save(record)">save </a>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
            <a style="margin-left:0.625rem;" >cancel</a>
          </a-popconfirm>  
          </span>
            <span v-else>
              <a @click="edit(record.key)">Edit</a>
              <a-popconfirm title="Sure to delete?" @confirm="delmodel(record)">
              <a style="margin-left:0.625rem;">delete</a>
            </a-popconfirm>
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
/deep/ .ant-table-tbody{
        > tr:hover:not(.ant-table-expanded-row) > td,.ant-table-row-hover,.ant-table-row-hover>td{
        background:none !important;
        //这里是将鼠标移入时的背景色取消掉了
        }
      }
</style>