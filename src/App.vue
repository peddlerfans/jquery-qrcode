<script setup lang="ts">
import enUS from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import { useLocaleStore } from '@/stores/modules/locale'
import { errTipTool } from "@/stores/modules/modeler-preview-err-msg";
import MbtModelerPreviewErrTips from "@/views/mbt-modeler-preview-err-tips.vue";

const store = errTipTool()

dayjs.locale('en')

const local = useLocaleStore()

</script>
<template>
  <AConfigProvider :locale="local.getLocale">
    <RouterView />
  </AConfigProvider>
  <transition name="slide-left">
    <mbt-modeler-preview-err-tips
        v-if="store.getVisible"
    ></mbt-modeler-preview-err-tips>
  </transition>
</template>