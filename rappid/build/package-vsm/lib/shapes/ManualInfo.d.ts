import { dia } from 'jointjs';
export declare class VSMManualInfo extends dia.Link {
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
