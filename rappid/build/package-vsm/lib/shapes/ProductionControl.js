import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
export class VSMProductionControl extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMProductionControl', size: {
                width: 120,
                height: 80
            }, attrs: {
                body: {
                    width: 'calc(w)',
                    height: 'calc(h)',
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: FILL_COLOR,
                },
                label: {
                    text: 'Production Control',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -TEXT_MARGIN * 2,
                        height: -TEXT_MARGIN * 2,
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
