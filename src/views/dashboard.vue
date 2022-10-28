<script lang="ts">
export default {name: 'Dashboard'}
</script>

<script setup lang="ts">
import EchartsModel from '@/components/EchartsModel.vue'
import { reactive, ref } from 'vue';
interface FormState {
  'range-time-picker': [string, string];
}
const formState = reactive({} as FormState);
const options=ref([
  {label:"today",value:"today"},
  {label:"This week",value:"This week"},
  {label:"Last 30 minutes",value:"Last 30 minutes"},
  {label:"Last 1 hour",value:"Last 1 hour"},
  {label:"Last 24 hour",value:"Last 24 hour"},
  {label:"Last 7 day",value:"Last 7 day"},
  {label:"Last 30 day",value:"Last 30 day"},
])
const choseData=ref("")
</script>

<template>
  <section class="block shadow flex-start" style="width: 100%; height: 100%; color: var(--gray); flex-direction: column;" >
    <a-row style="width:100%; border:1px solid red ;height:50%">
      step
    </a-row>
    <a-row>
      <a-col :span="18" style="fontSize:20px;fontWeight:700">Data monitoring</a-col>
      <a-col :span="5" style="display:flex">
        
          <a-select 
          :options="options"
          v-model:value="choseData"
          ></a-select>
          <!-- <a-range-picker
            v-model:value="formState['range-time-picker']"
            show-time
            format="YYYY-MM-DD HH:mm:ss"
            value-format="YYYY-MM-DD HH:mm:ss"
          /> -->
          <a-button type="primary">search</a-button>

      </a-col>
    </a-row>
    <a-row style="height:38%;display: flex; justify-content: space-between;margin-top: 1.25rem;">
      <a-col :span="10" style="backgroundColor:origin ; border:1px solid red">
        <echarts-model></echarts-model>
      </a-col>
      <a-col :span="10" style="backgroundColor:origin">Line Chart2</a-col>
    </a-row>
  </section>
</template>

<style>
</style>