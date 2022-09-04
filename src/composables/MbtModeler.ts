import * as joint from "jointjs";
import { dia, shapes } from "jointjs";
// import { join } from "path";
import { Ref, ref } from "vue";

export class test extends joint.shapes.standard.Rectangle {
  constructor() {
    super();
  }

  setText(text: string, paper: dia.Paper) {
    this.attr(
      "label/text",
      joint.util.breakText(text, {
        width: this.findView(paper).getBBox().width,
      })
    );
  }
}

export class startNode extends joint.shapes.standard.Circle {
  constructor(text = "Start") {
    super();
    this.attr({
      body: {
        // fill: 'blue'
      },
      label: {
        text: text,
        // fill: 'white'
      },
    });
  }
}

export class MbtModeler {



  paper: dia.Paper;
  graph: dia.Graph = new joint.dia.Graph();
  boundaryTool = new joint.elementTools.Boundary();
  removeButton = new joint.elementTools.Remove();
  connectButton = new joint.elementTools.Connect();

  toolsView = new joint.dia.ToolsView({
    tools: [this.boundaryTool, this.removeButton, this.connectButton],
  });
  addElement(testClass: any, data?: any) {
    let rect: joint.shapes.basic.Generic = new testClass(data);
    rect.addTo(this.graph);
    rect.findView(this.paper).addTools(this.toolsView);
    return rect;
  }
  setupElementTool() {}
  constructor(canvas: any) {
   
    this.paper = new joint.dia.Paper({
      el: canvas.value,
      model: this.graph,
      width: "100%",
      height: "100%",
      gridSize: 10,
      drawGrid: true,
    });
    this.paper.on("element:mouseenter", (elementView) => {
      elementView.showTools();
    });

    this.paper.on("element:mouseleave", (elementView) => {
      elementView.hideTools();
    });
   
    let rect: startNode = this.addElement(startNode);
    // rect.addTo(this.graph);
    rect.position(280, 300);
    rect.resize(100, 40);
    // rect.setText("1231312", this.paper);

    rect.attr({
      body: {
        // fill: 'blue'
      },
      label: {
        text: "Start",
        // fill: 'white'
      },
    });

    let rect2 = new test();
    rect2.addTo(this.graph);
    rect2.position(100, 130);
    rect2.resize(100, 40);
    // rect2.translate(300, 0)
    rect2.attr("label/text", "End");

    rect2.setText("hello world, this is the wold来吧，这里", this.paper);
    rect2.addTo(this.graph);
    let rect3 = new test();
    rect3.addTo(this.graph);
    rect3.position(200, 30);
    rect3.resize(100, 40);
    // rect2.translate(300, 0)

    rect3.setText("，这里", this.paper);

    let link = new joint.shapes.standard.Link({
      router: { name: "manhattan" },
      connector: { name: "rounded" },
      attrs: {
        line: {
          stroke: "#333333",
          strokeWidth: 3,
        },
      },
    });
    link.source(rect);
    link.target(rect2);
    link.addTo(this.graph);

  }
}
