<script setup lang="ts">
import request from '@/utils/request';
import useTable from '@/composables/useTable';
import { mockMBTUrl,realMBTUrl } from '@/appConfig'
import { message } from 'ant-design-vue/es'
import * as _ from 'lodash'
import { ref, reactive, computed, onBeforeMount, defineComponent, UnwrapRef, onMounted, nextTick, watch ,getCurrentInstance} from 'vue';
import type { FormProps, SelectProps, TableProps, TreeProps } from 'ant-design-vue';
import {tableSearch , FormState, ModelState, statesTs } from "./componentTS/mbtmodeler";
import { Rule } from 'ant-design-vue/es/form';
import {  PlusOutlined,  EditOutlined,} from '@ant-design/icons-vue';
import { useRoute, useRouter } from 'vue-router'
//Setting url for data fetching
// const url=mockMBTUrl;
const url=realMBTUrl;
const route = useRoute()
const router = useRouter()
const tableRef = ref()
let searchobj:tableSearch = reactive({
  search: "",
  size: 20,
  page:1,
  perPage:10
})
// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
  search: ''
});

const instance=getCurrentInstance()


const {
  dataSource, columns, originColumns, tableLoading, pagination, selectedRowKeys,
  updateTable, onTableRowSelectChange, tableResize
} = useTable({
  table: tableRef,
  columns: [
    { title: 'name', dataIndex: 'name', key: 'name', width: 40 },
    { title: 'description', dataIndex: 'description', key: 'description', width: 120 },
    {
      title: 'tags', dataIndex: 'tags', key: 'tags', width: 100, customRender: ((opt) => {

        if (_.isArray(opt.value)) {
          return opt.value.toString();
        }
        else return opt.value
      })
    },
    { title: 'Action', dataIndex: 'action', key: 'action', width: 100 },


  ],
  updateTableOptions: {
    fetchUrl:
    url
      // '/mbtlist/mbt-models'//For mockup
      // '/api/test-models'// For real backend
    // '/mbtapi/mbt-models'
  }
})
function openMenuModal() {
  alert('good')
}

onBeforeMount(() => {

  updateTable()
})

const onFinishFailedForm = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};



async function query(data?: any) {

  let rst;
  if (data && data.search.toString().substring(0, 6) == '@tags:') {
    rst = await request.get(url+`?q=tags:` + data.search.substring(6, data.search.length).toUpperCase().trim())
  } else {
    rst = await request.get(url, { params: data || searchobj })
  }


  if (rst.data) {
    // console.log('rst:', rst.data)   
   
    dataSource.value = rst.data
    return rst.data
  }
}

/**
 * Search the result
 */
const handleFinish: FormProps['onFinish'] = (values: any) => {

  let fetchUrl ='';
  if (formState && formState.search.toString().substring(0, 6) == '@tags:') {
 
  fetchUrl= url+`?q=tags:` + formState.search.substring(6, formState.search.length).toUpperCase().trim();
  }else{
    fetchUrl= url+`?search=` + formState.search;
  }

  updateTable({fetchUrl:fetchUrl})

};
const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => {
  console.log(errors);
};
const wrapperCol = { span: 24, offset: 12 }
// 模态窗数据
const visible = ref<boolean>(false);
const showModal = () => {
  visible.value = true;
};

let modelstates = ref<ModelState>({
  name: '',
  description: '',
  _id: "",
  tags: []
});
onMounted(() => {

   query()    
 }) 
// 修改功能4
// 修改函数
async function updateMBT(url: string, data: any) {
  let rst = await request.put(url, data)
  // console.log(rst);
}
let refForm=ref(null)
// 清除模态窗数据
const clear = () => {
  
  modelstates.value = {
    name: "",
    description: '',
    _id: "",
    tags: []
  },
    states.tags = []; 

    (instance?.refs.refForm as any).resetFields()

}

// 添加的表单tags
let inputRef = ref();
let states = reactive<statesTs>({
  tags: [],
  inputVisible: false,
  inputValue: '',
});

// 修改的函数
const edit = (rowobj: any) => {

  showModal()
  modelstates.value.name = rowobj.name
  modelstates.value.description = rowobj.description
  modelstates.value._id = rowobj._id
  states.tags = rowobj.tags
}

async function saveMBT(data: any) {

  return new Promise((resolve, reject) => {
    request.post(url, data).then(res => {
      // console.log(res);

    }).catch(function (error) {
      if (error.response.status == 409) {
        message.error("Duplicate name or description")
      }
    });
  })

}

const onFinishForm = async (modelstates: any) => {
  modelstates.value.tags = states.tags
  // 判断修改或添加
  if (modelstates.value.name && modelstates.value.description) {
    if (modelstates.value._id) {
      await updateMBT(url+`/${modelstates.value._id}`, modelstates.value)
      message.success("Modified successfully")
    } else {
      delete modelstates.value._id
      await saveMBT(modelstates.value)
      message.success("Added successfully")
    }
    // }
    visible.value = false;
    clear()
    query()
  } else {
    return message.error("name and descript is required")
  }

};

/**
 * Create a new model and jump to moderler
 */
const handleOk = () => {
  
  let routeparam = `/mbtmodeler/${modelstates.value._id}/${modelstates.value.name}`
  
  onFinishForm(modelstates)
  clear()
  visible.value = false;
  
  router.push({path:routeparam});

};
// 关闭模态窗触发事件
const closemodel = () => {
  clear()
  visible.value = false;
  query()
  // console.log(modelstates.value);

}
// 删除功能
async function delmbt(key: any) {
  // console.log('delete key:',key)
  // console.log('delete url:',url+`/${key._id}`);
  let rst = await request.delete(url+`/${key._id}`)
  updateTable()
  // query()
  // console.log('rst:',rst);

}
const confirm = (e: MouseEvent) => {
  delmbt(e)
  query()
  message.success('Delete on Successed');
};

const cancel = (e: MouseEvent) => {
  console.log(e);

};

// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Please input your name!")
  } else {
    return Promise.resolve();
  }

}

let checkDesc = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Please input your name!")
  } else {
    return Promise.resolve();
  }

}
let rules: Record<string, Rule[]> = {
  name: [{ required: true, validator: checkName, trigger: 'blur' }],
  description: [{ required: true, validator: checkDesc, trigger: 'blur' }],

};

const handleClose = (removedTag: string) => {
  const tags = states.tags.filter((tag: string) => tag !== removedTag);
  // console.log(tags);
  states.tags = tags;
};
const showInput = () => {
  states.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
    inputRef.value.toString().toUpperCase();
  })
};

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
}




</script>
  
<template>

  <main style="height:100%;overflow-x: hidden!important;">
    <header class="block shadow">
      <!-- <section class="block shadow flex-center"> -->

      <!-- 表单的查询 -->
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
          <a-button type="primary" @click="showModal">
            <template #icon>
              <plus-outlined />
            </template>
          </a-button>
        </a-col>
      </a-row>
    </header>
    <!-- 模态窗 -->
    <div>
      <a-modal v-model:visible="visible" :title="modelstates._id? 'Update MBT':'Save MBT'" @cancel="closemodel"
        @ok="handleOk" :width="700">
        <template #footer>
          <a-button @click="closemodel">cancel</a-button>
          <a-button @click="handleOk" type="primary" class="btn_ok">Ok</a-button>
        </template>
        <a-form ref="refForm" :model="modelstates" :rules="rules" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"
          autocomplete="off" @finish="onFinishForm" @finishFailed="onFinishFailedForm">
          <a-form-item label="name" name="name">
            <a-input v-model:value="modelstates.name" />
          </a-form-item>

          <a-form-item label="description" name="description">
            <a-input v-model:value="modelstates.description" />
          </a-form-item>



          <!-- tags标签 -->
          <a-form-item label="tags" name="tags">
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
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
    <ATable ref="tableRef" class="table" rowKey="key" :dataSource="dataSource" :columns="columns"
      :pagination="pagination" :loading="tableLoading" bordered @resizeColumn="tableResize"
      :rowSelection="{ selectedRowKeys, onChange: onTableRowSelectChange }">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <edit-outlined />
            Name
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">

          <a :href="'/#/mbtmodeler/'+ record._id+'/'+record.name">{{ record.name }}</a>
        </template>

        <template v-else-if="column.key === 'description'">

          {{ record.description }}

        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag v-for="tag in record.tags" :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>

        <template v-else-if="column.key === 'action'">
          <span>
            <a @click="edit(record)">Edit</a>
            <a-divider type="vertical" />
            <!-- <a :href="'/#/mbtmodeler/'+ record.name">Details</a>
                <a-divider type="vertical" /> -->
            <a-popconfirm title="Are you sure delete this task?" ok-text="Yes" cancel-text="No"
              @confirm="confirm(record)" @cancel="cancel">
              <a>Delete</a>
            </a-popconfirm>
          </span>
        </template>
      </template>


    </ATable>
    <!-- </section> -->
  </main>
</template>
<style lang="postcss" scoped>
main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

header {
  margin-bottom: 1rem;
}

footer {
  margin-top: 1rem;
}

∏ .table {
  width: 100%;
  height: 100px;
  flex: 1;
  background-color: #fff;
  border-radius: 0.7rem;
}
</style>
<style>

</style>
