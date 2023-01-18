<script setup lang="ts">
import {
  ref,
  watch
} from 'vue'

const emit = defineEmits(['update:modelValue'])
interface Props {
  modelValue: string,
  options: any
}

const text = ref<string>('')
const showOpt = ref<boolean>(false)
const selectVal = ref<Array<string>>([])

watch(
    () => props.modelValue,
    (val: any) => {
      text.value = val || ''
    },
    { immediate: true }
)

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  options: []
})

function handleChange (e: any) {
  selectVal.value = []
  emit('update:modelValue', e.pop())
}

function handleBlur (){
  showOpt.value = false
}

function handleFocus () {
  showOpt.value = true
}

</script>

<template>
    <div class="schema-form-item">
      <a-form-item-rest>
        <a-select
            class="hide-line-select"
            v-model:value="selectVal"
            mode="tags"
            :open="showOpt"
            :options="options"
            @change="handleChange">
          <template #tagRender="{ value: val, label, closable, onClose, option }" >
            <span style="margin-left: 6px;">{{ label }}</span>
          </template>
        </a-select>
      </a-form-item-rest>
      <a-input
          v-model:value="text"
          @blur="handleBlur"
          @focus="handleFocus"
          class="show-line-input"
      ></a-input>
    </div>
</template>

<style scoped lang="less">
.schema-form-item {
  display: flex;
  align-items: center;
  position: relative;
  .show-line-input {
    position: absolute;
    top: 0;
    left: 0;
  }
  .schema-switch {
    margin-right: 8px;
    width: 80px;
  }
}
</style>
