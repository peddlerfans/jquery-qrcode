<script lang="ts">
    export default {name: 'mbtmodeler'}
</script>

<script setup lang="ts">
import * as joint from 'jointjs'
// import {Paper} from 'jointjs'
import {ref,onMounted} from 'vue'
import type { Ref } from 'vue'
import {dia ,util, config, g,Vectorizer,VElement,shapes,highlighters,env,
layout,mvc,routers,connectors,anchors,attributes,elementTools,linkTools} from 'jointjs'
const paper:Ref<dia.Paper | null> = ref(null);
 
const paper2:Ref<dia.Paper | null> = ref(null)
const canvas= ref(HTMLElement)
const canvas2 = ref(HTMLElement)


function init() {
    let graph = new joint.dia.Graph
    let graph2 = new joint.dia.Graph
    console.log('graph:',graph)
    
    paper.value = new joint.dia.Paper({ 
        el: canvas.value,
        model: graph,
        width: 900,
        height: 300,
        gridSize: 1
    })
    paper2.value = new joint.dia.Paper({
        el: canvas2.value,
        model: graph2,
        width: 900,
        height: 300,
        gridSize: 1
    })
    console.log('paper:',paper)
    let rect = new joint.shapes.standard.Rectangle()
    rect.position(100, 30)
    rect.resize(100, 40)
    rect.attr({
        body: {
            fill: 'blue'
        },
        label: {
            text: 'Start',
            fill: 'white'
        }
    })
    rect.addTo(graph)

    let rect2 = rect.clone()
    rect2.translate(300, 0)
    rect2.attr('label/text', 'End')
    rect2.addTo(graph)


    let link = new joint.shapes.standard.Link()
    link.source(rect)
    link.target(rect2)
    link.addTo(graph)
}
onMounted(() => {
    init()
})

</script>

<template>
      <section class="block shadow flex-center" style="width: 100%; min-height: 100%; color: var(--gray); font-size: 5rem;">
        <div class="canvas" ref="canvas"></div>
    <div class="canvas2" ref="canvas2"></div>
  </section>

</template>

<style>
.canvas {
    margin:10px;
    background-color:#3BA6F5;
}
.canvas2 {
    margin:10px;
    background-color:#F84C5D;
}
</style>