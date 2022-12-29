import { dia } from 'jointjs';
export declare class VSMMaterialFlow extends dia.Link {
    defaults(): {
        type: string;
        attrs: {
            line: {
                connection: boolean;
                stroke: string;
                strokeWidth: number;
                strokeLinejoin: string;
                strokeLinecap: string;
                targetMarker: {
                    type: string;
                    stroke: string;
                    'stroke-width': number;
                    d: string;
                };
            };
            outline: {
                connection: boolean;
                stroke: string;
                strokeWidth: number;
                strokeLinecap: string;
                strokeLinejoin: string;
            };
            material: {
                connection: boolean;
                stroke: string;
                strokeWidth: number;
                strokeLinecap: string;
                strokeLinejoin: string;
                strokeDasharray: string;
            };
        };
    };
    preinitialize(): void;
}
