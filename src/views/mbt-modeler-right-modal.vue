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

let desc = ref<string>('')
let showAw = ref<boolean>(false)
let showLink = ref<boolean>(false)
let showGroup = ref<boolean>(false)
let showSection = ref<boolean>(false)
let AwDom = ref()

function initData () {
  desc.value = ''
  showAw.value = false
  showLink.value = false
  showGroup.value = false
  showSection.value = false
}

function handleShowData () {
  console.log(store.getShowData)
  initData()
  const _desc = store.getShowData.description
  if (_desc) {
    desc.value = _desc
    store.setDescription(_desc)
  }

  const type = store.getShowData.type
  console.log(type)
  switch (type) {
    case 'aw': {
      showAw.value = true
      AwDom.value.handleData()
      break
    }
    case 'link': {
      showLink.value = true
      break
    }
    case 'group': {
      showGroup.value = true
      break
    }
    case 'section': {
      showSection.value = true
      break
    }
  }
}

function handleChange () {

}

defineExpose({
  handleShowData
})

</script>

<template>
  <div class="mbt-modeler-right-modal-wrap">
    <div class="desc-wrap">
      <div class="title">描述：</div>
      <a-input v-model:value="desc"></a-input>
    </div>
    <a-divider />
    <mbt-modeler-aw-schema v-show="showAw" ref="AwDom" :show="showAw" @change="handleChange"></mbt-modeler-aw-schema>
    <mbt-modeler-link-schema v-show="showLink"></mbt-modeler-link-schema>
    <mbt-modeler-group-schema v-show="showGroup"></mbt-modeler-group-schema>
    <mbt-modeler-section-schema v-show="showSection"></mbt-modeler-section-schema>
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