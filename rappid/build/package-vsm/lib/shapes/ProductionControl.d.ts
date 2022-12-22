import { dia } from 'jointjs';
export declare class VSMProductionControl extends dia.Element {
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
