<template>
  <div class="schema-form-item">
    <div class="input-wrap">
      <div class="title"></div>
      <a-input v-model:value="text"></a-input>
    </div>
    <div class="condition-wrap">
      <mbt-modeler-condition-edit
          :key="1"
          :form-datas="props.formData"
          :rules-data="props.rulesData"
          @rulesChange="handleChange"
      ></mbt-modeler-condition-edit>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import MbtModelerConditionEdit from "@/views/mbt-modeler-condition-edit.vue";

const emit = defineEmits(['update:modelValue'])

interface Props {
  modelValue: string,
  formData: any,
  rulesData: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  formData: [],
  rulesData: []
})

const text = ref<string>('')

function handleChange(rules: any) {

}

</script>

<style scoped lang="less">
.schema-form-item {
  display: flex;
  align-items: center;
}
</style>