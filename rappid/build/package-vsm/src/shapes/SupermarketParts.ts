/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';
import { getMaterialPattern } from '../pattern';
import { FILL_COLOR, OUTLINE_COLOR, SECONDARY_FILL_COLOR } from '../theme';

export class VSMSupermarketParts extends dia.Element {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMSupermarketParts',
            size: {
                width: 120,
                height: 80
            },
            attrs: {
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
            }
        }
    }

    preinitialize(): void {
        this.markup = [{
            tagName: 'rect',
            selector: 'body'
        }, {
            tagName: 'text',
            selector: 'label'
        }];
    }
}
