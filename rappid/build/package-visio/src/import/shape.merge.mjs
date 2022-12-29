import lodash from 'lodash';
import { visioAttributeNameToRappidConvention } from './cell.mjs';
import { VisioAttribute } from '../types/enums.mjs';
import { debug } from '../helpers/debug.mjs';

const mergeWith = lodash.mergeWith;

const sumArray = [
    // VisioCellAttributeName.PinX,
    // VisioCellAttributeName.PinY,
    // VisioCellAttributeName.LocPinX,
    // VisioCellAttributeName.LocPinY,
];

const normalizedSumArray = sumArray.map(visioAttributeNameToRappidConvention);

export function mergeShapes(parentShape, childShape) {

    return mergeWith({}, parentShape, childShape, customizer)
}

function customizer(parentValue, childValue, key, parentObject, childObject) {

    if (parentValue !== undefined) {

        if (key === VisioAttribute.id) {
            debug.log('mergeShapes ID override ! (check)',
                { parentValue, childValue, key, parentObject, childObject }
            )
        }

        if (key === VisioAttribute.sections) {
            debug.log('mergeShapes - overriding sections (check)',
                { parentValue, childValue, key, parentObject, childObject }
            )
        }

        if (key === VisioAttribute.rows) {
            // TODO: this should be perhaps applied to all indexed array
            if (Array.isArray(childValue)) {
                childValue.forEach(row => {
                    const { index, deleted } = row;
                    const parentIndex = parentValue.findIndex(row => row.index === index);

                    if (deleted) {
                        parentValue.splice(parentIndex, 1);
                        return parentValue;
                    }

                    if (parentIndex > -1) {
                        lodash.merge(parentValue[parentIndex], row);
                    } else {
                        parentValue.push(row);
                    }
                });
            }
            return parentValue;
        }

    }


    if (normalizedSumArray.includes(key))
        return parentValue + childValue;

}
