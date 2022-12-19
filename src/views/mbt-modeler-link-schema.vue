<script setup lang="ts">
import {
  computed,
  ref
} from 'vue'
import VueForm from "@lljj/vue3-form-ant";
import { MbtData } from "@/stores/modules/mbt-data";
import { watch } from 'vue';

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
let formData = store.getDataPoolTableColumns.map((e: any) => {
  return {
    value: e.title,
    label: e.title
  }
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
      title: 'Condition',
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

function submit () {
  emit('save', {
    linkData: linkSchemaValue.value,
    rulesData: rulesData.value
  })
}
let watchData = computed(()=>{linkSchemaValue.value,rulesData.value})
watch(()=>watchData.value , (val:any) => {
    if(linkSchemaValue.value){
        store.setLinkData(linkSchemaValue.value , rulesData.value)
    }
    

} , {deep:true})



function closeDrawer () {
  rulesData.value = [rulesDataDefaultItem]
  linkSchemaValue.value.label = ''
}

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
      @submit="submit"
      @cancel="closeDrawer">
      <div v-if="props.showDrawer" slot-scope="{ linkData }">
        <create-rule
          v-if="store.getDataPoolTableData.length > 0"
          :keys="keys"
          :formDatas="formData"
          :valueData="valueData"
          :rulesData="rulesData"
          @rulesChange="rulesChange"
        ></create-rule>
      </div>
      <div style="margin-top: 1.625rem">
        <a-button
          @click="submit"
          type="primary"
          style="margin-right: 0.625rem"
        >{{ $t("common.saveText") }}</a-button>
        <a-button @click="closeDrawer">{{ $t("common.cancelText") }}</a-button>
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
