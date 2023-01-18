<template>
  <a-modal
      v-model:visible="props.show"
      :footer="null"
      title="添加超链接"
      @cancel="closeModal">
    <a-form :model="linkInfo" :rules="rules" @finish="add">
      <a-form-item label="超链接名称" name="name" :label-col="{span: 5}">
        <a-input v-model:value="linkInfo.name"></a-input>
      </a-form-item>
      <a-form-item label="链接" name="url" :label-col="{span: 5}">
        <a-input v-model:value="linkInfo.url"></a-input>
      </a-form-item>
      <a-form-item>
        <div class="btn-wrap">
          <a-button type="primary" html-type="submit">添加</a-button>
          <a-button @click="closeModal">取消</a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {message, Modal} from "ant-design-vue";
import {checkUrl} from '@/utils/validator'
import {Rule} from "ant-design-vue/es/form";

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

const rules: Record<string, Rule[]> = {
  url: [{ required: true, validator: checkUrl, trigger: 'blur' }]
}

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

<style scoped lang="less">
.btn-wrap {
  text-align: right;
  .ant-btn {
    margin-left: 8px;
  }
}
</style>