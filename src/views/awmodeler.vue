<script lang="ts">
export default { name: 'AWModeler'}
</script>
<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, reactive, defineComponent, UnwrapRef, onMounted, nextTick, watch, getCurrentInstance, computed, unref } from 'vue';
import { CascaderProps, FormProps, SelectProps, Table, TableProps, TreeProps, } from 'ant-design-vue';
import {   CheckCircleTwoTone,PlusOutlined,ExclamationCircleTwoTone} from '@ant-design/icons-vue'
import { SplitPanel } from '@/components/basic/split-panel';
import { message } from 'ant-design-vue/es'
import request from '@/utils/request';
import http from '@/utils/http'
import { Rule } from 'ant-design-vue/es/form';
import { tableSearch, paramsobj, ModelState, statesTs ,clickobj} from "./componentTS/awmodeler";
import _ from 'lodash';
import {uuid} from '@/utils/Uuid'
import { any } from 'vue-types';
import { nodeListProps } from 'ant-design-vue/lib/vc-tree/props';
import { Key } from 'ant-design-vue/es/_util/type';
import awModeler from "@/locales/lang/zh-CN/routes/awModeler";
import { CommonTable } from '@/components/basic/common-table'
import { SearchBar } from '@/components/basic/search-bar'
import router from '@/router';

const { t } = useI18n()

// aw modeler table data
let awModelTable = ref<any>(null)
const AWColumn = [
  { title: "name", width: 40, link: 'custom', require: true },
  { title: "description", width: 120, require: true },
  { title: "tags", width: 100 },
  {
    title: "action",
    width: 100,
    cbName: ['edit', 'go2Page'],
    actionList: ['edit', 'delete', 'clone']
  },
]

const AWTableQuery = {
  selection: {
    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE]
  },
}

const go2Detail = (row: any) => {
  const url = `/awupdate/${row._id}/${row.name}/awmodeler`
  if (row.clickTar === 'name') router.push(`${url}?canEdit=true`)
  else router.push(url)
}

const pageChange = (data: any) => {
  searchobj.page = data.current
  searchobj.perPage = data.pageSize
  query()
}

let searchobj: tableSearch = reactive({
  search: "",
  page: 1,
  perPage:10,
  q:"",
  total: 0
})

// paramas table
let awParamsTable = ref<any>(null)
const AWParamsColumn = [
  { title: "name", width: 280, link: 'custom' },
  { title: "description", width: 100 },
  { title: "type", width: 60, option: '1' },
  { title: "enum", width: 100 },
  { title: "default", width: 100 },
  {
    title: "action",
    width: 140,
    actionList: ['edit', 'delete', 'check', 'up', 'down']
  },
]


let treeRequireTime = 0

async function query() {
  awModelTable.value.loading = true
  const params: any = searchobj
  const rst = await http.get("/api/hlfs", { params })
  /**
   * 该请求有请求覆盖bug
   * 通过响应头 date 字段对比上个请求的发起时间
   * 保证数据的更新总是最后一个发起请求的数据
   * */
  let timeTemp = new Date(rst.headers.date).getTime()
  if (timeTemp < treeRequireTime) return
  treeRequireTime = timeTemp
  let res = rst.data
  if (res.data) {
    searchobj.total = res.total
    awModelTable.value.setTableData({
      tableData: res.data,
      total: res.total,
      currentPage: searchobj.page,
      pageSize: searchobj.perPage
    })
  }
  awModelTable.value.loading = false
  return rst
}
let treeData:any = ref([])
// 获取后台的树形数据
const queryTree=async ()=>{
  let rst=await request.get('/api/hlfs/_tree')
//声明一个空数组，将后台的对象push
  let treedatas=objToArr(rst)
  let treedatasss=addKey(treedatas)
  treeData.value=treedatasss

}
// 若树节点无数据增加点击事件
// 获取左侧区域的dom
const leftRef=ref()
const tabledom=ref()

onMounted(() => {
  query()
  queryTree()
})

const instance=getCurrentInstance()

// 模态窗数据
const visible = ref<boolean>(false);
const showModal = () => {
  visible.value = true;
};

let disable=ref(true)

// 关闭模态窗触发事件
const closemodel = () => {
  clear()
  visible.value = false;
}

// 添加功能的函数
let deleteId=""
async function saveAw(data: any) {
  awModelTable.value.loading = true
  data.params = awParamsTable.value.getTableData()
  if (data.params.some((a: any) => a.editing)) {
    message.warning(t('component.message.tableEditingWarn'))
    awModelTable.value.loading = false
    return
  }
  if(clickKey){
    data={...data,path:clickKey.path}
  }
  let rst=await request.post("/api/hlfs", data)
    if(rst._id){
    deleteId=rst._id
    let tableData = awModelTable.value.getTableData()
    tableData.unshift(rst)
    awModelTable.value.setTableData({
      tableData,
      total: ++searchobj.total
    })
    visible.value = false;
    awModelTable.value.loading = false
    closemodel()
    message.success(t('component.message.addText'))
  }
}
let returnInput = ref('')
let returnVisibal = ref(false)
let returnRef = ref()
let modelstates = ref<ModelState>({
  key:0,
  name: '',
  description: '',
  template: "",
  returnType: [],
  template_en:"",
  _id: "",
  params:[],
  tags:[]
});

// 清除模态窗数据
const clear = () => {
  modelstates.value = {
    name: "",
    description: '',
    template: "",
    _id: "",
    returnType: [],
    template_en: "",
    params: [],
    tags: []
  }
  states.tags = [];

  (instance?.refs.refForm as any).resetFields()

}

// 新添加一条params数据
const addNewParams = () => {
  awParamsTable.value.createNewRow({
    required:false,
    name: '',
    description: '',
    type: '',
    enum: [],
    editing: true,
    inputVisible: true,
    inputValue: '',
  })
}

// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  let reg=/^[a-zA-Z0-9\$][a-zA-Z0-9\d_]*$/
  if (!value) {
    return Promise.reject(t('component.message.emptyName'))
  }else if(!reg.test(value)){
    return Promise.reject(t('component.message.hefaName'))
  }else{
    let rst=await request.get("/api/hlfs",{params:{q:`name:${value}`,search:''}})
    if(rst.data && rst.data.length>0 && rst.data[0].name==value){
      // message.error("Duplicate name")
      // modelstates.value.name=""
      return Promise.reject(t('component.message.depName'))
    }else{
      return Promise.resolve();

    }
  }
}
let checkDesc = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject(t('component.message.emptyDescription'))
  }else  {
    let rst=await request.get("/api/hlfs",{params:{search:value}})
    if(rst.data && rst.data.length>0 && rst.data[0].description==value){
      return Promise.reject(t('component.message.dupDescription'))
    }else{
      return Promise.resolve();
    }
  }

}
let checktem = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject(t('awModeler.emptyTemp'))
  }
  disable.value=false
}
let rules: Record<string, Rule[]> = {
  name: [{ required: true, validator: checkName, trigger: 'blur' }],
  description: [{ required: true, validator: checkDesc, trigger: 'blur' }],
  template: [{ required: true, validator: checktem, trigger: 'blur' }],
}
let refForm=ref()
const handleOk = (data: any) => {
  refForm.value.validate().then(async()=>{
    delete data._id
    await saveAw(data)
  })
// onFinishForm(modelstates)
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

const handleReturnClose = (removedTag: string) => {
  const tags = modelstates.value.returnType.filter((tag: string) => tag !== removedTag);
  modelstates.value.returnType = tags;
};

const showInput = () => {
  states.inputVisible = true;
  nextTick(() => {
    inputRef.value.focus();
  })
};
const showreturnInput = () => {
  returnVisibal.value = true;
  nextTick(() => {
    returnRef.value.focus();
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
  modelstates.value.tags = [...states.tags]
}

const handleReturnConfirm = () => {
  let tags = modelstates.value.returnType;
  if (returnInput.value && tags.indexOf(returnInput.value) === -1) {
    modelstates.value.returnType = [...tags, returnInput.value.toUpperCase()];
  }

  returnInput.value = '',
  returnVisibal.value = false
}

// 删除功能
const confirm =async (obj:any) => {
  awModelTable.value.loading = true
  if(obj._id){
    delete obj.key
    let rst = await request.delete(`/api/hlfs/${obj._id}`)
  } else {
    await request.delete(`/api/hlfs/${deleteId}`)
  }
  let tableData = awModelTable.value.getTableData()
  tableData = tableData.filter((a: any) => a !== obj)
  awModelTable.value.setTableData({
    tableData,
    total: --searchobj.total
  })
  awModelTable.value.loading = false
  message.success(t('component.message.delText'));
};
// 修改函数
async function updateAw(url:string,data:any) {
  let rst = await request.put(url, data)
}
// 修改的函数
const edit = (rowobj:any) => {
  showModal()
  modelstates.value.key=rowobj.key
  modelstates.value.name=rowobj.name
  modelstates.value.description=rowobj.description
  modelstates.value.template=rowobj.template
  modelstates.value.template_en=rowobj.template_en
  modelstates.value._id = rowobj._id
  states.tags = rowobj.tags
  modelstates.value.params = [...rowobj.params]
  modelstates.value.params=modelstates.value.params.map((item:any, index:number)=>{return {...item ,editing:false, inputVisible: false, inputValue: ''}})
}
const wrapperCol={span:24,offset:12}

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
        key:uuid(),
        children: objToArr(obj[i as keyof typeof objToArr])
      };
      if(i==""){
        i="/"
        oo={
          title: i,
          key:uuid(),
          children: objToArr(obj["" as keyof typeof objToArr])
        }
      }
      arr.push(oo);
    }
  }
  return arr;
}
// 给树形数据添加属性
const addKey:any = (arr: any[]) => (arr??[]).map(item => ({
  ...item,
  showEdit:false,
  children: addKey(item.children)
}))

// 定义一个返回路径的函数
function getPath(key:any,treearr:any){
  let rst:any
  let res=getPathByKey(key,'title',treearr)
  rst=res?.map((obj:any)=>{
    return obj.title
  }).join('/')
  return rst
}

// 当点击时给其赋值，用其值判断调用查询的函数
let clickKey=<clickobj>{}

// 根据点击的树节点筛选表格的数据
const onSelect: TreeProps['onSelect'] =async ( selectedKeys: any,info?:any) => {
  searchobj.page = 1
  if(info.node.dataRef.title=='/'){
    await query()
  }else{
    let str=getPath(info.node.dataRef.title,treeData.value)
    str=str.substring(1,str.length)
    clickKey.path=str
    clickKey.dataRef=info.node.dataRef
    searchobj.q = `path:${str}`
    searchobj.search = ''
    if(info.node.dataRef.children.length==0){
      // 这里走精准匹配
      await query()
    }else{
      // 这里走前置匹配
      await query()
    }
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
    //  debugger
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
  debugger
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
  }else{
    //折叠起来
    autoExpandParent.value =  false;
  }
})

const onExpand = (keys: any) => {
  expandedKeys.value = keys ;
  autoExpandParent.value = false;
};


// 失去焦点，真正修改树节点的地方
const onchangtitle =async (data: any) => {
  let nowNode=getTreeDataByItem(treeData.value,data)
  let parentchild=getTreeParentChilds(treeData.value,data)
  if(updTreedata.value){
    let searchobj=parentchild.filter((e:any)=>e.title==updTreedata.value)
    if(searchobj.length>0 && updTreedata.value!==nowNode.title){
      message.warning(`${t('awModeler.tip1')} ${updTreedata.value}`)
      return
    }else{

      let str=getPath(nowNode.title,treeData.value)
      str=str.substring(1,str.length)
      // 将新输入的值拼接到newPath
      let newStrIndex=str.lastIndexOf('/')
      let newStr=str.substring(0,newStrIndex+1)
      let pathnew=newStr+updTreedata.value
      await request.post("/api/hlfs/_rename?force=true",{path:str,newPath:pathnew})
      nowNode.title=updTreedata.value
    }
  }
  updTreedata.value=""
  nowNode.showEdit=false
  expandedKeys.value=[nowNode.key]
  autoExpandParent.value = true;
}
// 定义修改节点的变量
let updTreedata=ref('')
// 获取修改节点的dom
let updDom=ref()
// 修改子节点的方法
const updTree = (key: any) => {
  let updChild=getTreeDataByItem(treeData.value,key)
  // 判断展开修改的节点是否恢复
  if(updTreedata.value){
    updChild.showEdit=false
    message.warning(t('awModeler.tip2'))
  }else{
    updTreedata.value=updChild.title
    updChild.showEdit=true
    nextTick(()=>{
      updDom.value.focus()
    })
  }
}

// 点击添加下级节点的方法，获取当前的key（添加下级节点时，都加children，）
const pushSubtree =async (key: any,title:any) => {
  // 获取当前添加节点的对象
  let nowNode=getTreeDataByItem(treeData.value,key)
  getloop(treeData.value,key,nowNode.children.length)
  treeData.value = [...treeData.value]
  let res=getPathByKey(nowNode.title,"title",treeData.value);
  let str:any=res?.map((item:any)=>{
    return item.title
  }).join("/")
  str = str.substring(1, str.length)
  let pushPath
    pushPath=nowNode.children.length?str+'/'+`childNode${nowNode.children.length}`:str+'/'+'childNode0'
  await request.post("/api/hlfs?isFolder=true&focre=true",{path:pushPath})
  expandedKeys.value = [key];
  autoExpandParent.value=true
}
// 找到需要展开节点的key
const queryKey=(arr:any,key:string)=>{
  let expandKey
  for(let i=0;i<arr.length;i++){
    if(arr[i].key==key){
      arr[i].children.forEach((item:any)=>{
        if(item.title=="childNode"){
          expandKey=item.key
        }})
    }else if(arr[i].children && arr[i].children.length>0){
      queryKey(arr[i].children,key)
    }
  }
  return expandKey
}
//找到需要添加的节点并添加下级
const getloop=(arr:Array<any>, key:string,lenghts:any)=> {
  //首先循环arr最外层数据
  for (let s = 0; s < arr.length; s++) {
    //如果匹配到了arr最外层中的我需要修改的数据
    if (arr[s].key == key) {
      let obj = {
        title: lenghts?`childNode${lenghts}`:'childNode0',
        key: length?`childNode${lenghts}`:'childNode0',
        children:[],
        showEdit: false,
        isLeaf:true,
      };
      if (arr[s].children == undefined) {
        arr[s].children = [];
        arr[s].children.push(obj);
      } else {
        arr[s].children.push(obj);
      }
      break;
    } else if (arr[s].children && arr[s].children.length > 0) {
      // 递归条件
      getloop(arr[s].children, key,length);
    }
  }
}
const pushSib=async(arr:Array<any>, key:string,length:any)=> {
  //首先循环arr最外层数据
  for (let s = 0; s < arr.length; s++) {
    //如果匹配到了arr最外层中的我需要修改的数据
    if (arr[s].key == key) {
      let obj = {
        title: `NewNode${length}`,
        key: `NewNode${length}`,
        children:[],
        showEdit: false,
        isLeaf:false,
      };
      if (arr[s].children == undefined) {
        arr[s].children = [];
        arr.push(obj);

      } else {
        arr.push(obj);
      }
      break;
    } else if (arr[s].children && arr[s].children.length > 0) {
      // 递归条件
      pushSib(arr[s].children, key,length);
    }
  }
}
// 判断当前节点的上一级是否有值，若无知（path=‘NewNode’） 有值酒吧当前点击的替换
// 添加顶级节点
const addSib=async(key:any)=>{
  // 根据当前传来的key，获取父节点的对象children
  let nowNode = getTreeDataByItem(treeData.value, key)
  let parentNode=getTreeParentChilds(treeData.value,key)
  let str = getPath(nowNode.title, treeData.value)
  str = str.substring(1, str.length)
  if(str.indexOf('/')>=0){
    let newStrIndex=str.lastIndexOf('/')
    let newStr=str.substring(0,newStrIndex+1)
    let pathnew =parentNode.lenght? newStr + `NewNode${parentNode.length}`:newStr+`NewNode0`
    await request.post("/api/hlfs?isFolder=true",{path:pathnew})
  }else{
    await request.post("/api/hlfs?isFolder=true",{path:parentNode.lenght?`/NewNode${parentNode.lenght}`:'/NewNode0'})
  }
  pushSib(treeData.value,key,parentNode.length)
  expandedKeys.value = [nowNode.key];
  autoExpandParent.value=true
}

// 删除树形控件数据
const deltree = (key:string) => {}
const confirmtree =async (key:any,title:string) => {
  let nowNode=getTreeDataByItem(treeData.value,key)

  let str=getPath(nowNode.title,treeData.value)
  str=str.substring(1,str.length)
  let delNode=getTreeParentChilds(treeData.value,key);
  for (var i = delNode.length - 1; i >= 0; i--) {
    if (delNode[i].title==nowNode.title) {
      delNode.splice(i, 1);
    }
  }
  expandedKeys.value = [nowNode.key];
  autoExpandParent.value=true
  await request.post("/api/hlfs/_deleteFolder?force=true",{path:str})

  // queryTree()
}
// 右键展开菜单项
const onContextMenuClick = (treeKey: string) => { };

// 获取拖拽的对象
// 右键添加Aw的path
const addAwmodel= (key:any,title:string)=>{
  let str = getPath(title,treeData.value)
  str = str.substring(1,str.length)
  const selectList = awModelTable.value.selectionList
  if (selectList.length > 0) {
    let pool: any[] = []
    selectList.forEach((item: any) => {
      item.path = str
      pool.push(updateAw(`/api/hlfs/${item._id}`, item))
    })
    awModelTable.value.loading = true
    Promise.all(pool)
      .then((res:any)=>{
        let tableData = awModelTable.value.getTableData()
        tableData = tableData.filter((a: any) => !selectList.includes(a))
        awModelTable.value.setTableData(tableData)
        if(res){message.success("Modification succeeded")}
      })
      .catch(()=>{message.error("Modification failed")})
      .finally(() => awModelTable.value.loading = false)
    } else {
     message.warning(t('awModeler.selectAwTip'))
  }
}

let refCopy=ref()
let copyRule:Record<string,Rule[]>={
  name:[{required:true,validator:checkName,trigger:'blur'}],
  description: [{ required: true, validator: checkDesc, trigger: 'blur' }],
}
let copyData:any = ref ({
  name: "",
  description:""
})
let copyVisible = ref<boolean>(false)
const copyName = (record:any) => {
    copyData.value.name = `${record.name}_clone`
    copyData.value.description = `${record.description}_clone`


    copyData.value = {...record,name:copyData.value.name,description:copyData.value.description}
    copyVisible.value = true
}
const copyOk=()=>{
  unref(refCopy).validate().then(async ()=>{
    awModelTable.value.loading=true
    delete copyData.value._id
   request.post('/api/hlfs',copyData.value).then((rst :any)=>{
     let tableList = awModelTable.value.getTableData()
     tableList = tableList.unshift(rst)
     awModelTable.value.setTableData(tableList.pop())
     copyVisible.value = false
     awModelTable.value.loading=false
   }).catch(() => {
    message.error(t('commont.cloneError'))
    copyVisible.value = false
     awModelTable.value.loading=false
   })

  })
}
const clearValida = () => {
  copyVisible.value = false
  unref(refCopy).clearValidate()
}

function handleSearch (keyword: string) {
  searchobj.search = keyword
  searchobj.page = 1
  if (clickKey.path) {
    searchobj.q = `path:${clickKey.path}`
  }
  query()
}

</script>
<template>
  <main class="main">
    <div ref="leftRef" style="height:100%" class="id">
      <SplitPanel>
        <template #left-content>
          <a-input-search v-model:value="searchValues" style="margin-bottom: 8px" :placeholder="$t('common.searchText')" />
          <a-tree
              v-if="treeData?.length"
              :show-line="true"
              :tree-data="treeData"
              :expanded-keys="expandedKeys"
              @select="onSelect"
              :auto-expand-parent="autoExpandParent"
              @expand="onExpand">
            <template #title="{key:treeKey,title,showEdit}">
              <template v-if="title=='/'">
              <a-dropdown :trigger="['contextmenu']">
                <template v-if="searchValues &&  title.includes(searchValues)">
                  <div style="color: #f50;">
                    <span>{{title}}</span>
                  </div>
                </template>
                <span v-else-if="!showEdit">{{ title }}</span>
                <a-input v-else="showEdit"
                    type="text"
                    ref="updDom"
                    v-model:value="updTreedata"
                    @blur="onchangtitle(treeKey)"
                    @keyup.enter="onchangtitle(treeKey)"
                />
                <template #overlay>
                  <a-menu @click="() => onContextMenuClick(treeKey)">
                      <a-menu-item key="2" @click="pushSubtree(treeKey,title)">Add Child Node</a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>

              </template>
              <a-dropdown :trigger="['contextmenu']" v-else>
                <template v-if="searchValues &&  title.includes(searchValues)">
                  <div style="color: #f50;">
                    <span>{{title}}</span>
                  </div>
                </template>
                <span v-else-if="!showEdit">{{ title }}</span>
                <a-input v-else="showEdit"
                         type="text"
                         ref="updDom"
                         v-model:value="updTreedata"
                         @blur="onchangtitle(treeKey)"
                         @keyup.enter="onchangtitle(treeKey)"
                />
                <template #overlay>
                  <a-menu @click="() => onContextMenuClick(treeKey)">
                    <a-menu-item key="1" @click="addSib(treeKey)">{{ $t('awModeler.addSNode') }}</a-menu-item>
                    <a-menu-item key="2" @click="pushSubtree(treeKey,title)">{{ $t('awModeler.addCNode') }}</a-menu-item>
                    <a-menu-item key="4" @click="addAwmodel(treeKey,title)">{{ $t('awModeler.moveSelected') }}</a-menu-item>
                    <a-menu-item key="3" @click="updTree(treeKey)">{{ $t('awModeler.modifyNode') }}</a-menu-item>
                    <a-popconfirm
                        placement="right"
                        :title="$t('component.message.sureDel')"
                        :ok-text="$t('common.yesText')"
                        :cancel-text="$t('common.noText')"
                        @confirm="confirmtree(treeKey,title)">
                      <a-menu-item key="4" @click="deltree(title)">{{ $t('awModeler.delNode') }}</a-menu-item>
                    </a-popconfirm>
                  </a-menu>
                </template>
              </a-dropdown>




              <!-- </template> -->

              <!-- </a-tooltip>   -->
            </template>
          </a-tree>
        </template>
        <template #right-content>
          <!-- 表单的查询 -->
          <a-row>
            <a-col :span="20">
              <search-bar
                  url="/api/hlfs/_tags"
                  @search="handleSearch"
              ></search-bar>
            </a-col>
            <a-col :span="2">
              <a-button type="primary" @click="showModal" >
                <template #icon><plus-outlined /></template>
              </a-button>
            </a-col>
          </a-row>
          <!-- 模态窗 -->
          <div>
            <a-modal v-model:visible="visible"
                     :title="modelstates._id? $t('common.updateText') : $t('common.saveText')"
                     :width="1300"
            >
              <template #footer>
                <a-button @click="closemodel">{{ $t('common.cancelText') }}</a-button>
                <a-button @click="handleOk(modelstates)"  type="primary" class="btn_ok">{{ $t('common.okText') }}</a-button>
              </template>
              <a-form
                  ref="refForm"
                  :model="modelstates"
                  name="basic"
                  :rules="rules"
                  :label-col="{ span: 6 }"
                  :wrapper-col="{ span: 16 }"
                  autocomplete="off"
              >
                <a-form-item
                    :label="$t('component.table.name')"
                    name="name"
                >
                  <!-- <template #suffix v-if="modelstates.name"><edit-outlined /></template> -->

                  <a-input v-model:value="modelstates.name"/>
                  <!-- <span v-else>{{modelstates.name}}</span> -->
                </a-form-item>

                <a-form-item
                    :label="$t('component.table.description')"
                    name="description"
                >
                  <a-input v-model:value="modelstates.description" />
                </a-form-item>

                <a-form-item
                    :label="$t('component.table.template')"
                    name="template"
                >
                  <a-input  v-model:value="modelstates.template" />
                </a-form-item>
                <a-form-item
                    :label="$t('component.table.template_en')"
                    name="template_en"
                >
                  <a-input v-model:value="modelstates.template_en" />
                </a-form-item>

                <!-- tags标签 -->
                <a-form-item
                    :label="$t('component.table.tags')"
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
                    {{ $t('common.newTag') }}
                  </a-tag>
                </a-form-item>
                <a-form-item :label="$t('component.table.returnType')" name="returnType">
                  <template v-for="tag in modelstates.returnType" :key="tag">
                    <a-tooltip v-if="tag.length > 20" :title="tag">
                      <a-tag :closable="true" @close="handleReturnClose(tag)">
                        {{ `${tag.slice(0, 20)}...` }}
                      </a-tag>
                    </a-tooltip>
                    <a-tag v-else-if="tag.length==0"></a-tag>
                    <a-tag v-else :closable="true" @close="handleReturnClose(tag)">
                      {{tag}}
                    </a-tag>
                  </template>
                  <a-input
                      v-if="returnVisibal"
                      ref="returnRef"
                      v-model:value="returnInput"
                      type="text"
                      size="small"
                      :style="{ width: '78px' }"
                      @blur="handleReturnConfirm"
                      @keyup.enter="handleReturnConfirm"
                  />
                  <a-tag v-else style="background: #fff; border-style: dashed"
                         @click="showreturnInput">
                    <plus-outlined />
                    {{ $t('common.newTag') }}
                  </a-tag>
                </a-form-item>
                <a-form-item
                    :label="$t('component.table.params')"
                    name="params"  >
                  <a-button @click="addNewParams">{{$t('awModeler.addParams')}}</a-button>
                </a-form-item>
              </a-form>
              <common-table
                ref="awParamsTable"
                :columns="AWParamsColumn"
                tableRef="awParamsTable"
              ></common-table>
            </a-modal>
          </div>
          <!-- 表格的结构 -->
          <div ref="tabledom">
            <common-table
              ref="awModelTable"
              :columns="AWColumn"
              tableRef="awModelTable"
              :fetchObj="AWTableQuery"
              @go2Page="go2Detail"
              @edit="go2Detail"
              @delete="confirm"
              @pageChange="pageChange"
              @clone="copyName"
            ></common-table>
            <a-modal v-model:visible="copyVisible" :title="$t('component.table.clone')" @ok="copyOk" :ok-text="$t('common.okText')" :cancel-text="$t('common.cancelText')" @cancel="clearValida">
              <AForm :model="copyData" ref="refCopy" :rules="copyRule">
                <a-form-item name="name" :label="$t('component.table.name')">
                  <a-input v-model:value="copyData.name"></a-input>
                </a-form-item>
                <a-form-item name="description" :label="$t('component.table.description')">
                  <a-input v-model:value="copyData.description"></a-input>
                </a-form-item>
              </AForm>
            </a-modal>

          </div>
        </template>
      </SplitPanel>

      <!-- </section> -->
    </div>
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

}
.searchForm{
  margin-right: 0.75rem;
}

</style>
<style lang="less">
.validationError{
  background-color: bisque;
}
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
.iconsave{
  margin-left: 1rem;
  width:3.125rem!important;
  font-size: 1.25rem!important;
}
.ant-dropdown-trigger{
  min-width: 30px;
    display: block;
}
// .exampleEnum{
//   // width:400px
// }
</style>
