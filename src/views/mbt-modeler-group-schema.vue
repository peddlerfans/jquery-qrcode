<script setup lang="ts">
import {
  ref
} from "vue";
import {MbtData} from "@/stores/modules/mbt-data";
import VueForm from "@lljj/vue3-form-ant";

const store = MbtData()
const emit = defineEmits(['change'])

let DataGroup = ref({
  description: '',
  loopCount: ''
})
let schemaGroup = ref({})

function setData () {
  schemaGroup.value = store.getGroupData.schema
  DataGroup.value = store.getGroupData.data
}

function handleChange () {
  store.setGroupData(schemaGroup.value, 'schema')
  store.setGroupData(DataGroup.value, 'data')
  emit('change')
}

defineExpose({
  setData
})

</script>

<template>
  <div class="mbt-modeler-grounp-schema-wrap">
    <VueForm
      :schema="schemaGroup"
      v-model="DataGroup"
      @change="handleChange">
      <div slot-scope="{ DataGroup }"></div>
    </VueForm>
  </div>
</template>