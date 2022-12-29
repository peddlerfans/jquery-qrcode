/*! JointJS+ v3.6.3 - HTML5 Diagramming Framework

Copyright (c) 2022 client IO

 2022-12-09 


This Source Code Form is subject to the terms of the JointJS+ License
, v. 2.0. If a copy of the JointJS+ License was not distributed with this
file, You can obtain one at http://jointjs.com/license/rappid_v2.txt
 or from the JointJS+ archive as was distributed by client IO. See the LICENSE file.*/


import { util } from 'jointjs';
import { getMaterialPattern } from '../pattern';
import { SECONDARY_FILL_COLOR, FILL_COLOR } from '../theme';
import { VSMProductionBatchKanban, VSMProductionKanban } from './ProductionKanban';

export class VSMMaterialKanban extends VSMProductionKanban {

    defaults(): any {
        const defaults = super.defaults();
        return {
            ...defaults,
            type: 'VSMMaterialKanban',
            attrs: util.defaultsDeep({
                body: {
                    fill: getMaterialPattern(SECONDARY_FILL_COLOR, FILL_COLOR),
                },
                label: {
                    text: 'Material Kanban',
                }
            }, defaults.attrs)
        }
    }
}

export class VSMMaterialBatchKanban extends VSMProductionBatchKanban {

    defaults(): any {
        const defaults = super.defaults();
        return {
            ...defaults,
            type: 'VSMMaterialBatchKanban',
            attrs: util.defaultsDeep({
                body: {
                    fill: getMaterialPattern(SECONDARY_FILL_COLOR, FILL_COLOR),
                },
                label: {
                    text: 'Material Batch Kanban',
                }
            }, defaults.attrs)
        }
    }
}

