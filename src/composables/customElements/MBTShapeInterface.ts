
export interface MBTShapeInterface {
    // static namespace:string,
    getInspectorSchema():any;
    setInspectorData:()=>any;
    getPropertiesSchema?:()=>any;
    setPropertiesData?:()=>any;
  }