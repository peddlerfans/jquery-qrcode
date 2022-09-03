<script setup lang="ts">
import { MbtModeler } from "@/composables/MbtModeler";
import { Stencil } from "@/composables/stencil";
import * as joint from "jointjs";
// import {Paper} from 'jointjs'
import { ref, onMounted } from "vue";
import type { Ref } from "vue";

const canvas = ref(HTMLElement);
const stencilcanvas = ref(HTMLElement);
let showPropPanel: Ref<boolean> = ref(false);

function onClose() {
  showPropPanel.value = false;
}

function onShow(cell?: any) {
  console.log(cell);
  showPropPanel.value = true;
}

let modeler;
let stencil;
onMounted(() => {
  // init()
  stencil = new Stencil(stencilcanvas);
  modeler = new MbtModeler(canvas);
  modeler.paper.on("element:pointerclick", (event) => {
    console.log(event);
  });
});
</script>

<template>
  <section
    class="block shadow flex-center"
    style="
      width: 100%;
      height: 100%;
      min-height: 100%;
      color: var(--gray);
      font-size: 5rem;
    "
  >
    <!-- <div
      :style="{
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        border: '1px solid #ebedf0',
        borderRadius: '2px',

        textAlign: 'center',
        width: '100%',
      }"
    > -->
    <SplitPanel>
      <template #left-content>
        <div class="stencil" ref="stencilcanvas"></div>
      </template>
      <template #right-content>
        <div class="canvas" ref="canvas"></div>
      </template>
    </SplitPanel>
    <!-- <a-drawer
        title="Basic Drawer"
        placement="right"
        :closable="true"
        :visible="showPropPanel"
        :get-container="false"
        :style="{ position: 'absolute' }"
        @close="onClose"
      >
        <p>Some contents...</p>
      </a-drawer> 
    </div>-->
  </section>
</template>

<style scoped>
.canvas {
  margin: 10px;
}
.stencil {
  height: "100%";
  overflow: "hidden";
  position: "relative";
  margin: 10px;
  width: 100px;
  background-color: #47cf73;
}

.split-wrapper  .scalable {
     
      width: 20px;
      max-width: 5vw;
      
     
    }
  
</style>
