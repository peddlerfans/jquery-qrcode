import { dia } from 'jointjs';
import { OUTLINE_COLOR } from '../theme';
export class VSMShipment extends dia.Link {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMShipment', attrs: {
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
            } });
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
