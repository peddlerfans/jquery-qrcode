import { dia } from 'jointjs';
export declare class VSMTruck extends dia.Element {
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
                refD: string;
            };
            background: {
                fill: string;
                refD: string;
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
