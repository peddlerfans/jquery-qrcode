<template>
  <div class="schema-form-item">
    <div class="input-wrap">
      <a-input v-model:value="text" @change="inputChange"></a-input>
    </div>
    <a-form-item-rest>
      <div class="condition-wrap" :class="show ? 'showStyle' : 'hideStyle'">
        <a-button
            class="opt-btn"
            type="link"
            @click="show = !show"
        >{{ show ? 'hide' : 'show' }}</a-button>
        <mbt-modeler-condition-edit
            :key="1"
            :form-datas="props.options"
            :rules-data="result"
            @rulesChange="handleChange"
        ></mbt-modeler-condition-edit>
      </div>
    </a-form-item-rest>
  </div>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import MbtModelerConditionEdit from "@/views/mbt-modeler-condition-edit.vue";
import _ from "lodash";

const emit = defineEmits(['update:modelValue'])

interface Props {
  modelValue: any
  options: any,
  rulesData: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: {},
  rulesData: [],
  options: []
})

const show = ref<boolean>(true)
const result = ref(_.cloneDeep(props.modelValue.condition))
const text = ref<string>(props.modelValue.description)

watch(
    () => props.modelValue,
    (val) => {
      result.value = val.condition || props.rulesData
      text.value = val.description
}, {
  immediate: true
})

function inputChange() {
  emit('update:modelValue', {
    description: text.value,
    condition: result.value
  })
}

function handleChange(rules: any) {
  result.value = rules
  emit('update:modelValue', {
    description: text.value,
    condition: result.value
  })
}

</script>

<style scoped lang="less">
.schema-form-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  .input-wrap {
    margin-bottom: 8px;
  }
  .condition-wrap {
    position: relative;
    overflow: hidden;
    transition: height 3s ease-in-out;
    .opt-btn {
      position: absolute;
      right: 0;
      top: 0;
      z-index: 6;
    }
  }
  .hideStyle {
    height: 30px;
  }
}
</style>