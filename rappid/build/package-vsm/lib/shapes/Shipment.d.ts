import { dia } from 'jointjs';
export declare class VSMShipment extends dia.Link {
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
                    d: string;
                };
            };
        };
    };
    preinitialize(): void;
}
