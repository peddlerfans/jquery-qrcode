import { dia } from 'jointjs';
export declare class VSMFIFOLane extends dia.Element {
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
            rectIcon: {
                x: string;
                y: string;
                width: string;
                height: string;
            };
            ellipseIcon: {
                cx: string;
                cy: string;
                rx: string;
                ry: string;
            };
            triangleIcon: {
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
