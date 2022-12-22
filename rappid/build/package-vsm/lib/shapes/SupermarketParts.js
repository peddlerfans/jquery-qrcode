import { dia } from 'jointjs';
import { getMaterialPattern } from '../pattern';
import { FILL_COLOR, OUTLINE_COLOR, SECONDARY_FILL_COLOR } from '../theme';
export class VSMSupermarketParts extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMSupermarketParts', size: {
                width: 120,
                height: 80
            }, attrs: {
                body: {
                    width: 'calc(w)',
                    height: 'calc(h)',
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: getMaterialPattern(SECONDARY_FILL_COLOR, FILL_COLOR),
                },
                label: {
                    text: 'Supermarket Parts',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -10,
                        height: -10,
                        ellipsis: true
                    },
                    x: 'calc(0.5 * w)',
                    y: 'calc(0.5 * h)',
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            } });
    }
    preinitialize() {
        this.markup = [{
                tagName: 'rect',
                selector: 'body'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
