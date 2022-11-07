<script setup lang="ts">
import { ref, reactive, UnwrapRef, onMounted, nextTick } from 'vue';
import { FormProps, message  } from 'ant-design-vue';
import {  PlusOutlined} from '@ant-design/icons-vue';
import request from "@/utils/request"
import { tableSearch ,FormState, statesTs} from './componentTS/metatemplate';
import cloneDeep from 'lodash-es/cloneDeep';
import { useI18n } from "vue-i18n";
import { useRouter,onBeforeRouteLeave } from 'vue-router';
import { Rule } from 'ant-design-vue/es/form';
// import { FormState } from './componentTS/awmodeler';
const { t } = useI18n()
// 表单查询的数据
const formState: UnwrapRef<FormState> = reactive({
      search: '',
      q:'category:meta'
});
// 表单完成后的回调
const handleFinish: FormProps['onFinish'] = async (values: any) => {
  query(formState)
};
// 表单失败后的回调
const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => {
      console.log(errors);
};
// 表格的数据
let tableData= ref<Array<any>>([])
let searchobj: tableSearch = reactive({
  search: "",
  page: 1,
  perPage:10,
  q:'category:meta'
})
const arr=(dataArr:any)=> dataArr.map((item: any,index: string)=>({...item,editing: false, inputVisible: false, inputValue: ''}))
async function query(data?:any){
 let rst= await request.get("/api/templates",{params:data || searchobj})
 console.log(rst.data);
 
 tableData.value=arr(rst.data)
}
onMounted(()=>{
  query()
})
// 分页的数据
let pagination=ref( {
        pageNo: 1,
        pageSize: 10, // 默认每页显示数量
        showQuickJumper: true,
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ['10', '20', '50', '100'], // 每页数量选项
        showTotal: (total: any) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current: any, pageSize: any) => onSizeChange(current, pageSize), // 改变每页数量时更新显示
        onChange:(page: any,pageSize: any)=>onPageChange(page,pageSize),//点击页码事件
        total:0 //总条数
       })

const onPageChange = async(page: number, pageSize: any) => {
  pagination.value.pageNo = page
  pagination.value.pageSize=pageSize
  // searchobj.page= page
  // searchobj.perPage = pageSize
  if (formState.search) {
    searchobj.search=formState.search
  } else {
    searchobj.search=''
  }
       await query()
   }
  //  分页的数据
const onSizeChange =async (current: any, pageSize: number) => {
        pagination.value.pageNo = current
        pagination.value.pageSize=pageSize
      //  searchobj.page= current
  // searchobj.perPage = pageSize
      if (formState.search) {
    searchobj.search=formState.search
      } else {
    searchobj.search=''
  }
     await query()
   }
   const expend = (isExpand:any,rected:any) => {
  console.log(isExpand,rected);
  
}
interface DataItem {
  name: string;
  category:string
  description: string;
  tags: Array<string>;
  editing:boolean,
  inputVisible:boolean,
  inputValue:string
}
let editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
let editData=reactive<DataItem>({
  name:'',
  description:'',
  category:'',
  tags:[],
  editing: true,
  inputVisible: false,
  inputValue: '',
})
  // 点击修改meta的方法
const updMeta=async (data:any)=>{
  let rst=await request.put(`/api/templates/${data._id}`,data)
  console.log(rst);
}
let showAddFactorBtn = ref(true)
// 点击Edit触发的函数
const edit = (record:any) => {
  
  editData.name = record.name,
  editData.description = record.description,
  editData.tags = record.tags
  record.editing=true
  showAddFactorBtn.value=false
};
const clearFactorState = () => {
  editData.name = '',
  editData.description = '',
  editData.tags = []
  editData.editing = true
  editData.inputVisible = false
  editData.inputValue = '';

  // (instance?.refs.refFactorForm as any).resetFields();
}

// 点击save触发的函数
const save =async (record:any) => {
  record.editing=false
  
  if(record._id){
    await updMeta(record)
  }else{
    
  console.log(tableData.value);
    await request.post("/api/templates",record)
  }
  await query()
  clearFactorState()
  showAddFactorBtn.value=false
}


const createMeta=()=>{

  showAddFactorBtn.value=false
  tableData.value.unshift({
    name:'',
    description:'',
    category:'meta',
    tags:[],
    editing: true,
    inputVisible: true,
    inputValue: ''
  })
}
// 点击删除的方法
const delmodel =async (obj: any) => {
  if(obj._id){
    let rst=await request.delete(`/api/templates/${obj._id}`)
    query()
  }else{
    const index= tableData.value.findIndex(e => e === obj)
  tableData.value.splice(index,1);
  }
};

// 点击取消的函数
const cancel=(record:any)=>{
  if(editData.name===''){
   const index=tableData.value.findIndex(e=>e===record)
   tableData.value.splice(index,1)
  }else{
    record.name = editData.name
    record.description = editData.description
    record.tags = editData.tags

    record.editing = false
  }
  showAddFactorBtn.value=true

}
// 表格的结构
const columns = reactive<Object[]>(
  [
  {
    title: 'component.table.name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'component.table.description',
    dataIndex: 'description',
    key: 'description',
    },

   {
      title: 'component.table.tags',
      dataIndex: 'tags',
    key:'tags'
    },
  {
    title: 'component.table.action',
    dataIndex: 'action',
    key: 'action',
  }]
)
// 获取新建tags的dom
let inputRef = ref();
// 添加的表单tags
let states = reactive<statesTs>({
  tags: [],
  inputVisible: false,
  inputValue: '',
});
// 点击添加标签的方法
const showInput = (record:any) => {
  record.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
    })
};
// tag标签失去焦点之后添加的tags
const handleInputConfirm = (record:any) => {
    let tags = record.tags;
  if (record.inputValue && tags.indexOf(record.inputValue) === -1) {
    tags = [...tags, record.inputValue];
  }
  Object.assign(states, {
    tags:tags,
    inputVisible: false,
    inputValue: '',
 });  
  console.log(states.tags);
  
}
// 移除tags
const handleClose = (record:any,removedTag: string) => {
      const tags = record.tags.filter((tag: string) => tag !== removedTag);
      record.tags = tags;
};
// onBeforeRouteLeave(async (to,form)=>{
// console.log("to", to , "form", form);
// if(to.path==`/metaModeler/${to.params._id}`){
//   let rst=await request.get(`/api/templates/${to.params._id}`,{params:{category:'meta'}})
//   to.meta.title=`MetaModel ${rst.name}`
// }
// })
let checkName=async (_rule:Rule,value:string)=>{
  console.log(123);

  let reg=/^[a-zA-Z\$_][a-zA-Z\d_]*$/
  if(!value){
    return Promise.reject("place input your name")
  }else if(reg.test(value)){
    return Promise.reject("Please enter the correct name")
  }else{
    return Promise.resolve()
  }
}
let rules:Record<string,Rule[]>={
  name:[{required:true,validator:checkName,trigger:'blur'}]
}



</script>

<template>
  <main style="height:100%;overflow-x: hidden!important;">
      <header class="block shadow" style="width:100%;margin-bottom: 1rem">
        <a-row>
        <a-col :span="20">
          <AForm layout="inline" class="search_form" :model="formState" @finish="handleFinish"
            @finishFailed="handleFinishFailed" :wrapper-col="{ span: 24 }">
            <a-col :span="20">

              <a-mentions
                  v-model:value="formState.search" split=""
                  :placeholder="$t('templateManager.metaSearchText')">
                <a-mentions-option value="tags:">
                  tags:
                </a-mentions-option>
              </a-mentions>
            </a-col>

            <a-col :span="4">
              <a-button type="primary" html-type="submit">{{ $t('common.searchText') }}</a-button>
            </a-col>
          </AForm>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="createMeta" v-if="showAddFactorBtn">
            <template #icon>
              <plus-outlined />
            </template>
          </a-button>
        </a-col>
      </a-row>
      </header>
      
      <a-table :columns="columns" :data-source="tableData" bordered>
        <template #headerCell="{ column }">
          <span>{{ $t(column.title) }}</span>
        </template>
      <template #bodyCell="{ column, text, record }">
      <template v-if='column.key==="name"'>
        <div>
          <a-form :model="record" v-if="record.editing" :rules="rules">
            <a-form-item name="name">
              <a-input
              placeholder="Meta Name"
              v-model:value="record.name"
              style="margin: -5px 0"
              />
            </a-form-item>
          </a-form>

          <template v-else>
            <a :href="'/#/metaModeler/'+record._id+'/'+record.name">{{text}}</a>
          </template>
        </div>
        </template>
        <template v-if='column.key==="description"'>
        <div>
          <a-form v-if="record.editing" :model="record" :rules="rules">
            <a-form-item name="description">
              <a-input

            v-model:value="record.description"
            style="margin: -5px 0"
          />
            </a-form-item>
          </a-form>

          <template v-else>
            {{ text }}
          </template>
        </div>
        </template>
          <template v-if="column.key === 'tags'">
            <template v-if="record.editing">
                  <template v-for="(tag, index) in record.tags" :key="tag">
                  <a-tooltip v-if="tag.length > 20" :title="tag">
                    <a-tag :closable="true" @close="handleClose(record,tag)">
                      {{ `${tag.slice(0, 20)}...` }}
                    </a-tag>
                  </a-tooltip>
                  <a-tag v-else-if="tag.length==0"></a-tag>
                  <a-tag v-else :closable="true" @close="handleClose(record,tag)">
                    {{tag}}
                  </a-tag>  
                </template>
                <a-input
                  v-if="record.inputVisible"
                  ref="inputRef"
                  v-model:value="record.inputValue"
                  type="text"
                  size="small"
                  :style="{ width: '78px' }"
                  @blur="handleInputConfirm(record)"
                  @keyup.enter="handleInputConfirm(record)"
                />
              <a-tag v-else style="background: #fff; border-style: dashed" 
              @click="showInput(record)">
                <plus-outlined />
                {{ $t('common.newTag') }}
              </a-tag>
            </template>
              <span v-else>
                <a-tag
                  v-for="tag in record.tags"
                  :key="tag"
                  :color="tag === 'test' ? 'volcano' : 'red'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
          </template>
          <template v-else-if="column.dataIndex === 'action'">
        <div class="editable-row-operations">
          <span v-if="record.editing">
            <a style="color:red" @click="save(record)">{{ $t('common.saveText') }} </a>

            <a style="margin-left:0.625rem;" @click="cancel(record)">{{ $t('common.cancelText') }}</a>

          </span>
          <span v-else>
            <a @click="edit(record)">{{ $t('component.table.edit') }}</a>
              <a-popconfirm
                  :title="$t('component.message.sureDel')"
                  @confirm="delmodel(record)"
                  :cancel-text="$t('common.cancelText')"
                  :ok-text="$t('common.okText')">
              <a style="margin-left:0.625rem;">{{ $t('common.delText') }}         </a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </template>
  </a-table>
      
  </main>
</template>

<style scoped lang="postcss">
.main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>