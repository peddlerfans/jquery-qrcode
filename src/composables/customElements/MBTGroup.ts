import joint from "../../../node_modules/@clientio/rappid/rappid.js"
const { dia, g } = joint
import {i18n} from "@/locales";
import { MBTGroupBase } from "./MBTGroupBase";
const { t } = i18n.global
// import { MBTShapeInterface } from "./MBTShapeInterface";
// window.joint = joint

export const name = 'group';
export const namespace='itea.mbt.test'+name;
export class MBTGroup extends MBTGroupBase {
// joint.shapes.bpmn2.Activity
// implements MBTShapeInterface  {
  static shapeName = name;
  constructor(e : Element,o: any) {
      super(e,o);
        console.log(this.markup)
        // debugger
        this.attr(   {
          // 'background': { fill: '#454549' },
          // 'icon': { iconType: 'receive' },
          'label': { 
            refY:'10',

            text: 'Loop' },
          'border': 
          {

                borderStyle: 'dashed'
            },
          markers: {
            iconTypes: [ 'loop'],
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
    // return {
    //     ...super.defaults,
    //     type: 'itea.mbt.test'
     
   
    // }
  }

}



