import { dia } from 'jointjs';
export declare class VSMLoadLevelling extends dia.Element {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        attrs: {
            body: {
                fill: string;
                width: string;
                height: string;
            };
            outline: {
                strokeWidth: number;
                stroke: string;
                d: string;
            };
            circle1Icon: {
                cx: string;
                cy: string;
                r: string;
            };
            circle2Icon: {
                cx: string;
                cy: string;
                r: string;
            };
            cross1Icon: {
                transform: string;
                d: string;
            };
            cross2Icon: {
                transform: string;
                d: string;
            };
            icons: {
                stroke: string;
                fill: string;
                strokeWidth: number;
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
