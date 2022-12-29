/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR } from '../theme';

export class VSMMaterialFlow extends dia.Link {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMMaterialFlow',
            attrs: {
                line: {
                    connection: true,
                    stroke: FILL_COLOR,
                    strokeWidth: 16,
                    strokeLinejoin: 'round',
                    strokeLinecap: 'square',
                    targetMarker: {
                        'type': 'path',
                        'stroke': OUTLINE_COLOR,
                        'stroke-width': 2,
                        'd': 'M 0 -8 0 -20 -30 0 0 20 0 8'
                    }
                },
                outline: {
                    connection: true,
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 20,
                    strokeLinecap: 'square',
                    strokeLinejoin: 'round',
                },
                material: {
                    connection: true,
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 10,
                    strokeLinecap: 'butt',
                    strokeLinejoin: 'round',
                    strokeDasharray: '15,5',
                }
            }
        }
    }

    preinitialize() {
        this.markup = [{
            tagName: 'path',
            selector: 'outline',
            attributes: {
                'fill': 'none'
            }
        }, {
            tagName: 'path',
            selector: 'line',
            attributes: {
                'fill': 'none'
            }
        }, {
            tagName: 'path',
            selector: 'material',
            attributes: {
                'fill': 'none'
            }
        }];
    }
}
