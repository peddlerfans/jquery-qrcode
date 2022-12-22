import * as joint from "../../../node_modules/@clientio/rappid/dist/rappid.js"

import { i18n } from "@/locales";
import { MBTShapeInterface } from "./MBTShapeInterface";
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
  }
  ifEmbedable(child?: any):boolean {
    return true;
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
