<template>
    <a-modal v-model:visible="props.instructionsVisible" :keyboard="true">
    <a-steps :current="current">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>
    <div class="steps-content">
        点击选择模板后，在Attributes中设置代码生成的模板，在meta中选择用例元数据的模板，在Data Pool中选择数据的模板，在Resources中设置资源
      <img src="../assets/gif/awCell.gif" style="width:200px;height:100px" alt="">
    </div>
    <div class="steps-action">
      <a-button v-if="current < steps.length - 1" type="primary" @click="next">Next</a-button>
      <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="message.success('Processing complete!')"
      >
        Done
      </a-button>
      <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">Previous</a-button>
    </div>
  </a-modal>
</template>

<script setup lang='ts'>
import {message} from 'ant-design-vue'
import { watch ,ref} from 'vue';

interface Props {
  instructionsVisible: boolean
}
const props = withDefaults(defineProps<Props>(), {
    instructionsVisible: false
})
let instructionsVisible = props.instructionsVisible

let steps = ref([
        {
          title: 'First',
          content: 'First-content',
        },
        {
          title: 'Second',
          content: 'Second-content',
        },
        {
          title: 'Last',
          content: 'Last-content',
        },
      ],)
const current = ref<number>(0);
    const next = () => {
      current.value++;
    };
    const prev = () => {
      current.value--;
    };
</script>

<style lang="scss" scoped>

</style>