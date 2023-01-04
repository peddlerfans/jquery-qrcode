import joint from "../../../node_modules/@clientio/rappid/rappid.js"

import { i18n } from "@/locales";
import { MBTShapeInterface } from "./MBTShapeInterface";
import { NS_MBTSection } from "./index.js";
const { t } = i18n.global;

// window.joint = joint

// export const name = 'group';
// export const namespace='itea.mbt.test'+name;
export class MBTGroupBase
  extends joint.shapes.bpmn2.Activity
  implements MBTShapeInterface
{
  // static shapeName = name;
  constructor(e: Element, o: any) {
    super(e, o);
    // if(this.attributes.embeds && this.attributes.embeds.length > 0){
    //   this.fitEmbeds({
    //     deep:true,
    //     padding:{
    //       top:20,
    //       left: 10,
    //       right: 10,
    //       bottom: 20
    //     }
    //   })
    // }
    
  }
  ifEmbedable(child?: any):boolean {
    return child.attributes?.type !== NS_MBTSection;
  }

  ifDisallowLink() :boolean{
    return true;
  }

  getInspectorSchema() {}

  setInspectorData() {}


  defaults() {
    return {
      ...super.defaults,
      type: "itea.mbt.test",
    };
  }
}
