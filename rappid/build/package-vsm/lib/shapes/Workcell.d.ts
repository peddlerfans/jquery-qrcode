import { dia } from 'jointjs';
interface VSMWorkcellAttributes extends dia.Element.Attributes {
    thickness: number;
}
export declare class VSMWorkcell extends dia.Element<VSMWorkcellAttributes> {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        thickness: number;
        attrs: {
            body: {
                strokeWidth: number;
                stroke: string;
                fill: string;
            };
            label: {
                text: string;
                textVerticalAnchor: string;
                textAnchor: string;
                textWrap: {
                    width: number;
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
