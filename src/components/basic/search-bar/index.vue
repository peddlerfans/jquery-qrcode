<script setup lang="ts">
import {nextTick, ref} from "vue";
import request from "@/utils/request";

interface Props {
  url: string,
  params: any
}

const emit = defineEmits(['search'])

const props = withDefaults(defineProps<Props>(), {
  url: '',
  params: null
})

let searchText = ref('')
let cascader = ref(false)
let searchInput = ref()
let selectOption = ref<any>('')
let selectOptions: any = ref([
  {
    value: 'tags:',
    label: 'tags:',
    isLeaf: false,
  },
  {
    value: 'name:',
    label: 'name:',
  },
])

function inputChange () {
  cascader.value = searchText.value === '@'
}

function loadData (selectedOptions: any) {
  request.get(props.url, {
    params: props.params
  }).then((rst) => {
    const targetOption = selectedOptions[0]
    targetOption.loading = true
    if (rst.length > 0) {
      rst = rst.map((item: any) => ({ value: item, label: item }))
      targetOption.children = rst
    }
    targetOption.loading = false
    selectOptions.value = [...selectOptions.value]
  })
}

function onSelectChange (value: any) {
  if (value) {
    let reg = new RegExp(',' ,'g')
    searchText.value += value.toString().replace(reg,'')
  }
  selectOption.value = ''
  cascader.value = false
  nextTick(() => {
    searchInput.value.focus()
  })
}

function search () {
  emit('search', searchText.value)
}

</script>

<template>
  <div class="search-wrap">
   <div class="search">
     <a-input v-model:value="searchText"
              :placeholder="$t('awModeler.inputSearch1')"
              @change="inputChange"
              @keydown.enter="inputChange"
              ref="searchInput"
     ></a-input>
     <a-cascader
         v-show="cascader"
         :load-data="loadData"
         v-model:value="selectOption"
         placeholder="Please select"
         :options="selectOptions"
         @change="onSelectChange"
     ></a-cascader>
   </div>
    <a-button type="primary" class="save-btn" @click="search">
      {{ $t("common.searchText") }}
    </a-button>
  </div>
</template>

<style scoped lang="less">
.search-wrap {
  display: flex;
  margin-bottom: 12px;
  .search {
    width: 100%;
  }
  .save-btn {
    margin-left: 8px;
  }
}
</style>