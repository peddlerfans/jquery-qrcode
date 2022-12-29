import { dia } from 'jointjs';
export declare class VSMProductionKanban extends dia.Element {
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
            label: {
                text: string;
                textVerticalAnchor: string;
                textAnchor: string;
                textWrap: {
                    width: number;
                    height: number;
                    ellipsis: boolean;
                };
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
export declare class VSMProductionBatchKanban extends dia.Element {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        attrs: {
            bodies: {
                strokeWidth: number;
                stroke: string;
                fill: string;
                x: number;
                y: number;
                d: string;
            };
            bodyMiddle: {
                transform: string;
            };
            bodyBottom: {
                transform: string;
            };
            label: {
                text: string;
                textVerticalAnchor: string;
                textAnchor: string;
                textWrap: {
                    width: number;
                    height: number;
                    ellipsis: boolean;
                };
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
