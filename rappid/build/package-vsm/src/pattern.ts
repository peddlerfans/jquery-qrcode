/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';

export const getMaterialPattern: (stroke: string, fill: string, size?: number) => dia.SVGPatternJSON =
    (stroke, fill, size = 20) => {
        const h = size / 2;
        return {
            type: 'pattern',
            attrs: {
                'width': size,
                'height': size,
                'stroke': stroke,
                'fill': fill,
                'stroke-width': 2,
            },
            markup: [{
                tagName: 'rect',
                attributes: {
                    'width': size,
                    'height': size,
                    'stroke': 'none'
                }
            }, {
                tagName: 'path',
                attributes: {
                    'fill': 'none',
                    'd': `M 0 ${2*h} L ${2*h} 0 M ${h} ${3*h} L ${3*h} ${h} M -${h} ${h} L ${h} -${h}`
                }
            }]
        }
    };
