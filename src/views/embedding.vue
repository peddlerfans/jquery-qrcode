<script setup lang="ts">
import {ref} from "vue";

let url = ref<string>('')
let keyword = ref<string>('')

function search() {
  const iframe = document.getElementsByTagName('iframe')[0]
  url.value = keyword.value
  iframe.contentWindow?.window.location.reload()
}

</script>

<template>
  <div style="display: flex; margin-bottom: 8px;">
    <a-input v-model:value="keyword" style="margin-right: 8px;"></a-input>
    <a-button @click="search">搜索</a-button>
  </div>
  <iframe name="embedded" :src="url" style="height: calc(100% - 50px); width: 100%;"></iframe>
</template>