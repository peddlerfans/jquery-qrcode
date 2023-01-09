<script setup lang="ts">
import {
  LeftOutlined,
  RightOutlined,
  CloseOutlined
} from '@ant-design/icons-vue'
import {
  ref,
  computed
} from 'vue'
import { errTipTool } from "@/stores/modules/modeler-preview-err-msg";

let index = ref<number>(0)
const store = errTipTool()

const currentErr: any = computed(() => {
  return store.getErrList[index.value]
})

const pre = () => {
  if (index.value === 0) return
  index.value--
}

const next = () => {
  if (index.value === store.getLength - 1) return
  index.value++
}

const solve = () => {

}

const close = () => {
  store.setVisible(false)
}

</script>

<template>
  <div class="mbt-modeler-preview-err-tips">
    <close-outlined class="close-btn" @click="close" />
    <div class="title">预览错误：{{ `${index + 1} / ${store.getLength}`}}</div>
    <div class="content">
<!--      <left-outlined class="tips-icon" @click="pre" />-->
      <div class="container">
        <span>{{ currentErr?.reason || '' }}</span>
      </div>
<!--      <right-outlined class="tips-icon" @click="next" />-->
    </div>
    <div class="bottom-btn">
<!--      <a-button type="link" @click="solve">定位问题</a-button>-->
      <a-button type="link" @click="pre" :disabled="index <= 0">上个错误</a-button>
      <a-button type="link" @click="next" :disabled="index + 1 >= store.getLength">下个错误</a-button>
    </div>
  </div>
</template>


<style lang="less">
.mbt-modeler-preview-err-tips {
  z-index: 9;
  position: fixed;
  margin-left: 24px;
  left: 0;
  bottom: 24px;
  width: 384px;
  max-width: calc(100vw - 48px);
  padding: 16px 24px;
  overflow: hidden;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
  .title {
    color: #333;
    margin-bottom: 12px;
    font-size: 16px;
    line-height: 16px;
  }
  .content {
    color: #333;
    line-height: 14px;
    display: flex;
    align-content: center;
    .container {
      line-height: 1.5;
    }
    .tips-icon {
      color: #3e85c7;
      cursor: pointer;
      padding: 4px;
    }
  }
  .bottom-btn {
    display: flex;
    justify-content: flex-end;
  }
  .close-btn {
    position: absolute;
    top: 16px;
    right: 24px;
    cursor: pointer;
  }
}
</style>