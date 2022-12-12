import { BoxPackProperty } from "csstype";

export interface MBTShapeInterface {
    // static namespace:string,
    getInspectorSchema():any;
    setInspectorData:()=>any;
    getPropertiesSchema?:()=>any;
    setPropertiesData?:()=>any;
    ifDisallowLink?:() =>boolean;
  }

