import { MBTLink } from './MBTLink';
import { MBTGroup } from './MBTGroup';
import { MBTSection } from './MBTSection';
import { MBTStartEvent } from './MBTStartEvent';
import { MBTEndEvent } from './MBTEndEvent';

import { MBTParallelGateway, } from './MBTParallelGateway';
import { MBTExclusiveGateway } from './MBTExclusiveGateway';
import { MBTAW } from './MBTAW';
import joint from "../../../node_modules/@clientio/rappid/rappid.js"
const { dia, g } = joint



export { MBTAW, namespace as NS_MBTAW } from './MBTAW';

export { MBTGroup, namespace as NS_MBTGroup } from './MBTGroup';
export { MBTSection, namespace as NS_MBTSection } from './MBTSection';
export { MBTStartEvent, namespace as NS_StartEvent } from './MBTStartEvent';
export { MBTEndEvent, namespace as NS_EndEvent } from './MBTEndEvent';
export { MBTExclusiveGateway, namespace as NS_MBTExclusiveGateway } from './MBTExclusiveGateway';
export { MBTLink, namespace as NS_MBTLink } from './MBTLink';
export { MBTParallelGateway, namespace as NS_MBTParallelGateway } from './MBTParallelGateway';




export function getShapesNamespace() {

  let customShapes: any = {};

  Object.assign(joint.shapes, { 'itea': { 'mbt': {'text' : customShapes} } });
  for (let shape of [MBTAW,MBTGroup, MBTSection, MBTStartEvent, MBTEndEvent, MBTExclusiveGateway, MBTParallelGateway, MBTLink]) {
    customShapes[shape.shapeName] = shape;

  }
  return joint.shapes;
};