import { ConsoleSqlOutlined } from "@ant-design/icons-vue";
import * as joint from "jointjs";
import { dia, g } from "jointjs";

window.joint = joint
export class Stencil {
  namespace = joint.shapes; 
  states: object;
  linkAttrs: object = {};
  transitions: [] = [];
  graph: dia.Graph = new joint.dia.Graph({},{ cellNamespace: joint.shapes });
  paper: dia.Paper=new joint.dia.Paper({model: this.graph, cellViewNamespace: joint.shapes});;
  headerHeight = 14;
  buttonSize = 14;
  
//   container=joint.dia.Element.define('Container.Parent', {
//     collapsed: false,
//     attrs: {
//         root: {
//             magnetSelector: 'body'
//         },
//         body: {
//             refWidth: 20,
//             refHeight: 20,
//             strokeWidth: 1,
//             stroke: '#DDDDDD',
//             fill: '#FCFCFC'
//         },
//         header: {
//             refWidth: 20,
//             height: this.headerHeight,
//             strokeWidth: 0.5,
//             stroke: '#4666E5',
//             fill: '#4666E5'
//         },
//         headerText: {
//             textVerticalAnchor: 'middle',
//             textAnchor: 'start',
//             refX: 8,
//             refY: this.headerHeight/2,
//             fontSize: 12,
//             fontFamily: 'sans-serif',
//             letterSpacing: 1,
//             // fill: '#FFFFFF',
//             // textWrap: {
//             //     width: 40,
//             //     maxLineCount: 1,
//             //     ellipsis: '*'
//             // },
//             // style: {
//             //     textShadow: '1px 1px #222222',
//             // }
//         },
//         // button: {
//         //     refDx: - this.buttonSize - (this.headerHeight - this.buttonSize) / 2,
//         //     refY: (this.headerHeight - this.buttonSize) / 2,
//         //     cursor: 'pointer',
//         //     event: 'element:button:pointerdown',
//         //     title: 'Collapse / Expand'
//         // },
//         buttonBorder: {
//             width: this.buttonSize,
//             height: this.buttonSize,
//             fill: '#000000',
//             fillOpacity: 0.2,
//             stroke: '#FFFFFF',
//             strokeWidth: 0.5,
//         },
//         buttonIcon: {
//             fill: 'none',
//             stroke: '#FFFFFF',
//             strokeWidth: 1
//         }
//     }
//     }, {
//     markup: [
//     //   {
//     //     tagName: 'rect',
//     //     selector: 'shadow'
//     // },
//      {
//         tagName: 'rect',
//         selector: 'body'
//     },
//      {
//         tagName: 'rect',
//         selector: 'header'
//     }, 
//     {
//         tagName: 'text',
//         selector: 'headerText'
//     }, 
//     // {
//     //     tagName: 'g',
//     //     selector: 'button',
//     //     children: [{
//     //         tagName: 'rect',
//     //         selector: 'buttonBorder'
//     //     }, {
//     //         tagName: 'path',
//     //         selector: 'buttonIcon'
//     //     }]
//     // }
//   ],

//     toggle: function(shouldCollapse: undefined) {
//         var buttonD;
//         var collapsed = (shouldCollapse === undefined) ? !this.get('collapsed') : shouldCollapse;
//         if (collapsed) {
//             buttonD = 'M 2 7 12 7 M 7 2 7 12';
//             this.resize(140, 30);
//         } else {
//             buttonD = 'M 2 7 12 7';
//             this.fitChildren();
//         }
//         this.attr(['buttonIcon','d'], buttonD);
//         this.set('collapsed', collapsed);
//     },

//     isCollapsed: function() {
//         return Boolean(this.get('collapsed'));
//     },

//     fitChildren: function() {
//         var padding = 10;
//         this.fitEmbeds({
//             padding: {
//                 top: this.headerHeight + padding,
//                 left: padding,
//                 right: padding,
//                 bottom: padding
//             }
//         });
//     }
// });
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
      position: { x: 14, y: 20 },
      size: { width: 30, height: 30 },
      attrs: {
        circle: {
          fill: "#4b4a67",
          stroke: "none",
        },
      },
    });


    let se = new joint.shapes.uml.EndState({
      position: { x: 14, y: 70 },
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

 
    let umlstate = new joint.shapes.standard.HeaderedRectangle({
      size: { width: 30, height: 22 },
      position: { x: 14, y: 120 },
      attrs: {
       
        body: {
          fill: '#ffffff',
          // fillOpacity: 0.5

        },
        header: {
          fill: '#ffffff',
          // fillOpacity: 0.1
        },
        headerText: {
          text: 'aw'

        },
        bodyText: {
          // text: 'bodyText'
        }
      }})
      // let Container =joint.shapes.Container.Parent;
      // let Groupstate = new Container({
      //   position: { x: 18, y: 170 },
      //   size: { width: 30, height: 20 },
      //   z: 1,
      //   attrs: {       headerText: { text: 'group' }}
      // });
/*
    let umlstate = new joint.shapes.standard.Rectangle({

      position: { x: 10, y: 120 },
      size: { width: 35, height: 35 },
      attrs: {
        body: {
          // fill: 'blue'
        },
        label: {
          text: 'aw',
          // fill: 'white'
        },
      }
    });
*/
    let ParallelRhombusShape = new joint.shapes.standard.Polygon({

      position: { x: 10, y: 170 },
      size: { width: 40, height: 30 },
      attrs: {
        body: {
          refPoints: '0,10 10,0 20,10 10,20',
          ...this.bodyAttributes
        },
        label: {
          text: '+',
          // ...this.labelAttributes
        },
      }
    });

    let ExclusiveRhombusShape = new joint.shapes.standard.Polygon({

      position: { x: 10, y: 220 },
      size: { width: 40, height: 30 },
      attrs: {
        body: {
          refPoints: '0,10 10,0 20,10 10,20',
          ...this.bodyAttributes
        },

        label: {
          text: 'x',
          // ...this.labelAttributes
        },
      }
    });

    


    this.states = {};
    Object.assign(this.states, { s0: s0 });

    Object.assign(this.states, { se: se });
    Object.assign(this.states, { umlstate: umlstate });
    // Object.assign(this.states, { Groupstate: Groupstate });
    Object.assign(this.states, { exclusiverhombus: ExclusiveRhombusShape });
    Object.assign(this.states, { parallelsrhombus: ParallelRhombusShape });

    
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


