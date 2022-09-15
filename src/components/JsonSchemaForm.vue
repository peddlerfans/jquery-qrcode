<script lang="ts" setup>

import VueForm from '@lljj/vue3-form-ant';
import { modelValueComponent } from '@lljj/vue3-form-ant';
import { update } from 'lodash';
import { awStore } from '../stores/aw'
import { Stores } from "types/stores"
import { ref, reactive,onMounted,computed,watch ,toRefs} from 'vue';
import { Store } from 'pinia';
const awstore = awStore()
const formData = ref({
    "name":"nice",
    "description":"plano",
    "tags":["a","b"],
    "params":[{"name":"par1","type":"str"}]
});
// defineProps<{
//     formData: object
// }>()
// const MyFixInputComponent = modelValueComponent('a-input', {
//     model: 'value' // 这里要根据ant组件 model的参数传递
// });
interface Props {
    awname: String 
  }

const props = defineProps<Props>()
// const { formData } = toRefs(props);
// const normalizedData =
//  watch(props.awname,(newvalue:Stores.aw,oldvalue) => {
//     console.log('watch formdata:',formData, ",oldval:",oldvalue)
//     console.log('watch oldvalue:',oldvalue)
//     console.log('watch newvalue:',newvalue)
//     awstore.getAwInfo(newvalue);
//     formData = newvalue;
//  });
// const fd = computed((newvalue)=>{
//     console.log('schema form:',newvalue)
//     awstore.getAwInfo(newvalue);
// })
// onMounted(()=>{
//     console.log('mounted in schema form:',props.formData)
//     awstore.getAwInfo(props.formData);
//     // console.log('schema form:',newvalue)
//     // awstore.getAw();
// })
// onMounted(() => {
//         nextTick(() => (showRef.value = true));
//       });
//  function updateCurrentProcess(newVal:any){
//     props.formData= newVal.formData
// }
//     console.log('inner:',props.formData,',  old value:',oldvalue, ', new value:',newvalue);
//     return props.formData})
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
            "type": "string",
            "readOnly": true
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

// const uiSchema = reactive({
//   bio: {
//     'ui:options': {
//       placeholder: '请输入你的签名',
//         type: 'textarea',
//           rows: 1
//     }
//   }
// })
// onMounted(() => {
//    console.log('json schema form:',this.formData) 
// }),

// updateCurrentProcess(props.formData)

</script>

<template>
  <div style="height:100%;overflow-y: auto;">
    <!-- --{{props.formData}} -->
    ++{{formData}}
<VueForm
    v-model="formData"
    :schema="schema"
>
</VueForm>
</div>
</template>