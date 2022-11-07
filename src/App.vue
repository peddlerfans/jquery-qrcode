<script setup lang="ts">
import enUS from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
import { useLocaleStore } from '@/stores/modules/locale'
dayjs.locale('en')

const local = useLocaleStore()

</script>
<template>
  <AConfigProvider :locale="local.getLocale">
    <RouterView />
  </AConfigProvider>
</template>