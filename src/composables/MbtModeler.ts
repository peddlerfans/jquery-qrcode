import * as joint from "jointjs";
import { dia, shapes ,g } from "jointjs";
// import { join } from "path";
import { Ref, ref } from "vue";
import { Stencil } from "@/composables/stencil";
import { setupI18n } from "@/locales";
import _ from 'lodash';


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
  graph: dia.Graph = new joint.dia.Graph();
  boundaryTool = new joint.elementTools.Boundary();
  removeButton = new joint.elementTools.Remove({
    rotate:true,
    x:'100%',
    y:'100%'
    // y:this.boundaryTool.vel.bbox.length+25,
    // x:this.boundaryTool.vel.attr.length+30,
    // y:this.boundaryTool.vel.bbox.length+15,
    // offset:{
    //   x:50,
    //   y:50},
      // useModelGeometry:true
  });
  connectButton = new joint.elementTools.Connect({
    // rotate:true
  });
  
  customNamespace : joint.dia.Paper.Options['cellViewNamespace'] ={};
  Shape = joint.dia.Element.define('shapeGroup.Shape', {
    attrs: {
        // Attributes
    }
}, {
    markup: [{
        // Markup
    }]
});
  elementToolsView = new joint.dia.ToolsView({
    tools: [this.boundaryTool, this.removeButton,this.connectButton],
  });
  linkToolsView = new joint.dia.ToolsView({
    tools: [this.removeButton],
  });
  addElement(testClass: any, toolsView:dia.ToolsView,data?: any) {
    let rect: joint.shapes.basic.Generic = new testClass(data);
    rect.addTo(this.graph);
    rect.findView(this.paper).addTools(this.elementToolsView);
    return rect;
  }
  setupElementTool() {}
  setupNamespace() {
    Object.assign(this.customNamespace, {
      shapeGroup: 
          this.Shape
      
  });
  }
  

  
  constructor(canvas: any) {




    // let btn = new joint.shapes.standard.Polygon( {
     
    //   position: { x: 30, y: 30 },
    //   size: { width: 70, height: 38 }, 
    //     attrs:{
    //       body: {
    //          fill: 'blue'
    //       },
    //       label: {
    //         text: 'Save',
    //          fill: 'white'
    //       },
    //     }});

    /**
     * mock data
     */
    
    let s0 = new joint.shapes.uml.StartState({
      position: { x: 30, y: 10 },
      size: { width: 30, height: 30 },
      attrs: {
        circle: {
          fill: "#4b4a67",
          stroke: "none",
        },
      },
    });




    let se = new joint.shapes.uml.EndState({
      position: { x: 30, y: 50 },
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


    let umlstate = new joint.shapes.uml.State({
      position: { x: 15, y: 100 },
      size: { width: 70, height: 70 },      
      attrs: {
          root: {
              highlighterSelector: 'body'
          },
          body: {
              d: 'M calc(.5*w) 0 calc(w) calc(.5*h) calc(.5*w) calc(h) 0 calc(.5*h) Z',
              ...this.bodyAttributes
          },
          label: {
            
              text: 'AW',
              ...this.labelAttributes
          }
      }


    });
    let ExclusiveRhombusShape = dia.Element.define('RHOMBUS', {
      size: { width: 70, height: 45 },
      attrs: {
          root: {
              highlighterSelector: 'body'
          },
          body: {
              d: 'M calc(.5*w) 0 calc(w) calc(.5*h) calc(.5*w) calc(h) 0 calc(.5*h) Z',
              ...this.bodyAttributes
          },
          // label: {
          //     text: 'X',
          //     ...this.labelAttributes
          // }
      }
  }, {
      markup: [{
          tagName: 'path',
          selector: 'body'
      }, {
          tagName: 'text',
          selector: 'label'
      }],
  
      getConnectToolMarkup() {
          const { width, height } = this.size();
          return [{
              tagName: 'path',
              attributes: {
                  d: `M ${width/2} 0 ${width} ${height/2} ${width/2} ${height} 0 ${height/2} Z`,
                  ...this.connectToolAttributes
              }
          }];
      },
  
  
      getClosestBoundaryPoint(bbox:any, point:g.Point) {
          const rhombus = new g.Polygon([
              bbox.topMiddle(),
              bbox.rightMiddle(),
              bbox.bottomMiddle(),
              bbox.leftMiddle(),
          ]);
          return rhombus.closestPoint(point);
      }
  });

  let aw1 = new joint.shapes.standard.Rectangle( {
     
    position: { x: 480, y: 100 },
    size: { width: 170, height: 38 }, 
      attrs:{
        body: {
          // fill: 'blue'
        },
        label: {
          text: '下载视频文件:{{file}}',
          // fill: 'white'
        },
      }});

      let aw2 = new joint.shapes.standard.Rectangle( {
     
        position: { x: 30, y: 100 },
        size: { width: 170, height: 38 }, 
          attrs:{
            body: {
              // fill: 'blue'
            },
            label: {
              text: '在线播放视频并录制',
              // fill: 'white'
            },
          }});
      

      let aw3 = new joint.shapes.standard.Rectangle( {
     
        position: { x: 480, y: 200 },
        size: { width: 170, height: 38 }, 
          attrs:{
            body: {
              // fill: 'blue'
            },
            label: {
              text: '文件管理视频播放并录制',
              // fill: 'white'
            },
          }});


      let aw4 = new joint.shapes.standard.Rectangle( {
     
        position: { x: 200, y: 200 },
        size: { width: 170, height: 38 }, 
          attrs:{
            body: {
              // fill: 'blue'
            },
            label: {
              text: 'TBL视频播放并录制',
              // fill: 'white'
            },
          }});


      let aw5 = new joint.shapes.standard.Rectangle( {
     
        position: { x: 200, y: 300 },
        size: { width: 190, height: 38 }, 
          attrs:{
            body: {
              // fill: 'blue'
            },
            label: {
              text: '检查视频播放流畅、不卡顿',
              // fill: 'white'
            },
          }});


      let aw6 = new joint.shapes.standard.Rectangle( {
     
        position: { x: 200, y: 370 },
        size: { width: 170, height: 38 }, 
          attrs:{
            body: {
              // fill: 'blue'
            },
            label: {
              text: '启动视频录制',
              // fill: 'white'
            },
          }});


      let aw7 = new joint.shapes.standard.Rectangle( {
     
        position: { x: 200, y: 440 },
        size: { width: 170, height: 38 }, 
          attrs:{
            body: {
              // fill: 'blue'
            },
            label: {
              text: '视频快进',
              // fill: 'white'
            },
          }});


      let aw8 = new joint.shapes.standard.Rectangle( {
     
        position: { x: 200, y: 510 },
        size: { width: 190, height: 38 }, 
          attrs:{
            body: {
              // fill: 'blue'
            },
            label: {
              text: '检查视频播放流畅、不卡顿',
              // fill: 'white'
            },
          }});

      let aw9 = new joint.shapes.standard.Rectangle( {
     
        position: { x: 200, y: 580 },
        size: { width: 170, height: 38 }, 
          attrs:{
            body: {
              // fill: 'blue'
            },
            label: {
              text: '启动屏幕录制',
              // fill: 'white'
            },
          }});

      let aw10 = new joint.shapes.standard.Rectangle( {
     
        position: { x: 200, y: 650 },
        size: { width: 170, height: 38 }, 
          attrs:{
            body: {
              // fill: 'blue'
            },
            label: {
              text: '视频快退',
              // fill: 'white'
            },
          }});


      let aw11 = new joint.shapes.standard.Rectangle( {
     
        position: { x: 450, y: 650 },
        size: { width: 190, height: 38 }, 
          attrs:{
            body: {
              // fill: 'blue'
            },
            label: {
              text: '检查视频播放流畅、不卡顿',
              // fill: 'white'
            },
          }});

 let exclusiverhombus = new ExclusiveRhombusShape({
    position: { x: 280, y: 70 }
});

    this.setupNamespace();
    this.paper = new joint.dia.Paper({
      el: canvas.value,
      model: this.graph,
      width: "100%",
      height: "100%",
      gridSize: 10,
      drawGrid: true,
      cellViewNamespace: this.customNamespace ,
      defaultLink: new joint.shapes.standard.Link({
        router: { name: "manhattan" },
        connector: { name: "rounded" },
        attrs: {
          line: {
            stroke: "#333333",
            strokeWidth: 3,
          },
        },
      })
    });
 
    // let  restrictedArea =  this.paper.getArea();
    // let toolArea = Object.assign(restrictedArea,{width: 150, height: 100})
    // console.log('--restrict area:',toolArea.width,toolArea.height,restrictedArea);
    // btn.addTo(this.graph)
    // btn.position(30, 30,  { parentRelative: true });

    /**
     * mock data
     */
    
    s0.position(300,10)
    se.position(700,650)
    s0.addTo(this.graph);
    se.addTo(this.graph);
    exclusiverhombus.addTo(this.graph);
    aw1.addTo(this.graph);
    aw2.addTo(this.graph);
    aw3.addTo(this.graph);
    aw4.addTo(this.graph);
    aw5.addTo(this.graph);
    aw6.addTo(this.graph);
    aw7.addTo(this.graph);
    aw8.addTo(this.graph);
    aw9.addTo(this.graph);
    aw10.addTo(this.graph);
    aw11.addTo(this.graph);
    
    

    let link1 = new joint.shapes.standard.Link({
      router: { name: "manhattan" },
      connector: { name: "rounded" },
      attrs: {
        line: {
          stroke: "#333333",
          strokeWidth: 3,
        },
      },
    });
    link1.source(s0);
    link1.target(exclusiverhombus);
    link1.addTo(this.graph);

    let link2 = new joint.shapes.standard.Link({
      router: { name: "manhattan" },
      connector: { name: "rounded" },
      attrs: {
        line: {
          stroke: "#333333",
          strokeWidth: 3,
        },
      },
    });
    link2.source(exclusiverhombus);
    link2.target(aw2);
    link2.addTo(this.graph);

    let link3 = new joint.shapes.standard.Link({
      router: { name: "manhattan" },
      connector: { name: "rounded" },
      attrs: {
        line: {
          stroke: "#333333",
          strokeWidth: 3,
        },
        
      },
    });
    link3.labels([{
      attrs: {
          text: {
              text: 'No'
          }
      }
  }
])
link2.labels([{
  attrs: {
      text: {
          text: 'Yes'
      }
  }
}
])
    link3.source(exclusiverhombus);
    link3.target(aw1);
    link3.addTo(this.graph);

  

    let link4 = new joint.shapes.standard.Link({
      router: { name: "manhattan" },
      connector: { name: "rounded" },
      attrs: {
        line: {
          stroke: "#333333",
          strokeWidth: 3,
        },
        
      },
    });

  let link5 = new joint.shapes.standard.Link({
    router: { name: "manhattan" },
    connector: { name: "rounded" },
    attrs: {
      line: {
        stroke: "#333333",
        strokeWidth: 3,
      },
      
    },
  });

  link4.source(aw1);
  link4.target(aw3);
  link4.addTo(this.graph);

  link5.source(aw1);
  link5.target(aw4);
  link5.addTo(this.graph);

  let link6 = new joint.shapes.standard.Link({
    router: { name: "manhattan" },
    connector: { name: "rounded" },
    attrs: {
      line: {
        stroke: "#333333",
        strokeWidth: 3,
      },
      
    },
  });

  link6.source(aw2);
  link6.target(aw5);
  link6.addTo(this.graph);

  let link7 = new joint.shapes.standard.Link({
    router: { name: "manhattan" },
    connector: { name: "rounded" },
    attrs: {
      line: {
        stroke: "#333333",
        strokeWidth: 3,
      },
      
    },
  });

  link7.source(aw3);
  link7.target(aw5);
  link7.addTo(this.graph);


  let link8 = new joint.shapes.standard.Link({
    router: { name: "manhattan" },
    connector: { name: "rounded" },
    attrs: {
      line: {
        stroke: "#333333",
        strokeWidth: 3,
      },
      
    },
  });

  link8.source(aw4);
  link8.target(aw5);
  link8.addTo(this.graph);

  let link9 = new joint.shapes.standard.Link({
    router: { name: "manhattan" },
    connector: { name: "rounded" },
    attrs: {
      line: {
        stroke: "#333333",
        strokeWidth: 3,
      },
      
    },
  });

  link9.source(aw5);
  link9.target(aw6);
  link9.addTo(this.graph);


  let link10 = new joint.shapes.standard.Link({
    router: { name: "manhattan" },
    connector: { name: "rounded" },
    attrs: {
      line: {
        stroke: "#333333",
        strokeWidth: 3,
      },
      
    },
  });

  link10.source(aw6);
  link10.target(aw7);
  link10.addTo(this.graph);

  let link11 = new joint.shapes.standard.Link({
    router: { name: "manhattan" },
    connector: { name: "rounded" },
    attrs: {
      line: {
        stroke: "#333333",
        strokeWidth: 3,
      },
      
    },
  });

  link11.source(aw7);
  link11.target(aw8);
  link11.addTo(this.graph);



  let link12 = new joint.shapes.standard.Link({
    router: { name: "manhattan" },
    connector: { name: "rounded" },
    attrs: {
      line: {
        stroke: "#333333",
        strokeWidth: 3,
      },
      
    },
  });

  link12.source(aw8);
  link12.target(aw9);
  link12.addTo(this.graph);



  let link13 = new joint.shapes.standard.Link({
    router: { name: "manhattan" },
    connector: { name: "rounded" },
    attrs: {
      line: {
        stroke: "#333333",
        strokeWidth: 3,
      },
      
    },
  });

  link13.source(aw9);
  link13.target(aw10);
  link13.addTo(this.graph);

  let link14 = new joint.shapes.standard.Link({
    router: { name: "manhattan" },
    connector: { name: "rounded" },
    attrs: {
      line: {
        stroke: "#333333",
        strokeWidth: 3,
      },
      
    },
  });

  link14.source(aw10);
  link14.target(aw11);
  link14.addTo(this.graph);


  let link15 = new joint.shapes.standard.Link({
    router: { name: "manhattan" },
    connector: { name: "rounded" },
    attrs: {
      line: {
        stroke: "#333333",
        strokeWidth: 3,
      },
      
    },
  });

  link15.source(aw11);
  link15.target(se);
  link15.addTo(this.graph);

  

  
  this.paper.on('element:pointerclick', (elementView: any) => {
console.log('ele:',elementView);
    this.paper.removeTools(); 
    if(elementView && elementView.model && elementView.model.attributes && elementView.model.attributes.type=='standard.Polygon'){
      elementView.removeTools()
    }
    else if (!elementView.hasTools()) {
      elementView.addTools(this.elementToolsView)
    }
      elementView.showTools();


  });

  this.paper.on('link:mouseenter', (linkView: any) => {
    // console.log('click......', linkView)
    // console.log(this.paper)
    this.paper.removeTools();
    
    if (!linkView.hasTools()) {
      linkView.addTools(this.linkToolsView)
    }
    linkView.showTools();


  });

//   var linkView = link.findView(paper);
// linkView.addTools(toolsView);

  // this.paper.on('element:mouseenter', (elementView: dia.ElementView) => {
    
  //   if (!elementView.hasTools()) {
  //     elementView.addTools(this.toolsView1)
  //   }
  //   // console.log('click', elementView, elementView.hasTools())
  //   elementView.showTools();
  // });

  // this.paper.on('element:mouseleave', (elementView: dia.ElementView) => {
  //   if (elementView.hasTools()) {
  //     elementView.hideTools();
  //   }

  // });

  this.paper.on('blank:pointerclick', () => {
    // this.paper.hideTools();
    this.paper.removeTools();
  });
}

}