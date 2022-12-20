<script setup lang="ts">
import {
  computed,
  ref
} from 'vue'
import VueForm from "@lljj/vue3-form-ant";
import { MbtData } from "@/stores/modules/mbt-data";
import { watch } from 'vue';
import { SelectProps } from 'ant-design-vue';

const emit = defineEmits(['save'])

interface Props {
  showDrawer: boolean
}
const props = withDefaults(defineProps<Props>(), {
  showDrawer: false
})
watch(() => props.showDrawer, (val: any) => {  
  props.showDrawer = val
})

const keys = 1

const store = MbtData()
let formDatas = computed(() => {
  return ref<SelectProps["options"]>(
     store.getDataPoolTableColumns.map((e: any) => {
  return {
    value: e.title,
    label: e.title
  }
})
  )
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
    // if(item.children.length==0){
    //   item.relation=""
    // }
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

let linkSchemaValue = ref<any>({})
let linkSchema = ref({
  description: 'Configuration for Link',
  type: 'object',
  properties: {
    _id: {
      type: 'string',
      "ui:hidden": true,
      required: true,
    },
    label: {
      title: 'Label',
      type: 'string',
      default: ''
    },
    isCondition: {
      type: 'boolean',
      default: false,
      "ui:hidden": true
    },
  },
})

let watchData = computed(()=>{linkSchemaValue.value,rulesData.value})
watch(()=>watchData.value , (val:any) => {
    if(linkSchemaValue.value){
        store.setLinkData(linkSchemaValue.value , rulesData.value)
    }
    

}, { deep: true })
watch(() => rulesData.value, (newValue: any) => {
  if (newValue) {
    linkSchemaValue.label = ifdata(newValue)
  }
},{deep:true})


function rulesChange (datas: any, key: string) {
  rulesData.value = datas
}

</script>

<template>
  <div class="edit-link-warp">
    <div class="title">
      {{ $t('MBTStore.configLink') }}
    </div>
    <VueForm
      v-model="linkSchemaValue"
      :schema="linkSchema"
    >
      <div v-if="props.showDrawer" slot-scope="{ linkData }">
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
  </div>
</template>

<style scoped lang="less">
.edit-link-warp {
  padding: 4px 8px;
  .title {
    font-size: 18px;
    margin-top: 8px;
    margin-bottom: 12px;
  }
}
</style>
