import { dia } from 'jointjs';
import { getMaterialPattern } from '../pattern';
import { FILL_COLOR, SECONDARY_FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
const HEADER_HEIGHT = 30;
export class VSMDedicatedProcess extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMDedicatedProcess', size: {
                width: 120,
                height: 120
            }, attrs: {
                body: {
                    width: 'calc(w)',
                    height: 'calc(h)',
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    fill: FILL_COLOR
                },
                header: {
                    width: 'calc(w)',
                    height: HEADER_HEIGHT,
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    fill: FILL_COLOR,
                },
                label: {
                    text: 'Dedicated Process',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -TEXT_MARGIN * 2,
                        maxLineCount: 2,
                        ellipsis: true
                    },
                    x: 'calc(0.5 * w)',
                    y: HEADER_HEIGHT / 2,
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            } });
    }
    preinitialize() {
        this.markup = [{
                tagName: 'rect',
                selector: 'body'
            }, {
                tagName: 'rect',
                selector: 'header'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
export class VSMSharedProcess extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMSharedProcess', size: {
                width: 120,
                height: 120
            }, attrs: {
                body: {
                    width: 'calc(w)',
                    height: 'calc(h)',
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    fill: getMaterialPattern(SECONDARY_FILL_COLOR, FILL_COLOR),
                },
                header: {
                    width: 'calc(w)',
                    height: HEADER_HEIGHT,
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    fill: FILL_COLOR,
                },
                label: {
                    text: 'Shared Process',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    textWrap: {
                        width: -TEXT_MARGIN * 2,
                        maxLineCount: 2,
                        ellipsis: true
                    },
                    x: 'calc(0.5 * w)',
                    y: HEADER_HEIGHT / 2,
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            } });
    }
    preinitialize() {
        this.markup = [{
                tagName: 'rect',
                selector: 'body'
            }, {
                tagName: 'rect',
                selector: 'header'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
}
export class VSMSubprocess extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMSubprocess', size: {
                width: 120,
                height: 80
            }, thickness: 10, attrs: {
                body: {
                    width: 'calc(w)',
                    height: 'calc(h)',
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    fill: FILL_COLOR,
                },
                stripes: {
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2,
                    fill: SECONDARY_FILL_COLOR,
                },
                label: {
                    text: 'Subprocess',
                    textVerticalAnchor: 'middle',
                    textAnchor: 'middle',
                    textWrap: {
                        // width
                        height: -TEXT_MARGIN * 2,
                        ellipsis: true
                    },
                    x: 'calc(0.5 * w)',
                    y: 'calc(0.5 * h)',
                    fontSize: 13,
                    fontFamily: 'sans-serif',
                    fill: OUTLINE_COLOR
                }
            } });
    }
    preinitialize() {
        this.markup = [{
                tagName: 'rect',
                selector: 'body'
            }, {
                tagName: 'path',
                selector: 'stripes'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
    initialize() {
        super.initialize(...arguments);
        this.on('change', (_, opt) => {
            if (!this.hasChanged('thickness'))
                return;
            this.resetThickness(opt);
        });
        this.resetThickness();
    }
    resetThickness(opt) {
        const thickness = this.get('thickness') || 0;
        this.attr({
            stripes: {
                d: `M 0 0 V calc(h) h ${thickness} V 0 Z M calc(w) 0 V calc(h) h -${thickness} V 0 Z`
            },
            label: {
                textWrap: {
                    width: -(TEXT_MARGIN + thickness) * 2,
                }
            }
        }, opt);
    }
}
