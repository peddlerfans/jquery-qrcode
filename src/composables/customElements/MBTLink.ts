import joint from "../../../node_modules/@clientio/rappid/rappid.js"
const { dia, g } = joint
import {i18n} from "@/locales";
import { f } from "vitest/dist/index-60e2a8e1";
import {MBTShapeInterface} from "./MBTShapeInterface"
const { t } = i18n.global

// window.joint = joint

export const name = 'link';
export const namespace='itea.mbt.test'+name;
export class MBTLink extends joint.shapes.bpmn2.Flow implements MBTShapeInterface  {
  static shapeName = name;
  constructor(e : Element,o: any) {
      super(e,o);
        
        this.attr(   {
          // 'background': { fill: '#454549' },
          // 'icon': { iconType: 'receive' },
          'label': { text: 'link' },
        //   markers: {
        //     iconTypes: [ 'sub-process'],
        // }

      })
    this.on('change',(evt:any)=> {
      if (evt.changed && evt.changed.custom && evt.changed.custom) {
        // attrs['.mbt-step-' + 'step' + '-text'] = evt.changed.custom.step;

        this.attr('label/text/0',"test")
      }
      
    })
 

  }

  // static namespace = 'itea.mbt.test.Gateway';
  getInspectorSchema(){
    

  }

  setInspectorData(){
    
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



