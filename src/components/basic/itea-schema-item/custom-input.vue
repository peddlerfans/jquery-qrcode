<template>
  <div class="schema-form-item">
    <a-form :model="obj">
      <a-form-item :rules="[{ required: true, validator: checkVarName, trigger: 'blur' }]" name="text">
        <a-input v-model:value="obj.text" @change="handleChange"></a-input>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import {
  watch,
  ref
} from "vue";
import {checkVarName} from "@/utils/validator";

interface Props {
  modelValue: string
}

const emit = defineEmits(['update:modelValue'])

const obj = ref({
  text: ''
})
const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})

function handleChange () {
  emit('update:modelValue', obj.value.text)
}

watch(
    () => props.modelValue,
    (val: any) => {
      obj.value.text = val || ''
    },
    { immediate: true }
)
</script>

<style scoped lang="less">

</style>