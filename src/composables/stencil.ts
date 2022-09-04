import * as joint from "jointjs";
import { dia } from "jointjs";

// import * as $ from 'jquery';
// import $ from "jquery";
// import { Ref, ref } from "vue";

export class Stencil {
  states: object;
  linkAttrs: object = {};
  transitions: [] = [];
  paper: dia.Paper;
  graph: dia.Graph = new joint.dia.Graph();

  constructor(canvas: any) {
    let s0 = new joint.shapes.uml.StartState({
      position: { x: 10, y: 10 },
      size: { width: 30, height: 30 },
      attrs: {
        circle: {
          fill: "#4b4a67",
          stroke: "none",
        },
      },
    });




    let se = new joint.shapes.uml.EndState({
      position: { x: 10, y: 50 },
      size: { width: 30, height: 30 },
      attrs: {
        ".outer": {
          stroke: "#4b4a67",
          "stroke-width": 2,
        },
        ".inner": {
          fill: "#4b4a67",
        },
      },
    });

    this.states = {};
    Object.assign(this.states, { s0: s0 });
 
    Object.assign(this.states, { se: se });

    this.paper = new joint.dia.Paper({
      el: canvas.value,
      model: this.graph,
      width: "100%",
      height: "100%",
      gridSize: 10,
      drawGrid: true,
      interactive: false
    });
    

    Object.keys(this.states).forEach((key: string) => {

      this.graph.addCell(this.states[key as keyof typeof this.states]);
    });

    this.linkAttrs = {};
    Object.assign(this.linkAttrs, {
      fill: "none",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      stroke: "#4b4a67",
    });
    
  }
}


