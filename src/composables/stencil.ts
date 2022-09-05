import * as joint from "jointjs";
import { dia } from "jointjs";

export class Stencil {
  states: object;
  linkAttrs: object = {};
  transitions: [] = [];
  paper: dia.Paper;
  graph: dia.Graph = new joint.dia.Graph();
  bodyAttributes = {
    fill: "#FCFCFC",
    stroke: "#333333",
    strokeWidth: 2,
    cursor: "grab",
  };
  labelAttributes = {
    textVerticalAnchor: "middle",
    textAnchor: "middle",
    x: "calc(.5*w)",
    y: "calc(.5*h)",
    fill: "#333333",
    fontSize: 18,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontVariant: "small-caps",
    pointerEvents: "none",
  };
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


    let gateway = new joint.shapes.uml.State({
      position: { x: 10, y: 90 },
      size: { width: 140, height: 70 },      
      attrs: {
          root: {
              highlighterSelector: 'body'
          },
          body: {
              d: 'M calc(.5*w) 0 calc(w) calc(.5*h) calc(.5*w) calc(h) 0 calc(.5*h) Z',
              ...this.bodyAttributes
          },
          label: {
              text: 'Rhombus',
              ...this.labelAttributes
          }
      }


    });


    this.states = {};
    Object.assign(this.states, { s0: s0 });
 
    Object.assign(this.states, { se: se });
    Object.assign(this.states,{gateway:gateway});

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


