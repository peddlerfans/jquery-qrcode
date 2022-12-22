import { dia } from 'jointjs';
export declare class VSMDedicatedProcess extends dia.Element {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        attrs: {
            body: {
                width: string;
                height: string;
                stroke: string;
                strokeWidth: number;
                fill: string;
            };
            header: {
                width: string;
                height: number;
                stroke: string;
                strokeWidth: number;
                fill: string;
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
export declare class VSMSharedProcess extends dia.Element {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        attrs: {
            body: {
                width: string;
                height: string;
                stroke: string;
                strokeWidth: number;
                fill: dia.SVGPatternJSON;
            };
            header: {
                width: string;
                height: number;
                stroke: string;
                strokeWidth: number;
                fill: string;
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
interface VSMSubprocessAttributes extends dia.Element.Attributes {
    thickness: number;
}
export declare class VSMSubprocess extends dia.Element<VSMSubprocessAttributes> {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        thickness: number;
        attrs: {
            body: {
                width: string;
                height: string;
                stroke: string;
                strokeWidth: number;
                fill: string;
            };
            stripes: {
                stroke: string;
                strokeWidth: number;
                fill: string;
            };
            label: {
                text: string;
                textVerticalAnchor: string;
                textAnchor: string;
                textWrap: {
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
    initialize(): void;
    protected resetThickness(opt?: dia.Cell.Options): void;
}
export {};
