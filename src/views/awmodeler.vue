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
import { tableSearch, FormState, paramsobj, ModelState, statesTs ,clickobj} from "./componentTS/awmodeler";
// import VueContextMenu from 'vue-contextmenu'
import _ from 'lodash';
import {uuid} from '@/utils/Uuid'
import { any } from 'vue-types';
import { nodeListProps } from 'ant-design-vue/lib/vc-tree/props';
import { Key } from 'ant-design-vue/es/_util/type';
import awModeler from "@/locales/lang/zh-CN/routes/awModeler";

const { t } = useI18n()
let tableLoading = ref(false)

let tableData:any= ref([])
let searchobj: tableSearch = reactive({
  search: "",
  page: 1,
  perPage:10,
  q:""
})

// 防止树形数据请求覆盖
let treeSelectTitle = '/'

async function query(data?: any) {
  tableLoading.value = true
  const rst = await http.get("/api/hlfs", { params: data || searchobj })
  // let path = (rst.config.params?.q || '').slice(6) || '/'
  // if (path !== treeSelectTitle) return
  let res = rst.data
  if (res.data) {
    pagination.value.total = res.total
    pagination.value.pageNo = 1
    tableData.value = res.data.map((e:any,index:number)=>({...e,key:index}))
  }
  tableLoading.value = false
  return rst
}
let treeData:any = ref([])
// 获取后台的树形数据
const queryTree=async ()=>{
  let rst=await request.get('/api/hlfs/_tree')
console.log(rst);


  //声明一个空数组，将后台的对象push
  let topTreedata=[{title:'/',key:0,children:<any>[],isLeaf:false}]
  let treedatas=objToArr(rst)
  console.log(treedatas);
  
  let treedatasss=addKey(treedatas)
  // topTreedata[0].children=[...treedatasss];
  // topTreedata[0].children=JSON.parse(JSON.stringify(addKey(delNode(treedatas))));
  // treeData.value=[...topTreedata]
  treeData.value=treedatasss
  // rightClick()
  
}
// 若树节点无数据增加点击事件
// 获取左侧区域的dom
const leftRef=ref()
const rightNode=ref(false)
const tabledom=ref()

onMounted(() => {

  // let tbody=tabledom.value.childNodes[0].childNodes[0].childNodes[1].childNodes[1].childNodes[1].childNodes[0].childNodes[0].childNodes[2]
   query()
   queryTree()
}) 
// 切换查询方式
let checked=ref(false)
const checkquery=()=>{
  checked.value!=checked.value  
}
const instance=getCurrentInstance()
// 表单的数据
const formState: UnwrapRef<FormState> = reactive({
      search:''
});
// 表单提交成功时的回调
const handleFinish: FormProps['onFinish'] = async (values: any) => {
  await query(formState)
 pagination.value.pageNo=1
};
// 表单提交失败时的回调
const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => {};
// 模态窗数据
const visible = ref<boolean>(false);
const showModal = () => {
  visible.value = true;      
};

let searchInput = ref()
let cascder = ref(false)
let selectvalue = ref("")
let selectoptions:any = ref([
   {
    value: 'tags:',
    label: 'tags:',
    isLeaf: false,
  },
  {
    value: 'name:',
    label: 'name:',
    
  },
])
const loadData: CascaderProps['loadData'] = async (selectedOptions:any  ) => {
    console.log(selectedOptions);
      let rst = await request.get("/api/hlfs/_tags", { params: { q: "category:meta" } })
      const targetOption = selectedOptions[0];
      targetOption.loading = true
        if (rst.length > 0) {
          rst = rst.map((item: any) => ({ value: item, label: item }))
          targetOption.children = rst
        }
        targetOption.loading = false;
        selectoptions.value = [...selectoptions.value];
    };
const onSelectAwChange = async (value: any) => {
  if (value) {
    let reg = new RegExp("," ,"g")
    formState.search += value.toString().replace(reg,'')
  }  
  selectvalue.value = ''
  cascder.value = false
  nextTick(() => {
    searchInput.value.focus()
  })
}
const inputChange = (value: any) => {
  if (formState.search == "@") {
    cascder.value = true
  }
}



// const queryData = (e: any) => {
//   setTimeout(() => {
//     handleFinish(e)
//   },2500)
// }

let disable=ref(true)

// 关闭模态窗触发事件
const closemodel = () => {
  clear()
  visible.value = false;
}

// 模态窗表单
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
let obj = ref<paramsobj>({
  required:false,
  name: "",
  description: "",
  type: "",
  returnType: [],
  enum: [],
  inputVisible: false,
  inputValue: '',
  editing: false,
  returnTypeinput: "",
  returnTypevisible : false
})
// 添加功能的函数
let deleteId=""
async function saveAw(data: any) {
  tableLoading.value = true
  visible.value = false;
  if(clickKey){
    data={...data,path:clickKey.path}
  }
    let rst=await request.post("/api/hlfs", data)
    if(rst._id){
      deleteId=rst._id
      tableData.value.unshift(rst)
      message.success(t('component.message.addText'))
    }
    tableLoading.value = false
    }
let modelstates = ref<ModelState>({
  key:0,
  name: '',
  description: '',
  template: "",
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
    template_en: "",
    params: [],
    tags: []
  },
    obj.value = {
    required:false,
  name: "",
  description: "",
  type: "",
  returnType: [],
  enum: [],
  inputVisible: false,
  inputValue: '',
    editing: false,
    returnTypeinput: '',
  returnTypevisible : false
  }
    states.tags = []; 
    
    (instance?.refs.refForm as any).resetFields()

}
// 清空赋值params单行的数据
const clearFactorState = () => {
  obj.value.name = ''
  obj.value.description = ''
  obj.value.required = false,
  obj.value.returnType = [],
  obj.value.type = ''
  obj.value.enum = []
  obj.value.editing = true
  obj.value.inputVisible = false
  obj.value.inputValue = ''
  obj.value.returnTypeinput = ''
  obj.value.returnTypevisible = false


  // (instance?.refs.refFactorForm as any).resetFields();
}
// 点击保存params的函数
const saveparams = async (record: any) => {
  record.editing = false
  clearFactorState()
}
// 点击删除params的函数
const delmodel = (record: any) => {
  const index= modelstates.value.params.findIndex(e => e === record)
  modelstates.value.params.splice(index,1);
  message.success(t('component.message.delText'));
}
// 点击取消修改或添加params的函数
const cancelparams = (record:any) => {
  if (obj.value.name === ''){
    const index= modelstates.value.params.findIndex(e => e === record)
    modelstates.value.params.splice(index,1);
  } else {
    record.description=obj.value.description
    record.required=obj.value.required
    record.returnType=obj.value.returnType
    record.name = obj.value.name
    record.type = obj.value.type
    states.tags=obj.value.enum
    record.editing = false
  }
  clearFactorState()
}
// 点击修改触发的函数
const editparams = (record:any) => {
  obj.value.description=record.description
  obj.value.required=record.required
  obj.value.returnType=record.returnType
  obj.value.name = record.name
  obj.value.type = record.type
  obj.value.enum = record.values
  record.editing = true
}
// 新添加一条params数据
const addNewParams = () => {
  modelstates.value.params.unshift({
    required:false,
    name: '',
    description: '',
    type: '',
    enum: [],
    returnType:[],
    editing: true,
    inputVisible: true,
    inputValue: '',
     returnTypeinput: '',
  returnTypevisible : false
  })  
}
// params的表格结构
const paramsColum = [
 {
   title: 'component.table.required',
    dataIndex: 'required',
    key: 'required',
    width:10
},
{
    title: 'component.table.paramsName',
    dataIndex: 'name',
    key: 'name',
    width:280
  },
   {
    title: 'component.table.description',
    dataIndex:'description',
    key:'description',
    width:100
  },
   {
    title: 'component.table.returnType',
    dataIndex:'returnType',
    key:'returnType',
    width:100
  },
  {
    title: 'component.table.type',
    dataIndex: 'type',
    key: 'type',
    width:60
  },
  {
    title: 'component.table.enum',
    dataIndex: 'enum',
    key: 'enum',
    width:100
  },
  {
    title: 'component.table.action',
    dataIndex: 'action',
    key: 'action',
    width:20
  }
]
// 添加params的enu
const handleCloseTag = (record: any, removedTag: string) => {
  const tags = record.enum.filter((tag: string) => tag !== removedTag);
  record.enum = tags;
};

const handleCloseReturnType = (record: any, removedTag: any) => {
  const tags = record.returnType.filter((tag: any) => tag !== removedTag);
  record.returnType = tags;
};

const handleFactorValueConfirm = (record: any) => {
  let values = record.enum;
  if (record.inputValue && values.indexOf(record.inputValue) === -1) {
    values = [...values, record.inputValue];
  }
  Object.assign(record, {
    enum: values,
    inputVisible: false,
    inputValue: '',
  });
}

const handleReturnType = (record: any) => {
  let values = record.returnType;
  if (values && record.returnTypeinput && values.indexOf(record.returnTypeinput) === -1) {
    
    values = [...values, record.returnTypeinput];
  }
  Object.assign(record, {
    returnType: values,
      returnTypeinput: '',
  returnTypevisible : false
  });
}


let inputRefs = ref()
let returnType = ref()
const newFactorValueInput = (record: any) => {
  record.inputVisible = true;

  nextTick(() => {
    inputRefs.value.focus();
  })
};
const newReturnType = (record: any) => {
  record.returnTypevisible = true;

  nextTick(() => {
    returnType.value.focus();
  })
};

// 当前行含有validation的类名
const isValidation=(record:any):any=>{
  if(record.validationError){
    return 'validationError'
  }else{
    return ''
  }
}
const showValidationError=(record:any):any=>{
  return {
    
    onMouseenter:()=>{
      // rowsDom.forEach((item:any)=>{
        if(record.validationError){
          // item.setAttribute("title",record.validationError)
          // function onClose() {             }
          return message.error(record.validationError,3)
      }
      // })
      
    }
  }
}


// 表单验证
let checkName = async (_rule: Rule, value: string) => {
  let reg=/^[a-zA-Z0-9\$][a-zA-Z0-9\d_]*$/
  let reg1=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/
  if (!value) {
    return Promise.reject(t('component.message.emptyName'))
  }else if(!reg.test(value) && !reg1.test(value)){
      return Promise.reject(t('component.message.hefaName'))
  }else{
    let rst=await request.get("/api/hlfs",{params:{q:`name:${modelstates.value.name}`,search:''}})
      if(rst.data && rst.data.length>0 && rst.data[0].name==modelstates.value.name){
        // message.error("Duplicate name")
        // modelstates.value.name=""
        return Promise.reject(t('component.message.depName'))
      }else{
        return Promise.resolve();

      }
  }
}
let checkDesc = async (_rule: Rule, value: string) => {
  // let reg=/^[a-zA-Z\_$][a-zA-Z\d_]*$/
  if (!value) {
    return Promise.reject(t('component.message.emptyDescription'))
  }else  {
    // if(!reg.test(value)){
    //   return Promise.reject('The AW description is not standardized')
    // }else{
    //   if(modelstates.value._id){
    //   return Promise.resolve()
    // }else{
      let rst=await request.get("/api/hlfs",{params:{search:modelstates.value.description}})
      
      if(rst.data && rst.data.length>0 && rst.data[0].description==modelstates.value.description){
        return Promise.reject(t('component.message.dupDescription'))
      }else{
       
    return Promise.resolve();
      }
    // }
    // }

  }
  
} 
let checktem = async (_rule: Rule, value: string) => { 
  // let reg=/^[a-zA-Z\_$][a-zA-Z\d_]*$/
  if (!value) {
    return Promise.reject(t('awModeler.emptyTemp'))
  }else{
  }
  // else if(!reg.test(value)){
  //     return Promise.reject('The AW name is not standardized')
  // }
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
    clear()
})
// onFinishForm(modelstates)
};
const onFinishForm =  (modelstates: any) => {}
const onFinishFailedForm = (errorInfo: any) => {};
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
const confirm =async (obj:any) => {
  if(obj._id){
    delete obj.key
    let rst = await request.delete(`/api/hlfs/${obj._id}`)
  }else{
     await request.delete(`/api/hlfs/${deleteId}`)
  }
  
  tableData.value.forEach((e:any,index:number,array:any)=>{
    if(e.name==obj.name){
      delete array[index]
    }
  })
      // pagination.value.pageNo=1
      message.success(t('component.message.delText'));
};
const cancel = (e: MouseEvent) => {};
// 修改函数
async function updateAw(url:string,data:any) {
  // if(clickKey.path){
  //   data={...data,path:clickKey.path}
  // }
  let rst = await request.put(url, data)
  // pagination.value.total = 1
      // tableData.value = [rst]
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
// 表格的结构
const columns = reactive<Object[]>(
  [
  {
    title: 'component.table.name',
    dataIndex: 'Name',
    key: 'Name',
  },
  {
    title: 'component.table.description',
    dataIndex: 'description',
    key: 'description',
    },
    {
      title: 'component.table.template',
      dataIndex: 'template',
    key:'template'
    },
   {
      title: 'component.table.tags',
      dataIndex: 'tags',
    key:'tags'
    },
  {
      title: 'component.table.params',
      dataIndex: 'params',
    key:'params'
  },
  {
    title: 'component.table.action',
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
      showTotal: (total: any) => t('awModeler.pageTotal', { total: total }), // 显示总数
      onShowSizeChange: (current: any, pageSize: any) => onSizeChange(current, pageSize), // 改变每页数量时更新显示
      onChange:(page: any,pageSize: any)=>onPageChange(page,pageSize),//点击页码事件
      total: 0 //总条数
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
  if(clickKey.path && clickKey.dataRef){
    if(clickKey.dataRef.children.length==0){
      searchobj.q=`path:/.*${clickKey.path}/`
    }else{
      searchobj.q=`path:${clickKey.path}`
    }
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
  if(clickKey.path && clickKey.dataRef){
    if(clickKey.dataRef.children.length==0){
      searchobj.q=`path:/.*${clickKey.path}/`
    }else{
      searchobj.q=`path:${clickKey.path}`
    }
  }
     await query()
   }
const expend = (isExpand:any,rected:any) => {}
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
  treeSelectTitle = info.node.title
  if(info.node.dataRef.title=='/'){
    await query()
  }else{
    let str=getPath(info.node.dataRef.title,treeData.value)
  
  str=str.substring(1,str.length)
  console.log(str);
  
  clickKey.path=str
  clickKey.dataRef=info.node.dataRef
  if(info.node.dataRef.children.length==0){
    // 这里走精准匹配
    await query({q:`path:${str}`,search:''})

  }else{
  // 这里走前置匹配
  await query({q:`path:${str}`,search:''})
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
  }else{
    nowNode.title=nowNode.title
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
  let expandKey=queryKey(treeData.value,key)
  let res=getPathByKey(nowNode.title,"title",treeData.value);
  let str:any=res?.map((item:any)=>{
    return item.title
  }).join("/")
  str = str.substring(1, str.length)
  let pushPath
  if(title=="/"){pushPath="/childNode"}else{pushPath=str+'/'+'childNode'}

 await request.post("/api/hlfs?isFolder=true?focre=true",{path:pushPath})
  expandedKeys.value = [key];
  autoExpandParent.value=true
  // queryTree()
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
const getloop=(arr:Array<any>, key:string,lenght:any)=> {
      //首先循环arr最外层数据
      for (let s = 0; s < arr.length; s++) {
        //如果匹配到了arr最外层中的我需要修改的数据
        if (arr[s].key == key) {
          let obj = {
            title: length?`childNode${length}`:'childNode0',
            key: uuid(),
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
        } else {
          continue;
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
            key: uuid(),
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
        } else {
          continue;
        }
      }
}
// 判断当前节点的上一级是否有值，若无知（path=‘NewNode’） 有值酒吧当前点击的替换
// 添加顶级节点
const addSib=async(key:any)=>{
  // 根据当前传来的key，获取父节点的对象children
  let nowNode = getTreeDataByItem(treeData.value, key)
  let parentNode=getTreeParentChilds(treeData.value,key)
  
  
  // let rst=getTreeParentChilds(treeData.value,key)
  // rst.push({...topTree.value})
  let str = getPath(nowNode.title, treeData.value)
  str = str.substring(1, str.length)
  console.log(str.indexOf('/'));
  
  
  if(str.indexOf('/')>=0){
    let newStrIndex=str.lastIndexOf('/')
  let newStr=str.substring(0,newStrIndex+1)
    let pathnew = newStr + `NewNode${parentNode.length}`
  console.log(pathnew);
    await request.post("/api/hlfs?isFolder=true",{path:pathnew})
  }else{
    await request.post("/api/hlfs?isFolder=true",{path:'/NewNode'})
  }
  pushSib(treeData.value,key,parentNode.length)
  // treeData.value = [...treeData.value]
  expandedKeys.value = [nowNode.key];
  autoExpandParent.value=true
  
  // queryTree()7
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

    const selectedRowKeys = ref<any>([]); // Check here to configure the default column

const onSelectChange = (changableRowKeys: Key[]) => {
  selectedRowKeys.value = changableRowKeys;
};
    // 表格复选框
    const rowSelection = computed(() => {
      return {
        selectedRowKeys: unref(selectedRowKeys),
        onChange: onSelectChange,
        hideDefaultSelections: true,
        selections: [
          Table.SELECTION_ALL,
          Table.SELECTION_INVERT,
          Table.SELECTION_NONE,
        ],
      };
    });

    // 获取拖拽的对象
// 右键添加Aw的path
const addAwmodel= (key:any,title:string)=>{
  let str=getPath(title,treeData.value)
  str=str.substring(1,str.length)
  if(selectedRowKeys.value.length>0){
    tableData.value=tableData.value.filter((item:any)=>!selectedRowKeys.value.some((child:any)=>item._id===child._id))
    let pool: any[]=[]
    selectedRowKeys.value.forEach(  (item:any)=>{
      item.path=str
      pool.push(updateAw(`/api/hlfs/${item._id}`, item))
    })
    Promise.all(pool).then((res:any)=>{
      if(res){message.success("Modification succeeded")}
    }).catch(()=>{message.error("Modification failed")})
  }else{
    message.warning("Please select the Aw to be added")
  }
}
// 定义修改的变量
let awupdate=ref("awmodeler")

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
<!--        <a-col :span="1" style="display: flex; justify-content: center; align-items: center;">-->
<!--          <a-checkbox v-model:checked="checked" @change="checkquery"></a-checkbox>-->
<!--        </a-col>-->
        <a-col :span="20">
           <AForm  
            layout="inline"
            class="search_form"
            :model="formState"
            @finish="handleFinish"
            @finishFailed="handleFinishFailed"
            :wrapperCol="wrapperCol">
            <a-col :span="20">
            <a-input v-model:value="formState.search"
            :placeholder="$t('awModeler.inputSearch1')"
            @change="inputChange"
            ref="searchInput"
            >
            </a-input>
            <a-cascader
            v-if="cascder"
            :load-data="loadData"
            v-model:value="selectvalue"
            placeholder="Please select"
            :options="selectoptions"
            @change="onSelectAwChange"
            ></a-cascader>
              </a-col>
                <a-col :span="4">
                <a-button type="primary" html-type="submit">{{ $t('common.searchText') }}</a-button>
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
      <a-form-item
          :label="$t('component.table.params')"
          name="params"  >
        <a-button @click="addNewParams">{{$t('awModeler.addParams')}}</a-button>
      </a-form-item>
      </a-form>

        <a-table v-if="modelstates.params.length>0" :columns="paramsColum" :data-source="modelstates.params" bordered>
          <template #headerCell="{ column }">
            <span>{{ $t(column.title) }}</span>
          </template>
          <template #bodyCell="{column,text,record}">
             <template v-if='column.key==="required"'>
              <a-checkbox v-if="record.editing" v-model:checked="record.required"></a-checkbox>
          <a-checkbox v-else v-model:checked="record.required" :disabled="true"></a-checkbox>
          </template>
            <template v-if='column.key==="name"'>
              <a-input v-if="record.editing" v-model:value.trim="record.name" style="margin: -5px 0" />
            <template v-else>
              {{text}}
            </template>
            </template>
            <template v-if='column.key==="description"'>
                <a-input v-if="record.editing" v-model:value.trim="record.description" style="margin: -5px 0" />
              <template v-else>
                {{text}}
              </template>
            </template>
              <template v-if='column.key==="type"'>
               <div>
                <a-select ref="select" v-if="record.editing" v-model:value.trim="record.type" :options="optiones"
                ></a-select>
              <template v-else>
                {{ text }}
              </template>
               </div>
              </template>
              <template v-if="column.key === 'enum'">
                <div>
          <template v-if="record.editing">
            <template v-for="(tag) in record.enum" :key="tag">
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
            <a-input v-if="record.inputVisible || record.type=='string'" ref="inputRefs" v-model:value.trim="record.inputValue" type="text"
                     size="small" :style="{ width: '78px' }" @blur="handleFactorValueConfirm(record)"
                     @keyup.enter="handleFactorValueConfirm(record)" />
            <a-input-number v-else-if="record.inputVisible && record.type=='number'" ref="inputRefs" v-model:value.number="record.inputValue" type="text"
            size="small" :style="{ width: '78px' }" @blur="handleFactorValueConfirm(record)"
            @keyup.enter="handleFactorValueConfirm(record)" />
            <a-tag v-else style="background: #fff; border-style: dashed" @click="newFactorValueInput(record)">
              <plus-outlined />
              {{ $t('common.newValue') }}
            </a-tag>
          </template>

          <span v-else>
            <a-tag v-for="tag in record.enum" :key="tag" color="cyan">
              {{ tag }}
            </a-tag>
          </span>
        </div>
        </template>


        <template v-if="column.key === 'returnType'">
          <div>
          <template v-if="record.editing">
            <template v-for="(tag) in record.returnType" :key="tag">
              <a-tooltip v-if="tag.length > 20" :title="tag">
                <a-tag :closable="true" :visible="true" @close="handleCloseReturnType(record, tag)">
                  {{ `${tag.slice(0, 20)}...` }}
                </a-tag>
              </a-tooltip>
              <a-tag v-else-if="tag.length==0"></a-tag>
              <a-tag v-else :closable="true" :visible="true" @close="handleCloseReturnType(record, tag)">
                {{tag}}
              </a-tag>
            </template>
            <a-input v-if="record.returnTypevisible || record.type=='string'" ref="returnType" v-model:value.trim="record.returnTypeinput" type="text"
                     size="small" :style="{ width: '78px' }" @blur="handleReturnType(record)"
                     @keyup.enter="handleReturnType(record)" />
            <a-input-number v-else-if="record.returnTypevisible && record.type=='number'" ref="returnType" v-model:value.number="record.returnTypeinput" type="text"
            size="small" :style="{ width: '78px' }" @blur="handleReturnType(record)"
            @keyup.enter="handleReturnType(record)" />
            <a-tag v-else style="background: #fff; border-style: dashed" @click="newReturnType(record)">
              <plus-outlined />
              {{ $t('common.newValue') }}
            </a-tag>
          </template>

          <span v-else>
            <a-tag v-for="tag in record.returnType" :key="tag" color="cyan">
              {{ tag }}
            </a-tag>
          </span>
        </div>
        </template>


        <template v-if="column.key === 'action'">
          <div class="editable-row-operations">
            <span v-if="record.editing">
              <a-typography-link type="danger" @click="saveparams(record)" style="font-size:16px">{{ $t('common.saveText' )}}</a-typography-link>
              <a-divider type="vertical" />
            <a @click="cancelparams(record)" >{{$t('common.cancelText') }}</a>
            </span>
            <span v-else>
              <a @click="editparams(record)">{{ $t('component.table.edit') }}</a>
              <a-divider type="vertical" />
              <a-popconfirm
                  :title="$t('component.message.sureDel')"
                  @confirm="delmodel(record)"
                  :cancel-text="$t('common.cancelText')"
                  :ok-text="$t('common.okText')">
              <a style="margin-left:10px;margin-right:10px;font-size:16px;">
                {{ $t('common.delText') }}</a>
            </a-popconfirm>
            </span>
          </div>
        </template>
            </template>
        </a-table>
    </a-modal>
  </div>
          <!-- 表格的结构 -->
<div ref="tabledom">
    <a-table bordered
    :row-selection="rowSelection"
    :row-key="(record: any) => record"
      :loading="tableLoading"
      :columns="columns" 
      :data-source="tableData"
      class="components-table-demo-nested"
      :pagination="pagination"
      @expand="expend"
      >
      <template #headerCell="{ column }">
        <span>{{ $t(column.title) }}</span>
      </template>

    <template #bodyCell="{ column,text, record }">
      <template v-if="column.key === 'Name'">
        <div v-if="record._highlight">
          <div v-if="record._highlight.name">
            <a v-for="item in record._highlight.name"
              v-html="item"
              :href="`/#/awupdate/${record._id}/${record.name}/awmodeler?canEdit=true`"
            ></a>
          </div>
          <a :href="`/#/awupdate/${record._id}/${record.name}/awmodeler?canEdit=true`" v-else-if="record.validationError">
            <exclamation-circle-two-tone two-tone-color="#FAAD14" style='fontSize: 16px;'/>
            {{ record.name }}
          </a>
          <a :href="`/#/awupdate/${record._id}/${record.name}/awmodeler?canEdit=true`" v-else> {{ record.name }}    </a>
        </div>
        <a :href="`/#/awupdate/${record._id}/${record.name}/awmodeler?canEdit=true`" v-else-if="record.validationError">
            <exclamation-circle-two-tone two-tone-color="#FAAD14" style='fontSize: 16px;'/>
            {{ record.name }}
          </a>
        <a :href="`/#/awupdate/${record._id}/${record.name}/awmodeler?canEdit=true`" v-else>{{ record.name }}</a>
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
              <span>
                  <a :href="'/#/awupdate/'+record._id+'/'+record.name+'/'+awupdate" >{{ $t('component.table.edit') }}</a>
                    <a-divider type="vertical" />
                        <a-popconfirm
                          :title="$t('awModeler.delTip')"
                          :ok-text="$t('common.yesText')"
                          :cancel-text="$t('common.noText')"
                          @confirm="confirm(record)"
                          @cancel="cancel"
                        >
                      <a >{{ $t('common.delText') }}</a>
                    </a-popconfirm>
                  </span>
          </template>
    </template>
      </a-table>
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
  // .exampleEnum{
  //   // width:400px
  // }
  </style>
