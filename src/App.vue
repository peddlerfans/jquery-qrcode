<script setup lang="ts">
import enUS from 'ant-design-vue/es/locale/en_US'
import dayjs from 'dayjs'
import 'dayjs/locale/en'
dayjs.locale('en')

const locale = enUS
</script>
<template>
  <AConfigProvider :locale="locale">
    <RouterView />
  </AConfigProvider>
</template>