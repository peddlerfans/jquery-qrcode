<script setup lang="ts">
import {
  ref,
  watch
} from 'vue'

const emit = defineEmits(['update:modelValue'])
let inputRef = ref({
  val: '',
  type: '1'
})
let flag = ref(false)
interface Props {
  modelValue: string,
  options: any
}

watch(
    () => props.modelValue,
    (val: any) => {
      if (!val) return
      inputRef.value.type = val.type || inputRef.value.type
      flag.value = inputRef.value.type === '2'
      inputRef.value.val = val.val || inputRef.value.val
    },
    { immediate: true }
)

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: []
})

function switchChange (e: any) {
  inputRef.value.type = e ? '2' : '1'
}

function handleChange (e: any) {
  inputRef.value.val = e
  emit('update:modelValue', inputRef.value)
}

function handleInput(e: any) {
  const tar = (e.target as HTMLInputElement).value
  inputRef.value.val = tar
  emit('update:modelValue', inputRef.value)
}

</script>

<template>
    <div class="schema-form-item">
      <a-switch
          v-model:checked="flag"
          class="schema-switch"
          @change="switchChange"
          checked-children="自定义"
          un-checked-children="选项"
      ></a-switch>
      <a-select
          v-if="!flag"
          :value="inputRef.val"
          @change="handleChange"
          :options="options"
      ></a-select>
      <a-input
          v-if="flag"
          :value="inputRef.val"
          @input="handleInput"
      ></a-input>
    </div>
</template>

<style scoped lang="less">
.schema-form-item {
  display: flex;
  align-items: center;
  .schema-switch {
    margin-right: 8px;
    width: 80px;
  }
}
</style>
