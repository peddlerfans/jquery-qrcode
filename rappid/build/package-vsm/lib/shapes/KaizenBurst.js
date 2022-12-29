import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR } from '../theme';
export class VSMKaizenBurst extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMKaizenBurst', size: {
                width: 120,
                height: 120
            }, attrs: {
                body: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: FILL_COLOR,
                    refD: 'M 70 104 60 89 46 106 39 86 3 106 25 78 0 72 20 54 3 39 31 42 27 22 43 32 48 4 59 37 74 10 78 39 101 20 94 48 119 47 99 62 116 75 93 80 101 95 79 91 81 120 Z'
                },
                label: {
                    text: 'Kaizen Burst',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    textWrap: {
                        width: '50%',
                        height: '50%',
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
                tagName: 'path',
                selector: 'body'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
