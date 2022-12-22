import { dia } from 'jointjs';
export declare class VSMSignalKanban extends dia.Element {
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
                x: number;
                y: number;
                d: string;
            };
            icon: {
                stroke: string;
                strokeWidth: number;
                fill: string;
                x: string;
                y: string;
                textAnchor: string;
                textVerticalAnchor: string;
                text: string;
                fontSize: number;
                fontWeight: string;
                fontFamily: string;
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
