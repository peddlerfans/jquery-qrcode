import { dia } from 'jointjs';
interface VSMSafetyStockAttributes extends dia.Element.Attributes {
    count: number;
}
export declare class VSMSafetyStock extends dia.Element<VSMSafetyStockAttributes> {
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
