// import   from './MBTStart';
// import { MBTParallelGateway,name as mbtpgw } from './MBTParallelGateway';
// import { MBTLink,name as mbtlink } from './MBTLink';
import { MBTGroup } from './MBTGroup';
// import { MBTExclusiveGateway } from './MBTExclusiveGateway';
import { MBTAW } from './MBTAW';
import joint from "../../../node_modules/@clientio/rappid/rappid.js"
const { dia, g } = joint


  
export {MBTAW} from './MBTAW';
// export {MBTExclusiveGateway} from './MBTExclusiveGateway';
export {MBTGroup} from './MBTGroup';
// export {MBTLink} from './MBTLink';
// export {MBTParallelGateway} from './MBTParallelGateway';
// export {MBTStart} from './MBTStart';

// const namespace = {
//   MBTStart,
//   MBTParallelGateway,
//   MBTLink,
//   MBTGroup,
//   MBTExclusiveGateway,
//   MBTAW
// };

export  function getShapesNamespace(){
//   let namespace :object= {
//     MBTStart,
//     MBTParallelGateway,
//     MBTLink,
//     MBTGroup,
//     MBTExclusiveGateway,
//     MBTAW
//   };
//   let elements = Object.keys(namespace).map((name:string, index) => {
    
    
//     const Constructor = namespace[name];

//     const element = new Constructor({
//         attrs: {
//             root: {
               
//                 tabindex: index + 1
//             }
//         }
//     });
//     // const { width, height } = element.size();

//     return element;
// });
  let customShapes:any = {};

  Object.assign(joint.shapes,{'itea':{'mbt':customShapes}});
  for(let shape of [MBTGroup]){
    customShapes[shape.shapeName]=shape;

  }
  return joint.shapes;
};