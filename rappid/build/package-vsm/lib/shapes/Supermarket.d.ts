import { dia } from 'jointjs';
interface VSMSupermarketAttributes extends dia.Element.Attributes {
    count: number;
}
export declare class VSMSupermarket extends dia.Element<VSMSupermarketAttributes> {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        count: number;
        attrs: {
            body: {
                strokeWidth: number;
                stroke: string;
                strokeLinecap: string;
                fill: string;
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
    initialize(): void;
    protected resetCount(opt?: dia.Cell.Options): void;
}
export {};
