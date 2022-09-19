<script setup lang="ts">
import { ref, reactive, computed, onBeforeMount, UnwrapRef } from 'vue';
import type { FormProps, TreeProps } from 'ant-design-vue';
import {
  SyncOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  SwapOutlined,
} from '@ant-design/icons-vue';
import { Tree, Dropdown, Space, Tooltip, Modal, Alert, Menu } from 'ant-design-vue';

import { SplitPanel } from '@/components/basic/split-panel';
import request from "@/utils/request"
import { FormState } from './componentTS/awmodeler';
// 表单查询的数据
const formState: UnwrapRef<FormState> = reactive({
      search: ''
});
// 表单完成后的回调
const handleFinish: FormProps['onFinish'] = async (values: any) => {
  console.log(formState.search);  
};
// 表单失败后的回调
const handleFinishFailed: FormProps['onFinishFailed'] = (errors: any) => {
      console.log(errors);
};
// 控制模态窗的开关
const visible=ref(false)
// 打开模态窗的函数
const showModal = () => {
  visible.value = true;      
};
</script>

<template>
  <main style="height:100%;overflow-x: hidden!important;">
      <header>
        <a-row>
        <a-col :span="20">
          <AForm layout="inline" class="search_form" :model="formState" @finish="handleFinish"
            @finishFailed="handleFinishFailed" :wrapper-col="{ span: 24 }">
            <a-col :span="20">

              <a-mentions v-model:value="formState.search"
                placeholder="input @ to search tags, input name to search MBT">
                <a-mentions-option value="tags:">
                  tags:
                </a-mentions-option>
              </a-mentions>
            </a-col>

            <a-col :span="4">
              <a-button type="primary" html-type="submit">search</a-button>
            </a-col>

          </AForm>
        </a-col>
        <a-col :span="4">
          <a-button type="primary" @click="showModal">
            <template #icon>
              <plus-outlined />
            </template>
          </a-button>
        </a-col>
      </a-row>
      </header>
      <a-table>
        
      </a-table>
  </main>
</template>

<style scoped lang="postcss">
.main {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>