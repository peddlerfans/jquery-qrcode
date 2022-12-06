<script lang="ts">
export default { name: 'Account' }
</script>
<script setup lang="ts">
import MbtServe from "@/composables/mbtServe"
import { StencilService } from '@/composables/stencil';
import { ToolbarService } from '@/composables/Toolbar';
import { HaloService } from "@/composables/haloService";
import { InspectorService } from "@/composables/inspector";
import { KeyboardService } from "@/composables/keyboard";
import joint from "../../node_modules/@clientio/rappid/rappid.js"
import * as appShapes from "@/composables/JointJs/app-shapes"
import $ from 'jquery'
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
let rappid : MbtServe
let apps : HTMLElement | any= ref()
onMounted(()=>{
  console.log(apps.value.querySelector);
  
  rappid = new MbtServe(
    apps.value,
    new StencilService(),
    new ToolbarService(),
    new HaloService(),
    new InspectorService(),
    new KeyboardService()
  )
  rappid.startRappid()
})

</script>

<template>
  <main class="joint-app joint-theme-modern" ref="apps">
        <div class="app-header">
          <div class="app-title">
            <a-button-group>
              <span>
            <a-button type="primary" size="small" style="margin-right: 5px">
              {{ $t("common.saveText") }}
            </a-button>
          </span>
          <span>
              <a-button type="primary" size="small" style="margin-right: 5px">
                {{ $t("layout.multipleTab.preview") }}
              </a-button>
            </span>
            <span>
              <a-button danger size="small">
                {{ $t("layout.multipleTab.reload") }}
              </a-button>
            </span>
          </a-button-group>

          </div>
          <div class="toolbar-container"/>
        </div>
          <div class="app-body">
            <div ref="stencils" class="stencil-container"></div>
            <div class="paper-container"/>
            <div class="inspector-container"/>
            <div class="navigator-container"/>
          </div>

  </main>
</template>

<style lang="scss">

</style>
<style lang="scss">
@import "../../node_modules/@clientio/rappid/rappid.css";
@import '../composables/css/style.css';



</style>