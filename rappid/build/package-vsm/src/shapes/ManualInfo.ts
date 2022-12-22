/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';

export class VSMManualInfo extends dia.Link {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMManualInfo',
            attrs: {
                line: {
                    connection: true,
                    stroke: '#333333',
                    strokeWidth: 2,
                    strokeLinejoin: 'round',
                    targetMarker: {
                        'type': 'path',
                        'd': 'M 10 -5 0 0 10 5 z'
                    }
                },
                wrapper: {
                    connection: true,
                    strokeWidth: 10,
                    strokeLinejoin: 'round'
                }
            }
        }
    }

    preinitialize(): void {
        this.markup = [{
            tagName: 'path',
            selector: 'wrapper',
            attributes: {
                'fill': 'none',
                'cursor': 'pointer',
                'stroke': 'transparent',
                'stroke-linecap': 'round'
            }
        }, {
            tagName: 'path',
            selector: 'line',
            attributes: {
                'fill': 'none',
                'pointer-events': 'none'
            }
        }]
    }
}
