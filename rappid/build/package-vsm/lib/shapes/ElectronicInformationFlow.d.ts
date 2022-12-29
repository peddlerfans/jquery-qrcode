import { dia, g } from 'jointjs';
export declare class VSMElectronicInformationFlow extends dia.Link {
    defaults(): {
        type: string;
        attrs: {
            line: {
                connection: boolean;
                stroke: string;
                strokeWidth: number;
                strokeLinejoin: string;
                targetMarker: {
                    type: string;
                    d: string;
                };
            };
            wrapper: {
                connection: boolean;
                strokeWidth: number;
                strokeLinejoin: string;
            };
        };
    };
    preinitialize(): void;
}
export declare class VSMElectronicInformationFlowView extends dia.LinkView {
    findPath(route: dia.Point[], sourcePoint: dia.Point, targetPoint: dia.Point): g.Path;
}
