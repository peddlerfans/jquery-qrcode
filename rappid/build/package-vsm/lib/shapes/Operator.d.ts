import { dia } from 'jointjs';
export declare class VSMOperator extends dia.Element {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        attrs: {
            body: {
                strokeWidth: number;
                stroke: string;
                fill: string;
                rx: string;
                ry: string;
                cx: string;
                cy: string;
            };
            cap: {
                fill: string;
                stroke: string;
                strokeWidth: number;
                strokeLinecap: string;
                d: string;
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
