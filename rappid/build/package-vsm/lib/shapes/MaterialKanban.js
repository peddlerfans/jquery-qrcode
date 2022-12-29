import { util } from 'jointjs';
import { getMaterialPattern } from '../pattern';
import { SECONDARY_FILL_COLOR, FILL_COLOR } from '../theme';
import { VSMProductionBatchKanban, VSMProductionKanban } from './ProductionKanban';
export class VSMMaterialKanban extends VSMProductionKanban {
    defaults() {
        const defaults = super.defaults();
        return Object.assign(Object.assign({}, defaults), { type: 'VSMMaterialKanban', attrs: util.defaultsDeep({
                body: {
                    fill: getMaterialPattern(SECONDARY_FILL_COLOR, FILL_COLOR),
                },
                label: {
                    text: 'Material Kanban',
                }
            }, defaults.attrs) });
    }
}
export class VSMMaterialBatchKanban extends VSMProductionBatchKanban {
    defaults() {
        const defaults = super.defaults();
        return Object.assign(Object.assign({}, defaults), { type: 'VSMMaterialBatchKanban', attrs: util.defaultsDeep({
                body: {
                    fill: getMaterialPattern(SECONDARY_FILL_COLOR, FILL_COLOR),
                },
                label: {
                    text: 'Material Batch Kanban',
                }
            }, defaults.attrs) });
    }
}
