<script lang="ts">

export default { name: 'AWModeler',directive: {
    MouseMenu: MouseMenuDirective
  }}
</script>
<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount, defineComponent, UnwrapRef, onMounted, nextTick, watch, getCurrentInstance } from 'vue';
import type { FormProps, SelectProps, TableProps, TreeProps, } from 'ant-design-vue';
import { CarryOutOutlined,  SmileTwoTone, SmileOutlined, DownOutlined,PlusOutlined,SearchOutlined,EditTwoTone ,DeleteTwoTone,PlusCircleTwoTone} from '@ant-design/icons-vue'
import {  Space, Tooltip, } from 'ant-design-vue';
import { SplitPanel } from '@/components/basic/split-panel';
import { message } from 'ant-design-vue/es'
import request from '@/utils/request';
import { Rule } from 'ant-design-vue/es/form';
import { tableSearch, FormState, paramsobj, ModelState, statesTs } from "./componentTS/awmodeler";
// import VueContextMenu from 'vue-contextmenu'
import { MouseMenuDirective } from '@howdyjs/mouse-menu';
import _ from 'lodash';
import { TreeNodeProps } from 'ant-design-vue/lib/vc-tree';
import { TreeDataItem } from 'ant-design-vue/lib/tree';
import { array } from 'vue-types';
import path from 'path';
let tableData= ref([])
let searchobj: tableSearch = reactive({
  search: "",
  page: 1,
  perPage:10
})
// 定义查询输入值时的空格
function find(str: string | any[],cha: any,num: number){
    var x=str.indexOf(cha);
    for(var i=0;i<num;i++){
        x=str.indexOf(cha,x+1);
    }
    return x;
}
async function query(data?: any) {  
  let rst;
  // if (data && data.search.toString().substring(0, 6) == '@tags:' && checked.value==true) {
  //   // 判断空格出现的次数
  //   let searchCount=data.search.split(" ").length-1;
  //   console.log(searchCount);
  //   console.log(data.search.length);
    
  //   // 如果空格数大于二，则截取第二个空格之后的字符
  //   if(searchCount==2){
  //     let searchIndex=find(data.search," ",1)
  //   console.log(searchIndex);
  //   let advancedSearch=data.search.substring(searchIndex+1)
  //   rst = await request.get("/api/hlfs"+`?q=tags:` + data.search.substring(6, data.search.length).toUpperCase().trim(),{params:{search:advancedSearch}})
  //   }else{
  //     rst = await request.get("/api/hlfs"+`?q=tags:` + data.search.substring(6, data.search.length).toUpperCase().trim())
  //   }
  // } else {
    rst = await request.get("/api/hlfs", { params: data || searchobj })
  // }  
  // let rst = await request.get("/api/hlfs", { params: data || searchobj })
  if (rst.data) {
    pagination.value.total = rst.total    
    tableData.value = rst.data
  }
  return rst.data
}
onMounted(async() => {
  await query()
  await queryTree()
  if(tableData.value.length>0){
    rightNode()
  }
}) 
// 切换查询方式
let checked=ref(false)
const checkquery=()=>{
  checked.value!=checked.value  
}
// 获取左侧区域的dom
const leftRef=ref()
const rightClick=ref(false)
function rightNode(){
  let leftNode=leftRef.value.children[0].children[0].children[0]
  let menuNode=leftNode.children[0]
  let treeNode=leftNode.children[2]
  // 计算元素距离视图的总宽高
  let leftNodeWidth=leftNode.getBoundingClientRect().right
  let leftNodeHight=leftNode.getBoundingClientRect().bottom
  // 计算树节点距离视图的总宽高
  let treeNodeWidth=treeNode.getBoundingClientRect().right
  let treeNodeHight=treeNode.getBoundingClientRect().bottom
  window.addEventListener('click',function(){rightClick.value=false})
  // 给空白区域绑定点击事件
  leftNode.addEventListener('contextmenu',function(e:any){
    e.preventDefault()    
    if(treeNodeHight<e.clientY && e.clientY<leftNodeHight){
      const {x,y}=e
      // leftNode.style.position='relative'
      rightClick.value=true
      // menuNode.style.backgroundColor='antiquewhite'

      menuNode.style.position='fixed'
      menuNode.style.top=e.clientY+'px'
      menuNode.style.left=e.clientX+'px'
    }
  })
}


const instance=getCurrentInstance()
// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
      search:''
});
const handleFinish: FormProps['onFinish'] = async (values: any) => {
  await query(formState)
  console.log(tableData);
  
 pagination.value.pageNo=1
};


const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => {
      console.log(errors);
};
// 模态窗数据
const visible = ref<boolean>(false);
const showModal = () => {
  visible.value = true;      
};
  
    const handleOk = () => {
      onFinishForm(modelstates)
      clear()
};
// 关闭模态窗触发事件
const closemodel = () => {
  clear()
  visible.value = false;
}
// 模态窗表单

let partype = ref('')
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
// 点击添加params的函数

let obj = ref<paramsobj>({ name: "", type: "" })
// 添加功能的函数
async function saveAw(data: any) {
  return new Promise((resolve, reject) => {
    request.post("/api/hlfs", data).then(res => {   
      if(res){
        visible.value = false;
        message.success("Added successfully")        
        // if(clickNode){
        //   onSelect(clickNode,clickKey)
        // }else{
        //   query()
        // }
      }
       
  }).catch(function (error) {
    visible.value = false;
    if (error.response.status == 409) {
      visible.value = true;
      message.error("Duplicate name or description")
    }
  });
  })
      }
    let modelstates = ref<ModelState>({
      name: '',
      description: '',
      template: "",
      template_en:"", 
      _id: "",
      params:[],
      tags:[]
    });
    
    // 添加parmas的函数
const handleChange = (value: any) => {      
      obj.value.type = value
  
    };

    // 清除模态窗数据
const clear = () => {
  modelstates.value = {
    name: "",
    description: '',
    template: "",
    _id: "",
    template_en: "",
    params: [],
    tags: []
  },
    obj.value = {
    name: '',
    type:''
  }
    states.tags = []; 
    
    (instance?.refs.refForm as any).resetFields()

}
// 添加和删除param
    function addparams() {
  modelstates.value.params.push({...obj.value})
  obj.value = { name: '',  type:'' }
  partype.value=''
}
function closepar(item:any) {
  const parry = modelstates.value.params.filter((paramsitem: { name: any; }) => paramsitem.name !== item.name)
  modelstates.value.params=parry
}
// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject("Please input your name!")
  }else {
    return Promise.resolve();
  }
  
}
let checkDesc = async (_rule: Rule, value: string) => { 
  if (!value) {
    return Promise.reject("Please input your description!")
  }else  {
    return Promise.resolve();
  }
  
} 
let checktem = async (_rule: Rule, value: string) => { 
  
  if (!value) {    
    return Promise.reject("Template or templ is required")
  } else {
    return Promise.resolve();
  }
}
let rules: Record<string, Rule[]> = {
  name: [{ required: true, validator: checkName, trigger: 'blur' }],
  description: [{ required: true, validator: checkDesc, trigger: 'blur' }],
  template: [{ required: true, validator: checktem, trigger: 'blur' }],
}
let refForm=ref(null)
const onFinishForm = async (modelstates: any) => {  
  modelstates.value.tags = states.tags
    if (modelstates.value._id) {
       await updateAw(`/api/hlfs/${modelstates.value._id}`, modelstates.value)
       await query(formState)
        message.success("Modified successfully")
    } else {
      let typeName=ref(true)
      // 查询是否重复description
      await query({search:modelstates.value.description}).then(res=>{
    if(res.length>0){
      if(res[0].description===modelstates.value.description){
      typeName.value=false
    }
    }
    return
  })
      let typeDscription=ref(true)
      // 查询是否重复名称
     await query({q:`name.keyword:${modelstates.value.name}`,search:''}).then(res=>{
        console.log(res);
        if(res.length>0){
        typeDscription.value=false
        
      }
      return
  })
  console.log(typeName.value && typeDscription.value);
  
        if(typeName.value && typeDscription.value){
          delete modelstates.value._id
          // 添加的函数
        await saveAw(modelstates.value)
        }else{
          message.error("Duplicate name or description")
          visible.value = true;
        }
    } 
    visible.value = false;
    clear()
    
  }
    // 判断修改或添加
      
    // }
    const onFinishFailedForm = (errorInfo: any) => {
      console.log('Failed:', errorInfo);
};
// 添加的表单tags
let inputRef = ref();
    let states = reactive<statesTs>({
      tags: [],
      inputVisible: false,
      inputValue: '',
    });

const handleClose = (removedTag: string) => {
  const tags = states.tags.filter((tag: string) => tag !== removedTag);
  states.tags = tags;
};
const showInput = () => {
  states.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
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

    // 删除功能
async function delaw(key:any) {
  let rst = await request.delete(`/api/hlfs/${key._id}`)
      query()
      
}
const confirm = (e: MouseEvent) => {
      delaw(e)
      query()
      message.success('Delete on Successed');
    };
    const cancel = (e: MouseEvent) => {
      console.log(e);
    };
    

    // 修改功能4
    // 修改函数
async function updateAw(url:string,data:any) {
  let rst = await request.put(url, data)
      console.log(rst);
    }

// 修改的函数
const edit = (rowobj:any) => {
  
  showModal()
  modelstates.value.name=rowobj.name
  modelstates.value.description=rowobj.description
  modelstates.value.template=rowobj.template
  modelstates.value._id = rowobj._id
  states.tags = rowobj.tags
  modelstates.value.params = [...rowobj.params]
}

// 表格的结构
const columns = reactive<Object[]>(
  [
  {
    name: 'Name',
    dataIndex: 'Name',
    key: 'Name',
  },
  {
    title: 'description',
    dataIndex: 'description',
    key: 'description',
    },
    {
      title: 'template',
      dataIndex: 'template',
    key:'template'
    },
   {
      title: 'tags',
      dataIndex: 'tags',
    key:'tags'
    },
  {
      title: 'params',
      dataIndex: 'params',
    key:'params'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    key: 'action',
  },
]
)

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
  searchobj.page= page
  searchobj.perPage = pageSize
  if (formState.search) {
    searchobj.search=formState.search
  } else {
    searchobj.search=''
  }
       await query()
   }
const onSizeChange =async (current: any, pageSize: number) => {
        pagination.value.pageNo = current
        pagination.value.pageSize=pageSize
       searchobj.page= current
  searchobj.perPage = pageSize
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
 defineComponent({
  components: {
    SmileOutlined,
    DownOutlined,
  }
})

const wrapperCol={span:24,offset:12}
let treeData:any = ref([])

// 获取后台的树形数据
const queryTree=async ()=>{
  let rst=await request.get('/api/hlfs/_tree')
  //声明一个空数组，将后台的对象push
  treeData.value=objToArr(rst)  
  treeData.value=delNode(treeData.value) 
}
// 定义删除空节点的函数
function delNode(array:any){
  let arr=[]
    for(let i=0;i<array.length;i++){
    let item=array[i]
    if(item.title!==" " && item.children  && item.children.length>0){
      delNode(item.children)
    }
    if(item.title==""){
      arr=array.filter((str:any)=>str.title!=="")
      console.log(arr);
      
    }
    return arr
    }
}
// 数据格式化的函数
function objToArr(obj:Object) {
      const arr = [];
      if (_.isObject(obj)) {
        // let i: keyof any
        for (var i in obj) {          
          var oo:any = {
            title: i,
            key:i,
            children: objToArr(obj[i as keyof typeof objToArr])
          };
          arr.push(oo);
        }
      }
      return arr;
    }
// 当点击时给其赋值，用其值判断调用查询的函数
let clickKey:any=ref()
let clickNode:any=ref()
    // 根据点击的树节点筛选表格的数据
const onSelect: TreeProps['onSelect'] =async ( selectedKeys: any,info?:any) => {
  clickKey.value=selectedKeys
  clickNode.value=info
  console.log(info);
  
  let res = getPathByKey(info.node.dataRef.key, 'key', treeData.value);
  let str:any=res?.map((obj:any)=>{
    return obj.key
  }).join("/")
  if(info.node.dataRef.children.length==0){
    await query({q:`path.keyword:${str}`,search:''})
  // 这里走精准匹配
  
  }else{
  // 这里走前置匹配
  await query({q:`path:${str}`,search:''})
  }
};

// 获取点击所在节点的整个路径
function getPathByKey(value: string, key: string, arr: string | any[]) {
    let temppath: any[] = [];
    try {
        function getNodePath(node:any){
            temppath.push(node);
            //找到符合条件的节点，通过throw终止掉递归
            if (node[key] === value) {
              throw ("GOT IT!");
            }
            if (node.children && node.children.length > 0) {
                for (var i = 0; i < node.children.length; i++) {
                    getNodePath(node.children[i]);
                }
              //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
              temppath.pop();
            }
            else {
              //找到叶子节点时，删除路径当中的该叶子节点
              temppath.pop();
            }
        }
        for (let i = 0; i < arr.length; i++) {
            getNodePath(arr[i]);
        }
    } catch (e) {
        return temppath;
    }
}
// 递归查询当前选中节点的key方法
const getchildKey = (childs: any, findKey: string): any => {
  let finditem = null;
   for (let i = 0, len = childs.length; i < len; i++) {
     let item = childs[i]
     if (item.title.indexOf(findKey)==-1 && item.children && item.children.length > 0) {
       finditem = getchildKey(item.children, findKey)
     }
     if (item.title.indexOf(findKey)>-1 ) {
       finditem = item.key
     }
     if (finditem != null) {
       break
     }
   }
   return finditem
}

// 递归查询父节点children
const getTreeParentChilds = (childs: any, findKey: any): any => {  
   let parentChilds = []
   for (let i = 0, len = childs.length; i < len; i++) {
     let item = childs[i]
     if (item.key !== findKey && item.children && item.children.length > 0) {
       parentChilds = getTreeParentChilds(item.children, findKey)
     }
     if (item.key == findKey) {
       parentChilds = childs
     }
     if (parentChilds.length > 0) {
       break
     }
   }
   return parentChilds
}
// 递归查询当前节点的对象
const getTreeDataByItem=(childs:any, findKey: any):any=> {
   let finditem = null;
   for (let i = 0, len = childs.length; i < len; i++) {
     let item = childs[i]
     if (item.key !== findKey && item.children && item.children.length > 0) {
       finditem = getTreeDataByItem(item.children, findKey)
     }
     if (item.key == findKey) {
       finditem = item
     }
     if (finditem != null) {
       break
     }
   }
   return finditem
 }

// 查询树节点的方法
const expandedKeys = ref<(string | number)[]>([]);
 const autoExpandParent = ref<boolean>(false);
const searchValues = ref<string>('');
watch(searchValues, value => {  
      if(value.length != 0){
        const expanded = treeData.value.map((item: any) => {
          if (item.title.indexOf(value) == -1) {
            return getchildKey(treeData.value,value);
          }
          return null;
        }).filter((item: any, i: any, self: string | any[]) => item && self.indexOf(item) === i);
      expandedKeys.value = expanded as any;
      searchValues.value = value;
        autoExpandParent.value = true;
        console.log(expandedKeys.value);
        
      }else{
        //折叠起来
        autoExpandParent.value =  false;
      }
    })

const onExpand = (keys: any) => {
      expandedKeys.value = keys ;
  autoExpandParent.value = false;
  console.log(expandedKeys.value);
};


// 失去焦点，真正修改树节点的地方
const onchangtitle =async (data: any) => {
  console.log(updTreedata.value);
  // 获取当前节点的整条路径
  let res=getPathByKey(data.dataRef.key,"key",treeData.value);
  let str:any=res?.map((obj:any)=>{
    return obj.key
  }).join("/")
  console.log(str);
  // 将新输入的值拼接到newPath
  let newStrIndex=str.lastIndexOf('/')
  let newStr=str.substring(0,newStrIndex+1)
  let pathnew=newStr+updTreedata.value
  console.log(pathnew);
  await request.post("/api/hlfs/_rename",{path:str,newPath:pathnew})
  await queryTree()
  updTreedata.value=""
  data.dataRef.showEdit=false
  data.showEdit=false
  data.data.showEdit=false
}

// 定义修改节点的变量
let updTreedata=ref('')
// 获取修改节点的dom
let updDom=ref()
// 修改子节点的方法
const updTree = (obj: any) => {
  console.log(obj);
    // 判断展开修改的节点是否恢复
    if(updTreedata.value){
    console.log(updTreedata.value);
    obj.showEdit=false
  obj.data.showEdit=false
  obj.dataRef.showEdit=false
  message.warning("Please complete the modification first")
  }else{
  updTreedata.value=obj.title
  console.log(updTreedata.value);
  obj.showEdit=true
  obj.data.showEdit=true
  obj.dataRef.showEdit=true
  nextTick(()=>{
    updDom.value.focus()
  })
  }
  
}
const addKey:any = (arr: any[]) => (arr??[]).map(item => ({
  ...item,
  showEdit:false,
  children: addKey(item.children)
}))
treeData.value = addKey(treeData.value)

const newChild = ref(
  {
    title: 'NewNode',
    key: "NewNode",
    children: [],
    showEdit: false //修改输入框
  }
)
// let newNum=ref(0)
// 点击添加下级节点的方法，获取当前的key（添加下级节点时，都加children，）
const pushSubtree = (obj: any) => {
  console.log(obj);
  expandedKeys.value = [obj.data.key];
  // newChild.value.title=newChild.value.title+newNum.value
  console.log(obj.data);
  // newChild.value.key = obj.data.key + newChild.value.key
  // autoExpandParent.value = true;
  obj.data.children.push({...newChild.value})

  treeData.value = [...treeData.value]
  autoExpandParent.value=true
  
}
// 添加顶级节点的数据
const topTree=ref({
  title:'TopNode',
  key:'TopNode',
  children:[],
  showEdit: false,
  isLeaf:false
})


// 添加顶级节点
const addTop=()=>{
  treeData.value.push({...topTree.value})
  rightClick.value=false
}
// 删除树形控件数据
const deltree = (key:string) => {
  // request.delete('/api/hlfs/_tree/delete',data:key)  
}
const confirmtree = (obj:any) => {
  console.log(obj);
  
    let parent = getTreeParentChilds(treeData.value, obj.key)
  console.log(parent);
  
  let delIndex = parent.findIndex((item: { title: string; }) => item.title == obj.title)
  parent.splice(delIndex,1)
  treeData.value=[...treeData.value]
  console.log(treeData.value);
  
}

// 右键点击树形控件触发的事件
const onContextMenuClick = (treeKey: string, menuKey: string | number) => {
      console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`);
};
</script>
<template>
  <main class="main"> 
    <div ref="leftRef" style="height:100%">
      <SplitPanel>
        
        <template #left-content>
          <!-- <vue-context-menu style="width:150px"
          :contextmenu="contextmenuData"
          @click="addTop"
          >  
          </vue-context-menu> -->
          <!-- <mouse-menu ref="mousemenuEl" v-bind="options"></mouse-menu> -->
          <a-menu mode="inline" v-show="rightClick" class="rightMenu">
            <a-menu-item key="1" @click="addTop">Add Top Node</a-menu-item>
          </a-menu>
            <a-input-search v-model:value="searchValues" style="margin-bottom: 8px" placeholder="Search" />
          <a-tree
          v-if="treeData?.length"
            :show-line="true"
            :tree-data="treeData"
            :expanded-keys="expandedKeys"
            @select="onSelect"
            :auto-expand-parent="autoExpandParent"
            @expand="onExpand">
      <template #icon><carry-out-outlined /></template>
      <template #title="item" >
              
        <a-tooltip  placement="right" overlayClassName="bgc_tooltip">
            <template #title >
              <a-menu mode="inline">
                <a-menu-item  key="1" @click="pushSubtree(item)">
                  Add Node
                </a-menu-item>
                <a-menu-item key="2" @click="updTree(item)">
                  Modify node
                </a-menu-item>
                  <a-popconfirm
                  placement="right"
                  title="Are you sure delete this task?"
                  ok-text="Yes"
                  cancel-text="No"
                  @confirm="confirmtree(item)">
                <a-menu-item key="2" @click="deltree(item.key)">
                  Delete Node
                </a-menu-item>
                </a-popconfirm>
              </a-menu>
            </template>
            <template v-if="searchValues &&  item.title.includes(searchValues)">
                <div style="color: #f50;"> 
                  <span>{{item.title}}</span>
                </div>
                </template>
    <template v-else-if="!item.appendFlag&&!item.showEdit">{{item.title}}</template>
    <a-input v-if="item.showEdit" type="text" ref="updDom" v-model:value="updTreedata" @blur="onchangtitle(item)"/>
        </a-tooltip>  
        
    </template>
      </a-tree>
    </template>
 
        <template #right-content>
           <!-- 表单的查询 -->
       <a-row>
        <a-col :span="1">
          <a-checkbox v-model:checked="checked" @change="checkquery"></a-checkbox>
        </a-col>
        <a-col :span="20">
           <AForm  
            layout="inline"
            class="search_form"
            :model="formState"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
            :wrapperCol="wrapperCol">
            <a-col :span="20">
              <a-mentions v-model.trim="formState.search" v-if="checked"
                placeholder="input @ to search tags, input name to search MBT">
                <a-mentions-option value="tags:">
                  tags:              </a-mentions-option>
              </a-mentions>
              <a-input placeholder="input to search" v-else
              v-model:value="formState.search"
              ></a-input>
              </a-col>
                <a-col :span="4">
                <a-button type="primary" html-type="submit">search</a-button>
                </a-col>
            </AForm>
        </a-col>
        <a-col :span="2"><a-button type="primary" @click="showModal" >
        <template #icon><plus-outlined /></template></a-button>
       </a-col>
       </a-row>
          <!-- 模态窗 -->
           <div>
    <a-modal v-model:visible="visible" 
    :title="modelstates._id? 'Update':'Save'"
    @cancel="closemodel"
    @ok="handleOk"
    :width="700"
    >
    <template #footer>
      <a-button @click="closemodel">cancel</a-button>
      <a-button @click="handleOk" type="primary" class="btn_ok">Ok</a-button>
    </template>
        <a-form
        ref="refForm"
      :model="modelstates"
      name="basic"
      :rules="rules"
      :label-col="{ span: 6 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinishForm"
      @finishFailed="onFinishFailedForm"
    >
      <a-form-item
        label="name"
        name="name"
      >
        <a-input v-model:value="modelstates.name" />
      </a-form-item>

      <a-form-item
        label="description"
        name="description"
      >
        <a-input v-model:value="modelstates.description" />
      </a-form-item>

      <a-form-item
        label="template"
        name="template"
      >
        <a-input  v-model:value="modelstates.template" />
      </a-form-item>
      <a-form-item
        label="template_en"
        name="template_en"
      >
        <a-input v-model:value="modelstates.template_en" />
      </a-form-item>

<!-- tags标签 -->
      <a-form-item
      label="tags"
      name="tags" >
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
          <a-input
            v-if="states.inputVisible"
            ref="inputRef"
            v-model:value="states.inputValue"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
        <a-tag v-else style="background: #fff; border-style: dashed" 
        @click="showInput">
          <plus-outlined />
          New Tag
        </a-tag>
      </a-form-item>

      <a-form-item 
      label="params"
      name="params"
      >
      <template v-for="item in modelstates.params" :key="item.name">
        <a-tag color="blue" :closable="true" @close="closepar(item)">name:{{item.name}} type:{{item.type}}</a-tag>
        </template>
      </a-form-item>
      </a-form>
      <a-form layout="inline" :model="obj" class="formPar">
          <a-form-item name="name">
            <a-input v-model:value="obj.name" placeholder="Parameter name"/>
          </a-form-item>
          <a-form-item label="type" name="type">
               <a-select
                ref="select"
                v-model:value="partype"
                style="width: 120px"
                @change="handleChange"
                :options="optiones"
                placeholder="Parameter Type"
              >
                <!-- <a-select-option v-for="item in partype" :key="item" :value="item">{{item}}</a-select-option> -->
              </a-select>
          </a-form-item>
          <a-form-item>
            <a-button @click="addparams" type="primary">+</a-button>
          </a-form-item>
        </a-form>
    </a-modal>
  </div>
          <!-- 表格的结构 -->

    <a-table bordered
    row-key="record=>record._id" 
      :columns="columns" 
      :data-source="tableData" 
      class="components-table-demo-nested"
      :pagination="pagination"
      @expand="expend">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'Name'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
    </template>

    <template #bodyCell="{ column,text, record }">
      <template v-if="column.key === 'Name'">
          <div v-if="record._highlight">
              <div v-if="record._highlight.name">
                <p v-for="item in record._highlight.name" v-html="item"></p>
              </div>
              <div v-else>{{record.name}}</div>
            </div>
            <div v-else>{{record.name}}</div>
      </template>
      <template v-if="column.key === 'description'">
            <div v-if="record._highlight">
              <div v-if="record._highlight.description">
                <p v-for="item in record._highlight.description" v-html="item"></p>
              </div>
              <div v-else>{{record.description}}</div>
            </div>
            <div v-else>{{record.description}}</div>
      </template>
      <template v-if="column.key === 'template'">
          <div v-if="record._highlight">
              <div v-if="record._highlight.template">
                <p v-for="item in record._highlight.template" v-html="item"></p>
              </div>
              <div v-else>{{record.template}}</div>
            </div>
            <div v-else>{{record.template}}</div>
      </template>
          <template v-if="column.key === 'tags'">
              <span>
                <a-tag
                  v-for="tag in record.tags"
                  :key="tag"
                  :color="tag === 'test' ? 'volcano' : 'red'"
                >
                  {{ tag.toUpperCase() }}
                </a-tag>
              </span>
          </template>
          <template v-if="column.key === 'params'">
              <span  v-for="tags in record.params"
                  :key="tags">
                <a-tag
                    >
                  {{ tags.name }}
                </a-tag>
              </span>
          </template>
          
          <template v-else-if="column.key === 'action'">
              <span >
                  <a @click="edit(record)">Edit</a>
                    <a-divider type="vertical" />
                        <a-popconfirm
                          title="Are you sure delete this task?"
                          ok-text="Yes"
                          cancel-text="No"
                          @confirm="confirm(record)"
                          @cancel="cancel"
                        >
                      <a >Delete</a>
                    </a-popconfirm>
              </span>
          </template>
    </template>
      </a-table>
        </template>
      </SplitPanel>
    </div>
   <!-- </section> -->
   </main>
</template>

<style scoped lang="postcss">
  .main {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .ant-table-wrapper{
    margin-top: 1.875rem;
  }
  .right-content{
  padding: 1.25rem 0;
  }
  .ant-form-item{
    margin-bottom: 1.25rem;
  }
  .btn_ok{
    width:4.375rem
  }
  .formPar{
    display: flex;
    justify-content: center;
  margin-top: -1.25rem;
      margin-left: 6.25rem;
  }
  .searchForm{
    margin-right: 0.75rem;
  }
 
   </style>
  <style lang="less">
      .rightMenu{
        width: 5.8rem!important;
        height: 2.15rem!important;
        border: .0625rem solid antiquewhite;
        border-right:.0625rem solid antiquewhite !important;
        // background-color: antiquewhite !important;
        font-size: .75rem;
        box-shadow: -4px 4px 4px -5px rgba(0, 0, 0, 0.35), 2px 3px 4px -5px rgba(0, 0, 0, 0.35);
        .ant-menu-item{
          width: 96%;
          text-align: center !important;;
          padding:0 0!important;
          height:1.575rem;
          background-color: #fff;
        }
      }
    .found-kw{
    color: red!important;
    font-weight: 600;
  }
.bgc_tooltip{
  .ant-tooltip-arrow::before {
      // 这里是小三角形
      background-color: #fff!important;
    }
  .ant-tooltip-inner{
    
    background-color: white!important;
    width: 6.125rem;
    padding: 0;
    display: flex;
    align-items: center;
    .ant-menu{
      font-size: .75rem;
      width: 6.125rem;
      .ant-menu-item-only-child{
        padding: 0!important;
        width: 100%;
        height: 1.75rem;
        line-height: 1.75rem;
        text-align: center;
        margin:0;
        // display: flex;
        // justify-content: center!important;
      }
    }
    .ant-menu-horizontal{
      border: 0;
      .ant-menu-item{
        padding: 0 .3125rem;
      }
      
      
    }
    .ant-menu-overflow{
        display: flex;
        justify-content: space-around;
      }
    }
  }
  .topTree{
    display: flex;
    margin-bottom: .625rem;
    .ant-btn{
      width: 2.5rem;
      font-size: .55rem;
      padding: 0px 0.25rem;
    }
  }
  </style>
