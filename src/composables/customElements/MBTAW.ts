import { ConsoleSqlOutlined } from "@ant-design/icons-vue";
// import * as joint from "jointjs";
import {MBTShapeInterface} from "./MBTShapeInterface"
import joint from "../../../node_modules/@clientio/rappid/rappid.js"
// import * as joint from '@clientio/rappid';
const { dia, g,ui,shapes } = joint
console.log('shapes xxxxx:',shapes)
import {i18n} from "@/locales";
import { f } from "vitest/dist/index-60e2a8e1";

const { t } = i18n.global

window.joint = joint
export const name = 'aw';
export const namespace='itea.mbt.test';

export  class MBTAW  extends joint.shapes.bpmn2.Activity implements MBTShapeInterface  {
  static shapeName = name;
  constructor(e : Element,o: any) {
      super(e,o);
      this.attr(   {
        // 'background': { fill: '#454549' },
        'icon': { iconType: 'user' },
        'label': { text: 'AW' },
 
      },)
      this.prop('isStep',true)
      this.on('change',(evt:any)=> {
      if (evt.changed && evt.changed.custom && evt.changed.custom) {
        // attrs['.mbt-step-' + 'step' + '-text'] = evt.changed.custom.step;
        this.updateRectangles();
        this.attr('label/text/0',"test")
      }
      
    })
 
   this.updateRectangles();
  }
  
 
// clone():any  {
//   // debugger
//   console.log('function good')
//   return super.clone();
// }
setPropertiesData?: (() => any) | undefined;
getPropertiesSchema() {
throw new Error("Method not implemented.");
}
setPropertiesata() {
throw new Error("Method not implemented.");
}
 
  getInspectorSchema(){
    const options = {

      colorPalette: [
          { content: 'transparent', icon: 'x' },
          { content: '#f6f6f6' },
          { content: '#dcd7d7' },
          { content: '#8f8f8f' },
          { content: '#c6c7e2' },
          { content: '#feb663' },
          { content: '#fe854f' },
          { content: '#b75d32' },
          { content: '#31d0c6' },
          { content: '#7c68fc' },
          { content: '#61549c' },
          { content: '#6a6c8a' },
          { content: '#4b4a67' },
          { content: '#3c4260' },
          { content: '#33334e' },
          { content: '#222138' }
      ],

      colorPaletteReset: [
          { content: <string><unknown>undefined, icon: 'y' },
          { content: '#f6f6f6' },
          { content: '#dcd7d7' },
          { content: '#8f8f8f' },
          { content: '#c6c7e2' },
          { content: '#feb663' },
          { content: '#fe854f' },
          { content: '#b75d32' },
          { content: '#31d0c6' },
          { content: '#7c68fc' },
          { content: '#61549c' },
          { content: '#6a6c8a' },
          { content: '#4b4a67' },
          { content: '#3c4260' },
          { content: '#33334e' },
          { content: '#222138' }
      ],

      fontWeight: [
          { value: '300', content: '<span style="font-weight: 300">Light</span>' },
          { value: 'Normal', content: '<span style="font-weight: Normal">Normal</span>' },
          { value: 'Bold', content: '<span style="font-weight: Bolder">Bold</span>' }
      ],

      fontFamily: [
          { value: 'Alegreya Sans', content: '<span style="font-family: Alegreya Sans">Alegreya Sans</span>' },
          { value: 'Averia Libre', content: '<span style="font-family: Averia Libre">Averia Libre</span>' },
          { value: 'Roboto Condensed', content: '<span style="font-family: Roboto Condensed">Roboto Condensed</span>' }
      ],

      strokeStyle: [
          { value: '0', content: 'Solid' },
          { value: '2,5', content: 'Dotted' },
          { value: '10,5', content: 'Dashed' }
      ],

      side: [
          { value: 'top', content: 'Top Side' },
          { value: 'right', content: 'Right Side' },
          { value: 'bottom', content: 'Bottom Side' },
          { value: 'left', content: 'Left Side' }
      ],

      portLabelPositionRectangle: [
          { value: { name: 'top', args: { y: -12 } }, content: 'Above' },
          { value: { name: 'right', args: { y: 0 } }, content: 'On Right' },
          { value: { name: 'bottom', args: { y: 12 } }, content: 'Below' },
          { value: { name: 'left', args: { y: 0 } }, content: 'On Left' }
      ],

      portLabelPositionEllipse: [
          { value: 'radial', content: 'Horizontal' },
          { value: 'radialOriented', content: 'Angled' }
      ],

      imageIcons: [
          { value: '../assets/image-icon1.svg', content: '<img height="42px" src="assets/image-icon1.svg"/>' },
          { value: '../assets/image-icon2.svg', content: '<img height="80px" src="assets/image-icon2.svg"/>' },
          { value: '../assets/image-icon3.svg', content: '<img height="80px" src="assets/image-icon3.svg"/>' },
          { value: '../assets/image-icon4.svg', content: '<img height="80px" src="assets/image-icon4.svg"/>' }
      ],

      imageGender: [
          { value: '../assets/member-male.png', content: '<img height="50px" src="assets/member-male.png" style="margin: 5px 0 0 2px;"/>' },
          { value: '../assets/member-female.png', content: '<img height="50px" src="assets/member-female.png" style="margin: 5px 0 0 2px;"/>' }
      ],

      arrowheadSize: [
          { value: 'M 0 0 0 0', content: 'None' },
          { value: 'M 0 -3 -6 0 0 3 z', content: 'Small' },
          { value: 'M 0 -5 -10 0 0 5 z', content: 'Medium' },
          { value: 'M 0 -10 -15 0 0 10 z', content: 'Large' },
      ],

      strokeWidth: [
          { value: 1, content: '<div style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
          { value: 2, content: '<div style="background:#fff;width:4px;height:30px;margin:0 13px;border-radius: 2px;"/>' },
          { value: 4, content: '<div style="background:#fff;width:8px;height:30px;margin:0 11px;border-radius: 2px;"/>' },
          { value: 8, content: '<div style="background:#fff;width:16px;height:30px;margin:0 8px;border-radius: 2px;"/>' }
      ],

      router: [
          { value: 'normal', content: '<p style="background:#fff;width:2px;height:30px;margin:0 14px;border-radius: 2px;"/>' },
          { value: 'orthogonal', content: '<p style="width:20px;height:30px;margin:0 5px;border-bottom: 2px solid #fff;border-left: 2px solid #fff;"/>' },
          { value: 'oneSide', content: '<p style="width:20px;height:30px;margin:0 5px;border: 2px solid #fff;border-top: none;"/>' }
      ],

      connector: [
          { value: 'normal', content: '<p style="width:20px;height:20px;margin:5px;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
          { value: 'rounded', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:30%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' },
          { value: 'smooth', content: '<p style="width:20px;height:20px;margin:5px;border-top-left-radius:100%;border-top:2px solid #fff;border-left:2px solid #fff;"/>' }
      ],

      labelPosition: [
          { value: 30, content: 'Close to source' },
          { value: 0.5, content: 'In the middle' },
          { value: -30, content: 'Close to target' },
      ],

      portMarkup: [{
          value: [{
              tagName: 'rect',
              selector: 'portBody',
              attributes: {
                  'width': 20,
                  'height': 20,
                  'x': -10,
                  'y': -10
              }
          }],
          content: 'Rectangle'
      }, {
          value: [{
              tagName: 'circle',
              selector: 'portBody',
              attributes: {
                  'r': 10
              }
          }],
          content: 'Circle'
      }, {
          value: [{
              tagName: 'path',
              selector: 'portBody',
              attributes: {
                  'd': 'M -10 -10 10 -10 0 10 z'
              }
          }],
          content: 'Triangle'
      }]
  };

    return {
      inputs: {
          attrs: {
              label: {
                  text: {
                      type: 'content-editable',
                      label: 'Text',
                      group: 'text',
                      index: 1
                  },
                  fontSize: {
                      type: 'range',
                      min: 5,
                      max: 80,
                      unit: 'px',
                      label: 'Font size',
                      group: 'text',
                      when: { ne: { 'attrs/label/text': '' } },
                      index: 2
                  },
                  fontFamily: {
                      type: 'select-box',
                      options: options.fontFamily,
                      label: 'Font family',
                      group: 'text',
                      when: { ne: { 'attrs/label/text': '' } },
                      index: 3
                  },
                  fontWeight: {
                      type: 'select-box',
                      options: options.fontWeight,
                      label: 'Font thickness',
                      group: 'text',
                      when: { ne: { 'attrs/label/text': '' } },
                      index: 4
                  },
                  fill: {
                      type: 'color-palette',
                      options: options.colorPalette,
                      label: 'Fill',
                      group: 'text',
                      when: { ne: { 'attrs/label/text': '' } },
                      index: 5
                  }
              },
              body: {
                  fill: {
                      type: 'color-palette',
                      options: options.colorPalette,
                      label: 'Fill',
                      group: 'presentation',
                      index: 1
                  },
                  stroke: {
                      type: 'color-palette',
                      options: options.colorPalette,
                      label: 'Outline',
                      group: 'presentation',
                      index: 2
                  },
                  strokeWidth: {
                      type: 'range',
                      min: 0,
                      max: 30,
                      step: 1,
                      defaultValue: 1,
                      unit: 'px',
                      label: 'Outline thickness',
                      group: 'presentation',
                      when: { ne: { 'attrs/body/stroke': 'transparent' } },
                      index: 3
                  },
                  strokeDasharray: {
                      type: 'select-box',
                      options: options.strokeStyle,
                      label: 'Outline style',
                      group: 'presentation',
                      when: {
                          and: [
                              { ne: { 'attrs/body/stroke': 'transparent' } },
                              { ne: { 'attrs/body/strokeWidth': 0 } }
                          ]
                      },
                      index: 4
                  }
              }
          }
      },
      groups: {
          presentation: {
              label: 'Presentation',
              index: 1
          },
          text: {
              label: 'Text',
              index: 2
          },
          body:{
            label: 'body',
              index: 3
          }
      },
      schema : {
        type: "object",
        properties: {
            name: {
            title: "MBT Name",
            type: "string",
            readOnly: true,
            default : '123'
            },
            descriptions: {
            title: "Description",
            type: "string",
            datault : '456'
            },
            
        },

      }
  }

  }

  setInspectorData(){

  }


  updateRectangles() {

    var attrs = this.get('attrs');
    var rects = [
        { type: 'step', text: this.prop('custom/step') || 'NNN'},
        { type: 'expectation', text: this.prop('custom/expectation') },
        // { type: 'methods', text: this.get('methods') }
    ];

    var offsetY = 0;

    // rects.forEach(function(rect) {
    //   // debugger;

    //     var lines = Array.isArray(rect.text) ? rect.text : [rect.text];
    //     var rectHeight = lines.length * 20 + 20;

    //     attrs!['.mbt-step-' + rect.type + '-text']!.text = lines.join('\n');
    //     attrs!['.mbt-step-' + rect.type + '-rect']!.height = rectHeight;
    //     attrs!['.mbt-step-' + rect.type + '-rect']!.transform = 'translate(0,' + offsetY + ')';

    //     offsetY += rectHeight;
    // });
}
setSizeFromContent() {
  // delete this.cache.layout;
  const {
    width,
    height
  } = this.layout();
  this.resize(width, height);
}
  defaults() {
    return {
        ...super.defaults,
        type: namespace,
        size: { width: 100, height: 30 }, 
        position: { x: 10, y: 10 },
        prop : {
          isStep : true,
          custom : {
            step : {

            },
            expectation : {

            }
          }

        },
    //     attrs: {
    //       rect: { 'width': 200 },

    //       '.mbt-step-step-rect': { 'stroke': 'black', 'stroke-width': 2, 'fill': '#3498db' },
    //       '.mbt-step-expectation-rect': { 'stroke': 'black', 'stroke-width': 2, 'fill': '#2980b9' },
  
    //       '.mbt-step-step-text': {
    //           'ref': '.mbt-step-step-rect',
    //           'ref-y': .5,
    //           'ref-x': .5,
    //           'text-anchor': 'middle',
    //           'y-alignment': 'middle',
    //           'font-weight': 'bold',
    //           'fill': 'black',
    //           'font-size': 12,
    //           'font-family': 'Times New Roman'
    //       },
    //       '.mbt-step-expectation-text': {
    //           'ref': '.mbt-step-expectation-rect', 'ref-y': -.5, 'ref-x': .5,
    //           'fill': 'black', 'font-size': 12, 'font-family': 'Times New Roman'
    //       }
    //   },
   
    }
}

// markup =  [       '<g class="rotatable">',
// '<g class="scalable">',
// '<rect class="mbt-step-step-rect"/><rect class="mbt-step-expectation-rect"/>',
// '</g>',
// '<text class="mbt-step-step-text"/><text class="mbt-step-expectation-text"/>',
// '</g>'].join('')

}
// Object.assign(joint.shapes,{itea : {mbt : {test : {MBTAW}}}})



// import joint from "../../../node_modules/@clientio/rappid/rappid.js"
// export class MyShape extends joint.dia.Element {
//     public test() {
//         alert("hello world")
//     }
//     testAAA="123";
//     constructor(e : Element,o: any) {
//         super(e,o);
//           this.prop('isStep',true)
//       this.on('change',(evt:any)=> {
//         if (evt.changed && evt.changed.custom && evt.changed.custom) {
//           // attrs['.mbt-step-' + 'step' + '-text'] = evt.changed.custom.step;
//           this.updateRectangles();
//           this.attr('label/text/0',"test")
//         }
        
//       })
   
//      this.updateRectangles();
//     }
   
  
//     // constructor() {
//     //   super();
//     //   this.prop('isStep',true)
//     //   this.on('change',(evt:any)=> {
//     //     var attrs = this.get('attrs');
//     //     if (evt.changed && evt.changed.custom && evt.changed.custom) {
//     //       // attrs['.mbt-step-' + 'step' + '-text'] = evt.changed.custom.step;
//     //       this.updateRectangles();
//     //       this.attr('label/text/0',"test")
//     //     }
        
//     //   })
//     //   this.on('element:dblclick',() => {
//     //     console.log("dddddddddddd")
//     //   })
//     //  this.updateRectangles();
//     // }
//     // addCellListener(cell: dia.Cell): void {
//     //   console.log("====")
//     //   cell.on('change', () => this.assignFormFields(), this);
//     // }
//     // on( eventName: string, cb:any,x,y,z) {
//     //   console.log(eventName,cb,x,y,z)
//     //   if (eventName === "change") {
//     //     console.log(this.getChangeFlag({"custom/step":1}))
        
//     //   }
    
//     //   //   var attrs = this.get('attrs');
//     //   //   if (evt.changed && evt.changed.custom && evt.changed.custom) {
//     //   //     // attrs['.mbt-step-' + 'step' + '-text'] = evt.changed.custom.step;
//     //   //     this.updateRectangles();
//     //   //     this.attr('label/text/0',"test")
//     //   //   }
        
    
//     //   // }
//     //   super.on(eventName,cb,x,y,z)
//     //   return true
//     // }
//     updateRectangles() {
  
//       var attrs = this.get('attrs');
//       var rects = [
//           { type: 'step', text: this.prop('custom/step') || 'NNN'},
//           { type: 'expectation', text: this.prop('custom/expectation') },
//           // { type: 'methods', text: this.get('methods') }
//       ];
  
//       var offsetY = 0;
  
//       rects.forEach(function(rect) {
//         // debugger;
  
//           var lines = Array.isArray(rect.text) ? rect.text : [rect.text];
//           var rectHeight = lines.length * 20 + 20;
  
//           attrs['.mbt-step-' + rect.type + '-text'].text = lines.join('\n');
//           attrs['.mbt-step-' + rect.type + '-rect'].height = rectHeight;
//           attrs['.mbt-step-' + rect.type + '-rect'].transform = 'translate(0,' + offsetY + ')';
  
//           offsetY += rectHeight;
//       });
//   }
//   setSizeFromContent() {
//     // delete this.cache.layout;
//     const {
//       width,
//       height
//     } = this.layout();
//     this.resize(width, height);
//   }
//     defaults() {
//       return {
//           ...super.defaults,
//           type: 'itea.mbt.test',
//           size: { width: 100, height: 30 }, 
//           position: { x: 10, y: 10 },
//           prop : {
//             isStep : true,
//             custom : {
//               step : {
  
//               },
//               expectation : {
  
//               }
//             }
  
//           },
//           attrs: {
//             rect: { 'width': 200 },
  
//             '.mbt-step-step-rect': { 'stroke': 'black', 'stroke-width': 2, 'fill': '#3498db' },
//             '.mbt-step-expectation-rect': { 'stroke': 'black', 'stroke-width': 2, 'fill': '#2980b9' },
    
//             '.mbt-step-step-text': {
//                 'ref': '.mbt-step-step-rect',
//                 'ref-y': .5,
//                 'ref-x': .5,
//                 'text-anchor': 'middle',
//                 'y-alignment': 'middle',
//                 'font-weight': 'bold',
//                 'fill': 'black',
//                 'font-size': 12,
//                 'font-family': 'Times New Roman'
//             },
//             '.mbt-step-expectation-text': {
//                 'ref': '.mbt-step-expectation-rect', 'ref-y': -.5, 'ref-x': .5,
//                 'fill': 'black', 'font-size': 12, 'font-family': 'Times New Roman'
//             }
//         },
     
//       }
//   }
  
//   markup =  [       '<g class="rotatable">',
//   '<g class="scalable">',
//   '<rect class="mbt-step-step-rect"/><rect class="mbt-step-expectation-rect"/>',
//   '</g>',
//   '<text class="mbt-step-step-text"/><text class="mbt-step-expectation-text"/>',
//   '</g>'].join('')


  
//   }