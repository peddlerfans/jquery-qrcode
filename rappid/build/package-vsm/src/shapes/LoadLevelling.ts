/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';

export class VSMLoadLevelling extends dia.Element {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMLoadLevelling',
            size: {
                width: 120,
                height: 60
            },
            attrs: {
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
            }
        }
    }

    preinitialize(): void {
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
