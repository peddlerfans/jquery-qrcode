import { MBTLink } from './MBTLink';
import { MBTGroup } from './MBTGroup';
import { MBTSection } from './MBTSection';
import { MBTStartEvent } from './MBTStartEvent';
import { MBTEndEvent } from './MBTEndEvent';

import { MBTParallelGateway,} from './MBTParallelGateway';
import { MBTExclusiveGateway } from './MBTExclusiveGateway';
import { MBTAW } from './MBTAW';
import joint from "../../../node_modules/@clientio/rappid/rappid.js"
const { dia, g } = joint


  
export {MBTAW} from './MBTAW';

export {MBTGroup} from './MBTGroup';
export {MBTSection} from './MBTSection';
export {MBTStartEvent} from './MBTStartEvent';
export { MBTEndEvent } from './MBTEndEvent';
export {MBTExclusiveGateway} from './MBTExclusiveGateway';
export {MBTLink} from './MBTLink';
export {MBTParallelGateway} from './MBTParallelGateway';




export  function getShapesNamespace(){

  let customShapes:any = {};

  Object.assign(joint.shapes,{'itea':{'mbt':customShapes}});
  for(let shape of [MBTGroup,MBTSection,MBTStartEvent,MBTEndEvent,MBTExclusiveGateway,MBTParallelGateway,MBTLink]){
    customShapes[shape.shapeName]=shape;

  }
  return joint.shapes;
};