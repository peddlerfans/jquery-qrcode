import { dia } from 'jointjs';
import { FILL_COLOR, SECONDARY_FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
export class VSMTriangleInventory extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMTriangleInventory', size: {
                width: 80,
                height: 80
            }, attrs: {
                body: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: FILL_COLOR,
                    d: 'M calc(0.5*w) 0 calc(w) calc(h) H 0 Z',
                },
                icon: {
                    stroke: OUTLINE_COLOR,
                    fill: SECONDARY_FILL_COLOR,
                    strokeWidth: 2,
                    d: 'M calc(0.5*w-2) calc(0.4*h) V calc(0.8*h) h 4 V calc(0.4*h) Z',
                },
                label: {
                    text: 'Triangle Inventory',
                    textVerticalAnchor: 'top',
                    textAnchor: 'middle',
                    x: 'calc(0.5*w)',
                    y: `calc(h + ${TEXT_MARGIN})`,
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            } });
    }
    preinitialize() {
        this.markup = [{
                tagName: 'path',
                selector: 'body'
            }, {
                tagName: 'path',
                selector: 'icon'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
export class VSMRoundedInventory extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMRoundedInventory', size: {
                width: 80,
                height: 80
            }, attrs: {
                body: {
                    strokeWidth: 2,
                    stroke: OUTLINE_COLOR,
                    fill: FILL_COLOR,
                    x: 0,
                    y: 0,
                    d: 'M 0 calc(h) C 0 calc(0.5 * h) 0 0 calc(0.5*w) 0 C calc(w) 0 calc(w) calc(0.5 * h) calc(w) calc(h) Z',
                },
                icon: {
                    stroke: OUTLINE_COLOR,
                    fill: SECONDARY_FILL_COLOR,
                    strokeWidth: 2,
                    d: 'M calc(0.5*w-2) calc(0.4*h) V calc(0.8*h) h 4 V calc(0.4*h) Z',
                },
                label: {
                    text: 'Rounded Inventory',
                    textVerticalAnchor: 'top',
                    textAnchor: 'middle',
                    x: 'calc(0.5 * w)',
                    y: `calc(h + ${TEXT_MARGIN})`,
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            } });
    }
    preinitialize() {
        this.markup = [{
                tagName: 'path',
                selector: 'body'
            }, {
                tagName: 'path',
                selector: 'icon'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
