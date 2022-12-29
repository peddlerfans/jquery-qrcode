import { dia } from 'jointjs';
interface VSMResourcePlanningAttributes extends dia.Element.Attributes {
    tilt: number;
}
export declare class VSMResourcePlanning extends dia.Element<VSMResourcePlanningAttributes> {
    defaults(): {
        type: string;
        size: {
            width: number;
            height: number;
        };
        tilt: number;
        attrs: {
            body: {
                fill: string;
                stroke: string;
                strokeWidth: number;
            };
            top: {
                cx: string;
                rx: string;
                fill: string;
                stroke: string;
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
    initialize(): void;
    protected resetTilt(opt?: dia.Cell.Options): this;
    protected getLateralAreaPathData(tilt: number): string;
}
export {};
