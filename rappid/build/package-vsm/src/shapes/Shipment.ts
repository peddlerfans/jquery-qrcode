/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia } from 'jointjs';
import { OUTLINE_COLOR } from '../theme';

export class VSMShipment extends dia.Link {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMShipment',
            attrs: {
                line: {
                    connection: true,
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 8,
                    strokeLinejoin: 'round',
                    strokeLinecap: 'round',
                    targetMarker: {
                        'type': 'path',
                        'd': 'M 0 -10 0 -10 -20 0 0 10 0 10'
                    }
                }
            }
        }
    }

    preinitialize() {
        this.markup = [{
            tagName: 'path',
            selector: 'line',
            attributes: {
                'fill': 'none'
            }
        }];
    }
}
