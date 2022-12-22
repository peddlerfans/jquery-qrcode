/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';
import { SECONDARY_FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';

export class VSMGoSee extends dia.Element {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMGoSee',
            size: {
                width: 120,
                height: 40
            },
            attrs: {
                body: {
                    strokeWidth: 4,
                    stroke: OUTLINE_COLOR,
                    strokeLinecap: 'round',
                    fill: SECONDARY_FILL_COLOR,
                    refD: 'M 64 200 C 64 296 80 328 144 328 C 208 328 224 296 224 200 C 224 200 208 184 144 184 C 80 184 64 200 64 200 Z M 448 200 C 448 296 432 328 368 328 C 304 328 288 296 288 200 C 288 200 304 184 368 184 C 432 184 448 200 448 200 Z M 448 200 L 464 200 M 64 200 L 48 200 M 224 232 C 224 207 251 192 272 204 C 282 210 288 221 288 232 C 288 207 261 192 240 204 C 230 210 224 221 224 232'
                },
                label: {
                    text: 'Go see',
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
            tagName: 'path',
            selector: 'body'
        }, {
            tagName: 'text',
            selector: 'label'
        }];
    }
}
