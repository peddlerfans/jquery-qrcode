<script setup lang="ts">
import { MbtModeler } from "@/composables/MbtModeler";
import { Stencil } from "@/composables/stencil";
import * as joint from "jointjs";
import {dia} from 'jointjs'
import { ref, onMounted } from "vue";
import type { Ref } from "vue";
import $ from 'jquery';
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

let modeler:MbtModeler;
let stencil:Stencil;
onMounted(() => {
  // init()
  stencil = new Stencil(stencilcanvas);
  modeler = new MbtModeler(canvas);
  stencil.paper.on("cell:pointerdown", (cellView, e: dia.Event, x, y) => {
      $("body").append(
        '<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;"></div>'
      );
      let flyGraph = new joint.dia.Graph();
      let flyPaper = new joint.dia.Paper({
        el: $("#flyPaper"),
        model: flyGraph,
        interactive: false,
      });
      let flyShape = cellView.model!.clone(),
        pos = cellView.model!.position(),
        offset = {
          x: x - pos.x,
          y: y - pos.y,
        };

      // flyShape.position(0, 0);
      flyShape.position();
      flyGraph.addCell(flyShape);
      
        $("#flyPaper").offset({
          left: (e.pageX as number) - offset.x,
          top: (e.pageY as number) - offset.y,
        });
      

      $("body").on("mousemove.fly", (e:any)=> {
        $("#flyPaper").offset({
          left: (e.pageX as number) - offset.x,
          top: (e.pageY as number) - offset.y,
        });
      });

      $("body").on("mouseup.fly", (e:any)=> {
        var x = e.pageX,
          y = e.pageY,
          target = modeler.paper.$el.offset();
          

        // Dropped over paper ?
        if (
          (x as number) > target.left &&
          (x as number) < target.left + modeler.paper.$el.width() &&
          (y as number) > target.top &&
          (y as number) < target.top + modeler.paper.$el.height()
        ) {
          var s = flyShape.clone();
          // s.position(x as number- target.left - offset.x, y as number - target.top - offset.y);
          s.position();
          modeler.graph.addCell(s);
        }
        $("body").off("mousemove.fly").off("mouseup.fly");
        flyShape.remove();
        $("#flyPaper").remove();
      });
    });
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
