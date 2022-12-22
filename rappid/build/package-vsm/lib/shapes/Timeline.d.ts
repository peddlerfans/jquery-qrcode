import { dia } from 'jointjs';
export declare class VSMTimelineWaiting extends dia.Element {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        attrs: {
            line: {
                strokeWidth: number;
                stroke: string;
                strokeLinecap: string;
                fill: string;
                d: string;
            };
            label: {
                text: string;
                textVerticalAnchor: string;
                textAnchor: string;
                textWrap: {
                    width: number;
                    maxLineCount: number;
                    ellipsis: boolean;
                };
                x: string;
                y: number;
                fontSize: number;
                fontFamily: string;
                fill: string;
            };
        };
    };
    preinitialize(): void;
}
export declare class VSMTimelineProcessing extends dia.Element {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        attrs: {
            line: {
                strokeWidth: number;
                stroke: string;
                strokeLinecap: string;
                fill: string;
                d: string;
            };
            label: {
                text: string;
                textVerticalAnchor: string;
                textAnchor: string;
                textWrap: {
                    width: number;
                    maxLineCount: number;
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
export declare class VSMTimelineTotal extends dia.Element {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        length: number;
        attrs: {
            body: {
                fill: string;
                stroke: string;
                strokeWidth: number;
                width: string;
                height: string;
            };
            line: {
                strokeWidth: number;
                stroke: string;
                strokeLinecap: string;
                fill: string;
                d: string;
            };
            label: {
                text: string;
                textVerticalAnchor: string;
                textAnchor: string;
                textWrap: {
                    height: any;
                };
                y: string;
                fontSize: number;
                fontFamily: string;
                fill: string;
            };
            labelTotalWaiting: {
                text: string;
                textVerticalAnchor: string;
                textAnchor: string;
                textWrap: {
                    width: number;
                    height: string;
                    ellipsis: boolean;
                };
                x: string;
                y: string;
                fontSize: number;
                fontFamily: string;
                fill: string;
            };
            labelTotalProcessing: {
                text: string;
                textVerticalAnchor: string;
                textAnchor: string;
                textWrap: {
                    width: number;
                    height: string;
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
    initialize(): void;
    protected resetLength(opt?: dia.Cell.Options): void;
}
