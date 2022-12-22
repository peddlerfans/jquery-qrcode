/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { dia, g } from 'jointjs';
import { OUTLINE_COLOR } from '../theme';

export class VSMElectronicInformationFlow extends dia.Link {

    defaults() {
        return {
            ...super.defaults,
            type: 'VSMElectronicInformationFlow',
            attrs: {
                line: {
                    connection: true,
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    strokeLinejoin: 'round',
                    targetMarker: {
                        'type': 'path',
                        'd': 'M 10 -5 0 0 10 5 8 0 z'
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

    preinitialize() {
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

export class VSMElectronicInformationFlowView extends dia.LinkView {

    findPath(route: dia.Point[], sourcePoint: dia.Point, targetPoint: dia.Point): g.Path {

        const path = super.findPath(route, sourcePoint, targetPoint);

        const offset = 10;
        const ratio = 0.5;

        const segmentIndex = path.segmentIndexAt(ratio);
        const segment = path.getSegment(segmentIndex);
        const tangent = segment.tangentAt(ratio);

        const { start: p2 } = tangent;
        const { end: p1 } = tangent.clone().setLength(offset).rotate(p2, 90).parallel(offset);
        const p3 = p1.reflection(p2);

        const { Path } = g;

        path.replaceSegment(segmentIndex, [
            Path.createSegment('L', p1),
            Path.createSegment('L', p3),
            Path.createSegment('L', segment.end)
        ]);

        return path;
    }
}
