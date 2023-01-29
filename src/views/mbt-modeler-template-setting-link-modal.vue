<template>
  <a-modal
      v-model:visible="props.show"
      :footer="null"
      :title="info ? '修改引用' : '添加引用'"
      @cancel="closeModal">
    <a-form :model="linkInfo" :rules="rules" @finish="add">
      <a-form-item label="引用名称" name="name" :label-col="{span: 5}">
        <a-input v-model:value="linkInfo.name"></a-input>
      </a-form-item>
      <a-form-item label="链接" name="url" :label-col="{span: 5}">
        <a-input v-model:value="linkInfo.url"></a-input>
      </a-form-item>
      <a-form-item>
        <div class="btn-wrap">
          <a-button type="primary" html-type="submit">{{ info ? '修改' : '添加' }}</a-button>
          <a-button @click="closeModal">取消</a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import {ref, watch} from "vue";
import {message, Modal} from "ant-design-vue";
import {checkUrl} from '@/utils/validator'
import {Rule} from "ant-design-vue/es/form";

interface Props {
  show: boolean,
  infoIndex: number,
  info: any
}

interface LinkInfo {
  url: string,
  name: string
}

watch(
    () => props.show,
    (val) => {
      if (props.info && val) {
        linkInfo.value = {
          url: props.info.url,
          name: props.info.name,
        }
        console.log(props.infoIndex)
      }
    }
)

const props = withDefaults(defineProps<Props>(), {
  show: false,
})

const rules: Record<string, Rule[]> = {
  url: [{ required: true, validator: checkUrl, trigger: 'blur' }]
}

const emit = defineEmits(['close', 'add', 'update'])
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
  if (props.info) {
    emit('update', {
      info: linkInfo.value,
      index: props.infoIndex
    })
    message.success('修改成功！')
    closeModal()
  } else {
    emit('add', linkInfo.value)
    message.success('添加成功！')
    closeModal()
  }
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