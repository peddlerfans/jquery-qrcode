<template>
  <a-modal
      v-model:visible="props.show"
      :footer="null"
      title="添加超链接"
      @cancel="closeModal">
    <a-form :model="linkInfo">
      <a-form-item label="超链接名称" name="name">
        <a-input v-model:value="linkInfo.name"></a-input>
      </a-form-item>
      <a-form-item label="连接" name="url">
        <a-input v-model:value="linkInfo.url"></a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" @click="add">添加</a-button>
        <a-button @click="closeModal">取消</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {message, Modal} from "ant-design-vue";

interface Props {
  show: boolean
}

interface LinkInfo {
  url: string,
  name: string
}

const props = withDefaults(defineProps<Props>(), {
  show: false
})

const emit = defineEmits(['close', 'add'])
let linkInfo = ref<LinkInfo>({
  url: '',
  name: ''
})

function closeModal() {
  emit('close')
  linkInfo.value = {
    url: '',
    name: ''
  }
}

function add() {
  emit('add', linkInfo.value)
  message.success('添加成功！')
  closeModal()
}

</script>

<style scoped>

</style>