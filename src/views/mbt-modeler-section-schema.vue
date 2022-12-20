<script setup lang="ts">
import {
  ref
} from "vue";

let DataSection = ref({
  description:''
})

</script>

<template>
  <div class="mbt-modeler-section-schema-wrap">
    <VueForm
      v-show="showSection"
      :schema="schemaSection"
      v-model="DataSection"
      @change = 'changeSection'
    ></VueForm>
  </div>
</template>