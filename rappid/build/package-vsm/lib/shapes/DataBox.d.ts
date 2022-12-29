import { dia, attributes } from 'jointjs';
interface VSMDataBoxAttributes extends dia.Element.Attributes {
    count?: number;
}
export declare class VSMDataBox extends dia.Element<VSMDataBoxAttributes> {
    defaults(): {
        type: string;
        count: number;
        size: {
            width: number;
            height: number;
        };
        attrs: {
            body: {
                width: string;
                height: string;
            };
            boxes: {
                width: string;
                fill: string;
                stroke: string;
                strokeWidth: number;
            };
            labels: {
                text: string;
                x: string;
                textWrap: {
                    width: number;
                    ellipsis: boolean;
                };
                textVerticalAnchor: string;
                textAnchor: string;
                fontSize: number;
                fontFamily: string;
                fill: string;
            };
        };
    };
    preinitialize(): void;
    initialize(): void;
    toJSON(): dia.Cell.JSON<any, VSMDataBoxAttributes>;
    protected getCleanedAttrs(): dia.Cell.Selectors;
    protected buildMarkup(opt?: dia.Cell.Options): void;
    setLabelAttr(index: number, attrs: attributes.SVGTextAttributes, opt?: dia.Cell.Options): void;
    setBoxAttr(index: number, attrs: attributes.SVGRectAttributes, opt?: dia.Cell.Options): void;
}
export {};
