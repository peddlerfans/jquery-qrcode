import { ConsoleSqlOutlined } from "@ant-design/icons-vue";
import * as joint from "jointjs";
import { dia ,g} from "jointjs";
window.joint = joint
export class Stencil {
  namespace = joint.shapes; 
  states: object;
  linkAttrs: object = {};
  transitions: [] = [];
  paper: dia.Paper;
  graph: dia.Graph = new joint.dia.Graph({ cellNamespace: this.namespace });
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
    const namespace = joint.shapes; // e.g. { standard: { Rectangle: RectangleElementClass }}

    let s0 = new joint.shapes.uml.StartState({
      position: { x: 10, y: 20 },
      size: { width: 30, height: 30 },
      attrs: {
        circle: {
          fill: "#4b4a67",
          stroke: "none",
        },
      },
    });




    let se = new joint.shapes.uml.EndState({
      position: { x: 10, y: 70 },
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


    // let umlstate = new joint.shapes.uml.State({
    //   position: { x: 15, y: 100 },
    //   size: { width: 70, height: 70 },      
    //   attrs: {
    //       root: {
    //           highlighterSelector: 'body'
    //       },
    //       body: {
    //           d: 'M calc(.5*w) 0 calc(w) calc(.5*h) calc(.5*w) calc(h) 0 calc(.5*h) Z',
    //           ...this.bodyAttributes
    //       },
    //       label: {
    //           text: 'Rhombus',
    //           ...this.labelAttributes
    //       }
    //   }


    // });

    let umlstate = new joint.shapes.standard.Rectangle( {
     
      position: { x: 10, y: 120 },
      size: { width: 35, height: 35 }, 
        attrs:{
          body: {
            // fill: 'blue'
          },
          label: {
            text: 'aw',
            // fill: 'white'
          },
        }});

        let ExclusiveRhombusShape = new joint.shapes.standard.Polygon( {
     
          position: { x: 5, y: 220 },
          size: { width: 45, height: 30 }, 
            attrs:{
              body: {
              refPoints: '0,10 10,0 20,10 10,20',
              ...this.bodyAttributes
              },
              
              label: {
                text: 'x',
                // ...this.labelAttributes
              },
            }});

            let ParallelRhombusShape = new joint.shapes.standard.Polygon( {
     
              position: { x: 5, y: 175 },
              size: { width: 45, height: 30 }, 
                attrs:{
                  body: {
                    refPoints: '0,10 10,0 20,10 10,20',
                    ...this.bodyAttributes
                  },
                  label: {
                    text: '+',
                    // ...this.labelAttributes
                  },
                }});
          
/*
    let ExclusiveRhombusShape1 = dia.Element.define('RHOMBUS', {
      size: { width: 70, height: 45 },
      attrs: {
          root: {
              highlighterSelector: 'body'
          },
          body: {
              d: 'M calc(.5*w) 0 calc(w) calc(.5*h) calc(.5*w) calc(h) 0 calc(.5*h) Z',
              ...this.bodyAttributes
          },
          label: {
              text: 'x',
              ...this.labelAttributes
          }
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

  let ParallelRhombusShape = dia.Element.define('RHOMBUS', {
    size: { width: 70, height: 45 },
    attrs: {
        root: {
            highlighterSelector: 'body'
        },
        body: {
            d: 'M calc(.5*w) 0 calc(w) calc(.5*h) calc(.5*w) calc(h) 0 calc(.5*h) Z',
            ...this.bodyAttributes
        },
        label: {
            text: '+',
            ...this.labelAttributes
        }
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
*/

//   let exclusiverhombus = new ExclusiveRhombusShape({
//     position: { x: 10, y: 200 }
// });
// let parallelrhombus = new ParallelRhombusShape({
//   position: { x: 10, y: 280 }
// });
    this.states = {};
    Object.assign(this.states, { s0: s0 });
 
    Object.assign(this.states, { se: se });
    Object.assign(this.states,{umlstate:umlstate});
    Object.assign(this.states,{exclusiverhombus:ExclusiveRhombusShape});
    Object.assign(this.states,{parallelsrhombus:ParallelRhombusShape});

    this.paper = new joint.dia.Paper({
      el: canvas.value,
      model: this.graph,
      width: "100%",
      height: "100%",
      gridSize: 10,
      drawGrid: true,
      interactive: false,
      cellViewNamespace: this.namespace 
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


