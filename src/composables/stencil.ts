import * as joint from "jointjs";
import { dia, shapes } from "jointjs";

import { Ref, ref } from "vue";

export class Stencil {
  states: object;
  linkAttrs: object;
  transitions: []=[];
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

    // let s1 = new joint.shapes.uml.State({
    //   position: { x: 100, y: 100 },
    //   size: { width: 200, height: 100 },
    //   name: "state 1",
    //   events: ["entry / init()", "exit / destroy()"],
    //   attrs: {
    //     ".uml-state-body": {
    //       fill: "rgba(48, 208, 198, 0.1)",
    //       stroke: "rgba(48, 208, 198, 0.5)",
    //       "stroke-width": 1.5,
    //     },
    //     ".uml-state-separator": {
    //       stroke: "rgba(48, 208, 198, 0.4)",
    //     },
    //   },
    // });

    // let s2  = new joint.shapes.uml.State({
    //     position: { x:400  , y: 200 },
    //     size: { width: 300, height: 300 },
    //     name: 'state 2',
    //     events: ['entry / create()','exit / kill()','A / foo()','B / bar()'],
    //     attrs: {
    //         '.uml-state-body': {
    //             fill: 'rgba(48, 208, 198, 0.1)',
    //             stroke: 'rgba(48, 208, 198, 0.5)',
    //             'stroke-width': 1.5
    //         },
    //         '.uml-state-separator': {
    //             stroke: 'rgba(48, 208, 198, 0.4)'
    //         }
    //     }
    // });
    // let s3 = new joint.shapes.uml.State({
    //   position: { x: 130, y: 400 },
    //   size: { width: 160, height: 60 },
    //   name: "state 3",
    //   events: ["entry / create()", "exit / kill()"],
    //   attrs: {
    //     ".uml-state-body": {
    //       fill: "rgba(48, 208, 198, 0.1)",
    //       stroke: "rgba(48, 208, 198, 0.5)",
    //       "stroke-width": 1.5,
    //     },
    //     ".uml-state-separator": {
    //       stroke: "rgba(48, 208, 198, 0.4)",
    //     },
    //   },
    // });

    // let s4 = new joint.shapes.uml.State({
    //   position: { x: 530, y: 400 },
    //   size: { width: 160, height: 50 },
    //   name: "sub state 4",
    //   events: ["entry / create()"],
    //   attrs: {
    //     ".uml-state-body": {
    //       fill: "rgba(48, 208, 198, 0.1)",
    //       stroke: "rgba(48, 208, 198, 0.5)",
    //       "stroke-width": 1.5,
    //     },
    //     ".uml-state-separator": {
    //       stroke: "rgba(48, 208, 198, 0.4)",
    //     },
    //   },
    // });

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
    // Object.assign(this.states, { s1: s1 });
    // Object.assign(this.states, { s2: s2 });
    // Object.assign(this.states, { s3: s3 });
    // Object.assign(this.states, { s4: s4 });
    Object.assign(this.states, { se: se });
    // console.log("this states:", this.states);
    this.paper = new joint.dia.Paper({
      el: canvas.value,
      model: this.graph,
      width: "100%",
      height: "100%",
      gridSize: 10,
      drawGrid: true,
    });
    // this.paper.on("element:mouseenter", (elementView) => {
    //   // if (!elementView.hasTools()) {
    //   //     elementView.addTools(this.toolsView)
    //   // }
    //   elementView.showTools();
    // });

    // this.paper.on("element:mouseleave", (elementView) => {
    //   elementView.hideTools();
    // });
    // let start = this.addElement(startNode);

    // start.position(100, 30)
    // start.resize(100, 40)
    // let start2 = this.addElement(startNode);

    // start2.position(300, 30)
    // start2.resize(100, 40)
    // let end : startNode = this.addElement(startNode, "end");

    // end.position(200, 30)
    // end.resize(100, 40)

    // let rect: startNode = this.addElement(startNode);
    // // rect.addTo(this.graph);
    // rect.position(280, 300);
    // rect.resize(100, 40);
    // // rect.setText("1231312", this.paper);

    // rect.attr({
    //   body: {
    //     // fill: 'blue'
    //   },
    //   label: {
    //     text: "Start",
    //     // fill: 'white'
    //   },
    // });

    // let rect2 = new test();
    // rect2.addTo(this.graph);
    // rect2.position(100, 130);
    // rect2.resize(100, 40);
    // // rect2.translate(300, 0)
    // rect2.attr("label/text", "End");

    // rect2.setText("hello world, this is the wold来吧，这里", this.paper);
    // rect2.addTo(this.graph);
    // let rect3 = new test();
    // rect3.addTo(this.graph);
    // rect3.position(200, 30);
    // rect3.resize(100, 40);
    // // rect2.translate(300, 0)

    // rect3.setText("，这里", this.paper);

    // let link = new joint.shapes.standard.Link({
    //   router: { name: "manhattan" },
    //   connector: { name: "rounded" },
    //   attrs: {
    //     line: {
    //       stroke: "#333333",
    //       strokeWidth: 3,
    //     },
    //   },
    // });
    // link.source(rect);
    // link.target(rect2);
    // link.addTo(this.graph);

    // console.log("xxxxxxx1", this.graph);
    // console.log("xxxxxxx2", this.states);

    Object.keys(this.states).forEach((key:string) => {
      // console.log(key);
      this.graph.addCell(this.states[key as keyof typeof this.states]);
    });

    // this.states.s2.embed(this.states.s4);
    this.linkAttrs = {};
    Object.assign(this.linkAttrs, {
      fill: "none",
      "stroke-linejoin": "round",
      "stroke-width": "2",
      stroke: "#4b4a67",
    });
    // this.transitions = [];
    // this.transitions.push(
    //   new joint.shapes.uml.Transition({
    //     source: { id: this.states.s0.id },
    //     target: { id: this.states.s1.id },
    //     attrs: { ".connection": this.linkAttrs },
    //   })
    // );
    // this.transitions.push(
    //   new joint.shapes.uml.Transition({
    //     source: { id: this.states.s1.id },
    //     target: { id: this.states.s2.id },
    //     attrs: { ".connection": this.linkAttrs },
    //   })
    // );
    // this.transitions.push(
    //   new joint.shapes.uml.Transition({
    //     source: { id: this.states.s1.id },
    //     target: { id: this.states.s3.id },
    //     attrs: { ".connection": this.linkAttrs },
    //   })
    // );
    // this.transitions.push(
    //   new joint.shapes.uml.Transition({
    //     source: { id: this.states.s3.id },
    //     target: { id: this.states.s4.id },
    //     attrs: { ".connection": this.linkAttrs },
    //   })
    // );
    // this.transitions.push(
    //   new joint.shapes.uml.Transition({
    //     source: { id: this.states.s2.id },
    //     target: { id: this.states.se.id },
    //     attrs: { ".connection": this.linkAttrs },
    //   })
    // );
    // ]});
    // console.log("this linkAttrs:", this.linkAttrs);
    // console.log("this transitions:", this.transitions);
    // this.transitions.addTo(this.graph);
    // debugger;
    // this.graph.addCells(this.transitions);
    // console.log(this.graph);
  }
}
