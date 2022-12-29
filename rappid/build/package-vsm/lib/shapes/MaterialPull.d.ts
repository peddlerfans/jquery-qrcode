import { dia } from 'jointjs';
export declare class VSMMaterialPull extends dia.Element {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        attrs: {
            body: {
                stroke: string;
                fill: string;
                rx: string;
                ry: string;
                cx: string;
                cy: string;
            };
            arrow: {
                fill: string;
                stroke: string;
                strokeWidth: number;
                d: string;
                targetMarker: {
                    type: string;
                    stroke: string;
                    'stroke-width': number;
                    d: string;
                };
            };
            label: {
                text: string;
                textVerticalAnchor: string;
                textAnchor: string;
                x: string;
                y: string;
                fontSize: number;
                fontFamily: string;
                fill: string;
            };
        };
    };
    preinitialize(): void;
}
