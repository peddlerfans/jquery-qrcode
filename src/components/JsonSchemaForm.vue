<script lang="ts" setup>

import VueForm from '@lljj/vue3-form-ant';

import { ref, reactive,onMounted } from 'vue';
const formData: object = ref({});
// defineProps<{
//     formData: object
// }>()
const schema = ref({
    "title": "AW Configuration",
    "description": "Configuration for the AW",
    "type": "object",
    "properties": {
        "name": {
            "title": "AW Name",
            "type": "string"
        },
        "description": {
            "title": "Description",
            "type": "string"
        },
        "tags": {
            "title": "tags",
            "type": "array",
            "items": {
                "title": "tag",
                "type": "string"
            }
        },
        "params": {
            "title": "Params",
            "items": {
                "type": "object",
                "properties": {
                    "name": {
                        "title": "name",
                        "type": "string"
                    },
                    "type": {
                        "title": "type",
                        "type": "string"
                    }
                }
            }
        }
    }
})
const schema1 = ref({
  
                type: 'object',
                required: [
                    'userName',
                    'age',
                ],
                properties: {
                    userName: {
                        type: 'string',
                        title: '用户名',
                        default: 'Liu.Jun',
                    },
                    age: {
                        type: 'number',
                        title: '年龄'
                    },
                    bio: {
                        type: 'string',
                        title: '签名',
                        minLength: 10,
                        default: '知道的越多、就知道的越少',
                        'ui:options': {
                            placeholder: '请输入你的签名',
                            type: 'textarea',
                            rows: 1
                        }
                    }
                }
})
const uiSchema = reactive({
  bio: {
    'ui:options': {
      placeholder: '请输入你的签名',
        type: 'textarea',
          rows: 1
    }
  }
})
// onMounted(() => {
    
// }),
</script>

<template>
  <div style="height:100%;overflow-y: auto;">
<VueForm
    v-model="formData"
    :schema="schema"
>
</VueForm>
</div>
</template>