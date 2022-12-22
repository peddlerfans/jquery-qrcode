<script setup lang="ts">
import {
  ref
} from "vue";
import VueForm from "@lljj/vue3-form-ant";
import {MbtData} from "@/stores/modules/mbt-data";

const store = MbtData()
const emit = defineEmits(['change'])

let DataSection = ref({
  description:''
})
let schemaSection = ref({})

function setData () {
  const temp = store.getSectionData
  DataSection.value = temp.section
  schemaSection.value = temp.schema
}

function handleChange () {
  store.setSectionData(DataSection.value, 'section')
  emit('change')
}

defineExpose({
  setData
})

</script>

<template>
  <div class="mbt-modeler-section-schema-wrap">
    <VueForm
      :schema="schemaSection"
      v-model="DataSection"
      @change="handleChange">
      <div slot-scope="{ DataSection }"></div>
    </VueForm>
  </div>
</template>