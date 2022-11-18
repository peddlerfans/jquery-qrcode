<script setup lang="ts">
import { nextTick, onMounted, reactive, ref, UnwrapRef } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import request from "@/utils/request"
import { cloneDeep } from 'lodash-es';
import { message, SelectProps } from 'ant-design-vue';
import { PlusSquareFilled,DeleteTwoTone,CheckCircleTwoTone,PlusOutlined} from '@ant-design/icons-vue'
import { any } from 'vue-types';
import { useI18n } from "vue-i18n";

const { t } = useI18n()

let route=useRoute()
sessionStorage.setItem('meta_'+route.params._id,JSON.stringify(route.params._id))
// sessionStorage.setItem('meta_'+route.params.name,JSON.stringify(route.params.name))
// 获取当前数据并赋值
let recordobj=ref()
// 根据传来的name值获取到数据
async function query (data?:any){
  //  let rst=await request.get('/api/templates',{params:{q:'category:meta', search:data}})
  let rst=await request.get(`/api/templates/${data}`,{params:{q:'category:meta',search:''}})
    
   route.params.name=rst.name
   recordobj.value=rst   
          
          recordobj.value.model=rst.model
          if(rst.model && rst.model.length>0){
            tableData.value=arr(rst.model)
          }
      ;
   
}
// 给每条数据添加条属性
const arr=(dataArr:any)=> dataArr.map((item: any,index: string)=>({...item,editing: false, inputVisible: false, inputValue: ''}))
onMounted(()=>{
  let getId:any=sessionStorage.getItem('meta_'+route.params._id)
console.log(JSON.parse(getId));
  
    query(JSON.parse(getId))
})

// 表格的数据
let tableData=ref<Array<any>>([])
interface DataItem {
  name: string;
  description:string
  type: string;
  enum:any;
  editing:boolean,
  inputVisible:boolean,
  inputValue:string
}
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
let editData=reactive<DataItem>({
  name:"",
  description:"",
  type:"",
  enum:[],
  editing:true,
  inputVisible:false,
  inputValue: ""
  
})
let getid=sessionStorage.getItem('meta_'+route.params._id)
// 修改meta的方法
const updMeta=async (data:any)=>{
  // console.log(data.value);
  
  if(data.__v){
    delete data.__v
  }else{
    let rst=await request.put(`/api/templates/${JSON.parse(getid!)}`,{model:data})
  message.success('Modification succeeded')
  showAddFactorBtn.value=true
  clearFactorState()
  }

}
let showAddFactorBtn=ref(true)
const edit = (record: any) => {
  editData.name = record.name,
  editData.description = record.description,
  editData.type = record.type
  editData.enum = record.enum
  record.editing=true
  showAddFactorBtn.value=false

};
const clearFactorState = () => {
  editData.name = '',
  editData.description = '',
  editData.type = '',
  editData.enum = []
  editData.editing = true
  editData.inputVisible = false
  editData.inputValue = '';

  // (instance?.refs.refFactorForm as any).resetFields();
}

// 点击save触发的函数
const save =async (obj:any) => {
  obj.editing=false
  await updMeta(tableData.value)
  
} 
// 点击删除的方法
const delmodel =async (obj: any) => {
  // delete tableData.value[tableData.value.indexOf(obj)]
  tableData.value=tableData.value.filter((item:any)=>item !==obj)
  console.log(editableData[obj.key]);
  recordobj.value.model=tableData.value
  if(recordobj.value.__v){
    delete recordobj.value.__v
  }
  let rst=await request.put(`/api/templates/${JSON.parse(getid!)}`,recordobj.value)
  // query()
  
};
// 点击取消的函数
const cancel=(record:any)=>{
  if(editData.name===''){
   const index=tableData.value.findIndex(e=>e===record)
   tableData.value.splice(index,1)
  }else{
    record.name = editData.name
    record.description = editData.description
    record.enum = editData.enum
    record.editing = false
  }
  showAddFactorBtn.value=true
  clearFactorState()
}
// 点击添加数据
const saveModel=()=>{
  showAddFactorBtn.value=false
  tableData.value.unshift({
    name:'',
    type:'str',
    enum:"",
    editing: true,
    inputVisible: true,
    inputValue: '',
    requerd:false
  })
}
// 定义属性判断输入框该输入的数据类型
let inputType=ref()

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
let inputRef = ref();
// 点击添加标签的方法
const showInput = (record:any) => {
  record.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
    })
};
// tag标签失去焦点之后添加的tags
const handleInputConfirm = (record:any) => {
  let values = record.enum;
  if (record.inputValue && values.indexOf(record.inputValue) === -1) {
    values = [...values, record.inputValue];
    console.log(values);
    
  }
  Object.assign(record, {
    enum:values,
    inputVisible: false,
    inputValue: '',
 });
 console.log(record);
 
}
// 移除tags
const handleCloseTag = (record:any,removedTag: string) => {
  const tags = record.enum.filter((tag: string) => tag !== removedTag);
      record.enum = tags;
      
};
// 表格的数据结构
const columns=reactive<Object[]>(
  [
  {
    title: 'component.table.required',
    dataIndex: 'required',
    key: 'required',
    width:180
  },
  {
    title: 'component.table.name',
    dataIndex: 'name',
    key: 'name',
    width:180
  },
  {
    title: 'component.table.description',
    dataIndex:'description',
    key:'description',
    width:180
  },
  {
    title: 'component.table.type',
    dataIndex: 'type',
    key: 'type',
    width:180
    },
    {
    title: 'component.table.enum',
    dataIndex: 'enum',
    key: 'enum',
    width:180
    },
{
    title:'component.table.action',
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
      <template #headerCell="{ column }">
        <span>{{ $t(column.title) }}</span>
        <template v-if="column.key==='action'">
          <span class="iconsave" style="color:#1890ff;" @click="saveModel" v-if="showAddFactorBtn">
            <plus-square-filled />
          </span>
        </template>
      </template>
      <template #bodyCell="{ column, text, record }">
        <template v-if='column.key==="required"'>
          <a-switch :checked-children= 't("compoent.table.required")'  :un-checked-children='t("compoent.table.unrequired")' v-model:checked="record.requerd" @change="(checked:any)=>record.requerd=checked"></a-switch>
        </template>
        <template v-if='column.key==="name"'>
          <div>
            <a-input
            v-if="record.editing"
              v-model:value="record.name"
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
            v-if="record.editing"
              v-model:value="record.description"
              style="margin: -5px 0"
            />           
            <template v-else>
              {{ text }}
            </template>
          </div>
          </template>
          <template v-if='column.key==="type"'>
          <div>
            <a-select v-if="record.editing"
            :options="optiones"
            v-model:value="record.type"
            ></a-select>
            <template v-else>
              {{ text }}
            </template>
          </div>
          </template>
          <template v-if="column.key === 'enum'">

          <template v-if="record.editing">
            <template v-for="(tag,index) in record.enum" :key="index">
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
            <a-input v-if="record.inputVisible && record.type=='str'" ref="inputRef" v-model:value.trim="record.inputValue" type="text"
                     size="small" :style="{ width: '78px' }" @blur="handleInputConfirm(record)"
                     @keyup.enter="handleInputConfirm(record)" />
            <a-input-number v-else-if="record.inputVisible && record.type=='number'" ref="inputRef" v-model:value.number="record.inputValue" type="text"
            size="small" :style="{ width: '78px' }" @blur="handleInputConfirm(record)"
            @keyup.enter="handleInputConfirm(record)" />
            <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput(record)">
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
            <template v-if="column.dataIndex === 'action'">
          <div class="editable-row-operations">
            <span v-if="record.editing">
              <a style="color:red" @click="save(record)">{{ $t('common.saveText') }} </a>
            <a-divider type="vertical" />
              <a style="margin-left:0.625rem;" @click="cancel(record)">{{ $t('common.cancelText') }}</a>
              <a-divider type="vertical" />
              
            </span>
            <span v-else>
              <a @click="edit(record)">{{ $t('common.editText') }}</a>
               
              <a-popconfirm
                   :title="$t('component.message.sureDel')"
                   :ok-text="$t('common.yesText')"
                   :cancel-text="$t('common.noText')"
                   @confirm="delmodel(record)">
              <a style="margin-left:0.625rem;">{{ $t('common.delText') }}</a>
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