<script setup lang="ts">
import { MbtModeler } from "@/composables/MbtModeler";
import { Stencil } from "@/composables/stencil";
import * as joint from "jointjs";
import { dia } from "jointjs";
import { ref, onMounted, onUpdated, watchEffect, watch, reactive } from "vue";
import type { Ref } from "vue";
import $ from "jquery";
import { red, volcano, gold, yellow, lime, green, cyan, blue, geekblue, purple, magenta, grey } from '@ant-design/colors';
interface FormState {
  awname: string;
  description: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  awname: '',
  description: '',
  remember: true,
});
const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

const canvas = ref(HTMLElement);
const stencilcanvas = ref(HTMLElement);
const infoPanel = ref(HTMLElement);
let showPropPanel: Ref<boolean> = ref(false);

function onClose() {
  showPropPanel.value = false;
}

function onShow(cell?: any) {

  showPropPanel.value = true;
}

var verticesTool = new joint.linkTools.Vertices();
var segmentsTool = new joint.linkTools.Segments();
var boundaryTool = new joint.linkTools.Boundary();
var removeButton = new joint.elementTools.Remove();
// var connectButton = new joint.elementTools.Connect();
// 2) creating a tools view
var toolsView = new joint.dia.ToolsView({
  name: 'basic-tools',
  tools: [verticesTool, segmentsTool, boundaryTool]
});



let modeler: MbtModeler;
let stencil: Stencil;

// watchEffect(async () => {
//   const response = await fetch(url.value)
//   data.value = await response.json()
// })
onMounted(() => {

  stencil = new Stencil(stencilcanvas);
  modeler = new MbtModeler(canvas);
  // element.addTo(graph);
  // 1) creating link tools


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

    let flyShape = cellView.model!.clone();

    let pos = cellView.model!.position();

    let offset = {
      x: x - pos.x,
      y: y - pos.y,
    };


    flyShape.position(0, 0);
    // flyShape.position();
    flyGraph.addCell(flyShape);


    $("#flyPaper").offset({
      left: (e.pageX as number) - offset.x,
      top: (e.pageY as number) - offset.y,
    });

    $("body").on("mousemove.fly", (e: any) => {
      $("#flyPaper").offset({
        left: (e.pageX as number) - offset.x,
        top: (e.pageY as number) - offset.y,
      });
    });

    $("body").on("mouseup.fly", (e: any) => {

      var x = e.pageX,
        y = e.pageY,
        target = modeler.paper.$el.offset();

      let paperwidth: number = modeler.paper.$el.width();
      let paperheight: number = modeler.paper.$el.height();
      let targetwidth = target.left + paperwidth;
      let targetheight = target.top + paperheight;

      if (x > target.left && x < targetwidth && y > target.top && y < targetheight) {
        var s = flyShape.clone();
        s.position(
          x - target.left - offset.x,
          y - target.top - offset.y
        );

        modeler.graph.addCell(s);
        // var currentElementView = s.findView(modeler.paper);
        // s.attr('body/stroke', 'red');



      }
      $("body").off("mousemove.fly").off("mouseup.fly");
      flyShape.remove();
      $("#flyPaper").remove();
    });
  });
  // modeler.paper.on('element:pointerdblclick', function (elementView: dia.ElementView) {
  //   console.log(elementView);
  //   if (elementView.hasTools() == false)
  //     elementView.addTools(toolsView);

  // });


});

</script>

<template>
  <section class="block shadow flex-center" style="
      width: 100%;
      height: 100%;
      min-height: 100%;
      color: var(--gray);
      font-size: 5rem;
      overflow: hidden;
    ">
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
    <!-- <SplitPanel> -->
    <a-row type="flex" style="
      width: 100%;
      height: 100%;
      min-height: 100%;">
      <a-col :span="2">
        <div class="stencil" ref="stencilcanvas"></div>
      </a-col>
      <a-col :span="16">
        <div class="canvas" ref="canvas"></div>
      </a-col>
      <a-col :span="6">
        <div class="infoPanel" ref="infoPanel">
          <a-form :model="formState" name="mbt" :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" autocomplete="off"
            @finish="onFinish" @finishFailed="onFinishFailed">
            <a-form-item label="Name" name="awname"
              :rules="[{ required: true, message: 'Please input your aw name!' }]">
              <a-input v-model:value="formState.awname" />
            </a-form-item>

            <a-form-item label="Description" name="description"
              :rules="[{ required: true, message: 'Please input your description!' }]">
              <a-input v-model:value="formState.description" />
            </a-form-item>

            <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
              <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
            </a-form-item>

            <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
              <a-button type="primary" html-type="submit">Submit</a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-col>
    </a-row>
    <!-- <template #left-content>
        <div class="stencil" ref="stencilcanvas"></div>
      </template>
      <template #right-content>
        <div class="canvas" ref="canvas"></div>
      </template> -->
    <!-- </SplitPanel> -->
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

.infoPanel {
  height: 100%;
  overflow: hidden;
  position: relative;
  margin: 10px;
  width: 100%;
  /* min-height: 100%; */
  background-color: #f0f5ff;
}

.stencil {
  height: 100%;
  overflow: hidden;
  position: relative;
  margin: 10px;
  width: 100px;
  background-color: #222222;
}

.split-wrapper .scalable {
  width: 20px;
  max-width: 5vw;
  overflow: hidden;
}
</style>
