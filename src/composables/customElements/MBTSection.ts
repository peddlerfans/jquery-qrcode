import joint from "../../../node_modules/@clientio/rappid/rappid.js"

import {i18n} from "@/locales";
import { f } from "vitest/dist/index-60e2a8e1";
import {MBTShapeInterface} from "./MBTShapeInterface"
const { t } = i18n.global
import { MBTGroupBase } from "./MBTGroupBase";
window.joint = joint

export const name = 'section';
export const namespace='itea.mbt.test'+name;
export class MBTSection extends MBTGroupBase {
  static shapeName = name;
  constructor(e : Element,o: any) {
      super(e,o);
        
        this.attr(   {
          // 'background': { fill: '#454549' },
          // 'icon': { iconType: 'receive' },
          'label': { text: 'Section' },
          markers: {
            iconTypes: [ 'ad-hoc'],
        }

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
  ifEmbedable(child?:any):boolean{
    return super.ifEmbedable()
    // return true;
  }
  ifDisallowLink():boolean{
  //  return true;
   return super.ifDisallowLink()
  }

  getInspectorSchema(){
    super.getInspectorSchema()

  }

  setInspectorData(){
    super.setInspectorData()
    
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
    return super.defaults()
  }

}



