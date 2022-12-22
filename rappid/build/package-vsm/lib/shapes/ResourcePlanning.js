import { dia } from 'jointjs';
import { FILL_COLOR, OUTLINE_COLOR, TEXT_MARGIN } from '../theme';
export class VSMResourcePlanning extends dia.Element {
    defaults() {
        return Object.assign(Object.assign({}, super.defaults), { type: 'VSMResourcePlanning', size: {
                width: 80,
                height: 80
            }, tilt: 10, attrs: {
                body: {
                    fill: FILL_COLOR,
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2
                },
                top: {
                    cx: 'calc(0.5*w)',
                    rx: 'calc(0.5*w)',
                    fill: FILL_COLOR,
                    stroke: OUTLINE_COLOR,
                    strokeWidth: 2
                },
                label: {
                    text: 'MRP/ERP',
                    textVerticalAnchor: 'top',
                    textAnchor: 'middle',
                    x: 'calc(0.5*w)',
                    y: `calc(h+${TEXT_MARGIN})`,
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
                tagName: 'ellipse',
                selector: 'top'
            }, {
                tagName: 'text',
                selector: 'label'
            }];
    }
    initialize() {
        super.initialize(...arguments);
        this.on('change', (_, opt) => {
            if (!this.hasChanged('tilt') && !this.hasChanged('size'))
                return;
            this.resetTilt(opt);
        });
        this.resetTilt();
    }
    resetTilt(opt) {
        const tilt = this.get('tilt') || 0;
        return this.attr({
            body: {
                d: this.getLateralAreaPathData(tilt)
            },
            top: {
                cy: tilt,
                ry: tilt
            }
        }, opt);
    }
    getLateralAreaPathData(tilt) {
        const { width, height } = this.size();
        const rx = width / 2;
        const ry = tilt;
        const kappa = 0.551784;
        const cx = kappa * rx;
        const cy = kappa * tilt;
        const x = 0;
        const y = 0;
        const xLeft = x;
        const xCenter = x + (width / 2);
        const xRight = x + width;
        const ySideTop = y + ry;
        const yCurveTop = ySideTop - ry;
        const ySideBottom = y + height - ry;
        const yCurveBottom = y + height;
        const curveBottom = (offset) => {
            return [
                'M', xLeft, ySideBottom - offset,
                'C', x, (ySideBottom + cy) - offset, (xCenter - cx), yCurveBottom - offset, xCenter, yCurveBottom - offset,
                'C', (xCenter + cx), yCurveBottom - offset, xRight, (ySideBottom + cy) - offset, xRight, ySideBottom - offset,
            ];
        };
        return [
            ...curveBottom(0),
            'L', xRight, ySideTop,
            'C', xRight, (ySideTop - cy), (xCenter + cx), yCurveTop, xCenter, yCurveTop,
            'C', (xCenter - cx), yCurveTop, xLeft, (ySideTop - cy), xLeft, ySideTop,
            'Z',
            ...curveBottom(5),
            ...curveBottom(10)
        ].join(' ');
    }
}
