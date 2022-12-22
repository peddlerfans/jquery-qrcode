/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { STORE_RAPPID } from 'src/redux/helpers/actionTypes';
import { SharedEvents } from 'src/rappid/controller';
import { importGraphFromJSON } from 'src/rappid/actions';
import { onGraphStartBatch, onGraphStopBatch } from 'src/rappid/controllers';

export const sideEffects = ({ getState }: { getState: Function }) => {
    return (next: Function) => (action: { type: string, payload: any }) => {
        if (action.type === STORE_RAPPID) {
            return next(action);
        }
        const { rappid } = getState();
        if (!rappid) {
            return;
        }
        switch (action.type) {
            case SharedEvents.JSON_EDITOR_CHANGED:
                const json = action.payload;
                importGraphFromJSON(rappid, json);
                break;
            case SharedEvents.GRAPH_START_BATCH:
                onGraphStartBatch(rappid, action.payload);
                break;
            case SharedEvents.GRAPH_STOP_BATCH:
                onGraphStopBatch(rappid, action.payload);
        }
        return next(action);
    };
};
