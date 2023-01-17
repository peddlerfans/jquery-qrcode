import joint from "../../../node_modules/@clientio/rappid/rappid.js"

import {i18n} from "@/locales";

import {MBTShapeInterface} from "./MBTShapeInterface"
const { t } = i18n.global

window.joint = joint

export const name = 'startevent';
export const namespace='itea.mbt.test.'+name;
export class MBTStartEvent extends joint.shapes.bpmn2.Event implements MBTShapeInterface  {
  static shapeName = name;
  constructor(e : Element,o: any) {
      super(e,o);
        
        this.attr(   {
        // 'background': { fill: '#454549' },
        // 'icon': { iconType: 'link2' },
        // {  borderType: 'double'},
        // 'border': 
        // {
        //       borderType: 'thick',
        //       borderStyle: 'dashed'
        //   },
        'label': { text: 'startevent' },
        // 'stroke': '#fe854f',
        // 'body': {
        //   stroke: '#fe854f',
        //   border: {
        //     borderType: 'double',
        //     borderStyle: 'dashed'
        // }
      // },
      })
    this.on('change',(evt:any)=> {
      if (evt.changed && evt.changed.custom && evt.changed.custom) {
        // attrs['.mbt-step-' + 'step' + '-text'] = evt.changed.custom.step;
        this.updateRectangles();
        this.attr('label/text/0',"test")
      }
      
    })
 
   this.updateRectangles();
  }

  // static namespace = 'itea.mbt.test.group';
  getInspectorSchema(){
    const options = {
      colorPalette: [
        { content: 'transparent', icon: '../src/assets/transparent-icon.svg' },
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
    }
    return {
      inputs: {
        attrs: {
            circle: {
                fill: {
                    type: 'color-palette',
                    options: options.colorPalette,
                    label: 'fill',
                    group: 'presentation',
                    index: 1
                }
            }
        }
    },
    groups: {
        presentation: {
            label: 'Presentation',
            index: 1
        }
    }
    }

  }

  setInspectorData(){
    
  }
  
  updateRectangles() {

    var attrs = this.get('attrs');
    var rects = [
      { type: 'step', text: this.prop('custom/step') || 'BBB'},
      { type: 'expectation', text: this.prop('custom/expectation') },
      // { type: 'methods', text: this.get('methods') }
  ];

  var offsetY = 0;

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
        type: 'itea.mbt.test'
     
   
    }
  }

}



