import * as joint from "jointjs";
import { dia, shapes ,g } from "jointjs";
// import { join } from "path";
import { Ref, ref } from "vue";
import { Stencil } from "@/composables/stencil";
import _ from 'lodash';
import { PaperClipOutlined } from "@ant-design/icons-vue";
window.joint = joint

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
  namespace = joint.shapes; 
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

  paper: dia.Paper;  
  graph: dia.Graph = new joint.dia.Graph({ cellNamespace: this.namespace });
  boundaryTool = new joint.elementTools.Boundary();
  removeButton = new joint.elementTools.Remove({
    rotate:true,
    x:'100%',
    y:'100%',
  //   action: function(evt,view) {
      
  //     // alert('View id: ' +view.model?.id);
  //     view.model?.remove(view.model)
  //     // return view.model
  // }
  // + JSON.stringify(view)
  });
  connectButton = new joint.elementTools.Connect({
    // rotate:true
  });
  

  elementToolsView = new joint.dia.ToolsView({
    tools: [this.boundaryTool, this.removeButton,this.connectButton],
  });

  targetArrowheadTool = new joint.linkTools.TargetArrowhead({
    focusOpacity: 0.5
});
sourceArrowheadTool = new joint.linkTools.SourceArrowhead({
  focusOpacity: 0.5
});

  linkToolsView = new joint.dia.ToolsView({
    tools: [this.removeButton,this.targetArrowheadTool,this.sourceArrowheadTool],
  });
  addElement(testClass: any, toolsView:dia.ToolsView,data?: any) {
    let rect: joint.shapes.basic.Generic = new testClass(data);
    rect.addTo(this.graph);
    rect.findView(this.paper).addTools(this.elementToolsView);
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
      cellViewNamespace: this.namespace ,
      defaultLink: new joint.shapes.standard.Link({
        router: { name: "normal" },
        connector: { name: "curve" },
        attrs: {
          line: {
            stroke: "#333333",
            strokeWidth: 3,
          },
        },
      })
    });
 
  
  this.paper.on('element:contextmenu', (elementView: dia.ElementView) => {

    this.paper.removeTools(); 

    if (!elementView.hasTools()) {
      elementView.addTools(this.elementToolsView)
      
    }
      elementView.showTools();
  });

  this.paper.on('link:contextmenu', (linkView: any) => {

    this.paper.removeTools();
    
    if (!linkView.hasTools()) {
      linkView.addTools(this.linkToolsView)
    }
    linkView.showTools();


  });
;
  this.paper.on('blank:contextmenu', () => {
    this.paper.removeTools();
  });
}

}