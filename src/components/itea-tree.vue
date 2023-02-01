<script lang="ts" setup>
import http from "@/utils/http";
import {nextTick, onMounted, ref, watch} from "vue";
import {objToArr} from "@/utils/treeData";
import {message} from "ant-design-vue/es";
import request from "@/utils/request";
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from 'vue-router'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const emit = defineEmits(['select', 'addAW'])

interface Props {
  treeUrl: string,
  selectionList: any
}

const props = withDefaults(defineProps<Props>(), {
  treeUrl: '',
  selectionList: []
})

let treeData = ref<Array<any>>([])
let searchText = ref<string>('')
let autoExpandParent = ref<boolean>(false)
let expandedKeys = ref<(string | number)[]>([])
// 定义修改节点的变量
let updateTreeData=ref('')
// 获取修改节点的dom
let updDom = ref()
let selectKeys = ref<any>([])

// 给树形数据添加属性
const addKey: any = (arr: any[]) => (arr??[]).map(item => ({
  ...item,
  showEdit: false,
  children: addKey(item.children)
}))

function getTreeData() {
  const url = props.treeUrl
  if (!url) return
  http.get(url + '/_tree').then(({ data }) => {
    treeData.value = addKey(objToArr(data))
    selectTreeNode()
  })
}

function onSelect(selectedKeys: any, info: any) {
  const pNodes = info.node?.parent?.nodes || []
  let path: string = String(
      pNodes.map((a: any) => a.title).join('/') + '/' + info.node.title
  ).slice(1)
  router.push({
    path: '/mbtstore/index',
    query: {
      treePath: encodeURIComponent(path)
    }
  })
  if (info.node.dataRef.title === '/') {
    emit('select', '')
  } else {
    emit('select', `path:${path}`)
  }
}

// 递归查询当前选中节点的key方法
const getChildKey = (childs: any, findKey: string): any => {
  let findItem = null
  for (let i = 0, len = childs.length; i < len; i++) {
    let item = childs[i]
    if (item.title.indexOf(findKey) === -1 && item.children && item.children.length > 0) {
      findItem = getChildKey(item.children, findKey)
    }
    if (item.title.indexOf(findKey)>-1 ) {
      findItem = item.key
    }
    if (findItem !== null) {
      break
    }
  }
  return findItem
}

watch(
    searchText,
    value => {
      if(value){
        const expanded = treeData.value.map((item: any) => {
          if (item.title.indexOf(value) === -1) {
            return getChildKey(treeData.value, value);
          }
          return null;
        }).filter((item: any, i: any, self: string | any[]) => item && self.indexOf(item) === i);
        expandedKeys.value = expanded as any
        autoExpandParent.value = true
      }else{
        //折叠起来
        autoExpandParent.value =  false
      }
    }
)

function selectTreeNode() {
  const path: string = decodeURIComponent(String(route.query.treePath || ''))
  const pathList = path.split('/').filter((a: any) => a)
  const title = (pathList.pop() || '')
  if (!title) return
  let tar: any = treeData.value[0].children
  expandedKeys.value.push(treeData.value[0].key)
  if (pathList.length) {
    pathList.forEach((b: any) => {
      tar = tar.filter((c: any) => c.title === b)[0]
      expandedKeys.value.push(tar.key)
      tar = tar?.children
    })
  }
  tar = tar.filter((c: any) => c.title === title)[0]
  if (!tar?.key) return
  selectKeys.value = [tar.key]
  expandedKeys.value.push(tar.key)
  emit('select', `path:${path}`)
}

onMounted(() => {
  getTreeData()
})

// 递归查询当前节点的对象
const getTreeDataByItem=(childs: any, findKey: any):any=> {
  let findItem = null;
  for (let i = 0, len = childs.length; i < len; i++) {
    let item = childs[i]
    if (item.key !== findKey && item.children && item.children.length > 0) {
      findItem = getTreeDataByItem(item.children, findKey)
    }
    if (item.key == findKey) {
      findItem = item
    }
    if (findItem != null) {
      break
    }
  }
  return findItem
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

// 获取点击所在节点的整个路径
function getPathByKey(value: string, key: string, arr: string | any[]) {
  let tempPath: any[] = [];
  try {
    function getNodePath(node:any){
      tempPath.push(node);
      //找到符合条件的节点，通过throw终止掉递归
      if (node[key] === value) {
        throw ("GOT IT!");
      }
      if (node.children && node.children.length > 0) {
        for (let i = 0; i < node.children.length; i++) {
          getNodePath(node.children[i]);
        }
        //当前节点的子节点遍历完依旧没找到，则删除路径中的该节点
        tempPath.pop();
      }
      else {
        //找到叶子节点时，删除路径当中的该叶子节点
        tempPath.pop();
      }
    }
    for (let i = 0; i < arr.length; i++) {
      getNodePath(arr[i]);
    }
  } catch (e) {
    return tempPath;
  }
}

// 定义一个返回路径的函数
function getPath(key:any, treeArr: any){
  let rst:any
  let res = getPathByKey(key,'title', treeArr)
  rst = res?.map((obj: any) => {
    return obj.title
  }).join('/')
  return rst
}

// 失去焦点，真正修改树节点的地方
const onChangTitle = async (data: any) => {
  let nowNode = getTreeDataByItem(treeData.value,data)
  let parentChild = getTreeParentChilds(treeData.value,data)
  if (updateTreeData.value) {
    let searchObj = parentChild.filter((e: any) => e.title === updateTreeData.value)
    if(searchObj.length > 0 && updateTreeData.value !== nowNode.title){
      message.warning(`${t('awModeler.tip1')} ${updateTreeData.value}`)
      return
    } else {
      let str = getPath(nowNode.title, treeData.value)
      str = str.substring(1, str.length)
      // 将新输入的值拼接到newPath
      let newStrIndex = str.lastIndexOf('/')
      let newStr = str.substring(0, newStrIndex + 1)
      let pathNew = newStr + updateTreeData.value
      await request.post(props.treeUrl + "/_rename?force=true",{
        path: str,
        newPath: pathNew
      })
      nowNode.title = updateTreeData.value
    }
  }
  updateTreeData.value = ''
  nowNode.showEdit = false
  expandedKeys.value = [nowNode.key]
  autoExpandParent.value = true
}

//找到需要添加的节点并添加下级
const getLoop = (arr: Array<any>, key: string, lenghts: any)=> {
  //首先循环arr最外层数据
  for (let s = 0; s < arr.length; s++) {
    //如果匹配到了arr最外层中的我需要修改的数据
    if (arr[s].key == key) {
      let obj = {
        title: lenghts ? `childNode${lenghts}` : 'childNode0',
        key: lenghts ? `childNode${lenghts}` : 'childNode0',
        children:[],
        showEdit: false,
        isLeaf:true,
      };
      if (arr[s].children === undefined) {
        arr[s].children = []
        arr[s].children.push(obj)
      } else {
        arr[s].children.push(obj)
      }
      break
    } else if (arr[s].children && arr[s].children.length > 0) {
      // 递归条件
      getLoop(arr[s].children, key, lenghts)
    }
  }
}

// 找到需要展开节点的key
const queryKey = (arr: any, key: string) => {
  let expandKey
  for(let i=0; i<arr.length; i++){
    if(arr[i].key === key){
      arr[i].children.forEach((item: any) => {
        if (item.title === "childNode") {
          expandKey=item.key
        }
      })
    } else if (arr[i].children && arr[i].children.length > 0) {
      queryKey(arr[i].children,key)
    }
  }
  return expandKey
}

// 点击添加下级节点的方法，获取当前的key（添加下级节点时，都加children，）
const pushSubtree = async (key: any, title: any) => {
  // 获取当前添加节点的对象
  let nowNode = getTreeDataByItem(treeData.value, key)
  getLoop(treeData.value, key, nowNode.children.length)
  treeData.value = [...treeData.value]
  let res = getPathByKey(nowNode.title, "title", treeData.value);
  let str: any = res?.map((item: any) => {
    return item.title
  }).join("/")
  str = str.substring(1, str.length)
  let pushPath = nowNode.children.length ? str + '/' + `childNode${nowNode.children.length}` : str + '/' + 'childNode0'
  const name = nowNode.children.length ? str + `childNode${nowNode.children.length}` : str + 'childNode0'
  await request.post(props.treeUrl + "?isFolder=true&focre=true",{
    path: pushPath,
    name: name,
    description: name
  })
  expandedKeys.value = [key]
  autoExpandParent.value = true
}

const pushSib = async (arr: Array<any>, key: string, length: any) => {
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
      pushSib(arr[s].children, key, length);
    }
  }
}

// 判断当前节点的上一级是否有值，若无知（path=‘NewNode’） 有值酒吧当前点击的替换
// 添加顶级节点
const addSib = async (key: any) => {
  // 根据当前传来的key，获取父节点的对象children
  let nowNode = getTreeDataByItem(treeData.value, key)
  let parentNode = getTreeParentChilds(treeData.value, key)
  const desc = parentNode.lenght ? `/NewNode${parentNode.lenght}` : '/NewNode0'
  let str = getPath(nowNode.title, treeData.value)
  str = str.substring(1, str.length)
  if (str.indexOf('/') >= 0) {
    let newStrIndex = str.lastIndexOf('/')
    let newStr = str.substring(0, newStrIndex + 1)
    let pathNew = parentNode.lenght ? newStr + `NewNode${parentNode.length}` : newStr + `NewNode0`
    await request.post(props.treeUrl + "?isFolder=true",{
      path: pathNew,
      description: desc,
      name: desc
    })
  }else{
    await request.post(props.treeUrl + "?isFolder=true",{
      path: desc,
      description: desc,
      name: desc
    })
  }
  pushSib(treeData.value,key,parentNode.length)
  expandedKeys.value = [nowNode.key];
  autoExpandParent.value=true
}

// 右键添加Aw的path
const addAwModel = (key: any, title: string) => {
  let str = getPath(title, treeData.value)
  str = str.substring(1, str.length)
  emit('addAW', str)
}

// 修改子节点的方法
const updTree = (key: any) => {
  let updChild = getTreeDataByItem(treeData.value, key)
  // 判断展开修改的节点是否恢复
  if (updateTreeData.value) {
    updChild.showEdit = false
    message.warning(t('awModeler.tip2'))
  } else {
    updateTreeData.value = updChild.title
    updChild.showEdit = true
    nextTick(() => {
      updDom.value.focus()
    })
  }
}

const confirmTree = async (key: any, title: string) => {
  let nowNode = getTreeDataByItem(treeData.value,key)
  let str = getPath(nowNode.title, treeData.value)
  str = str.substring(1, str.length)
  let delNode = getTreeParentChilds(treeData.value, key);
  for (let i = delNode.length - 1; i >= 0; i--) {
    if (delNode[i].title === nowNode.title) {
      delNode.splice(i, 1);
    }
  }
  expandedKeys.value = [nowNode.key];
  autoExpandParent.value = true
  await request.post(props.treeUrl + "/_deleteFolder?force=true",{ path: str })
}

const onExpand = (keys: any) => {
  expandedKeys.value = keys
  autoExpandParent.value = false
}


</script>

<template>
  <a-input-search
      v-model:value="searchText"
      style="margin-bottom: 8px"
      :placeholder="$t('common.searchText')"
  ></a-input-search>
  <a-tree
      v-if="treeData?.length"
      :show-line="true"
      :tree-data="treeData"
      :expanded-keys="expandedKeys"
      v-model:selected-keys="selectKeys"
      @select="onSelect"
      @expand="onExpand"
      :auto-expand-parent="autoExpandParent">
    <template #title="{key:treeKey,title,showEdit}">
      <template v-if="title === '/'">
        <a-dropdown :trigger="['contextmenu']">
          <template v-if="searchText &&  title.includes(searchText)">
            <div style="color: #f50;">
              <span>{{title}}</span>
            </div>
          </template>
          <span v-else-if="!showEdit">{{ title }}</span>
          <a-input v-else="showEdit"
                   type="text"
                   ref="updDom"
                   v-model:value="updateTreeData"
                   @blur="onChangTitle(treeKey)"
                   @keyup.enter="onChangTitle(treeKey)"
          />
          <template #overlay>
            <a-menu>
              <a-menu-item key="2" @click="pushSubtree(treeKey,title)">Add Child Node</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
      <a-dropdown :trigger="['contextmenu']" v-else>
        <template v-if="searchText &&  title.includes(searchText)">
          <div style="color: #f50;">
            <span>{{title}}</span>
          </div>
        </template>
        <span v-else-if="!showEdit">{{ title }}</span>
        <a-input v-else="showEdit"
                 type="text"
                 ref="updDom"
                 v-model:value="updateTreeData"
                 @blur="onChangTitle(treeKey)"
                 @keyup.enter="onChangTitle(treeKey)"
        />
        <template #overlay>
          <a-menu>
            <a-menu-item key="1" @click="addSib(treeKey)">{{ $t('awModeler.addSNode') }}</a-menu-item>
            <a-menu-item key="2" @click="pushSubtree(treeKey,title)">{{ $t('awModeler.addCNode') }}</a-menu-item>
            <a-menu-item key="4" @click="addAwModel(treeKey,title)">{{ $t('awModeler.moveSelected') }}</a-menu-item>
            <a-menu-item key="3" @click="updTree(treeKey)">{{ $t('awModeler.modifyNode') }}</a-menu-item>
            <a-popconfirm
                placement="right"
                :title="$t('component.message.sureDel')"
                :ok-text="$t('common.yesText')"
                :cancel-text="$t('common.noText')"
                @confirm="confirmTree(treeKey, title)">
              <a-menu-item key="4">{{ $t('awModeler.delNode') }}</a-menu-item>
            </a-popconfirm>
          </a-menu>
        </template>
      </a-dropdown>
    </template>
  </a-tree>
</template>

<style></style>