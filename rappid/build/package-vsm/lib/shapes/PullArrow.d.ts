import { dia } from 'jointjs';
export declare class VSMPullArrow extends dia.Link {
    defaults(): {
        type: string;
        attrs: {
            line: {
                connection: boolean;
                stroke: string;
                strokeWidth: number;
                strokeDasharray: string;
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
