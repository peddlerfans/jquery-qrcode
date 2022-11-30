<template>
  <div class="joint-app joint-theme-modern" ref="app">
    <div class="app-header">
      <div class="app-title">
        <h1>JointJS+</h1>
      </div>
      <div class="toolbar-container"/>
    </div>
    <div class="app-body">
      <div class="stencil-container"/>
      <div class="paper-container"/>
      <div class="inspector-container"/>
      <div class="navigator-container"/>
    </div>
  </div>
</template>

<script lang="ts" setup>

// import rappid services
import RappidService from "@/composables/jointJs/kitchensink-service";
import {StencilService} from "@/composables/jointJs/stencil-service";
import {ToolbarService} from "@/composables/jointJs/toolbar-service";
import {InspectorService} from "@/composables/jointJs/inspector-service";
import {HaloService} from "@/composables/jointJs/halo-service";
import {KeyboardService} from "@/composables/jointJs/keyboard-service";

import {ThemePicker} from "@/composables/jointJs/theme-picker"
import {sampleGraphs} from "@/composables/jointJs/sample-graphs";
import { onMounted } from 'vue';

let app!: HTMLElement

let rappid: RappidService;

onMounted(() => {
    rappid = new RappidService(
            app,
            new StencilService(),
            new ToolbarService(),
            new InspectorService(),
            new HaloService(),
            new KeyboardService()
    );

    rappid.startRappid();

    const themePicker = new ThemePicker({ mainView: rappid });
    themePicker.render().$el.appendTo(document.body);

    rappid.graph.fromJSON(JSON.parse(sampleGraphs.emergencyProcedure));
  })
</script>

<style lang="scss">
  /*import rappid styles*/
  @import "@clientio/rappid/rappid.css";
  @import "@/composables/css/style.css";
  @import "@/composables/css/theme-picker.css";
  @import "@/composables/css/style.dark.css";
  @import "@/composables/css/style.material.css";
  @import "@/composables/css/style.modern.css";
</style>
