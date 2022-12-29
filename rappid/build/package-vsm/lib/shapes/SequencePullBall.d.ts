import { dia } from 'jointjs';
export declare class VSMSequencePullBall extends dia.Element {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        attrs: {
            inner: {
                strokeWidth: number;
                stroke: string;
                fill: string;
                rx: string;
                ry: string;
                cx: string;
                cy: string;
            };
            outer: {
                strokeWidth: number;
                stroke: string;
                fill: string;
                rx: string;
                ry: string;
                cx: string;
                cy: string;
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
