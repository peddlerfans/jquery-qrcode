/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';

const offset = 30;

export class VSMCustomerSupplier extends dia.Element {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMCustomerSupplier',
            size: {
                width: 120,
                height: 80
            },
            attrs: {
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
                        height: -offset -TEXT_MARGIN,
                        ellipsis: true
                    },
                    x: 'calc(0.5 * w)',
                    y: `calc(0.5 * h + ${offset / 2})`,
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
