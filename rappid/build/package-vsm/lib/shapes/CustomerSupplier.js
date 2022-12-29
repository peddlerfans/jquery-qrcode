import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
const offset = 30;
export class VSMCustomerSupplier extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMCustomerSupplier', size: {
                width: 120,
                height: 80
            }, attrs: {
                body: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: FILL_COLOR,
                    d: `M 0 ${offset} V calc(h) h calc(w) v -calc(h) l -calc(0.33 * w) ${offset} v ${-offset} l -calc(0.33 * w) ${offset} v ${-offset} z`,
                },
                label: {
                    text: 'Customer Supplier',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -TEXT_MARGIN * 2,
                        height: -offset - TEXT_MARGIN,
                        ellipsis: true
                    },
                    x: 'calc(0.5 * w)',
                    y: `calc(0.5 * h + ${offset / 2})`,
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            } });
    }
    preinitialize() {
        this.markup = [{
                tagName: 'path',
                selector: 'body'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
