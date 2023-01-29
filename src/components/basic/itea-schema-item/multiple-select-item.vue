<template>
  <div class="schema-form-item">
    <a-select
      :options="options"
      allowClear
      mode="tags"
      v-model:value="selectValue"
      @change="selectChange"
    ></a-select>
  </div>
</template>

<script setup lang="ts">
import {
  watch,
  ref
} from "vue";

const emit = defineEmits(['update:modelValue'])
interface Props {
  modelValue: string,
  options: any
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: []
})

const selectValue = ref([])

function selectChange () {
  emit('update:modelValue', selectValue.value)
}

watch(
    () => props.modelValue,
    (val: any) => {
      selectValue.value = val || []
    },
    { immediate: true }
)

</script>

<style scoped lang="less">

</style>