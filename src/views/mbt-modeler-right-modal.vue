<script setup lang="ts">
import {
computed,
  ref,
watch
} from "vue";
import MbtModelerAwSchema from './mbt-modeler-aw-schema.vue'
import MbtModelerLinkSchema from './mbt-modeler-link-schema.vue'
import MbtModelerGroupSchema from './mbt-modeler-group-schema.vue'
import MbtModelerSectionSchema from './mbt-modeler-section-schema.vue'
import createRule from "@/components/CreateRule.vue"
import {MbtData} from "@/stores/modules/mbt-data";
import VueForm from "@lljj/vue3-form-ant";
import _ from "lodash";

const store = MbtData()
const emit = defineEmits(['change'])
const keys = 1
let desc = ref<string>('')
let show = ref(false)
let showAw = ref<boolean>(false)
let showLink = ref<boolean>(false)
let showGroup = ref<boolean>(false)
let showSection = ref<boolean>(false)
let showDrawer = ref(false)
let AwDom = ref()
let groupDom = ref()
let linkDom = ref()
let sectionDom = ref()
let schemaData = ref({})
let data:any = ref({})

// 复杂条件编辑的逻辑
let formDatas = computed(() => {
  return store.getDataPoolTableColumns.map((e: any) => {
    return {
      value: e.title,
      label: e.title
    }
  })
})
 
let childValue = computed(() => {
  return store.getDataPoolTableData.length > 0
      ? valueOption(store.getDataPoolTableData)
      : []
})
let valueData = childValue

function valueOption(arr: any) {
  let newArr = Object.keys(arr[0])
  let setArr = newArr.map((item: any) => ({ name: item, type: '', values: [] }))
  arr.forEach((item: any, index: any) => {
    let keys = Object.keys(arr[0])
    if (keys) {
      setArr.forEach((tureItem: {type: string; name: string; values: any[]; }, i: any) => {
        if(tureItem.name==keys[i]){
          tureItem.type = typeof item[keys[i]]
          tureItem.values.push(item[keys[i]])
        }
        tureItem.values=[...new Set(tureItem.values)]
      })
    }
  })
  return setArr
}

const rulesDataDefaultItem = {
  relation: 'AND',
  id: 1,
  conditions: [
    {
      name: 'name',
      operator: '=',
      value: undefined,
      selectvalues: 'AND',
    },
  ],
  children: [],
}

// 递归改变if结构
function ifdata(arr: any) {
  let finditem = null;
  for (let i = 0; i < arr.length; i++) {
    let item = arr[i];
    if (item.relation == "AND") {
      item.relation = "&&";
    }
    if (item.relation == "OR") {
      item.relation = "||";
    }
    if (item.conditions.length > 1) {
      // finditem='('+conditionstr(item.conditions)+')'+' '+item.relation+' '
      finditem = `(${conditionstr(item.conditions)}) ${item.relation} `;
    } else {
      // finditem=conditionstr(item.conditions)+' '+item.relation
      finditem = `${conditionstr(item.conditions)} ${item.relation} `;
    }
    if (item.children.length > 0) {
      finditem += ifdata(item.children);
      // if
    } else {
      break;
    }
  }
  if (finditem != null) {
    let findlength = finditem.length;
    if (
      finditem.substring(findlength - 3, findlength) == "&& " ||
      finditem.substring(findlength - 3, findlength) == "|| "
    ) {
      finditem = finditem.substring(0, findlength - 3);
    }

    return finditem;
  }
}
function selectvalue(value: any) {
  let values = null;
  if (Array.isArray(value)) {
    if (value.length > 1) {
      if (JSON.stringify(formDatas.value).includes(value[0])) {
        let newvalue = value.map((strArr: any) => [strArr]);
        values = `{${JSON.stringify(newvalue)
          .substring(1, JSON.stringify(newvalue).length - 1)
          .replace(/"/g, "")}}`;
      } else {
        values = `{${JSON.stringify(value).replace("[", "").replace("]", "")}}`;
      }
    } else {
      if (JSON.stringify(formDatas.value).includes(value[0])) {
        values = JSON.stringify(value).replaceAll('"', "");
      } else {
        values = JSON.stringify(value).replace("[", "").replace("]", "");
      }
    }
  } else {
    if (JSON.stringify(formDatas.value).includes(value)) {
      values = `[${value}]`;
    } else {
      values = JSON.stringify(value);
    }
  }
  return values;
}
// 解决括号链接
const conditionstr = (arr: any) => {
  let ifcondition = null;
  ifcondition = arr.map((item: any) => {
    if (item.operator == "=") {
      item.operator = "==";
    }
    if (item.selectvalues) {
      if (item.selectvalues == "AND") {
        item.selectvalues = "&&";
      }
      if (item.selectvalues == "OR") {
        item.selectvalues = "||";
      }
      return `${item.name} ${item.operator} ${JSON.stringify(item.value)} ${
        item.selectvalues
      } `;
      // return '['+item.name+']'+' '+item.operator+' '+'{'+item.value+'}'+' '+item.selectvalue+' '
    } else {
      // return '['+item.name+']'+' '+item.operator+' '+'{'+item.value+'}'+' '
      return `${item.name} ${item.operator} ${JSON.stringify(item.value)} `;
    }
  });

  return ifcondition
    .join("")
    .toString()
    .substring(0, ifcondition.join("").toString().length - 4);
};


const rulesData = ref([rulesDataDefaultItem])
function rulesChange (datas: any, key: string) {
  rulesData.value = datas
}
watch(
            rulesData,
            (newvalue: any) => {
              if (rulesData.value.length > 0) {
                if ( showDrawer.value && _.has(data.value , 'label')){
                  data.value.label = ifdata(newvalue)!;
                }
              }
            },
            { deep: true }
          );




function initData () {
  desc.value = ''
  showAw.value = false
  showLink.value = false
  showGroup.value = false
  showSection.value = false
}

function handleAwData () {
  const el = store.getShowData
  const checkAwProps = el.getPropertiesSchema()
  store.setEditingPrimaryAw(checkAwProps.step)
  store.setEditingExpectedAw(checkAwProps.expectation)
  showAw.value = true
  AwDom.value.handleData()
}

function handleData() {
  const el = store.getShowData
  // debugger
  if(el.attributes.source && el.attributes.target){
    const sourceId = el.attributes.source.id
    const targetId = el.attributes.target.id
    const sourceEl = el.graph.getCell(sourceId)
    const targetEl = el.graph.getCell(targetId)
    const flag = targetEl.attributes.type === 'itea.mbt.test.MBTAW'
      && sourceEl.attributes.type === 'itea.mbt.test.MBTExclusiveGateway'
      showDrawer.value = flag
  }
  
  
  schemaData.value = el.getPropertiesSchema()
  console.log(el.getPropertiesData());
  data.value = el.getPropertiesData()
  show.value = true
}

function handleLinkData () {
  /**
   * 判断 link 链接的两个节点是否是 AW 和 Conditional 节点
   * 如是，要显示条件编辑
   * */
  const el = store.getShowData
  const sourceId = el.attributes.source.id
  const targetId = el.attributes.target.id
  const sourceEl = el.graph.getCell(sourceId)
  const targetEl = el.graph.getCell(targetId)

  if(!sourceEl || !targetEl ){
    console.log(sourceEl,targetEl)
    return
  }
  const flag = sourceEl.attributes.type === 'itea.mbt.test.MBTAW'
      && targetEl.attributes.type === 'itea.mbt.test.MBTParallelGateway'
  linkDom.value.setShowDrawer(flag)
  showLink.value = flag
}

function handleGroup () {
  const el = store.getShowData
  const custom = el?.attributes?.prop?.custom
  store.setGroupData({
    schema: el.getInspectorSchema().schema,
    data: custom?.data || {}
  })
  groupDom.value.setData()
  showGroup.value = true
}

function handleSectionData () {
  const el = store.getShowData
  const schema = el.getInspectorSchema().schema
  store.setSectionData(schema, 'schema')
  sectionDom.value.setData()
  showSection.value = true
}

function getType () {
  const el = store.getShowData
  return el?.attributes?.type || ''
}

function handleShowData () {
  initData()
  const el = store.getShowData
  const type = getType()
  const _desc = el.attributes.prop?.custom?.description
  if (_desc) {
    desc.value = _desc
    store.setDescription(_desc)
  }
  switch (type) {
    case 'itea.mbt.test.MBTAW': {
      handleAwData()
      break
    }
    case 'itea.mbt.test.MBTLink':
    case 'itea.mbt.test.link': {
      handleData()
      break
    }
    case 'itea.mbt.test.MBTGroup': {
      handleData()
      break
    }
    case 'itea.mbt.test.MBTSection': {
      handleData()
      break
    }
  }
}

function handleChange () {
  const el = store.getShowData
  console.log("handleChange",el)
  const _desc = desc.value
  store.setDescription(_desc)
  
  data.value.description = desc.value
  // el.setPropertiesData(data.value)

  emit('change', getType(),data.value)
}

defineExpose({
  handleShowData
})

</script>

<template>
  <div class="mbt-modeler-right-modal-wrap">
    <div class="desc-wrap">
      <div class="title">描述：</div>
      <a-input v-model:value="desc" @change="handleChange"></a-input>
    </div>
    <a-divider />
    <mbt-modeler-aw-schema v-show="showAw" ref="AwDom" :show="showAw" @change="handleChange"></mbt-modeler-aw-schema>
    <VueForm  v-show="show" :schema="schemaData" v-model="data" @change="handleChange">
      <div v-if="showDrawer" slot-scope="{ linkSchemaValue }">
        <create-rule
          v-if="store.getDataPoolTableData.length > 0"
          :keys="keys"
          :formDatas="formDatas"
          :valueData="valueData"
          :rulesData="rulesData"
          @rulesChange="rulesChange"
        ></create-rule>
      </div>
    </VueForm>

    <!-- <mbt-modeler-link-schema v-show="showLink" @change="handleChange" ref="linkDom"></mbt-modeler-link-schema>
    <mbt-modeler-group-schema v-show="showGroup" ref="groupDom" @change="handleChange"></mbt-modeler-group-schema>
    <mbt-modeler-section-schema v-show="showSection" ref="sectionDom" @change="handleChange"></mbt-modeler-section-schema> -->
  </div>
</template>

<style scoped lang="less">
.mbt-modeler-right-modal-wrap {
  margin: 8px 4px;
  .desc-wrap {
    display: flex;
    align-items: center;
    white-space: nowrap;
  }
}
</style>