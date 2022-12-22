import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
export class VSMLoadLevelling extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMLoadLevelling', size: {
                width: 120,
                height: 60
            }, attrs: {
                body: {
                    fill: FILL_COLOR,
                    width: 'calc(w)',
                    height: 'calc(h)',
                },
                outline: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    d: 'M 0 0 H calc(w) M calc(w) calc(h) H 0',
                },
                circle1Icon: {
                    cx: 'calc(0.375 * w)',
                    cy: 'calc(0.5 * h)',
                    r: 'calc(0.1 * s)',
                },
                circle2Icon: {
                    cx: 'calc(0.9 * w)',
                    cy: 'calc(0.5 * h)',
                    r: 'calc(0.1 * s)',
                },
                cross1Icon: {
                    transform: 'translate(calc(0.1*w),calc(.5*h))',
                    d: 'M -calc(.1*s) -calc(.1*s) L calc(.1*s) calc(.1*s) M -calc(.1*s) calc(.1*s) L calc(.1*s) -calc(.1*s)'
                },
                cross2Icon: {
                    transform: 'translate(calc(0.625*w),calc(.5*h))',
                    d: 'M -calc(.1*s) -calc(.1*s) L calc(.1*s) calc(.1*s) M -calc(.1*s) calc(.1*s) L calc(.1*s) -calc(.1*s)'
                },
                icons: {
                    stroke: OUTLINE_COLOR,
                    fill: 'none',
                    strokeWidth: 2,
                },
                label: {
                    text: 'Load Levelling',
                    textVerticalAnchor: 'top',
                    textAnchor: 'middle',
                    x: 'calc(0.5 * w)',
                    y: `calc(h + ${TEXT_MARGIN})`,
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
                tagName: 'path',
                selector: 'outline'
            }, {
                tagName: 'path',
                selector: 'cross1Icon',
                groupSelector: 'icons'
            }, {
                tagName: 'path',
                selector: 'cross2Icon',
                groupSelector: 'icons'
            }, {
                tagName: 'circle',
                selector: 'circle1Icon',
                groupSelector: 'icons'
            }, {
                tagName: 'circle',
                selector: 'circle2Icon',
                groupSelector: 'icons'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
