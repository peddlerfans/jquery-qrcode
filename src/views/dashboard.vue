<script lang="ts">
export default {name: 'Dashboard'}
</script>

<script setup lang="ts">
import EchartsModel from '@/components/EchartsModel.vue'
</script>

<template>
  <section class="block shadow flex-start" style="width: 100%; height: 100%; color: var(--gray); flex-direction: column;" >
    <a-row style="width:100%; border:1px solid red ;height:50%">
      step
    </a-row>
    <a-row style="height:38%;display: flex; justify-content: space-between;margin-top: 1.25rem;">
      <a-col :span="5" style="backgroundColor:origin ; border:1px solid red">
        <echarts-model></echarts-model>
      </a-col>
      <a-col :span="5" style="backgroundColor:origin">Line Chart2</a-col>
      <a-col :span="5" style="backgroundColor:origin">Line Chart3</a-col>
      <a-col :span="5" style="backgroundColor:origin">Line Chart4</a-col>
    </a-row>
  </section>
</template>

<style>
</style>