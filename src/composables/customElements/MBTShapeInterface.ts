import { BoxPackProperty } from "csstype";

export interface MBTShapeInterface {
    // static namespace:string,
    getInspectorSchema():any;
    setInspectorData:()=>any;
    getPropertiesSchema?:()=>any;
    setPropertiesData?:()=>any;
    ifDisallowLink?:() =>boolean;
    // 改变stencil按下样式
    onStencilRender?:() =>void;
  }

