<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount, UnwrapRef, onMounted, nextTick, getCurrentInstance } from 'vue';
import { FormProps, message, SelectProps, TreeProps } from 'ant-design-vue';
import { SyncOutlined, PlusOutlined, DeleteOutlined ,DeleteTwoTone,CheckCircleTwoTone} from '@ant-design/icons-vue';
import request from "@/utils/request"
import { tableSearch, FormState, statesTs, ModelState } from './componentTS/metatemplate';
import cloneDeep from 'lodash-es/cloneDeep';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
// import { FormState } from './componentTS/awmodeler';
// 表单查询的数据
const formState: UnwrapRef<FormState> = reactive({
  search: '',
  q: 'category:static'
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
let tableData = ref<Array<any>>([])
let searchobj: tableSearch = reactive({
  search: "",
  // page: 1,
  // perPage:10,
  q: 'category:static'
})
const arr = (dataArr: any) => dataArr.map((item: any, index: string) => ({ ...item, key: index }))
async function query(data?: any) {
  let rst = await request.get("/api/templates", { params: data || searchobj })
  console.log(rst.data);

  tableData.value = arr(rst.data)
}
onMounted(() => {
  query()
})
// 分页的数据
let pagination = ref({
  pageNo: 1,
  pageSize: 10, // 默认每页显示数量
  showQuickJumper: true,
  showSizeChanger: true, // 显示可改变每页数量
  pageSizeOptions: ['10', '20', '50', '100'], // 每页数量选项
  showTotal: (total: any) => `共 ${total} 条`, // 显示总数
  onShowSizeChange: (current: any, pageSize: any) => onSizeChange(current, pageSize), // 改变每页数量时更新显示
  onChange: (page: any, pageSize: any) => onPageChange(page, pageSize),//点击页码事件
  total: 0 //总条数
})

const onPageChange = async (page: number, pageSize: any) => {
  pagination.value.pageNo = page
  pagination.value.pageSize = pageSize
  // searchobj.page= page
  // searchobj.perPage = pageSize
  if (formState.search) {
    searchobj.search = formState.search
  } else {
    searchobj.search = ''
  }
  await query()
}
//  分页的数据
const onSizeChange = async (current: any, pageSize: number) => {
  pagination.value.pageNo = current
  pagination.value.pageSize = pageSize
  //  searchobj.page= current
  // searchobj.perPage = pageSize
  if (formState.search) {
    searchobj.search = formState.search
  } else {
    searchobj.search = ''
  }
  await query()
}
const expend = (isExpand: any, rected: any) => {
  console.log(isExpand, rected);

}
interface DataItem {
  key?: string;
  name: string;
  category:string;
  description: string;
  tags: Array<string>;

}

const isLink = ref<boolean>(false);
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
// 点击修改static的方法
const updstatic = async (data: any) => {
  let rst = await request.put(`/api/templates/${data._id}`, data)
  console.log(rst);
}
// 点击Edit触发的函数
const edit = (key: string) => {
  console.log(editableData);

  editableData[key] = cloneDeep(tableData.value.filter((item: { key: string; }) => key === item.key)[0]);
  console.log(editableData[key]);

  states.tags = editableData[key].tags

};
// 点击save触发的函数
const save = async (obj: any) => {
  
  console.log(obj)
  Object.assign(tableData.value.filter((item: { key: string; }) => obj.key === item.key)[0], editableData[obj.key]);
  console.log(editableData[obj.key]);
  
  editableData[obj.key].tags=states.tags
  editableData[obj.key].category="static"
  console.log(editableData[obj.key]);
  
  
  if(obj._id){
    await updstatic(editableData[obj.key])
  }else{
    
  console.log(tableData.value);
    await request.post("/api/templates",editableData[obj.key])
  }
  await query()
  delete editableData[obj.key];


}
const createstatic = () => {
  const newstatic = {
    key: tableData.value.length,
    name: 'New template',
    description: 'New template',
    category: 'static',
    tags: []

  }
  tableData.value.push({ ...newstatic })
  editableData[newstatic.key]=tableData.value[newstatic.key]
}





// 点击删除的方法
const delmodel = async (obj: any) => {
  if (obj._id) {
    let rst = await request.delete(`/api/templates/${obj._id}`)
  }
  delete editableData[obj.key];
  message.success('Template deleted successfully')
  query()

};
// 点击取消的函数
const cancel = (key: any) => {
  delete editableData[key]
}
// 表格的结构
const columns = reactive<Object[]>(
  [
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },

    {
      title: 'tags',
      dataIndex: 'tags',
      key: 'tags'
    },

    {
      title: 'Action',
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
const showInput = () => {
  states.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  })
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
    inputValue: '',
  });
  console.log(states.tags);

}
// 移除tags
const handleClose = (removedTag: string) => {
  const tags = states.tags.filter((tag: string) => tag !== removedTag);
  states.tags = tags;
};
  // onBeforeRouteLeave(async (to,form)=>{
  // console.log("to", to , "form", form);
  // if(to.path==`/staticModeler/${to.params._id}`){
  //   let rst=await request.get(`/api/templates/${to.params._id}`,{params:{category:'static'}})
  //   to.static.title=`staticModel ${rst.name}`
  // }
  // })
</script>
  
<template>
  <main style="height:100%;overflow-x: hidden!important;">
    <header class="block shadow" style="width:100%;margin-bottom: 1rem">
      <a-row>
        <a-col :span="20">
          <AForm layout="inline" class="search_form" :model="formState" @finish="handleFinish"
            @finishFailed="handleFinishFailed" :wrapper-col="{ span: 24 }">
            <a-col :span="20">

              <a-mentions v-model:value="formState.search" split=""
                placeholder="input @ to search tags, input name to search MBT">
                <a-mentions-option value="tags:">
                  tags:
                </a-mentions-option>
              </a-mentions>
            </a-col>

            <a-col :span="4">
              <a-button type="primary" html-type="submit">search</a-button>
            </a-col>
          </AForm>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="createstatic">
            <template #icon>
              <plus-outlined />
            </template>
          </a-button>
        </a-col>
      </a-row>
    </header>

    <a-table :columns="columns" :data-source="tableData" bordered>
      <template #bodyCell="{ column, text, record }">
        <template v-if='column.key==="name"'>
          <div  >
            <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key].name"
              style="margin: -5px 0" />
               
          
          <template v-else>
              <!-- <p>{{text}}</p> -->
              <a :href="'/#/staticModeler/'+record._id+'/'+record.name">{{text}}</a>    
          </template>
          </div>
        </template>
        <template v-if='column.key==="description"'>
          <div>
            <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key].description"
              style="margin: -5px 0" />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template v-if="column.key === 'tags'">
          <template v-if="editableData[record.key]">
            <template v-for="(tag, index) in states.tags" :key="tag">
              <a-tooltip v-if="tag.length > 20" :title="tag">
                <a-tag :closable="true" @close="handleClose(tag)">
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag v-else-if="tag.length==0"></a-tag>
              <a-tag v-else :closable="true" @close="handleClose(tag)">
                {{tag}}
              </a-tag>
            </template>
            <a-input v-if="states.inputVisible" ref="inputRef" v-model:value="states.inputValue" type="text"
              size="small" :style="{ width: '78px' }" @blur="handleInputConfirm" @keyup.enter="handleInputConfirm" />
            <a-tag v-else style="background: #fff; border-style: dashed" @click="showInput">
              <plus-outlined />
              New Tag
            </a-tag>
          </template>
          <span v-else>
            <a-tag v-for="tag in record.tags" :key="tag" :color="tag === 'test' ? 'volcano' : 'red'">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>

        <template v-else-if="column.dataIndex === 'action'">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a-typography-link @click="save(record)" style="font-size:16px">
                <check-circle-two-tone two-tone-color="#52c41a" />
              </a-typography-link>
              <a-popconfirm title="Sure to cancel?" @confirm="delmodel(record)">
                <a style="margin-left:10px;margin-right:10px;font-size:16px;">
                  <delete-two-tone two-tone-color="#EB6420" />
                </a>
              </a-popconfirm>
              <a-typography-link @click="cancel(record.key)">cancel</a-typography-link>
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
  
<style scoped lang="postcss">
.main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>