import { assertIsRelJxon } from './assert/jxon.mjs';
import { VisioJxonRelKey } from '../types/enums.mjs';
import { relationshipToNumber } from '../helpers/relationshipToNumber.mjs';

export function getParsedRel(relJxon){
    assertIsRelJxon(relJxon);

    return relationshipToNumber(relJxon[VisioJxonRelKey.RelId]);
}
