<template>
  <div class="schema-form-item">

  </div>
</template>

<script setup lang="ts">

const emit = defineEmits(['update:modelValue'])

interface Props {
  modelValue: string,
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
})

</script>

<style scoped lang="less">
.schema-form-item {
  display: flex;
  align-items: center;
}
</style>