<script setup lang="ts">
import {
  ref
} from "vue";
import MbtModelerAwSchema from './mbt-modeler-aw-schema.vue'
import MbtModelerLinkSchema from './mbt-modeler-link-schema.vue'
import MbtModelerGroupSchema from './mbt-modeler-group-schema.vue'
import MbtModelerSectionSchema from './mbt-modeler-section-schema.vue'

let desc = ref<string>('')
let showAw = ref<boolean>(false)
let showLink = ref<boolean>(false)
let showGroup = ref<boolean>(false)
let showSection = ref<boolean>(false)

</script>

<template>
  <div class="mbt-modeler-right-modal-wrap">
    <div class="desc-wrap">
      <div class="title">描述：</div>
      <a-input v-model:value="desc"></a-input>
    </div>
    <a-divider />
    <mbt-modeler-aw-schema v-if="showAw"></mbt-modeler-aw-schema>
    <mbt-modeler-link-schema v-if="showLink"></mbt-modeler-link-schema>
    <mbt-modeler-group-schema v-if="showGroup"></mbt-modeler-group-schema>
    <mbt-modeler-section-schema v-if="showSection"></mbt-modeler-section-schema>
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