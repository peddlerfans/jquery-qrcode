<script setup lang="ts">
import {
  ref
} from "vue";
import MbtModelerAwSchema from './mbt-modeler-aw-schema.vue'
import MbtModelerLinkSchema from './mbt-modeler-link-schema.vue'
import MbtModelerGroupSchema from './mbt-modeler-group-schema.vue'
import MbtModelerSectionSchema from './mbt-modeler-section-schema.vue'
import {MbtData} from "@/stores/modules/mbt-data";

const store = MbtData()
const emit = defineEmits(['change'])

let desc = ref<string>('')
let showAw = ref<boolean>(false)
let showLink = ref<boolean>(false)
let showGroup = ref<boolean>(false)
let showSection = ref<boolean>(false)
let AwDom = ref()
let groupDom = ref()
let linkDom = ref()
let sectionDom = ref()

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
      handleLinkData()
      break
    }
    case 'itea.mbt.test.MBTGroup': {
      handleGroup()
      break
    }
    case 'itea.mbt.test.MBTSection': {
      handleSectionData()
      break
    }
  }
}

function handleChange () {
  const _desc = desc.value
  store.setDescription(_desc)
  emit('change', getType())
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
    <mbt-modeler-link-schema v-show="showLink" @change="handleChange" ref="linkDom"></mbt-modeler-link-schema>
    <mbt-modeler-group-schema v-show="showGroup" ref="groupDom" @change="handleChange"></mbt-modeler-group-schema>
    <mbt-modeler-section-schema v-show="showSection" ref="sectionDom" @change="handleChange"></mbt-modeler-section-schema>
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