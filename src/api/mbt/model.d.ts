declare namespace API {
  
  type MBTInfo = {
    name: string,
    description: string,
    version?: string,
    imgUrl?:string,
    requirements?:string,
    modelJSON?:[],
    datapoolschema:[],
    meta?:[],
    resources?:[],
    datapool?:[]
  };
}
