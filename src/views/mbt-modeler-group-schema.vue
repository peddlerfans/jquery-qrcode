<script setup lang="ts">
import {
  ref
} from "vue";

let DataGroup = ref({
  description: '',
  loopCount: ''
})

</script>

<template>
  <div class="mbt-modeler-grounp-schema-wrap">
    <VueForm
      v-show="show"
      :schema="schemaGroup"
      v-model="DataGroup"
      @change = 'changeGroup'
    ></VueForm>
  </div>
</template>